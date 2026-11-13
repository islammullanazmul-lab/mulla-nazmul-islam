# Mulla Nazmul Islam — Personal Portfolio

ইসলামিক প্রিমিয়াম ডিজাইনের ব্যক্তিগত পোর্টফোলিও ও ডিজিটাল আর্কাইভের প্রাথমিক সোর্স কোড।

## কী আছে
- Responsive বাংলা/ইসলামিক প্রিমিয়াম হোমপেজ
- Google ও ফোন OTP লগইন UI (Supabase Auth)
- লগইন-নিয়ন্ত্রিত গ্যালারি
- Supabase private storage ও database-এর RLS policy
- ভিজিট রেকর্ডিংয়ের প্রাথমিক ব্যবস্থা
- যোগাযোগ পৃষ্ঠা

## চালানোর নিয়ম
1. Node.js 18.17+ ইনস্টল করুন।
2. টার্মিনালে প্রজেক্ট ফোল্ডারে গিয়ে `npm install` চালান।
3. `.env.example` কপি করে `.env.local` নাম দিন।
4. Supabase Project URL এবং anon key বসান।
5. Supabase SQL Editor-এ `supabase/schema.sql` চালান।
6. Supabase Authentication > Providers-এ Google এবং Phone চালু করুন। Google OAuth credentials ও SMS provider কনফিগার করুন।
7. Supabase Authentication > URL Configuration-এ আপনার local ও production callback URL যোগ করুন।
8. নিজের অ্যাকাউন্টের `app_metadata`-তে `{"role":"admin"}` সেট করুন। এটি শুধু Supabase Dashboard/বিশ্বস্ত server-side admin API দিয়ে করবেন; user-editable metadata নয়।
9. `npm run dev` চালিয়ে `http://localhost:3000` খুলুন।

## এখনো যেগুলো যুক্ত করতে হবে
- Admin dashboard-এর upload/edit/delete UI
- Admin visitor analytics page
- Phone OTP verification screen
- Signed URL generation / secure media delivery
- WhatsApp-এর আসল আন্তর্জাতিক ফোন নম্বর এবং Facebook profile-এর সঠিক URL
- Production deployment (যেমন Vercel) ও custom domain

## নিরাপত্তা নোট
কোনো ওয়েবসাইটে দর্শককে ছবি/ভিডিও দেখালে সম্পূর্ণ ডাউনলোড, স্ক্রিনশট বা screen recording ঠেকানো যায় না। এই starter private bucket, authenticated access এবং database/storage RLS দিয়ে প্রবেশ সীমিত করার ভিত্তি দেয়। বাস্তব production-এ media signed URL, rate limit, audit log, admin server route এবং privacy notice যোগ করুন। ভিজিট লগে লগইন করা account identity থাকবে; তা ব্যক্তির বাস্তব পরিচয় প্রমাণ করে না।
