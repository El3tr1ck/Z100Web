<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Web IDE Pro</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js"></script>
<style>
:root{--b0:#181818;--b1:#1f1f1f;--bd:#2b2b2b;--fg:#cccccc;--mu:#8b8b8b;--ac:#0078d4;--sel:#04395e;--hv:#2a2d2e;--er:#f85149;--wr:#d29922;--ok:#3fb950;--in:#4daafc;--mono:'Cascadia Code','Cascadia Mono',Consolas,Menlo,monospace}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--b1);color:var(--fg);font:13px/1.4 'Segoe UI',system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;overflow:hidden;user-select:none}
button{background:none;border:0;color:inherit;font:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
input,select,textarea{background:#313131;color:var(--fg);border:1px solid #3c3c3c;border-radius:3px;padding:5px 8px;font:inherit;width:100%;outline:0;user-select:text}
input:focus,select:focus,textarea:focus{border-color:var(--ac)}
input[type=checkbox]{width:auto;accent-color:var(--ac)}
label{color:var(--mu);font-size:12px}
.hide{display:none!important}.mu,small{color:var(--mu)}.sp{flex:1}
svg.ic{flex-shrink:0}svg.fi{width:16px;height:16px;flex-shrink:0}
#top{height:36px;background:var(--b0);border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:2px;padding:0 8px;flex-shrink:0}
#top button{padding:0 10px;border-radius:4px;height:26px}#top button:hover{background:#ffffff14}
#top #bpj{font-weight:600}#top #sv{color:var(--mu);font-size:12px;margin-left:8px}
#top .lv{display:flex;gap:6px;align-items:center;color:var(--mu);cursor:pointer;margin-right:8px}
#top .run{background:var(--ac);color:#fff;font-weight:600}#top .run:hover{background:#1a8ad9}#top .ai{border:1px solid var(--bd);margin:0 4px}
#main{flex:1;display:flex;min-height:0}
#act{width:48px;background:var(--b0);border-right:1px solid var(--bd);display:flex;flex-direction:column;align-items:center;padding:4px 0;flex-shrink:0}
#act button{width:48px;height:46px;justify-content:center;color:#858585;border-left:2px solid transparent}
#act button:hover{color:#fff}#act button.on{color:#fff;border-left-color:var(--ac)}
#side{width:250px;background:var(--b0);display:flex;flex-direction:column;flex-shrink:0;min-width:0}
.hd{height:35px;padding:0 8px 0 20px;color:var(--mu);display:flex;justify-content:space-between;align-items:center;font-size:12px}
.hd .ac{display:flex}.hd button{padding:4px;border-radius:4px;color:var(--fg)}.hd button:hover{background:#ffffff1a}
#tree{flex:1;overflow:auto;padding-bottom:20px}
.it{height:22px;display:flex;align-items:center;gap:5px;padding-right:8px;cursor:pointer;white-space:nowrap;overflow:hidden}
.it span{overflow:hidden;text-overflow:ellipsis}.it:hover{background:var(--hv)}.it.on{background:var(--sel);color:#fff}.it.sel{background:#ffffff0d}.it.dd{outline:1px dashed var(--ac);outline-offset:-1px}
.cv{display:inline-flex;width:14px;justify-content:center;color:var(--mu);transition:transform .1s}.cv.o{transform:rotate(90deg)}.cv.z{visibility:hidden}
.rsz{flex-shrink:0;z-index:5}.rsz:hover{background:var(--ac)}.rsz.v{width:3px;margin:0 -2px 0 -1px;cursor:col-resize}.rsz.h{height:3px;margin:-2px 0 -1px;cursor:row-resize}
#ed{flex:1;display:flex;flex-direction:column;min-width:0;background:var(--b1)}
#tabs{display:flex;background:var(--b0);overflow-x:auto;flex-shrink:0;height:35px;border-bottom:1px solid var(--bd)}#tabs::-webkit-scrollbar{height:3px}
.tab{display:flex;align-items:center;gap:6px;padding:0 8px 0 12px;cursor:pointer;color:var(--mu);border-right:1px solid var(--bd);border-top:1px solid transparent;white-space:nowrap}
.tab:hover{background:var(--hv)}.tab.on{background:var(--b1);color:#fff;border-top-color:var(--ac);margin-bottom:-1px}
.tab b{display:inline-flex;padding:2px;border-radius:4px;opacity:0;margin-left:2px}.tab:hover b,.tab.on b{opacity:.8}.tab b:hover{background:#ffffff1f;opacity:1}
#crumb{height:22px;display:flex;align-items:center;gap:4px;padding:0 14px;color:var(--mu);font-size:12px;flex-shrink:0}#crumb:empty{display:none}
#mon{flex:1;min-height:0}
#bot{height:240px;background:var(--b0);display:flex;flex-direction:column;border-top:1px solid var(--bd);flex-shrink:0}
#bh{display:flex;align-items:center;padding:0 8px;height:35px;flex-shrink:0}#bts{display:flex;height:100%}
.bt{padding:0 12px;color:var(--mu);border-bottom:1px solid transparent;height:100%}.bt:hover{color:#fff}.bt.on{color:#fff;border-bottom-color:var(--ac)}
.bt .cx{display:inline-flex;opacity:.6;padding:1px;border-radius:3px}.bt .cx:hover{opacity:1;background:#ffffff1f}
.bd{background:var(--er);color:#fff;border-radius:9px;font-size:10px;padding:0 6px;font-weight:600}
#bh .x{padding:5px;border-radius:4px;color:var(--fg)}#bh .x:hover{background:#ffffff1a}
#bc{flex:1;min-height:0;display:flex;flex-direction:column}#con{flex:1;min-height:0;display:flex;flex-direction:column}
#ct{display:flex;align-items:center;gap:8px;padding:4px 10px;border-bottom:1px solid var(--bd);flex-shrink:0}
#ct input{width:180px;padding:2px 8px}.seg{display:flex;gap:2px}.sg{padding:2px 8px;border-radius:10px;color:var(--mu)}.sg:hover{color:#fff}.sg.on{background:#ffffff1a;color:#fff}
#ci{padding:2px 8px;border:1px solid var(--bd);border-radius:4px}#ci:hover{background:#ffffff14}
#cl{flex:1;overflow:auto;font:12px/1.5 var(--mono);user-select:text}
.lg{display:flex;gap:8px;padding:1px 10px;border-bottom:1px solid #ffffff0a;border-left:3px solid transparent;white-space:pre-wrap;word-break:break-word}
.lg .tm{color:#6b6b6b;flex-shrink:0}.lg .pf{width:10px;color:var(--mu);flex-shrink:0}.mg{flex:1;min-width:0}
.l-error{background:#f851491a;color:#ff9b94;border-left-color:var(--er)}.l-warn{background:#d299221a;color:#e3b341;border-left-color:var(--wr)}.l-info{color:var(--in)}.l-sys{color:var(--mu);font-style:italic}
.l-net{color:#9ec9a0}.l-net.bad{color:#ff9b94;background:#f851490f}.l-in{color:#fff}.l-out{color:#9cdcfe}.l-err{color:#ff9b94}
.v-s{color:#ce9178}.v-n{color:#b5cea8}.v-b{color:#569cd6}.v-u{color:#808080}.v-f{color:#dcdcaa}.v-t{color:#4ec9b0}.v-k{color:#9cdcfe}.v-e{color:#ff9b94}
.ob>summary{cursor:pointer;list-style:none;display:inline}.ob>summary::before{content:'';display:inline-block;border:4px solid transparent;border-left-color:var(--mu);margin-right:3px}.ob[open]>summary::before{transform:rotate(90deg) translateX(2px)}.ch{padding-left:16px}.kv{white-space:pre-wrap}
#cr{display:flex;align-items:flex-start;gap:6px;padding:4px 10px;border-top:1px solid var(--bd);flex-shrink:0}
#cr .pr{color:var(--in);font:13px var(--mono);padding-top:3px}
#cin{flex:1;background:transparent;border:0;padding:3px 0;font:12px/1.5 var(--mono);resize:none;max-height:120px}
#cr select{width:auto;padding:2px 6px;font-size:12px}
.term{flex:1;overflow:auto;padding:6px 12px;font:12.5px/1.5 var(--mono);user-select:text}
.tl{white-space:pre-wrap;word-break:break-word}.tl.cmd{color:#fff}.tl.error{color:#ff9b94}.tl.mu{color:var(--mu)}
.ln{display:flex;gap:8px;align-items:center}.ln input{border:0;background:none;padding:0;font:inherit}
.ps{white-space:nowrap}.ps b{color:var(--ok);font-weight:600}.ps span{color:var(--in)}
.ls{display:flex;flex-wrap:wrap;gap:2px 18px}.fe{display:inline-flex;align-items:center;gap:5px}.fe.d{color:var(--in)}
#stb{height:22px;background:var(--ac);color:#fff;display:flex;gap:14px;align-items:center;padding:0 10px;font-size:12px;flex-shrink:0}
#stb span{white-space:nowrap}#ec{cursor:pointer;padding:0 4px}#ec:hover{background:#ffffff26}
.modal{position:fixed;inset:0;background:#00000073;z-index:50;display:flex;align-items:center;justify-content:center}.modal.top{align-items:flex-start;padding-top:10vh}
.box{background:#252526;border:1px solid #454545;border-radius:6px;width:440px;max-width:94vw;max-height:84vh;display:flex;flex-direction:column;box-shadow:0 12px 40px #000a}
.box h3{padding:12px 16px;font-size:13px;font-weight:600;border-bottom:1px solid var(--bd)}
.body{padding:14px 16px;display:flex;flex-direction:column;gap:8px;overflow:auto}
.foot{padding:10px 16px;display:flex;justify-content:flex-end;gap:8px;border-top:1px solid var(--bd)}
.b1,.b2{padding:5px 14px;border-radius:3px;justify-content:center}.b1{background:var(--ac);color:#fff}.b1:hover{background:#1a8ad9}.b2{background:#3a3a3a}.b2:hover{background:#454545}
.row{display:flex;gap:8px}.modal.top .box>input{margin:8px;width:calc(100% - 16px)}
.pl{max-height:50vh;overflow:auto;padding-bottom:6px}
.pi2{padding:4px 16px;cursor:pointer;display:flex;justify-content:space-between;gap:12px;align-items:center}.pi2 .pl1{display:flex;align-items:center;gap:8px}.pi2.on,.pi2:hover{background:var(--sel)}
.prj{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:4px;background:#2d2d2d;margin-top:6px}.pi{flex:1;display:flex;flex-direction:column;min-width:0}
.tg{padding:2px 9px;border-radius:10px;font-size:11px;background:#d2992233;color:var(--wr)}.tg.done{background:#3fb95033;color:var(--ok)}
.prj button:not(.tg){padding:4px 10px;border-radius:3px;background:#3a3a3a}
#cm{position:fixed;background:#252526;border:1px solid #454545;border-radius:5px;z-index:60;min-width:190px;padding:4px;box-shadow:0 6px 20px #000a}
.cmi{padding:5px 12px;cursor:pointer;border-radius:3px}.cmi:hover{background:var(--ac);color:#fff}
#ts{position:fixed;right:14px;bottom:34px;display:flex;flex-direction:column;gap:6px;z-index:70}
.toast{background:#252526;border:1px solid #454545;border-left:3px solid var(--ac);padding:8px 14px;border-radius:4px;box-shadow:0 4px 14px #0008}
.toast.ok{border-left-color:var(--ok)}.toast.warn{border-left-color:var(--wr)}.toast.err{border-left-color:var(--er)}
</style>
</head>
<body>
<div id="top"><button id="bpj" title="Projetos" data-g="folder"><b id="pn">…</b></button><span id="sv"></span><div class="sp"></div><label class="lv" title="Recarrega a aba de preview enquanto você digita"><input type="checkbox" id="lv" checked>Recarregar ao digitar</label><button id="bex">Exportar</button><button id="bim">Importar</button><button class="ai" id="bai">Editar com IA</button><button class="run" id="brun" data-g="play" data-s="12">Executar</button></div>
<div id="main">
<nav id="act"><button id="a1" class="on" data-g="files" data-s="24" title="Explorador (Ctrl+B)"></button><button id="bgs" data-g="search" data-s="24" title="Buscar em todos os arquivos (Ctrl+Shift+F)"></button><button id="a3" data-g="play" data-s="24" title="Executar (F5)"></button><button id="a4" data-g="term" data-s="24" title="Terminal (Ctrl+`)"></button><div class="sp"></div><button id="bset" data-g="sliders" data-s="24" title="Configurações"></button></nav>
<aside id="side"><div class="hd"><span>Explorador</span><span class="ac"><button id="bnf" data-g="filep" title="Novo arquivo (Alt+N)"></button><button id="bnd" data-g="dirp" title="Nova pasta"></button><button id="a5" data-g="collapse" title="Recolher pastas"></button></span></div><div id="tree"></div></aside>
<div id="rv" class="rsz v"></div>
<div id="ed"><div id="tabs"></div><div id="crumb"></div><div id="mon"></div><div id="rh" class="rsz h hide"></div>
<div id="bot" class="hide"><div id="bh"><div id="bts"></div><div class="sp"></div><button class="x" id="bclr" data-g="trash" title="Limpar"></button><button class="x" id="bx" data-g="x" title="Fechar painel (Ctrl+J)"></button></div>
<div id="bc"><div id="con"><div id="ct"><div class="seg" id="fl"></div><input id="fq" placeholder="Filtrar saída" spellcheck="false"><div class="sp"></div><button id="ci" title="Aplica o arquivo ativo no preview sem recarregar">Injetar arquivo ativo</button></div><div id="cl"></div><div id="cr"><span class="pr">&gt;</span><textarea id="cin" rows="1" spellcheck="false" placeholder="JavaScript para executar no preview. Enter executa, Shift+Enter quebra a linha"></textarea><select id="cx" title="Contexto de execução"><option value="p">Preview</option><option value="i">IDE</option></select><select id="sn" title="Testes prontos"></select></div></div></div></div></div></div>
<div id="stb"><span id="ec" title="Abrir console"></span><span id="ai2">Ctrl+Shift+P: comandos · Ctrl+P: abrir arquivo · F5: executar</span><div class="sp"></div><span id="sw" title="Service worker: origem real para o preview e cache offline">Modo local</span><span id="cp">Ln 1, Col 1</span><span id="lg2">—</span></div>
<div id="cm" class="hide"></div><div id="ts"></div>
<input type="file" id="fz" accept=".zip,.json,.7z,.rar,.tar,.gz,.tgz,.bz2,.xz" hidden><input type="file" id="fd" webkitdirectory multiple hidden>

<script>
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const ext=n=>(n.includes('.')?n.split('.').pop():'').toLowerCase(),dir=p=>p.split('/').slice(0,-1).join('/'),bin=s=>s.startsWith('data:');
const norm=p=>{const o=[];p.split('/').forEach(x=>{if(x=='..')o.pop();else if(x&&x!='.')o.push(x)});return o.join('/')};
const LS={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const LANG={js:'javascript',mjs:'javascript',jsx:'javascript',ts:'typescript',tsx:'typescript',py:'python',html:'html',css:'css',json:'json',md:'markdown',xml:'xml',svg:'xml',yml:'yaml',yaml:'yaml'};
const TXT=new Set('html htm css js mjs jsx ts tsx json md txt py svg xml yml yaml csv toml ini env gitignore sh'.split(' '));
const isTxt=k=>{const e=ext(k);return !e||TXT.has(e)},skip=k=>/(^|\/)(node_modules|\.git)(\/|$)/.test(k)||k.endsWith('.DS_Store');
const mime=k=>({png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',ico:'image/x-icon',mp3:'audio/mpeg',mp4:'video/mp4',woff2:'font/woff2'}[ext(k)]||'application/octet-stream');
const BABEL='https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.7/babel.min.js';
const TPL={
web:{'index.html':'<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Meu site</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Olá, mundo!</h1>\n  <button id="b">Clique</button>\n  <script src="script.js"><\/script>\n</body>\n</html>','style.css':'body{font-family:system-ui;background:#111;color:#fff;padding:2rem}','script.js':'document.getElementById("b").onclick=()=>console.log("Clicou!");'},
react:{'src/main.tsx':"import React from 'react';\nimport {createRoot} from 'react-dom/client';\nimport App from './App';\nimport './style.css';\n\ncreateRoot(document.getElementById('root')!).render(<App/>);",'src/App.tsx':"import {useState} from 'react';\n\nexport default function App(){\n  const [n,setN]=useState<number>(0);\n  return <button onClick={()=>setN(n+1)}>Cliques: {n}</button>;\n}",'src/style.css':'body{font-family:system-ui;padding:2rem}'},
py:{'main.py':'nome = "mundo"\nprint(f"Olá, {nome}!")\n'},empty:{'README.md':'# Projeto\n'}};
const PROV={gemini:{n:'Google Gemini',t:'g',m:'gemini-2.5-flash'},openai:{n:'OpenAI',t:'o',u:'https://api.openai.com/v1',m:'gpt-4o-mini'},anthropic:{n:'Anthropic Claude',t:'a',m:'claude-sonnet-5-5'},openrouter:{n:'OpenRouter',t:'o',u:'https://openrouter.ai/api/v1',m:'openai/gpt-4o-mini'},groq:{n:'Groq',t:'o',u:'https://api.groq.com/openai/v1',m:'llama-3.3-70b-versatile'},deepseek:{n:'DeepSeek',t:'o',u:'https://api.deepseek.com/v1',m:'deepseek-chat'},custom:{n:'Outra (compatível com OpenAI)',t:'o',u:'',m:''}};
const cfg=()=>({prov:'gemini',key:'',model:'',url:'',proxy:'',cors:'auto',...LS.get('ide_cfg',{})});

let cur=null,ed=null,models={},selDir='',ex={},pw=null,saveT,liveT,URLS={},bt='con',terms=[],py=null;

/* ---------- armazenamento (IndexedDB, com fallback em memória) ---------- */
const mem={},DB=new Promise(res=>{try{const r=indexedDB.open('webide2',1);r.onupgradeneeded=()=>r.result.createObjectStore('p',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>res(null)}catch(e){res(null)}});
const S={async put(p){const d=await DB;if(!d)return void(mem[p.id]=JSON.parse(JSON.stringify(p)));return new Promise(r=>{const q=d.transaction('p','readwrite').objectStore('p').put(p);q.onsuccess=r;q.onerror=r})},
async all(){const d=await DB;if(!d)return Object.values(mem);return new Promise(r=>{const q=d.transaction('p').objectStore('p').getAll();q.onsuccess=()=>r(q.result);q.onerror=()=>r([])})},
async del(id){const d=await DB;if(!d)return void delete mem[id];return new Promise(r=>{const q=d.transaction('p','readwrite').objectStore('p').delete(id);q.onsuccess=r;q.onerror=r})}};

/* ---------- UI básica ---------- */
function toast(m,t=''){const x=el('div','toast '+t,esc(m));$('#ts').append(x);setTimeout(()=>x.remove(),3500)}

function dlg(title,html,ok='OK'){return new Promise(r=>{const m=el('div','modal',`<div class="box"><h3>${title}</h3><div class="body">${html}</div><div class="foot"><button class="b2">Cancelar</button><button class="b1">${ok}</button></div></div>`);document.body.append(m);const done=v=>{m.remove();r(v)};m.querySelector('.b2').onclick=()=>done(null);m.querySelector('.b1').onclick=()=>done(m);m.onkeydown=e=>{if(e.key=='Escape')done(null);if(e.key=='Enter'&&(e.target.tagName=='INPUT'||e.ctrlKey))done(m)};const f=m.querySelector('input,textarea,select');f&&f.focus()})}
const ask=async(t,l,v='')=>{const m=await dlg(t,`<label>${l}</label><input value="${esc(v)}">`);return m&&m.querySelector('input').value.trim()};
const conf=(t,h)=>dlg(t,h).then(Boolean);
function pal(items,ph,dyn){const m=el('div','modal top',`<div class="box" style="width:560px"><input placeholder="${ph}"><div class="pl"></div></div>`);document.body.append(m);const i=m.querySelector('input'),L=m.querySelector('.pl');let sel=0,list=items;
 const go=x=>{m.remove();x.fn()},draw=()=>{L.innerHTML='';list.slice(0,60).forEach((x,k)=>{const r=el('div','pi2'+(k==sel?' on':''),`<span class="pl1">${x.ic||''}${esc(x.l)}</span><small>${esc(x.r||'')}</small>`);r.onclick=()=>go(x);L.append(r)})};
 i.oninput=()=>{const q=i.value.toLowerCase();list=dyn?dyn(i.value):items.filter(x=>(x.l+' '+(x.r||'')).toLowerCase().includes(q));sel=0;draw()};
 i.onkeydown=e=>{if(e.key=='ArrowDown'){sel=Math.min(sel+1,list.length-1);draw();e.preventDefault()}else if(e.key=='ArrowUp'){sel=Math.max(sel-1,0);draw();e.preventDefault()}else if(e.key=='Enter'&&list[sel])go(list[sel]);else if(e.key=='Escape')m.remove()};
 m.onclick=e=>{if(e.target==m)m.remove()};draw();i.focus()}
function ctx(e,p,isD){e.preventDefault();e.stopPropagation();const m=$('#cm');m.innerHTML='';const d=isD?p:dir(p);
 const it=[['Novo arquivo',()=>newFile(d)],['Nova pasta',()=>newDir(d)]];
 if(!isD)it.push(['Editar com IA',()=>{openFile(p);aiDialog()}],['Executar',()=>{openFile(p);run()}]);
 if(p)it.push(['Renomear / mover',async()=>{const n=await ask('Renomear / mover','Novo caminho',p);n&&movePath(p,n)}],['Excluir',()=>del(p)]);
 it.forEach(([l,f])=>{const i=el('div','cmi',l);i.onclick=()=>{m.classList.add('hide');f()};m.append(i)});
 m.style.left=Math.min(e.pageX,innerWidth-200)+'px';m.style.top=Math.min(e.pageY,innerHeight-220)+'px';m.classList.remove('hide')}
document.addEventListener('click',()=>$('#cm').classList.add('hide'));

/* ---------- arquivos, abas e árvore ---------- */
const kids=d=>{const s=new Map(),pre=d?d+'/':'';[...Object.keys(cur.files),...cur.dirs].forEach(k=>{if(k.startsWith(pre)&&k!=d){const r=k.slice(pre.length),n=r.split('/')[0];s.set(n,s.get(n)||r.includes('/')||cur.dirs.includes(k))}});return[...s].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))};
function renderTree(){const T=$('#tree');T.innerHTML='';
 const walk=(d,lv)=>kids(d).forEach(([n,D])=>{const p=d?d+'/'+n:n,it=el('div','it'+(!D&&p==cur.active?' on':'')+(D&&p==selDir?' sel':''),`<i class="cv${D?(ex[p]?' o':''):' z'}">${gi('chev',12)}</i>${ico(n,D,ex[p])}<span>${esc(n)}</span>`);it.style.paddingLeft=(6+lv*12)+'px';
  it.onclick=()=>{if(D){ex[p]=!ex[p];selDir=p;renderTree()}else{selDir=d;openFile(p)}};it.oncontextmenu=e=>ctx(e,p,D);const tg=D?p:d;it.draggable=true;it.ondragstart=e=>e.dataTransfer.setData('text/plain',p);it.ondragover=e=>{e.preventDefault();e.stopPropagation();it.classList.add('dd')};it.ondragleave=()=>it.classList.remove('dd');it.ondrop=e=>{e.preventDefault();e.stopPropagation();it.classList.remove('dd');dropTo(e,tg)};T.append(it);if(D&&ex[p])walk(p,lv+1)});
 walk('',0);T.onclick=e=>{if(e.target==T){selDir='';renderTree()}};T.oncontextmenu=e=>{if(e.target==T)ctx(e,'',true)};T.ondragover=e=>e.preventDefault();T.ondrop=e=>{e.preventDefault();dropTo(e,'')}}
function renderTabs(){const T=$('#tabs');T.innerHTML='';crumbs();cur.tabs.forEach(p=>{const t=el('div','tab'+(p==cur.active?' on':''),`${ico(p)}<span>${esc(p.split('/').pop())}</span><b>${gi('x',12)}</b>`);t.title=p;t.onclick=()=>openFile(p);t.querySelector('b').onclick=e=>{e.stopPropagation();closeTab(p)};t.onauxclick=e=>{if(e.button==1)closeTab(p)};T.append(t)})}
function openFile(p){const v=cur.files[p];if(v==null)return;if(bin(v))return toast('Arquivo binário: não dá para editar como texto','warn');
 if(!cur.tabs.includes(p))cur.tabs.push(p);cur.active=p;
 if(!models[p]){const m=monaco.editor.createModel(v,LANG[ext(p)]||'plaintext',monaco.Uri.file('/'+p));m.onDidChangeContent(()=>{cur.files[p]=m.getValue();dirty()});models[p]=m}
 ed.setModel(models[p]);ed.focus();$('#lg2').textContent=LANG[ext(p)]||'texto';renderTabs();renderTree()}
function closeTab(p){cur.tabs=cur.tabs.filter(x=>x!=p);if(cur.active==p){cur.active=cur.tabs.at(-1)||null;if(cur.active)openFile(cur.active);else ed.setModel(null)}renderTabs();renderTree();dirty()}
async function newFile(d){const n=await ask('Novo arquivo','Nome (pode usar pasta/arquivo.ext)');if(!n)return;const p=norm((d?d+'/':'')+n);if(!p||cur.files[p]!=null)return toast('Nome inválido ou já existe','warn');cur.files[p]='';if(d)ex[d]=1;openFile(p);dirty()}
async function newDir(d){const n=await ask('Nova pasta','Nome');if(!n)return;const p=norm((d?d+'/':'')+n);if(!p)return;cur.dirs.push(p);ex[p]=1;if(d)ex[d]=1;renderTree();dirty()}
function movePath(a,b){b=norm(b);if(!b||b==a)return;const mv=k=>k==a?b:k.startsWith(a+'/')?b+k.slice(a.length):k,nf={};for(const k in cur.files)nf[mv(k)]=cur.files[k];
 for(const k in models)if(mv(k)!=k){models[k].dispose();delete models[k]}
 cur.files=nf;cur.dirs=cur.dirs.map(mv);cur.tabs=[...new Set(cur.tabs.map(mv))];cur.active=cur.active&&mv(cur.active);if(cur.active)openFile(cur.active);renderTabs();renderTree();dirty()}
function rmPath(p){const hit=k=>k==p||k.startsWith(p+'/');for(const k of Object.keys(cur.files))if(hit(k)){delete cur.files[k];if(models[k]){models[k].dispose();delete models[k]}}
 cur.dirs=cur.dirs.filter(k=>!hit(k));cur.tabs=cur.tabs.filter(k=>!hit(k));if(cur.active&&hit(cur.active)){cur.active=cur.tabs.at(-1)||null;if(cur.active)openFile(cur.active);else ed.setModel(null)}renderTabs();renderTree();dirty()}
const del=async p=>{if(await conf('Excluir',`Excluir <b>${esc(p)}</b>?`))rmPath(p)};
async function dropTo(e,tg){const fl=e.dataTransfer.files,s=e.dataTransfer.getData('text/plain');
 if(fl&&fl.length){for(const f of fl){const k=norm((tg?tg+'/':'')+f.name);cur.files[k]=isTxt(k)?await f.text():await rdURL(f)}if(tg)ex[tg]=1;renderTree();dirty();return}
 if(!s||!(cur.files[s]!=null||cur.dirs.includes(s)||Object.keys(cur.files).some(k=>k.startsWith(s+'/'))))return;
 if(tg==s||tg.startsWith(s+'/')||dir(s)==tg)return;if(tg)ex[tg]=1;movePath(s,(tg?tg+'/':'')+s.split('/').pop())}
function gsearch(){pal([],'Buscar em todos os arquivos…',q=>{q=q.trim().toLowerCase();const r=[];if(q.length<2)return r;for(const[k,v]of Object.entries(cur.files)){if(bin(v))continue;v.split('\n').forEach((l,i)=>{if(r.length<200&&l.toLowerCase().includes(q))r.push({l:l.trim().slice(0,100),r:k+':'+(i+1),fn:()=>{openFile(k);ed.revealLineInCenter(i+1);ed.setPosition({lineNumber:i+1,column:1});ed.focus()}})})}return r})}

/* ---------- projetos e salvamento automático ---------- */
function dirty(){if(!cur)return;$('#sv').textContent='Salvando…';clearTimeout(saveT);saveT=setTimeout(save,600);live()}
async function save(t){if(!cur)return;cur.mod=Date.now();await S.put(cur);$('#sv').textContent='Salvo';if(t)toast('Salvo','ok')}
function loadProject(pr){Object.values(models).forEach(m=>m.dispose());models={};cur=pr;cur.dirs=cur.dirs||[];cur.tabs=(cur.tabs||[]).filter(p=>cur.files[p]!=null);ex={};selDir='';LS.set('ide_last',pr.id);$('#pn').textContent=pr.name;
 const a=cur.files[cur.active]!=null?cur.active:cur.tabs[0];renderTabs();renderTree();if(a)openFile(a);else{cur.active=null;ed.setModel(null)}}
async function mk(name,tpl,F,D,imp){await save();const pr={id:'p'+Date.now().toString(36),name,status:'wip',mod:Date.now(),files:F||{...TPL[tpl]},dirs:D||[],tabs:[],active:null,imp:imp?1:0};await S.put(pr);loadProject(pr);const f=Object.keys(pr.files).find(k=>/(^|\/)(index\.html|main\.\w+|README\.md)$/.test(k));f&&openFile(f)}
async function newDlg(){const m=await dlg('Novo projeto','<label>Nome</label><input id="nm" value="Novo projeto"><label>Modelo</label><select id="tp"><option value="web">HTML + CSS + JS</option><option value="react">React (TSX)</option><option value="py">Python</option><option value="empty">Vazio</option></select>','Criar');if(m)mk(m.querySelector('#nm').value.trim()||'Projeto',m.querySelector('#tp').value)}
async function openAny(){const all=await S.all(),last=LS.get('ide_last'),pr=all.find(x=>x.id==last)||all.sort((a,b)=>b.mod-a.mod)[0];if(pr)loadProject(pr);else await mk('Meu primeiro projeto','web')}
async function projects(){await save();const all=(await S.all()).map(p=>cur&&p.id==cur.id?cur:p).sort((a,b)=>b.mod-a.mod),wip=all.filter(p=>p.status!='done').length;
 const m=el('div','modal',`<div class="box" style="width:580px"><h3>Projetos <small>${wip} inacabado(s)</small></h3><div class="body"><div class="row"><button class="b1" id="n1">Novo projeto</button><button class="b2" id="n2">Importar</button></div><div id="pl"></div></div><div class="foot"><button class="b2" id="px">Fechar</button></div></div>`);document.body.append(m);
 const close=()=>m.remove(),L=m.querySelector('#pl');m.querySelector('#px').onclick=close;m.querySelector('#n1').onclick=()=>{close();newDlg()};m.querySelector('#n2').onclick=()=>{close();importMenu()};
 if(!all.length)L.innerHTML='<p class="mu">Nenhum projeto ainda.</p>';
 all.forEach(p=>{const r=el('div','prj',`<div class="pi"><b>${esc(p.name)}</b><small>${new Date(p.mod).toLocaleString()} · ${Object.keys(p.files).length} arquivos</small></div><button class="tg ${p.status=='done'?'done':''}" title="Alternar estado">${p.status=='done'?'concluído':'inacabado'}</button><button class="ob">Abrir</button><button class="db" title="Excluir">Excluir</button>`);
  r.querySelector('.ob').onclick=async()=>{await save();loadProject(p);close()};
  r.querySelector('.tg').onclick=async()=>{p.status=p.status=='done'?'wip':'done';await S.put(p);close();projects()};
  r.querySelector('.db').onclick=async()=>{if(!await conf('Excluir projeto',`Excluir <b>${esc(p.name)}</b> para sempre? Isso não pode ser desfeito.`))return;await S.del(p.id);if(cur&&cur.id==p.id){Object.values(models).forEach(x=>x.dispose());models={};cur=null;ed.setModel(null);await openAny()}close();projects()};L.append(r)})}

/* ---------- importar / exportar ---------- */
const rdURL=f=>new Promise(r=>{const x=new FileReader();x.onload=()=>r(x.result);x.readAsDataURL(f)});
function strip(F,D){const k=Object.keys(F),top=new Set(k.map(x=>x.split('/')[0]));if(k.length&&top.size==1&&k.every(x=>x.includes('/'))){const r=[...top][0]+'/',F2={};k.forEach(x=>F2[x.slice(r.length)]=F[x]);return[F2,D.filter(d=>d.startsWith(r)).map(d=>d.slice(r.length)).filter(Boolean)]}return[F,D]}
const importMenu=()=>pal([{l:'Importar arquivo (.zip, .7z, .rar, .tar.gz, .json)',fn:()=>$('#fz').click()},{l:'Importar uma pasta do computador',fn:()=>$('#fd').click()}],'Importar…');
$('#fz').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;let F={},D=[],nm=f.name.replace(/\.\w+$/,'');
 try{if(/\.json$/i.test(f.name)){const j=JSON.parse(await f.text());F=j.files||{};D=j.dirs||[];nm=j.name||nm}
 else if(/\.(7z|rar|tar|gz|tgz|bz2|xz)$/i.test(f.name)){F=await from7z(f);[F,D]=strip(F,D)}else{const z=await JSZip.loadAsync(f);for(const[k,en]of Object.entries(z.files)){if(skip(k))continue;if(en.dir){D.push(k.replace(/\/$/,''));continue}F[k]=isTxt(k)?await en.async('string'):'data:'+mime(k)+';base64,'+await en.async('base64')}[F,D]=strip(F,D)}
 await mk(nm,null,F,D,1);toast('Projeto importado','ok')}catch(err){toast('Falha ao importar: '+err.message,'err')}};
$('#fd').onchange=async e=>{const fl=[...e.target.files];e.target.value='';if(!fl.length)return;const F={};for(const f of fl){const k=f.webkitRelativePath.split('/').slice(1).join('/');if(!k||skip(k))continue;F[k]=isTxt(k)?await f.text():await rdURL(f)}await mk(fl[0].webkitRelativePath.split('/')[0],null,F,[],1);toast('Pasta importada','ok')};
function tar(F){const enc=new TextEncoder(),parts=[];for(const[p,c]of Object.entries(F)){const b=bin(c)?Uint8Array.from(atob(c.split(',')[1]),x=>x.charCodeAt(0)):enc.encode(c),h=new Uint8Array(512),w=(s,o)=>h.set(enc.encode(s),o);
 w(p,0);w('0000644\0',100);w('0000000\0',108);w('0000000\0',116);w(b.length.toString(8).padStart(11,'0')+'\0',124);w(Math.floor(Date.now()/1000).toString(8).padStart(11,'0')+'\0',136);w('        ',148);w('0',156);w('ustar\0',257);w('00',263);
 let s=0;h.forEach(x=>s+=x);w(s.toString(8).padStart(6,'0')+'\0 ',148);parts.push(h,b,new Uint8Array((512-b.length%512)%512))}parts.push(new Uint8Array(1024));return new Blob(parts)}
const Z7='https://cdn.jsdelivr.net/npm/7z-wasm@1/';let z7f=null;
async function sz(){if(!z7f){toast('Carregando módulo 7z (primeira vez)…');z7f=(await import(Z7+'7zz.es6.js')).default}return z7f({locateFile:f=>Z7+f})}
const w7=(z,d)=>z.FS.readdir(d).filter(x=>x!='.'&&x!='..').flatMap(n=>{const p=d+'/'+n;return z.FS.isDir(z.FS.stat(p).mode)?w7(z,p):[p]});
const b64=b=>{let s='';for(let i=0;i<b.length;i+=8192)s+=String.fromCharCode.apply(null,b.subarray(i,i+8192));return btoa(s)};
async function to7z(F){const z=await sz();z.FS.mkdir('/w');for(const[k,v]of Object.entries(F)){const d=dir(k);if(d)z.FS.mkdirTree('/w/'+d);z.FS.writeFile('/w/'+k,bin(v)?Uint8Array.from(atob(v.split(',')[1]),c=>c.charCodeAt(0)):v)}z.FS.chdir('/w');z.callMain(['a','-t7z','/o.7z','*']);return new Blob([z.FS.readFile('/o.7z')])}
async function from7z(f){const z=await sz(),n='/i/a.'+ext(f.name);z.FS.mkdir('/i');z.FS.writeFile(n,new Uint8Array(await f.arrayBuffer()));z.callMain(['x','-y','-o/o',n]);let root='/o',L=w7(z,root);
 if(L.length==1){const b=z.FS.readFile(L[0]);if(b.length>512&&new TextDecoder().decode(b.subarray(257,262))=='ustar'){z.callMain(['x','-y','-o/o2',L[0]]);root='/o2';L=w7(z,root)}}
 const F={};for(const p of L){const k=p.slice(root.length+1);if(skip(k))continue;const b=z.FS.readFile(p);F[k]=isTxt(k)?new TextDecoder().decode(b):'data:'+mime(k)+';base64,'+b64(b)}return F}
async function exportDlg(){const m=await dlg('Exportar projeto','<label>Formato</label><select id="fm"><option value="zip">.zip</option><option value="7z">.7z</option><option value="tgz">.tar.gz</option><option value="tar">.tar</option><option value="json">.json (backup completo)</option></select><small>O .7z baixa um módulo de ~1 MB na primeira vez. O .rar só pode ser importado (o formato é fechado).</small>','Exportar');if(!m)return;
 const fm=m.querySelector('#fm').value,F=cur.files,nm=cur.name.replace(/[^\w-]+/g,'_');let b,x;
 if(fm=='zip'){const z=new JSZip();for(const k in F)bin(F[k])?z.file(k,F[k].split(',')[1],{base64:true}):z.file(k,F[k]);cur.dirs.forEach(d=>z.folder(d));b=await z.generateAsync({type:'blob',compression:'DEFLATE'});x='zip'}
 else if(fm=='7z'){b=await to7z(F);x='7z'}
 else if(fm=='json'){b=new Blob([JSON.stringify({name:cur.name,files:F,dirs:cur.dirs})],{type:'application/json'});x='json'}
 else{b=tar(F);x='tar';if(fm=='tgz'){b=await new Response(b.stream().pipeThrough(new CompressionStream('gzip'))).blob();x='tar.gz'}}
 const a=el('a');a.href=URL.createObjectURL(b);a.download=nm+'.'+x;a.click();toast('Exportado: '+nm+'.'+x,'ok')}

/* ---------- executar (nova aba) ---------- */
const loadJs=u=>new Promise((r,j)=>{const d=window.define;window.define=undefined;const s=document.createElement('script');s.src=u;s.onload=()=>{window.define=d;r()};s.onerror=()=>{window.define=d;j(Error('Falha ao carregar '+u))};document.head.append(s)});
const needBabel=async()=>{if(!window.Babel){log('Carregando compilador (Babel)…','info');await loadJs(BABEL)}};
const APP=new URL('./',location.href).pathname,PUBPX=['https://corsproxy.io/?url=','https://api.allorigins.win/raw?url='];let swOK=false;
const bare=o=>o.replace(/(\bfrom\s*|\bimport\s*\(?\s*)(["'])([^"']+)\2/g,(m,a,q,s)=>/^(\.|\/|https?:|data:|blob:)/.test(s)?m:a+q+'https://esm.sh/'+s+q);
const trust=async()=>{if(!cur.imp)return true;if(!await conf('Executar projeto importado','Este projeto veio de fora. Ao executar, o código roda no mesmo domínio da IDE e poderia ler suas chaves de IA salvas. Só continue se confiar nele.'))return false;cur.imp=0;dirty();return true};
async function syncSW(modP){const reg=await navigator.serviceWorker.ready,F={...cur.files},C={};
 if(Object.keys(F).some(f=>/\.(tsx?|jsx)$/.test(f)))await needBabel();
 for(const k in F){const v=F[k];if(bin(v))continue;const e=ext(k);if(/^(tsx?|jsx)$/.test(e))C[k]=bare(Babel.transform(v,{filename:k,presets:['typescript','react']}).code);else if(/^m?js$/.test(e)&&/^\s*(import|export)\b/m.test(v))C[k]=bare(v)}
 if(modP)F['__entry__.html']=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(modP)}</title></head><body><div id="root"></div><script type="module" src="${encodeURI(modP)}"><\/script></body></html>`;
 await new Promise(r=>{const ch=new MessageChannel();ch.port1.onmessage=r;reg.active.postMessage({type:'sync',pid:cur.id,files:F,compiled:C,bridge:bridge()},[ch.port2])});return modP?'__entry__.html':null}
const MB='https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/',PY='https://cdn.jsdelivr.net/pyodide/v0.26.1/full/';
const OFF1=['https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',...['loader.js','editor/editor.main.js','editor/editor.main.css','editor/editor.main.nls.js','base/worker/workerMain.js','base/browser/ui/codicons/codicon/codicon.ttf','language/typescript/tsMode.js','language/typescript/tsWorker.js','language/css/cssMode.js','language/css/cssWorker.js','language/html/htmlMode.js','language/html/htmlWorker.js','language/json/jsonMode.js','language/json/jsonWorker.js','basic-languages/python/python.js','basic-languages/typescript/typescript.js','basic-languages/javascript/javascript.js','basic-languages/markdown/markdown.js','basic-languages/xml/xml.js','basic-languages/yaml/yaml.js'].map(f=>MB+f)];
const OFF2=[BABEL,...['pyodide.js','pyodide.asm.js','pyodide.asm.wasm','python_stdlib.zip','pyodide-lock.json'].map(f=>PY+f),Z7+'7zz.es6.js',Z7+'7zz.wasm'];
async function offline(L,q){if(!window.caches){q||toast('Cache offline exige https ou localhost','warn');return false}if(!q)toast('Baixando para uso offline… (pode demorar)');const c=await caches.open('webide-v1');let ok=0;
 for(const u of L){try{if(!await c.match(u)){const r=await fetch(u,{mode:'cors'});if(!r.ok)throw 0;await c.put(u,r)}ok++}catch(e){}}
 if(!q)toast(ok+' de '+L.length+' arquivos prontos para uso offline',ok==L.length?'ok':'warn');return ok==L.length}
const res=(from,s)=>{const b=norm(s[0]=='/'?s:(dir(from)?dir(from)+'/':'')+s);for(const x of['','.tsx','.ts','.jsx','.js','.css','.json','/index.tsx','/index.ts','/index.jsx','/index.js'])if(cur.files[b+x]!=null)return b+x;return null};
function comp(p){if(URLS[p])return URLS[p];const e=ext(p),src=cur.files[p];let o;
 if(e=='css')o=`var s=document.createElement('style');s.textContent=${JSON.stringify(src)};document.head.append(s);`;
 else if(e=='json')o='export default '+src;
 else{o=Babel.transform(src,{filename:p,presets:['typescript','react']}).code;
  o=o.replace(/(\bfrom\s*|\bimport\s*\(?\s*)(["'])([^"']+)\2/g,(m,a,q,s)=>{if(/^(https?:|data:|blob:)/.test(s))return m;if(s[0]=='.'||s[0]=='/'){const t=res(p,s);return t?a+q+comp(t)+q:m}return a+q+'https://esm.sh/'+s+q})}
 return URLS[p]=URL.createObjectURL(new Blob([o],{type:'text/javascript'}))}

const withBridge=h=>/<head[^>]*>/i.test(h)?h.replace(/<head[^>]*>/i,m=>m+bridge()):bridge()+h;
async function pageHtml(entry){let h=cur.files[entry];
 if(/type=["']module["']/.test(h)||Object.keys(cur.files).some(f=>/\.(tsx?|jsx)$/.test(f)))await needBabel();
 const rf=s=>/^([a-z]+:|\/\/|#)/i.test(s)?null:res(entry,s.split(/[?#]/)[0]);
 h=h.replace(/(\s(?:src|href)=["'])([^"']+)(["'])/gi,(m,a,s,c)=>{const f=rf(s);return f&&bin(cur.files[f])?a+cur.files[f]+c:m});
 h=h.replace(/<script\b([^>]*?)\bsrc=["']([^"']+)["']([^>]*)><\/script>/gi,(m,a,s,b)=>{const f=rf(s);if(!f)return m;return(/type=["']module["']/.test(a+b)||/\.(tsx?|jsx)$/.test(f))?`<script type="module" src="${comp(f)}"><\/script>`:`<script>${cur.files[f].replace(/<\/script/gi,'<\\/script')}<\/script>`});
 h=h.replace(/<link\b[^>]*?href=["']([^"']+)["'][^>]*>/gi,(m,s)=>{const f=/stylesheet/i.test(m)?rf(s):null;return f?`<style>${cur.files[f]}</style>`:m});
 return withBridge(h)}
async function modHtml(p){await needBabel();return withBridge(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(p)}</title></head><body><div id="root"></div><script type="module" src="${comp(p)}"><\/script></body></html>`)}
async function runPy(p){log('python '+p,'info');showBot('con');try{if(!py){log('Carregando Python (a primeira vez demora)…','info');await loadJs('https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js');py=await loadPyodide({stdout:t=>log(t),stderr:t=>log(t,'error')})}
 for(const[k,v]of Object.entries(cur.files)){if(bin(v))continue;const d=dir(k);if(d)py.FS.mkdirTree('/home/pyodide/'+d);py.FS.writeFile('/home/pyodide/'+k,v)}
 py.FS.chdir('/home/pyodide');py.runPython("import sys\nif '/home/pyodide' not in sys.path: sys.path.insert(0,'/home/pyodide')");const code=cur.files[p];await py.loadPackagesFromImports(code);await py.runPythonAsync(code)}catch(e){log(String(e.message||e),'error')}}
async function run(auto){if(!cur||!cur.active)return auto||toast('Abra um arquivo para executar','warn');const p=cur.active,e=ext(p);if(e=='py'){if(auto||!await trust())return;return runPy(p)}
 const idx=cur.files['index.html'],code=['js','mjs','ts','tsx','jsx'];let ent=null,mod=false;
 if(e=='html')ent=p;else if(code.includes(e)&&idx&&idx.includes(p.split('/').pop()))ent='index.html';else if(code.includes(e))mod=true;else if(idx)ent='index.html';else return auto||toast('Nada para executar neste tipo de arquivo','warn');
 if(auto){if(!pw||pw.closed)return}else{if(!await trust())return;pw=pw&&!pw.closed?pw:window.open('','ide-preview');if(!pw)return toast('O navegador bloqueou a nova aba. Permita pop-ups para esta página.','warn')}
 URLS={};try{
  if(swOK){const en=await syncSW(mod?p:null),u=location.origin+APP+'__run__/'+cur.id+'/'+(en||ent).split('/').map(encodeURIComponent).join('/');if(auto)pw.location.reload();else pw.location.replace(u)}
  else{const html=mod?await modHtml(p):await pageHtml(ent);pw.location.replace(URL.createObjectURL(new Blob([html],{type:'text/html'})))}
  if(!auto){pw.focus();log('Executando '+(ent||p)+(swOK?' (origem real)':' (modo local, sem service worker)'),'info')}}catch(err){log(String(err.message||err),'error')}}
function live(){if(!$('#lv').checked||!pw||pw.closed)return;clearTimeout(liveT);liveT=setTimeout(()=>run(true),500)}

/* ---------- ícones (SVG próprio, sem emojis) ---------- */
const G={chev:'<path d="M6 3.5l4.5 4.5L6 12.5"/>',x:'<path d="M4 4l8 8M12 4l-8 8"/>',plus:'<path d="M8 3v10M3 8h10"/>',files:'<path d="M4 1.8h5l3.5 3.5v8.9H4z"/><path d="M9 1.8v3.7h3.5"/>',search:'<circle cx="6.8" cy="6.8" r="4.3"/><path d="M10 10l4.2 4.2"/>',play:'<path d="M4.5 2.8v10.4l8.5-5.2z" fill="currentColor"/>',term:'<rect x="1.8" y="2.8" width="12.4" height="10.4" rx="1.5"/><path d="M4.6 6.2l2.2 1.8-2.2 1.8M8.2 10h3"/>',sliders:'<path d="M2 4.5h12M2 8h12M2 11.5h12"/><circle cx="5.5" cy="4.5" r="1.6" fill="#181818"/><circle cx="10.5" cy="8" r="1.6" fill="#181818"/><circle cx="6.5" cy="11.5" r="1.6" fill="#181818"/>',filep:'<path d="M4 1.8h5l3.5 3.5v8.9H4z"/><path d="M9 1.8v3.7h3.5M8.2 8.2v3.6M6.4 10h3.6"/>',dirp:'<path d="M1.8 4c0-.6.4-1 1-1h3.2l1.4 1.5h6c.6 0 1 .4 1 1V12c0 .6-.4 1-1 1H2.8c-.6 0-1-.4-1-1z"/><path d="M8 6.8v3.6M6.2 8.6h3.6"/>',folder:'<path d="M1.8 4c0-.6.4-1 1-1h3.2l1.4 1.5h6c.6 0 1 .4 1 1V12c0 .6-.4 1-1 1H2.8c-.6 0-1-.4-1-1z"/>',collapse:'<path d="M3 5.5l5-3 5 3M3 10.5l5 3 5-3"/>',trash:'<path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5M7 7v4M9 7v4"/>'};
const gi=(n,s=16)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${G[n]}</svg>`;
document.querySelectorAll('[data-g]').forEach(b=>b.insertAdjacentHTML('afterbegin',gi(b.dataset.g,+b.dataset.s||16)));
const BD=(bg,t,fg='#fff',fs=7)=>`<svg class="fi" viewBox="0 0 16 16"><rect x="1" y="1.5" width="14" height="13" rx="2.2" fill="${bg}"/><text x="8" y="${(5.5+fs*.78).toFixed(1)}" text-anchor="middle" font-size="${fs}" font-weight="700" font-family="Segoe UI,Arial,sans-serif" fill="${fg}">${t}</text></svg>`;
const PB=(bg,d)=>`<svg class="fi" viewBox="0 0 16 16"><rect x="1" y="1.5" width="14" height="13" rx="2.2" fill="${bg}"/>${d}</svg>`;
const IMG=PB('#a074c4','<circle cx="11" cy="5.8" r="1.3" fill="#fff"/><path d="M2.5 13l3.8-4.6 2.4 2.8 1.6-1.8 3.2 3.6z" fill="#fff"/>'),VID=PB('#d6529a','<path d="M6 5v6l5-3z" fill="#fff"/>'),AUD=PB('#d98a3c','<path d="M6.5 11V4.5l4-1v6.2" stroke="#fff" stroke-width="1.2" fill="none"/><circle cx="5.5" cy="11" r="1.5" fill="#fff"/><circle cx="9.5" cy="10" r="1.5" fill="#fff"/>'),ZIP=PB('#b8860b','<path d="M7 2.5v11M9 3.5H7M9 5.5H7M9 7.5H7" stroke="#fff" stroke-width="1.2"/><rect x="6.2" y="9" width="3.6" height="3" rx=".8" fill="#fff"/>');
const FI={html:BD('#e5532d','&lt;&gt;','#fff',6.5),htm:'html',xhtml:'html',css:BD('#2f6fdd','#','#fff',9.5),scss:BD('#cd6799','S','#fff',8.5),sass:'scss',less:BD('#2b4a7a','L','#fff',8.5),js:BD('#f0db4f','JS','#1f1f1f'),mjs:'js',cjs:'js',jsx:BD('#222b36','JSX','#61dafb',5.6),ts:BD('#3178c6','TS'),mts:'ts',tsx:BD('#3178c6','TSX','#fff',5.6),json:BD('#cba73a','{}','#1f1f1f',8.5),jsonc:'json',map:'json',md:BD('#4a90b8','MD'),mdx:'md',log:BD('#6b7280','LOG','#fff',5.6),svg:BD('#f29f38','SVG','#1f1f1f',5.4),xml:BD('#d9722c','&lt;/&gt;','#fff',5.8),yml:BD('#cb3b3b','YML','#fff',5.6),yaml:'yml',toml:BD('#8a4a2b','TML','#fff',5.6),ini:BD('#6d7a86','INI','#fff',5.6),env:BD('#e6cf3d','ENV','#1f1f1f',5.6),csv:BD('#3f9b5a','CSV','#fff',5.6),tsv:'csv',sh:BD('#4eaa25','&gt;_','#fff',7),bash:'sh',zsh:'sh',bat:BD('#5c6b7a','BAT','#fff',5.6),ps1:BD('#2b6cb0','PS','#fff',6.5),py:BD('#3776ab','PY','#ffd43b',6.5),java:BD('#d9731d','JV','#fff',6.5),c:BD('#5568c4','C','#fff',9),h:BD('#7a86d6','H','#fff',9),cpp:BD('#00599c','C+','#fff',7),cc:'cpp',hpp:'h',cs:BD('#68217a','C#','#fff',7),go:BD('#00a7c9','GO','#fff',6.5),rs:BD('#c9855a','RS','#1f1f1f',6.5),php:BD('#777bb3','PHP','#fff',5.6),rb:BD('#cc342d','RB','#fff',6.5),swift:BD('#f05138','SW','#fff',6.5),kt:BD('#7f52ff','KT','#fff',6.5),sql:BD('#d68a1c','SQL','#fff',5.6),vue:BD('#41b883','V','#fff',9),svelte:BD('#ff3e00','S','#fff',8.5),lua:BD('#2c2d72','LU','#fff',6.5),dart:BD('#0175c2','DT','#fff',6.5),r:BD('#2165b6','R','#fff',9),wasm:BD('#654ff0','WA','#fff',6.5),lock:BD('#6b7280','LCK','#fff',5.4),gitignore:BD('#e8553a','GIT','#fff',5.6),pdf:BD('#d94b43','PDF','#fff',5.6),png:IMG,jpg:'png',jpeg:'png',gif:'png',webp:'png',bmp:'png',avif:'png',ico:'png',mp3:AUD,wav:'mp3',ogg:'mp3',flac:'mp3',m4a:'mp3',mp4:VID,webm:'mp4',mov:'mp4',mkv:'mp4',zip:ZIP,rar:'zip','7z':'zip',tar:'zip',gz:'zip',tgz:'zip',bz2:'zip',xz:'zip',woff:BD('#8f6bd1','Aa'),woff2:'woff',ttf:'woff',otf:'woff',eot:'woff'};
const FN={'package.json':BD('#cb3837','npm','#fff',5.4),'package-lock.json':'lock','tsconfig.json':BD('#2b5fa5','TSC','#fff',5.4),'readme.md':BD('#4a90b8','i','#fff',9),'license':BD('#c9a227','LIC','#fff',5.4),'dockerfile':BD('#2496ed','DK','#fff',6.5),'yarn.lock':'lock','pnpm-lock.yaml':'lock','.gitattributes':'gitignore'};
const FC='<svg class="fi" viewBox="0 0 16 16"><path d="M1.5 4.2c0-.7.5-1.2 1.2-1.2h3.3l1.4 1.5h5.9c.7 0 1.2.5 1.2 1.2v6.1c0 .7-.5 1.2-1.2 1.2H2.7c-.7 0-1.2-.5-1.2-1.2z" fill="#c09553"/></svg>',FO='<svg class="fi" viewBox="0 0 16 16"><path d="M1.5 4.2c0-.7.5-1.2 1.2-1.2h3.3l1.4 1.5h5.9c.7 0 1.2.5 1.2 1.2V7H3.8L1.5 12z" fill="#9a7a3c"/><path d="M3.6 7h11.9l-2.4 5.6c-.2.5-.6.9-1.2.9H2.2c-.4 0-.7-.4-.5-.8z" fill="#dcb67a"/></svg>',FD='<svg class="fi" viewBox="0 0 16 16"><path d="M3.5 1.5h6l3 3v9.5c0 .3-.2.5-.5.5H3.5c-.3 0-.5-.2-.5-.5v-12c0-.3.2-.5.5-.5z" fill="#6b7280"/><path d="M9.5 1.5v3h3z" fill="#9ca3af"/><path d="M5 8h6M5 10.2h6M5 12.2h4" stroke="#e5e7eb" stroke-width="1" fill="none"/></svg>';
function ico(n,D,o){if(D)return o?FO:FC;const l=n.split('/').pop().toLowerCase();let r=FN[l]||FI[ext(l)];while(typeof r=='string')r=FI[r]||FN[r];return r||FD}
function crumbs(){const c=$('#crumb');c.innerHTML='';if(!cur||!cur.active)return;const a=cur.active.split('/');a.forEach((n,i)=>{if(i)c.insertAdjacentHTML('beforeend',gi('chev',10));c.insertAdjacentHTML('beforeend',(i==a.length-1?ico(n):'')+`<span>${esc(n)}</span>`)})}

/* ---------- serialização e execução remota (compartilhadas com o preview) ---------- */
function SER(v,d,s){var t=typeof v;if(v===null)return{k:'null'};if(v===undefined)return{k:'undef'};
 if(t=='string')return{k:'str',v:v.length>3000?v.slice(0,3000)+'…':v};if(t=='number'||t=='bigint'||t=='symbol')return{k:'num',v:String(v)};if(t=='boolean')return{k:'bool',v:String(v)};
 if(t=='function')return{k:'fn',v:'function '+(v.name||'(anônima)')+'()'};if(v instanceof Error)return{k:'err',v:v.stack||v.name+': '+v.message};
 if(typeof Node!='undefined'&&v instanceof Node)return{k:'node',v:v.nodeType==1?'<'+v.tagName.toLowerCase()+(v.id?' #'+v.id:'')+'>':v.nodeName};
 s=s||[];if(s.indexOf(v)>-1)return{k:'circ'};var a=Array.isArray(v),ks;try{ks=Object.keys(v)}catch(e){ks=[]}
 var c=a?'Array('+v.length+')':(v.constructor&&v.constructor.name)||'Object';if(d<=0)return{k:'obj',c:c,p:null};s=s.concat([v]);
 return{k:'obj',c:c,a:a,n:ks.length,p:ks.slice(0,60).map(function(k){var x;try{x=v[k]}catch(e){x='[inacessível]'}return[k,SER(x,d-1,s)]})}}
function EV(c){try{return(0,eval)(c)}catch(e){if(e instanceof SyntaxError&&/await/.test(c)){try{return(0,eval)('(async()=>('+c+'))()')}catch(x){return(0,eval)('(async()=>{'+c+'})()')}}throw e}}
function BR(SER,EV,o){var O=window.opener,F=window.fetch.bind(window),bad={},T={};
 function post(l,a,ok,id){try{O&&O.postMessage({ide:1,l:l,a:a,ok:ok,id:id},'*')}catch(e){}}
 var sa=function(a){return[].map.call(a,function(x){return SER(x,3)})},st=function(m){return[{k:'str',v:m}]};
 ['log','info','warn','error','debug','dir','table'].forEach(function(k){var f=console[k];console[k]=function(){post(k=='dir'||k=='table'?'log':k,sa(arguments));return f.apply(console,arguments)}});
 var ca=console.assert;console.assert=function(c){if(!c)post('error',st('Asserção falhou:').concat(sa([].slice.call(arguments,1))));return ca.apply(console,arguments)};
 var cc=console.clear;console.clear=function(){post('clear');return cc.apply(console,arguments)};
 var ct=console.time,ce=console.timeEnd;console.time=function(l){T[l||'default']=performance.now();return ct.apply(console,arguments)};console.timeEnd=function(l){l=l||'default';if(T[l]!=null){post('log',st(l+': '+(performance.now()-T[l]).toFixed(2)+' ms'));delete T[l]}return ce.apply(console,arguments)};
 addEventListener('error',function(e){var t=e.target;if(t&&t!==window&&t.tagName)post('error',st('Falha ao carregar <'+t.tagName.toLowerCase()+'> '+(t.currentSrc||t.src||t.href||'')));else post('error',e.error&&e.error.stack?[{k:'err',v:e.error.stack}]:st((e.message||'Erro')+' ('+String(e.filename||'').split('/').pop()+':'+e.lineno+':'+e.colno+')'))},true);
 addEventListener('unhandledrejection',function(e){post('error',st('Promise rejeitada:').concat([SER(e.reason,2)]))});
 addEventListener('securitypolicyviolation',function(e){post('error',st('CSP bloqueou '+e.violatedDirective+': '+e.blockedURI))});
 function net(m,u,s,ms,ok){post('net',st(m+' '+u+'  '+(s||'falhou')+'  '+Math.round(ms)+' ms'),ok)}
 function pf(u,i,x){if(x.origin==location.origin||!(o.my.length||o.pub.length))return F(u,i);var I=i||(u.url?{method:u.method,headers:u.headers}:i),H=new Headers(I&&I.headers),L=o.my.concat(H.has('authorization')||H.has('x-api-key')||H.has('x-goog-api-key')?[]:o.pub);
  var t=function(k){return k>=L.length?Promise.reject(new TypeError('Falha ao buscar '+x.href+' (CORS bloqueou e os proxies não responderam)')):F(L[k]+encodeURIComponent(x.href),I).then(function(r){if(r.status>=500)throw 0;return r}).catch(function(){return t(k+1)})};
  if(bad[x.origin]&&L.length)return t(0);return F(u,i).catch(function(e){if(!L.length)throw e;bad[x.origin]=1;return t(0)})}
 window.fetch=function(u,i){var x,t0=performance.now(),m=String((i&&i.method)||(u&&u.method)||'GET').toUpperCase();try{x=new URL(u.url||u,location.href)}catch(e){return F(u,i)}
  return pf(u,i,x).then(function(r){net(m,x.href,r.status,performance.now()-t0,r.ok);return r},function(e){net(m,x.href,0,performance.now()-t0,false);throw e})};
 var xo=XMLHttpRequest.prototype.open,xs=XMLHttpRequest.prototype.send;
 XMLHttpRequest.prototype.open=function(m,u){this.__m=m;this.__u=u;return xo.apply(this,arguments)};
 XMLHttpRequest.prototype.send=function(){var t0=performance.now(),x=this;x.addEventListener('loadend',function(){var u;try{u=new URL(x.__u,location.href).href}catch(e){u=x.__u}net(x.__m,u,x.status,performance.now()-t0,x.status>=200&&x.status<400)});return xs.apply(this,arguments)};
 addEventListener('message',function(e){var d=e.data;if(!d||d.ide!='eval'||e.source!==O)return;
  try{Promise.resolve(EV(d.code)).then(function(v){post('out',[SER(v,3)],true,d.id)},function(x){post('err',[SER(x,1)],false,d.id)})}catch(x){post('err',[SER(x,1)],false,d.id)}});
 post('sys',st('Preview conectado: '+location.pathname.replace(/^.*__run__\//,'')));
 addEventListener('load',function(){post('sys',st('Página carregada em '+Math.round(performance.now())+' ms'))})}

/* ---------- console em tempo real ---------- */
const FK=[['all','Tudo'],['error','Erros'],['warn','Avisos'],['info','Info'],['log','Log'],['net','Rede']],FLT={k:'all',q:''},cnt={error:0,warn:0},KL={err:'error',in:'log',out:'log',debug:'log',sys:'info'};
const pv=v=>v.k=='str'?JSON.stringify(v.v.slice(0,30)):v.k=='obj'?v.c:v.v!=null?String(v.v).slice(0,30):v.k;
function fmt(x,top){const s=(c,t)=>{const n=el('span',c);n.textContent=t;return n};
 switch(x.k){case'str':return s(top?'':'v-s',top?x.v:JSON.stringify(x.v));case'num':return s('v-n',x.v);case'bool':case'null':return s('v-b',x.v||'null');case'undef':return s('v-u','undefined');case'fn':return s('v-f',x.v);case'node':return s('v-t',x.v);case'circ':return s('v-u','[circular]');case'err':return s('v-e',x.v)}
 if(!x.p)return s('v-t',x.c+' {…}');
 const d=el('details','ob'),sm=el('summary'),q=x.p.slice(0,4);sm.append(s('v-t',x.c+' '),s('v-u',x.a?'['+q.map(([,v])=>pv(v)).join(', ')+(x.n>4?', …':'')+']':'{'+q.map(([k,v])=>k+': '+pv(v)).join(', ')+(x.n>4?', …':'')+'}'));d.append(sm);
 const b=el('div','ch');x.p.forEach(([k,v])=>{const r=el('div','kv');r.append(s('v-k',k+': '),fmt(v));b.append(r)});if(x.n>x.p.length)b.append(s('v-u','… mais '+(x.n-x.p.length)));d.append(b);return d}
function filt1(d){const l=KL[d._l]||d._l;d.classList.toggle('hide',!((FLT.k=='all'||l==FLT.k)&&(!FLT.q||d.textContent.toLowerCase().includes(FLT.q))))}
const refilt=()=>[...$('#cl').children].forEach(filt1);
function badge(){$('#ec').textContent=cnt.error+(cnt.error==1?' erro':' erros')+'   '+cnt.warn+(cnt.warn==1?' aviso':' avisos');const b=$('#cbd');if(b){b.textContent=cnt.error;b.classList.toggle('hide',!cnt.error)}}
function addLog(e){e.t=e.t||Date.now();if(e.l=='error')cnt.error++;else if(e.l=='warn')cnt.warn++;
 const L=$('#cl'),near=L.scrollHeight-L.scrollTop-L.clientHeight<40,d=el('div','lg l-'+e.l+(e.ok===false?' bad':'')),tm=new Date(e.t);
 d.innerHTML=`<span class="tm">${tm.toTimeString().slice(0,8)}.${String(tm.getMilliseconds()).padStart(3,'0')}</span><span class="pf">${{in:'&gt;',out:'&lt;',err:'&lt;'}[e.l]||''}</span>`;
 const g=el('div','mg');e.a.forEach((x,i)=>{if(i)g.append(' ');g.append(fmt(x,true))});d.append(g);d._l=e.l;L.append(d);while(L.children.length>3000)L.firstChild.remove();
 filt1(d);if(near)L.scrollTop=L.scrollHeight;badge();if(e.l=='error'&&$('#bot').classList.contains('hide'))showBot('con',1)}
function clearCon(){$('#cl').innerHTML='';cnt.error=cnt.warn=0;badge()}
function clearAny(){if(bt=='con')clearCon();else{const t=terms.find(x=>x.id==bt);t&&(t.o.innerHTML='')}}
function log(m,l='log'){addLog({l,a:[{k:'str',v:String(m)}]})}
let rid=0,rhi=0;const pend=new Map(),RH=LS.get('ide_rh',[]);rhi=RH.length;
addEventListener('message',e=>{const d=e.data;if(!d||d.ide!==1)return;if(!pw||pw.closed)pw=e.source;
 const p=d.id&&pend.get(d.id);if(p){pend.delete(d.id);d.l=='err'?p.no(Error(show(d.a[0]))):p.ok(d.a[0])}
 if(d.l=='clear')return clearCon();addLog({l:d.l,a:d.a||[{k:'str',v:String(d.m)}],ok:d.ok})});
function remote(code,c){return new Promise((ok,no)=>{if(c=='i'){try{Promise.resolve(EV(code)).then(v=>ok(SER(v,3)),no)}catch(e){no(e)}return}
 if(!pw||pw.closed)return no(Error('nenhum preview aberto (execute o projeto com F5)'));const id=++rid;pend.set(id,{ok,no});setTimeout(()=>{if(pend.delete(id))no(Error('o preview não respondeu a tempo'))},8000);pw.postMessage({ide:'eval',id,code},'*')})}
const un=x=>x.k=='obj'?(x.p?(x.a?x.p.map(([,v])=>un(v)):Object.fromEntries(x.p.map(([k,v])=>[k,un(v)]))):'['+x.c+']'):x.k=='undef'?'undefined':x.k=='null'?null:x.k=='num'?Number(x.v):x.k=='bool'?x.v=='true':x.v!=null?x.v:'['+x.k+']';
const show=x=>x.k=='str'?x.v:x.k=='err'||x.k=='fn'||x.k=='node'?x.v:JSON.stringify(un(x),null,2);
async function exec(code){code=code.trim();if(!code)return;RH.push(code);if(RH.length>100)RH.shift();LS.set('ide_rh',RH);rhi=RH.length;addLog({l:'in',a:[{k:'str',v:code}]});
 if($('#cx').value=='i'){try{addLog({l:'out',a:[await remote(code,'i')]})}catch(err){addLog({l:'err',a:[SER(err,1)]})}return}
 if(!pw||pw.closed)return addLog({l:'sys',a:[{k:'str',v:'Nenhum preview aberto. Execute o projeto (F5) ou troque o contexto para IDE.'}]});pw.postMessage({ide:'eval',code},'*')}
async function injectFile(p){p=p||(cur&&cur.active);if(!p||cur.files[p]==null)throw Error('abra um arquivo para injetar');const e=ext(p),v=cur.files[p];let c;
 if(e=='css')c=`(function(){var id=${JSON.stringify('__ide_'+p)},s=document.getElementById(id);if(!s){s=document.createElement('style');s.id=id;document.head.append(s)}s.textContent=${JSON.stringify(v)};return 'CSS aplicado'})()`;
 else if(e=='js'||e=='mjs')c=v;else if(e=='html'||e=='htm')c=`(document.body.innerHTML=${JSON.stringify(new DOMParser().parseFromString(v,'text/html').body.innerHTML)},'Body substituído (scripts não são reexecutados)')`;else throw Error('só é possível injetar css, js e html');
 addLog({l:'in',a:[{k:'str',v:'injetar '+p}]});return remote(c,'p')}
const SN=[['Testes rápidos',''],['Listar scripts e estilos',"[...document.scripts].map(s=>s.src||'inline').concat([...document.styleSheets].map(s=>s.href||'inline'))"],['Contar elementos do DOM',"document.querySelectorAll('*').length"],['Destacar todos os elementos',"document.head.append(Object.assign(document.createElement('style'),{id:'__outline',textContent:'*{outline:1px solid rgba(0,120,212,.6)!important}'}))"],['Remover destaque',"document.getElementById('__outline')?.remove()"],['Métricas de carregamento',"performance.getEntriesByType('navigation')[0]"],['Armazenamento local',"({local:{...localStorage},session:{...sessionStorage},cookies:document.cookie})"],['Injetar HTML com onerror',"document.body.insertAdjacentHTML('beforeend','<img src=x onerror=console.warn(document.title)>')"],['Disparar erro não tratado',"setTimeout(()=>{throw new Error('Erro de teste')})"],['Disparar promessa rejeitada',"Promise.reject(new Error('Falha de teste'))"],['Requisição de teste',"fetch(location.href).then(r=>r.status)"]];
(()=>{const fl=$('#fl'),cin=$('#cin'),grow=()=>{cin.style.height='auto';cin.style.height=Math.min(cin.scrollHeight,120)+'px'};
 FK.forEach(([k,t])=>{const b=el('button','sg'+(k=='all'?' on':''),t);b.onclick=()=>{FLT.k=k;[...fl.children].forEach(x=>x.classList.toggle('on',x==b));refilt()};fl.append(b)});
 $('#fq').oninput=e=>{FLT.q=e.target.value.toLowerCase();refilt()};SN.forEach(([l,c])=>$('#sn').add(new Option(l,c)));$('#sn').onchange=e=>{const v=e.target.value;if(v){cin.value=v;grow();cin.focus()}e.target.selectedIndex=0};
 $('#ci').onclick=()=>injectFile().catch(err=>addLog({l:'err',a:[SER(err,1)]}));cin.oninput=grow;
 cin.onkeydown=e=>{if(e.key=='Enter'&&!e.shiftKey){e.preventDefault();const c=cin.value;cin.value='';grow();exec(c)}
  else if(e.key=='ArrowUp'&&!cin.value.includes('\n')){e.preventDefault();if(rhi>0){cin.value=RH[--rhi];grow()}}
  else if(e.key=='ArrowDown'&&!cin.value.includes('\n')){e.preventDefault();rhi=Math.min(rhi+1,RH.length);cin.value=RH[rhi]||'';grow()}
  else if(e.key=='Tab'){e.preventDefault();cin.setRangeText('  ',cin.selectionStart,cin.selectionEnd,'end')}};badge()})();
const bridge=()=>{const c=cfg();return'<script>('+BR+')('+SER+','+EV+','+JSON.stringify({my:c.proxy?[c.proxy]:[],pub:c.cors=='off'?[]:PUBPX})+')<\/script>'};

/* ---------- painel inferior e terminal ---------- */
function showBot(id,nf){$('#bot').classList.remove('hide');$('#rh').classList.remove('hide');bt=id;$('#con').classList.toggle('hide',id!='con');terms.forEach(t=>t.d.classList.toggle('hide',t.id!=id));renderBt();if(!nf){if(id=='con')$('#cin').focus();else{const t=terms.find(x=>x.id==id);t&&t.i.focus()}}}
function renderBt(){const b=$('#bts');b.innerHTML='';const add=(id,l,t)=>{const k=el('button','bt'+(bt==id?' on':''),l);k.onclick=()=>showBot(id);if(t){const c=el('i','cx',gi('x',12));c.onclick=e=>{e.stopPropagation();closeTerm(t)};k.append(c)}b.append(k)};
 add('con','Console <span id="cbd" class="bd hide"></span>');terms.forEach((t,i)=>add(t.id,gi('term',14)+'Terminal '+(i+1),t));const n=el('button','bt',gi('plus',14));n.title='Novo terminal';n.onclick=newTerm;b.append(n);badge()}
function closeTerm(t){t.d.remove();terms=terms.filter(x=>x!=t);showBot(terms.length?terms[terms.length-1].id:'con')}
function togSide(){$('#side').classList.toggle('hide');$('#rv').classList.toggle('hide');$('#a1').classList.toggle('on',!$('#side').classList.contains('hide'))}
function togBot(){const b=$('#bot');if(b.classList.contains('hide'))showBot(bt);else{b.classList.add('hide');$('#rh').classList.add('hide')}}
const tp=(t,m,c='',h)=>{const x=el('div','tl '+c);h?x.innerHTML=m:x.textContent=m;t.o.append(x);t.d.scrollTop=t.d.scrollHeight},ps=t=>t.ps.innerHTML=`<b>${esc(cur?cur.name:'~')}</b><span>:/${esc(t.cwd)}</span> $`;
const TH=LS.get('ide_th',[]);
function newTerm(){const id='t'+Date.now(),d=el('div','term hide','<div class="out"></div><div class="ln"><span class="ps"></span><input spellcheck="false" autocomplete="off" autocapitalize="off"></div>');$('#bc').append(d);
 const t={id,d,o:d.querySelector('.out'),i:d.querySelector('input'),ps:d.querySelector('.ps'),cwd:'',h:TH,hi:TH.length,env:{},st:0};terms.push(t);ps(t);d.onclick=()=>{if(!getSelection().toString())t.i.focus()};
 t.i.onkeydown=e=>{const i=t.i;
  if(e.key=='Enter'){const c=i.value;i.value='';tp(t,'<span class="ps">'+t.ps.innerHTML+'</span> '+esc(c),'cmd',1);if(c.trim()){if(t.h[t.h.length-1]!=c)t.h.push(c);if(t.h.length>200)t.h.shift();LS.set('ide_th',t.h);t.hi=t.h.length;sh(t,c)}}
  else if(e.key=='ArrowUp'){e.preventDefault();if(t.hi>0)i.value=t.h[--t.hi]}else if(e.key=='ArrowDown'){e.preventDefault();t.hi=Math.min(t.hi+1,t.h.length);i.value=t.h[t.hi]||''}
  else if(e.key=='Tab'){e.preventDefault();tab(t)}else if(e.ctrlKey&&e.key=='l'){e.preventDefault();t.o.innerHTML=''}
  else if(e.ctrlKey&&e.key=='c'&&i.selectionStart==i.selectionEnd){e.preventDefault();tp(t,t.ps.textContent+' '+i.value+'^C','mu');i.value=''}else if(e.ctrlKey&&e.key=='u'){e.preventDefault();i.value=''}};
 tp(t,'Terminal do projeto. Digite "help" para ver os comandos.','mu');showBot(id)}
const ab=(t,x)=>norm(x&&x[0]=='/'?x:(t.cwd?t.cwd+'/':'')+(x||'')),isD=p=>!p||cur.dirs.includes(p)||Object.keys(cur.files).some(k=>k.startsWith(p+'/'));
const fl2=a=>({f:new Set(a.filter(x=>/^-[a-zA-Z]+$/.test(x)).join('').replace(/-/g,'')),r:a.filter(x=>!/^-[a-zA-Z]+$/.test(x))});
const cut=(a,i,t,tail)=>{let n=10;const r=[];for(let k=0;k<a.length;k++){if(a[k]=='-n')n=+a[++k]||10;else if(/^-\d+$/.test(a[k]))n=-a[k];else r.push(a[k])}const v=r.length?cur.files[ab(t,r[0])]:i;if(v==null)throw Error('arquivo não encontrado');const L=v.split('\n');return(tail?L.slice(-n):L.slice(0,n)).join('\n')};
const HELP=`Encadeie com | && || ; e grave com > ou >>. Use aspas quando o argumento tiver esses símbolos.
Arquivos   ls [-a] · cd · pwd · cat · touch · mkdir · rm [-rf] · mv · cp · tree · find · head/tail [-n N] · wc [-l] · sort · uniq · grep [-in] padrão [arquivos]
Projeto    open <arquivo> · run [arquivo] · reload · stop · export · projects · inject [arquivo]
Preview    eval <js> executa no preview aberto · js <js> executa na própria IDE · curl [-I] <url>
Shell      echo · export VAR=valor · env · history · clear · date · log <texto> · console [clear]
Atalhos    Tab completa · setas navegam no histórico · Ctrl+L limpa · Ctrl+C cancela a linha · Ctrl+U apaga a linha`;
const CM={help:()=>HELP,echo:a=>a.join(' '),pwd:(a,i,t)=>'/'+t.cwd,date:()=>new Date().toLocaleString(),whoami:()=>'dev',
 cd:(a,i,t)=>{const d=ab(t,a[0]||'/');if(!isD(d))throw Error('cd: '+(a[0]||d)+': pasta não encontrada');t.cwd=d},
 ls:(a,i,t)=>{const{f,r}=fl2(a),d=ab(t,r[0]);if(!isD(d))throw Error('ls: '+(r[0]||d)+': não encontrado');const k=kids(d).filter(([n])=>f.has('a')||n[0]!='.');
  return{t:k.map(([n,D])=>n+(D?'/':'')).join('\n'),h:k.length?'<div class="ls">'+k.map(([n,D])=>`<span class="fe${D?' d':''}">${ico(n,D)}${esc(n)}${D?'/':''}</span>`).join('')+'</div>':''}},
 cat:(a,i,t)=>a.length?a.map(x=>{const v=cur.files[ab(t,x)];if(v==null)throw Error('cat: '+x+': arquivo não encontrado');return bin(v)?'(arquivo binário)':v}).join('\n'):i,
 touch:(a,i,t)=>{a.forEach(x=>{const p=ab(t,x);if(p&&cur.files[p]==null)cur.files[p]=''});renderTree();dirty()},
 mkdir:(a,i,t)=>{a.filter(x=>x[0]!='-').forEach(x=>{const p=ab(t,x);if(p&&!cur.dirs.includes(p))cur.dirs.push(p)});renderTree();dirty()},
 rm:(a,i,t)=>{const{f,r}=fl2(a);r.forEach(x=>{const p=ab(t,x);if(cur.files[p]!=null)rmPath(p);else if(p&&isD(p)){if(!f.has('r'))throw Error('rm: '+x+' é uma pasta (use -r)');rmPath(p)}else if(!f.has('f'))throw Error('rm: '+x+': não encontrado')})},
 mv:(a,i,t)=>{const s=ab(t,a[0]),d=ab(t,a[1]);if(cur.files[s]==null&&!isD(s))throw Error('mv: origem não encontrada');movePath(s,d&&isD(d)?d+'/'+s.split('/').pop():d)},
 cp:(a,i,t)=>{const s=ab(t,a[0]);let d=ab(t,a[1]);if(cur.files[s]==null)throw Error('cp: apenas arquivos');if(d&&isD(d))d+='/'+s.split('/').pop();cur.files[d]=cur.files[s];renderTree();dirty()},
 tree:(a,i,t)=>{let s='';const w=(d,pre)=>{const k=kids(d);k.forEach(([n,D],j)=>{const e=j==k.length-1;s+=pre+(e?'└── ':'├── ')+n+(D?'/':'')+'\n';if(D)w(d?d+'/'+n:n,pre+(e?'    ':'│   '))})};w(ab(t,a[0]),'');return s||'(vazio)'},
 find:(a,i,t)=>{const q=(a.find(x=>x[0]!='-')||'').toLowerCase(),b=ab(t,'');return Object.keys(cur.files).concat(cur.dirs).filter(k=>(!b||k.startsWith(b+'/'))&&k.toLowerCase().includes(q)).sort().join('\n')},
 grep:(a,i,t)=>{const{f,r}=fl2(a);if(!r.length)throw Error('grep: informe um padrão');let re;try{re=new RegExp(r[0],f.has('i')?'i':'')}catch(e){throw Error('grep: expressão inválida')}const o=[];
  if(r.length>1||!i){const F=r.length>1?r.slice(1).map(x=>ab(t,x)):Object.keys(cur.files);F.forEach(k=>{const v=cur.files[k];if(v==null||bin(v))return;v.split('\n').forEach((l,n)=>{if(re.test(l))o.push((F.length>1?k+':':'')+(f.has('n')?(n+1)+':':'')+l)})})}else i.split('\n').forEach(l=>{if(re.test(l))o.push(l)});return o.join('\n')},
 head:(a,i,t)=>cut(a,i,t,0),tail:(a,i,t)=>cut(a,i,t,1),sort:(a,i)=>i.split('\n').filter(Boolean).sort((x,y)=>x.localeCompare(y)).join('\n'),uniq:(a,i)=>i.split('\n').filter((l,k,A)=>l!=A[k-1]).join('\n'),
 wc:(a,i,t)=>{const r=a.filter(x=>x[0]!='-'),v=r.length?cur.files[ab(t,r[0])]||'':i,l=v?v.split('\n').length-(v.endsWith('\n')?1:0):0;return a.includes('-l')?String(l):`${l} linhas  ${v.split(/\s+/).filter(Boolean).length} palavras  ${v.length} caracteres`},
 open:(a,i,t)=>{const p=ab(t,a[0]);if(cur.files[p]==null)throw Error('open: arquivo não encontrado');openFile(p)},code:'open',
 run:(a,i,t)=>{if(a[0]){const p=ab(t,a[0]);if(cur.files[p]==null)throw Error('run: arquivo não encontrado');openFile(p)}run()},
 reload:()=>{if(!pw||pw.closed)throw Error('nenhum preview aberto');run(true)},stop:()=>{if(!pw||pw.closed)throw Error('nenhum preview aberto');pw.close()},projects:()=>{projects()},
 export:(a,i,t)=>{const v=a.filter(x=>x.includes('='));if(!a.length)return void exportDlg();v.forEach(x=>{const k=x.indexOf('=');t.env[x.slice(0,k)]=x.slice(k+1)})},
 env:(a,i,t)=>Object.entries(t.env).map(([k,v])=>k+'='+v).join('\n'),history:(a,i,t)=>t.h.map((c,n)=>(n+1)+'  '+c).join('\n'),clear:(a,i,t)=>{t.o.innerHTML=''},
 log:a=>{addLog({l:'sys',a:[{k:'str',v:a.join(' ')}]})},console:(a)=>{a[0]=='clear'?clearCon():showBot('con')},
 eval:async(a,i)=>show(await remote(a.join(' ')||i,'p')),js:async(a,i)=>show(await remote(a.join(' ')||i,'i')),inject:async(a,i,t)=>show(await injectFile(a[0]&&ab(t,a[0]))),
 curl:async a=>{const{f,r}=fl2(a);if(!r[0])throw Error('curl: informe a URL');let x;try{x=await fetch(r[0])}catch(e){throw Error('curl: '+e.message+' (o navegador pode ter bloqueado por CORS)')}return f.has('I')?`HTTP ${x.status} ${x.statusText}\n`+[...x.headers].map(([k,v])=>k+': '+v).join('\n'):await x.text()}};
function lex(s,t){const r=[],re=/\s*(?:(&&|\|\||>>|[|;>])|"((?:[^"\\]|\\.)*)"|'([^']*)'|([^\s|;&>"']+))/g,xp=w=>w.replace(/\$\{?(\w+|\?)\}?/g,(_,k)=>k=='?'?String(t.st):t.env[k]!=null?t.env[k]:'');let m;
 while((m=re.exec(s))&&m[0].trim())r.push(m[1]?{o:m[1]}:{w:m[2]!=null?xp(m[2].replace(/\\(.)/g,'$1')):m[3]!=null?m[3]:xp(m[4])});return r}
async function sh(t,line){const tk=lex(line,t),L=[];let P=[],A=[],R=null,sep=';';
 const es=()=>{if(A.length||R){P.push({a:A,r:R});A=[];R=null}},ep=n=>{es();if(P.length)L.push({p:P,sep});P=[];sep=n};
 for(let i=0;i<tk.length;i++){const k=tk[i];if(k.o=='|')es();else if(k.o=='&&'||k.o=='||'||k.o==';')ep(k.o);else if(k.o=='>'||k.o=='>>'){const n=tk[++i];R={f:n&&n.w,ap:k.o=='>>'}}else A.push(k.w)}
 ep(';');let ok=true;for(const c of L){if((c.sep=='&&'&&!ok)||(c.sep=='||'&&ok))continue;ok=await pipe(t,c.p);t.st=ok?0:1}ps(t);t.i.focus()}
async function pipe(t,P){let inp='';for(let i=0;i<P.length;i++){const{a,r}=P[i],last=i==P.length-1,n=a[0];if(!n)continue;let f=CM[n];if(typeof f=='string')f=CM[f];
  if(!f){tp(t,n+': comando não encontrado. Digite "help".','error');return false}
  try{let o=await f(a.slice(1),inp,t);if(o==null)o='';const x=typeof o=='string'?o:o.t;
   if(r){if(!r.f)throw Error('redirecionamento sem destino');const p=ab(t,r.f);if(isD(p))throw Error(p+': é uma pasta');cur.files[p]=(r.ap?cur.files[p]||'':'')+(x&&!x.endsWith('\n')?x+'\n':x);renderTree();dirty();inp=''}
   else if(last){if(typeof o=='string'){if(o)tp(t,o)}else if(o.h)tp(t,o.h,'',1)}else inp=x}
  catch(err){tp(t,String(err.message||err),'error');return false}}return true}
function tab(t){const i=t.i,v=i.value.slice(0,i.selectionStart),w=v.match(/(\S*)$/)[1];let c;
 if(!/\s/.test(v.trimStart()))c=Object.keys(CM).filter(k=>k.startsWith(w));else{const sl=w.lastIndexOf('/'),dp=sl<0?'':w.slice(0,sl+1),pre=w.slice(sl+1);c=kids(ab(t,dp)).filter(([n])=>n.startsWith(pre)).map(([n,D])=>dp+n+(D?'/':''))}
 if(!c.length)return;const cp=c.reduce((a,b)=>{let k=0;while(a[k]&&a[k]==b[k])k++;return a.slice(0,k)});i.value=v.slice(0,v.length-w.length)+cp+(c.length==1&&!cp.endsWith('/')?' ':'')+i.value.slice(i.selectionStart);
 if(c.length>1)tp(t,c.map(x=>x.replace(/\/$/,'')).join('  '),'mu')}
function drag(h,fn){h.onmousedown=e=>{e.preventDefault();const mv=ev=>fn(ev),up=()=>{removeEventListener('mousemove',mv);removeEventListener('mouseup',up)};addEventListener('mousemove',mv);addEventListener('mouseup',up)}}
drag($('#rv'),e=>{const w=Math.max(160,Math.min(600,e.clientX-48));$('#side').style.width=w+'px';LS.set('ide_sw',w)});
drag($('#rh'),e=>{const r=$('#ed').getBoundingClientRect(),h=Math.max(90,Math.min(r.height-120,r.bottom-e.clientY));$('#bot').style.height=h+'px';LS.set('ide_bh',h)});
{const w=LS.get('ide_sw'),h=LS.get('ide_bh');if(w)$('#side').style.width=w+'px';if(h)$('#bot').style.height=h+'px'}
$('#a1').onclick=togSide;$('#a3').onclick=()=>run();$('#a4').onclick=()=>terms.length?showBot(terms[0].id):newTerm();$('#a5').onclick=()=>{ex={};renderTree()};$('#ec').onclick=()=>showBot('con');

/* ---------- IA ---------- */
async function settings(){const c=cfg(),m=await dlg('Configurações','<label>Provedor de IA</label><select id="pv">'+Object.entries(PROV).map(([k,v])=>`<option value="${k}"${k==c.prov?' selected':''}>${v.n}</option>`).join('')+`</select><label>Chave de API (fica salva só neste navegador)</label><input id="ky" type="password" value="${esc(c.key)}"><label>Modelo (vazio = padrão do provedor)</label><input id="md" value="${esc(c.model)}"><label>URL base (opcional; obrigatória em “Outra”)</label><input id="ur" value="${esc(c.url)}" placeholder="https://.../v1"><label>Contornar CORS no preview</label><select id="co"><option value="auto"${c.cors!='off'?' selected':''}>Automático: tenta direto e, se o CORS bloquear, usa proxy</option><option value="off"${c.cors=='off'?' selected':''}>Desligado</option></select><label>Seu próprio proxy CORS (opcional, tem prioridade)</label><input id="px" value="${esc(c.proxy)}" placeholder="https://seu-proxy.exemplo/?url="><small>Proxies públicos enxergam os dados das requisições. Pedidos com Authorization ou x-api-key nunca vão para eles.</small>`,'Salvar');if(!m)return;
 const g=i=>m.querySelector('#'+i).value.trim();LS.set('ide_cfg',{prov:g('pv'),key:g('ky'),model:g('md'),url:g('ur'),proxy:g('px'),cors:g('co')});toast('Configurações salvas','ok')}
async function callAI(sys,usr){const c=cfg(),P=PROV[c.prov],model=c.model||P.m;let r,j;
 if(P.t=='g'){r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':c.key},body:JSON.stringify({systemInstruction:{parts:[{text:sys}]},contents:[{role:'user',parts:[{text:usr}]}]})});j=await r.json();if(!r.ok)throw Error(j.error?.message||r.status);return j.candidates[0].content.parts.map(x=>x.text||'').join('')}
 if(P.t=='a'){r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':c.key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model,max_tokens:8192,system:sys,messages:[{role:'user',content:usr}]})});j=await r.json();if(!r.ok)throw Error(j.error?.message||r.status);return j.content.map(x=>x.text||'').join('')}
 const u=(c.url||P.u||'').replace(/\/$/,'');if(!u)throw Error('Defina a URL base nas configurações');if(!model)throw Error('Defina o modelo nas configurações');
 r=await fetch(u+'/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+c.key},body:JSON.stringify({model,messages:[{role:'system',content:sys},{role:'user',content:usr}]})});j=await r.json();if(!r.ok)throw Error(j.error?.message||r.status);return j.choices[0].message.content}
async function aiDialog(){if(!cur||!cur.active)return toast('Abra um arquivo primeiro','warn');if(!cfg().key){toast('Configure a chave da IA primeiro','warn');return settings()}
 const p=cur.active,model=models[p],sel=ed.getSelection(),has=sel&&!sel.isEmpty();
 const m=await dlg('Editar com IA',`<small>${esc(p)} · ${has?'só o trecho selecionado':'arquivo inteiro'}</small><textarea id="pt" rows="5" placeholder="O que a IA deve fazer? (Ctrl+Enter envia)"></textarea>`,'Enviar');if(!m)return;
 const pt=m.querySelector('#pt').value.trim();if(!pt)return;const range=has?sel:model.getFullModelRange(),selTxt=has?model.getValueInRange(sel):'';
 let b=14000,others='';for(const[k,v]of Object.entries(cur.files)){if(k==p||bin(v)||v.length>b)continue;b-=v.length;others+=`\n--- ${k} ---\n${v}\n`}
 const sys='Você é um engenheiro de software sênior editando código dentro de uma IDE. Responda SOMENTE com o código final, sem markdown, sem cercas de código e sem explicações.';
 const usr=`Arquivos do projeto: ${Object.keys(cur.files).join(', ')}\n\nOutros arquivos (contexto):${others}\n\n=== ARQUIVO ATUAL: ${p} ===\n${model.getValue()}\n=== FIM ===\n\n`+(has?`Reescreva APENAS o trecho selecionado abaixo e devolva somente o novo trecho:\n=== TRECHO ===\n${selTxt}\n=== FIM ===\n\n`:'Devolva o arquivo COMPLETO já modificado.\n\n')+`Pedido: ${pt}`;
 toast('A IA está trabalhando…');
 try{const out=(await callAI(sys,usr)).trim().replace(/^```[\w+.-]*\n/,'').replace(/\n```$/,'');model.pushEditOperations(null,[{range,text:out}],()=>null);toast('Código atualizado (Ctrl+Z desfaz)','ok')}
 catch(err){toast('Erro da IA: '+err.message,'err');log('Erro da IA: '+err.message,'error')}}

/* ---------- comandos e atalhos ---------- */
const CMDS=()=>[{l:'Arquivo: novo arquivo',r:'Alt+N',fn:()=>newFile(selDir)},{l:'Arquivo: nova pasta',fn:()=>newDir(selDir)},{l:'Arquivo: salvar',r:'Ctrl+S',fn:()=>save(1)},{l:'Arquivo: fechar aba',r:'Alt+W',fn:()=>cur.active&&closeTab(cur.active)},
 {l:'Executar projeto',r:'F5',fn:()=>run()},{l:'IA: editar com IA',r:'Alt+I',fn:aiDialog},{l:'Projetos: abrir e gerenciar',fn:projects},{l:'Projetos: novo projeto',fn:newDlg},{l:'Projetos: exportar',fn:exportDlg},{l:'Projetos: importar',fn:importMenu},
 {l:'Ver: alternar lista de arquivos',r:'Ctrl+B',fn:togSide},{l:'Ver: alternar painel inferior',r:'Ctrl+J',fn:togBot},{l:'Terminal: novo terminal',r:'Ctrl+`',fn:newTerm},{l:'Console: limpar',fn:clearAny},
 {l:'Editor: formatar documento',r:'Shift+Alt+F',fn:()=>ed.getAction('editor.action.formatDocument').run()},{l:'Buscar em todos os arquivos',r:'Ctrl+Shift+F',fn:gsearch},{l:'Offline: baixar Python, 7z e Babel',fn:()=>offline(OFF2)},{l:'Configurações (IA, CORS)',fn:settings},{l:'Console: injetar arquivo ativo no preview',fn:()=>injectFile().catch(e=>addLog({l:'err',a:[SER(e,1)]}))}];
addEventListener('keydown',e=>{if(document.querySelector('.modal')||!cur)return;const c=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();let f=null;
 if(c&&!e.shiftKey&&!e.altKey){if(k=='s')f=()=>save(1);else if(k=='p')f=()=>pal(Object.keys(cur.files).filter(x=>!bin(cur.files[x])).map(x=>({l:x.split('/').pop(),r:x,ic:ico(x),fn:()=>openFile(x)})),'Abrir arquivo…');else if(k=='b')f=togSide;else if(k=='j')f=togBot;else if(k=='enter')f=()=>run();else if(e.code=='Backquote')f=()=>terms.length?showBot(bt!='con'?bt:terms[0].id):newTerm()}
 else if(c&&e.shiftKey&&k=='p')f=()=>pal(CMDS(),'Digite um comando…');
 else if(c&&e.shiftKey&&k=='f')f=gsearch;
 else if(e.altKey&&!c&&!e.shiftKey){if(e.code=='KeyI')f=aiDialog;else if(e.code=='KeyN')f=()=>newFile(selDir);else if(e.code=='KeyW')f=()=>cur.active&&closeTab(cur.active)}
 else if(k=='f5'&&!c)f=()=>run();
 if(f){e.preventDefault();e.stopPropagation();f()}},true);

/* ---------- inicialização ---------- */
$('#bpj').onclick=projects;$('#bex').onclick=()=>exportDlg();$('#bim').onclick=importMenu;$('#bset').onclick=settings;$('#bai').onclick=aiDialog;$('#brun').onclick=()=>run();
$('#bnf').onclick=()=>newFile(selDir);$('#bgs').onclick=gsearch;$('#bnd').onclick=()=>newDir(selDir);$('#bx').onclick=togBot;$('#bclr').onclick=clearAny;
const BASE='https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min';
self.MonacoEnvironment={getWorkerUrl:()=>URL.createObjectURL(new Blob([`self.MonacoEnvironment={baseUrl:'${BASE}/'};importScripts('${BASE}/vs/base/worker/workerMain.js');`],{type:'text/javascript'}))};
require.config({paths:{vs:BASE+'/vs'}});
require(['vs/editor/editor.main'],async()=>{
 monaco.editor.defineTheme('ide',{base:'vs-dark',inherit:true,rules:[],colors:{'editor.background':'#1f1f1f','editorGutter.background':'#1f1f1f','minimap.background':'#1f1f1f','editor.lineHighlightBackground':'#2a2d2e','editorLineNumber.foreground':'#6e7681','editorWidget.background':'#252526','scrollbar.shadow':'#00000000'}});
 const ts=monaco.languages.typescript;[ts.typescriptDefaults,ts.javascriptDefaults].forEach(d=>{d.setCompilerOptions({jsx:ts.JsxEmit.React,allowNonTsExtensions:true,allowJs:true,target:ts.ScriptTarget.ESNext});d.setDiagnosticsOptions({noSemanticValidation:true})});
 ed=monaco.editor.create($('#mon'),{theme:'ide',model:null,automaticLayout:true,fontSize:13,lineHeight:20,fontFamily:"'Cascadia Code','Cascadia Mono',Consolas,Menlo,monospace",fontLigatures:true,smoothScrolling:true,cursorSmoothCaretAnimation:'on',scrollBeyondLastLine:false,renderLineHighlight:'all',wordWrap:'on',tabSize:2,padding:{top:8},bracketPairColorization:{enabled:true},minimap:{enabled:true}});
 ed.onDidChangeCursorPosition(e=>$('#cp').textContent='Ln '+e.position.lineNumber+', Col '+e.position.column);
 ed.addAction({id:'ide.ai',label:'Editar com IA',contextMenuGroupId:'0_ide',contextMenuOrder:0,run:aiDialog});
 ed.addAction({id:'ide.run',label:'Executar projeto',contextMenuGroupId:'0_ide',contextMenuOrder:1,run:()=>run()});
 ed.addAction({id:'ide.path',label:'Copiar caminho do arquivo',contextMenuGroupId:'0_ide',contextMenuOrder:2,run:()=>cur.active&&navigator.clipboard.writeText(cur.active)});
 await openAny();log('IDE pronta. Use o botão direito em arquivos e no editor para ver as ferramentas.','info');showBot('con',1);
});
setTimeout(()=>{if(!ed)$('#ai2').textContent='Não foi possível carregar o editor. Verifique sua conexão com a internet.'},15000);
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{swOK=true;$('#sw').textContent='Origem real + offline';$('#sw').style.color='var(--ok)';if(!LS.get('ide_off1'))offline(OFF1,1).then(ok=>ok&&LS.set('ide_off1',1))}).catch(()=>{});
</script>
</body>
</html>
