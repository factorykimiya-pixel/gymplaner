# FitnessCut — نسخه Pure JavaScript برای Vercel

این نسخه **هیچ وابستگی به Next.js، npm، Node.js، React یا Framework Build ندارد**. پروژه یک Web App استاتیک با HTML/CSS/JavaScript خالص است و Vercel آن را مستقیم سرو می‌کند.

## امکانات

- رابط فارسی RTL، ریسپانسیو برای iPhone / Android / Tablet / Desktop
- Dashboard حرفه‌ای، Dark Mode و Mobile Bottom Navigation
- برنامه Nutrition، Supplements، Push، Pull، Legs
- هوازی داخل Push / Pull / Legs
- کول و ساعد داخل برنامه تمرینی، بدون صفحه جدا
- Edit Mode برای خوراکی، مکمل، تمرین، ست، تکرار، RIR، استراحت و هوازی
- محاسبه زنده کالری و ماکروها
- ثبت ست‌ها، وزنه، تکرار و Rest Timer
- پیشنهاد Progressive Overload
- ثبت وزن، دور کمر و نمودار پیشرفت
- قدم و آب روزانه
- Backup / Restore با JSON
- Reset Program
- Print A4 پنج صفحه‌ای
- PWA + Service Worker + Offline Cache
- ذخیره اطلاعات روی LocalStorage دستگاه

## اجرای محلی

چون پروژه Static است، `npm install` لازم نیست.

### روش ۱ — VS Code Live Server
روی `index.html` راست‌کلیک کنید و `Open with Live Server` را بزنید.

### روش ۲ — Python
در پوشه پروژه:

```bash
python -m http.server 8080
```

سپس باز کنید:

```text
http://localhost:8080
```

## Deploy روی Vercel از GitHub

ریشه Repository باید همین پوشه باشد و فایل `index.html` در Root قرار داشته باشد.

در Vercel:

- Framework Preset: **Other**
- Root Directory: `./`
- Build Command: **خالی**
- Output Directory: **خالی**
- Install Command: **خالی**

سپس Deploy کنید.

## جایگزینی نسخه Next.js قبلی در Repository

قبل از Copy نسخه جدید، فایل‌ها و پوشه‌های Next قبلی مانند موارد زیر را حذف کنید:

```text
app/
components/
data/
lib/
scripts/
next.config.ts
next-env.d.ts
tsconfig.json
package.json
```

پوشه `.git` را حذف نکنید.

بعد محتوای این پروژه را در Root Repository کپی کرده و در Git Bash اجرا کنید:

```bash
git add -A
git commit -m "Replace Next.js with static FitnessCut web app"
git push origin master
```

اگر Branch شما `main` است، به جای `master` از `main` استفاده کنید.

## اگر Vercel هنوز پروژه قبلی را Build کرد

Project Settings → Build & Deployment را باز کنید و Framework Preset را روی **Other** قرار دهید. Build Command و Install Command را پاک کنید. سپس Redeploy بزنید.

## PWA / iPhone

پس از Deploy با HTTPS، در Safari:

Share → Add to Home Screen

اطلاعات برنامه روی همان دستگاه ذخیره می‌شود.
