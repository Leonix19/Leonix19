"""Assemble out/<story>/film.html. usage: build_html.py stories/NNN-name"""
import sys,os
sys.path.insert(0,os.path.dirname(__file__))
from common import *
sd=story_dir(sys.argv[1]);o=out_dir(sd);tl=open(o+'/timeline.json').read()
parts=[ROOT+'/engine/core.js',ROOT+'/engine/lib.js',sd+'/scenes.js',sd+'/story.js',ROOT+'/engine/overlay.js']
js='\n'.join(open(p).read() for p in parts)
html='<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#000;overflow:hidden}svg{display:block}</style></head><body><svg id="v" width="720" height="1280" viewBox="0 0 720 1280" xmlns="http://www.w3.org/2000/svg"><g id="cam"></g></svg><script>const TL='+tl+';</script><script>'+js+'</script></body></html>'
open(o+'/film.html','w').write(html);print('built',o+'/film.html')
