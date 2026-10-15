# AIZORA OFFICIAL — Handover v0.3
এই প্রজেক্ট আলাদা; Mother Editor, Universal App Builder, AI Camera, Live Studio, Cloudfloor Store-এর কোনো live deployment/repo পরিবর্তন নয়।

বর্তমান: v0.3 ZIP — storefront + read-only Worker API + D1 schema starter। API/D1 না থাকলে storefront demo products দেখায়। D1 থাকলে database-এর real product rows দেখায় (migration seed দেয় না)।

অসম্পূর্ণ: authentication, admin UI/API, real order creation, payment verification, customer account, digital license generation, secure download, shipment processing, reporting, automated tests। Production-ready নয়।

পরবর্তী v0.4: secure auth, admin product CRUD, server-validated order creation, physical/digital fulfillment separation, test cases। Payment webhook verified হলে digital entitlements issue করা এবং private file delivery যুক্ত হবে।

নিয়ম: পৃথক repo/staging; আগে test, পরে deploy; যাচাই ছাড়া live/complete দাবি নয়; Android-friendly copy/paste steps।
