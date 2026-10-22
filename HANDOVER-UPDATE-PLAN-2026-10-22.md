# AIZORA OFFICIAL — Handover-aligned update plan (staging)

Date: 2026-10-22
Branch: handover-v05-update (do not deploy automatically)

## Verified repository baseline
- Current wrangler.toml targets Worker `aizora-official-v04`, entry `src/index.js`, assets `public`, D1 binding `DB`.
- RELEASE-READINESS-BN.md identifies v0.4.1 as **not production-ready**. Older PROJECT-HANDOVER-BN.md describes v0.3; do not mistake this for current implementation status.
- Database ID is present in source config; existence, schema application and production connectivity still require verification.

## Canonical handover acceptance scope
1. Home hero with physical/digital CTAs, featured items and benefits.
2. Physical catalog/search/filter, details/images, cart, server-validated checkout, tracking.
3. Digital catalog/details, verified payment, license issuance and private authorized downloads.
4. Customer authentication, profile, order history, purchases and licenses.
5. Admin overview, physical/digital product CRUD, same-screen image upload, inventory, orders, customers, payment reconciliation and sales reports.
6. bKash/Nagad/WhatsApp workflow: never mark paid from an unverified transaction ID; protect contact details and credentials.
7. Responsive Bangla-first UX inspired by ease of use of popular Bangladesh storefronts; do not copy third-party branding/assets.
8. Android app using the same verified backend, developed and tested separately.

## Mandatory release gates
- Check actual Cloudflare D1 schema/migrations and Worker binding; preserve other projects.
- Auth, authorization, stock concurrency, order and payment integration tests.
- Image storage with a free-tier-compatible plan; no billing assumptions.
- Digital download security and entitlement expiry/revocation tests.
- Mobile browser acceptance tests and admin flow tests.
- Staging deploy first, production only after explicit verification and approval.

## Next implementation batch
- Audit `src/index.js`, `public/`, migrations and CI against this list.
- Implement product image management and admin UX in staging.
- Implement customer auth and payment reconciliation, then secure digital fulfillment.
- Update README and handover with measured test results; never claim completion based solely on deployment.
