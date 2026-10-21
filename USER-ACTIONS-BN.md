# AIZORA OFFICIAL — আপনার করতে হবে এমন কাজ (বাংলা)

**বর্তমান অবস্থা:** সোর্স কোডের CI পরীক্ষা পাস করেছে। কিন্তু লাইভ অর্ডার নেওয়ার আগে আলাদা Cloudflare D1 ডেটাবেস, নিরাপদ Admin secret এবং বাস্তব ডেটাবেস পরীক্ষা দরকার। এই নির্দেশনা শুধু `onlineproduct/AIZORA-OFFICIAL`-এর জন্য। Mother Editor, AIZORA Builder বা অন্য কোনো Worker/ডেটাবেস পরিবর্তন করবেন না।

## আমি যা ইতিমধ্যে করেছি
- Storefront, cart, checkout/order tracking API এবং admin UI সোর্সে রেখেছি।
- D1-এর 0001–0003 migration রেখেছি।
- GitHub Actions-এ syntax check, 7টি unit test এবং Wrangler dry-run সফল হয়েছে।
- Production readiness report তৈরি করেছি।
- বাস্তব Cloudflare deploy বা D1 integration test সফল হয়েছে—এমন দাবি করছি না।

## আপনার কাজ — শুধু অ্যাকাউন্টের মালিক হিসেবে যেগুলো দরকার

### 1) নতুন D1 ডেটাবেস তৈরি
1. Cloudflare Dashboard খুলুন।
2. **Storage & databases → D1 SQL Database** (মেনুর নাম সামান্য আলাদা হতে পারে) খুলুন।
3. নতুন database তৈরি করুন; নাম দিন `aizora-official-db`।
4. তৈরি হলে তার **Database ID** কপি করুন।
5. শুধু Database ID আমাকে পাঠান। এটি password/secret নয়। **ADMIN_TOKEN, API token বা কোনো password পাঠাবেন না।**

আমি ID পেলে `wrangler.toml`-এ সঠিক binding বসাব, migration script মিলিয়ে দেব, তারপর GitHub CI আবার যাচাই করব। ID না পাওয়া পর্যন্ত placeholder বা অনুমানভিত্তিক ID বসানো হবে না।

### 2) Admin secret সেট করা
ডেটাবেস binding ঠিক হওয়ার পর Cloudflare Worker `aizora-official-v04`-এর Settings → Variables and Secrets থেকে `ADMIN_TOKEN` নামে একটি শক্তিশালী secret তৈরি করতে হবে। Secret value আপনি নিজে তৈরি করে Cloudflare-এ দেবেন। **এটি আমাকে বা GitHub-এ পাঠাবেন না।**

### 3) Live deploy-এর আগে থামুন
আমার কাছ থেকে নতুন CI সফল হওয়ার নিশ্চিতকরণ এবং migration/production test নির্দেশনা না পাওয়া পর্যন্ত Deploy চাপবেন না। bKash/Nagad gateway, customer login এবং private digital downloads এখনো সম্পূর্ণ নয়; এই অবস্থায় লাইভ গ্রাহকের অর্ডার নেওয়া উচিত নয়।

## নিরাপত্তা নিয়ম
- অন্য কোনো Cloudflare project-এর Worker, D1 database বা secret পুনঃব্যবহার করবেন না।
- GitHub-এ secret লিখবেন না।
- Database ID পাঠালেই যথেষ্ট; কোনো login/password/API token দরকার নেই।
- CI সবুজ হওয়া মানেই live store production-ready নয়।
