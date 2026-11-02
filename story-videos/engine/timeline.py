"""Compute line/word/scene timings from TTS durations. usage: timeline.py stories/NNN-name"""
import sys,os,json,re
sys.path.insert(0,os.path.dirname(__file__))
from common import *
sd=story_dir(sys.argv[1]);o=out_dir(sd);sc=load_script(sd)
D=json.load(open(o+'/audio/durs.json'));GAP=sc.get('GAPS',{});LEAD=sc.get('LEAD',.8);HOLD=sc.get('END_HOLD',3.6)
cur=LEAD;out=[];scenes={}
for lid,v,sp,txt,scn in sc['LINES']:
    st=cur;du=D[lid];words=txt.split()
    wt=[len(re.sub(r'[^\w]','',x))+1.5 for x in words];pa=[0.0]*len(words)
    for i,x in enumerate(words):
        if x[-1] in '.?!':pa[i]=2.5
        elif x[-1] in ',:':pa[i]=1.2
    tot=sum(wt)+sum(pa[:-1]);t=st;ws=[]
    for i,x in enumerate(words):
        d=du*wt[i]/tot;ws.append({'w':x,'s':round(t,3),'e':round(t+d,3)});t+=d+(du*pa[i]/tot if i<len(words)-1 else 0)
    out.append({'id':lid,'voice':v,'text':txt,'scene':scn,'start':round(st,3),'dur':round(du,3),'words':ws})
    scenes.setdefault(scn,st);cur=st+du+GAP.get(lid,.5)
end=out[-1]['start']+out[-1]['dur']+HOLD;names=list(scenes);scl=[]
for i,n in enumerate(names):
    s=0.0 if i==0 else scenes[n]-.15;e=end if i==len(names)-1 else scenes[names[i+1]]-.15
    scl.append({'name':n,'start':round(s,3),'end':round(e,3)})
json.dump({'lines':out,'scenes':scl,'end':round(end,3)},open(o+'/timeline.json','w'),indent=1)
print('duration',round(end,2),'s  (TikTok target 60-75)')
if not 60<=end<=75:print('WARNING: duration outside 60-75s - adjust GAPS/LEAD/END_HOLD or lines')
