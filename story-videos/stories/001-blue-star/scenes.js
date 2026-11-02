// ---- S1: museum exterior ----
scene('s1',(g,o)=>{
 lg('s1sky',0,0,0,1,[[0,'#070a22'],[.55,'#231552'],[1,'#4a2a6e']]);
 const cam=E('g',null,g);o.cam=cam;
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s1sky)'},cam);
 for(let i=0;i<60;i++)E('circle',{cx:R(i)*W,cy:R(i+3)*420,r:.6+R(i+9)*1.6,fill:'#fff',opacity:.3+R(i+4)*.6},cam);
 E('circle',{cx:560,cy:210,r:170,fill:'#8fb0ff',opacity:.2,filter:'url(#b24)'},cam);
 E('circle',{cx:560,cy:210,r:62,fill:'#e8efff'},cam);E('circle',{cx:540,cy:196,r:13,fill:'#c9d6f5'},cam);E('circle',{cx:582,cy:232,r:9,fill:'#c9d6f5'},cam);E('circle',{cx:575,cy:182,r:6,fill:'#c9d6f5'},cam);
 o.clouds=[0,1,2].map(i=>E('ellipse',{cx:150+i*260,cy:260+i*40,rx:190,ry:26,fill:'#2a1b57',opacity:.55,filter:'url(#b10)'},cam));
 // skyline
 let x=-20,i=0;while(x<W+40){const w=44+R(i)*50,h=90+R(i+1)*190;E('rect',{x,y:700-h,width:w,height:h+10,fill:'#0c1030'},cam);
  for(let k=0;k<6;k++)if(R(i*7+k)>.55)E('rect',{x:x+6+R(i+k)*(w-18),y:700-h+12+k*26,width:7,height:9,fill:'#ffd27a',opacity:.55},cam);x+=w+4;i++}
 // searchlights
 lg('beam',0,1,0,0,[[0,'#cfe2ff',.38],[1,'#cfe2ff',0]]);
 o.sl=[[70,740],[660,740]].map(p=>{const gg=E('g',{transform:`translate(${p[0]} ${p[1]})`},cam);E('polygon',{points:'0,0 -70,-1000 70,-1000',fill:'url(#beam)'},gg);return gg});
 // museum
 lg('mwarm',0,0,0,1,[[0,'#1c2358'],[1,'#ffb347',.55]]);
 lg('col',0,0,1,0,[[0,'#cdd2fa'],[.5,'#8c95d8'],[1,'#39407f']]);
 lg('door',0,0,0,1,[[0,'#fff1c4'],[1,'#ffb347']]);
 E('rect',{x:60,y:700,width:600,height:20,fill:'#2f3878'},cam);E('rect',{x:84,y:720,width:552,height:18,fill:'#272f6a'},cam);E('rect',{x:108,y:738,width:504,height:18,fill:'#1f2658'},cam);
 E('polygon',{points:'320,700 400,700 520,756 200,756',fill:'#ffcf7a',opacity:.28,filter:'url(#b4)'},cam);
 E('rect',{x:130,y:500,width:460,height:200,fill:'url(#mwarm)'},cam);
 E('rect',{x:108,y:482,width:504,height:20,fill:'#2f3a8a'},cam);
 E('polygon',{points:'108,482 360,366 612,482',fill:'#2a3380'},cam);E('polygon',{points:'152,476 360,380 568,476',fill:'#1b2160'},cam);
 E('circle',{cx:360,cy:440,r:17,fill:'#ffcf4a',filter:'url(#glowS)'},cam);
 txt(cam,'CITY  MUSEUM',360,526,19,'#ffcf4a',{'letter-spacing':7,'font-weight':800});
 [150,222,294,426,498,570].forEach(cx=>{E('rect',{x:cx-15,y:540,width:30,height:156,fill:'url(#col)'},cam);E('rect',{x:cx-21,y:534,width:42,height:10,fill:'#9aa2e6'},cam);E('rect',{x:cx-21,y:690,width:42,height:10,fill:'#9aa2e6'},cam)});
 E('rect',{x:322,y:590,width:76,height:110,fill:'url(#door)'},cam);E('rect',{x:358,y:590,width:4,height:110,fill:'#b8782a'},cam);
 E('circle',{cx:360,cy:640,r:90,fill:'#ffcf7a',opacity:.25,filter:'url(#b24)'},cam);
 [300,420].forEach(lx=>E('circle',{cx:lx,cy:560,r:7,fill:'#ffe9a8',filter:'url(#glow)'},cam));
 lg('gr1',0,0,0,1,[[0,'#0b0d24'],[1,'#04050d']]);
 E('rect',{x:-100,y:756,width:W+200,height:600,fill:'url(#gr1)'},cam);
 E('ellipse',{cx:360,cy:800,rx:250,ry:22,fill:'#ffcf7a',opacity:.18,filter:'url(#b10)'},cam);
 for(let k=0;k<7;k++)E('line',{x1:-100,y1:770+k*k*7+k*6,x2:820,y2:770+k*k*7+k*6,stroke:'#3b4aa0',opacity:.12,'stroke-width':1.5},cam);
 o.rain=rain(cam,70,11);
 // hero + cart
 const hg=E('g',{transform:'translate(360 826) scale(.92)'},cam);o.hg=hg;
 E('line',{x1:128,y1:210,x2:170,y2:-40,stroke:'#9a7650','stroke-width':9,'stroke-linecap':'round'},hg);
 E('path',{d:'M158 -40 L190 -40 L200 -8 L148 -8Z',fill:'#d9d9e6'},hg);
 o.hero=Char(hg,HERO);
 E('path',{d:'M-135 190 L135 190 L120 300 L-120 300Z',fill:'#ffcf4a'},hg);
 for(let k=-4;k<4;k++)E('path',{d:`M${k*32-10} 190 l16 0 l-16 110 l-16 0Z`,fill:'#22252f',opacity:.85},hg);
 E('rect',{x:-150,y:178,width:300,height:16,rx:8,fill:'#5a6080'},hg);
 o.hero.hand(-92,184);o.hero.hand(92,184);
 // title
 const tt=E('g',{transform:'translate(360 292)'},cam);o.title=tt;
 txt(tt,'THE BLUE STAR',0,0,66,'#fff',{'letter-spacing':4,stroke:'#0a0f2c','stroke-width':14,'paint-order':'stroke','stroke-linejoin':'round'});
 txt(tt,'A  HEIST',0,52,26,'#35e0ff',{'letter-spacing':18,'font-weight':800});
 // lightning flash
 o.fl=E('rect',{x:-100,y:-100,width:W+200,height:700,fill:'#bcd0ff',opacity:0},cam);
},(lt,d,tg,o)=>{
 const z=1+.12*eio(lt/d);o.cam.setAttribute('transform',`translate(360 600) scale(${z}) translate(-360 -600)`);
 o.sl[0].setAttribute('transform',`translate(70 740) rotate(${-26+Math.sin(lt*1.0)*24})`);o.sl[1].setAttribute('transform',`translate(660 740) rotate(${24+Math.sin(lt*.9+2)*24})`);
 o.clouds.forEach((c,i)=>c.setAttribute('cx',((150+i*260+lt*14)%900)-90));
 o.rain(lt);
 const sm=tg>=wt('l01','robbing')?'smirk':'calm';
 o.hero.set(sm,[0,-3],blinkAt(lt,.3));
 o.hg.setAttribute('transform',`translate(360 ${826+Math.sin(lt*2)*2.5}) scale(.92)`);
 const tp=eob(lt/.5),tf=1-eio((lt-3.4)/.5);o.title.setAttribute('transform',`translate(360 292) scale(${tp*(.95+.05*lt/3)})`);o.title.setAttribute('opacity',clamp(tf));
 const fl=Math.max(0,Math.sin(lt*17))*(Math.sin(lt*1.3)>.96?1:0);o.fl.setAttribute('opacity',(fl*.35).toFixed(3));
});

// ---- S2: the diamond ----
scene('s2',(g,o)=>{
 rg('s2bg',[[0,'#1b57c8'],[.45,'#0b2060'],[1,'#04061a']],.5,.4,.8);
 const cam=E('g',null,g);o.cam=cam;
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s2bg)'},cam);
 o.rays=E('g',{transform:'translate(360 520)'},cam);
 for(let i=0;i<14;i++){const a=i/14*6.283,b=a+.17;E('polygon',{points:`0,0 ${Math.cos(a)*900},${Math.sin(a)*900} ${Math.cos(b)*900},${Math.sin(b)*900}`,fill:'#bfe8ff',opacity:.09},o.rays)}
 o.glow=E('circle',{cx:360,cy:520,r:250,fill:'#35c8ff',opacity:.4,filter:'url(#b50)'},cam);
 o.dust=dust(cam,40,5,0,0,W,H);
 // pedestal
 lg('ped',0,0,1,0,[[0,'#141a45'],[.5,'#27306e'],[1,'#10163a']]);
 E('rect',{x:190,y:790,width:340,height:260,fill:'url(#ped)'},cam);
 E('ellipse',{cx:360,cy:790,rx:190,ry:36,fill:'#3a4590'},cam);E('ellipse',{cx:360,cy:784,rx:160,ry:28,fill:'#0d1230'},cam);
 E('ellipse',{cx:360,cy:790,rx:190,ry:36,fill:'none',stroke:'#ffcf4a','stroke-width':4,opacity:.9},cam);
 o.beam=E('polygon',{points:'300,785 420,785 560,-50 160,-50',fill:'#9fe0ff',opacity:.1},cam);
 o.gemg=E('g',{transform:'translate(360 520)'},cam);o.gemf=E('g',null,o.gemg);o.gem=gemBuild(o.gemf);
 o.val=txt(cam,'$0',360,338,88,'#ffcf4a',{'letter-spacing':1,stroke:'#07123a','stroke-width':14,'paint-order':'stroke','stroke-linejoin':'round',filter:'url(#glowS)'});
 o.vl=txt(cam,'ESTIMATED  VALUE',360,246,22,'#9fe0ff',{'letter-spacing':9,'font-weight':800});
 o.cut=E('g',{transform:'translate(360 868)'},cam);
 E('rect',{x:-150,y:-34,width:300,height:68,rx:12,fill:'#0a0f2c',stroke:'#ffcf4a','stroke-width':3},o.cut);
 txt(o.cut,'YOUR CUT',0,-6,18,'#ffcf4a',{'letter-spacing':8,'font-weight':800});o.cutv=txt(o.cut,'$4,000,000',0,26,32,'#fff');
},(lt,d,tg,o)=>{
 const z=1.18-.18*eo3(lt/1.2)+.05*lt/d;o.cam.setAttribute('transform',`translate(360 520) scale(${z}) translate(-360 -520)`);
 o.rays.setAttribute('transform',`translate(360 520) rotate(${lt*7})`);
 o.glow.setAttribute('r',250+16*Math.sin(lt*3));
 const fy=Math.sin(lt*1.7)*12;o.gemg.setAttribute('transform',`translate(360 ${520+fy}) rotate(${Math.sin(lt*1.1)*4})`);
 const sx=.35+eob((lt-.1)/.8)*.65;o.gemf.setAttribute('transform',`scale(${sx} ${sx})`);o.gem.upd(tg*1.0,1.1);
 o.dust(lt);
 const t0=wt('l02','forty'),k=clamp((tg-t0)/1.05);o.val.setAttribute('opacity',tg>=t0-.05?1:0);o.val.textContent=fmt(40000000*eio(k));
 o.val.setAttribute('transform',`translate(0 0)`);const pop=tg>t0?1+.12*Math.exp(-(tg-t0)*9)*Math.cos((tg-t0)*30):1;o.val.setAttribute('transform',`translate(360 330) scale(${pop}) translate(-360 -330)`);
 o.vl.setAttribute('opacity',tg>=t0-.4?clamp((tg-t0+.4)/.3):0);
 const t1=wt('l02','four');o.cut.setAttribute('transform',`translate(360 ${868+ (1-eob((tg-t1)/.4))*60}) scale(${clamp((tg-t1)/.15+.01)})`);
});

// ---- S3: the crew ----
scene('s3',(g,o)=>{
 lg('s3bg',0,0,0,1,[[0,'#0a0d1f'],[1,'#0c1124']]);
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s3bg)'},g);
 const cp=E('clipPath',{id:'wsclip'},defs);E('rect',{x:36,y:150,width:648,height:400,rx:40},cp);
 const ws=E('g',{'clip-path':'url(#wsclip)'},g);
 lg('s3sky',0,0,0,1,[[0,'#120a33'],[1,'#3a1f63']]);
 E('rect',{x:30,y:140,width:660,height:420,fill:'url(#s3sky)'},ws);
 o.bk=bokeh(ws,22,31,['#ffb347','#ff5577','#7fd6ff','#ffe28a'],40,330,680,540,10,40);
 // far museum
 E('polygon',{points:'250,420 360,360 470,420',fill:'#2a3380'},ws);E('rect',{x:250,y:420,width:220,height:86,fill:'#1c2358'},ws);E('rect',{x:250,y:445,width:220,height:61,fill:'#ffb347',opacity:.5},ws);
 [262,300,338,376,414,452].forEach(x=>E('rect',{x:x-5,y:425,width:10,height:81,fill:'#8c95d8',opacity:.8},ws));
 E('rect',{x:30,y:506,width:660,height:60,fill:'#0b0f22'},ws);E('rect',{x:30,y:500,width:660,height:8,fill:'#1c2358',opacity:.6},ws);
 o.rain=rain(ws,50,41);
 o.wiper=E('line',{x1:360,y1:560,x2:360,y2:300,stroke:'#05060c','stroke-width':9,'stroke-linecap':'round',opacity:.9},ws);
 E('rect',{x:36,y:150,width:648,height:400,rx:40,fill:'none',stroke:'#2b3560','stroke-width':10},g);
 // clock
 o.clock=E('g',{transform:'translate(360 340)',opacity:0},g);
 E('rect',{x:-170,y:-76,width:340,height:150,rx:22,fill:'#070a1a',opacity:.8,stroke:'#ff2d55','stroke-width':3},o.clock);
 txt(o.clock,'06:00',0,36,104,'#ff2d55',{'font-family':mono,'letter-spacing':2,filter:'url(#glowS)'});txt(o.clock,'MINUTES  TO  GO',0,-48,17,'#ffa3b4',{'letter-spacing':6,'font-weight':800});
 // dash
 E('rect',{x:-100,y:846,width:W+200,height:500,fill:'#080b1b'},g);E('rect',{x:-100,y:846,width:W+200,height:5,fill:'#2b3560'},g);
 // Dex
 o.dg=E('g',{transform:'translate(185 705) scale(.95)'},g);o.dex=Char(o.dg,DEX);
 o.dexGlow=E('ellipse',{cx:185,cy:830,rx:100,ry:40,fill:'#35e0ff',opacity:.3,filter:'url(#b10)'},g);
 E('rect',{x:98,y:820,width:174,height:92,rx:12,fill:'#151c3a',stroke:'#35e0ff','stroke-width':3},g);
 txt(g,'◉',185,882,38,'#35e0ff',{opacity:.55,filter:'url(#glowS)'});
 // Vera
 o.vg=E('g',{transform:'translate(535 705) scale(.95)'},g);o.vera=Char(o.vg,VERA);
 E('circle',{cx:535,cy:960,r:112,fill:'none',stroke:'#1d2552','stroke-width':22},g);E('circle',{cx:535,cy:960,r:112,fill:'none',stroke:'#35407a','stroke-width':4,opacity:.7},g);
 E('circle',{cx:535,cy:960,r:30,fill:'#1d2552'},g);
 o.vh=[E('g',null,g),E('g',null,g)];[[-100,-22],[100,-22]].forEach((p,i)=>{E('circle',{cx:535+p[0],cy:950+p[1]*.0-6,r:17,fill:'#1b1b24'},o.vh[i])});
 // tags
 o.t1=E('g',{transform:'translate(185 600)'},g);E('rect',{x:-96,y:-20,width:192,height:38,rx:8,fill:'#0a2a20',stroke:'#2fe38e','stroke-width':2},o.t1);txt(o.t1,'DEX · CAMS LOOPED',0,6,14,'#2fe38e',{'letter-spacing':1,'font-weight':800});
 o.t2=E('g',{transform:'translate(535 600)'},g);E('rect',{x:-96,y:-20,width:192,height:38,rx:8,fill:'#2a0a14',stroke:'#ff5577','stroke-width':2},o.t2);txt(o.t2,'VERA · ENGINE ON',0,6,14,'#ff7d96',{'letter-spacing':1,'font-weight':800});
 o.ring1=E('circle',{cx:185,cy:705,r:88,fill:'none',stroke:'#2fe38e','stroke-width':4,opacity:0},g);o.ring2=E('circle',{cx:535,cy:705,r:88,fill:'none',stroke:'#ff5577','stroke-width':4,opacity:0},g);
},(lt,d,tg,o)=>{
 o.bk(lt);o.rain(lt);o.wiper.setAttribute('transform',`rotate(${-60+ (Math.abs(((lt*0.9)%2)-1))*120} 360 560)`);
 const sd=speaking(DEX.voice||'am_puck',tg),sv=speaking('af_nicole',tg);
 const td=wt('l03','dex'),tv=wt('l03','vera'),ts=wt('l03','six');
 const pp=(t0)=>tg>t0?Math.exp(-(tg-t0)*4):0;
 o.dex.set(pp(td)>.1?'smirk':'calm',[3,2],blinkAt(lt,.2));o.vera.set(sv?'focus':'calm',[-3,0],blinkAt(lt,1.4),sv?(Math.floor(tg*9)%2):0);
 o.dg.setAttribute('transform',`translate(185 ${705+Math.sin(lt*2.2)*2}) scale(.95)`);o.vg.setAttribute('transform',`translate(535 ${705+Math.sin(lt*2+1)*2}) scale(.95)`);
 o.dexGlow.setAttribute('opacity',.3+.1*Math.sin(lt*7));
 const pop=(el,x,t0)=>{const k=tg>t0?1+.22*Math.exp(-(tg-t0)*8)*Math.cos((tg-t0)*26):.001;el.setAttribute('transform',`translate(${x} 600) scale(${tg>t0-.01?k:.001})`)};
 pop(o.t1,185,td);pop(o.t2,535,tv);
 o.ring1.setAttribute('opacity',pp(td)*.9);o.ring1.setAttribute('r',88+(1-pp(td))*40);o.ring2.setAttribute('opacity',pp(tv)*.9);o.ring2.setAttribute('r',88+(1-pp(tv))*40);
 const cz=tg>ts?eob((tg-ts)/.35):0,fade=1-clamp((tg-(ts+2.4))/.4);o.clock.setAttribute('opacity',cz*fade);o.clock.setAttribute('transform',`translate(360 340) scale(${.6+.4*cz+.03*Math.sin(lt*10)})`);
});

// ---- S4: keycard ----
scene('s4',(g,o)=>{
 lg('s4bg',0,0,0,1,[[0,'#0c1128'],[1,'#04060e']]);
 const cam=E('g',null,g);o.cam=cam;
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s4bg)'},cam);
 for(let i=0;i<8;i++)E('line',{x1:i*100-20,y1:0,x2:i*100-20,y2:H,stroke:'#1a2248','stroke-width':3},cam);
 // door
 E('rect',{x:70,y:210,width:400,height:640,rx:6,fill:'#0a0d1c',stroke:'#3a4590','stroke-width':8},cam);
 lg('hall',0,0,1,0,[[0,'#fff6d6'],[1,'#7fe3ff']]);
 o.hall=E('rect',{x:76,y:216,width:388,height:628,fill:'url(#hall)',opacity:0},cam);
 o.beam=E('polygon',{points:'270,216 270,844 0,1100 0,0',fill:'#bfeeff',opacity:0,filter:'url(#b10)'},cam);
 lg('dp',0,0,0,1,[[0,'#3a4268'],[1,'#222a4a']]);
 o.dL=E('rect',{x:76,y:216,width:194,height:628,fill:'url(#dp)',stroke:'#10142a','stroke-width':3},cam);o.dR=E('rect',{x:270,y:216,width:194,height:628,fill:'url(#dp)',stroke:'#10142a','stroke-width':3},cam);
 for(let i=0;i<5;i++){E('rect',{x:96,y:240+i*120,width:154,height:90,rx:6,fill:'none',stroke:'#4a5688','stroke-width':2,opacity:.5},o.dL);E('rect',{x:290,y:240+i*120,width:154,height:90,rx:6,fill:'none',stroke:'#4a5688','stroke-width':2,opacity:.5},o.dR)}
 // reader
 const rg2=E('g',{transform:'translate(585 520)'},cam);o.rd=rg2;
 E('rect',{x:-90,y:-170,width:180,height:320,rx:26,fill:'#1a2146',stroke:'#3a4590','stroke-width':4},rg2);E('rect',{x:-70,y:-148,width:140,height:70,rx:14,fill:'#0a0d1f'},rg2);
 o.led=E('circle',{cx:0,cy:-113,r:20,fill:'#ff2d55',filter:'url(#glow)'},rg2);o.ledt=txt(rg2,'LOCKED',0,-50,15,'#ff7d96',{'letter-spacing':4,'font-weight':800});
 E('rect',{x:-62,y:0,width:124,height:20,rx:8,fill:'#05070f',stroke:'#4a5688','stroke-width':2},rg2);
 for(let r=0;r<3;r++)for(let c=0;c<3;c++)E('circle',{cx:-28+c*28,cy:56+r*26,r:6,fill:'#2b3560'},rg2);
 o.ok=txt(cam,'ACCESS  GRANTED',270,262,34,'#2fe38e',{'letter-spacing':5,filter:'url(#glowS)',opacity:0});
 // card
 o.card=E('g',null,cam);
 E('rect',{x:-82,y:-52,width:164,height:104,rx:12,fill:'#f4f6ff'},o.card);E('rect',{x:-82,y:-24,width:164,height:22,fill:'#10142a'},o.card);E('rect',{x:-60,y:12,width:36,height:26,rx:5,fill:'#ffcf4a'},o.card);txt(o.card,'STAFF',34,36,20,'#10142a',{'letter-spacing':3});
 o.streak=E('rect',{x:-260,y:-52,width:180,height:104,fill:'#fff',opacity:0,filter:'url(#b10)'},o.card);
 o.hand=E('g',null,o.card);E('circle',{cx:96,cy:0,r:30,fill:SK},o.hand);E('circle',{cx:84,cy:-12,r:11,fill:'#fff',opacity:.25},o.hand);
 o.sp=[0,1,2,3,4,5].map(i=>E('circle',{r:3,fill:'#2fe38e',opacity:0},cam));
},(lt,d,tg,o)=>{
 const tb=wt('l04','beep'),tg2=wt('l04','green'),to=wt('l04','opens'),te=wt('l04','easy');
 const z=1.14-.14*eo3(lt/1.4);o.cam.setAttribute('transform',`translate(520 520) scale(${z}) translate(-520 -520)`);
 const a1=eio(clamp((tg-(tb-1.0))/.6)),b1=eio(clamp((tg-(tb-.35))/.45));
 const cxp=860-220*a1-260*b1;o.card.setAttribute('transform',`translate(${cxp} 531) rotate(${-6*(1-a1)})`);
 o.streak.setAttribute('opacity',(tg>tb-.35&&tg<tb+.1?.6:0));
 const ok=tg>=tb;o.led.setAttribute('fill',ok?'#2fe38e':'#ff2d55');o.ledt.textContent=ok?'OPEN':'LOCKED';o.ledt.setAttribute('fill',ok?'#7dffbd':'#ff7d96');
 o.led.setAttribute('r',20+(ok?3*Math.sin(lt*10):0));
 o.ok.setAttribute('opacity',ok?clamp((tg-tb)/.15)*(1-clamp((tg-te-.6)/.3)):0);o.ok.setAttribute('transform',`translate(0 ${ok?0:12})`);
 const dk=eio((tg-to+.25)/.9);o.dL.setAttribute('transform',`translate(${-190*dk} 0)`);o.dR.setAttribute('transform',`translate(${190*dk} 0)`);o.hall.setAttribute('opacity',dk);
 o.beam.setAttribute('opacity',.35*dk);
 const warn=tg>te?(Math.sin(lt*14)>0?.25:0):0;
 o.sp.forEach((s,i)=>{const a=clamp((tg-tb)/.6);s.setAttribute('cx',585+Math.cos(i*1.1+1)*(30+a*80));s.setAttribute('cy',410+Math.sin(i*1.9)*(20+a*60));s.setAttribute('opacity',(1-a)*(ok?1:0))});
});

// ---- S5: earpiece ----
scene('s5',(g,o)=>{
 lg('s5bg',0,0,0,1,[[0,'#07091a'],[1,'#10163a']]);
 const cam=E('g',null,g);o.cam=cam;
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s5bg)'},cam);
 o.bk=bokeh(cam,18,77,['#35e0ff','#7a5cff','#ff5577'],0,150,720,900,16,50);
 o.hg=E('g',{transform:'translate(300 470) scale(2.0)'},cam);o.hero=Char(o.hg,HERO);
 // earpiece
 o.ear=E('g',{transform:'translate(180 498)'},cam);
 o.rip=[0,1,2].map(i=>E('circle',{r:10,fill:'none',stroke:'#35e0ff','stroke-width':3,opacity:0},o.ear));
 E('circle',{r:13,fill:'#35e0ff',filter:'url(#glow)'},o.ear);E('circle',{r:6,fill:'#e8fdff'},o.ear);
 // glitch strips
 o.gl=[0,1,2,3,4,5].map(i=>E('rect',{x:0,width:W,height:6,fill:'#7fe3ff',opacity:0},cam));
 // comm card
 o.cc=E('g',{transform:'translate(50 700)'},cam);
 E('rect',{width:620,height:176,rx:24,fill:'#0b1230',stroke:'#35e0ff','stroke-width':3,opacity:.96},o.cc);
 E('circle',{cx:84,cy:88,r:44,fill:'#26b673'},o.cc);txt(o.cc,'D',84,106,52,'#06251a');
 txt(o.cc,'DEX',160,66,34,'#fff',{'text-anchor':'start','letter-spacing':2});
 E('circle',{cx:166,cy:100,r:6,fill:'#2fe38e'},o.cc);txt(o.cc,'LIVE · ENCRYPTED',182,106,17,'#7fe3ff',{'text-anchor':'start','letter-spacing':3,'font-weight':700});
 o.bars=[];for(let i=0;i<24;i++)o.bars.push(E('rect',{x:160+i*19,y:130,width:10,height:6,rx:5,fill:'#35e0ff'},o.cc));
 o.sig=txt(cam,'SIGNAL  UNSTABLE',360,660,22,'#ff7d96',{'letter-spacing':8,'font-weight':800,opacity:0});
},(lt,d,tg,o)=>{
 o.bk(lt);
 const t5=LN['l05'].start,t6=LN['l06'].start;
 const sh=tg>=t5&&tg<t5+.9?(Math.random()*0+Math.sin(lt*90)*3):0;
 o.hg.setAttribute('transform',`translate(${300+sh} ${470+Math.sin(lt*1.6)*5}) scale(${2.0+.12*lt/d})`);
 o.hero.set(tg>t6?'shock':'worried',[-4,1],blinkAt(lt,.6));
 o.ear.setAttribute('transform',`translate(${300+sh-120-.12*0} ${498+Math.sin(lt*1.6)*5})`);
 o.rip.forEach((r,i)=>{const k=((lt*1.1+i/3)%1);r.setAttribute('r',12+k*80);r.setAttribute('opacity',(1-k)*.8)});
 const cc=eob((lt-.35)/.5);o.cc.setAttribute('transform',`translate(50 ${700+(1-cc)*220}) `);o.cc.setAttribute('opacity',clamp(cc));
 const active=tg>=t5&&tg<LN['l06'].start+LN['l06'].dur;
 o.bars.forEach((b,i)=>{let h=6;if(active){const sp=tg>=t6;h=sp?10+Math.abs(Math.sin(tg*13+i*.9)*Math.sin(tg*5+i*.3))*52:6+R(Math.floor(tg*30)+i)*30}b.setAttribute('height',h);b.setAttribute('y',156-h/2-26)});
 o.gl.forEach((r,i)=>{const on=(tg>=t5&&tg<t5+1.5)&&R(Math.floor(tg*18)+i*5)>.55;r.setAttribute('opacity',on?.28:0);r.setAttribute('y',R(Math.floor(tg*18)+i)*900+120)});
 o.sig.setAttribute('opacity',(tg>=t5&&tg<t5+1.5)?(Math.sin(lt*30)>0?1:.2):0);
});

// ---- S6: laser corridor ----
scene('s6',(g,o)=>{
 const cam=E('g',null,g);o.cam=cam;
 lg('s6bg',0,0,0,1,[[0,'#06050f'],[1,'#12081c']]);
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s6bg)'},cam);
 rg('s6glow',[[0,'#35c8ff',.9],[.4,'#2a6bd6',.35],[1,'#2a6bd6',0]]);
 o.glow=E('circle',{cx:360,cy:430,r:150,fill:'url(#s6glow)'},cam);
 o.rings=[];for(let j=0;j<13;j++){const gg=E('g',null,cam);const r=E('rect',{fill:'none',stroke:'#4b6bff'},gg);const fl=E('rect',{fill:'#0e1233',opacity:.0},gg);const lw=[],lc=[];for(let k=0;k<2;k++){lw.push(E('line',{stroke:'#ff2d55','stroke-linecap':'round',opacity:.28},gg))}for(let k=0;k<2;k++){lc.push(E('line',{stroke:'#ffd3dc','stroke-linecap':'round'},gg))}o.rings.push({gg,r,lw,lc})}
 // diamond far
 o.dm=E('g',{transform:'translate(360 430) scale(.16)'},cam);o.gem=gemBuild(o.dm);
 E('path',{d:'M-24 40 Q-24 -10 0 -10 Q24 -10 24 40Z',fill:'#fff',opacity:.15,transform:'translate(360 450) scale(1.6)'},cam);
 o.tag=E('g',{transform:'translate(360 262)'},cam);E('rect',{x:-190,y:-26,width:380,height:50,rx:6,fill:'#2a0710',stroke:'#ff2d55','stroke-width':3},o.tag);txt(o.tag,'⚠  LASER GRID : ACTIVE',0,8,23,'#ff7d96',{'letter-spacing':3});
},(lt,d,tg,o)=>{
 const u=lt*.95;const i0=Math.floor(u),fr=u-i0;
 o.cam.setAttribute('transform',`rotate(${Math.sin(lt*.8)*1.2} 360 520)`);
 o.glow.setAttribute('r',130+14*Math.sin(lt*4)+lt*4);
 o.rings.forEach((rg0,j)=>{const id=i0+(12-j);const z=(12-j)-fr+.45;if(z<.14){rg0.gg.setAttribute('display','none');return}rg0.gg.setAttribute('display','inline');const s=.62/(.1+z*.36);
  const cx=360,top=440-360*s,bot=440+300*s,l=cx-300*s,rr=cx+300*s;
  rg0.r.setAttribute('x',l);rg0.r.setAttribute('y',top);rg0.r.setAttribute('width',rr-l);rg0.r.setAttribute('height',bot-top);rg0.r.setAttribute('stroke-width',Math.max(1,3*s));rg0.r.setAttribute('opacity',clamp(.55-z*.03,0,.5));
  const pat=Math.floor(R(id*3.17)*5);const L=[];
  if(pat===0)L.push([l,440+60*s,rr,440+60*s]);else if(pat===1)L.push([l,top+40*s,rr,bot-60*s]);else if(pat===2){L.push([l,440-70*s,rr,440-70*s]);L.push([l,440+130*s,rr,440+130*s])}else if(pat===3){L.push([l,bot-60*s,rr,top+40*s])}else{L.push([l,440-10*s,rr,440+120*s]);L.push([l,440+120*s,rr,440-10*s])}
  const vis=clamp(1.2-z*.07,0,1)*(z>.05?1:0)*(0.75+.25*Math.sin(tg*11+id));
  [0,1].forEach(k=>{const a=L[k];[rg0.lw[k],rg0.lc[k]].forEach((ln,q)=>{if(a){ln.setAttribute('x1',a[0]);ln.setAttribute('y1',a[1]);ln.setAttribute('x2',a[2]);ln.setAttribute('y2',a[3]);ln.setAttribute('stroke-width',(q?3.5:15)*Math.max(.3,s));ln.setAttribute('opacity',(q?1:.3)*vis)}else ln.setAttribute('opacity',0)})});
 });
 o.gem.upd(tg,.6);o.dm.setAttribute('transform',`translate(360 ${430+Math.sin(lt*2)*3}) scale(${.15+.012*lt})`);
 o.tag.setAttribute('opacity',Math.sin(lt*7)>-.3?1:.35);
});

// ===== SCENES 7-11 =====
// ---- S7: the crawl ----
scene('s7',(g,o)=>{
 const cam=E('g',null,g);o.cam=cam;
 lg('s7bg',0,0,0,1,[[0,'#10041a'],[1,'#2d0b2c']]);
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s7bg)'},cam);
 rg('redhaze',[[0,'#ff2d55',.35],[1,'#ff2d55',0]]);E('ellipse',{cx:360,cy:640,rx:520,ry:300,fill:'url(#redhaze)'},cam);
 o.wall=E('g',null,cam);for(let i=0;i<8;i++){E('rect',{x:i*170,y:110,width:150,height:690,fill:'#190a2c',stroke:'#2e1750','stroke-width':3},o.wall);E('rect',{x:i*170+70,y:150,width:10,height:610,fill:'#4b2a8a',opacity:.45},o.wall);E('rect',{x:i*170+20,y:190,width:110,height:150,rx:8,fill:'#0d0518',opacity:.6},o.wall)}
 lg('fl7',0,0,0,1,[[0,'#2a1040'],[1,'#07030d']]);
 E('rect',{x:-100,y:822,width:W+200,height:600,fill:'url(#fl7)'},cam);E('rect',{x:-100,y:818,width:W+200,height:6,fill:'#ff2d55',opacity:.35},cam);
 o.tiles=E('g',null,cam);for(let i=0;i<10;i++)E('line',{x1:i*130,y1:824,x2:i*130-70,y2:1100,stroke:'#4b2a8a',opacity:.35,'stroke-width':2},o.tiles);
 o.beams=[470,540,610].map((y,i)=>{const gg=E('g',null,cam);const w=E('line',{x1:-100,y1:y,x2:W+100,y2:y,stroke:'#ff2d55','stroke-width':18,opacity:.3},gg);const c=E('line',{x1:-100,y1:y,x2:W+100,y2:y,stroke:'#ffd3dc','stroke-width':4},gg);
  E('line',{x1:-100,y1:1640-y-0,x2:W+100,y2:1640-y,stroke:'#ff2d55','stroke-width':6,opacity:.12},cam);
  const dots=[0,1,2,3,4].map(k=>E('circle',{r:5,fill:'#fff'},gg));return {y,w,c,dots}});
 // hero side view
 o.hg=E('g',{transform:'translate(250 845) scale(1.25)'},cam);
 E('ellipse',{cx:-30,cy:2,rx:190,ry:12,fill:'#000',opacity:.5},o.hg);
 o.leg=[E('line',{stroke:'#124258','stroke-width':28,'stroke-linecap':'round'},o.hg),E('line',{stroke:'#164f66','stroke-width':28,'stroke-linecap':'round'},o.hg)];
 o.foot=[E('circle',{r:15,fill:'#14161f'},o.hg),E('circle',{r:15,fill:'#14161f'},o.hg)];
 o.arm0=E('line',{stroke:'#175a74','stroke-width':24,'stroke-linecap':'round'},o.hg);o.h0=E('circle',{r:15,fill:'#e7c3a3'},o.hg);
 o.tor=E('g',null,o.hg);E('rect',{x:-100,y:-80,width:160,height:62,rx:30,fill:'#1d6f8c'},o.tor);E('rect',{x:-48,y:-80,width:12,height:62,fill:'#ff8a3d'},o.tor);E('rect',{x:-20,y:-66,width:34,height:15,rx:4,fill:'#ffcf4a'},o.tor);
 o.arm1=E('line',{stroke:'#1d6f8c','stroke-width':24,'stroke-linecap':'round'},o.hg);o.h1=E('circle',{r:15,fill:SK},o.hg);
 o.hd=E('g',{transform:'translate(100 -100) scale(.74)'},o.hg);o.head=Char(o.hd,Object.assign({},HERO,{nobody:true}));
 o.blue=E('circle',{cx:690,cy:760,r:160,fill:'#35c8ff',opacity:0,filter:'url(#b24)'},cam);
 o.vg=E('rect',{x:0,y:0,width:W,height:H,fill:'url(#vigR)',opacity:0},g);
 rg('vigR',[[0,'#ff0033',0],[.55,'#ff0033',0],[1,'#ff0033',.85]],.5,.5,.75);o.vg.setAttribute('fill','url(#vigR)');
},(lt,d,tg,o)=>{
 const tf=wt('l08','freeze')-SC.s7.start,th=wt('l08','heart')-SC.s7.start;
 const v=95;const stop=lt>tf?(1-Math.exp(-(lt-tf)*7))/7*.0:0;
 const dist=v*Math.min(lt,tf)+v*.12*(lt>tf?(1-Math.exp(-(lt-tf)*9)):0);
 const ph=dist/48;
 o.wall.setAttribute('transform',`translate(${-(dist*.6%170)} 0)`);o.tiles.setAttribute('transform',`translate(${-(dist%130)} 0)`);
 const lg2=(el,x1,y1,x2,y2)=>{el.setAttribute('x1',x1);el.setAttribute('y1',y1);el.setAttribute('x2',x2);el.setAttribute('y2',y2)};
 [0,1].forEach(i=>{const p=ph+i*Math.PI;lg2(o.leg[i],-88,-34,-170+22*Math.sin(p),-16-10*Math.max(0,Math.cos(p)));o.foot[i].setAttribute('cx',-170+22*Math.sin(p));o.foot[i].setAttribute('cy',-16-10*Math.max(0,Math.cos(p)))});
 const pa=ph+1.6;lg2(o.arm0,38,-52,122+26*Math.sin(pa+Math.PI),-16-12*Math.max(0,-Math.cos(pa)));o.h0.setAttribute('cx',122+26*Math.sin(pa+Math.PI));o.h0.setAttribute('cy',-16-12*Math.max(0,-Math.cos(pa)));
 lg2(o.arm1,38,-52,122+26*Math.sin(pa),-16-12*Math.max(0,Math.cos(pa)));o.h1.setAttribute('cx',122+26*Math.sin(pa));o.h1.setAttribute('cy',-16-12*Math.max(0,Math.cos(pa)));
 const bob=lt>tf?0:Math.sin(ph*2)*2.5;o.hg.setAttribute('transform',`translate(250 ${845+bob}) scale(1.25)`);
 const fz=lt>tf;o.head.set(fz?'shock':'focus',[fz?5:4,fz?-2:0],fz?0:blinkAt(lt,.8));
 o.hd.setAttribute('transform',`translate(${100} ${-100+(fz?0:Math.sin(ph*2+.5)*2)}) scale(.74)`);
 o.beams.forEach((b,i)=>{let a=.75+.25*Math.sin(tg*9+i*2);if(i===2&&fz)a=Math.sin(tg*40)>-.2?1:.35;b.c.setAttribute('opacity',a);b.w.setAttribute('opacity',.3*a+(i===2&&fz?.15:0));
  b.dots.forEach((dt,k)=>{dt.setAttribute('cx',((k*190+lt*(240+i*40))%860)-60);dt.setAttribute('cy',b.y);dt.setAttribute('opacity',.8)})});
 const zz=fz?1+.55*eio((lt-tf)/.9):1;const cx=375,cy=720;o.cam.setAttribute('transform',`translate(${cx} ${cy}) scale(${zz}) translate(${-cx} ${-cy})`);
 const hb=tg>=wt('l08','heart')?Math.pow(Math.max(0,Math.sin((tg-wt('l08','heart'))*7.5)),6):0;
 o.vg.setAttribute('opacity',(clamp((lt-th+.2)/.6))*(.35+.65*hb));
 o.blue.setAttribute('opacity',fz?clamp((lt-tf-.3)/.5)*(.5+.3*Math.sin(lt*30)):0);
});

// ---- S8: the reveal ----
scene('s8',(g,o)=>{
 const cam=E('g',null,g);o.cam=cam;
 lg('s8bg',0,0,0,1,[[0,'#04050c'],[.7,'#0a0f2a'],[1,'#05060f']]);
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s8bg)'},cam);
 [60,640].forEach(x=>{E('rect',{x:x-34,y:0,width:68,height:860,fill:'#0b1030'},cam);E('rect',{x:x-34,y:0,width:12,height:860,fill:'#2b3a8a',opacity:.4},cam)});
 E('rect',{x:-100,y:820,width:W+200,height:500,fill:'#070a1c'},cam);
 lg('spot',0,0,0,1,[[0,'#cfe8ff',.0],[.2,'#cfe8ff',.28],[1,'#cfe8ff',.06]]);
 E('polygon',{points:'440,-60 500,-60 640,830 300,830',fill:'url(#spot)'},cam);
 E('ellipse',{cx:470,cy:826,rx:180,ry:30,fill:'#9fe0ff',opacity:.22,filter:'url(#b10)'},cam);
 // dome lying aside
 E('g',{transform:'translate(310 810) rotate(-18)'},cam).innerHTML='<path d="M-62 0 Q-62 -74 0 -74 Q62 -74 62 0Z" fill="#cfe8ff" opacity=".12" stroke="#cfe8ff" stroke-opacity=".6" stroke-width="3"/><ellipse cx="0" cy="0" rx="62" ry="9" fill="none" stroke="#cfe8ff" stroke-opacity=".6" stroke-width="3"/>';
 // pedestal
 lg('ped8',0,0,1,0,[[0,'#141a45'],[.5,'#2b3578'],[1,'#10163a']]);
 o.thg=E('g',{transform:'translate(470 520) scale(.8)'},cam);o.thief=Char(o.thg,THIEF);
 o.rim=E('path',{d:'M-62 -18 Q-66 22 -40 56',stroke:'#7fe3ff','stroke-width':5,fill:'none','stroke-linecap':'round',opacity:.7,filter:'url(#glowS)'},o.thief.h);
 E('rect',{x:380,y:800,width:180,height:260,fill:'url(#ped8)'},cam);E('ellipse',{cx:470,cy:800,rx:98,ry:20,fill:'#cfd6ff'},cam);E('ellipse',{cx:470,cy:798,rx:78,ry:14,fill:'#0b1030'},cam);E('ellipse',{cx:470,cy:800,rx:98,ry:20,fill:'none',stroke:'#ffcf4a','stroke-width':3},cam);
 o.glow=E('circle',{cx:430,cy:640,r:120,fill:'#35c8ff',opacity:.45,filter:'url(#b24)'},cam);
 o.gg=E('g',{transform:'translate(430 640) scale(.2)'},cam);o.gem=gemBuild(o.gg);
 o.thief.hand(430-470+0,0);
 // hero silhouette left
 o.hg=E('g',{transform:'translate(120 940) scale(.7)'},cam);o.hero=Char(o.hg,HERO);
 E('rect',{x:-130,y:-40,width:260,height:400,fill:'#04050c',opacity:.35},o.hg);
 o.name=E('g',{transform:'translate(470 330)',opacity:0},cam);E('rect',{x:-130,y:-24,width:260,height:48,rx:6,fill:'#10142a',stroke:'#ff2d55','stroke-width':3},o.name);E('circle',{cx:-104,cy:0,r:7,fill:'#ff2d55'},o.name);txt(o.name,'???  UNKNOWN',16,8,22,'#fff',{'letter-spacing':3});
},(lt,d,tg,o)=>{
 const z=1+.24*eio(lt/d);o.cam.setAttribute('transform',`translate(470 600) scale(${z}) translate(-470 -600)`);
 o.thg.setAttribute('transform',`translate(470 ${520+Math.sin(lt*1.8)*3}) scale(.8)`);o.thief.set('smug',[-4,2],blinkAt(lt,2));
 o.hero.set('shock',[6,-1],blinkAt(lt,1));o.hg.setAttribute('transform',`translate(130 ${940+Math.sin(lt*6)*1.6}) scale(.7)`);
 const td=wt('l09','diamond');const fl=tg>td?Math.exp(-(tg-td)*3):0;
 o.glow.setAttribute('opacity',.4+.2*Math.sin(lt*5)+fl*.5);o.glow.setAttribute('r',110+fl*70);
 o.gg.setAttribute('transform',`translate(430 ${630+Math.sin(lt*2)*3}) scale(${.2+.06*fl})`);o.gem.upd(tg,.8);
 const tn=wt('l09','someone');const k=eob((tg-tn)/.35);o.name.setAttribute('opacity',tg>tn?1:0);o.name.setAttribute('transform',`translate(470 330) scale(${tg>tn?k:.01})`);
});

// ---- S9: rival close-up ----
scene('s9',(g,o)=>{
 const cam=E('g',null,g);o.cam=cam;
 lg('s9bg',0,0,0,1,[[0,'#050615'],[1,'#0b1233']]);
 E('rect',{x:-200,y:-200,width:W+400,height:H+400,fill:'url(#s9bg)'},cam);
 rg('s9l',[[0,'#35c8ff',.6],[1,'#35c8ff',0]]);E('circle',{cx:90,cy:700,r:420,fill:'url(#s9l)'},cam);
 o.bk=bokeh(cam,16,91,['#35e0ff','#7a5cff','#ff5577'],0,100,720,1000,14,46);
 o.tg=E('g',{transform:'translate(380 520) scale(2.5)'},cam);o.thief=Char(o.tg,THIEF);
 o.rim=E('path',{d:'M-62 -24 Q-68 22 -44 56',stroke:'#7fe3ff','stroke-width':4,fill:'none','stroke-linecap':'round',opacity:.85,filter:'url(#glowS)'},o.thief.h);
 E('path',{d:'M-90 140 Q-92 100 -50 78',stroke:'#7fe3ff','stroke-width':4,fill:'none','stroke-linecap':'round',opacity:.5,filter:'url(#glowS)'},o.tg);
 o.gg=E('g',{transform:'translate(150 760) scale(.45)'},cam);E('circle',{r:260,fill:'#35c8ff',opacity:.35,filter:'url(#b24)'},o.gg);o.gem=gemBuild(o.gg);
 E('circle',{cx:150,cy:870,r:44,fill:'#0b0d16',stroke:'#1d2540','stroke-width':4},cam);
 o.tag=E('g',{transform:'translate(540 238)',opacity:0},cam);E('rect',{x:-130,y:-24,width:260,height:48,rx:6,fill:'#10142a',stroke:'#ff2d55','stroke-width':3},o.tag);E('circle',{cx:-104,cy:0,r:7,fill:'#ff2d55'},o.tag);txt(o.tag,'RIVAL  CREW',16,8,22,'#fff',{'letter-spacing':3});
},(lt,d,tg,o)=>{
 o.bk(lt);const z=1+.1*eio(lt/d);o.cam.setAttribute('transform',`translate(360 560) rotate(${-3+2*lt/d}) scale(${z}) translate(-360 -560)`);
 const sp=speaking('bm_lewis',tg);
 o.tg.setAttribute('transform',`translate(380 ${520+Math.sin(lt*1.5)*4}) scale(2.5)`);o.thief.set('smug',[-5,2],blinkAt(lt,.5));
 o.gg.setAttribute('transform',`translate(150 ${750+Math.sin(lt*2)*8}) rotate(${Math.sin(lt)*6}) scale(.45)`);o.gem.upd(tg,1);
 const k=eob((lt-.3)/.35);o.tag.setAttribute('opacity',lt>.3?1:0);o.tag.setAttribute('transform',`translate(540 238) scale(${lt>.3?k:.01})`);
});

// ---- S10: alarm ----
scene('s10',(g,o)=>{
 lg('s10bg',0,0,0,1,[[0,'#1a0309'],[1,'#07010a']]);
 const cam=E('g',null,g);o.cam=cam;
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s10bg)'},cam);
 o.rays=E('g',{transform:'translate(560 150)'},cam);
 [0,3.14159].forEach(a=>E('polygon',{points:`0,0 ${Math.cos(a-.3)*1200},${Math.sin(a-.3)*1200} ${Math.cos(a+.3)*1200},${Math.sin(a+.3)*1200}`,fill:'#ff2d55',opacity:.22},o.rays));
 E('rect',{x:530,y:150,width:60,height:30,rx:6,fill:'#2b0a14'},cam);o.bea=E('circle',{cx:560,cy:148,r:28,fill:'#ff2d55',filter:'url(#glow)'},cam);
 o.stripes=E('g',null,cam);for(let i=-2;i<22;i++)E('polygon',{points:`${i*60},1020 ${i*60+30},1020 ${i*60+0},1060 ${i*60-30},1060`,fill:'#ffcf4a'},o.stripes);
 E('rect',{x:-100,y:1014,width:W+200,height:6,fill:'#05010a'},cam);E('rect',{x:-100,y:1060,width:W+200,height:6,fill:'#05010a'},cam);
 const cg=E('g',{transform:'translate(360 470)'},cam);o.cg=cg;
 E('circle',{r:176,fill:'#2a0710',opacity:.85,stroke:'#47101c','stroke-width':14},cg);
 o.prog=E('circle',{r:176,fill:'none',stroke:'#ff2d55','stroke-width':14,'stroke-linecap':'round',transform:'rotate(-90)','stroke-dasharray':`${2*Math.PI*176}`,filter:'url(#glowS)'},cg);
 o.num=txt(cg,'00:30',0,38,112,'#fff',{'font-family':mono,'font-weight':700,'letter-spacing':-2});
 txt(cg,'GUARDS  ARRIVE  IN',0,-92,19,'#ff7d96',{'letter-spacing':6,'font-weight':800});
 o.str=E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'#ff1744',opacity:0},cam);
 const mk=(y,name,col,letter,msg)=>{const c=E('g',{transform:`translate(40 ${y})`,opacity:0},cam);E('rect',{width:640,height:84,rx:10,fill:'#0b0a14',stroke:'#2a2540','stroke-width':2},c);E('rect',{width:8,height:84,rx:4,fill:'#ff2d55'},c);E('circle',{cx:58,cy:42,r:28,fill:col},c);txt(c,letter,58,54,32,'#07100d');txt(c,name,104,34,18,'#ff9db0',{'text-anchor':'start','letter-spacing':4,'font-weight':800});const m=txt(c,msg,104,66,28,'#fff',{'text-anchor':'start','font-weight':700});return {c,m,msg}};
 o.c1=mk(690,'DEX · INCOMING','#26b673','D',"Run! It's a trap!");o.c2=mk(790,'VERA · INCOMING','#e4405f','V',"Grab it! I'm leaving in 30!");
},(lt,d,tg,o)=>{
 const sq=Math.sin(lt*2*Math.PI*1.6)>0?1:0;o.str.setAttribute('opacity',.1+.12*sq);
 o.rays.setAttribute('transform',`translate(560 150) rotate(${lt*260})`);o.bea.setAttribute('opacity',.6+.4*sq);
 o.stripes.setAttribute('transform',`translate(${-(lt*60%60)} 0)`);
 const left=Math.max(0,30-lt);o.num.textContent='00:'+String(Math.floor(left)).padStart(2,'0');
 o.prog.setAttribute('stroke-dashoffset',(2*Math.PI*176)*(1-left/30));
 const sh=Math.max(0,1-lt/.6)*8;o.cam.setAttribute('transform',`translate(${Math.sin(lt*70)*sh} ${Math.cos(lt*63)*sh})`);
 o.cg.setAttribute('transform',`translate(360 470) scale(${1+.02*Math.sin(lt*10)+.12*Math.exp(-lt*6)})`);
 [[o.c1,LN['l12'].start,"Run! It's a trap!"],[o.c2,LN['l13'].start,"Grab it! I'm leaving in 30!"]].forEach(([c,t0,m])=>{const k=eob((tg-t0)/.3);c.c.setAttribute('opacity',tg>=t0?1:0);const x=40+(1-k)*-60;c.c.setAttribute('transform',`translate(${tg>=t0?x:-700} ${c.c===o.c1.c?690:790})`);
  const n=Math.floor(clamp((tg-t0)/.55)*m.length);c.m.textContent=m.slice(0,n)});
});

// ---- S11: choice ----
scene('s11',(g,o)=>{
 lg('s11bg',0,0,0,1,[[0,'#0b0b1e'],[1,'#05050e']]);
 E('rect',{x:-100,y:-100,width:W+200,height:H+200,fill:'url(#s11bg)'},g);
 o.bk=bokeh(g,16,63,['#7a5cff','#35e0ff','#ff5577'],0,100,720,1100,16,50);
 lg('ca',0,0,1,1,[[0,'#ff4d6d'],[1,'#7a0f2b']]);lg('cb',0,0,1,1,[[0,'#2fe3c0'],[1,'#06564a']]);
 const card=(y,grad,letter,title,sub,col)=>{const c=E('g',{transform:`translate(40 ${y})`},g);E('rect',{width:640,height:300,rx:36,fill:`url(#${grad})`},c);E('rect',{width:640,height:300,rx:36,fill:'none',stroke:'#fff','stroke-opacity':.35,'stroke-width':3},c);
  E('circle',{cx:112,cy:150,r:84,fill:'#07070f',opacity:.35},c);txt(c,letter,112,212,170,'#fff');
  txt(c,title,380,138,60,'#fff',{'text-anchor':'middle'});txt(c,sub,380,186,23,'#fff',{'text-anchor':'middle','letter-spacing':4,'font-weight':700,opacity:.9});return c};
 o.A=card(228,'ca','A','FIGHT HIM','GET THE DIAMOND');o.B=card(556,'cb','B','RUN','ESCAPE EMPTY-HANDED');
 const ig=E('g',{transform:'translate(592 120) scale(.17)'},o.A);o.gem=gemBuild(ig);
 // exit sign in B
 const ex=E('g',{transform:'translate(574 98)'},o.B);E('rect',{x:-58,y:-34,width:116,height:68,rx:8,fill:'#0a2f28',stroke:'#7dffbd','stroke-width':3},ex);txt(ex,'EXIT',-10,12,28,'#7dffbd',{'letter-spacing':2});E('polygon',{points:'28,-14 46,0 28,14',fill:'#7dffbd'},ex);
 o.tm=E('g',{transform:'translate(360 542)'},g);E('rect',{x:-110,y:-30,width:220,height:60,rx:30,fill:'#0b0a14',stroke:'#ff2d55','stroke-width':4},o.tm);o.tn=txt(o.tm,'00:20',0,14,40,'#ff2d55',{'font-family':mono,'font-weight':700});
},(lt,d,tg,o)=>{
 o.bk(lt);
 const ka=eob((lt-.25)/.5),kb=eob((lt-.65)/.5);
 const ta=wt('l15','a'),tb=wt('l15','b');const pa=tg>ta?Math.exp(-(tg-ta)*4):0,pb=tg>tb?Math.exp(-(tg-tb)*4):0;
 o.A.setAttribute('transform',`translate(${40+(1-ka)*-700} 228) translate(320 150) scale(${1+.05*pa}) translate(-320 -150)`);
 o.B.setAttribute('transform',`translate(${40+(1-kb)*700} 556) translate(320 150) scale(${1+.05*pb}) translate(-320 -150)`);
 o.gem.upd(tg,.6);
 const left=Math.max(0,20-lt*1.0);o.tn.textContent='00:'+String(Math.floor(left)).padStart(2,'0');
 o.tm.setAttribute('transform',`translate(360 542) scale(${lt>.9?1+.05*Math.pow(Math.max(0,Math.sin(lt*Math.PI*2)),8):.01})`);
});
