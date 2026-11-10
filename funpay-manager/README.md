# KARY FUNPAY MANAGER

Separate interface for preparing and publishing FunPay listings.

## Stage 0.2 — account and cloud drafts
- Supabase Auth email/password registration and sign-in.
- Session persistence handled by the Supabase client.
- Cloud drafts stored in `public.kary_funpay_drafts`.
- Row Level Security restricts every draft to its owner.
- Drafts can be opened and deleted after sign-in.
- Image preview remains local; image upload is not connected.
- Live publishing remains disabled until the FunPay adapter is implemented.

## Stage 0.1 — frontend
- Responsive listing form.
- Fields: title, category, subcategory, price, quantity, description.
- Local image preview.

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
1. Test registration, email confirmation (if enabled), sign-in, and sign-out in the browser.
2. Add a secure FunPay account-session connection flow and account verification.
3. Load categories and required fields from FunPay dynamically.
4. Create/save a listing and return its real ID and URL.
5. Enable publishing only after the adapter is tested against the current FunPay behavior.

FunPay integrations outside an official supported API are unofficial and may break when the marketplace changes. Check compatibility and platform rules before enabling live publishing.
