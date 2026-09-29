# اجرای FitnessCut روی آیفون

## روش پیشنهادی: PWA

1. کل پوشه را روی یک سرویس HTTPS مثل Netlify، Vercel، Cloudflare Pages یا GitHub Pages منتشر کنید.
2. لینک را در **Safari** آیفون باز کنید.
3. روی **Share** بزنید.
4. **Add to Home Screen** را انتخاب کنید.
5. گزینه **Add** را بزنید.

بعد از آن FitnessCut با آیکون مستقل و بدون نوار معمول مرورگر اجرا می‌شود و فایل‌های اصلی برای اجرای آفلاین Cache می‌شوند.

## تست روی کامپیوتر

### Windows
روی `start-web.bat` دوبار کلیک کنید و سپس `http://localhost:8080` را باز کنید.

### macOS / Linux
فایل `start-web.command` را اجرا کنید یا در Terminal بنویسید:

```bash
python3 -m http.server 8080
```

سپس `http://localhost:8080` را باز کنید.

## نکته درباره IPA

این خروجی PWA است، نه IPA. فایل IPA برای نصب مستقیم روی iPhone باید با Apple Developer/Xcode امضا شود. برای استفاده روزمره، نسخه PWA بدون App Store قابل نصب روی Home Screen است.
