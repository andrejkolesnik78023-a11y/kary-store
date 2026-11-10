# KARY FUNPAY MANAGER

Separate interface for preparing and publishing FunPay listings.

## Stage 0.1
- Responsive listing form.
- Fields: title, category, subcategory, price, quantity, description.
- Local image preview.
- Save and restore drafts in the current browser.
- Publishing is intentionally disabled until the secure FunPay server adapter is implemented.

## Security
- Never store Golden Key, cookies, passwords, or tokens in the public frontend, localStorage, or Git.
- Store account secrets only server-side in an encrypted secret store.
- Validate owner access, fields, CSRF/session state, and rate limits on the server.
- Show a final preview and require explicit confirmation before publishing.

## Next implementation stage
1. Deploy a separate Python API service (FastAPI) for the FunPay integration.
2. Add secure account-session connection and account verification.
3. Load categories and required fields from FunPay dynamically.
4. Create/save a listing and return its real ID and URL.
5. Deploy frontend and API on a separate HTTPS address.

FunPay's third-party integrations are unofficial and may break when the marketplace changes. Check compatibility and platform rules before enabling live publishing.
