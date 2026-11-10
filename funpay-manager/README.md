# KARY FUNPAY MANAGER

Separate interface for preparing and publishing FunPay listings.

## Stage 0.1 — frontend
- Responsive listing form.
- Fields: title, category, subcategory, price, quantity, description.
- Local image preview.
- Save and restore drafts in the current browser.
- Live publishing is disabled until secure FunPay authorization is implemented.

## Free-tier architecture
- Frontend: GitHub Pages (served from this repository's `funpay-manager/` folder).
- Backend: Supabase Edge Functions in the existing Supabase project.
- Database/storage: Supabase Free quotas, with KARY-specific tables/namespaces kept separate from the store.

## Backend scaffold
The `kary-funpay-manager` Edge Function is deployed with JWT verification enabled. It currently supports:
- `health`
- `connection_status`
- a safe `publish` placeholder returning HTTP 501

No FunPay credentials are accepted or stored yet. This is intentional.

## Security requirements before live publishing
- Never store Golden Key, cookies, passwords, or tokens in the public frontend, localStorage, or Git.
- Store account secrets only server-side in a suitable secret store or encrypted per-user vault.
- Validate owner access, fields, CSRF/session state, and rate limits on the server.
- Show a final preview and require explicit confirmation before publishing.
- Never expose Supabase service-role keys in browser code.

## Next implementation stage
1. Connect the frontend to Supabase Auth so only the owner can use the manager.
2. Add a secure account-session connection flow and account verification.
3. Load categories and required fields from FunPay dynamically.
4. Create/save a listing and return its real ID and URL.
5. Enable publishing only after the adapter is tested against the current FunPay behavior.

FunPay integrations outside an official supported API are unofficial and may break when the marketplace changes. Check compatibility and platform rules before enabling live publishing.
