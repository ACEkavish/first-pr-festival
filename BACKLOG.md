# Backlog — polish queue for the loop

Worked top-down. Each item is small enough to finish and verify in one pass.

## Next up
- [ ] **GitHub verification badges** — blocked on the real REPO_URL. See the
      design in the conversation: `app/api/verify` + server-side token, bonus
      badge never a gate.
- [ ] **Web-swing cursor** — a faint strand trailing the pointer. Deliberately
      last: it competes with the terminal caret for attention.
- [ ] **Per-chapter `/game/[chapter]` routes** so facilitators can deep-link.

## Later
- [ ] Live roster ↔ game link: after a PR merges, show that student's card.
- [ ] `/leaderboard` from static JSON (fastest clears, fewest misses).
- [ ] OG image per Spider-ID for sharing.
- [ ] Lighthouse + a11y pass (focus rings, aria-live on terminal output).
- [ ] Printable one-page cheat sheet matching the five chapters.

## Done
- [x] Identity gate — Spider-Alias + GitHub username captured once, then
      substituted into every chapter ("spider-society/JayNaik.json").
- [x] Facilitator projector view at /game?facilitator=1 (arrow-key driven).
- [x] Copy-to-clipboard on Field Ops commands and the expected-command block.
- [x] Web Audio cues, off by default, persisted toggle in the HUD.
- [x] Reduced-motion pass incl. the JS-driven confetti.
- [x] Comic SFX burst (THWIP!/SNIKT!/BAMF!/KRAK!/WEB-LOCK!) on correct commands.
- [x] Spider-sense red shockwave on wrong commands, alongside the shake.
- [x] RUNBOOK.md — organizer guide: pre-work email, run of show, ranked failure
      modes with fixes, merge workflow, facilitator tips.
- [x] In-chapter "Stuck?" panels (troubleshoot data on 7 chapters), including the
      full push-auth / PAT flow in Chapter 5.
- [x] /cheatsheet — printable one-pager for all 10 chapters + print stylesheet.
- [x] Chapter 0 (Suit Up) with chained multi-command stages engine.
- [x] Act II: Ch 6-9 symbiote arc, Path A self-contained merge conflict.
- [x] Conflict Forge — in-browser conflict resolution with live validation.
- [x] Classic red/black Spider-Man retheme across game + roster; original SVG
      emblem/mask/webbing in components/SpiderArt.tsx (no Marvel art bundled).
- [x] Web-shot chapter transition, swing-in mission log, CSS-driven entrances.
- [x] Phases 1–4 of the game spec (state, split-screen, terminal engine,
      5 levels, theming, transitions).
- [x] Roster site (`/`) with fs-based JSON parsing + CI validation.
