#!/usr/bin/env python3
"""Gera as versões EN e ES do curso a partir das páginas PT já montadas (rodar depois do build.mjs).

Uso:  node build/build.mjs && python3 build/i18n.py [en es] [--so-montar]

Padrão INEMA trilíngue (wifi/RELATORIO-CURSOS-TRILINGUES.md): PT na raiz, <lang>/ ao lado.
Só TEXTO vai para o modelo (blocos com as tags inline preservadas, atributos de acessibilidade, rótulos
de SVG, manifesto e as mensagens do learn.js). Layout, CSS e JS são reaproveitados.
Motor: Codex pela ASSINATURA (`codex exec -m gpt-6-luna`), sem chave de API.
Cache em i18n/<lang>.json (chave = hash do texto PT): unidade traduzida nunca é reenviada.
Unidade inválida (tags diferentes, vazia) volta até 3 vezes; depois o script para e diz qual.
Estado do aluno separado por idioma (courseId + "-<lang>").
"""
import glob, hashlib, json, os, re, shutil, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup, NavigableString, Comment, Tag, Doctype, Declaration, ProcessingInstruction

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
I18N = os.path.join(ROOT, 'i18n')
MODELO = 'gpt-6-luna'
PARALELO = 4
LOTE_CHARS = 9000
NOMES = {'en': 'English (United States)', 'es': 'Spanish (Latin America)'}
TU = {'en': 'you', 'es': 'tú'}
HTMLLANG = {'pt': 'pt-BR', 'en': 'en', 'es': 'es'}
ROTULO = {'pt': 'PT', 'en': 'EN', 'es': 'ES'}
INLINE = {'b', 'strong', 'i', 'em', 'span', 'a', 'br', 'code', 'small', 'mark', 'sup', 'sub', 'kbd', 'abbr'}
ATTRS = ['alt', 'title', 'aria-label', 'placeholder', 'data-text']
PULAR = {'INEMA.CLUB', 'PRO', 'Aa', 'INEMA', 'T1', 'T2', 'T3', 'PT', 'EN', 'ES'}
LETRA = re.compile(r'[A-Za-zÀ-ÿ]{2,}')
TAG = re.compile(r'</?[a-zA-Z][^>]*>')

SYS = """You are a careful professional translator of educational content. Translate the Brazilian Portuguese strings into {nome}.
Input: a JSON object {{id: string}}. Output: a JSON object with EXACTLY the same ids, each mapped to its translation. No other keys.
HARD RULES
- Never summarize, omit or add content. Keep numbers, money values, percentages, dates and names of people/products as they are
  (convert only the decimal comma to a decimal point in English: "6,5h" -> "6.5h").
- Strings may contain inline HTML. Keep EVERY tag and attribute exactly (same tags, same order, same class/href values);
  translate only the human text. Keep HTML entities like &lt; &gt; &amp; &#8594; as entities.
- Keep leading/trailing spaces and line breaks exactly. Keep emojis exactly where they are.
- Text between &lt; and &gt; is a fill-in hint for the student: translate the words inside, keep the &lt; &gt;.
- Some strings are complete prompts the student will paste into Claude Code or Codex: translate them fully and naturally,
  keep their structure, numbering, line breaks, slash commands (/product-feedback), file names and URLs.
- Brand/product names stay: INEMA.CLUB, INEMA.PRO, PRO, Claude, Claude Code, Codex, ChatGPT, Gemini, PostHog, Hotjar, Sentry,
  CodeRabbit, Reddit, TikTok, Instagram, Stripe, 21st.dev, whatships.com, Awwwards, Mirofish, Y Combinator, SaaS, MRR.
- Keep established English startup terms natural in {nome}: vibe coding, moat, pattern interrupt, flywheel, onboarding, pitch.
- Audience: adults who build products with AI (founders, freelancers, consultants). Plain, direct, adult language, short
  sentences, address the reader as "{tu}". No hype.
- Course title: "Produtos na era da IA" -> {titulo}. Track names: "A mentalidade" -> {t1}; "Vale a pena construir?" -> {t2};
  "Lançar e crescer" -> {t3}. "trilha" -> {trilha}; "módulo" -> {modulo}; "tópico" -> {topico}.
"""
FIXOS = {
    'en': dict(titulo='"Products in the AI Era"', t1='"The Mindset"', t2='"Is It Worth Building?"', t3='"Launch and Grow"',
               trilha='"track"', modulo='"module"', topico='"topic"'),
    'es': dict(titulo='"Productos en la era de la IA"', t1='"La mentalidad"', t2='"¿Vale la pena construirlo?"',
               t3='"Lanzar y crecer"', trilha='"ruta"', modulo='"módulo"', topico='"tema"'),
}
# textos fixos das mensagens no <script> inline do lib.mjs (quiz e botão copiar)
SCRIPT_FIXOS = {
    'en': {"'✓ Certo. '": "'✓ Correct. '", "'✗ Não é essa. '": "'✗ Not quite. '", "'Copiado ✓'": "'Copied ✓'"},
    'es': {"'✓ Certo. '": "'✓ Correcto. '", "'✗ Não é essa. '": "'✗ No es esa. '", "'Copiado ✓'": "'Copiado ✓'"},
}
# mensagens de interface do learn.js (só literais que o aluno vê)
LEARN_UI = ['Adicionar nota', 'Anotar selecao', 'Apagar tudo', 'Armazenamento cheio. Exporte sua jornada para nao perder dados.',
            'Arquivo invalido. Nada foi alterado.', 'Continuar de onde parei', 'Curso concluido. Parabens pelo esforco.',
            'Estado do curso apagado.', 'Este trecho nao e anotavel.', 'Fechar minha jornada', 'JSON invalido ou ilegivel.',
            'Marcar com cor ', 'Marcar como duvida', 'Marcar como lido', 'Marcar resolvida', 'Minha jornada',
            'Modo leitura: seu progresso nao sera salvo neste navegador.', 'Nao foi possivel copiar.', 'Nao foi possivel exportar.',
            'Nenhuma duvida.', 'Nenhuma nota.', 'nota sem ancora', 'Notas e marcacoes (', 'Selecao limitada a um paragrafo.',
            'Selecione dentro de um paragrafo anotavel.', ' so nao resolvidas', 'Sua anotacao:', 'Voltar ao ultimo ponto', 'Lido']


def h(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()[:16]


def paginas():
    return ['index.html'] + sorted(os.path.relpath(p, ROOT) for p in glob.glob(os.path.join(ROOT, 'curso/trilha*/*.html')))


def eh_folha(tag):
    """Tag cujos descendentes são só texto e tags inline: vira UMA unidade (innerHTML)."""
    for d in tag.descendants:
        if isinstance(d, Tag) and d.name not in INLINE:
            return False
    return True


def texto_util(s):
    t = s.strip()
    return bool(t) and t not in PULAR and bool(LETRA.search(t))


def unidades(soup):
    """Lista de (tipo, alvo, texto_pt). tipo: 'inner' | 'str' | ('attr', nome) | 'manifest'."""
    out = []

    def walk(tag):
        if tag.name in ('script', 'style'):
            return
        for a in ATTRS:
            v = tag.get(a)
            if isinstance(v, str) and texto_util(v):
                out.append((('attr', a), tag, v))
        if tag.name != '[document]' and eh_folha(tag) and tag.name not in INLINE | {'html', 'head', 'body'}:
            inner = tag.decode_contents()
            if texto_util(tag.get_text()):
                out.append(('inner', tag, inner))
            for d in tag.find_all(True):
                for a in ATTRS:
                    v = d.get(a)
                    if isinstance(v, str) and texto_util(v):
                        out.append((('attr', a), d, v))
            return
        for ch in list(tag.children):
            if isinstance(ch, (Comment, Doctype, Declaration, ProcessingInstruction)):
                continue
            if isinstance(ch, NavigableString):
                if texto_util(str(ch)):
                    out.append(('str', ch, str(ch)))
            elif isinstance(ch, Tag):
                walk(ch)

    walk(soup)
    # <title> e meta description
    if soup.title and soup.title.string:
        out.append(('title', soup.title, soup.title.string))
    md = soup.find('meta', attrs={'name': 'description'})
    if md and md.get('content'):
        out.append((('attr', 'content'), md, md['content']))
    return out


def manifest_textos(soup):
    sc = soup.find('script', attrs={'data-inema-manifest': True})
    m = json.loads(sc.string)
    ts = [t['title'] for t in m['tracks']] + [md['title'] for t in m['tracks'] for md in t['modules']]
    return sc, m, ts


def valido(pt, tr):
    if not isinstance(tr, str) or not tr.strip():
        return False
    if TAG.findall(pt) != TAG.findall(tr):
        return False
    if pt[:1].isspace() != tr[:1].isspace() or pt[-1:].isspace() != tr[-1:].isspace():
        return False
    return True


def via_codex(sistema, lote):
    pedido = sistema + '\n\nReturn ONLY the JSON object (no code fences, no comments). INPUT JSON:\n' + json.dumps(lote, ensure_ascii=False)
    with tempfile.TemporaryDirectory() as d:
        out = os.path.join(d, 'out.txt')
        r = subprocess.run(['codex', 'exec', '-m', MODELO, '--skip-git-repo-check', '--ephemeral', '--sandbox', 'read-only',
                            '-C', d, '-o', out, '-'], input=pedido, capture_output=True, text=True, timeout=1200)
        if r.returncode or not os.path.exists(out):
            raise RuntimeError(f'codex exec rc={r.returncode}: {r.stderr[-300:]}')
        txt = open(out, encoding='utf-8').read().strip()
    txt = re.sub(r'^```(?:json)?\s*|\s*```$', '', txt)
    return json.loads(txt[txt.index('{'):txt.rindex('}') + 1])


def traduzir(lang, fontes):
    """fontes: {hash: pt}. Devolve {hash: tradução}, usando e atualizando o cache."""
    os.makedirs(I18N, exist_ok=True)
    cpath = os.path.join(I18N, f'{lang}.json')
    cache = json.load(open(cpath, encoding='utf-8')) if os.path.exists(cpath) else {}
    sistema = SYS.format(nome=NOMES[lang], tu=TU[lang], **FIXOS[lang])
    for tentativa in range(3):
        falta = {k: v for k, v in fontes.items() if not valido(v, cache.get(k))}
        if not falta:
            break
        lotes, atual, tam = [], {}, 0
        for k, v in falta.items():
            if atual and tam + len(v) > LOTE_CHARS:
                lotes.append(atual); atual, tam = {}, 0
            atual[k] = v; tam += len(v)
        if atual:
            lotes.append(atual)
        print(f'[{lang}] tentativa {tentativa + 1}: {len(falta)} unidades em {len(lotes)} lotes', flush=True)

        def um(lote):
            try:
                return lote, via_codex(sistema, lote)
            except Exception as e:
                print(f'[{lang}] lote falhou: {str(e)[:160]}', flush=True)
                return lote, {}

        with ThreadPoolExecutor(PARALELO) as ex:
            for lote, res in ex.map(um, lotes):
                for k in lote:
                    if valido(lote[k], res.get(k)):
                        cache[k] = res[k]
                json.dump(cache, open(cpath, 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=True)
    ruins = [v[:80] for k, v in fontes.items() if not valido(v, cache.get(k))]
    if ruins:
        sys.exit(f'[{lang}] {len(ruins)} unidades sem tradução válida, ex.: {ruins[:3]}')
    return cache


def rel_raiz(pagina):
    return '../' * pagina.count('/')


def seletor(pagina, lang):
    """Links PT · EN · ES para a mesma página nos três idiomas."""
    base = rel_raiz(pagina) + ('../' if lang != 'pt' else '')
    links = []
    for l in ('pt', 'en', 'es'):
        href = base + ('' if l == 'pt' else l + '/') + pagina
        cls = 'text-primary font-bold' if l == lang else 'text-neutral-400 hover:text-primary'
        links.append(f'<a href="{href}" hreflang="{HTMLLANG[l]}" lang="{HTMLLANG[l]}" class="{cls}">{ROTULO[l]}</a>')
    return ('<span data-lang-switch class="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2">'
            + '<span class="text-neutral-600">·</span>'.join(links) + '</span>')


def hreflang(pagina):
    base = 'https://inematds.github.io/produtos-era-ia/'
    alt = [(HTMLLANG[l], base + ('' if l == 'pt' else l + '/') + pagina.replace('index.html', '')) for l in ('pt', 'en', 'es')]
    alt.append(('x-default', alt[0][1]))
    return ''.join(f'<link rel="alternate" hreflang="{k}" href="{u}">' for k, u in alt)


def injeta_nav(html, pagina, lang):
    html = re.sub(r'<link rel="alternate" hreflang[^>]*>', '', html)
    html = re.sub(r'<span data-lang-switch.*?</a></span>', '', html, flags=re.S)
    html = html.replace('</head>', hreflang(pagina) + '\n</head>', 1)
    alvo = re.compile(r'<button type="button" data-inema-journey-open(?:="")? class="hidden lg:inline-flex')
    assert alvo.search(html), pagina
    return alvo.sub(lambda m: seletor(pagina, lang) + '\n          ' + m.group(0), html, count=1)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    langs = args or ['en', 'es']
    pags = paginas()
    pt_html = {p: open(os.path.join(ROOT, p), encoding='utf-8').read() for p in pags}
    pt_html = {p: re.sub(r'<link rel="alternate" hreflang[^>]*>', '', re.sub(r'<span data-lang-switch.*?</a></span>', '', s, flags=re.S))
               for p, s in pt_html.items()}

    # 1) coletar unidades (dedupe por hash)
    fontes = {}
    for p, s in pt_html.items():
        soup = BeautifulSoup(s, 'html.parser')
        for _, _, txt in unidades(soup):
            fontes[h(txt)] = txt
        for txt in manifest_textos(soup)[2]:
            fontes[h(txt)] = txt
    for s in LEARN_UI:
        fontes[h(s)] = s
    os.makedirs(I18N, exist_ok=True)
    json.dump(fontes, open(os.path.join(I18N, 'fonte.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=True)
    print(f'{len(pags)} páginas, {len(fontes)} unidades únicas, {sum(len(v) for v in fontes.values())} caracteres', flush=True)
    if '--contar' in sys.argv:
        return

    for lang in langs:
        tr = traduzir(lang, fontes)
        T = lambda s: tr[h(s)]
        # 2) montar páginas
        for p, s in pt_html.items():
            soup = BeautifulSoup(injeta_nav(s, p, lang), 'html.parser')
            for tipo, alvo, txt in unidades(soup):
                if tipo == 'inner':
                    alvo.clear()
                    for n in list(BeautifulSoup(T(txt), 'html.parser').contents):
                        alvo.append(n)
                elif tipo == 'str':
                    alvo.replace_with(T(txt))
                elif tipo == 'title':
                    alvo.string = T(txt)
                else:
                    alvo[tipo[1]] = T(txt)
            sc, m, _ = manifest_textos(soup)
            m['course'] = m['course'] + '-' + lang
            for t in m['tracks']:
                t['title'] = T(t['title'])
                for md in t['modules']:
                    md['title'] = T(md['title'])
            sc.string = '\n' + json.dumps(m, ensure_ascii=False, indent=1) + '\n  '
            mc = soup.find('meta', attrs={'name': 'inema-course'})
            mc['content'] = mc['content'] + '-' + lang
            soup.html['lang'] = HTMLLANG[lang]
            out = str(soup)
            for a, b in SCRIPT_FIXOS[lang].items():
                out = out.replace(a, b)
            dst = os.path.join(ROOT, lang, p)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            open(dst, 'w', encoding='utf-8').write(out)
        # 3) assets com o learn.js traduzido
        ad = os.path.join(ROOT, lang, 'assets')
        os.makedirs(ad, exist_ok=True)
        shutil.copy(os.path.join(ROOT, 'assets/learn.css'), ad)
        js = open(os.path.join(ROOT, 'assets/learn.js'), encoding='utf-8').read()
        for s in LEARN_UI:
            js = js.replace("'" + s + "'", json.dumps(T(s), ensure_ascii=False))
        open(os.path.join(ad, 'learn.js'), 'w', encoding='utf-8').write(js)
        print(f'[{lang}] {len(pags)} páginas montadas em {lang}/', flush=True)

    # 4) PT ganha seletor + hreflang
    for p, s in pt_html.items():
        open(os.path.join(ROOT, p), 'w', encoding='utf-8').write(injeta_nav(s, p, 'pt'))
    print('PT: seletor de idioma e hreflang aplicados')


if __name__ == '__main__':
    main()
