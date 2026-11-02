# Nightly playbook – daily story video (read fully before starting)

You run unattended at 00:00 Europe/Rome. Nobody answers questions: decide, state what you decided, finish.
Goal: ONE new episode for the owner (Leo / "Mario") to post on TikTok in the morning:
`out/<slug>/<slug>.mp4` (1080x1920, 60-75 s, voice + music + captions) and a ready-to-paste `description.txt`.
Never claim success unless the final MP4 exists and was checked.

## 1. Read state
- `state.json` (series memory), the previous episode folder in `stories/` (script.py, scenes.js, story.js, audio.py).
- If the owner left an instruction (e.g. "ha vinto A", a commenter idea), it overrides `outcome_policy`.

## 2. Decide the episode
- If `current_story.parts_done < parts_total` -> next part of the same story. Otherwise start a NEW story (3 parts, ~3 days).
- New story: run 2-3 WebSearch queries for what is trending now (movies/games/news memes, current date from the system), then pick a genre from `next_idea_pool`
  (heists, zombie apocalypse, superpowers, survival, escape rooms...). Premise must be ORIGINAL: no real people, no brands, no existing characters/franchises, nothing graphic or gory.
- Continuing: the previous cliffhanger has no recorded outcome -> apply `outcome_policy`, record it in `state.json` (`outcome`), open the episode with a one-line recap such as
  "Last time, you chose to fight him." Keep cast, looks and voices identical (see `cast`).
- Every episode: hook in the first 3 seconds, rising danger, a twist, and it ENDS on a binary choice A/B with the CTA
  "Comment A or B. Part N+1 drops tomorrow." (last episode of a story ends on a payoff + "New story tomorrow", no A/B needed but a teaser).

## 3. Build the episode folder
`cp -r stories/<previous> stories/<NNN+1>-<slug>-p<part>` (NNN = sequential episode number) and rewrite:
- `script.py`: LINES (id, voice, speed, text, scene), GAPS, LEAD, END_HOLD. ~170-190 spoken words, 11 scenes (s1..s11), narrator `am_michael`, 2-3 other voices.
  Total must land at 60-75 s (timeline.py prints the duration and warns). Dialogue lines are short.
- `scenes.js`: one `scene('sN', build, update)` per scene. Reuse the helpers from `engine/core.js` and `engine/lib.js`
  (`Char` + `HERO/DEX/VERA/THIEF` style configs, `gemBuild`, `rain`, `bokeh`, `dust`, `star4`, `txt`, easing `eo3/eio/eob`, `wt(lineId,word)`, `speaking(voice,t)`).
  Change locations/props for the new story; keep the flat vector style, glows, camera pushes, pops timed to spoken words with `wt()`.
- `story.js`: `STORY` config (title, part, `danger` per scene, caption `keywords`, shake/flash `events()`, `endAt()`, `hud` rows). Rename HUD rows to fit the genre
  (e.g. SURVIVORS / AMMO / POWER) but keep the PART tag + DANGER bar.
- `audio.py`: `VOICE_FX`, `music_cfg()`, `cues()` (whoosh at scene cuts, booms on twists, UI blips, alarms, heartbeat...). Music grows from tense to driving.
- `description.txt`: see section 5.
Layout rules that worked: HUD occupies top-left y<215; keep key art in y 215-880; captions sit at y~940 (do not put important art there); bottom 250 px is TikTok UI.
No text wider than ~640 px. Never put a scene object at NaN/negative size (clamp).

## 4. Render and check (do not skip)
1. `./run.sh stories/<folder> qc` -> prints duration, JS errors; then Read `out/<slug>/qc_sheet.png` and fix: overlaps with HUD/captions, cut-off text, empty scenes, wrong expressions, duration outside 60-75 s.
2. `./run.sh stories/<folder>` (full, ~6 min). Then verify with ffprobe (1080x1920, 30 fps, duration in range, audio stream present) and extract 6 frames across the video to look at.
3. If a check fails: fix and re-render only what changed (`python3 engine/render.py stories/<folder> sN`, then re-run mix + mux lines from run.sh). Max 2 repair rounds, then deliver what exists and say plainly what is wrong.

## 5. Description (description.txt, English)
Format, nothing else: 1-2 hook lines (with at most 1-2 emoji) -> blank line -> "What do you do?" + the two options on their own lines
(`🅰️ A: ...` / `🅱️ B: ...`) -> `Comment A or B. Part N+1 drops tomorrow!` -> blank line -> exactly 3 hashtags max 4
(`#storytime` + genre tag + `#chooseyourpath`). No hashtag spam, no tagging brands/people.
Reminder for the owner in the chat message: switch on TikTok's "AI-generated content" label (synthetic voice/animation).

## 6. Save and deliver
- Update `state.json`: new episode entry (n, date, story, part, folder, recap, choices, outcome of the previous one), `current_story.parts_done`, cast changes.
- `git add stories state.json` (NOT `out/`, `models/`) -> commit (follow the session's commit attribution instructions) -> push. If push fails, retry once, then continue.
- Deliver with SendUserFile: the MP4 (display render). Then send the description text and 3 lines in Italian: which Part, the two choices, which outcome you applied to the previous episode.
  Mention anything not perfect. Send a push notification when the MP4 is ready.

## Hard limits
Original content only; no real people, no copyrighted characters, no graphic violence, no sexual or hateful content, no real brands/logos.
Do not post to TikTok; the owner posts manually. Do not delete or rewrite earlier episodes.
