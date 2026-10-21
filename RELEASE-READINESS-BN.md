# AIZORA OFFICIAL — Release Readiness Review (v0.4.1)

Review date: 2026-10-21

## Status
**NOT READY FOR LIVE CUSTOMER ORDERS.** Source changes are being checked by GitHub Actions. Do not deploy to a public production endpoint until every blocker below is cleared and end-to-end acceptance tests pass.

## Implemented in source
- Bengali responsive storefront, product search, local cart.
- Physical/digital product catalogue API.
- Checkout validation, server-side product price lookup, order ID and order tracking.
- D1 batch for order/item/inventory writes; migration 0003 adds a trigger to prevent negative inventory.
- Admin-token-protected product/order endpoints and sales-report endpoint.
- Admin product creation, order/payment status updates, sales report summary.
- Automated Node tests, syntax checks and Wrangler dry-run in GitHub Actions.

## Hard blockers before production
1. Create a **new, separate** Cloudflare D1 database for AIZORA OFFICIAL; set its real ID in `wrangler.toml` and apply migrations 0001–0003. No database ID was supplied or verified in this review.
2. Set a strong `ADMIN_TOKEN` as a Cloudflare Worker secret; never commit it to GitHub.
3. Run D1-backed integration tests covering successful checkout, rejected checkout, duplicate cart lines, stock contention, order tracking, admin authorization, product creation, order updates and reports.
4. Integrate the real bKash/Nagad provider or document and test a manual reconciliation workflow. A transaction reference is not payment verification.
5. Implement customer authentication/session and account/order history if customer accounts remain in scope.
6. Implement digital entitlement/license creation, private R2 object storage, short-lived authorized download links and expiry/revocation. Current digital products are catalog entries only.
7. Add product image upload/storage, backups, monitoring, rate limiting/abuse protection and privacy/retention review.
8. Test the real deployed site on mobile browsers and confirm no regressions. No live deployment or production browser acceptance test has been performed.

## Safe deployment boundary
- Wrangler Worker name is `aizora-official-v04`, separate from Mother Editor and other live projects.
- CI dry-run is not a production deployment.
- Do not point this project at another project's database or overwrite any existing live project.
