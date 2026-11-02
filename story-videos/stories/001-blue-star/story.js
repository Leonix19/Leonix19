// Story config consumed by engine/overlay.js. Runs after scenes.js, so wt/LN/SC/TL/E/txt/etc. exist.
const STORY={
 title:'The Blue Star', part:1, endText:'PART 2 TOMORROW',
 // danger level (0-8 segments) per scene name
 danger:{s1:1,s2:1,s3:2,s4:2,s5:3,s6:4,s7:5,s8:6,s9:6,s10:8,s11:8},
 // caption keyword colours: gold / red / cyan / green  (lowercase words)
 keywords:{gold:['forty','million','dollars','four','thirty','40','4'],red:['laser','alarms','scream','trap','sold','guards','freeze','fight','empty','handed','wakes'],cyan:['diamond','blue','star','dome','crackles'],green:['green','open','opens','run','exit']},
 // screen shake / white flash events: [time, shakeAmp, flashAlpha]
 events:()=>[[wt('l02','forty'),10,.5],[wt('l04','easy'),12,.3],[LN.l05.start,7,.2],[LN.l06.start,6,0],[wt('l08','freeze'),12,.45],[wt('l09','someone'),5,0],[LN.l10.start,9,.5],[LN.l11.start,14,.5],[SC.s11.start,8,.4]],
 // when the closing "PART 2 TOMORROW" card appears
 endAt:()=>LN.l15.start+LN.l15.dur+.35,
 hud:{
  build(hud,lab){
   lab('LOOT',160);lab('TIME',204);
   this.lootT=txt(hud,'$0',130,168,36,'#fff',{'text-anchor':'start',stroke:'#05060f','stroke-width':6,'paint-order':'stroke'});
   this.lootC=E('g',{transform:'translate(372 144)',opacity:0},hud);E('rect',{width:156,height:26,rx:3,fill:'#ffcf4a'},this.lootC);txt(this.lootC,'IF YOU ESCAPE',78,18,13,'#1a1200',{'letter-spacing':2});
   this.timeT=txt(hud,'--:--',130,208,34,'#fff',{'text-anchor':'start','font-family':mono,'font-weight':700,stroke:'#05060f','stroke-width':6,'paint-order':'stroke'});
   this.TK=[[SC.s3.start,360],[SC.s4.start,352],[SC.s5.start,318],[SC.s6.start,276],[SC.s7.start,230],[SC.s8.start,110],[SC.s9.start,72],[SC.s10.start,30],[TL.end,30-(TL.end-SC.s10.start)]];
  },
  timeLeft(t){const TK=this.TK;if(t<TK[0][0])return null;for(let i=0;i<TK.length-1;i++){const a=TK[i],b=TK[i+1];if(t>=a[0]&&t<b[0])return lerp(a[1],b[1],(t-a[0])/(b[0]-a[0]))}return TK[TK.length-1][1]},
  update(t,sc){
   const t0=wt('l02','four'),kk=clamp((t-t0)/.9);const lv=t<t0?0:4000000*eio(kk);this.lootT.textContent=fmt(lv);this.lootT.setAttribute('fill',t>=t0?'#ffd24a':'#fff');this.lootC.setAttribute('opacity',kk>=1?1:0);
   const tl=this.timeLeft(t);if(tl===null){this.timeT.textContent='--:--';this.timeT.setAttribute('fill','#8b91b8')}else{const m=Math.floor(tl/60),s=Math.floor(tl%60);this.timeT.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');this.timeT.setAttribute('fill',tl<75?(Math.sin(t*8)>-.3?'#ff4d6d':'#ff9db0'):'#fff')}
  }
 }
};
