# FitnessCut Web App

وب‌اپ شخصی کات از ۸۰ به ۶۸ کیلوگرم، با رابط RTL فارسی، تغذیه قابل ویرایش، تمرین Push / Pull / Legs، مکمل‌ها، ثبت ست‌ها، تایمر استراحت، پیگیری وزن، پشتیبان JSON، چاپ A4 و PWA.

## ساختار داده

اطلاعات اصلی برنامه در `data/default-program.ts` نگهداری می‌شود و UI از همین لایه داده رندر می‌شود. داده‌های کاربر در مرورگر با کلید `fitnesscut:v3` ذخیره می‌شوند.

## اجرای محلی

```bash
npm install
npm run dev
```

سپس `http://localhost:3000` را باز کنید.

## بررسی و Build

```bash
npm run typecheck
npm run smoke
npm run build
```

پروژه از `output: 'export'` استفاده می‌کند و خروجی Static Export در پوشه `out/` ساخته می‌شود.

## انتشار روی Vercel

### روش ۱: Vercel Dashboard
1. پوشه پروژه را در یک Repository یا منبع پشتیبانی‌شده Vercel قرار دهید.
2. در Vercel گزینه **Add New → Project** را انتخاب کنید.
3. Framework Preset باید به صورت خودکار **Next.js** تشخیص داده شود.
4. Build Command: `npm run build`
5. روی Deploy بزنید.

### روش ۲: Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

هیچ Environment Variable اجباری نیست.

## PWA روی iPhone
بعد از اولین انتشار HTTPS، سایت را در Safari باز کنید و از Share → Add to Home Screen استفاده کنید. `manifest.webmanifest`، آیکن‌ها و Service Worker داخل پروژه هستند.

## قابلیت‌های اصلی
- Dashboard ریسپانسیو با مسیر وزن ۸۰ → ۶۸
- تغذیه با محاسبه زنده کالری/ماکرو
- حالت روغن زیتون ۱ یا ۲ قاشق چای‌خوری با تنظیم برنج
- مکمل‌ها با اولویت‌بندی و ثبت روزانه
- Push / Pull / Legs با ساعد، کول، شکم و هوازی ادغام‌شده
- Training Log برای وزن و تکرار هر ست
- Rest Timer با +۳۰ ثانیه
- پیشنهاد Progressive Overload وقتی سقف تکرار تکمیل شود
- پیگیری وزن و میانگین ۷ ثبت اخیر
- Edit Mode
- Export / Import backup JSON
- Reset to original program
- Light / Dark mode
- Print A4 پنج‌صفحه‌ای
- PWA و Offline app shell

## نکته درباره داده تغذیه
اعداد خوراکی‌ها از آخرین نسخه FitnessCut استخراج شده‌اند. به‌علت تفاوت برند وی، لبنیات و روش پخت، مقدار واقعی کالری/ماکرو می‌تواند کمی تغییر کند. برنامه عمداً این اختلاف را به‌صورت Validation Note نمایش می‌دهد و عدد را مخفیانه اصلاح نمی‌کند.
