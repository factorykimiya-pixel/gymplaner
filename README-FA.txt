FitnessCut Web / iPhone PWA
===========================

این پوشه یک نسخه Static و ریسپانسیو PWA است و برای اجرا نیاز به Build ندارد.

اجرای سریع روی کامپیوتر:
1) وارد پوشه شوید.
2) یکی از این روش‌ها را اجرا کنید:
   python3 -m http.server 8080
   یا
   npx serve .
3) مرورگر: http://localhost:8080

اجرای روی آیفون به شکل App:
1) کل محتویات این پوشه را روی یک هاست HTTPS آپلود کنید (Vercel / Netlify / Cloudflare Pages / GitHub Pages یا هاست شخصی).
2) لینک HTTPS را در Safari آیفون باز کنید.
3) دکمه Share را بزنید.
4) Add to Home Screen را انتخاب کنید.
5) اپ با آیکون مستقل و حالت Standalone اجرا می‌شود.

نکته: نصب Service Worker و PWA روی iPhone نیازمند HTTPS است (به‌جز localhost برای توسعه).
فایل IPA در این بسته وجود ندارد؛ IPA برای نصب واقعی نیازمند امضای Apple Developer است.

داده‌ها روی همان مرورگر/دستگاه ذخیره می‌شوند. از تنظیمات می‌توانید JSON خروجی بگیرید.
