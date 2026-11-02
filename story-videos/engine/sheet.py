"""Contact sheet from PNGs. usage: sheet.py prefix  (uses prefix_*.png, writes prefix_sheet.png)"""
import sys,glob
from PIL import Image
fs=[f for f in sorted(glob.glob(sys.argv[1]+'_*.png')) if not f.endswith('_sheet.png')];ims=[Image.open(f).resize((360,640)) for f in fs]
cols=min(len(ims),6);rows=(len(ims)+cols-1)//cols
sh=Image.new('RGB',(360*cols,640*rows))
for i,im in enumerate(ims):sh.paste(im,((i%cols)*360,(i//cols)*640))
sh.save(sys.argv[1]+'_sheet.png');print(sys.argv[1]+'_sheet.png')
