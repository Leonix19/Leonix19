// ===== OVERLAYS + MAIN =====
const svgRoot=document.getElementById('v');
rg('vig',[[0,'#000',0],[.62,'#000',0],[1,'#000',.62]],.5,.5,.78);lg('hudg',0,0,0,1,[[0,'#000',.62],[1,'#000',0]]);
const vigR=E('rect',{width:W,height:H,fill:'url(#vig)'},svgRoot);
E('rect',{width:W,height:250,fill:'url(#hudg)'},svgRoot);
// HUD
const hud=E('g',null,svgRoot);
E('rect',{x:28,y:40,width:112,height:34,rx:4,fill:'#ff2d55'},hud);txt(hud,'PART '+STORY.part,84,64,19,'#fff',{'letter-spacing':3});
txt(hud,STORY.title.toUpperCase(),156,64,15,'#c7ccf0',{'text-anchor':'start','letter-spacing':5,'font-weight':700,opacity:.8});
const lab=(s,y)=>txt(hud,s,28,y,15,'#c7ccf0',{'text-anchor':'start','letter-spacing':5,'font-weight':700});
lab('DANGER',112);
const segs=[];for(let i=0;i<8;i++)segs.push(E('rect',{x:132+i*27,y:96,width:23,height:19,fill:'none',stroke:'#e6e9ff','stroke-width':2,'stroke-opacity':.7},hud));
STORY.hud.build(hud,lab);
const DG=STORY.danger;
// captions
const KW=STORY.keywords;
const KC={gold:'#ffd24a',red:'#ff4d6d',cyan:'#5fe3ff',green:'#4dffb0'};
function kcol(w){const x=w.toLowerCase().replace(/[^a-z0-9']/g,'');for(const k in KW)if(KW[k].includes(x))return KC[k];return '#fff'}
const capG=E('g',null,svgRoot);const chunks=[];
TL.lines.forEach(l=>{let cur=[];const flush=()=>{if(!cur.length)return;chunks.push({words:cur,line:l});cur=[]};
 l.words.forEach((w,i)=>{cur.push(w);const last=/[.?!,:]$/.test(w.w);const chars=cur.map(x=>x.w).join(' ').length;if(last||cur.length>=3||(chars>16&&cur.length>=2))flush()});flush()});
chunks.forEach((c,i)=>{const nx=chunks[i+1];const ls=c.line;c.s=c.words[0].s-.04;const lend=ls.start+ls.dur+.3;c.e=nx?Math.min(lend,nx.words[0].s-.05):lend;
 const g=E('g',{display:'none'},capG);const t=E('text',{x:0,y:0,'text-anchor':'middle','font-family':'Inter','font-weight':900,'font-size':82,'stroke':'#05060f','stroke-width':18,'stroke-linejoin':'round','paint-order':'stroke',fill:'#fff','letter-spacing':1},g);
 c.words.forEach((w,k)=>{const ts=E('tspan',{fill:kcol(w.w)},t);ts.textContent=w.w.toUpperCase()+(k<c.words.length-1?' ':'')});
 c.g=g;c.t=t;const len=t.getComputedTextLength();c.fs=len>640?82*640/len:82});
// flash/shake events
const EVS=STORY.events();
SC_ORDER=TL.scenes.map(s=>s.name);
const endT=txt(svgRoot,STORY.endText,360,940,64,'#ffd24a',{'letter-spacing':2,stroke:'#05060f','stroke-width':16,'paint-order':'stroke','stroke-linejoin':'round',opacity:0});
const flashR=E('rect',{width:W,height:H,fill:'#fff',opacity:0},svgRoot);const fade=E('rect',{width:W,height:H,fill:'#000',opacity:0},svgRoot);
const camG=document.getElementById('cam');
function setT(t){
 let sc=TL.scenes.find(s=>t>=s.start&&t<s.end)||TL.scenes[TL.scenes.length-1];
 SC_ORDER.forEach(n=>S[n].g.setAttribute('display',n===sc.name?'inline':'none'));
 const lt=t-sc.start,d=sc.end-sc.start;S[sc.name].upd(lt,d,t,S[sc.name]);
 const inK=eo3(lt/.16);rootG.setAttribute('opacity',sc.name==='s1'?1:inK);
 // shake & flash
 let sx=0,sy=0,fl=0;EVS.forEach(e=>{if(t>=e[0]){const dt=t-e[0];const a=e[1]*Math.exp(-dt*7);sx+=Math.sin(dt*70)*a;sy+=Math.cos(dt*83)*a;fl=Math.max(fl,e[2]*Math.exp(-dt*9))}});
 TL.scenes.forEach(s=>{if(s.name!=='s1'&&t>=s.start){fl=Math.max(fl,.28*Math.exp(-(t-s.start)*12))}});
 camG.setAttribute('transform',`translate(${sx.toFixed(2)} ${sy.toFixed(2)})`);flashR.setAttribute('opacity',fl.toFixed(3));
 // HUD
 const lvl=DG[sc.name];const since=t-sc.start;segs.forEach((s,i)=>{const on=i<lvl;const flashNew=on&&i===lvl-1&&since<.6&&sc.name!=='s1';const blinkAll=lvl===8&&on&&Math.sin(t*9)>.2;s.setAttribute('fill',on?'#ff2d55':'none');s.setAttribute('opacity',flashNew?(Math.sin(since*40)>0?1:.4):(lvl===8&&on?(Math.sin(t*9)>0?1:.55):1))});
 STORY.hud.update(t,sc);
 // captions
 chunks.forEach(c=>{const on=t>=c.s&&t<c.e;c.g.setAttribute('display',on?'inline':'none');if(on){const k=t-c.s;const sc2=k<.16?.6+.4*eob(k/.16):1;c.g.setAttribute('transform',`translate(360 940) scale(${sc2})`);c.t.setAttribute('font-size',c.fs)}});
 const te=STORY.endAt();endT.setAttribute('opacity',t>te?1:0);if(t>te){const k=eob((t-te)/.3);endT.setAttribute('transform',`translate(360 940) scale(${.7+.3*k}) translate(-360 -940)`)}
 // fades
 const fo=clamp((t-(TL.end-.5))/.5);const fi=1-clamp(t/.25);fade.setAttribute('opacity',Math.max(fo,fi));
}
window.setT=setT;window.ready=true;
