# Project State — 1M1B IPU Chapter Website

> Living document. Update the audit sections when the stack or features change;
> **append new entries at the end of the Journal section** (see format there).
> Last audited: 2026-10-04 (branch `aaryandev`; see §4 Phases 7–9 and §5b for
> conventions added since).

---

## 1. Overview

Static marketing/site for the **1M1B (One Million For One Billion) IPU Chapter** — a
UN-accredited non-profit's university chapter at GGSIPU. Single-page tabbed layout
(Home / Events / Team / Green Internship / Publications) with a footer, stats modal,
event modals, and full light/dark theming.

- **Live URL:** https://1m1b-website.vercel.app/ (deploys from `main`)
- **Repo layout:** Vite root = repo root; static assets in `imgs/`, generated data in `public/`

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Build tool | **Vite 8.3** | `vite.config.js` is bare (no plugins); `index.html` is the entry |
| Language | **Vanilla JavaScript** (ES modules, no framework) | Single script `src/main.js`, loaded as `type="module"` |
| Styling | **Plain CSS + custom properties** | Single file `src/style.css` (~3k lines); theming via `:root` (light) / `[data-theme="dark"]` token blocks |
| Typography | Native OS font stacks (`--font-main` / `--font-display` / `--font-mono`) | Zero webfont network cost |
| Linting | **oxlint** | `npm run lint` |
| Node runtime | fnm-managed Node (v24) | `npm run dev` / `predev` / `prebuild` / `build` / `preview` |
| Data generation | `scripts/generate_stats.cjs` (Node, no deps) | Runs automatically via `predev`/`prebuild`; queries GitHub Search-Commits API by author email → writes `public/stats.json` |
| Data | `public/stats.json` | Contributor commit stats, fetched at runtime by the Site Stats modal (`fetch('/stats.json')`) |
| Hosting | Vercel (per OG meta) | Also a committed `dist/` build output in repo history |
| Version control | Git + GitHub (`1m1b-projects`), PR workflow | Current branch: `aaryandev`; default: `main` |

## 3. Code Map

```
index.html                  # Entire markup: header/nav, 5 tab sections, footer, 2 modals
                            #   Events grid is an empty <div id="events-grid"> — cards are
                            #   rendered from data (see src/events-data.js)
src/main.js                 # All behavior (no framework):
                            #   tab router w/ history hash + popstate
                            #   home: hero CTA tab-jump ([data-jump]), scroll
                            #     reveals (.reveal), card cursor spotlight
                            #   theme toggle (localStorage 'theme', smooth cross-fade)
                            #   impact-metrics count-up (IntersectionObserver)
                            #   event cards render + story modal (data from events-data.js)
                            #   team filter + live search + empty state
                            #   stats modal (loads public/stats.json)
src/events-data.js          # Single source of truth for Events: one fixed-schema object
                            #   per event (card fields + optional story fields). To add an
                            #   event, append an entry here — schema doc comment at top.
src/style.css               # All styles; two token themes + .theme-anim cross-fade
scripts/generate_stats.cjs  # predev/prebuild hook → public/stats.json
imgs/                       # Events, OBs (24-25, 25-26), mentors, QR codes, logo
public/stats.json           # Generated (do not hand-edit)
dist/                       # Committed build output
```

## 4. Phase-wise Improvements (from git history + working tree)

### Phase 1 — Bootstrap (2026-07-16)
- First commit and basic site template (Bhuwan-007): tabbed single-page layout,
  header/footer, hero, events grid.

### Phase 2 — Contact & Social (2026-07-20 → 07-29, PR #5)
- `issue-1-contact-update` branch merged: contact details, social media links
  (LinkedIn / Instagram / WhatsApp), and QR codes in the footer.

### Phase 3 — Events content (2026-07-30)
- Event page filled out: 7 event cards (Gen-AI Summit, CSR & ESG, META collab,
  LLM workshop, Skills-to-Careers, Pitchmela, founder podcast) + event modal.

### Phase 4 — Team content (2026-08-11)
- OB photos uploaded (2024-25 & 2025-26 tenures) and Executive Committee roster
  entered (32 execom chips).

### Phase 5 — Structure & stats workflow (2026-09-12)
- Storage refactor: assets organized under `imgs/<category>`, data moved to `public/`.
- Added `scripts/generate_stats.cjs` + `predev`/`prebuild` hooks for contributor stats.

### Phase 6 — Theming overhaul (2026-10-04, current branch `aaryandev`, uncommitted)
- Fixed light-mode contrast: footer "Quick Links" heading and hero title (were
  dark-on-dark via the global `h1..h6 { color: var(--text-heading) !important }` rule),
  metric "+" sign, card borders.
- Fixed dark-mode footer description contrast (new `--footer-text-muted` token).
- Formalized two separate theme token palettes: new `--card-border`,
  `--footer-heading`, `--footer-text-muted` tokens in `:root` and `[data-theme="dark"]`.
- Added smooth 400ms color cross-fade on theme toggle (`html.theme-anim`, applied
  only during toggles; respects `prefers-reduced-motion`).

### Phase 7 — Events page fixes & story modal (2026-10-04, uncommitted)
- Fixed undefined utility classes (`.text-center`, `.mb-10`) and missing event-image
  CSS; events grid now `repeat(auto-fit, minmax(300px, 1fr))`.
- Rebuilt the "Read More" popup as `.story-modal` (hero + scrim + tag/meta, scrollable
  structured story, highlights panel, Prev/Next nav, progress bar, Esc/scroll-lock/
  focus handling, full-screen on mobile, dark-mode safe).
- Data refactor: `src/events-data.js` now drives both the cards and the modal;
  `index.html` events markup reduced to one empty grid div.

### Phase 8 — Internship page overhaul (2026-10-04, uncommitted)
- Hero: fixed green→teal gradient (was flipping token bg that made desc text
  invisible in dark); pill badge for "Supported by"; white title via
  specificity-raised `!important` override (font-size kept in a separate rule so the
  3rem desktop media query still applies — see §5b gotcha #2).
- Framework steps: tinted cards + `--step-accent` top bars + numbered badges
  (700-weight accents in light, deep tints in dark); benefit cards themed.

### Phase 9 — Publications page overhaul (2026-10-04, uncommitted)
- Q&A card: fixed navy→green gradient (was flipping `--primary-blue` bg → ~1.2:1
  text in dark); white h3 via `!important` override; serif quote watermark.
- Badge dark-on-green (was white-on-green 1.9:1); article cards themed + hover;
  byline colors fixed; submit card/button given dark variants + focus ring.
- Pub header date restyled as a themed pill; h2 explicitly `var(--primary-blue)
  !important` (global heading rule was silently overriding it).

### Phase 10 — Home page "WOW" redesign (2026-10-04, uncommitted)
- Hero rebuilt as a fixed-brand aurora surface (hard-coded navy gradient + three
  blurred drifting aurora blobs + masked dot grid; identical in both themes):
  glass credential badge with pulsing dot, kinetic gradient "1M1B" display title
  (`background-clip: text` with white fallback via `@supports`), spaced-caps
  subline, green kicker with side rules, staggered entrance animations (masked
  word-rise + fade-up — all inside `prefers-reduced-motion: no-preference`).
- Added the site's first hero CTAs: "Join the Movement" (WhatsApp) + glass
  "Explore Our Events" (`data-jump` → `switchTab` via main.js).
- Impact metrics moved inside the hero as a glass band (`.hero-stats`, id
  `impact-metrics` preserved so the count-up IntersectionObserver still drives
  it). Resolves audit issue #4: the old `.hero .desc` used the flipping token
  `--primary-blue-light` on a fixed gradient → unreadable in dark mode.
- New kinetic marquee ribbon under the hero (aria-hidden, 4 duplicated sets,
  `translateX(-50%)` loop, hover pause, edge-fade mask, static under reduced
  motion).
- Vision/Mission + Goals cards: gradient icon tiles, gradient top bars, "Our
  Purpose" eyebrow; staggered scroll-reveal system (`html.reveal-ready` gate →
  content visible without JS; IntersectionObserver adds `.revealed`).
  (Follow-up same day: the cursor spotlight was replaced by a constant frost
  shimmer, the marquee + eyebrow animate unconditionally, and the goals grid
  went 2-column on mobile — see journal.)
- WCAG audit both themes: all new pairs ≥5.7:1 (fixed hero surface ≥6.6:1,
  gradient text stops ≥6.56:1); verified light/dark desktop + 390px mobile;
  oxlint clean; `vite build` passes.

## 5. Current State & Known Issues (audit findings)

**Working tree (uncommitted on `aaryandev`):** `index.html` (events grid div, story
modal markup), `src/main.js`, `src/events-data.js` (new), `src/style.css`,
`public/stats.json` (generated); untracked `.agents/` (local tooling). All of
today's phases 6–9 are in this uncommitted state — commit/PR when the user asks.

Known issues / improvement candidates found during audit:

1. **`.team-card` vs `.team-card-modern`** — the shared hover rule and dark-card rule
   target `.team-card`, but the markup uses `.team-card-modern`; part of the
   `!important` background/hover block never applies.
2. **`.event-img` class unused** — event card images use `.event-card-img-wrapper`
   instead; the `.event-img` sizing rule is dead code.
3. **`document.write(new Date().getFullYear())`** in footer — blocks parsing; replace
   with a `textContent` set in `main.js`.
4. **Dark-mode home-hero contrast is mediocre** — RESOLVED 2026-10-04 (Phase
   10): the hero is now a fixed navy aurora surface with fixed light text and
   the old token-based `.hero .desc` color is gone.
5. **Placeholder LinkedIn URLs** — team card social buttons all point to
   `https://www.linkedin.com` (placeholders).
6. **`imgs/execom/` is empty** — execom chips use initials, folder is unused (remove
   or populate).
7. **GitHub API rate limits** — `generate_stats.cjs` hits `api.github.com`
   unauthenticated (60 req/hr); fine now, will break quietly if contributors grow.
8. **Stats/error message classes** (`stats-loading`, `stats-error`) are referenced in
   `main.js` but have no CSS rules.
9. **One pre-existing lint warning** (`catch (e)` unused in `generate_stats.cjs`).
10. **Tab content in `index.html`** — PARTIALLY RESOLVED for Events (data now lives in
    `src/events-data.js` and renders via JS). Team roster is still hardcoded HTML; if
    roster edits become frequent, give it the same data-module treatment.

## 5b. Conventions & Gotchas (read before touching CSS/themes)

These caused real bugs; follow them to avoid re-introducing them.

1. **Global heading rule:** `h1..h6 { color: var(--text-heading) !important }` near
   the end of `style.css` overrides ANY plain heading color. To color a heading on a
   colored/fixed surface, use a higher-specificity `!important` rule (e.g.
   `.pub-main-card h3 { color: #fff !important }`). Only ~2 specificities deep is
   needed — `h2`-element selectors lose to any class selector.
2. **Never put `font-size` in the same high-specificity override rule** — it will pin
   the size and defeat responsive media queries (this bit the internship hero title:
   desktop 3rem silently became 1.875rem). Split: color in the override, size in a
   plain low-specificity rule + media query.
3. **Theme tokens flip — don't use them as fixed-surface backgrounds.**
   `--primary-blue`, `--accent-green-dark`, `--accent-green-light` etc. resolve to
   *different colors per theme*. Using them as a background under fixed white text is
   what broke dark mode on three pages. Pattern that works:
   - Fixed brand surfaces (hero cards, Q&A card): hard-coded gradients that never
     change per theme + white/light text.
   - Themed surfaces (cards): `var(--card-bg)` + `var(--card-border)` + theme text
     tokens, with explicit `[data-theme="dark"]` overrides for tinted cards.
4. **Text on `--accent-green` (#4ade80) must be dark** (`#052e16`), never white.
5. **WCAG:** body text ≥4.5:1 in BOTH themes; verify with a computed-style audit
   (sample bg colors, composite rgba, calculate ratios) rather than eyeballing —
   the audit caught two failures the screenshots looked fine at.
6. **Verification workflow:** `npm.cmd` is broken in Git Bash — run vite via the fnm
   node directly: `export PATH="$HOME/AppData/Roaming/fnm/aliases/default:$PATH";
   node node_modules/vite/bin/vite.js --port 5199`. Then browser-check each changed
   page in light + dark + 390px mobile. The in-app browser has
   `prefers-reduced-motion: on` — don't misjudge disabled animations.
7. **Story content lives in `src/events-data.js`** (schema doc at top of file). A new
   event = photo in `imgs/Events/` + one appended object; no HTML/JS changes.

## 6. Journal

> Append entries here on demand — **newest entry at the bottom**, one `- YYYY-MM-DD — ...`
> bullet (or a short paragraph) per work session. Don't rewrite old entries.

- 2026-10-04 — Audited codebase and fixed theme contrast: light-mode footer "Quick
  Links" + hero title, metric "+", card borders; dark-mode footer description. Added
  smooth 400ms theme-toggle cross-fade (`theme-anim` class) with reduced-motion
  support; introduced `--card-border`, `--footer-heading`, `--footer-text-muted`
  tokens across both themes. Verified in-browser (light + dark screenshots, computed
  styles). Created this `project-state.md`.
- 2026-10-04 — Events page: fixed cards overlapping the intro subtitle on hover.
  Root cause: `.text-center` and `.mb-10` utility classes were used in the events
  intro markup but never defined in CSS, so the grid sat flush under the subtitle
  and the 8px hover-lift collided with the text. Defined both utilities
  (2.5rem bottom gap). Verified hover behavior in-browser.
- 2026-10-04 — Events page images: `.event-card-img-wrapper` / `.green-border` had no
  CSS at all, so images rendered at natural 600px size and were clipped abruptly by
  the card's overflow. Added wrapper styles (rounded, `aspect-ratio` 4/3 on narrow /
  portrait screens, 16/9 on desktop ≥768px) with `object-fit: cover` images + subtle
  hover zoom. Switched events grid from fixed breakpoints to
  `repeat(auto-fit, minmax(300px, 1fr))` so cards dynamically fill horizontal space
  at any screen width. Verified at 1440px and 390px viewports.
- 2026-10-04 — Events page "Read More" popup redesigned into a full story modal
  (`.story-modal`): hero image with dark scrim + tag/title/date/location meta,
  scrollable long-form body (lead + `h3` sections, supports up to ~1500-word
  stories), tinted Highlights panel, footer with Prev/Next story nav and chapter
  brand, sticky close button, green reading-progress bar. Rewrote `eventDetails`
  in `main.js` to a structured `{lead, sections[], highlights[]}` format and
  rendered via DOM (textContent, no innerHTML injection). Added Esc-to-close,
  body scroll lock, focus restore to trigger, focus-visible rings,
  reduced-motion fallback, full dark-mode support (old `.modal-content` had
  hardcoded `background: white`), and full-screen layout on mobile. All story
  `h2/h3` color overrides use higher-specificity `!important` to beat the global
  heading rule. Verified in-browser: desktop light + dark, mobile 390px,
  next/prev/Esc behavior.
- 2026-10-04 — Events page refactor for easy story additions: created
  `src/events-data.js` as the single source of truth — one fixed-schema object
  per event (id/title/date/tag/location/image/imageAlt/accent/cardDesc +
  optional story fields lead/sections/highlights), with a how-to-append
  comment block at the top. `main.js` imports it and renders both the event
  cards grid (`#events-grid`, new id, added to index.html) and the story modal
  from the same array; "Read More" button only renders when a story exists;
  modal lead hidden when absent. Removed the 7 hardcoded cards from
  index.html and the inline `eventDetails` object from main.js. Verified:
  all 7 cards render identically, story modal unchanged, `vite build` passes.
- 2026-10-04 — Internship (#internship) page contrast + visual overhaul:
  Hero switched from `--accent-green-dark` bg (invisible desc text in dark mode
  — `--accent-green-light` resolves to the same #064e3b) to a fixed dark
  green→teal gradient; title forced white via `.intern-hero .intern-hero-content
  h2` (high specificity beats global h2 !important; font-size kept in a
  separate low-specificity rule so the 3rem desktop media query still wins);
  "Supported by" line restyled as a translucent pill; desc now rgba white
  (~8:1 on darkest stop). Framework steps: candy fills (white text on #facc15
  etc.) replaced by theme-tinted cards with --step-accent top bar + numbered
  badges (light accents are 700-weight hues, audited ≥4.5:1; dark uses deep
  tints + 400-weight accents, ≥5.6:1). Benefit cards: hardcoded white →
  var(--card-bg)/--card-border, gradient top accent, hover lift; dark-mode
  safe. WCAG audit run in both themes via computed styles (all pairs ≥4.5:1
  for normal text); verified desktop light/dark + mobile 390px.
- 2026-10-04 — Publications page contrast + visual overhaul: main Q&A card
  background switched from flipping `--primary-blue` token (bright #3b82f6 in
  dark → white/qa text ~1.2–3:1) to a fixed navy→green gradient with a serif
  decorative quote glyph; h3 forced white via `.pub-main-card h3 !important`
  (beats global heading rule). Badge white-on-green (1.9:1) → dark #052e16 on
  green (8.5:1). QA items got green left-border quote styling. Article cards:
  hardcoded white → var(--card-bg)/--card-border + hover lift; byline #9ca3af
  → themed passing colors. Submit card: light-only pastels got a dark variant
  (#052e16 + green accents); submit button fixed to green-700 #15803d (white
  text 5:1 both themes) + focus-visible ring. Pub header date restyled as a
  themed pill; h2 explicitly var(--primary-blue) !important (was silently
  overridden to --text-heading by the global heading rule). WCAG audit passed
  all pairs in both themes; verified desktop light/dark + mobile 390px.
- 2026-10-04 — Home page visual redesign ("WOW" pass from 2026 trend research:
  aurora/mesh gradients, kinetic typography, glassmorphism, bento stat bands,
  marquees, cursor spotlight, scroll reveals). Hero rebuilt as a fixed navy
  aurora surface (three drifting blurred blobs + masked dot grid, identical in
  both themes) with a glass credential badge (pulsing dot), kinetic gradient
  "1M1B" display title (background-clip:text + @supports white fallback),
  spaced-caps "IPU CHAPTER" subline, green kicker with side rules, and
  staggered masked word-rise/fade-up entrances. Added the site's first hero
  CTAs: "Join the Movement" (WhatsApp) + glass "Explore Our Events" (data-jump
  → switchTab in main.js). Impact metrics merged into the hero as a glass band
  (kept id impact-metrics → count-up still fires) — also fixes §5 #4 (old
  `.hero .desc` used a flipping token on a fixed gradient, unreadable in dark).
  New marquee ribbon under the hero; Vision/Mission + Goals cards got gradient
  icon tiles, gradient top bars, "Our Purpose" eyebrow, and a cursor spotlight
  (mousemove --x/--y, hover-capable pointers only). Staggered reveal-on-scroll
  via IntersectionObserver gated behind `html.reveal-ready` (content visible
  without JS), per-card `--d` delays. Every new animation block lives inside
  `prefers-reduced-motion: no-preference` (reduced-motion users see final
  states; the IAB browser's reduced-motion made static verification the
  expected path). WCAG computed-style audit: all new pairs ≥5.7:1 in both
  themes (hero fixed surface ≥6.6:1, gradient text stops ≥6.56:1). Verified
  light+dark desktop and 390px mobile; CTA jump to #events works; oxlint 0
  warnings/0 errors; `vite build` passes.
- 2026-10-04 — Home motion follow-up (user request): marquee now animates
  unconditionally (was gated behind prefers-reduced-motion — the IAB browser
  has reduced-motion on, so it looked static to the user). Cursor-spotlight
  glow removed (CSS ::after rules + mousemove JS) and replaced by a constant
  "frost shimmer": a skewed frosted-glass band (white gradient +
  `backdrop-filter: blur(3px)`) sweeping every `.card-vm`/`.goal-card` on a
  5s loop, staggered 2.5s on mission/even cards. "Our Purpose" eyebrow gets a
  gentle `floatBob` (-4px, 3.5s). Goals grid is 2-column from the smallest
  screens up (compact goal-card styles under 640px; 4-col ≥1024px). NOTE:
  these three effects intentionally ignore prefers-reduced-motion (explicit
  user request); all other entrance/reveal animations remain gated.
  Verification gotcha: the IAB kept serving a stale cached style.css (page
  reloads loaded the old copy while `fetch(url)` returned fresh content);
  swapping the stylesheet link to a cache-busted href in the live DOM
  confirmed the new rules. oxlint clean; `vite build` passes.
- 2026-10-04 — Frost shimmer refinement (user request): the shimmer is now
  hover-only — the ::after band defaults to `opacity: 0` +
  `animation-play-state: paused`, `:hover` sets opacity 1 + running, so the
  sweep pauses and fades (0.35s opacity transition) when the cursor leaves and
  resumes from where it stopped on re-hover. Band width reduced 42% → 20% of
  card width (a narrow glint) with a continuous 2.2s linear loop
  (`left: -30% → 115%`, no pause rhythm) and the old 2.5s sibling stagger
  removed (each card sweeps under its own cursor). Verified via computed
  styles (paused/opacity 0 idle; running/opacity 1 on hover) and a screenshot
  showing the glint mid-card on the hovered Vision card while Mission stayed
  clean.
- 2026-10-04 — Content tweaks: hero badge now reads "UN-Accredited Non-Profit •
  GGSIPU" (dropped "Chapter"); all three Join CTAs (desktop nav "Join Us",
  mobile nav join button — renamed from "Join Us on WhatsApp", hero "Join the
  Movement") point to the chapter's Google Form instead of the WhatsApp chat.
  Footer WhatsApp social card intentionally still links to WhatsApp. Verified
  live (badge text + both hrefs).
- 2026-10-04 — Merged origin/main (a5eac97 "major ui changes" by Bhuwan-007)
  into aaryandev, resolving all 3 content conflicts (index.html, src/main.js,
  src/style.css) with `checkout --ours` to keep this branch's architecture.
  Rejected from main: leaf-curtain tab transition + parallax hills +
  wind-leaves background (3 unconditional full-page rAF loops, ~460 canvas
  sprites redrawn per frame forever, 4x 100vw will-change layers, universal
  backdrop-filter blur) and its 2x1.5s forced tab-switch lockout; also its
  inline `eventDetails` duplicate of src/events-data.js. Kept from main: the
  higher-res newsletter scans — git rename-detection auto-merged them into
  imgs/Events/, then re-encoded q88 WebP (1.79MB/1.28MB PNG → 342KB/309KB,
  same 1414x2000 dims) and updated the 4 index.html refs to .webp. `.agents/`
  now in .gitignore. Main's changes remain intact on the main branch; if its
  UI is ever wanted, port hero-canvas first (gate it with IntersectionObserver).
- 2026-10-04 — Dark-by-default + truncated-name tooltips (user request): an
  inline <head> script sets data-theme="dark" pre-paint when localStorage has
  no saved `theme` (kills the light flash; main.js fallback now also applies
  dark and persists it — explicit light toggle still wins). Added a shared
  .name-tooltip element: on execom chip mouseenter, main.js checks
  scrollWidth/Height > clientWidth/Height on .execom-chip-name and only then
  shows the full data-name in a fixed pill above the chip (flips below near
  the viewport top; hides on scroll/resize/mouseleave). Verified in IAB:
  fresh visit renders dark, "Rudra Pratap Singh" + "Aryan Shekhar Vats" chips
  (the two ellipsized ones at 800px) show the tooltip at opacity 1,
  non-truncated chips show nothing, and the light toggle still persists.
- 2026-10-04 — Fixed hosted-site images (all viewports, noticed on mobile):
  the Cloudflare Worker serves the vite `dist/` bundle, and `dist/` only
  mirrors `public/` — `imgs/` lived at the repo root, so every raw-path image
  (events, OBs, qrcodes, logo, newsletter scans) returned the SPA-fallback
  HTML with 200/text-html, fired each <img>'s onerror, and showed the
  placehold.co/alt fallback. Fix: moved `imgs/` into `public/imgs/` (vite
  copies it to dist; all references were relative and unchanged). Windows
  dir-lock (dev server held imgs/) forced per-child git mv; git flattened
  OBs/24-25 into OBs/ — restored. Verified: mobile-viewport (390px) event
  images all load, 13/13 OB photos load, dist/imgs populated after build.
  Lesson: anything referenced by raw path must live under public/.
- 2026-10-06 — Home-page performance pass (user: "sluggish, marquee strip and
  other elements janky"). Root causes found in the continuous-animation layer,
  not the marquee itself: (1) three aurora hero blobs carried `filter:
  blur(70px)` — three huge always-repainted layers; the radial gradients
  already fade to transparent so the blur was dropped, transform-only drift
  kept. (2) `heroGradShift` animated `background-position` on the
  gradient-clipped h1 — full text repaint every frame for a barely-visible
  shift; gradient is now static. (3) marquee track got explicit `will-change:
  transform` so the infinite translate never re-rasterizes. (4) Metrics
  counter rewrote innerText from one 20ms setInterval per metric; replaced
  with a single rAF loop + ease-out. Load-path: Chromium fetches
  `loading="lazy"` imgs even inside `display:none` tabs (verified via
  performance entries — all 25 fetched before load), so hidden-tab images now
  use `data-src` and are hydrated by switchTab on first open + an idle
  warmer (requestIdleCallback, one file per slot, then /stats.json prefetch)
  — initial home load fetches nothing it can't see and tab switches hit
  cache. Also: removed empty `src=""` on story-modal img, replaced footer
  `document.write` year with a JS-set span, QR codes stay `loading="lazy"`.
  Verified in IAB: pre-load img fetches dropped 25→3, all tabs render, story
  modal image loads, counters animate. NOTE: `public/imgs/logo/1M 1B.png`
  (6.2MB) is referenced nowhere in the repo; user reviewed on 2026-10-06 and
  asked to keep it — do not delete.
- 2026-10-06 — README rewritten from a bare one-liner into full docs: tech
  stack (vanilla HTML/CSS/JS + Vite 8 + oxlint, zero runtime deps), setup &
  npm scripts, annotated project structure, how tabs/events/theme/stats
  work, the data-src image-loading pattern (incl. why `loading="lazy"` is
  insufficient in hidden tabs), the aaryandev→main release flow, and the
  "raw-path assets must live under public/" deploy rule. Same session:
  pushed both branches — origin/main and origin/aaryandev fast-forwarded
  631803b → 86b5e4e (perf pass + README), so the Cloudflare Worker deploy
  now serves the optimized build (dist bundles: index-BKRrMnw0.css /
  index-BTdTof8l.js). Known stale bits flagged, unfixed by choice:
  og:url/og:image meta still point at the old vercel.app domain and a
  placehold.co image; footer QR PNGs (~1.8MB) uncompressed.
