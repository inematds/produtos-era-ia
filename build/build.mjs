// Gera o curso v2 (landing + 3 trilhas + 9 módulos) em ../ (raiz) e ../curso/trilhaN/
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TRACKS, COURSE_TITLE, COURSE_SUB, LOGO, manifest, head, nav, footer, scripts, modulePage, trackIndex, svg } from './lib.mjs';
import { T1 } from './content-t1.mjs';
import { T2 } from './content-t2.mjs';
import { T3 } from './content-t3.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, '..');
const out = (p) => join(ROOT, p);

const tracks = [T1, T2, T3].map((tc, i) => ({ ...TRACKS[i], modules: tc.modules }));
const manifestJson = manifest(tracks);

// assets
mkdirSync(out('assets'), { recursive: true });
const SK = process.env.HOME + '/.claude/skills/formato-curso-v2/assets';
copyFileSync(join(SK, 'learn.css'), out('assets/learn.css'));
copyFileSync(join(SK, 'learn.js'), out('assets/learn.js'));

// ---- módulos + índices de trilha ----
const heroFor = (t) => {
  const total = t.modules.reduce((a, m) => a + m.topics.length, 0);
  return svg.fanout(t, { label: `Diagrama dos ${t.modules.length} módulos da trilha ${t.n}: ${t.title}`, center: `Trilha ${t.n}|${t.short}|${total} tópicos`, groups: t.modules.map(m => ({ n: m.topics.length, title: `${m.id.replace('-', '.')} ${m.title}`, sub: m.punch })) });
};

for (const t of tracks) {
  const dir = out(`curso/${t.slug}`);
  mkdirSync(dir, { recursive: true });
  t.modules.forEach((m, i) => {
    const html = modulePage({ t, m, prev: t.modules[i - 1], next: t.modules[i + 1], manifestJson });
    writeFileSync(join(dir, `modulo-${m.id}.html`), html);
  });
  writeFileSync(join(dir, 'index.html'), trackIndex({ t, manifestJson, heroSvg: heroFor(t) }));
}

// ---- landing ----
const totalModules = tracks.reduce((a, t) => a + t.modules.length, 0);
const totalTopics = tracks.reduce((a, t) => a + t.modules.reduce((b, m) => b + m.topics.length, 0), 0);
const totalMin = tracks.reduce((a, t) => a + t.modules.reduce((b, m) => b + m.minutes, 0), 0);
const hours = Math.round(totalMin / 60 * 10) / 10;
const t1 = tracks[0];

const heroSvg = svg.split(t1, { label: 'Diagrama: construir ficou barato e rápido, enquanto o julgamento sobre o que vale construir ficou raro e caro; o curso treina o lado direito', bridge: 'o jogo virou', left: { title: 'CONSTRUIR', items: ['Um prompt vira protótipo', 'Agentes fazem produto e QA', '2/3 dos apps: últimos 3-4 anos', 'O médio está em todo lugar'] }, right: { title: 'JULGAR', items: ['Isso é necessário?', 'Existe daqui a 12 meses?', 'Um gigante copia amanhã?', 'Quem vai ficar sabendo?', 'Prova valor em 2 minutos?'] } });

const trackCard = (t) => {
  const topics = t.modules.reduce((a, m) => a + m.topics.length, 0);
  const min = t.modules.reduce((a, m) => a + m.minutes, 0);
  return `
      <a href="curso/${t.slug}/index.html" class="group block bg-dark-800 rounded-2xl border border-dark-600 hover:border-${t.color}-500/30 transition-all overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-${t.color}-900/30 to-dark-800 p-8">
          <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span class="inline-block px-3 py-1 bg-${t.color}-500/20 text-${t.color}-400 text-xs font-semibold rounded-full">TRILHA ${t.n}${t.n === 1 ? ' · COMECE AQUI' : ''}</span>
            <span class="text-sm text-neutral-500">${t.modules.length} módulos · ${topics} tópicos · ~${Math.round(min / 60 * 10) / 10}h</span>
          </div>
          <h3 class="text-2xl font-bold mb-3 group-hover:text-${t.color}-400 transition-colors">${t.emoji} ${t.title}</h3>
          <p class="text-neutral-400 mb-6 max-w-3xl">${t.desc}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${t.modules.map(m => `<span class="text-xs px-2.5 py-1 rounded-md bg-dark-900/60 border border-dark-600 text-neutral-300">${m.id.replace('-', '.')} ${m.title}</span>`).join('')}
          </div>
          <div data-inema-meter="trilha:${t.n}" class="inema-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso da trilha ${t.n}">
            <div class="flex justify-between text-xs text-neutral-500 mb-1"><span data-inema-meter-frac>0 de ${topics}</span><span data-inema-meter-pct>0%</span></div>
            <div class="inema-bar h-1.5 bg-dark-700 rounded-full overflow-hidden"><div class="inema-bar__fill h-full bg-${t.color}-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
          </div>
          <span class="inline-flex items-center gap-1 text-${t.color}-400 font-semibold mt-5 group-hover:gap-2 transition-all">Entrar na trilha &#8594;</span>
        </div>
      </a>`;
};

const landing = head({ rel: '.', title: 'Início', desc: `${COURSE_TITLE}: ${COURSE_SUB}. Curso em 3 trilhas sobre mentalidade, oportunidade, distribuição e design de produtos quando a IA constrói quase tudo.`, manifestJson }) + nav({ rel: '.', active: 0 }) + `
  <!-- HERO -->
  <header class="relative overflow-hidden bg-gradient-to-br from-emerald-900/30 via-dark-800 to-dark-800 border-b border-dark-600">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full mb-6 tracking-wider">CURSO · ACESSO LIVRE · ~${hours}h</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">${LOGO} ${COURSE_TITLE}</h1>
        <p class="text-2xl text-emerald-400 font-semibold mb-4">${COURSE_SUB}</p>
        <p class="text-lg text-neutral-300 max-w-xl mb-8 leading-relaxed">
          Hoje um prompt vira protótipo e agentes fazem o papel de produto, engenharia e QA. O gargalo deixou de ser <strong class="text-neutral-100">como construir</strong> e passou a ser <strong class="text-neutral-100">se vale construir</strong>.
          Três trilhas para treinar a <strong class="text-emerald-400">mentalidade</strong>, avaliar a <strong class="text-blue-400">oportunidade</strong> com perguntas duras e <strong class="text-purple-400">lançar</strong> sem depender da sorte.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <a href="curso/trilha1/index.html" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30">Começar agora &#8594;</a>
          <button type="button" data-inema-journey-open class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dark-800 border border-emerald-500/30 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 transition-colors">🧭 Continuar de onde parei</button>
        </div>
        <div data-inema-meter="curso" class="inema-meter max-w-md" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do curso">
          <div class="flex justify-between text-sm text-neutral-400 mb-1"><span data-inema-meter-frac>0 de ${totalTopics} tópicos</span><span data-inema-meter-pct>0%</span></div>
          <div class="inema-bar h-2 bg-dark-700 rounded-full overflow-hidden"><div class="inema-bar__fill h-full bg-emerald-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
        </div>
      </div>
      <figure class="rounded-2xl border border-emerald-500/30 bg-dark-900/40 p-3 sm:p-4">${heroSvg}
        <figcaption class="text-xs text-neutral-400 mt-3 px-1"><strong class="text-emerald-400">O que olhar:</strong> à esquerda, o que ficou barato; à direita, as perguntas que agora decidem quem ganha. O curso inteiro treina o lado direito.</figcaption>
      </figure>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${[['3', 'Trilhas'], [totalModules, 'Módulos'], [totalTopics, 'Tópicos'], [`~${hours}h`, 'Duração']].map(([v, l]) => `<div class="bg-dark-800/50 rounded-xl p-5 border border-dark-600 text-center"><div class="text-3xl font-extrabold text-emerald-400">${v}</div><div class="text-xs text-neutral-400 mt-1">${l}</div></div>`).join('')}
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- A VIRADA -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">A virada</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Quando dá para construir qualquer coisa, o que vale é saber o que não construir</h2>
        <p class="text-lg text-neutral-400">Este curso não ensina a programar nem a escolher modelo. Ensina o critério: as perguntas que separam um produto que merece existir de mais um app médio numa pilha de apps médios.</p>
      </div>
      <div class="grid sm:grid-cols-3 gap-6">
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7 text-center"><div class="text-4xl font-extrabold text-emerald-400 mb-2">2/3</div><p class="text-neutral-300 text-sm">Dos apps do mundo surgiram nos últimos três a quatro anos. É inflação de produto.</p></div>
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7 text-center"><div class="text-4xl font-extrabold text-blue-400 mb-2">3·6·12</div><p class="text-neutral-300 text-sm">Meses: o horizonte em que sua ideia precisa continuar merecendo existir.</p></div>
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7 text-center"><div class="text-4xl font-extrabold text-purple-400 mb-2">&lt; 2 min</div><p class="text-neutral-300 text-sm">Tempo para uma pessoa leiga provar a si mesma que seu produto vale a pena.</p></div>
      </div>
    </section>

    <!-- A PROMESSA -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">A promessa</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">O que você sai sabendo fazer</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        ${[
          ['🧱', 'Fazer um pré-mortem honesto', 'Listar as cinco razões pelas quais a ideia falha antes de gastar uma semana nela, com um prompt pronto.'],
          ['🔍', 'Filtrar ideias com perguntas duras', 'Necessidade real, prazo de validade, risco de clone, valor dos dados, dificuldade como fosso.'],
          ['🏒', 'Enxergar onde o mercado vai estar', 'Arbitragem da ingenuidade, indústrias atrasadas e produtos que moram no fluxo diário.'],
          ['📣', 'Planejar distribuição desde o dia 1', 'Comunidades, guerrilha barata, afiliado de dois lados e os momentos em que o mercado presta atenção.'],
          ['🗣️', 'Posicionar em uma frase', 'Um pitch que cabe num vídeo curto e uma jornada que prova valor em menos de dois minutos.'],
          ['🎨', 'Fugir da média no design e no feedback', 'Replays analisados por IA, onboarding de quem já fatura e usuários simulados por subagentes.'],
        ].map(([e, h, p]) => `<div class="flex items-start gap-4 bg-dark-800 rounded-xl border border-dark-600 p-6"><span class="text-2xl mt-0.5">${e}</span><div><h3 class="font-semibold text-neutral-100 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div></div>`).join('')}
      </div>
    </section>

    <!-- TRILHAS -->
    <section id="trilhas" class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">A jornada</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Três trilhas: pensar, filtrar, lançar</h2>
        <p class="text-lg text-neutral-400">Cada módulo tem diagramas, exemplos e prompts que você roda de verdade, e fecha com um teste rápido de três perguntas.</p>
      </div>
      ${tracks.map(trackCard).join('')}
    </section>

    <!-- PARA QUEM -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Para quem é</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Quem constrói com IA e quer construir a coisa certa</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        ${[['🛠️', 'Quem faz apps com IA', 'e já percebeu que construir rápido não garante que alguém vá usar.'], ['💼', 'Quem atende clientes', 'e precisa dizer com segurança se um projeto vale o investimento.'], ['🚀', 'Quem sonha com um SaaS', 'e quer testar a ideia gastando o mínimo antes de apostar alto.'], ['🧑‍🏫', 'Quem ensina ou lidera', 'e precisa de um roteiro de perguntas para avaliar ideias da equipe.']].map(([e, h, p]) => `<div class="bg-dark-800 rounded-xl border border-dark-600 p-6 text-center"><div class="text-3xl mb-3">${e}</div><h3 class="font-semibold text-neutral-100 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div>`).join('')}
      </div>
    </section>

    <!-- EXPERIÊNCIA -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Sua experiência</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Mais que ler: uma plataforma de aprendizado</h2>
        <p class="text-lg text-neutral-400">Tudo roda no seu navegador, sem login. O curso lembra onde você parou.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${[['✅', 'Progresso automático', 'Marque tópicos como lidos e veja a evolução por módulo, trilha e curso.'], ['✍️', 'Anotações e grifos', 'Selecione qualquer trecho para grifar ou anotar. Fica salvo no seu navegador.'], ['🧭', 'Minha jornada', 'Continue de onde parou e veja tudo que já estudou num painel.'], ['🌓', 'Temas e leitura', 'Escuro, claro, sépia, foco, alto contraste. Tamanho de fonte e entrelinha.'], ['🧪', 'Teste por módulo', 'Três perguntas com resposta e explicação, para checar se entendeu.'], ['📋', 'Prompts prontos', 'Pré-mortem, avaliação de ideia, pitch, feedback e usuários simulados: é copiar e rodar.']].map(([e, h, p]) => `<div class="bg-dark-800 rounded-xl border border-dark-600 p-6"><div class="text-2xl mb-2">${e}</div><h3 class="font-semibold text-emerald-400 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div>`).join('')}
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="py-20">
      <div class="bg-gradient-to-br from-emerald-900/40 via-dark-800 to-dark-800 rounded-3xl border border-emerald-500/30 p-10 sm:p-14 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">Antes de construir a próxima ideia, passe ela por este filtro</h2>
        <p class="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">Comece pela Trilha 1. Em cerca de ${hours} horas você sai com um roteiro de perguntas, um pré-mortem feito e um plano de lançamento.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="curso/trilha1/index.html" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30">Começar pela Trilha 1 &#8594;</a>
          <button type="button" data-inema-journey-open class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 border border-emerald-500/30 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 transition-colors">🧭 Minha jornada</button>
        </div>
      </div>
    </section>
  </main>
` + footer({ landing: true }) + scripts({ rel: '.' });

writeFileSync(out('index.html'), landing);
console.log(`ok: ${totalModules} módulos, ${totalTopics} tópicos, ~${totalMin} min`);
