# ধাপ ৩ — আলাদা টেস্ট ও রিলিজ প্রস্তুতি

## উদ্দেশ্য
ধাপ ২-এর পণ্য অ্যাডমিন, ছবি আপলোড, অর্ডার পেমেন্ট-স্ট্যাটাস এবং ডিজিটাল ফাইল ডেলিভারি কোডকে আলাদা টেস্ট পরিবেশে যাচাই করা। এই ধাপে Production deploy বা live D1 migration করা হবে না।

## CI-তে যোগ করা যাচাই
- Worker ও browser JavaScript syntax checks
- API unit tests
- Wrangler deploy dry-run
- Wrangler-এর local D1-এ migrations 0001–0006 apply করার smoke test

## টেস্টের ক্রম
1. GitHub Actions-এ সর্বশেষ commit-এর সব ধাপ সফল হয়েছে কি না দেখুন।
2. local D1 migration smoke test পাস হয়েছে কি না নিশ্চিত করুন।
3. আলাদা staging Worker/D1 binding ব্যবহার করে health, products, checkout, order tracking, admin authorization, payment verification, digital upload, fulfillment এবং download limit পরীক্ষা করুন।
4. Test data দিয়ে পেমেন্ট Verified না করলে download endpoint যেন ফাইল না দেয়—এটি যাচাই করুন।
5. সব ফলাফল নথিভুক্ত করার পরে তবেই release review করুন।

## গুরুত্বপূর্ণ নিরাপত্তা সীমা
- এই ধাপে `wrangler d1 migrations apply ... --remote` চালাবেন না।
- `wrangler deploy` চালাবেন না।
- `ADMIN_TOKEN`, Cloudflare API token বা password GitHub-এ বা chat-এ দেবেন না।
- Mother Editor, AIZORA Builder, AIZORA AI Camera, Live Studio এবং অন্য কোনো live project/database পরিবর্তন করবেন না।
- bKash/Nagad webhook, customer login/session, automated email delivery এবং বড় digital file storage এখনো পূর্ণ হয়নি। তাই এই সংস্করণ live customer payment নেওয়ার জন্য অনুমোদিত নয়.