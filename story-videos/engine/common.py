import os,sys,json
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def story_dir(arg):
    p=arg if os.path.isabs(arg) else os.path.join(ROOT,arg)
    return os.path.normpath(p)
def slug(sd):return os.path.basename(sd)
def out_dir(sd):
    o=os.path.join(ROOT,'out',slug(sd));os.makedirs(o,exist_ok=True);return o
def load_script(sd):
    ns={};exec(open(os.path.join(sd,'script.py')).read(),ns);return ns
