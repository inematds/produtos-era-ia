# Falhas — produtos-era-ia

| data | o que quebrou | menor correção | prompt \| infra |
|---|---|---|---|
| 2026-09-28 | i18n.py tratou o `<!DOCTYPE html>` como texto: páginas EN/ES com "html" solto no topo e em modo quirks | Pular Doctype/Declaration no walker do BeautifulSoup + checar `document.compatMode` no teste | prompt |
| 2026-09-28 | `meta description` dos módulos quebrava quando o resumo tinha aspas (atributo sem escape no lib.mjs) | Escapar `&` e `"` no `head()` | prompt |
| 2026-09-28 | Coluna do módulo variava (1152px × 680px) conforme a ordem em que o Tailwind CDN injeta o CSS vs `.inema-prose` do learn.css | `main.max-w-6xl.inema-prose { max-width: 72rem }` no CSS inline | infra |
