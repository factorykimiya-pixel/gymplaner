# انتشار FitnessCut Pure JS روی Vercel

## مهم
این نسخه **Next.js ندارد**. فایل `package.json` هم ندارد؛ بنابراین Vercel نباید `npm install` یا `next build` اجرا کند.

## اگر Repository قبلی Next.js بوده
در Root ریپازیتوری، همه فایل‌های پروژه قبلی را حذف کنید **به‌جز پوشه `.git`** و محتوای ZIP جدید را جایگزین کنید.

در Git Bash:

```bash
git status
git add -A
git commit -m "Replace Next.js FitnessCut with pure JS web app"
git push origin master
```

اگر branch شما `main` است:

```bash
git push origin main
```

## تنظیم Vercel
Project → Settings → Build and Deployment

- Framework Preset: `Other`
- Root Directory: `./`
- Build Command: خالی
- Install Command: خالی
- Output Directory: خالی

بعد به Deployments بروید و Redeploy کنید.

اگر Vercel هنوز خطای Next.js نشان داد، یعنی هنوز `package.json` یا فایل‌های پروژه Next قبلی در Branch Production باقی مانده‌اند. در GitHub بررسی کنید Root ریپازیتوری شامل `index.html` این نسخه باشد و فایل `package.json` حذف شده باشد.

## اجرای محلی

بدون npm:

```bash
python -m http.server 8080
```

یا VS Code Live Server.

سپس:

```text
http://localhost:8080
```
