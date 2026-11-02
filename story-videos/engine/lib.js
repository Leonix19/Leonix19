// ===== SCENES 1-6 =====
const rootG=E('g',{id:'sceneRoot'},document.getElementById('cam'));
const S={};
function scene(name,build,upd){const g=E('g',{id:name,display:'none'},rootG);const o={g,upd};S[name]=o;build(g,o);return o}
const mono="'DejaVu Sans Mono',monospace";
const txt=(p,s,x,y,size,fill,a={})=>{const t=E('text',Object.assign({x,y,'font-size':size,fill,'font-family':'Inter','font-weight':900,'text-anchor':'middle'},a),p);t.textContent=s;return t};
function gemBuild(p,glow=true){
 const g=E('g',null,p);
 const F=[[[-175,-30],[-90,-120],[-88,-30],'#5fd0ff'],[[-90,-120],[-30,-120],[-88,-30],'#a6ecff'],[[-30,-120],[0,-30],[-88,-30],'#2c8ef0'],[[-30,-120],[30,-120],[0,-30],'#e6fbff'],[[30,-120],[88,-30],[0,-30],'#2a86ea'],[[30,-120],[90,-120],[88,-30],'#8fe4ff'],[[90,-120],[175,-30],[88,-30],'#4cb8ff'],
 [[-175,-30],[-88,-30],[0,190],'#1b63d6'],[[-88,-30],[0,-30],[0,190],'#3b9bff'],[[0,-30],[88,-30],[0,190],'#1553c4'],[[88,-30],[175,-30],[0,190],'#0d3d9e'],[[-90,-120],[90,-120],[62,-142],[-62,-142],'#d9f7ff']];
 const id='gc'+Math.floor(Math.random()*1e6);const cp=E('clipPath',{id},defs);
 F.forEach(f=>{const pts=f.slice(0,-1).map(q=>q.join(',')).join(' ');E('polygon',{points:pts,fill:f[f.length-1],stroke:'#eafcff','stroke-width':2.2,'stroke-opacity':.7,'stroke-linejoin':'round'},g);E('polygon',{points:pts},cp)});
 const sh=E('g',{'clip-path':`url(#${id})`},g);const band=E('rect',{x:-40,y:-200,width:60,height:460,fill:'#fff',opacity:.55,transform:'skewX(-20)'},sh);
 const sp=[[-90,-120],[90,-120],[0,-142],[170,-30],[-170,-30],[0,190],[-40,40]].map((q,i)=>{const s=E('g',{transform:`translate(${q[0]} ${q[1]})`},g);const st=star4(s,34);return {s,q,i,st}});
 return {g,band,upd:(t,k=1)=>{const x=((t*160)%700)-350;band.setAttribute('x',x);sp.forEach(o=>{const a=Math.max(0,Math.sin(t*3.2+o.i*1.7));o.st.setAttribute('transform',`scale(${a*k}) rotate(${t*40})`)})}};
}
function chip(p,w,color){const g=E('g',null,p);E('rect',{width:w,height:34,rx:4,fill:color},g);return g}

