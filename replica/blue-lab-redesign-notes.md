# KARY STORE — BlueLab-inspired redesign

## Scope
Visual redesign for KARY STORE based on the public BlueLab reference. This is an original KARY implementation, not a copy of BlueLab source or assets.

## Branch
`replica/kary-bluelab-redesign`

## Implemented
- Added a dark navy / electric blue visual system in `assets/kary-bluelab-theme.css`.
- Added a responsive hero CTA row and trust markers through `assets/kary-bluelab-interactions.js`.
- Added a dynamic KARY Digital Lab category launcher that reads the existing category buttons rendered from Supabase.
- Added visual styling for existing catalog cards, search, filters, product modal, cart, checkout, support, profile, bottom navigation and publisher mode.
- Preserved existing HTML commerce/auth flows and existing Supabase endpoints; no database schema or Edge Function changes.
- Linked the new CSS and JS from `index.html`.

## Validation
- Inline JavaScript syntax: PASS.
- Enhancement JavaScript syntax: PASS.
- CSS brace balance: PASS.
- CSS/JS references in index: PASS.
- Production branch `main` was not modified.
- No production deployment performed.

## Not yet validated
- Real browser rendering at mobile and desktop widths.
- Full interaction regression test on the live Supabase project.
- Real preview deployment. GitHub Pages settings were not changed.


## Stage 2 — functional catalog and trust content
- Added working filters for discounted products, favorites, and maximum price.
- Unified product card rendering so catalog and recently viewed cards share the same actions.
- Added a persistent recently viewed list (up to 8 products) with a clear-history action.
- Expanded the product detail modal with the product image, category, description, sales count, and pricing.
- Added a three-step purchase explainer and FAQ section.
- Kept all new behavior client-side; no new Supabase calls, schema changes, Edge Function changes, or payment changes.
- Re-ran JavaScript syntax checks for the inline app and enhancement scripts, plus CSS brace-balance checks: PASS.
- GitHub compare confirms the work remains isolated on this branch; `main` remains unchanged.
- Browser rendering and live purchase/auth regression testing are still pending; no deployment performed.


## Isolated browser QA setup
- Added `tests/kary-browser-check.cjs` with mocked catalog data and Playwright coverage for catalog rendering, discount/favorites/price filters, search, product details, recently viewed history, mobile horizontal overflow, uncaught page errors, and desktop/mobile screenshots.
- Added `.github/workflows/kary-browser-checks.yml` to run checks on pushes, pull requests to `main`, or manual dispatch; screenshots are retained as a 7-day workflow artifact.
- Opened draft PR #1 for review and isolated testing: https://github.com/andrejkolesnik78023-a11y/kary-store/pull/1.
- No merge, production deployment, GitHub Pages settings change, custom-domain change, or Supabase schema/Edge Function change.
- Workflow execution has not yet been confirmed in this session. Playwright uses mocked Supabase REST responses; real authentication, checkout, and payments are intentionally outside this test suite.
