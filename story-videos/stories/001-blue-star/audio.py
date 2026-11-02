# Audio for story 001 (exec'd inside engine/mix_engine.py - helpers are globals)
VOICE_FX={'am_puck':'radio','af_nicole':'radio','bm_lewis':'reverb'}
def music_cfg():
    return dict(
        drone=[(0,.5),(S('s6'),.8),(S('s10'),1.0),(END,1.0)],
        bass=[(0,0),(S('s2')-.1,0),(S('s2'),.5),(S('s6'),.8),(S('s7'),.45),(S('s8'),.6),(S('s9'),.7),(S('s10')-.01,.8),(S('s10'),1.0),(END,1.0)],
        arp=[(0,0),(S('s3'),0),(S('s3')+.5,.35),(S('s5'),.45),(S('s6'),.6),(S('s7'),.3),(S('s8'),.4),(S('s9'),.55),(S('s10')-.01,.6),(S('s10'),1.0),(END,1.0)],
        hat_from='s6',kick_from='s10',prekick=('s9','s10'),riser='s10')
def cues():
    for n in TL['scenes'][1:]:whoosh(n['start']-.05)
    boom(wt('l02','forty')-.05,.8);boom(wt('l04','easy'),.7,.7);boom(wt('l08','freeze'),.9);boom(LN['l10']['start']-.1,.8);boom(LN['l11']['start']-.1,1.0,1.1)
    # keycard
    tb=wt('l04','beep');put(sfx,bp(rng.standard_normal(int(.35*SR)),2000,7000)*np.sin(np.linspace(0,np.pi,int(.35*SR))),tb-.5,.35)
    beep(tb,1700,.11);beep(tb+.15,2300,.16)
    to=wt('l04','opens');d=1.0;x=lp(rng.standard_normal(int(d*SR)),700)*np.sin(np.linspace(0,np.pi,int(d*SR)));put(sfx,x*.7,to-.2);put(sfx,sin(70,d)*np.sin(np.linspace(0,np.pi,int(d*SR)))*.5,to-.2)
    # ui pops
    for lid,w in [('l03','dex'),('l03','vera'),('l03','six'),('l09','someone')]:blip(wt(lid,w),1100,.2)
    crack(LN['l05']['start'],1.5,.55);blip(LN['l06']['start']-.05,700,.3)
    blip(LN['l12']['start']-.02,1000,.3);blip(LN['l13']['start']-.02,1200,.3)
    # laser hum
    d=SC['s9']['start']-SC['s6']['start'];t=tt(d);hum=(sin(110,d)*.5+sin(220.7,d)*.3+hp(rng.standard_normal(len(t)),3000)*.05)*(.7+.3*np.sin(2*np.pi*7*t))*np.minimum(t/.5,1)*np.minimum((d-t)/.5,1);put(sfx,hum,SC['s6']['start'],.2)
    # heartbeat
    th=wt('l08','heart')
    tcur=th
    while tcur<SC['s8']['start']+1.0:
        for off,g in [(0,.9),(.2,.6)]:
            d=.25;x=np.sin(2*np.pi*np.cumsum(65*np.exp(-tt(d)*10)+30)/SR)*np.exp(-tt(d)*14);put(sfx,x*1.0,tcur+off,g)
        tcur+=.8
    # s8 sting (dissonant)
    t0=SC['s8']['start'];d=2.2;st=(sin(220,d)+sin(233.1,d)+sin(329.6,d)*.6)*np.exp(-tt(d)*1.1)*.18;put(sfx,lp(st,3000),t0+.1,.6)
    # alarm siren
    t0=SC['s10']['start'];d=END-t0+.3;t=tt(d);fr_=760+170*np.abs(2*((t*1.25)%1)-1);si=np.sin(2*np.pi*np.cumsum(fr_)/SR);si=np.tanh(si*2)*.22*np.minimum(t/.2,1)*np.minimum((d-t)/.6,1);put(sfx,si,t0,.55)
    # s11 ticks
    t0=SC['s11']['start']
    for k in range(0,int(LN['l15']['start']-t0)+1):beep(t0+k+.2,1300,.03,.25)
    for w in ['a','b']:boom(wt('l15',w)-.02,.45,.4)
    # final stinger
    te=LN['l15']['start']+LN['l15']['dur']+.35;boom(te,1.0,1.4);
