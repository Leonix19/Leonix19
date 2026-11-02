// ===== CORE =====
const NS='http://www.w3.org/2000/svg';
const W=720,H=1280;
function E(tag,a,p){const e=document.createElementNS(NS,tag);if(a)for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const eo3=t=>1-Math.pow(1-clamp(t),3);
const eio=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const eob=t=>{t=clamp(t);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
const R=i=>{const x=Math.sin(i*12.9898+78.233)*43758.5453;return x-Math.floor(x)};
const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
const svg=document.getElementById('v');
const defs=E('defs',null,svg);
function glowF(id,std){const f=E('filter',{id,x:'-60%',y:'-60%',width:'220%',height:'220%'},defs);E('feGaussianBlur',{in:'SourceGraphic',stdDeviation:std,result:'b'},f);const m=E('feMerge',null,f);E('feMergeNode',{in:'b'},m);E('feMergeNode',{in:'SourceGraphic'},m);}
function blurF(id,std){const f=E('filter',{id,x:'-60%',y:'-60%',width:'220%',height:'220%'},defs);E('feGaussianBlur',{stdDeviation:std},f);}
glowF('glowS',3);glowF('glow',7);glowF('glowL',16);blurF('b4',4);blurF('b10',10);blurF('b24',24);blurF('b50',50);
function lg(id,x1,y1,x2,y2,stops){const g=E('linearGradient',{id,x1,y1,x2,y2},defs);stops.forEach(s=>E('stop',{offset:s[0],'stop-color':s[1],'stop-opacity':s[2]===undefined?1:s[2]},g));}
function rg(id,stops,cx=.5,cy=.5,r=.5){const g=E('radialGradient',{id,cx,cy,r},defs);stops.forEach(s=>E('stop',{offset:s[0],'stop-color':s[1],'stop-opacity':s[2]===undefined?1:s[2]},g));}
const SK='#f6d3b3', SK2='#e2b690';
// ===== timeline helpers =====
const LN={};TL.lines.forEach(l=>LN[l.id]=l);
function wt(id,word,nth=0){const ws=LN[id].words;let c=0;for(const w of ws){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===word){if(c===nth)return w.s;c++}}return LN[id].start}
const SC={};TL.scenes.forEach(s=>SC[s.name]=s);
function speaking(voice,t){return TL.lines.some(l=>l.voice===voice&&t>=l.start&&t<=l.start+l.dur)}
// ===== deterministic effects =====
function rain(parent,n,seed,color='#a9c8ff'){const ls=[];for(let i=0;i<n;i++)ls.push(E('line',{stroke:color,'stroke-width':1+R(i+seed)*1.6,'stroke-linecap':'round',opacity:.15+R(i+seed+9)*.35},parent));
 return t=>{ls.forEach((l,i)=>{const sp=900+R(i+seed+3)*700;const x=R(i+seed)*820-60;const y=((R(i+seed+7)*1500+t*sp)%1500)-100;const xx=x-y*.12;l.setAttribute('x1',xx);l.setAttribute('y1',y);l.setAttribute('x2',xx-5);l.setAttribute('y2',y+34)})}}
function bokeh(parent,n,seed,cols,x0,y0,x1,y1,rmin=8,rmax=34){const cs=[];for(let i=0;i<n;i++){const c=E('circle',{r:rmin+R(i+seed)*(rmax-rmin),fill:cols[Math.floor(R(i+seed+5)*cols.length)],opacity:.12+R(i+seed+2)*.3,filter:'url(#b4)'},parent);cs.push([c,x0+R(i+seed+1)*(x1-x0),y0+R(i+seed+3)*(y1-y0),R(i+seed+8)*6.28])}
 return t=>cs.forEach(([c,x,y,p])=>{c.setAttribute('cx',x+Math.sin(t*.4+p)*10);c.setAttribute('cy',y+Math.cos(t*.3+p)*7)})}
function dust(parent,n,seed,x0,y0,x1,y1,col='#9fd8ff'){const cs=[];for(let i=0;i<n;i++)cs.push([E('circle',{r:1+R(i+seed)*2.2,fill:col,opacity:.5},parent),R(i+seed+1),R(i+seed+2),R(i+seed+3)]);
 return t=>cs.forEach(([c,a,b,s])=>{c.setAttribute('cx',x0+((a*(x1-x0)+t*8*(s-.5)*6)%(x1-x0)+(x1-x0))%(x1-x0));c.setAttribute('cy',y0+((b*(y1-y0)-t*14*(.4+s))%(y1-y0)+(y1-y0))%(y1-y0));c.setAttribute('opacity',(.2+.5*Math.abs(Math.sin(t*1.5+s*9))).toFixed(2))})}
function star4(parent,r,fill='#fff'){return E('path',{d:`M0 ${-r} Q${r*.12} ${-r*.12} ${r} 0 Q${r*.12} ${r*.12} 0 ${r} Q${-r*.12} ${r*.12} ${-r} 0 Q${-r*.12} ${-r*.12} 0 ${-r}Z`,fill},parent)}
// ===== characters =====
function Char(parent,c){
 const g=E('g',null,parent);const o={g,c};
 if(!c.nobody){E('rect',{x:-20,y:50,width:40,height:34,rx:10,fill:c.skin2||SK2},g);
 E('path',{d:'M-90 280 L-90 128 Q-90 72 -34 72 L34 72 Q90 72 90 128 L90 280 Z',fill:c.body},g);
 E('path',{d:'M-90 128 Q-90 72 -34 72 L-20 72 Q-60 90 -64 150 L-90 150Z',fill:'#000',opacity:.18},g);
 if(c.accent)E('path',{d:'M-44 72 Q0 122 44 72 L30 72 Q0 100 -30 72Z',fill:c.accent},g);
 if(c.zip)E('line',{x1:0,y1:104,x2:0,y2:280,stroke:c.zip,'stroke-width':3,opacity:.6},g);
 if(c.patch){E('rect',{x:20,y:150,width:46,height:20,rx:5,fill:c.patch},g);}}
 const h=E('g',null,g);o.h=h;
 if(c.ponytail)E('ellipse',{cx:-66,cy:10,rx:20,ry:34,fill:c.hair,transform:'rotate(18 -66 10)'},h);
 E('circle',{cx:-61,cy:14,r:12,fill:c.skin||SK2},h);E('circle',{cx:61,cy:14,r:12,fill:c.skin||SK2},h);
 E('circle',{cx:0,cy:0,r:62,fill:c.mask?c.mask:(c.skin||SK)},h);
 if(!c.mask)E('path',{d:'M-62 6 Q-40 66 0 66 Q40 66 62 6 Q58 56 0 62 Q-58 56 -62 6Z',fill:'#000',opacity:.08},h);
 if(c.mask){E('path',{d:'M-62 -2 Q0 -22 62 -2 L62 8 Q0 -10 -62 8Z',fill:'#ffffff',opacity:.05},h)}
 if(c.hat==='beanie'){E('path',{d:'M-65 -4 Q-70 -78 0 -80 Q70 -78 65 -4 Q0 -24 -65 -4Z',fill:c.hatc},h);E('path',{d:'M-66 -2 Q0 -22 66 -2 L66 -22 Q0 -42 -66 -22Z',fill:c.hata||c.hatc},h);E('path',{d:'M-50 -50 Q-20 -72 20 -66',stroke:'#fff',opacity:.12,'stroke-width':6,fill:'none','stroke-linecap':'round'},h)}
 if(c.hat==='hair'){E('path',{d:'M-64 4 Q-72 -76 0 -78 Q72 -76 64 4 Q58 -34 20 -42 Q-30 -30 -64 4Z',fill:c.hair},h)}
 if(c.hat==='curly'){for(let i=0;i<9;i++){const a=Math.PI*(1.05+i*.11);E('circle',{cx:Math.cos(a)*54,cy:Math.sin(a)*54-4,r:17,fill:c.hair},h)}E('path',{d:'M-56 -10 Q0 -48 56 -10 Q40 -30 0 -32 Q-40 -30 -56 -10Z',fill:c.hair},h)}
 if(c.headset){E('path',{d:'M-66 8 Q-70 -60 0 -64 Q70 -60 66 8',stroke:'#222a44','stroke-width':8,fill:'none'},h);E('rect',{x:-76,y:-6,width:18,height:34,rx:8,fill:'#2b3560'},h);E('rect',{x:58,y:-6,width:18,height:34,rx:8,fill:'#2b3560'},h);E('circle',{cx:-67,cy:11,r:4,fill:'#35e0ff',filter:'url(#glowS)'},h)}
 o.eL=E('ellipse',{cx:-22,cy:10,rx:11,ry:12,fill:'#fff'},h);o.eR=E('ellipse',{cx:22,cy:10,rx:11,ry:12,fill:'#fff'},h);
 o.pL=E('circle',{cx:-22,cy:10,r:5.6,fill:'#12141c'},h);o.pR=E('circle',{cx:22,cy:10,r:5.6,fill:'#12141c'},h);
 if(c.glasses){o.gl=E('g',{fill:'none',stroke:c.glasses,'stroke-width':4},h);E('circle',{cx:-22,cy:10,r:19},o.gl);E('circle',{cx:22,cy:10,r:19},o.gl);E('line',{x1:-3,y1:10,x2:3,y2:10},o.gl)}
 const bc=c.brow||'#14161f';
 o.bL=E('line',{x1:-34,y1:-6,x2:-12,y2:-6,stroke:bc,'stroke-width':6,'stroke-linecap':'round'},h);o.bR=E('line',{x1:12,y1:-6,x2:34,y2:-6,stroke:bc,'stroke-width':6,'stroke-linecap':'round'},h);
 o.m=E('path',{d:'M-13 40 Q0 46 13 40',stroke:c.mouthc||'#2a1a18','stroke-width':5,fill:'none','stroke-linecap':'round'},h);
 o.sw=E('path',{d:'M52 -18 Q60 -4 52 4 Q44 -4 52 -18Z',fill:'#7fe3ff',opacity:0},h);
 o.hands=[];
 o.hand=(x,y,r=17)=>{const hh=E('g',{transform:`translate(${x} ${y})`},g);E('circle',{r,fill:c.glove||SK},hh);E('circle',{r:r*.5,cx:-r*.25,cy:-r*.25,fill:'#fff',opacity:.25},hh);return hh};
 const EX={calm:{L:[-34,-7,-12,-7],R:[12,-7,34,-7],m:'M-13 40 Q0 46 13 40',ry:12,sw:0},
  worried:{L:[-34,-2,-12,-13],R:[12,-13,34,-2],m:'M-15 46 Q-7 37 0 44 Q7 51 15 42',ry:13,sw:1},
  shock:{L:[-34,-20,-12,-24],R:[12,-24,34,-20],m:'M-10 38 Q0 66 10 38 Q0 33 -10 38Z',ry:17,sw:1,mf:1},
  smirk:{L:[-34,-8,-12,-10],R:[12,-14,34,-5],m:'M-12 42 Q4 49 18 34',ry:12,sw:0},
  focus:{L:[-34,-14,-12,-3],R:[12,-3,34,-14],m:'M-13 43 L13 43',ry:10,sw:0},
  smug:{L:[-34,-9,-12,-4],R:[12,-4,34,-9],m:'M-12 42 Q0 50 12 42',ry:5.5,sw:0},
  talk:{L:[-34,-8,-12,-10],R:[12,-10,34,-8],m:'M-12 38 Q0 58 12 38 Q0 36 -12 38Z',ry:12,sw:0,mf:1}};
 o.set=(ex,look=[0,0],blink=0,talk=0)=>{const e=EX[ex]||EX.calm;const set=(el,v)=>{el.setAttribute('x1',v[0]);el.setAttribute('y1',v[1]);el.setAttribute('x2',v[2]);el.setAttribute('y2',v[3])};
  set(o.bL,e.L);set(o.bR,e.R);const mm=talk?EX.talk:e;o.m.setAttribute('d',mm.m);o.m.setAttribute('fill',mm.mf?'#3a1218':'none');
  const ry=e.ry*(1-blink*.9);[o.eL,o.eR].forEach(x=>x.setAttribute('ry',ry));const big=ex==='shock'?1.15:1;
  [o.eL,o.eR].forEach(x=>x.setAttribute('rx',11*big));
  o.pL.setAttribute('cx',-22+look[0]);o.pL.setAttribute('cy',10+look[1]);o.pR.setAttribute('cx',22+look[0]);o.pR.setAttribute('cy',10+look[1]);
  const pr=(ex==='shock'?3.8:5.6);[o.pL,o.pR].forEach(x=>{x.setAttribute('r',pr);x.setAttribute('opacity',blink>.5?0:1)});
  o.sw.setAttribute('opacity',e.sw?.9:0)};
 return o;
}
const HERO={skin:SK,body:'#1d6f8c',accent:'#ff8a3d',zip:'#0c3a4c',patch:'#ffcf4a',hat:'beanie',hatc:'#14161f',hata:'#ff8a3d'};
const DEX={skin:'#d9a07a',skin2:'#c88a64',body:'#26b673',accent:'#0f5d3a',hat:'curly',hair:'#241512',glasses:'#35e0ff',headset:true,glove:'#d9a07a',brow:'#241512'};
const VERA={skin:'#fbdcc4',body:'#e4405f',accent:'#7d1028',hat:'hair',hair:'#4b2a20',ponytail:true,glove:'#1b1b24'};
const THIEF={skin:SK,mask:'#0b0d16',body:'#10131f',accent:'#1d2540',hat:'beanie',hatc:'#0b0d16',hata:'#1b2036',glove:'#0b0d16'};
// blink helper
const blinkAt=(t,seed)=>{const p=(t+seed)%3.4;return p<.12?Math.sin(p/.12*Math.PI):0};
