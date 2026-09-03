# Organizer Runbook — First PR Festival

Everything you need on the day. Keep this open on your phone.

---

## Before the event

- [ ] Set `REPO_URL` in `data/levels.ts` to the real repo. It drives the
      Chapter 1 link and every "Submit PR" button. **Nothing else needs changing.**
- [ ] Delete the three sample files (`octocat.json`, `gaearon.json`,
      `leerob.json`) from `spider-society/` so the roster starts empty.
- [ ] Deploy to Vercel. Import the repo, accept defaults, done.
- [ ] Confirm the deploy: `/` shows the empty roster, `/game` loads Chapter 0,
      `/cheatsheet` prints cleanly.
- [ ] Print the cheat sheet, one per student.
- [ ] Enable branch protection off / merges on — you'll be merging fast.
- [ ] Send the pre-work email (below) **48 hours ahead**. This is the single
      highest-leverage thing you can do.

### Pre-work email

> Before Saturday, please install two things and bring your laptop charged:
> 1. **Git** — https://git-scm.com/downloads (accept every default)
> 2. **VS Code** — https://code.visualstudio.com
>
> Then create a GitHub account at https://github.com and verify your email.
>
> If any of that fails, come at 10:45 and we'll fix it before we start.

Every student who does this saves you ~30 minutes on the day.

---

## Run of show

| Time | What | Watch for |
| ---- | ---- | --------- |
| 11:00–11:20 | Story hook, demo `/game` on the projector | Don't explain Git yet. Sell the story. |
| 11:20–11:50 | **Chapter 0 gate** | Nobody proceeds until `git --version` answers |
| 11:50–12:50 | Act I (Ch 1–5) | Push auth is where they'll pile up |
| 12:50–13:15 | Merge PRs live, roster reveal | The best moment of the day |
| 13:15–14:00 | Lunch | Merge stragglers while they eat |
| 14:00–14:15 | Peer review warm-up | Everyone reviews their neighbour's PR |
| 14:15–15:05 | Act II (Ch 6–9) | Conflict Forge first, real file second |
| 15:05–15:25 | Speedrun leaderboard | Keeps fast finishers busy |
| 15:25–16:00 | Final reveal, prizes | |

**Do not skip the Chapter 0 gate.** Without `user.name` / `user.email` set,
every student hits `*** Please tell me who you are` at Chapter 4 *at the same
moment*, and you lose 20 minutes to one error message.

---

## Merging PRs fast

You'll get ~60 PRs in a 30-minute window. Per PR:

1. CI (`Validate Spider-IDs`) must be green — it checks filename, schema,
   3 skills, hex colour, and duplicate usernames.
2. Confirm it's exactly **one new file** named `<their-username>.json`.
3. Squash and merge.

If CI is red, comment the failure line and let them fix it — that's the lesson.

Vercel rebuilds in ~60–90s per merge. Merge in batches of ten, then refresh the
roster on the projector so cards appear in visible waves.

---

## The failures you will actually see

Ranked by how often they happen. Every one of these is also in the game's own
in-chapter "Stuck?" panel, so point students there first.

### Setup

| Symptom | Fix |
| ------- | --- |
| `git: command not found` | Not installed, or terminal not reopened after installing. Close it fully, open a new one. |
| `xcode-select` popup missing (Mac) | It's hidden behind another window. Find it, click Install, wait. |
| Did my config save? | `git config --global --list` |

### Chapter 1 — clone

| Symptom | Fix |
| ------- | --- |
| `fatal: repository not found` | They copied the ORIGINAL repo URL, not their fork. The fork URL contains their username. |
| "Where did the folder go?" | It cloned into wherever the terminal was. `pwd` on Mac, `cd` on Windows. |
| Can't `cd` in | Type `cd` + first few letters + **Tab**. |

### Chapter 4 — commit

| Symptom | Fix |
| ------- | --- |
| `*** Please tell me who you are` | Skipped Chapter 0. Run the two `git config --global` commands. |
| **Terminal full of text, can't type** | They're in vim. **Esc**, then `:q!`, then Enter. |
| `nothing to commit, working tree clean` | File not saved in VS Code, or already committed. `git status`. |
| Weird quote errors on Windows | Curly quotes from a word processor. Use straight `"`. |

### Chapter 5 — push (**your biggest bottleneck**)

| Symptom | Fix |
| ------- | --- |
| Asks for username + password | GitHub killed password auth in 2021. Their password will never work. |
| **How do I authenticate?** | Git Credential Manager (bundled with Git for Windows) opens a browser — click Authorize. Otherwise a PAT. |
| Creating a PAT | GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate → tick **repo** → copy. Paste as the **password**. GitHub shows it once. |
| Auth fails even with the token | Cached bad credentials. Mac: Keychain Access → search `github.com` → delete. Windows: Credential Manager → Windows Credentials → remove `git:https://github.com`. |
| `no upstream branch` | `git push -u origin main` |
| Pushed but no PR | Pushing only updates their fork. Go to the ORIGINAL repo — green "Compare & pull request" banner. |

**Prepare for this one.** Put the PAT steps on a slide and leave it up during
Chapter 5. Consider walking the whole room through it together rather than
handling 60 individual cases.

### Act II — branch & merge

| Symptom | Fix |
| ------- | --- |
| `pathspec 'symbiote' did not match` | Forgot `-b`. `git checkout -b symbiote` |
| `pathspec 'main' did not match` | Their default branch is `master`. Use that. |
| **"It merged with no conflict!"** | They edited *different* lines on each branch. Redo changing the **same** line (the alias) on both. |
| `Already up to date` | They didn't commit the upgraded form on `main`. Both branches must differ. |
| `local changes would be overwritten` | Uncommitted work. Commit it, or `git stash`. |
| `Committing is not possible… unmerged files` | Resolved but not staged. `git add .` |
| Vim opens on the merge commit | Git pre-fills the message. **Esc**, `:wq`, Enter. |
| "Do I open a second PR?" | No — pushing updates the existing one. |
| Hopelessly stuck mid-merge | `git merge --abort` returns them to before the merge. Nothing is lost. |

### Nuclear option

If a student's repo is beyond saving, don't debug it during the session:

```bash
cd ..
rm -rf <folder>
git clone <their fork url>
```

Two minutes, and they keep their PR. Their commits are already on GitHub.

---

## Facilitator tips

- **Roving, not seated.** Walk the room. Most students won't raise a hand.
- **Point at the "Stuck?" panel** before you debug. It teaches them to self-serve,
  and it's faster than you typing.
- **Never type on a student's laptop.** Read the error aloud and let them fix it —
  reading errors is the actual skill.
- **Fast finishers:** send them to the side quest (add a fictional character via a
  second PR) or make them a floating helper. Peer teaching scales you.
- **Project the roster** whenever it updates. Cards appearing is the reward loop.
- If the venue wifi dies: the game keeps working once loaded (it's static and
  needs no network). Only cloning, pushing and avatars need connectivity.
