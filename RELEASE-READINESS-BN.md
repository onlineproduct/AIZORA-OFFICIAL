# AIZORA OFFICIAL — Release Readiness Review (v0.4.3)

Review date: 2026-10-22

## Status
**NOT READY FOR LIVE CUSTOMER PAYMENTS.** The current PR branch passes CI through commit `4c5813f`; a later handover-document commit is being checked separately. CI success means local migrations/syntax/unit tests/dry-run pass, not that real Cloudflare staging or customer workflows are verified.

## Implemented in PR branch
- Bengali responsive storefront, product search, local cart, checkout and order tracking.
- Server-side product price lookup and D1 batch order/item/inventory writes; stock guard trigger.
- Admin-token-protected product creation, image upload/change/remove, order/payment status update and sales reports.
- Digital file upload up to 512 KB; payment-verified license/download entitlement, 30-day expiry, 10-download cap and account-side reissue cooldown.
- Customer registration/login with PBKDF2 password hashing, hashed session tokens, expiring HttpOnly/Secure/SameSite cookies, logout and own order history.
- Migrations 0001–0008; CI applies all migrations to a local D1 and runs syntax tests, API unit tests and Wrangler deploy dry-run.

## Blockers before production
1. The configured AIZORA OFFICIAL D1 database is `aizora-official-db` (ID `0270f7ef-51e1-4546-a136-5018242794f0`). Migrations have **not** been applied to the remote/live database.
2. Configure/verify the Worker secret `ADMIN_TOKEN` securely. Never commit it to GitHub or send it in chat.
3. Run D1-backed staging tests for checkout, inventory/stock contention, order tracking, admin authorization, image upload, payment status, account registration/login/logout/order ownership, digital fulfillment, expiry, reissue cooldown and download limit.
4. bKash/Nagad automatic payment gateway/webhook is not integrated. Current payment verification is manual and must be tested carefully.
5. Automated email/SMS delivery is not implemented.
6. D1 digital file upload is limited to 512 KB; large APK/ZIP delivery requires a suitable private object-storage design. No lifetime-free large-file storage has been assumed.
7. Rate limiting/abuse controls, privacy/retention review and mobile browser acceptance testing remain.
8. No production deploy or remote migration has been performed. Do not deploy or merge until the staging tests and release review are approved.

## Safety boundary
- Worker target remains the separate `aizora-official-v04` project.
- Do not touch Mother Editor, AIZORA Builder, AIZORA AI Camera, Live Studio, Cloudfloor Store, or their databases.
- Do not use `wrangler d1 migrations apply ... --remote` or `wrangler deploy` as part of this step.
