"""Synthesize every line of a story with Kokoro (local, offline). usage: tts.py stories/NNN-name"""
import sys,os,json,numpy as np,soundfile as sf
sys.path.insert(0,os.path.dirname(__file__))
from common import *
sd=story_dir(sys.argv[1]);o=out_dir(sd);os.makedirs(o+'/audio',exist_ok=True)
sc=load_script(sd)
from kokoro_onnx import Kokoro
M=os.environ.get('KOKORO_DIR',os.path.join(ROOT,'models'))
k=Kokoro(M+'/kokoro-v1.0.onnx',M+'/voices-v1.0.bin')
meta={}
for lid,v,sp,txt,_ in sc['LINES']:
    a,sr=k.create(txt,voice=v,speed=sp,lang='en-gb' if v.startswith('b') else 'en-us')
    a=np.asarray(a,dtype=np.float32);idx=np.where(np.abs(a)>0.012)[0]
    a=a[max(idx[0]-int(.03*sr),0):idx[-1]+int(.06*sr)]
    sf.write(f'{o}/audio/{lid}.wav',a,sr);meta[lid]=len(a)/sr;print(lid,v,round(meta[lid],2))
json.dump(meta,open(o+'/audio/durs.json','w'))
print('speech seconds',round(sum(meta.values()),1))
