#!/usr/bin/env bash
# usage: ./run.sh stories/NNN-name [qc]     qc = stop after still frames (review them before the full render)
set -euo pipefail
cd "$(dirname "$0")"
S="${1:?usage: ./run.sh stories/NNN-name [qc]}"; MODE="${2:-full}"
SLUG=$(basename "$S"); O=out/$SLUG
./setup.sh
python3 engine/tts.py "$S"
python3 engine/timeline.py "$S"
python3 engine/build_html.py "$S"
END=$(python3 -c "import json;print(int(json.load(open('$O/timeline.json'))['end']))")
TIMES=$(python3 -c "import json;e=json.load(open('$O/timeline.json'));print(' '.join(str(round((s['start']+s['end'])/2+.3,1)) for s in e['scenes']))")
rm -f "$O"/qc_*.png
python3 engine/shot.py "$S" "$O/qc" $TIMES
python3 engine/sheet.py "$O/qc"
[ "$MODE" = "qc" ] && { echo "QC sheet: $O/qc_sheet.png"; exit 0; }
python3 -c "import json;print('\n'.join(s['name'] for s in json.load(open('$O/timeline.json'))['scenes']))" | xargs -P 2 -I{} python3 engine/render.py "$S" {}
python3 engine/mix_engine.py "$S"
: > "$O/clips/list.txt"
for n in $(python3 -c "import json;print(' '.join(s['name'] for s in json.load(open('$O/timeline.json'))['scenes']))"); do echo "file '$PWD/$O/clips/$n.mp4'" >> "$O/clips/list.txt"; done
ffmpeg -y -v error -f concat -safe 0 -i "$O/clips/list.txt" -c copy "$O/video_noaudio.mp4"
ffmpeg -y -v error -i "$O/video_noaudio.mp4" -i "$O/audio/mix.wav" -map 0:v -map 1:a -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 44100 -shortest -movflags +faststart "$O/$SLUG.mp4"
ffprobe -v error -show_entries format=duration,size:stream=width,height -of default=nw=1 "$O/$SLUG.mp4"
echo "VIDEO: $O/$SLUG.mp4"
