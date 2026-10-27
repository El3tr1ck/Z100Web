/* Web IDE Pro · service worker
   1) Servidor virtual: <escopo>/__run__/<projeto>/<arquivo> responde com os arquivos do projeto,
      então o preview roda numa origem real (https), sem blob: nem about:blank.
   2) Cache offline da própria IDE e das bibliotecas de CDN.
   Coloque este arquivo na MESMA pasta da IDE. */
const CACHE = 'webide-v1';
const SC = new URL(self.registration.scope).pathname, RUNP = SC + '__run__/';
const CDN = /^https:\/\/(cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|esm\.sh|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
const MT = { html:'text/html', htm:'text/html', css:'text/css', js:'text/javascript', mjs:'text/javascript', ts:'text/javascript', tsx:'text/javascript', jsx:'text/javascript',
  json:'application/json', svg:'image/svg+xml', txt:'text/plain', md:'text/markdown', xml:'application/xml', csv:'text/csv' };
const mem = {};

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('message', e => {
  const d = e.data;
  if (d && d.type == 'sync') {
    mem[d.pid] = { files: d.files, compiled: d.compiled || {}, bridge: d.bridge || '' };
    e.ports[0] && e.ports[0].postMessage(1);
  }
});

const txt = (m, s) => new Response(m, { status: s, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
const H = e => ({ 'Content-Type': (MT[e] || 'text/plain') + ';charset=utf-8', 'Cache-Control': 'no-store' });

// Se o service worker "dormiu" e perdeu a memória, lê o projeto direto do IndexedDB da IDE.
async function proj(pid) {
  if (mem[pid]) return mem[pid];
  try {
    const db = await new Promise((ok, no) => { const q = indexedDB.open('webide2'); q.onsuccess = () => ok(q.result); q.onerror = () => no(); });
    const p = await new Promise(ok => { const q = db.transaction('p').objectStore('p').get(pid); q.onsuccess = () => ok(q.result); q.onerror = () => ok(null); });
    if (p) return (mem[pid] = { files: p.files, compiled: {}, bridge: '' });
  } catch (e) {}
  return null;
}

const find = (F, p) => {
  p = p.split('/').filter(x => x && x != '.').join('/') || 'index.html';
  for (const x of ['', '.html', '.tsx', '.ts', '.jsx', '.js', '.css', '.json', '/index.html', '/index.tsx', '/index.ts', '/index.jsx', '/index.js'])
    if (F[p + x] != null) return p + x;
  return null;
};

async function serve(u, req) {
  const rest = u.pathname.slice(RUNP.length), i = rest.indexOf('/');
  if (i < 0) return txt('Caminho inválido', 404);
  const pid = rest.slice(0, i), path = decodeURIComponent(rest.slice(i + 1));
  const P = await proj(pid);
  if (!P) return txt('Projeto não encontrado. Volte à IDE e execute de novo.', 404);
  const k = find(P.files, path);
  if (k == null) return txt('404 · ' + path, 404);
  const e = (k.split('.').pop() || '').toLowerCase(), v = P.files[k];

  if (v.startsWith('data:')) {                                   // arquivo binário (imagem, fonte…)
    const m = v.match(/^data:([^;,]*)(;base64)?,(.*)$/s);
    const b = m[2] ? Uint8Array.from(atob(m[3]), c => c.charCodeAt(0)) : new TextEncoder().encode(decodeURIComponent(m[3]));
    return new Response(b, { headers: { 'Content-Type': m[1] || 'application/octet-stream', 'Cache-Control': 'no-store' } });
  }
  if (P.compiled[k] != null) return new Response(P.compiled[k], { headers: H('js') });   // TS/JSX já compilados pela IDE
  const asModule = req.destination == 'script';                  // import './x.css' ou './x.json' dentro de módulos
  if (asModule && e == 'css') return new Response("const s=document.createElement('style');s.textContent=" + JSON.stringify(v) + ';document.head.append(s);', { headers: H('js') });
  if (asModule && e == 'json') return new Response('export default ' + v, { headers: H('js') });
  let body = v;
  if (e == 'html' || e == 'htm') {                               // injeta o console/CORS da IDE
    const b = P.bridge || '';
    body = /<head[^>]*>/i.test(v) ? v.replace(/<head[^>]*>/i, m => m + b) : b + v;
  }
  return new Response(body, { headers: H(e) });
}

// Bibliotecas de CDN: cache primeiro. Pedidos "no-cors" viram "cors" para a resposta não ser opaca
// (respostas opacas ocupam muito espaço de cota).
async function cached(req) {
  const c = await caches.open(CACHE), hit = await c.match(req.url);
  if (hit) return hit;
  try {
    const r = await fetch(req.mode == 'no-cors' ? new Request(req.url, { mode: 'cors', credentials: 'omit' }) : req);
    if (r.ok) c.put(req.url, r.clone());
    return r;
  } catch (e) { return txt('Sem conexão e este arquivo ainda não está no cache.', 503); }
}
// A própria IDE: rede primeiro (pega atualizações), cache se estiver offline.
async function shell(req) {
  const c = await caches.open(CACHE);
  try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }
  catch (e) { return (await c.match(req, { ignoreSearch: true })) || txt('Sem conexão.', 503); }
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method != 'GET') return;
  const u = new URL(req.url), same = u.origin == location.origin;
  if (same && u.pathname.startsWith(RUNP)) return e.respondWith(serve(u, req));
  // pedidos "/arquivo.css" feitos de dentro do preview apontam para o projeto, não para a IDE
  const ref = req.referrer || '', pre = location.origin + RUNP;
  if (same && ref.startsWith(pre)) {
    const pid = ref.slice(pre.length).split('/')[0];
    return e.respondWith(serve(new URL(RUNP + pid + u.pathname, location.origin), req));
  }
  if (CDN.test(req.url)) return e.respondWith(cached(req));
  if (same) return e.respondWith(shell(req));
});
