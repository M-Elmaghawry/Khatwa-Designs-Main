تقرير إصلاح Cloudflare Workers Static Assets — 27 نوفمبر 2026

الفرع: `fix/cloudflare-static-assets`. العمل محلي فقط؛ لم يُنفّذ Push أو Merge أو Deployment، ولم تتغير إعدادات Cloudflare أو GitHub المنشورة. لم يُفعّل الدومين المستقبلي أو يُبنَ artifact إنتاج له.

**السبب المثبت من البناء**

قبل الإصلاح، أنتج `npm run build` ملف CSS في:

```text
khatwa/dist/assets/index-eKxucgsm.css
```

لكن HTML أشار إليه بهذا المسار:

```text
/Khatwa-Designs-Main/assets/index-eKxucgsm.css
```

الملف `dist/Khatwa-Designs-Main/assets/index-eKxucgsm.css` غير موجود. ينطبق اختلاف المسار نفسه على حزم JavaScript والأصول القديمة والصور. عند تقديم `dist` من جذر Workers، تكون الطلبات بهذه البادئة خاطئة. عرض HTML المسبق لا يتطلب نجاح CSS أو JavaScript، وهذا يفسر ظهور المحتوى دون تنسيق. هذا إثبات محلي من مخرجات البناء؛ لم تُغيّر النسخة الحية أثناء التحقيق.

وجدت المراجعة أيضًا أن `js/normalize-url.js` يستخدم بادئة GitHub ثابتة. أصبح البناء يخصص النسخة المنسوخة منه للهدف المحدد، مع إبقاء الملف الأصلي ونسخة GitHub دون تغيير.

الخطوط الحالية تأتي من `fonts.googleapis.com` عبر CSS، وليست ملفات fonts محلية بمسار GitHub. بقي مزود الخطوط وأسماء الخطوط وأوزانها كما هي. لم تتغير ملفات CSS أو المحتوى أو صور المشروع.

**عقد أهداف البناء**

| الهدف | base | عنوان التوجيه | Canonical وSEO | الفهرسة |
| --- | --- | --- | --- | --- |
| `github`، الافتراضي | `/Khatwa-Designs-Main/` | `https://m-elmaghawry.github.io` | موقع GitHub الحالي | السياسة الحالية دون تغيير |
| `cloudflare-preview` | `/` | `https://khatwa-designs-main.melmekawy2020.workers.dev` | Canonical وog:url يشيران إلى الصفحة المقابلة على GitHub | `noindex,nofollow`، بلا hreflang أو JSON-LD، Sitemap فارغ، robots يمنع الزحف |
| `cloudflare-production` | `/` | `https://khatwa-designs.com` | الدومين الجديد لكل Canonical وSitemap وOpenGraph وhreflang وJSON-LD | سياسة المحتوى الحالية؛ الهدف مقفول حاليًا |

`DEPLOY_TARGET` متغير بناء، والهدف المجهول يوقف البناء بدل العودة الصامتة إلى إعداد آخر. تستخدم Vite وNode/prerender والتوجيه والمتصفح عقد الإعداد نفسه. يحقن Vite القيم في حزمتَي العميل وSSR، فلا يعتمد المتصفح على وجود `process.env` وقت التشغيل. تستخدم React Router وassetUrl وlanguageHref قاعدة المسارات المشتركة الموجودة بالفعل.

Preview يحافظ على Canonical الموقع الحالي ولا يولد Canonical على workers.dev أو الدومين غير المشترى. يطبق البناء كذلك `_headers` الذي يضيف `X-Robots-Tag: noindex, nofollow` لجميع أصول المعاينة، بما فيها صفحات التحويل. اختبارات runtime تتحقق من استمرار هذه السياسة بعد تحديث metadata داخل React.

يبقى هدف الإنتاج مقفولًا ما لم يُضبط `KHATWA_PRODUCTION_VERIFIED=true` صراحةً. هذا إقرار تشغيلي بأن الشراء وملكية الدومين وDNS وHTTPS تم التحقق منها؛ ليس تحققًا آليًا من ملكية الدومين. لا توجد قيمة مفعلة لهذا المتغير في المستودع، ولا custom-domain routes. اختُبرت قيم SEO المستقبلية بمحاكاة إعدادات في عملية Node معزولة فقط؛ لم يُبنَ أو يُنشر إنتاج فعلي. عند الانتقال مستقبلًا يجب مراجعة إعداد الدومين ووقف إتاحة إنتاج قابل للفهرسة على workers.dev، ثم السماح بالهدف بعد التحقق والموافقة.

**إعداد Cloudflare المطلوب بعد مراجعة التغييرات**

```text
Root directory: khatwa
Build command: npm run build:cloudflare-preview
Build output / assets directory: dist
Wrangler configuration: khatwa/wrangler.jsonc (relative to repository root)
```

من داخل `khatwa` يستخدم Wrangler تلقائيًا `wrangler.jsonc`، وفيه `assets.directory: ./dist`. حافظ على Node مدعوم بحسب `khatwa/package.json`؛ مثل Node 24.15.0 أو أحدث من سلسلة 24. لا تضبط متغير تأكيد الإنتاج الآن. لا يكفي تغيير Build output وحده؛ يجب تغيير Build command إلى أمر Preview أعلاه. الأمر يحدد الهدف صراحة حتى لو وُجد متغير بيئة قديم.

تحتوي الإعدادات على `html_handling: none` للحفاظ على روابط `.html` الحالية. كشف Wrangler المحلي أن هذا الخيار لا يحل directory indexes تلقائيًا: كانت `/` و`/ar/` و`/en/` تعيد 404. يولد بناء Cloudflare فقط ثلاث قواعد rewrite داخل `dist/_redirects`:

```text
/ /index.html 200
/ar/ /ar/index.html 200
/en/ /en/index.html 200
```

أصبحت المداخل الثلاثة ترجع 200 دون تحويل ظاهر، بينما تبقى المسارات المفقودة 404 باستخدام `not_found_handling: 404-page`. لم يُفعّل fallback عام إلى SPA حتى لا تتحول ملفات CSS/JS المفقودة إلى HTML. لا تُضاف `_headers` أو `_redirects` إلى بناء GitHub.

توضح وثائق Cloudflare [طريقة html_handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/) و[ترويسات Static Assets عبر _headers](https://developers.cloudflare.com/workers/static-assets/headers/) المستخدمة هنا.

**الملفات المتغيرة**

| الملفات | التغيير |
| --- | --- |
| `khatwa/src/lib/deploy-target.js`، `khatwa/src/lib/paths.js` | عقد الأهداف الثلاثة، قفل الإنتاج، base وorigin المشترك |
| `khatwa/vite.config.js` | حقن إعداد الهدف للعميل وSSR، تخصيص legacy normalizer أثناء البناء والتطوير |
| `khatwa/src/lib/metadata.js` | فصل عنوان SEO عن عنوان التوجيه، منع فهرسة المعاينة، SEO الإنتاج المستقبلي |
| `khatwa/scripts/build.mjs` | robots وSitemap وheaders وdirectory rewrites بحسب الهدف |
| `khatwa/wrangler.jsonc` | Static Assets، الحفاظ على امتداد HTML، 404 حقيقي، دون ربط الدومين المستقبلي |
| `khatwa/package.json`، `khatwa/scripts/target.mjs` | أوامر أهداف البناء والمعاينة والاختبارات المتوافقة مع Windows وLinux |
| `khatwa/scripts/test-deploy.mjs` | مصفوفة GitHub وPreview مع إعادة بناء GitHub في النهاية |
| `khatwa/tests/deploy-target.test.mjs`، `khatwa/tests/deploy-build.test.mjs` | اختبارات الأهداف والمسارات وdist وHTTP وSEO وlegacy وقفل الإنتاج |
| `khatwa/tests/inner-pages.test.mjs`، `khatwa/tests/portfolio.test.mjs` | إزالة افتراض بادئة GitHub من الاختبارات، مع الحفاظ على بصمات المحتوى المرجعية الأصلية |
| `khatwa/scripts/check-worker.mjs` | فحص HTTP لمحاكي Workers المحلي |
| `khatwa/scripts/deploy-browser-audit.cjs` | فحص المتصفح للهدفين وتحميل CSS/JS والصور والتحويلات وتبديل اللغة |
| `khatwa/.gitignore` | تجاهل ملفات حالة Wrangler المحلية |
| `docs/CLOUDFLARE-STATIC-ASSETS.md` | هذا التقرير وإرشادات إعادة التحقق |

لم تتغير ملفات المحتوى أو الترجمة العربية والإنجليزية أو CSS أو صور المشروع أو إعدادات GitHub Actions أو ملفات lock أو اعتماديات التطبيق.

**نتائج التحقق**

| الفحص | النتيجة |
| --- | --- |
| بناء GitHub الافتراضي | ناجح؛ 21 مسارًا × 3 مداخل لغوية = 63 ملف HTML |
| مقارنة GitHub بالبناء قبل الإصلاح | 63 ملف HTML متطابقًا بعد توحيد أسماء bundles ذات البصمة فقط؛ 33 ملفًا من legacy assets وملفات SEO متطابقة بايتًا ببايت |
| اختبارات GitHub | 55/55، تشمل اختبارات SEO الـ15 وجميع اختبارات المحتوى والتفاعلات |
| بناء Cloudflare Preview | ناجح؛ CSS `/assets/index-eKxucgsm.css`، JavaScript `/assets/index-1ebfnCLO.js`، legacy `/legacy/...` |
| اختبارات Preview | 40/40؛ جميع الاختبارات العامة مع اختبارات SEO الخاصة بالمعاينة؛ اختبارات SEO المنشورة الـ15 تبقى ضمن GitHub لأنها تتحقق من سياسة الفهرسة المنشورة |
| سلامة المحتوى | 21 مسارًا، 419 مفتاح ترجمة لكل لغة؛ فحص المحتوى ناجح |
| فحص الملفات | 26 أصلًا عامًا و46 ملف تطبيق؛ دون imports مفقودة أو وحدات مهجورة |
| Workers المحلي، Wrangler 4.169.0 | 102 فحص HTTP ناجح: 63 صفحة HTML، 3 مداخل directory، 32 أصلًا مع MIME صحيح، 4 مسارات مفقودة ترجع 404؛ ترويسة منع الفهرسة مؤكدة |
| متصفح GitHub | 23 حالة، 51 عنوان استجابة محلية مميزًا، دون أخطاء JS أو أصول محلية فاشلة |
| متصفح Preview عبر Wrangler | 23 حالة، 52 عنوان استجابة محلية مميزًا، دون أخطاء JS أو أصول محلية فاشلة |
| أحجام المتصفح | 390 و1440 بكسل؛ العربية والإنجليزية؛ CSS فعلي وdecode الصور وlegacy redirect وتبديل اللغة |
| قفل الإنتاج | محاولة بناء فعلية دون التحقق تُرفض قبل تعديل dist؛ SEO الدومين المستقبلي اختُبر بإعدادات معزولة |
| git diff --check | ناجح |

يتغير اسم حزمة JavaScript الرئيسية بسبب إضافة إعداد الهدف؛ لم يتغير CSS، وبقيت حزم المحتوى والحركة كما هي. لم تُرسل نماذج فعلية؛ اختبارات الإرسال تستخدم transport وهميًا والمتصفح يمنع طلبات EmailJS.

**إعادة الاختبارات محليًا**

من جذر المستودع بعد تثبيت الاعتماديات المقفلة في الجذر و`khatwa`:

```sh
npm ci
npm ci --prefix khatwa
npm --prefix khatwa run test:deploy
npm run content:check
npm run audit:files
```

مصفوفة `test:deploy` تعيد بناء GitHub في النهاية؛ وهذا هو المحتوى النهائي المتروك في `khatwa/dist`. لا تضع builds متزامنة فوق `dist` نفسه.

لفحص Workers محليًا، من داخل `khatwa`:

```sh
npm run build:cloudflare-preview
npx --yes wrangler@4.169.0 dev --local --port 4173
```

وفي terminal آخر من جذر المستودع:

```sh
node khatwa/scripts/check-worker.mjs
playwright-cli -s=khatwa-deploy open http://127.0.0.1:4173/
playwright-cli -s=khatwa-deploy run-code --filename=khatwa/scripts/deploy-browser-audit.cjs
playwright-cli -s=khatwa-deploy close
```

للمعاينة البسيطة دون محاكي Workers: `npm --prefix khatwa run preview:cloudflare` بعد بناء Preview. هذا الخادم لا يحاكي ترويسات Cloudflare؛ فحص الترويسات يتم عبر Wrangler.

لبناء ومعاينة GitHub: `npm run build` ثم `npm run preview`، والعنوان `http://127.0.0.1:4173/Khatwa-Designs-Main/`. يعمل سكربت المتصفح نفسه عندما يُفتح هذا العنوان أولًا. على PowerShell قد يلزم استخدام `npm.cmd` و`npx.cmd` و`playwright-cli.cmd` إذا كانت سياسة النظام تمنع ملفات `.ps1`.
