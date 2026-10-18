# Khatwa Designs Website

موقع Khatwa Designs هو موقع شركة تصميمات مبني كـ Static HTML/CSS/JS مع دعم لغتين (العربية والإنجليزية) وتخصيصات مخصصة للهوية البصرية والخدمات.

## نظرة سريعة

- نوع المشروع: Static Website
- التقنية الأساسية: HTML, CSS, JavaScript
- أدوات التطوير: Gulp + Sass + BrowserSync
- دعم اللغة: عربي / إنجليزي
- فرع النشر الحالي: main

## الصفحات الأساسية

- index.html
- about.html
- services.html
- contact.html
- customer-stories.html
- blog.html
- blog-single-clean.html
- privacy-policy.html
- terms-and-conditions.html
- thank-you.html
- 404.html

## صفحات الخدمات

- logo-design.html
- brand-identity.html
- social-media-design.html
- social-media-management.html
- powerpoint-presentations.html
- video-presentations.html
- company-portfolio.html
- web-design.html
- n8n-ai-automations.html
- services-details.html

## مميزات مطبقة في النسخة الحالية

- توحيد الهيدر والفوتر عبر حقن ديناميكي من JavaScript.
- تحديث قائمة الخدمات وروابطها.
- تحسين Sections العملاء وإظهار لوجوهات عملاء حقيقية.
- تحديث الفوتر وربط حقوق النشر بحساب Behance.
- دعم تبديل اللغة مع تحديث النصوص ديناميكيًا.
- تحسين نموذج التواصل:
  - حقل الخدمة كقائمة منسدلة.
  - رقم الهاتف مقسم إلى كود دولة + رقم.
  - أسماء الدول تتغير حسب لغة الموقع (عربي/إنجليزي).

## تشغيل المشروع محليًا

### 1) تثبيت المتطلبات

- Node.js (يفضل إصدار حديث LTS)
- npm

### 2) تثبيت الحزم

نفذ الأمر التالي من داخل المجلد الرئيسي للمشروع:

npm install

### 3) تشغيل بيئة التطوير

npm start

هذا يشغل:

- Sass compilation
- Vendor assets build
- Local server عبر BrowserSync على المنفذ 3002

### 4) بناء ملفات الإنتاج

npm run build

ملاحظة: في package.json الأمر يشير إلى gulp build. إذا لم تكن مهمة build معرفة داخل gulpfile.js، يمكن الاعتماد على npm start أثناء التطوير.

## هيكل مختصر للمجلدات

- css/ : ملفات التنسيق النهائية (ومنها corporate.css للتخصيصات)
- sass/ : ملفات Sass المصدر
- js/ : سكربتات الموقع
  - khatwa-layout.js : حقن الهيدر/الفوتر المشترك
  - khatwa-i18n.js : إدارة الترجمة وتبديل اللغة
- images/ : الصور والشعارات
  - images/customers/ : شعارات العملاء
- fonts/ : الخطوط

## ملاحظات تطوير

- أي تعديل على روابط أو عناصر الهيدر/الفوتر يفضل أن يكون في js/khatwa-layout.js لأن القالب يتم حقنه ديناميكيًا.
- أي نص يحتاج دعم لغتين يضاف مفاتيحه داخل js/khatwa-i18n.js ويربط بعناصر data-i18n في HTML.
- عند تعديل الأيقونات أو favicon، قد تحتاج تحديث كاش المتصفح (Ctrl+F5).

## النشر على GitHub

تم رفع المشروع على:

https://github.com/M-Elmaghawry/Khatwa-Designs-Main

للتحديث مستقبلا:

1. git add -A
2. git commit -m "your message"
3. git push origin main

## المعاينة عبر GitHub Pages و Actions

تم تجهيز Workflow باسم `deploy-pages.yml` داخل `.github/workflows/` بحيث يتم نشر الموقع تلقائيًا عند أي Push على فرع `main`.

### خطوات التفعيل مرة واحدة على GitHub

1. افتح المستودع على GitHub.
2. ادخل إلى **Settings > Pages**.
3. من **Source** اختر **GitHub Actions**.
4. اعمل `git add -A` ثم `git commit` ثم `git push origin main`.
5. انتظر انتهاء الـ workflow من تبويب **Actions**.

بعدها ستكون المعاينة غالبًا على الرابط:

`https://USERNAME.github.io/Khatwa-Designs-Main/`

> ملاحظة: لأن الموقع Static HTML، المعاينة ستعمل جيدًا، لكن أي جزء يعتمد على PHP أو Backend لن يعمل على GitHub Pages.

## الترخيص

هذا المشروع مبني على قالب Crafto (ThemeZaa) مع تخصيصات خاصة بعلامة Khatwa Designs.
