"""Screenshot frames at given times (for QC). usage: shot.py stories/NNN-name out_prefix t1 t2 ..."""
import sys,os
sys.path.insert(0,os.path.dirname(__file__))
from common import *
from playwright.sync_api import sync_playwright
sd=story_dir(sys.argv[1]);o=out_dir(sd);pref=sys.argv[2];ts=[float(x) for x in sys.argv[3:]]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':720,'height':1280});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
    pg.goto('file://'+o+'/film.html');pg.wait_for_timeout(500)
    for t in ts:
        pg.evaluate(f'setT({t})');pg.screenshot(path=f'{pref}_{t:05.1f}.png')
    print('ERRORS' if errs else 'no js errors',errs[:5]);b.close()
