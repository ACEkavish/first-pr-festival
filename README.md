# 🕸️ Spider-Society Mainframe

Live roster for **First PR Festival : Intro to Github and Open Source**.

Merge a Pull Request → Vercel rebuilds → your Spider-ID Card appears on the site.
No database. Just JSON files and Git.

---

## 🧵 Hand-woven cards

Chapter 2 asks students to build their ID card themselves in **HTML with
internal CSS** — `spider-society/<username>.html`. The roster renders each one
inside `<iframe sandbox srcdoc>` with **scripts disabled**, which is the entire
security model:

- their JavaScript never executes, so a merged card cannot XSS the live site
- their CSS is confined to the frame, so it cannot leak out and restyle the page
- the worst a student can do is break their own card

`scripts/validate.mjs` additionally rejects `<script>`, inline `on*=` handlers,
`<iframe>`, missing `<style>`, unfilled placeholders, files over 30KB, and
filenames that don't match `data-github`. `getData.ts` strips scripts and
handlers again at build time — defence in depth.

A `.json` entry still works and renders the generated card; if both exist for
the same person, the hand-woven HTML wins.

## 🚀 Join the Society (contributor guide)

1. **Fork** this repository.
2. Copy `spider-society/_template.json` to a new file named after your GitHub
   username: `spider-society/<your-github-username>.json`
3. Fill it in:

```json
{
  "name": "Your Name",
  "alias": "Your Spider-Alias",
  "skills": ["Skill One", "Skill Two", "Skill Three"],
  "suitColor": "#FF1B4C",
  "githubUsername": "your-github-username"
}
```

| Field            | Rules                                        |
| ---------------- | -------------------------------------------- |
| `name`           | Your real name                               |
| `alias`          | Your Spider-Alias                            |
| `skills`         | Exactly **3** strings                        |
| `suitColor`      | Hex code, e.g. `#00F0FF` — drives card glow  |
| `githubUsername` | Must match your account and the file name    |

4. Commit, push, and **open a Pull Request**.
5. A GitHub Action validates your JSON. Green check → a maintainer merges → you're live.

**Rules:** one file per person, don't edit `_template.json`, don't touch other
people's files.

## 🎮 Into the Git-Verse (the game) — `/game`

An interactive Git escape room students play *while* doing the real work.
Ten chapters across two acts, each gated behind a real Git command typed into a
simulated terminal. Nothing unlocks until the command is right.

### Act I — before lunch

| Ch | Codename | Teaches | Gate |
| -- | -------- | ------- | ---- |
| 0 | Suit Up | Install + identity | `git --version` → `user.name` → `user.email` |
| 1 | The Heist | Fork & clone | `git clone https://github.com/...` |
| 2 | Weave the Suit | HTML + internal CSS | The Suit Weaver (live preview) |
| 3 | Gather Web Fluid | Staging | `git add .` |
| 4 | Lock the Timeline | Commits | `git commit -m "..."` |
| 5 | Open the Portal | Push & PR | `git push` → PR button |

**Chapter 0 exists to protect your schedule.** Without `user.name` / `user.email`
set, Chapter 4 fails for every student simultaneously with *"Please tell me who
you are"* — the single most common way a beginner workshop loses 20 minutes.

### Act II — the afternoon boss fight

Self-contained: every student generates their own merge conflict on their own
machine. No organizer timing, no `upstream` remote, nothing to coordinate.

| Ch | Codename | Teaches | Gate |
| -- | -------- | ------- | ---- |
| 6 | Split the Timeline | Branching | `git checkout -b symbiote` → add → commit |
| 7 | Collide the Timelines | Merging | `git checkout main` → commit → `git merge symbiote` |
| 8 | Purge the Symbiote | Conflict resolution | The Conflict Forge (in-browser) |
| 9 | Seal the Timeline | Merge commit + push | `git add .` → commit → `git push` |

**The creative task:** on the `symbiote` branch students rewrite their own
Spider-ID as their villain alter-ego (dark alias, black suit, corrupted skills).
Back on `main` they write their upgraded hero form. Both edits touch the same
lines, so the merge conflicts *by construction* — and the conflict is about
their own identity, which is a much better story than a conflict over lorem text.

**The Conflict Forge** (`components/game/ConflictForge.tsx`) shows real
`<<<<<<< HEAD` markers in an editable pane and validates three things live:
markers removed, JSON still parses, exactly one identity left. Students can fail
it endlessly with zero risk to their repo — then do the real one in 90 seconds.

### Engine notes

Levels can chain multiple terminal checks via `stages` (see Chapter 0), so a
single chapter can teach a sequence. `getStages()` in `data/levels.ts`
normalises single- and multi-check levels into one code path.

Built in: XP bar, chapter rail split by act, miss counter, Lyla's progressive
hints (vague first, exact answer last), near-miss coaching that names the
*specific* mistake (`git fork` isn't real; `git pull` is the wrong direction;
bare `git commit` traps you in vim; `git branch` doesn't switch), terminal
history via ↑/↓, easter eggs (`sudo`, `whoami`, `git blame`), and progress saved
to `localStorage` so a refresh mid-event doesn't wipe anyone.

**Before the event:** set `REPO_URL` in [`data/levels.ts`](data/levels.ts) to
your real repo. It drives the Chapter 1 link and the final "Submit PR" button.

## 🗓️ Running the event (11:00–16:00)

| Time | |
| ---- | -- |
| 11:00–11:20 | Story hook, demo the game on the projector |
| 11:20–11:50 | **Chapter 0 gate** — nobody moves on until `git --version` answers |
| 11:50–12:50 | Act I (Chapters 1–5) |
| 12:50–13:15 | Merge PRs live, reveal the roster on the big screen |
| 13:15–14:00 | Lunch |
| 14:00–14:15 | Peer review warm-up — review the PR of the person beside you |
| 14:15–15:05 | Act II (Chapters 6–9) |
| 15:05–15:25 | Speedrun leaderboard for the fast finishers |
| 15:25–16:00 | Final roster reveal, prizes |

Realistic completion for a true beginner: **~40 min** with a prepared laptop,
**~1h50** from zero. Plan around the slowest 20%, not the median.

## 🧑‍💻 Run it locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run validate  # same check CI runs
npm run build
```

## 🏗️ How it works

- `utils/getData.ts` reads `/spider-society/*.json` with Node's `fs` at **build time**
  (skipping `_template.json`), validates each entry, and skips malformed ones so a
  single bad PR can never break the live site.
- `app/page.tsx` is a static Server Component that calls it and renders the grid.
- `components/SpiderCard.tsx` is the client card: Framer Motion 3D tilt, a cursor
  glare and glow driven by `suitColor`, and the avatar from
  `https://github.com/<username>.png`.
- Avatars use `unoptimized` images so Vercel's image budget stays free regardless
  of roster size.

## ▲ Deploy

Import the repo on Vercel and hit deploy — defaults are correct. Every merge to
`main` triggers a rebuild, which re-reads the folder and regenerates the roster.

## 🎨 Theme tokens

Classic Spider-Man, deliberately restrained — suit red on suit black, with
web-silk for type. Defined in `tailwind.config.ts`: `ink` (blacks), `web`
(red / scarlet / crimson / blood / ember), `silk` (whites), and `signal`
(ok / warn / bad) which is reserved for state and never used decoratively.

All Spider-Man iconography in `components/SpiderArt.tsx` — the emblem, mask,
and webbing — is original SVG geometry drawn for this project. No Marvel
artwork is bundled, which keeps the site safe to publish publicly.
