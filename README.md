# The Assist

**Rookie Mode for watching basketball.** A synced watch experience built for the [Cursor Boston × Hult Sports Hack](https://github.com/rogerSuperBuilderAlpha/cursor-boston) (May 26, 2026).

🎬 **Demo video:** [Loom walkthrough](https://www.loom.com/share/50d65da7bfd94ef5be42986185679e0b)  
🌐 **Live app:** [https://codingwcal.github.io/the-assist/](https://codingwcal.github.io/the-assist/)  
📦 **Source:** [github.com/CodingWCal/the-assist](https://github.com/CodingWCal/the-assist)

---

## The problem

New viewers churn out of sports because the game feels illegible—rules, terminology, referee calls, and momentum are invisible unless someone explains them in real time. Most people won’t interrupt a friend to ask what a “lob” or “double-team” means.

## The solution

**The Assist** plays a real public NBA Finals clip (Game 6, GSW @ BOS, 2022) and layers context **inside** the broadcast:

- **What you’re seeing** on screen (passes, drives, lineup, score moments)
- **What the announcers are saying** (synced to the real closed-caption track)
- **Rookie takeaways** for rules and mechanics (3-point line, small ball, turnovers, etc.)

No second tab, no LLM live generation—everything is driven by a hand-authored timeline keyed to video time and real caption timestamps.

---

## Features

| Feature | Description |
|--------|-------------|
| **Video player** | YouTube embed with playback time driving the experience |
| **Rookie Mode panel** | Right rail with cards: *What you’re seeing*, announcer quotes, context, and takeaways |
| **Hype strip** | Live score (BOS vs GSW), quarter, game clock, excitement meter |
| **Transcript rail** | Announcer captions synced to playback (from the broadcast CC track) |
| **Matchup card** | Collapsible team/player primer for both sides |
| **Celebrations** | Confetti + screen shake on Golden State scores (scaled by points) |
| **Veteran view** | Toggle Rookie Mode off (`R` keyboard shortcut) to watch clean |

---

## Quick start (local)

**Requirements:** Node.js 18+

```bash
git clone https://github.com/CodingWCal/the-assist.git
cd the-assist
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Press play on the video; Rookie Mode cards fire as the timeline hits each timestamp.

### Other scripts

```bash
npm run build    # production build → dist/
npm run preview  # preview production build locally
npm run lint     # ESLint
```

---

## How it works

1. **`src/data/timeline.js`** — Events (`term`, `ref`, `lore`, `hype`, `score`) with timestamps pegged ~3–6s before announcer cues from the YouTube CC track.
2. **`useGameClock`** — Polls `getCurrentTime()` every 250ms and fires events; score updates the hype strip and triggers celebrations.
3. **`TRANSCRIPT`** — Real caption lines with broadcast timestamps; the rail highlights the active line.
4. **No backend** — Static Vite + React app; deployed on GitHub Pages.

---

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) 18
- YouTube IFrame Player API
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for score celebrations

---

## Project structure

```
src/
  App.jsx              # Layout, player, game clock, all UI
  data/timeline.js     # Timeline events, matchup data, transcript
  styles.css           # Design tokens (Celtics green, dark broadcast UI)
  main.jsx
index.html
vite.config.js         # base: /the-assist/ for GitHub Pages
```

---

## Deploy

The live site is hosted on **GitHub Pages** from the `gh-pages` branch:

```bash
npm run build
npx gh-pages -d dist
```

Site URL: **https://codingwcal.github.io/the-assist/**

---

## Team

Built at Hult International, Boston — Cursor Boston Sports Hack, May 26, 2026.

| Name | GitHub |
|------|--------|
| Calvin V. | [@CodingWCal](https://github.com/CodingWCal) |
| Karlee Perpignant | [@kperpignant](https://github.com/kperpignant) |
| Emily Castillo | [@emilycastillox](https://github.com/emilycastillox) |

---

## License

Hackathon project — see repository for usage terms.
