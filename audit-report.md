# Mobile Lighthouse audit

## Baseline

- Site: https://1m1b-ipu-chapter.websapp.workers.dev/
- Run date: 2026-10-18
- Profile: Lighthouse 12.8.2 mobile emulation, Moto G Power (2022), Android 11
- Scores: Performance 99, Accessibility 90, Best Practices 100, SEO 92
- Raw report: [audit-evidence/lighthouse-mobile-before.json.gz](audit-evidence/lighthouse-mobile-before.json.gz)

## Three issues fixed

1. **Broken mobile navigation target.** The footer's “About Us” link pointed to #about, but no element had that ID. Added the target to the vision and mission section.
2. **Invalid robots.txt endpoint.** The live Worker returned app HTML at /robots.txt; Lighthouse reported 912 parsing errors. Added a plain-text public/robots.txt.
3. **Broken Open Graph URL.** The metadata pointed to a Vercel URL that returned 404. Updated it and the canonical URL to the live Workers site.

Additional cleanup: removed six LinkedIn buttons that pointed to the generic LinkedIn homepage instead of individual profiles; no profile URLs were available to verify.

## Performance follow-up

- Baseline Lighthouse flagged render-blocking CSS, with 57 ms estimated savings.
- An experiment to defer the stylesheet removed that warning but caused CLS 0.129 on the Preview; Lighthouse identified main.main-content as the shifting element. I reverted that change to avoid the layout shift.
- Matching Lighthouse 13.5.0 mobile runs on production scored 100 twice (CLS 0; LCP 0.9 s and 1.1 s).
- After the stylesheet revert, Preview runs scored 74 (LCP 6.8 s) and 79 (LCP 5.5 s), both with CLS 0. Lighthouse identified the animated hero metric counter as the LCP element, with 2.26–3.39 s of element render delay.
- An intermediate Preview run with deferred CSS scored 95, but had CLS 0.129; that implementation was discarded.
- These lab scores varied across runs, so this report does not claim an overall performance improvement. The final Preview still reports render-blocking requests (estimated 300 ms savings) and image-delivery opportunities (estimated 1,818 KiB savings).

## Result links

- [Final Preview run: Performance 79](https://pagespeed.web.dev/analysis/https-codex-1m1b-mobile-audit-1m1b-website-localhost-83c-workers-dev/k13iw1jahp?form_factor=mobile)
- [Other final Preview run: Performance 74](https://pagespeed.web.dev/analysis/https-codex-1m1b-mobile-audit-1m1b-website-localhost-83c-workers-dev/jb7wtfrevl?form_factor=mobile)
- [Production reference run: Performance 100](https://pagespeed.web.dev/analysis/https-1m1b-ipu-chapter-websapp-workers-dev/wu1o6sl9ql?form_factor=mobile)
- [Intermediate deferred-CSS run: Performance 95](https://pagespeed.web.dev/analysis/https-codex-1m1b-mobile-audit-1m1b-website-localhost-83c-workers-dev/fne3z00brs?form_factor=mobile)

## Validation

- Vite production build completed successfully.
- Cloudflare Preview: https://clean-audit-fix-1m1b-website.localhost-83c.workers.dev/
- Preview smoke-check: homepage rendered, footer “About Us” targets #about, and /robots.txt displays the expected plain-text directives.
