# 1M1B IPU Chapter — Website

Official site of the **1M1B (One Million For One Billion) IPU Chapter** — a
UN-Accredited non-profit student chapter at GGSIPU empowering youth to become
leaders and changemakers through SDG-aligned projects.

The site is a single-page, dependency-free vanilla web app: five tabbed
sections (About Us / Home, Events, Team, Green Internship, Publications),
dark mode by default, and a lightweight animation layer.

## Tech Stack

| Layer      | Choice                                                | Why |
|------------|-------------------------------------------------------|-----|
| Markup     | Plain HTML (`index.html`)                             | All sections live in one document; tabs are toggled with CSS classes |
| Styling    | Hand-written CSS (`src/style.css`), custom properties | Two token palettes (light/dark) via `data-theme`; no framework, no build-time CSS |
| Behavior   | Vanilla ES modules (`src/main.js`)                    | No framework, no runtime dependencies |
| Data       | `src/events-data.js` (static export)                  | Events cards + story modals render from one array |
| Build      | [Vite](https://vite.dev) (`vite build`)               | Bundles/minifies JS + CSS into `dist/`, copies `public/` |
| Linting    | [oxlint](https://oxc.rs)                              | Fast, zero-config |
| Stats      | `scripts/generate_stats.cjs` (Node)                   | Queries the GitHub API at dev/build time → `public/stats.json` |
| Deployment | Cloudflare Worker serving the `dist/` bundle          | The `main` branch is what's deployed live |

No runtime dependencies — the only packages are dev tooling.

## Getting Started

Prerequisites: [Node.js](https://nodejs.org) 18+ and npm.

```bash
npm install        # install dev tooling (vite, oxlint)
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # lint JS with oxlint
```

Note: `dev` and `build` run `scripts/generate_stats.cjs` first, which hits the
GitHub API to refresh contributor stats. Without network access the previous
`public/stats.json` is reused.

## Project Structure

```
├── index.html              # The whole page: header, 5 tab sections, footer, modals
├── src/
│   ├── main.js             # All behavior: tab switching, events render, modals,
│   │                       #   filters/search, theme toggle, reveals, cache warming
│   ├── style.css           # All styles: token palettes, themes, animations
│   ├── events-data.js      # ← Add new events here (see below)
│   └── assets/             # Assets imported through the bundler (unused mostly)
├── public/                 # Copied verbatim into dist/ — anything referenced
│   └── imgs/               #   by raw path MUST live here
│       ├── Events/         # Event photos + newsletter scans (.webp)
│       ├── OBs/            # Mentor & office-bearer photos (per tenure)
│       ├── logo/           # Chapter logo
│       └── qrcodes/        # Footer social QR codes
├── scripts/
│   └── generate_stats.cjs  # GitHub contributor stats → public/stats.json
├── dist/                   # Build output (what gets deployed)
├── project-state.md        # Engineering journal — conventions & gotchas (§5b)
└── vite.config.js          # Bare config (no plugins)
```

## How the Site Works

**Tabs, not routes.** Every section is a `<div class="tab-content">` inside
`index.html`. `switchTab()` in `src/main.js` toggles the `active` class,
updates the URL hash (`#home`, `#events`, …), and handles back/forward via
`popstate` — deep links like `/​#team` open the right tab.

**Events are data-driven.** Cards and the story modal both render from
`src/events-data.js` — see the header comment in that file for the full field
reference. To add an event, append an object at the top of the array (newest
first) and drop its photo in `public/imgs/Events/`.

**Team content is static markup.** Mentor / office-bearer / execom entries are
written directly in `index.html` (with `data-name` / `data-role` attributes
that power the filter bar and live search).

**Theme.** An inline `<head>` script applies the saved theme (default: dark)
before first paint to avoid a flash. `applyTheme()` in `main.js` persists
toggles to `localStorage`.

**Site Stats modal.** The footer "Site Stats" link fetches `/stats.json`
(generated from the GitHub API) and shows per-contributor commit counts.

## Image Loading & Performance

The home page stays fast by never downloading what it can't see:

- Images inside hidden tabs use `data-src` instead of `src`. Chromium fetches
  `loading="lazy"` images even inside `display:none` containers, so hidden-tab
  images are deferred in markup and hydrated by `switchTab()` when their tab
  opens.
- An idle-time warmer (`requestIdleCallback`) hydrates the remaining images
  one file per idle slot after load and prefetches `stats.json` — tab switches
  then hit the HTTP cache instantly.
- Continuous animations are transform/opacity-only (marquee, aurora drift,
  entrance fades); the metrics counter uses a single `requestAnimationFrame`
  loop. Heavy effects are gated behind `prefers-reduced-motion` — with one
  exception: the marquee deliberately runs unconditionally (chapter's request).

## Deployment

Work happens on the **`aaryandev`** branch; **`main`** mirrors it and is the
live deploy branch (a Cloudflare Worker serves the built `dist/`). Because the
Worker serves only what Vite emits, **every asset referenced by a raw path
(e.g. `imgs/…`) must live under `public/`** — otherwise it 404s into the SPA
fallback.

Release flow: merge/commit to `aaryandev` → build (`npm run build`) → fast-forward
`main` → the Worker picks it up.

## Conventions & Gotchas

- `project-state.md` is the engineering journal — every session appends a
  dated entry there; its §5b lists the standing conventions (heading-color
  `!important` rule, theme-contrast rules, etc.).
- The hero section is a fixed-brand navy surface hard-coded identically in
  both themes — hero text uses fixed light colors, not theme tokens.
- New event photos should be reasonably compressed (newsletter scans are
  q88 WebP) — the deploy bundle mirrors `public/` wholesale.
