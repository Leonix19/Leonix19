"""Voice + music + SFX mix. usage: mix_engine.py stories/NNN-name   -> out/<story>/audio/mix.wav
The story's audio.py is exec'd here (all helpers below are globals) and must define:
  VOICE_FX = {voice_name: 'radio'|'reverb'}      (optional per-voice processing)
  music_cfg() -> dict(drone=[(t,v)..], bass=.., arp=.., hat_from='sN', kick_from='sN', prekick=('sA','sB')|None, riser='sN'|None, chords=optional)
  cues()      -> places sound effects with whoosh/boom/beep/blip/crack/put(sfx,...)
"""
import sys,os,json,numpy as np,soundfile as sf
from scipy import signal
sys.path.insert(0,os.path.dirname(__file__))
from common import *
sd=story_dir(sys.argv[1]);O=out_dir(sd);SR=44100
TL=json.load(open(O+'/timeline.json'));LN={l['id']:l for l in TL['lines']};SC={s['name']:s for s in TL['scenes']}
END=TL['end'];N=int((END+.3)*SR);rng=np.random.default_rng(7)
def wt(lid,word):
    for w in LN[lid]['words']:
        if ''.join(c for c in w['w'].lower() if c.isalnum() or c=="'")==word:return w['s']
    return LN[lid]['start']
def S(n):return SC[n]['start']
def lp(x,f,o=2):return signal.sosfilt(signal.butter(o,f,'low',fs=SR,output='sos'),x)
def hp(x,f,o=2):return signal.sosfilt(signal.butter(o,f,'high',fs=SR,output='sos'),x)
def bp(x,a,b,o=2):return signal.sosfilt(signal.butter(o,[a,b],'band',fs=SR,output='sos'),x)
def put(buf,x,t,g=1.0):
    i=int(t*SR)
    if i>=len(buf):return
    j=min(len(buf),i+len(x));buf[i:j]+=x[:j-i]*g
def tt(d):return np.arange(int(d*SR))/SR
def saw(f,d):t=tt(d);return 2*((f*t)%1)-1
def sq(f,d):return np.sign(np.sin(2*np.pi*f*tt(d)))
def sin(f,d):return np.sin(2*np.pi*f*tt(d))
def env(d,a=.005,dec=.2):t=tt(d);return np.minimum(t/a,1)*np.exp(-t/dec)
fr=lambda n:440*2**((n-69)/12)
def ramp(pts):
    ts=[p[0] for p in pts];vs=[p[1] for p in pts];return lambda t:float(np.interp(t,ts,vs))
sfx=np.zeros(N)
def whoosh(t,d=.4,g=.5):
    x=rng.standard_normal(int(d*SR));k=np.linspace(0,1,len(x));x=bp(x,300,4500)*np.sin(np.pi*k)**1.5;put(sfx,x*g,t)
def boom(t,g=.9,d=.9):
    f=np.cumsum(70*np.exp(-tt(d)*3)+28)/SR;x=np.sin(2*np.pi*f)*np.exp(-tt(d)*3.2);x+=lp(rng.standard_normal(len(x)),500)*np.exp(-tt(d)*9)*.5;put(sfx,x*g,t)
def beep(t,f=1800,d=.1,g=.35):put(sfx,sin(f,d)*np.minimum(tt(d)/.005,1)*np.minimum((d-tt(d))/.01,1),t,g)
def blip(t,f=900,g=.25):beep(t,f,.07,g);beep(t+.08,f*1.5,.09,g)
def crack(t,d=1.5,g=.5):
    x=np.zeros(int(d*SR))
    for i in range(int(d*18)):
        s=rng.uniform(0,d-.05);n=int(rng.uniform(.01,.05)*SR);x[int(s*SR):int(s*SR)+n]+=bp(rng.standard_normal(n),1500,6000)*rng.uniform(.3,1)
    put(sfx,x*g,t)
exec(open(sd+'/audio.py').read(),globals())
# ---- voice ----
voice=np.zeros(N)
for l in TL['lines']:
    a,sr=sf.read(f"{O}/audio/{l['id']}.wav")
    a=signal.resample_poly(a,441,sr//100) if sr==24000 else a
    a=a/np.max(np.abs(a))*.9;fx=VOICE_FX.get(l['voice'])
    if fx=='radio':
        a=bp(a,350,3600,3)*1.5;a=np.tanh(a*1.6)*.75;a=a+bp(rng.standard_normal(len(a))*.015,800,4000)
    elif fx=='reverb':
        a=lp(a,6500);rev=np.zeros(len(a)+int(.4*SR));rev[:len(a)]+=a;rev[int(.11*SR):int(.11*SR)+len(a)]+=a*.25;rev[int(.23*SR):int(.23*SR)+len(a)]+=a*.12;a=rev
    put(voice,a,l['start'],1.0)
env_v=lp(np.abs(voice),8,1);env_v=np.clip(env_v/(np.percentile(env_v,95)+1e-6),0,1)
# ---- music ----
C=music_cfg();mus=np.zeros(N);BPM=C.get('bpm',100);B=60/BPM
drone_g=C['drone'];bass_g=ramp(C['bass']);arp_g=ramp(C['arp'])
chords=C.get('chords',[(33,[57,60,64]),(29,[53,57,60]),(36,[60,64,67]),(31,[55,59,62])])
t_=np.arange(N)/SR;dr=np.zeros(N)
for f,g in [(55,.5),(110.0,.22),(82.4,.18)]:dr+=g*np.sin(2*np.pi*f*t_)
dr+=lp(2*((55*t_)%1)-1,220)*.25
ts_=[p[0] for p in drone_g]+[END+.3];vs_=[p[1] for p in drone_g]+[drone_g[-1][1]]
dr*=np.interp(t_,ts_,vs_)*(1+.2*np.sin(2*np.pi*t_/(B*4)));mus+=dr*.18
hat_t=S(C['hat_from']);kick_t=S(C['kick_from']);pk=C.get('prekick')
for b in range(int(END/B)+2):
    t=b*B;f,notes=chords[(b//4)%len(chords)]
    for h in range(2):
        tn=t+h*B/2;g=bass_g(tn)
        if g>0:put(mus,lp(saw(fr(f+12*(h==1 and b%2==1)),.28),500)*env(.28,.004,.14)*.5,tn,g)
    for q in range(4):
        tn=t+q*B/4;g=arp_g(tn)
        if g>0:
            idx=[0,1,2,1][q] if b%2==0 else [2,1,0,1][q];n=notes[idx]+(12 if (b%4==3 and q%2) else 0)
            x=lp(sq(fr(n),.2)*.6+saw(fr(n)*1.003,.2)*.4,2400+1800*g)*env(.2,.003,.09);put(mus,x*.22,tn,g)
    fast=t>=kick_t
    for q in range(4 if fast else 2):
        tn=t+q*(B/4 if fast else B/2)
        if tn>=hat_t:put(mus,hp(rng.standard_normal(int(.06*SR)),7000)*env(.06,.001,.02)*.25,tn,.8 if q%2==0 else .5)
    if t>=kick_t-.01 or (pk and S(pk[0])<=t<S(pk[1]) and b%2==0):
        x=np.sin(2*np.pi*np.cumsum(48+90*np.exp(-tt(.3)*22))/SR)*env(.3,.002,.11);put(mus,x*.9,t,.9 if t>=kick_t else .5)
if C.get('riser'):
    rs=S(C['riser'])-2.4;d=2.4;r=bp(rng.standard_normal(int(d*SR)),500,6000)*(tt(d)/d)**2.2;put(mus,r*.6,rs,.5)
    cs=np.cumsum(200+1400*(tt(d)/d)**2)/SR;put(mus,np.sin(2*np.pi*cs)*(tt(d)/d)**2*.25,rs,.5)
mus*=1-.5*env_v[:N]
# ---- sfx ----
cues();sfx*=1-.28*env_v[:N]
mix=np.tanh((voice+mus*.55+sfx*.7)*1.05)
mix[:int(.15*SR)]*=np.linspace(0,1,int(.15*SR));mix[-int(.6*SR):]*=np.linspace(1,0,int(.6*SR))
mix/=np.max(np.abs(mix))/.95
sf.write(O+'/audio/mix.wav',np.stack([mix,mix],1).astype(np.float32),SR);print('mix ok',round(len(mix)/SR,1),'s')
