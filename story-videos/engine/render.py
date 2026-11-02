"""Render one scene to a clip (1080x1920, 30fps). usage: render.py stories/NNN-name scene [scale=1.5]"""
import sys,os,json,subprocess,time
sys.path.insert(0,os.path.dirname(__file__))
from common import *
from playwright.sync_api import sync_playwright
sd=story_dir(sys.argv[1]);o=out_dir(sd);name=sys.argv[2];scale=float(sys.argv[3]) if len(sys.argv)>3 else 1.5
TL=json.load(open(o+'/timeline.json'));sc={s['name']:s for s in TL['scenes']}[name];FPS=30
f0=round(sc['start']*FPS);f1=round(sc['end']*FPS);os.makedirs(o+'/clips',exist_ok=True)
tmp=f'{o}/clips/{name}.tmp.mp4';out=f'{o}/clips/{name}.mp4'
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':720,'height':1280},device_scale_factor=scale)
    pg.goto('file://'+o+'/film.html');pg.wait_for_timeout(400)
    ff=subprocess.Popen(['ffmpeg','-y','-v','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','17','-pix_fmt','yuv420p','-r',str(FPS),'-f','mp4',tmp],stdin=subprocess.PIPE)
    t0=time.time()
    for f in range(f0,f1):
        pg.evaluate(f'setT({f/FPS})');ff.stdin.write(pg.screenshot(type='jpeg',quality=92))
    ff.stdin.close();rc=ff.wait();b.close()
if rc==0:os.rename(tmp,out)
print(name,f1-f0,'frames',round(time.time()-t0,1),'s rc',rc);sys.exit(rc)
