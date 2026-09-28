// Biblioteca de templates do curso "Produtos na era da IA" — formato INEMA v2
// Gera HTML self-contained (Tailwind CDN + learn.css/learn.js por caminho relativo).

export const COURSE_ID = 'produtos-era-ia';
export const COURSE_TITLE = 'Produtos na era da IA';
export const COURSE_SUB = 'Saber o que vale a pena construir quando dá para construir qualquer coisa';
export const LOGO = '🧭';
export const BRAND = 'Produtos na era da IA';

export const TRACKS = [
  { n: 1, slug: 'trilha1', color: 'emerald', hex: '#10b981', hexLight: '#34d399', hexPale: '#a7f3d0', hexDeep: '#064e3b', emoji: '🧠', title: 'A mentalidade', short: 'Mentalidade', desc: 'O jogo mudou: construir ficou barato, o julgamento ficou caro. Por que o "app médio" não chama mais atenção e como pensar com pessimismo produtivo.' },
  { n: 2, slug: 'trilha2', color: 'blue', hex: '#3b82f6', hexLight: '#60a5fa', hexPale: '#bfdbfe', hexDeep: '#1e3a8a', emoji: '🔍', title: 'Vale a pena construir?', short: 'Oportunidade', desc: 'As perguntas de oportunidade: necessidade real, validade no tempo, risco de clone, valor dos dados, dificuldade como fosso e uso recorrente.' },
  { n: 3, slug: 'trilha3', color: 'purple', hex: '#a855f7', hexLight: '#c084fc', hexPale: '#e9d5ff', hexDeep: '#3b0764', emoji: '🚀', title: 'Lançar e crescer', short: 'Lançar', desc: 'Distribuição, posicionamento em uma frase, jornada do usuário, volante de conteúdo, design que foge da média e usuários simulados antes do lançamento.' },
];

const LIGHT_ACCENTS = {
  emerald: ['#059669', '5, 150, 105'],
  blue: ['#2563eb', '37, 99, 235'],
  purple: ['#7c3aed', '124, 58, 237'],
  amber: ['#92400e', '146, 64, 14'],
  red: ['#b91c1c', '185, 28, 28'],
};

function lightAccentCss() {
  return Object.entries(LIGHT_ACCENTS).map(([c, [hex, rgb]]) => `
    html:not(.dark) .text-${c}-400 { color: ${hex}; }
    html:not(.dark) .bg-${c}-500\\/20 { background-color: rgba(${rgb}, 0.12); }
    html:not(.dark) .bg-${c}-500\\/10 { background-color: rgba(${rgb}, 0.08); }
    html:not(.dark) .bg-${c}-900\\/20 { background-color: rgba(${rgb}, 0.07); }
    html:not(.dark) .border-${c}-500\\/30 { border-color: rgba(${rgb}, 0.25); }
    html:not(.dark) .hover\\:bg-${c}-500\\/30:hover { background-color: rgba(${rgb}, 0.18); }
    html:not(.dark) .hover\\:text-${c}-400:hover { color: ${hex}; }
    html:not(.dark) .hover\\:bg-${c}-500\\/10:hover { background-color: rgba(${rgb}, 0.08); }
    html:not(.dark) .group:hover .group-hover\\:text-${c}-400 { color: ${hex}; }`).join('\n');
}

export function manifest(content) {
  const tracks = content.map(t => ({
    n: String(t.n), title: t.title,
    modules: t.modules.map(m => ({ id: m.id, title: m.title, topics: m.topics.length, href: `curso/${t.slug}/modulo-${m.id}.html` })),
  }));
  return JSON.stringify({ course: COURSE_ID, tracks }, null, 1);
}

export function antiFouc() {
  return `<script>
(function () {
  try {
    var html = document.documentElement;
    var DEF = { theme: 'inema-dark', font: 'inter', fontScale: 100, lineWidth: 68, leading: 1.7, accent: 'emerald' };
    function clone(o) { var r = {}; for (var x in o) r[x] = o[x]; return r; }
    var p = clone(DEF);
    try {
      var raw = localStorage.getItem('inema.prefs');
      if (raw) { var parsed = JSON.parse(raw); if (parsed && typeof parsed === 'object') { for (var k in DEF) if (parsed[k] != null) p[k] = parsed[k]; } }
      else { var legacy = localStorage.getItem('theme'); if (legacy === 'light') p.theme = 'claro'; else if (legacy === 'dark') p.theme = 'inema-dark'; }
    } catch (e) { p = clone(DEF); }
    var THEMES = { 'inema-dark': { dark: true, attr: null, cs: 'dark' }, 'claro': { dark: false, attr: null, cs: 'light' }, 'sepia': { dark: false, attr: 'sepia', cs: 'light' }, 'foco': { dark: null, attr: 'foco', cs: null }, 'contraste': { dark: true, attr: 'contraste', cs: 'dark' } };
    var t = THEMES[p.theme] || THEMES['inema-dark'];
    if (t.dark === true) html.classList.add('dark'); else if (t.dark === false) html.classList.remove('dark');
    if (t.attr) html.setAttribute('data-theme', t.attr); else html.removeAttribute('data-theme');
    html.style.colorScheme = (t.cs ? t.cs : (html.classList.contains('dark') ? 'dark' : 'light'));
    html.setAttribute('data-font', p.font || 'inter'); html.setAttribute('data-accent', p.accent || 'emerald');
    var s = html.style; var scale = (+p.fontScale || 100);
    s.setProperty('--inema-font-scale', (scale / 100).toString()); s.setProperty('font-size', scale + '%');
    s.setProperty('--measure', (+p.lineWidth || 68) + 'ch'); s.setProperty('--lh-body', (+p.leading || 1.7).toString());
    var fam = p.font === 'system' ? 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' : (p.font === 'leitura' ? '"Atkinson Hyperlegible", "Inter", system-ui, sans-serif' : '"Inter", system-ui, sans-serif');
    s.setProperty('--font-body', fam);
    var ACC = { emerald: [152, 76, 45], blue: [217, 91, 60], purple: [258, 90, 66], amber: [38, 92, 50], teal: [174, 72, 41], rose: [350, 89, 60] };
    var a = ACC[p.accent] || ACC.emerald;
    s.setProperty('--accent-h', a[0] + ''); s.setProperty('--accent-s', a[1] + '%'); s.setProperty('--accent-l', a[2] + '%');
    s.setProperty('--accent', 'hsl(' + a[0] + ' ' + a[1] + '% ' + a[2] + '%)');
  } catch (err) { try { document.documentElement.classList.add('dark'); document.documentElement.style.colorScheme = 'dark'; } catch (e) {} }
})();
</script>`;
}

export function head({ rel, title, desc, manifestJson, extraCss = '' }) {
  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="inema-course" content="${COURSE_ID}">
  <title>${title} | ${COURSE_TITLE}</title>
  <meta name="description" content="${String(desc).replace(/<[^>]+>/g, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">

  <!-- ANTI-FOUC: bloqueante, antes de tudo -->
  ${antiFouc()}

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { darkMode: 'class', theme: { extend: { colors: { primary: '#FACC15', dark: { 900: '#111827', 800: '#1f2937', 700: '#374151', 600: '#4b5563' } } } } }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${rel}/assets/learn.css">

  <!-- Manifesto do curso (obrigatório em toda página) -->
  <script type="application/json" data-inema-manifest>
${manifestJson}
  </script>

  <style>
    body { font-family: 'Inter', sans-serif; }
    .dark body { background-color: #111827; }
    .topic-explanation { display: none; }
    .topic-explanation.active { display: block; }
    html { scroll-behavior: smooth; }
    [id] { scroll-margin-top: 5rem; }

    /* Light mode overrides */
    html:not(.dark) body { background-color: #f8fafc; }
    html:not(.dark) .bg-dark-900 { background-color: #ffffff; }
    html:not(.dark) .bg-dark-800 { background-color: #f9fafb; }
    html:not(.dark) .bg-dark-700 { background-color: #f3f4f6; }
    html:not(.dark) .bg-dark-600 { background-color: #e5e7eb; }
    html:not(.dark) .bg-dark-800\\/50, html:not(.dark) .bg-dark-800\\/60, html:not(.dark) .bg-dark-900\\/40, html:not(.dark) .bg-dark-900\\/60 { background-color: #f3f4f6; }
    html:not(.dark) .text-neutral-100 { color: #111827; }
    html:not(.dark) .text-white { color: #111827; }
    html:not(.dark) .text-neutral-300 { color: #4b5563; }
    html:not(.dark) .text-neutral-400 { color: #6b7280; }
    html:not(.dark) .text-neutral-500 { color: #9ca3af; }
    html:not(.dark) .border-dark-600 { border-color: #d1d5db; }
    html:not(.dark) .border-dark-700 { border-color: #e5e7eb; }
    ${lightAccentCss()}
    html:not(.dark) [class*="bg-gradient-to"] { background-image: none !important; }
    html:not(.dark) .text-primary { color: #a16207; }
    html:not(.dark) .bg-primary\\/10 { background-color: rgba(161, 98, 7, 0.08); }
    html:not(.dark) .border-primary\\/30 { border-color: rgba(161, 98, 7, 0.25); }
    html:not(.dark) .text-sky-400 { color: #0369a1; }
    html:not(.dark) .text-yellow-400 { color: #a16207; }
    html:not(.dark) .hover\\:text-sky-300:hover { color: #0284c7; }
    html:not(.dark) .hover\\:text-yellow-300:hover { color: #854d0e; }
    html:not(.dark) .bg-dark-900\\/95 { background-color: rgba(255, 255, 255, 0.95); }
    html:not(.dark) .text-amber-700 { color: #92400e; }

    /* Dark mode - bordas suaves */
    .dark .border-dark-600 { border-color: #374151; }
    .dark .divide-dark-600 > :not([hidden]) ~ :not([hidden]) { border-color: #374151; }

    /* SVG */
    html:not(.dark) svg[role="img"] { filter: saturate(0.82) brightness(0.96); }
    @keyframes wf-pulse { 0%,100% { opacity:.55 } 50% { opacity:1 } }
    @keyframes wf-flow { to { stroke-dashoffset: -28; } }
    @media (prefers-reduced-motion: no-preference) {
      .wf-a { animation: wf-pulse 2.6s ease-in-out infinite; }
      .wf-a:nth-child(2){animation-delay:.25s} .wf-a:nth-child(3){animation-delay:.5s}
      .wf-a:nth-child(4){animation-delay:.75s} .wf-a:nth-child(5){animation-delay:1s} .wf-a:nth-child(6){animation-delay:1.25s}
      .wf-flow { stroke-dasharray: 6 8; animation: wf-flow 1.4s linear infinite; }
    }

    /* Quiz */
    .qz-opt[data-state="ok"] { border-color: #10b981; background: rgba(16,185,129,.15); }
    .qz-opt[data-state="no"] { border-color: #ef4444; background: rgba(239,68,68,.12); }
    .qz-fb { display:none; } .qz[data-answered] .qz-fb { display:block; }

    /* TOC do módulo é um bloco inline, não uma barra lateral sticky */
    [data-inema-toc] { position: static !important; top: auto !important; max-height: none !important; }
    /* Painel de aparência (classes internas) */
    .inema-appearance-sec { margin-bottom: .75rem; }
    .inema-appearance-label { font-size: .7rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #9ca3af; margin-bottom: .35rem; }
    .inema-appearance-row { display: flex; flex-wrap: wrap; gap: .35rem; }
    .inema-chip { font-size: .8rem; padding: .3rem .65rem; border-radius: .5rem; border: 1px solid #374151; background: rgba(31,41,55,.6); color: #e5e7eb; cursor: pointer; }
    .inema-chip:hover { border-color: #FACC15; }
    .inema-chip[aria-pressed="true"], .inema-chip.is-active { background: rgba(250,204,21,.15); border-color: #FACC15; color: #FACC15; }
    html:not(.dark) .inema-chip { background: #f3f4f6; color: #111827; border-color: #d1d5db; }
    html:not(.dark) .inema-chip[aria-pressed="true"], html:not(.dark) .inema-chip.is-active { background: rgba(161,98,7,.1); border-color: #a16207; color: #a16207; }
    /* Coluna do módulo: largura fixa do layout, independente da ordem em que o Tailwind CDN injeta o CSS */
    main.max-w-6xl.inema-prose { max-width: 72rem; }
    /* Code box */
    .codebox pre { white-space: pre-wrap; word-break: break-word; }
    ${extraCss}
  </style>
</head>
<body class="bg-dark-900 text-neutral-100 min-h-screen">
`;
}

export function nav({ rel, active }) {
  const links = TRACKS.map(t => {
    const isActive = active === t.n;
    const cls = isActive
      ? `text-${t.color}-400 bg-${t.color}-500/10`
      : `text-neutral-400 hover:text-${t.color}-400 hover:bg-${t.color}-500/10 transition-colors`;
    return `          <a href="${rel}/curso/${t.slug}/index.html" class="px-3 py-1.5 rounded-lg text-sm font-semibold ${cls}">
            <span class="sm:hidden">T${t.n}</span>
            <span class="hidden sm:inline">${t.short}</span>
          </a>`;
  }).join('\n');
  return `
  <!-- NAVIGATION -->
  <nav class="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-600">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-14">
        <div class="flex items-center space-x-3">
          <a href="${rel}/index.html" class="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300">
            <span class="text-2xl">${LOGO}</span>
            <span class="font-bold text-lg hidden md:inline">${BRAND}</span>
          </a>
          <span class="text-neutral-600">|</span>
          <a href="https://inema.club" target="_blank" class="text-sky-400 hover:text-sky-300 text-sm font-medium">INEMA.CLUB</a>
          <span class="text-neutral-600 hidden sm:inline">-</span>
          <a href="https://inema.pro" target="_blank" class="text-amber-700 dark:text-slate-300 hover:opacity-80 text-sm font-medium hidden sm:inline">PRO</a>
        </div>
        <div class="flex items-center space-x-1 sm:space-x-2">
${links}
          <button type="button" data-inema-journey-open class="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
            <span>🧭</span><span>Minha jornada</span>
            <span data-inema-journey-badge class="text-xs px-1.5 py-0.5 rounded-full bg-primary/20"></span>
          </button>
          <button type="button" data-inema-appearance-toggle="[data-inema-appearance]" aria-expanded="false" class="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors" title="Aparência e leitura">
            <span aria-hidden="true">Aa</span>
          </button>
          <button id="theme-toggle" class="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors" title="Tema claro/escuro">
            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5 text-neutral-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
  ${appearancePanel()}
`;
}

function appearancePanel() {
  return `
  <div data-inema-appearance class="inema-appearance-pop" role="region" aria-label="Aparência e leitura">
    <div class="inema-appearance-sec">
      <p class="inema-appearance-label">Tema</p>
      <div class="inema-appearance-row">
        <button type="button" data-inema-set-theme="inema-dark" class="inema-chip">Escuro</button>
        <button type="button" data-inema-set-theme="claro" class="inema-chip">Claro</button>
        <button type="button" data-inema-set-theme="sepia" class="inema-chip">Sépia</button>
        <button type="button" data-inema-set-theme="foco" class="inema-chip">Foco</button>
        <button type="button" data-inema-set-theme="contraste" class="inema-chip">Contraste</button>
      </div>
    </div>
    <div class="inema-appearance-sec">
      <p class="inema-appearance-label">Tamanho do texto</p>
      <div class="inema-appearance-row">
        <button type="button" data-inema-set-fontscale="90" class="inema-chip">A-</button>
        <button type="button" data-inema-set-fontscale="100" class="inema-chip">A</button>
        <button type="button" data-inema-set-fontscale="115" class="inema-chip">A+</button>
        <button type="button" data-inema-set-fontscale="130" class="inema-chip">A++</button>
      </div>
    </div>
    <div class="inema-appearance-sec">
      <p class="inema-appearance-label">Fonte</p>
      <div class="inema-appearance-row">
        <button type="button" data-inema-set-font="inter" class="inema-chip">Inter</button>
        <button type="button" data-inema-set-font="system" class="inema-chip">Sistema</button>
        <button type="button" data-inema-set-font="leitura" class="inema-chip">Leitura</button>
      </div>
    </div>
    <div class="inema-appearance-sec">
      <p class="inema-appearance-label">Entrelinha</p>
      <div class="inema-appearance-row">
        <button type="button" data-inema-set-leading="1.5" class="inema-chip">Compacta</button>
        <button type="button" data-inema-set-leading="1.7" class="inema-chip">Normal</button>
        <button type="button" data-inema-set-leading="1.9" class="inema-chip">Ampla</button>
      </div>
    </div>
  </div>`;
}

export function footer({ trackLabel = '', landing = false }) {
  return `
  <!-- FOOTER -->
  <footer class="border-t border-dark-600 mt-16 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-500 text-sm space-y-2">
      <p>${COURSE_TITLE}${trackLabel ? ' · ' + trackLabel : ''} · 2026 ·
        <a href="https://inema.club" target="_blank" class="text-sky-400 hover:text-sky-300">INEMA.CLUB</a> -
        <a href="https://inema.pro" target="_blank" class="text-amber-700 dark:text-slate-300">PRO</a></p>
      ${landing ? `<!-- inema-backlink:v1 -->
<p style="display:block;width:100%;text-align:center;font-size:.85rem;margin:.75rem 0 0;opacity:.85"><a href="https://www.inema.club/cursos/304-produtos-na-era-da-ia-saber-o-que-vale-a-pena-construir/" style="color:inherit;text-decoration:underline">Ficha completa deste curso no INEMA.CLUB</a> · <a href="https://www.inema.club/aprender-inteligencia-artificial/" style="color:inherit;text-decoration:underline">Guia: como aprender inteligência artificial</a> · <a href="https://www.inema.club/cursos/" style="color:inherit;text-decoration:underline">Todos os cursos</a></p>
<!-- /inema-backlink:v1 -->` : ''}
    </div>
  </footer>
`;
}

export function scripts({ rel }) {
  return `
  <!-- SCRIPTS núcleo v1 -->
  <script>
    function toggleTopic(button) {
      const topicItem = button.closest('.topic-item');
      const explanation = topicItem.querySelector('.topic-explanation');
      const moduleCard = button.closest('.bg-dark-800');
      if (moduleCard) {
        moduleCard.querySelectorAll('.topic-explanation.active').forEach(exp => {
          if (exp !== explanation) { exp.classList.remove('active'); const b = exp.parentElement.querySelector('[aria-controls="' + exp.id + '"]'); if (b) b.setAttribute('aria-expanded', 'false'); }
        });
      }
      const isOpen = explanation.classList.toggle('active');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const html = document.documentElement;
    if (!html.classList.contains('dark')) { themeToggleDarkIcon.classList.remove('hidden'); } else { themeToggleLightIcon.classList.remove('hidden'); }
    themeToggle.addEventListener('click', () => {
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');
      html.classList.toggle('dark');
      const dark = html.classList.contains('dark');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      if (window.INEMA && INEMA.setPref) { try { INEMA.setPref('theme', dark ? 'inema-dark' : 'claro'); } catch (e) {} }
    });
    function openModal(modalId) { const m = document.getElementById(modalId); if (m) { m.classList.remove('hidden'); document.body.style.overflow = 'hidden'; } }
    function closeModal() { document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden')); document.body.style.overflow = 'auto'; }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Quiz inline (3 perguntas por módulo)
    document.addEventListener('click', (e) => {
      const opt = e.target.closest('.qz-opt'); if (!opt) return;
      const qz = opt.closest('.qz'); if (!qz || qz.hasAttribute('data-answered')) return;
      const ok = opt.getAttribute('data-ok') === '1';
      qz.querySelectorAll('.qz-opt').forEach(o => { o.setAttribute('data-state', o.getAttribute('data-ok') === '1' ? 'ok' : (o === opt ? 'no' : '')); o.disabled = true; });
      qz.setAttribute('data-answered', ok ? 'ok' : 'no');
      const fb = qz.querySelector('.qz-fb'); if (fb) fb.textContent = (ok ? '✓ Certo. ' : '✗ Não é essa. ') + (fb.getAttribute('data-text') || '');
    });
    // Copiar código
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-copy]'); if (!b) return;
      const pre = b.closest('.codebox').querySelector('pre');
      navigator.clipboard && navigator.clipboard.writeText(pre.innerText).then(() => { const t = b.textContent; b.textContent = 'Copiado ✓'; setTimeout(() => b.textContent = t, 1600); });
    });
  </script>

  <script src="${rel}/assets/learn.js"></script>
  <script>
    if (window.INEMA && typeof window.INEMA.init === 'function') { window.INEMA.init(); }
  </script>
</body>
</html>
`;
}

// ---------- Componentes de conteúdo ----------
let blockCounter = 0;
let blockPrefix = 'b';
export function setBlockPrefix(p) { blockPrefix = p; blockCounter = 0; }
function bid() { blockCounter += 1; return `${blockPrefix}-p${blockCounter}`; }

export const c = {
  p(text, cls = 'text-neutral-300 mb-6 leading-relaxed') {
    return `<p class="${cls}" data-inema-block="${bid()}">${text}</p>`;
  },
  concept(t, { title, emoji = '💎', paras = [], bullets = [] }) {
    return `
      <div class="bg-gradient-to-br from-${t.color}-900/30 to-dark-800 rounded-xl border border-${t.color}-500/30 p-6 mb-6">
        <h3 class="text-lg font-semibold text-${t.color}-400 mb-4 flex items-center"><span class="mr-2">${emoji}</span> ${title}</h3>
        ${paras.map(p => `<p class="text-neutral-300 mb-4" data-inema-block="${bid()}">${p}</p>`).join('\n')}
        ${bullets.length ? `<ul class="space-y-2 text-neutral-300">${bullets.map(b => `<li class="flex items-start space-x-2"><span class="text-${t.color}-400 mt-1">&#8226;</span><span>${b}</span></li>`).join('')}</ul>` : ''}
      </div>`;
  },
  grid2(t, { okTitle, ok, badTitle, bad }) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-${t.color}-900/20 rounded-xl border border-${t.color}-500/30 p-6">
          <h4 class="font-bold text-${t.color}-400 mb-4">&#10003; ${okTitle}</h4>
          <ul class="space-y-3 text-neutral-300">${ok.map(i => `<li class="flex items-start space-x-2"><span class="text-${t.color}-400">&#10003;</span><span>${i}</span></li>`).join('')}</ul>
        </div>
        <div class="bg-red-900/20 rounded-xl border border-red-500/30 p-6">
          <h4 class="font-bold text-red-400 mb-4">&#10007; ${badTitle}</h4>
          <ul class="space-y-3 text-neutral-300">${bad.map(i => `<li class="flex items-start space-x-2"><span class="text-red-400">&#10007;</span><span>${i}</span></li>`).join('')}</ul>
        </div>
      </div>`;
  },
  steps(t, { title, items }) {
    return `
      <div class="space-y-5 mb-6">
        ${title ? `<h3 class="text-lg font-semibold text-${t.color}-400 mb-2">${title}</h3>` : ''}
        ${items.map((s, i) => `
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-${t.color}-500/20 flex items-center justify-center"><span class="text-${t.color}-400 font-bold">${i + 1}</span></div>
          <div class="flex-1 bg-dark-800 rounded-xl p-6 border border-dark-600">
            <h4 class="font-semibold text-white mb-2">${s.h}</h4>
            ${s.sub ? `<p class="text-sm text-neutral-400 mb-2">${s.sub}</p>` : ''}
            <p class="text-neutral-300 text-sm" data-inema-block="${bid()}">${s.text}</p>
          </div>
        </div>`).join('')}
      </div>`;
  },
  tip({ title = 'Dica prática', emoji = '💡', text }) {
    return `
      <div class="bg-primary/10 rounded-xl border border-primary/30 p-6 mb-6">
        <h3 class="text-lg font-semibold text-primary mb-3 flex items-center"><span class="mr-2">${emoji}</span> ${title}</h3>
        <p class="text-neutral-300" data-inema-block="${bid()}">${text}</p>
      </div>`;
  },
  alert({ title = 'Armadilha comum', emoji = '⚠️', text }) {
    return `
      <div class="bg-red-900/20 rounded-xl border border-red-500/30 p-6 mb-6">
        <h3 class="text-lg font-semibold text-red-400 mb-3 flex items-center"><span class="mr-2">${emoji}</span> ${title}</h3>
        <p class="text-neutral-300" data-inema-block="${bid()}">${text}</p>
      </div>`;
  },
  data({ title = 'O que os números dizem', emoji = '📊', items }) {
    return `
      <div class="bg-blue-900/20 rounded-xl border border-blue-500/30 p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-400 mb-4 flex items-center"><span class="mr-2">${emoji}</span> ${title}</h3>
        <ul class="space-y-3 text-neutral-300">${items.map(i => `<li class="flex items-start space-x-2"><span class="text-blue-400 mt-1">&#8226;</span><span>${i}</span></li>`).join('')}</ul>
      </div>`;
  },
  cards(t, items, cols = 3) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-4 mb-6">
        ${items.map(i => `
        <div class="bg-dark-800 rounded-xl border border-dark-600 p-5">
          <div class="text-2xl mb-2">${i.emoji || ''}</div>
          <h4 class="font-semibold text-${t.color}-400 mb-2">${i.h}</h4>
          <p class="text-neutral-300 text-sm" data-inema-block="${bid()}">${i.text}</p>
        </div>`).join('')}
      </div>`;
  },
  table(t, { headers, rows, caption = '' }) {
    return `
      <div class="overflow-x-auto rounded-xl border border-dark-600 mb-6">
        <table class="w-full text-sm text-left">
          ${caption ? `<caption class="text-left text-xs text-neutral-500 px-4 pt-3">${caption}</caption>` : ''}
          <thead class="bg-dark-800 text-${t.color}-400"><tr>${headers.map(h => `<th class="px-4 py-3 font-semibold">${h}</th>`).join('')}</tr></thead>
          <tbody class="divide-y divide-dark-600">${rows.map(r => `<tr class="bg-dark-900/40">${r.map((cell, i) => `<td class="px-4 py-3 ${i === 0 ? 'font-semibold text-neutral-100' : 'text-neutral-300'}">${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
  },
  glossary(t, items) {
    return `
      <aside class="bg-dark-800/60 rounded-xl border border-dashed border-${t.color}-500/30 p-5 mb-6">
        <p class="text-xs font-semibold uppercase tracking-wider text-${t.color}-400 mb-3">Novo aqui? Termos deste tópico</p>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          ${items.map(([k, v]) => `<div><dt class="font-semibold text-neutral-100">${k}</dt><dd class="text-neutral-400" data-inema-block="${bid()}">${v}</dd></div>`).join('')}
        </dl>
      </aside>`;
  },
  code(t, { objective, code, verify, lang = 'text' }) {
    const esc = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `
      <div class="codebox bg-dark-800 rounded-xl border border-${t.color}-500/30 overflow-hidden mb-6">
        <div class="px-5 py-3 border-b border-dark-600 flex items-start justify-between gap-3 flex-wrap">
          <div><p class="text-xs font-semibold uppercase tracking-wider text-${t.color}-400 mb-1">Copie e rode</p><p class="text-sm text-neutral-300">${objective}</p></div>
          <button type="button" data-copy class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-${t.color}-500/20 text-${t.color}-400 hover:bg-${t.color}-500/30 transition-colors">Copiar</button>
        </div>
        <pre class="p-5 text-sm text-neutral-100 bg-dark-900/60 font-mono leading-relaxed"><code class="language-${lang}">${esc}</code></pre>
        <div class="px-5 py-3 border-t border-dark-600 text-sm text-neutral-400"><strong class="text-neutral-300">Como verificar:</strong> ${verify}</div>
      </div>`;
  },
  quiz(t, items) {
    return `
      <div class="bg-dark-800 rounded-2xl border border-${t.color}-500/30 p-6 mb-6">
        <h3 class="text-lg font-semibold text-${t.color}-400 mb-1 flex items-center"><span class="mr-2">🧪</span> Teste rápido do módulo</h3>
        <p class="text-sm text-neutral-400 mb-5">Três perguntas. Clique numa opção para ver a resposta.</p>
        <div class="space-y-5">
        ${items.map((q, qi) => `
          <div class="qz" data-q="${qi + 1}">
            <p class="font-semibold text-neutral-100 mb-3">${qi + 1}. ${q.q}</p>
            <div class="grid grid-cols-1 sm:grid-cols-${q.options.length > 3 ? 2 : q.options.length} gap-2">
              ${q.options.map((o, oi) => `<button type="button" class="qz-opt text-left px-4 py-3 rounded-lg border border-dark-600 bg-dark-900/40 text-sm text-neutral-300 hover:border-${t.color}-500/40 transition-colors" data-ok="${oi === q.answer ? 1 : 0}">${o}</button>`).join('')}
            </div>
            <p class="qz-fb mt-3 text-sm text-neutral-300" data-text="${q.why.replace(/"/g, '&quot;')}"></p>
          </div>`).join('')}
        </div>
      </div>`;
  },
  readToggle(t) {
    return `
      <button type="button" data-inema-read-toggle class="mt-4 px-4 py-2 rounded-lg text-sm font-medium bg-${t.color}-500/20 text-${t.color}-400 hover:bg-${t.color}-500/30 transition-colors flex items-center space-x-2 justify-start">
        <span class="inema-ico-todo" aria-hidden="true">&#9744;</span>
        <span class="inema-ico-done" aria-hidden="true">&#9745;</span>
        <span class="inema-label-todo">Marcar como lido</span>
        <span class="inema-label-done">Lido</span>
      </button>`;
  },
  figure(t, svg, legend) {
    return `
      <figure class="rounded-2xl border border-${t.color}-500/30 bg-dark-900/40 p-3 sm:p-4 mb-6 overflow-hidden">
        ${svg}
        <figcaption class="text-xs text-neutral-400 mt-3 px-1"><strong class="text-${t.color}-400">O que olhar:</strong> ${legend}</figcaption>
      </figure>`;
  },
};

// ---------- SVG futuristas (cor da trilha + ciano #38bdf8) ----------
const CY = '#38bdf8', CYP = '#9ad6ff', GRAY = '#9ca3af', F = 'Inter,sans-serif';
let svgId = 0;
function defs(t, id) {
  return `<defs>
    <linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.hexLight}"/><stop offset="1" stop-color="${t.hex}"/></linearGradient>
    <filter id="${id}-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <pattern id="${id}-grid" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="1.3" cy="1.3" r="1.3" fill="${t.hex}" opacity="0.14"/></pattern>
  </defs>`;
}
function wrapText(x, y, lines, fill, size = 11, weight = 400, anchor = 'middle') {
  return lines.map((l, i) => `<text x="${x}" y="${y + i * (size + 3)}" text-anchor="${anchor}" fill="${fill}" font-family="${F}" font-size="${size}" font-weight="${weight}">${l}</text>`).join('');
}
export const svg = {
  // Camadas empilhadas (política / interface / ferramentas / memória / modelo)
  stack(t, { layers, label }) {
    const id = `s${++svgId}`; const W = 800, H = 60 + layers.length * 70;
    let y = 40;
    const rows = layers.map((l, i) => {
      const inset = i * 40; const w = W - 200 - inset * 2; const x = 100 + inset;
      const isLast = i === layers.length - 1;
      const r = `<g ${isLast ? `filter="url(#${id}-glow)"` : ''}><rect x="${x}" y="${y}" width="${w}" height="52" rx="12" fill="${isLast ? t.hexDeep : '#0e1b26'}" stroke="${isLast ? `url(#${id}-g)` : (i % 2 ? CY : t.hex)}" stroke-width="${isLast ? 2.5 : 1.6}" opacity="0.95"/>
        ${wrapText(x + w / 2, y + 23, [l.title], isLast ? t.hexLight : (i % 2 ? CYP : t.hexPale), 14, 700)}
        ${wrapText(x + w / 2, y + 41, [l.sub], GRAY, 10)}</g>`;
      y += 70; return r;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>${rows}
      <text x="60" y="${H / 2}" text-anchor="middle" fill="${GRAY}" font-family="${F}" font-size="10" transform="rotate(-90 60 ${H / 2})">de fora para dentro</text></svg>`;
  },
  // Barras pareadas (antes/depois)
  bars(t, { items, aLabel, bLabel, label, max }) {
    const id = `s${++svgId}`; const W = 800, rowH = 78, H = 70 + items.length * rowH;
    const mx = max || Math.max(...items.flatMap(i => [i.a, i.b])) * 1.1;
    const x0 = 220, wMax = 520;
    const rows = items.map((it, i) => {
      const y = 60 + i * rowH;
      const wa = Math.max(4, it.a / mx * wMax), wb = Math.max(4, it.b / mx * wMax);
      return `<g>${wrapText(x0 - 14, y + 26, [it.label], '#e5e7eb', 13, 600, 'end')}
        <rect x="${x0}" y="${y}" width="${wa}" height="20" rx="6" fill="${GRAY}" opacity="0.55"/>
        <text x="${x0 + wa + 8}" y="${y + 15}" fill="${GRAY}" font-family="${F}" font-size="12">${it.aText ?? it.a}</text>
        <g class="wf-a"><rect x="${x0}" y="${y + 26}" width="${wb}" height="20" rx="6" fill="url(#${id}-g)" filter="url(#${id}-glow)"/></g>
        <text x="${x0 + wb + 8}" y="${y + 41}" fill="${t.hexLight}" font-family="${F}" font-size="12" font-weight="700">${it.bText ?? it.b}</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>
      <rect x="${x0}" y="22" width="14" height="10" rx="3" fill="${GRAY}" opacity="0.55"/><text x="${x0 + 20}" y="31" fill="${GRAY}" font-family="${F}" font-size="11">${aLabel}</text>
      <rect x="${x0 + 130}" y="22" width="14" height="10" rx="3" fill="${t.hex}"/><text x="${x0 + 150}" y="31" fill="${t.hexLight}" font-family="${F}" font-size="11" font-weight="600">${bLabel}</text>${rows}</svg>`;
  },
  // Fluxo horizontal de etapas
  flow(t, { steps, label }) {
    const id = `s${++svgId}`; const n = steps.length; const W = 800, H = 200;
    const gap = 24, bw = (W - 80 - gap * (n - 1)) / n;
    const boxes = steps.map((s, i) => {
      const x = 40 + i * (bw + gap); const y = 60; const isCy = i % 2 === 1;
      return `<g class="wf-a"><rect x="${x}" y="${y}" width="${bw}" height="84" rx="12" fill="${isCy ? '#0e1b26' : t.hexDeep}" stroke="${isCy ? CY : t.hex}" stroke-width="1.8"/>
        <circle cx="${x + 18}" cy="${y + 18}" r="10" fill="${isCy ? CY : t.hex}"/><text x="${x + 18}" y="${y + 22}" text-anchor="middle" fill="#0b1220" font-family="${F}" font-size="11" font-weight="700">${i + 1}</text>
        ${wrapText(x + bw / 2, y + 44, [s.title], isCy ? CYP : t.hexPale, n >= 5 ? 10.5 : 12, 700)}
        ${wrapText(x + bw / 2, y + 62, s.sub ? s.sub.split('|') : [], GRAY, 9.5)}</g>
        ${i < n - 1 ? `<path class="wf-flow" d="M${x + bw + 2} ${y + 42} L${x + bw + gap - 2} ${y + 42}" stroke="${CY}" stroke-width="2" fill="none"/><polygon points="${x + bw + gap - 6},${y + 37} ${x + bw + gap - 6},${y + 47} ${x + bw + gap},${y + 42}" fill="${CY}"/>` : ''}`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>${boxes}
      <text x="${W / 2}" y="${H - 22}" text-anchor="middle" fill="${GRAY}" font-family="${F}" font-size="11" font-style="italic">${label}</text></svg>`;
  },
  // Fan-out: centro → grupos com contagem
  fanout(t, { center, groups, label }) {
    const id = `s${++svgId}`; const W = 800, H = Math.max(300, 80 + groups.length * 62); const cx = 130, cy = H / 2;
    const n = groups.length; const colX = 380; const boxW = 400; const rowH = (H - 40) / n;
    const trunc = (s, max) => s.length > max ? s.slice(0, max - 1) + '…' : s;
    const g = groups.map((gr, i) => {
      const y = 20 + rowH * i + rowH / 2; const isCy = i % 2 === 1;
      return `<path d="M${cx + 90} ${cy} C ${(cx + colX) / 2} ${cy}, ${(cx + colX) / 2} ${y}, ${colX} ${y}" fill="none" stroke="${isCy ? CY : t.hex}" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.6"/>
        <g class="wf-a"><rect x="${colX}" y="${y - 24}" width="${boxW}" height="48" rx="10" fill="${isCy ? '#0e1b26' : t.hexDeep}" stroke="${isCy ? CY : t.hex}" stroke-width="1.6"/>
        <text x="${colX + 40}" y="${y + 6}" text-anchor="middle" fill="${isCy ? CY : t.hexLight}" font-family="${F}" font-size="18" font-weight="800">+${gr.n}</text>
        <text x="${colX + 74}" y="${y - 3}" fill="#e5e7eb" font-family="${F}" font-size="11.5" font-weight="600">${trunc(gr.title, 48)}</text>
        <text x="${colX + 74}" y="${y + 13}" fill="${GRAY}" font-family="${F}" font-size="9.5">${trunc(gr.sub, 62)}</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>
      <g filter="url(#${id}-glow)"><circle cx="${cx}" cy="${cy}" r="88" fill="${t.hexDeep}" stroke="url(#${id}-g)" stroke-width="2.5"/></g>
      ${wrapText(cx, cy - 8, center.split('|'), t.hexLight, 15, 800)}${g}</svg>`;
  },
  // Duas colunas comparadas (modelo × produto, memória × conversas)
  split(t, { left, right, label, bridge }) {
    const id = `s${++svgId}`; const n = Math.max(left.items.length, right.items.length); const H = 130 + n * 34;
    const col = (x, side, isCy) => `<rect x="${x}" y="30" width="330" height="${H - 60}" rx="16" fill="${isCy ? '#0e1b26' : t.hexDeep}" stroke="${isCy ? CY : t.hex}" stroke-width="2" opacity="0.95"/>
      ${wrapText(x + 165, 62, [side.title], isCy ? CY : t.hexLight, 15, 800)}
      ${side.items.map((it, i) => `<g class="wf-a"><circle cx="${x + 26}" cy="${96 + i * 34}" r="4" fill="${isCy ? CY : t.hexLight}"/><text x="${x + 40}" y="${100 + i * 34}" fill="#e5e7eb" font-family="${F}" font-size="12">${it}</text></g>`).join('')}`;
    return `<svg viewBox="0 0 800 ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="800" height="${H}" fill="url(#${id}-grid)"/>
      ${col(40, left, false)}${col(430, right, true)}
      <line x1="385" y1="${H / 2 - 12}" x2="415" y2="${H / 2 - 12}" stroke="${GRAY}" stroke-width="1.5"/><line x1="385" y1="${H / 2 - 4}" x2="415" y2="${H / 2 - 4}" stroke="${GRAY}" stroke-width="1.5"/>
      ${bridge ? `<text x="400" y="${H / 2 + 16}" text-anchor="middle" fill="${GRAY}" font-family="${F}" font-size="9.5">${bridge}</text>` : ''}</svg>`;
  },
  // Curva de esforço: plana × íngreme
  curve(t, { series, xLabels, label, yLabel }) {
    const id = `s${++svgId}`; const W = 800, H = 360; const x0 = 90, x1 = 760, y0 = 300, y1 = 50;
    const n = xLabels.length; const px = i => x0 + (x1 - x0) * i / (n - 1); const py = v => y0 - (y0 - y1) * v / 100;
    const lines = series.map((s, si) => {
      const color = si === 0 ? t.hexLight : CY;
      const d = s.values.map((v, i) => `${i ? 'L' : 'M'}${px(i)} ${py(v)}`).join(' ');
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="3" filter="url(#${id}-glow)"/>
        ${s.values.map((v, i) => `<circle cx="${px(i)}" cy="${py(v)}" r="5" fill="${color}"/><text x="${px(i)}" y="${py(v) - 12}" text-anchor="middle" fill="${color}" font-family="${F}" font-size="11" font-weight="700">${s.texts ? s.texts[i] : v}</text>`).join('')}
        <text x="${x1 + 6}" y="${py(s.values[n - 1]) + 4}" fill="${color}" font-family="${F}" font-size="11" font-weight="600">${s.name}</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>
      <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${GRAY}" stroke-width="1.5"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="${GRAY}" stroke-width="1.5"/>
      ${xLabels.map((l, i) => `<text x="${px(i)}" y="${y0 + 22}" text-anchor="middle" fill="#e5e7eb" font-family="${F}" font-size="12" font-weight="600">${l}</text>`).join('')}
      <text x="${x0 - 12}" y="${(y0 + y1) / 2}" text-anchor="middle" fill="${GRAY}" font-family="${F}" font-size="10" transform="rotate(-90 ${x0 - 12} ${(y0 + y1) / 2})">${yLabel}</text>
      ${lines}<text x="${W / 2}" y="${H - 10}" text-anchor="middle" fill="${GRAY}" font-family="${F}" font-size="11" font-style="italic">${label}</text></svg>`;
  },
  // Donut de partes
  donut(t, { parts, center, label }) {
    const id = `s${++svgId}`; const W = 800, H = 340; const cx = 220, cy = 170, r = 110, sw = 34;
    const total = parts.reduce((a, p) => a + p.value, 0); let acc = 0;
    const C = 2 * Math.PI * r;
    const arcs = parts.map((p, i) => {
      const frac = p.value / total; const dash = `${C * frac} ${C * (1 - frac)}`; const off = -C * acc; acc += frac;
      const color = [t.hex, CY, GRAY][i % 3];
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-dasharray="${dash}" stroke-dashoffset="${off}" transform="rotate(-90 ${cx} ${cy})" opacity="${i === 2 ? 0.5 : 0.95}"/>`;
    }).join('');
    const legend = parts.map((p, i) => { const color = [t.hexLight, CY, GRAY][i % 3]; const y = 100 + i * 60; return `<rect x="420" y="${y - 14}" width="16" height="16" rx="4" fill="${color}"/><text x="446" y="${y - 1}" fill="#e5e7eb" font-family="${F}" font-size="14" font-weight="700">${p.title}</text><text x="446" y="${y + 17}" fill="${GRAY}" font-family="${F}" font-size="11">${p.sub}</text>`; }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1f2937" stroke-width="${sw}"/>${arcs}
      ${wrapText(cx, cy - 4, [center.split('|')[0]], t.hexLight, 30, 800)}${wrapText(cx, cy + 22, [center.split('|')[1] || ''], GRAY, 11)}${legend}</svg>`;
  },
  // Balança: dois pratos
  scale(t, { left, right, tilt = 0, label }) {
    const id = `s${++svgId}`; const W = 800, H = 320; const cx = 400, top = 70;
    const dy = tilt * 30;
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>
      <line x1="${cx}" y1="${top}" x2="${cx}" y2="${H - 50}" stroke="${GRAY}" stroke-width="4"/><rect x="${cx - 80}" y="${H - 54}" width="160" height="12" rx="6" fill="${GRAY}"/>
      <line x1="${cx - 220}" y1="${top + dy}" x2="${cx + 220}" y2="${top - dy}" stroke="${t.hex}" stroke-width="4" filter="url(#${id}-glow)"/>
      <g class="wf-a"><rect x="${cx - 320}" y="${top + dy + 40}" width="200" height="110" rx="14" fill="${t.hexDeep}" stroke="${t.hex}" stroke-width="2"/>
      <line x1="${cx - 220}" y1="${top + dy}" x2="${cx - 220}" y2="${top + dy + 40}" stroke="${t.hex}" stroke-width="2"/>
      ${wrapText(cx - 220, top + dy + 72, [left.title], t.hexLight, 15, 800)}${wrapText(cx - 220, top + dy + 96, left.lines, '#e5e7eb', 11)}</g>
      <g class="wf-a"><rect x="${cx + 120}" y="${top - dy + 40}" width="200" height="110" rx="14" fill="#0e1b26" stroke="${CY}" stroke-width="2"/>
      <line x1="${cx + 220}" y1="${top - dy}" x2="${cx + 220}" y2="${top - dy + 40}" stroke="${CY}" stroke-width="2"/>
      ${wrapText(cx + 220, top - dy + 72, [right.title], CY, 15, 800)}${wrapText(cx + 220, top - dy + 96, right.lines, '#e5e7eb', 11)}</g>
      <text x="${cx}" y="${H - 14}" text-anchor="middle" fill="${GRAY}" font-family="${F}" font-size="11" font-style="italic">${label}</text></svg>`;
  },
  // Grade de "cartões" de ferramentas (lista de nomes em caixinhas)
  chips(t, { title, items, label, cols = 4 }) {
    const id = `s${++svgId}`; const W = 800; const rows = Math.ceil(items.length / cols); const H = 70 + rows * 44;
    const cw = (W - 60 - (cols - 1) * 12) / cols;
    const chips = items.map((it, i) => { const r = Math.floor(i / cols), col = i % cols; const x = 30 + col * (cw + 12), y = 54 + r * 44; const isCy = (r + col) % 2 === 1;
      return `<g class="wf-a"><rect x="${x}" y="${y}" width="${cw}" height="32" rx="8" fill="${isCy ? '#0e1b26' : t.hexDeep}" stroke="${isCy ? CY : t.hex}" stroke-width="1.4"/><text x="${x + cw / 2}" y="${y + 21}" text-anchor="middle" fill="${isCy ? CYP : t.hexPale}" font-family="ui-monospace,monospace" font-size="11.5">${it}</text></g>`; }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${label}">${defs(t, id)}<rect width="${W}" height="${H}" fill="url(#${id}-grid)"/>
      <text x="30" y="34" fill="${t.hexLight}" font-family="${F}" font-size="14" font-weight="800">${title}</text>${chips}</svg>`;
  },
};

// ---------- Páginas ----------
export function modulePage({ t, m, prev, next, manifestJson, tracksContent }) {
  const rel = '../..';
  setBlockPrefix(`m${m.id}`);
  const topicsHtml = m.topics.map((tp, i) => {
    const n = i + 1;
    return `
    <!-- TÓPICO ${n} -->
    <section id="topico-${n}" data-inema-topic="modulo-${m.id}#topico-${n}" class="mb-16">
      <div class="flex items-center space-x-4 mb-6">
        <span class="flex items-center justify-center w-12 h-12 rounded-full bg-${t.color}-500/20 text-${t.color}-400 font-bold text-xl">${n}</span>
        <h2 class="text-2xl font-bold">${tp.emoji} ${tp.title}</h2>
      </div>
      ${tp.body(t).join('\n')}
      ${c.readToggle(t)}
    </section>`;
  }).join('\n');

  const stats = `
      <div class="grid grid-cols-4 gap-4 mt-8 max-w-2xl">
        ${[[m.topics.length, 'Tópicos'], [m.minutes, 'Minutos'], [m.level, 'Nível'], [m.kind, 'Tipo']].map(([v, l]) => `<div class="bg-dark-800/50 rounded-lg p-3 border border-dark-600"><div class="text-xl font-bold text-${t.color}-400">${v}</div><div class="text-xs text-neutral-400">${l}</div></div>`).join('')}
      </div>`;

  return head({ rel, title: m.title, desc: m.lead, manifestJson }) + nav({ rel, active: t.n }) + `
  <!-- BREADCRUMB -->
  <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex items-center space-x-2 text-sm text-neutral-400">
      <a href="${rel}/index.html" class="hover:text-${t.color}-400">Início</a><span>/</span>
      <a href="index.html" class="hover:text-${t.color}-400">Trilha ${t.n}</a><span>/</span>
      <span class="text-${t.color}-400">Módulo ${m.id.replace('-', '.')}</span>
    </div>
  </nav>

  <!-- HEADER -->
  <header class="bg-gradient-to-br from-${t.color}-900/30 via-dark-800 to-dark-800 py-12 border-b border-dark-600">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <span class="inline-block px-3 py-1 bg-${t.color}-500/20 text-${t.color}-400 text-xs font-semibold rounded-full mb-4">MÓDULO ${m.id.replace('-', '.')}</span>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">${m.emoji} ${m.title}</h1>
      <p class="text-lg text-neutral-400 max-w-3xl">${m.lead}</p>
      ${stats}
      <div data-inema-meter="modulo:${m.id}" class="inema-meter max-w-md mt-6" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do módulo">
        <div class="flex justify-between text-sm text-neutral-400 mb-1"><span data-inema-meter-frac>0 de ${m.topics.length}</span><span data-inema-meter-pct>0%</span></div>
        <div class="inema-bar h-2 bg-dark-700 rounded-full overflow-hidden"><div class="inema-bar__fill h-full bg-${t.color}-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 inema-prose" data-inema-module="${m.id}" data-inema-track="${t.n}">
    <nav aria-label="Tópicos deste módulo" class="mb-12 bg-dark-800 rounded-xl border border-dark-600 p-5" data-inema-toc>
      <p class="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Neste módulo</p>
      <ol class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        ${m.topics.map((tp, i) => `<li><a href="#topico-${i + 1}" class="flex items-start gap-2 text-neutral-300 hover:text-${t.color}-400"><span class="w-5 h-5 rounded-full bg-${t.color}-500/20 text-${t.color}-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${i + 1}</span><span>${tp.title}</span></a></li>`).join('')}
      </ol>
    </nav>
${topicsHtml}

    <!-- QUIZ -->
    ${m.quiz ? c.quiz(t, m.quiz) : ''}

    <!-- RESUMO DO MÓDULO -->
    <section class="mb-12">
      <div class="bg-gradient-to-br from-${t.color}-900/40 via-dark-800 to-dark-800 rounded-xl border border-${t.color}-500/30 p-8">
        <h2 class="text-2xl font-bold mb-6 flex items-center"><span class="mr-3">📋</span> Resumo do módulo</h2>
        <div class="space-y-4 mb-8">
          ${m.summary.map(([h, s]) => `<div class="flex items-start space-x-3"><span class="text-${t.color}-400 mt-1">&#10003;</span><div><strong class="text-white">${h}</strong><span class="text-neutral-400"> - ${s}</span></div></div>`).join('')}
        </div>
        ${next ? `<div class="bg-dark-800/50 rounded-lg p-4 mb-8"><h3 class="font-semibold text-${t.color}-400 mb-2">Próximo módulo:</h3><p class="text-neutral-300">${next.id.replace('-', '.')} - ${next.title}</p></div>` : ''}
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="${prev ? `modulo-${prev.id}.html` : 'index.html'}" class="flex-1 text-center px-6 py-3 bg-dark-700 text-neutral-300 rounded-lg font-semibold hover:bg-dark-600 transition-colors">&#8592; ${prev ? `Módulo ${prev.id.replace('-', '.')}` : 'Voltar para a trilha'}</a>
          <a href="${next ? `modulo-${next.id}.html` : (t.n < 3 ? `../trilha${t.n + 1}/index.html` : `${rel}/index.html`)}" class="flex-1 text-center px-6 py-3 bg-${t.color}-600 text-white rounded-lg font-semibold hover:bg-${t.color}-500 transition-colors">${next ? 'Próximo módulo' : (t.n < 3 ? `Trilha ${t.n + 1}` : 'Início do curso')} &#8594;</a>
        </div>
      </div>
    </section>
  </main>
` + footer({ trackLabel: `Trilha ${t.n} — ${t.title}` }) + scripts({ rel });
}

export function trackIndex({ t, manifestJson, heroSvg }) {
  const rel = '../..';
  const totalTopics = t.modules.reduce((a, m) => a + m.topics.length, 0);
  const totalMin = t.modules.reduce((a, m) => a + m.minutes, 0);
  const map = t.modules.map(m => `
        <a href="#modulo-${m.id}" class="group bg-dark-800 rounded-xl border border-dark-600 hover:border-${t.color}-500/30 p-5 transition-all">
          <div class="flex items-center justify-between mb-3"><span class="text-${t.color}-400 font-bold text-sm">${m.id.replace('-', '.')}</span><span class="text-neutral-500 text-xs">~${m.minutes} min</span></div>
          <h3 class="font-semibold text-neutral-100 group-hover:text-${t.color}-400 transition-colors mb-1">${m.emoji} ${m.title}</h3>
          <p class="text-xs text-neutral-500">${m.punch}</p>
        </a>`).join('');
  const cards = t.modules.map(m => `
    <div id="modulo-${m.id}" class="bg-dark-800 rounded-2xl border border-dark-600 mb-8 overflow-hidden scroll-mt-20" data-inema-module="${m.id}">
      <div class="p-6 border-b border-dark-600">
        <div class="flex items-start justify-between flex-wrap gap-3 mb-3">
          <span class="text-${t.color}-400 font-bold text-sm">Módulo ${m.id.replace('-', '.')}</span>
          <div class="flex items-center gap-4"><span class="text-neutral-500 text-sm">~${m.minutes} min</span>
            <span data-inema-meter="modulo:${m.id}" class="text-xs text-${t.color}-400 font-semibold"><span data-inema-meter-frac>0 de ${m.topics.length}</span></span></div>
        </div>
        <h2 class="text-2xl font-bold mb-2">${m.emoji} ${m.title}</h2>
        <p class="text-neutral-400">${m.lead}</p>
      </div>
      <div class="p-6">
        <p class="text-sm text-neutral-500 mb-4 font-semibold uppercase tracking-wider">Tópicos do módulo</p>
        <div class="space-y-3 divide-y divide-dark-600">
          ${m.topics.map((tp, i) => `
          <div class="topic-item pt-3 ${i === 0 ? 'first:pt-0' : ''}">
            <button onclick="toggleTopic(this)" class="w-full flex items-center justify-start gap-3 text-left group" aria-expanded="false" aria-controls="t${t.n}m${m.id}-exp${i + 1}">
              <span class="w-6 h-6 rounded-full bg-${t.color}-500/20 text-${t.color}-400 text-sm font-bold flex items-center justify-center flex-shrink-0">${i + 1}</span>
              <div><span class="font-semibold text-neutral-100 group-hover:text-${t.color}-400 transition-colors">${tp.emoji} ${tp.title}</span><p class="text-xs text-neutral-500 mt-0.5">${tp.sub}</p></div>
            </button>
            <div class="topic-explanation mt-4 pl-9" id="t${t.n}m${m.id}-exp${i + 1}">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="bg-dark-700 rounded-xl p-4 border border-dark-600"><p class="text-xs font-semibold text-${t.color}-400 mb-2">O que é</p><p class="text-sm text-neutral-300">${tp.what}</p></div>
                <div class="bg-dark-700 rounded-xl p-4 border border-dark-600"><p class="text-xs font-semibold text-${t.color}-400 mb-2">Por que aprender</p><p class="text-sm text-neutral-300">${tp.why}</p></div>
                <div class="bg-dark-700 rounded-xl p-4 border border-dark-600"><p class="text-xs font-semibold text-${t.color}-400 mb-2">Conceitos-chave</p><p class="text-sm text-neutral-300">${tp.keys}</p></div>
              </div>
            </div>
          </div>`).join('')}
        </div>
        <div class="mt-6 flex justify-start">
          <a href="modulo-${m.id}.html" class="inline-flex items-center gap-2 px-5 py-2.5 bg-${t.color}-500/20 hover:bg-${t.color}-500/30 text-${t.color}-400 font-semibold rounded-xl border border-${t.color}-500/30 transition-colors text-sm">Ver Completo →</a>
        </div>
      </div>
    </div>`).join('');

  const prevT = t.n > 1 ? TRACKS[t.n - 2] : null; const nextT = t.n < 3 ? TRACKS[t.n] : null;
  return head({ rel, title: `Trilha ${t.n} — ${t.title}`, desc: t.desc, manifestJson }) + nav({ rel, active: t.n }) + `
  <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex items-center space-x-2 text-sm text-neutral-400"><a href="${rel}/index.html" class="hover:text-${t.color}-400">Início</a><span>/</span><span class="text-${t.color}-400">Trilha ${t.n}</span></div>
  </nav>

  <header class="bg-gradient-to-br from-${t.color}-900/30 via-dark-800 to-dark-800 py-12 border-b border-dark-600" data-inema-track="${t.n}">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <span class="inline-block px-3 py-1 bg-${t.color}-500/20 text-${t.color}-400 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Trilha ${t.n}</span>
          <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-neutral-100">${t.emoji} ${t.title}</h1>
          <p class="text-neutral-300 text-lg mb-6">${t.desc}</p>
          <div class="grid grid-cols-3 gap-4 mb-6">
            ${[[t.modules.length, 'Módulos'], [totalTopics, 'Tópicos'], [`~${Math.round(totalMin / 60 * 10) / 10}h`, 'Duração']].map(([v, l]) => `<div class="bg-dark-800 rounded-xl p-4 border border-dark-600 text-center"><div class="text-2xl font-bold text-${t.color}-400">${v}</div><div class="text-xs text-neutral-500 mt-1">${l}</div></div>`).join('')}
          </div>
          <div data-inema-meter="trilha:${t.n}" class="inema-meter bg-dark-800 rounded-xl p-4 border border-dark-600" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso da trilha ${t.n}">
            <div class="flex justify-between text-sm text-neutral-400 mb-2"><span>Seu progresso</span><span class="text-${t.color}-400 font-semibold" data-inema-meter-pct>0%</span></div>
            <div class="inema-bar h-2 bg-dark-700 rounded-full overflow-hidden mb-2"><div class="inema-bar__fill h-full bg-${t.color}-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
            <div class="text-xs text-neutral-500"><span data-inema-meter-frac>0 de ${totalTopics}</span> tópicos concluídos</div>
          </div>
        </div>
        <div class="rounded-2xl border border-${t.color}-500/30 bg-dark-900/40 p-4">${heroSvg}</div>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Mapa da trilha</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${map}</div>
    </section>

    <h2 class="text-2xl font-bold mb-6">Conteúdo detalhado</h2>
${cards}
    <div class="flex justify-between items-center mt-10 pt-8 border-t border-dark-600 flex-wrap gap-3">
      <a href="${prevT ? `../${prevT.slug}/index.html` : `${rel}/index.html`}" class="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-700 hover:bg-dark-600 text-neutral-300 font-semibold rounded-xl border border-dark-600 transition-colors text-sm">← ${prevT ? `Trilha ${prevT.n}: ${prevT.short}` : 'Página inicial'}</a>
      ${nextT ? `<a href="../${nextT.slug}/index.html" class="inline-flex items-center gap-2 px-5 py-2.5 bg-${nextT.color}-500/20 hover:bg-${nextT.color}-500/30 text-${nextT.color}-400 font-semibold rounded-xl border border-${nextT.color}-500/30 transition-colors text-sm">Trilha ${nextT.n}: ${nextT.short} →</a>` : `<a href="${rel}/index.html" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-xl border border-primary/30 transition-colors text-sm">Início do curso →</a>`}
    </div>
  </main>
` + footer({ trackLabel: `Trilha ${t.n} — ${t.title}` }) + scripts({ rel });
}
