# ابدأ من هنا — Khatwa Designs

دليل استخدام تعليمات GitHub Copilot وملفات المحتوى موجود في [docs/START_HERE_AR.md](docs/START_HERE_AR.md).

مرجع المحتوى المعتمد: [docs/Khatwa_Designs_Content_Master_AR_EN_v1.md](docs/Khatwa_Designs_Content_Master_AR_EN_v1.md).

## تشغيل أساس React V2 محليًا

من Terminal في VS Code داخل مجلد المشروع، نفّذ:

```powershell
npm.cmd run react:dev
```

ثم افتح: http://127.0.0.1:5173/Khatwa-Designs-Main/

النسخة الجديدة موجودة داخل `react-v2/` على فرع `redesign/react-v2`، ولا تغيّر الموقع المنشور. أوامر النسخة الأصلية باقية كما هي. الحزم مثبتة بالفعل في مساحة العمل الحالية؛ للنسخة الجديدة من المستودع استخدم `npm.cmd --prefix react-v2 ci` أولًا مع إصدار Node المدعوم.

التفاصيل والاختبارات والقيود الحالية: [تقرير المرحلة الثانية](docs/PHASE-2-IMPLEMENTATION-REPORT.md)، [بنية المكونات](docs/REACT-COMPONENT-ARCHITECTURE.md)، [حالة نقل المحتوى](docs/CONTENT-MIGRATION-STATUS.md).
