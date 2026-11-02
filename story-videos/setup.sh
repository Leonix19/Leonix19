#!/usr/bin/env bash
# Idempotent: installs Python deps and downloads the offline Kokoro voice model (~350 MB) if missing.
set -euo pipefail
cd "$(dirname "$0")"
python3 -c "import kokoro_onnx,soundfile,scipy,PIL" 2>/dev/null || pip install --break-system-packages -q -r requirements.txt
mkdir -p models
BASE=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -s models/kokoro-v1.0.onnx ] || curl -sSL --max-time 600 -o models/kokoro-v1.0.onnx "$BASE/kokoro-v1.0.onnx"
[ -s models/voices-v1.0.bin ]  || curl -sSL --max-time 600 -o models/voices-v1.0.bin  "$BASE/voices-v1.0.bin"
command -v ffmpeg >/dev/null || { echo "ffmpeg missing"; exit 1; }
python3 -c "from playwright.sync_api import sync_playwright" || { echo "playwright missing"; exit 1; }
echo "setup ok"
