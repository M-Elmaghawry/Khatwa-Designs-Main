(function () {
    'use strict';

    var STORAGE_KEY = 'khatwa_lang';
    var SUPPORTED_LANGS = ['en', 'ar'];

    var translations = {
        en: {
            nav_home: 'Home',
            nav_about: 'About Us',
            nav_services: 'Services',
            nav_testimonials: 'Client Reviews',
            nav_contact: 'Contact',
            service_profiles: 'Company Profiles & Engineering Portfolios',
            service_presentations: 'Presentations, Tender Documents & Technical Proposals',
            service_web: 'Website Design & Development',
            service_brand: 'Logo Design & Visual Identity',
            service_social: 'Social Media Design',
            search_title: 'What are you looking for?',
            search_placeholder: 'Enter your keywords...',
            cta_quote: 'Request a Quote',
            lang_ar: 'العربية',
            lang_en: 'English',
            footer_copy: '© 2026 Khatwa Designs - خطوة للتصميمات',
            footer_intro: 'Khatwa Designs is a creative and digital partner for construction companies and engineering firms, helping them organize content and present their work through company profiles, technical presentations, visual identity, and websites.',
            footer_company_title: 'Company',
            footer_about: 'About Us',
            footer_services_link: 'Services',
            footer_clients: 'Client Reviews',
            footer_services_title: 'Services',
            footer_privacy: 'Privacy policy',
            footer_terms: 'Terms and conditions',
            footer_copyright_link: 'Copyright',
            coming_soon_title: 'Coming soon!',
            coming_soon_subtitle: "We're getting ready to launch!",
            coming_soon_placeholder: 'Enter your email address',
            coming_soon_button: 'Notify me',
            coming_soon_note: "Subscribe our newsletter to get update when it'll be live.",
            maintenance_title: 'The website is in maintenance mode.',
            maintenance_text: 'We have almost done all the technical improvements and will be back very soon. Thank you for your patience!',
            maintenance_placeholder: 'Enter your email address',
            maintenance_button: 'Notify me',
            cta_work: 'Explore Our Work',
            link_service: 'Explore Service',
            home_meta_title: 'Khatwa Designs — Company Profiles, Websites & Branding',
            home_meta_desc: 'Khatwa Designs helps construction companies and engineering firms in Egypt and Saudi Arabia with company profiles, technical presentations, branding, and websites.',
            home_hero_kicker: 'From content organization and writing to design and delivery.',
            home_hero_title: 'Creative Solutions for the Engineering Industry.',
            home_hero_text: 'We help construction companies and engineering firms showcase their expertise and projects through professional company profiles, technical proposals, brand identity, and website development.',
            home_services_title: 'Design Services That Present Your Business Professionally.',
            home_services_intro: 'We combine an understanding of your business needs with content organization, writing, and design to communicate your value clearly and consistently.',
            home_svc1_title: 'Company Profiles & Engineering Portfolios',
            home_svc1_text: 'We organize your company information, refine the content, and design a profile that showcases your services, experience, and projects.',
            home_svc2_title: 'Presentations & Tender Documents',
            home_svc2_text: 'We organize your supplied documents, refine the content, and design presentations or documents around their purpose and target audience.',
            home_svc3_title: 'Website Design & Development',
            home_svc3_text: 'We help plan your website, develop its content, design and build it, and prepare it for launch.',
            home_svc4_title: 'Logo Design & Visual Identity',
            home_svc4_text: 'We create cohesive logos and visual identities, including brand guidelines and selected applications according to the project scope.',
            home_svc5_title: 'Social Media Design',
            home_svc5_text: 'We design social media posts aligned with your brand and the text and images you provide.',
            home_why_title: 'We Understand Your Business Before We Start Designing.',
            home_why1_title: 'Engineering Industry Insight',
            home_why1_text: 'The founder’s engineering background informs our understanding of how engineering firms present their services, projects, and capabilities.',
            home_why2_title: 'Content and Design Together',
            home_why2_text: 'We help organize and refine content before turning it into a professional visual deliverable.',
            home_why3_title: 'From Brief to Delivery',
            home_why3_text: 'We follow a clear process, from understanding the requirement to delivering the agreed files.',
            home_work_title: 'Selected Work by Khatwa Designs.',
            home_work_intro: 'Explore selected company profiles, websites, and presentation projects created for our clients.',
            home_work_view: 'View Project on Behance',
            home_work_all: 'View All Work',
            home_proj1: 'Ghayah Contracting Company Profile',
            home_proj2: 'Wadi Al-Abrakeen Contracting Company Profile',
            home_proj3: 'Al-Emar Al-Fareed Company Profile',
            home_proj4: 'BIM Connection Engineering Office Profile',
            home_proj5: 'Al-Maher Electromechanical Website',
            home_proj6: 'TPACK PowerPoint Presentation',
            home_cat_contracting: 'Contracting company profile',
            home_cat_company: 'Company profile',
            home_cat_office: 'Engineering office profile',
            home_cat_website: 'Website for an engineering-related business',
            home_cat_presentation: 'Presentation design sample',
            home_process_title: 'A Clear Process from Brief to Delivery.',
            home_step1_title: 'Understand the Need',
            home_step1_text: 'We identify the objective, audience, and required deliverables.',
            home_step2_title: 'Organize the Information',
            home_step2_text: 'We review your materials, structure the content, and identify any missing inputs.',
            home_step3_title: 'Design and Review',
            home_step3_text: 'We develop the work and incorporate feedback through the agreed review stages.',
            home_step4_title: 'Deliver the Files',
            home_step4_text: 'We provide the final deliverables according to the agreed scope.',
            home_reviews_title: 'Built on Real Client Experiences.',
            home_reviews_intro: 'A selection of recommendations published on Khatwa Designs’ Facebook page.',
            home_reviews_note: 'English texts are translations of the original Arabic recommendations, except Amira Hassan’s, which was written in English.',
            home_reviews_btn: 'Read More Reviews',
            home_rev1: '“A professional company that respects deadlines and delivers high-quality work.”',
            home_rev2: '“Excellent work delivered quickly. Thank you—this won\'t be our last collaboration.”',
            home_rev3: '“They understand their work well and are committed to deadlines.”',
            home_rev4: 'A recommendation praising creativity and professionalism in logo and video design.',
            home_rev5: '“very professional people and highly recommended”',
            home_rev_date1: 'October 2021',
            home_rev_date2: 'July 2021',
            home_rev_date3: 'May 2021',
            home_rev_date4: 'July 2021',
            home_rev_date5: 'May 2021',
            home_cta_title: 'Have a Project in Mind?',
            home_cta_text: 'Share your project idea and available information. We’ll review your needs and discuss the appropriate scope and deliverables.',
            svc_scope_title: 'What’s Included?',
            svc_for_title: 'Who Is This For?',
            svc_process_title: 'Our Process',
            svc_faq_title: 'Frequently Asked Questions',
            cp_meta_title: 'Company Profile Design for Construction & Engineering Firms — Khatwa',
            cp_meta_desc: 'Content organization, writing, and professional company profile design for construction companies and engineering firms.',
            cp_title: 'More Than Design. A Company Profile Built Around Your Business.',
            cp_intro: 'We help construction companies and engineering firms present their services, expertise, and projects through a professional company profile that combines organized content with cohesive visual design. We review the information, documents, and images you provide, organize and refine the content, and then complete the design and final production according to the agreed project scope.',
            cp_inc1_title: 'Information Organization',
            cp_inc1_text: 'We review the supplied materials and structure the information so readers can understand your business and services.',
            cp_inc2_title: 'Content Writing & Editing',
            cp_inc2_text: 'We write or refine the content in clear, professional language while preserving client-approved information.',
            cp_inc3_title: 'Design & Final Production',
            cp_inc3_text: 'We create a clear visual hierarchy for services, experience, and projects while respecting the company’s visual identity and readability.',
            cp_inc4_title: 'Final Delivery',
            cp_inc4_text: 'We deliver the agreed file formats and outputs described in the quotation and project scope.',
            cp_for1: 'Construction and contracting companies.',
            cp_for2: 'Engineering consultancies and design offices.',
            cp_for3: 'Infrastructure and technical service providers.',
            cp_for4: 'Businesses preparing to expand or pursue new opportunities.',
            cp_for5: 'Companies looking to update an existing profile.',
            cp_step1: 'Understand the company, target audience, and purpose of the profile.',
            cp_step2: 'Review the available information, documents, and images.',
            cp_step3: 'Organize and refine the content for client review and approval.',
            cp_step4: 'Design the profile and review feedback through the agreed stages.',
            cp_step5: 'Deliver the approved final files.',
            cp_q1: 'Do you write the content or only design the profile?',
            cp_a1: 'We help organize the information and write or edit the content based on the documents, information, and images supplied by the client, then complete the design and final production.',
            cp_q2: 'Can you update an existing company profile?',
            cp_a2: 'Yes. We can review an existing profile and update its content and design based on the available materials and the project objectives. The scope is confirmed after reviewing the file.',
            cp_q3: 'Do you independently verify technical information?',
            cp_a3: 'We organize, edit, and present the information clearly. The client remains responsible for the accuracy and approval of technical and business information before final delivery.',
            cp_q4: 'Can the profile be produced in Arabic and English?',
            cp_a4: 'The required languages can be agreed at the start. The quotation will specify whether content writing or translation in each language is included.',
            cp_q5: 'Which files will I receive?',
            cp_a5: 'Final formats and whether editable source files are included will be defined in the quotation before work begins.',
            cp_cta: 'Share your company information and request a quote for your profile.',
            svc_types_title: 'Project Types',
            pp_meta_title: 'Presentation & Tender Document Design — Khatwa',
            pp_meta_desc: 'Content organization, editing, and design for presentations, technical proposals, and tender documents based on client materials.',
            pp_title: 'Structured Content. Professional Presentation. A Clearer Picture of Your Capabilities.',
            pp_intro: 'We help construction companies and engineering firms organize and present technical and business information clearly. We review the documents you provide, structure the information, write and refine the content, and design the presentation or document for delivery within the agreed scope.',
            pp_inc1: 'Reviewing client-provided documents and organizing information.',
            pp_inc2: 'Writing and editing content while preserving approved meaning and data.',
            pp_inc3: 'Structuring sections, headings, and tables.',
            pp_inc4: 'Designing slides, pages, and visual elements to support clarity.',
            pp_inc5: 'Producing final files in the agreed formats.',
            pp_type1: 'Corporate presentations and client meeting decks.',
            pp_type2: 'Technical and commercial proposals.',
            pp_type3: 'Tender and prequalification documents, within the agreed content and design scope.',
            pp_type4: 'Project and engineering solution presentations.',
            pp_type5: 'Corporate presentations for construction and infrastructure businesses.',
            pp_step1: 'Define the presentation’s purpose and target audience.',
            pp_step2: 'Review the client documents and gather the supplied information.',
            pp_step3: 'Structure and refine the content for review.',
            pp_step4: 'Design and revise the document according to the agreement.',
            pp_step5: 'Deliver the agreed final files.',
            pp_q1: 'Can you write the presentation content based on our documents?',
            pp_a1: 'Yes. We organize and write or edit the content based on the documents supplied by the client, then complete the design and production.',
            pp_q2: 'Does the service include engineering preparation or tender approval?',
            pp_a2: 'This service covers content organization, writing/editing, and design. Engineering solution development, formal tender-compliance review, or engineering approval are not included unless separately agreed with appropriately qualified resources.',
            pp_q3: 'Can you improve an existing presentation?',
            pp_a3: 'Yes. We can review and update an existing document after assessing the file and defining the required changes.',
            pp_q4: 'Can the deliverables be defined in advance?',
            pp_a4: 'Yes. File formats, slide or page count, and review stages can be specified in the scope and quotation.',
            pp_cta: 'Share your presentation requirements and available documents to request a quote.',
            wd_types_title: 'Website Types',
            wd_meta_title: 'Website Design & Development for Businesses — Khatwa',
            wd_meta_desc: 'Website content planning, design, development, and launch preparation for businesses and engineering firms, with optional maintenance.',
            wd_title: 'A Professional Website That Reflects Your Brand and Showcases Your Work.',
            wd_intro: 'We help construction companies and engineering firms build a professional digital presence through websites that combine thoughtful design, organized content, and clear user experience. The service covers page planning, content organization and writing based on client-provided information, website design and development, and launch preparation with domain connection within the agreed scope. Post-launch maintenance and updates can be arranged as an additional service.',
            wd_inc1: 'Understanding the business, website objectives, and target audience.',
            wd_inc2: 'Planning pages and organizing sections.',
            wd_inc3: 'Organizing and writing website content based on client-provided information, documents, and images.',
            wd_inc4: 'Designing and developing the website according to the project scope.',
            wd_inc5: 'Preparing deployment on the agreed hosting platform and assisting with domain connection.',
            wd_inc6: 'Optional maintenance and updates after launch under a separate agreement.',
            wd_type1: 'Corporate websites for construction companies and engineering firms.',
            wd_type2: 'Websites showcasing services, projects, and past work.',
            wd_type3: 'Corporate websites for small and medium-sized businesses.',
            wd_type4: 'Landing pages for specific campaigns or services, within the agreed scope.',
            wd_type5: 'Updates and improvements to existing websites.',
            wd_step1: 'Define the goals, required pages, and features.',
            wd_step2: 'Organize the content and prepare the text and images.',
            wd_step3: 'Design, develop, and review the website.',
            wd_step4: 'Prepare deployment and domain connection as agreed.',
            wd_step5: 'Deliver the website, with optional post-launch support.',
            wd_q1: 'Does the service include website content writing?',
            wd_a1: 'Yes. We organize and write content based on the information, documents, and images supplied by the client. Language and translation requirements are specified in the quotation.',
            wd_q2: 'Are hosting and domain fees included?',
            wd_a2: 'The service includes launch preparation and assistance with domain connection within the agreed scope. Domain, hosting, and third-party subscription fees will be listed separately unless explicitly included.',
            wd_q3: 'Is post-launch maintenance included?',
            wd_a3: 'Maintenance and updates are not automatically included in the initial build. They can be requested and agreed as a separate scope after launch.',
            wd_q4: 'Does the service include SEO?',
            wd_a4: 'Advanced SEO should not be assumed to be included. Basic SEO setup or additional optimization work can be defined separately in the project scope and quotation.',
            wd_q5: 'Can you improve an existing website instead of building a new one?',
            wd_a5: 'We can review the current website and recommend updates or development work after assessing its state and your requirements.',
            wd_cta: 'Tell us about your business and website goals to request a quote.',
            bi_meta_title: 'Logo Design & Visual Identity — Khatwa',
            bi_meta_desc: 'Logo design, brand guidelines, and visual identity applications tailored to each project.',
            bi_title: 'A Visual Identity That Reflects Your Business and Keeps Every Touchpoint Consistent.',
            bi_intro: 'We help businesses build a clear, cohesive identity—from logo design and color and typography selection to brand guidelines and branded stationery, according to each project’s requirements.',
            bi_inc1: 'Logo design.',
            bi_inc2: 'Color palette and typography selection.',
            bi_inc3: 'Brand guidelines explaining the use of identity elements.',
            bi_inc4: 'Letterheads, business cards, and other agreed brand applications.',
            bi_inc5: 'Final files in the agreed formats.',
            bi_step1: 'Understand the business and identity requirements.',
            bi_step2: 'Define the creative direction and design references.',
            bi_step3: 'Develop and review the logo and identity elements.',
            bi_step4: 'Prepare the brand guidelines and requested applications.',
            bi_step5: 'Deliver the approved files within the agreed scope.',
            bi_q1: 'Is the service limited to logo design?',
            bi_a1: 'No. The service starts with logo design and can extend to color and typography selection, brand guidelines, and agreed applications, according to each project’s requirements.',
            bi_q2: 'Which applications can be included?',
            bi_a2: 'Letterheads, business cards, and other brand applications can be included as agreed in the project scope.',
            bi_q3: 'Which files will I receive?',
            bi_a3: 'You receive the approved final files in the formats agreed within the project scope.',
            bi_cta: 'Build Your Brand Identity — Request a Quote.',
            sm_meta_title: 'Social Media Design for Businesses — Khatwa',
            sm_meta_desc: 'Social media post designs aligned with your brand, using client-provided text and images.',
            sm_title: 'Social Media Designs That Reflect Your Brand.',
            sm_intro: 'We create social media post designs aligned with your visual identity and business. We help showcase your projects, services, and updates using the text, images, and information you provide.',
            sm_inc1: 'Individual posts or post sets according to the agreed scope.',
            sm_inc2: 'Consistent use of the approved brand identity.',
            sm_inc3: 'Clear arrangement of client-provided text and images.',
            sm_inc4: 'Delivery in the agreed dimensions and formats.',
            sm_step1: 'Define the post types and target platforms.',
            sm_step2: 'Receive the text, images, and brand assets.',
            sm_step3: 'Create and review the designs according to the agreement.',
            sm_step4: 'Deliver the final files.',
            sm_note_title: 'Scope Note',
            sm_note: 'The core service covers design only. Caption writing, account management, scheduling, publishing, and responding to messages are not included.',
            sm_cta: 'Share your requirements and request a quote.',
            sm_q1: 'Do you write captions or manage our social media accounts?',
            sm_a1: 'No. The core service covers design only. Caption writing, account management, scheduling, publishing, and responding to messages are not included.',
            sm_q2: 'Do we need to provide the text and images?',
            sm_a2: 'Yes. We design using the text, images, and information you provide, and arrange them clearly within the design.',
            sm_q3: 'Can the sizes and formats be agreed in advance?',
            sm_a3: 'Yes. The designs are delivered in the dimensions and formats agreed in the project scope.',
            nav_work: 'Our Work',
            cta_services: 'Explore Our Services',
            ab_meta_title: 'About Khatwa Designs — Engineering-Focused Creative Partner',
            ab_meta_desc: 'Learn about Khatwa Designs, founded in 2021 in Mansoura, Egypt, serving construction companies and engineering firms in Egypt and Saudi Arabia.',
            ab_title: 'We Understand Your Industry. We Help You Present It Better.',
            ab_p1: 'Founded in 2021 and headquartered in Mansoura, Egypt, Khatwa Designs is a creative and digital partner for construction companies and engineering firms. We help businesses present their expertise professionally, showcase their projects, and build a stronger market presence.',
            ab_p2: 'What sets Khatwa apart is our practical understanding of the engineering and construction sector. The company’s founder is an engineer who leads the work and remains directly involved in delivering selected projects. This perspective informs how we organize technical and business information and present it clearly and professionally.',
            ab_p3: 'We bring complementary services together under one roof, including visual identity and company profile design, presentations, tender documents and technical proposals, website design and development, and social media post design.',
            ab_p4: 'We have delivered projects in Egypt and Saudi Arabia. We begin by understanding each client’s needs and objectives before defining the appropriate solution. We believe design is more than appearance: it helps businesses communicate their message, demonstrate the value of their work, and present themselves in a way that reflects their business.',
            ab_closing: 'Khatwa Designs — Engineering Insight. Creative Solutions. A Connected Digital Presence.',
            ab_mission_title: 'Our Mission',
            ab_mission: 'To help businesses, especially construction companies and engineering firms, present their services, expertise, and projects professionally through well-organized content and cohesive design.',
            ab_vision_title: 'Our Vision',
            ab_vision: 'To become a trusted partner for businesses seeking connected design, content, and digital presence solutions grounded in their real needs.',
            ab_values_title: 'Our Values',
            ab_val1: 'Understand the client’s needs before production.',
            ab_val2: 'Keep content clear and approved information accurate.',
            ab_val3: 'Maintain visual consistency across deliverables.',
            ab_val4: 'Communicate clearly and structure review stages.',
            ab_val5: 'Deliver according to the agreed scope and deliverables.',
            pf_meta_title: 'Khatwa Designs Portfolio',
            pf_meta_desc: 'Explore selected company profiles, websites, visual identity, and presentation projects by Khatwa Designs.',
            pf_title: 'Selected Projects by Khatwa Designs.',
            pf_intro: 'Explore selected projects across company profiles, websites, visual identity, presentations, and social media design.',
            pf_f_all: 'All',
            pf_f_profiles: 'Company Profiles',
            pf_f_presentations: 'Presentations',
            pf_f_websites: 'Websites',
            pf_f_brand: 'Brand Identity',
            pf_f_social: 'Social Media Design',
            pf_cat_website: 'Website',
            pf_cat_brand: 'Brand identity',
            pf_cat_social: 'Social media design',
            pf_cat_portfolio: 'Engineering portfolio',
            pf_view_profile: 'Browse on Behance Profile',
            pf_proj7: 'Engineering Group Portfolio',
            pf_proj8: 'Lawyer Fahad Al-Mutairi Company Website',
            pf_proj9: 'Omega Training Academy Website',
            pf_proj10: 'Social Media Designs — Eng. Talal Shaker’s Office',
            pf_proj11: 'Eng. Aya Rushdy — Branding',
            pf_proj12: 'Eng. Mohamed Al-Najjar — Branding',
            cs_meta_title: 'Khatwa Designs Client Reviews',
            cs_meta_desc: 'Read selected client recommendations published on Khatwa Designs’ Facebook page.',
            cs_title: 'What Clients Say About Working with Khatwa.',
            cs_intro: 'We appreciate the recommendations shared by clients on Khatwa Designs’ Facebook page. This page presents selected feedback as originally published, with the source and date indicated.',
            cs_source: 'Recommendation published on Facebook',
            cs_note: 'Most reviews were originally written in Arabic; the English text shown here is a translation. Recommendations date from 2021.',
            cs_rev1: '“A professional company that respects deadlines and delivers high-quality work.”',
            cs_rev2: '“One of the best companies in their field—creative and professional.”',
            cs_rev3: '“May God grant you success and bless you, Eng.—from one success to the next, God willing.”',
            cs_rev4: '“One of the best companies you can work with—they understand you well and you feel very comfortable with them. Thank you for your courtesy.”',
            cs_rev5: '“You are truly very skilled, and I haven’t seen anyone like you before, in both manners and dealings.”',
            cs_rev6: 'A recommendation praising creativity and professionalism in logo and video design.',
            cs_rev7: '“Thank you for the design and for your great taste. Best of luck, God willing.” 🌹',
            cs_rev8: '“Excellent work delivered quickly. Thank you—this won\'t be our last collaboration.” 😍',
            cs_rev9: '“Truly, thank you very much for the beautiful design.”',
            cs_rev10: '“very professional people and highly recommended”',
            cs_rev11: '“They understand their work very well and are committed to deadlines.”',
            cs_rev12: '“One of the best companies I have worked with in design and video editing services. They truly understand their craft and have great experience in the field.”',
            cs_date1: '3 October 2021',
            cs_date2: '3 October 2021',
            cs_date3: '11 September 2021',
            cs_date4: '11 September 2021',
            cs_date5: '11 September 2021',
            cs_date6: '13 July 2021',
            cs_date7: '8 July 2021',
            cs_date8: '7 July 2021',
            cs_date9: '7 July 2021',
            cs_date10: '15 May 2021',
            cs_date11: '15 May 2021',
            cs_date12: '15 May 2021',
            country_egypt: 'Egypt (+20)',
            country_saudi: 'Saudi Arabia (+966)',
            country_kuwait: 'Kuwait (+965)',
            country_uae: 'UAE (+971)',
            country_qatar: 'Qatar (+974)',
            country_bahrain: 'Bahrain (+973)',
            country_iraq: 'Iraq (+964)',
            country_turkey: 'Turkey (+90)',
            country_spain: 'Spain (+34)',
            country_other: 'Other'
        },
        ar: {
            nav_home: 'الرئيسية',
            nav_about: 'من نحن',
            nav_services: 'خدماتنا',
            nav_testimonials: 'آراء العملاء',
            nav_contact: 'تواصل معنا',
            service_profiles: 'بروفايلات الشركات والمكاتب الهندسية',
            service_presentations: 'العروض التقديمية وملفات المناقصات والعروض الفنية',
            service_web: 'تصميم وتطوير المواقع الإلكترونية',
            service_brand: 'الشعارات والهوية البصرية',
            service_social: 'تصميم منشورات السوشيال ميديا',
            search_title: 'ماذا تبحث عنه؟',
            search_placeholder: 'اكتب كلمات البحث...',
            cta_quote: 'اطلب عرض سعر',
            lang_ar: 'العربية',
            lang_en: 'English',
            footer_copy: '© 2026 Khatwa Designs - خطوة للتصميمات',
            footer_intro: 'خطوة للتصميمات شريك إبداعي ورقمي لشركات المقاولات والمكاتب الهندسية، يساعدها على تنظيم المحتوى وتقديم أعمالها من خلال بروفايلات الشركات والعروض الفنية والهوية البصرية والمواقع الإلكترونية.',
            footer_company_title: 'الشركة',
            footer_about: 'من نحن',
            footer_services_link: 'خدماتنا',
            footer_clients: 'آراء العملاء',
            footer_services_title: 'الخدمات',
            footer_privacy: 'سياسة الخصوصية',
            footer_terms: 'الشروط والأحكام',
            footer_copyright_link: 'حقوق النشر',
            coming_soon_title: 'قريبًا',
            coming_soon_subtitle: 'نستعد الآن لإطلاق تجربة أقوى لعلامتك التجارية.',
            coming_soon_placeholder: 'أدخل بريدك الإلكتروني',
            coming_soon_button: 'أخبرني عند الإطلاق',
            coming_soon_note: 'اشترك ليصلك إشعار فور انطلاق الموقع رسميًا.',
            maintenance_title: 'الموقع تحت الصيانة حاليًا.',
            maintenance_text: 'نعمل الآن على تحسينات تقنية وتجهيزية وسنعود إليك قريبًا بتجربة أفضل. شكرًا لصبرك.',
            maintenance_placeholder: 'أدخل بريدك الإلكتروني',
            maintenance_button: 'أخبرني عند العودة',
            cta_work: 'استكشف أعمالنا',
            link_service: 'اكتشف الخدمة',
            home_meta_title: 'خطوة للتصميمات — بروفايلات ومواقع وهوية بصرية',
            home_meta_desc: 'خطوة للتصميمات تساعد شركات المقاولات والمكاتب الهندسية في مصر والسعودية على إعداد بروفايلات الشركات والعروض الفنية وتصميم الهوية والمواقع الإلكترونية.',
            home_hero_kicker: 'من تنظيم المعلومات وكتابة المحتوى إلى التصميم والتسليم.',
            home_hero_title: 'شريك إبداعي يفهم عالمك الهندسي.',
            home_hero_text: 'نساعد شركات المقاولات والمكاتب الهندسية على تقديم خبراتها ومشروعاتها باحترافية، من خلال بروفايلات الشركات، والعروض الفنية، والهوية البصرية، والمواقع الإلكترونية.',
            home_services_title: 'خدمات تصميم متكاملة لعرض أعمالك باحترافية.',
            home_services_intro: 'نجمع بين فهم احتياجات شركتك، وتنظيم المعلومات، وإعداد المحتوى، والتصميم؛ لتصل رسالتك إلى عملائك بصورة واضحة ومتناسقة.',
            home_svc1_title: 'بروفايلات الشركات والمكاتب الهندسية',
            home_svc1_text: 'نرتب معلومات شركتك ونصوغ محتواها، ثم نصمم بروفايلًا يبرز خدماتك وخبراتك ومشروعاتك.',
            home_svc2_title: 'العروض التقديمية وملفات المناقصات',
            home_svc2_text: 'ننظم المستندات والمعلومات التي تقدمها، ونحرر المحتوى، ثم نصمم العرض أو الملف بما يلائم هدفه والجمهور المستهدف.',
            home_svc3_title: 'تصميم وتطوير المواقع الإلكترونية',
            home_svc3_text: 'نساعدك على تخطيط صفحات الموقع وإعداد محتواه وتصميمه وتطويره وتجهيزه للنشر.',
            home_svc4_title: 'الشعارات والهوية البصرية',
            home_svc4_text: 'نصمم شعارًا وهوية بصرية متناسقة، مع دليل للهوية والتطبيقات المطلوبة حسب المشروع.',
            home_svc5_title: 'تصميم منشورات السوشيال ميديا',
            home_svc5_text: 'نصمم منشورات تتوافق مع هوية شركتك والنصوص والصور التي تقدمها.',
            home_why_title: 'نفهم طبيعة أعمالك قبل أن نبدأ التصميم.',
            home_why1_title: 'فهم القطاع الهندسي',
            home_why1_text: 'خبرة مؤسس الشركة كمهندس تساعدنا على فهم طريقة عرض خدمات الشركات الهندسية ومشروعاتها واحتياجاتها.',
            home_why2_title: 'المحتوى والتصميم معًا',
            home_why2_text: 'نساعد في تنظيم المعلومات وصياغة المحتوى ثم تصميمه، بدل ترك العميل ينسق بين جهات متعددة.',
            home_why3_title: 'من الفكرة إلى التسليم',
            home_why3_text: 'نعمل وفق خطوات واضحة تبدأ بفهم المطلوب وتنتهي بتسليم الملفات المتفق عليها.',
            home_work_title: 'أعمال مختارة من مشروعات خطوة.',
            home_work_intro: 'تعرّف على نماذج من بروفايلات الشركات، والمواقع الإلكترونية، والعروض التقديمية التي نفذناها لعملائنا.',
            home_work_view: 'عرض المشروع على Behance',
            home_work_all: 'مشاهدة كل الأعمال',
            home_proj1: 'بروفايل شركة غاية للمقاولات',
            home_proj2: 'بروفايل شركة وادي الأبرقين للمقاولات',
            home_proj3: 'بروفايل شركة الإعمار الفريد',
            home_proj4: 'بروفايل مكتب BIM Connection الهندسي',
            home_proj5: 'موقع شركة الماهر للإلكتروميكانيك',
            home_proj6: 'TPACK PowerPoint Presentation',
            home_cat_contracting: 'بروفايل شركة مقاولات',
            home_cat_company: 'بروفايل شركة',
            home_cat_office: 'بروفايل مكتب هندسي',
            home_cat_website: 'موقع إلكتروني لشركة في مجال الخدمات الهندسية',
            home_cat_presentation: 'نموذج من أعمال العروض التقديمية',
            home_process_title: 'خطوات واضحة من أول نقاش حتى التسليم.',
            home_step1_title: 'نفهم احتياجك',
            home_step1_text: 'نحدد الهدف والجمهور والمخرجات المطلوبة.',
            home_step2_title: 'ننظم المعلومات',
            home_step2_text: 'نراجع مستنداتك ونرتب المحتوى ونحدد ما يلزم استكماله.',
            home_step3_title: 'نصمم ونراجع',
            home_step3_text: 'ننفذ العمل ونتلقى ملاحظاتك وفق مراحل المراجعة المتفق عليها.',
            home_step4_title: 'نسلّم الملفات',
            home_step4_text: 'نسلّم المخرجات النهائية وفق نطاق المشروع والاتفاق.',
            home_reviews_title: 'ثقة نبنيها من خلال تجربة التعامل.',
            home_reviews_intro: 'هذه مختارات من توصيات منشورة على صفحة خطوة للتصميمات على فيسبوك.',
            home_reviews_note: 'النصوص كما نُشرت أصلًا على الصفحة؛ توصية Amira Hassan كُتبت بالإنجليزية.',
            home_reviews_btn: 'قراءة المزيد من التوصيات',
            home_rev1: '«شركة محترمة جدا بيحترموا مواعيدهم وشغلهم عالي»',
            home_rev2: '«شغل ممتاز وفي وقت منجز جدا شكرا ليكم ومش آخر تعامل إن شاء الله 😍»',
            home_rev3: '«بصراحة ناس فاهمين شغلهم كويس جدا وملتزمين في مواعيدهم»',
            home_rev4: 'توصية بشأن الإبداع والاحترافية في تصميم اللوجو والفيديو.',
            home_rev5: '“very professional people and highly recommended”',
            home_rev_date1: 'أكتوبر 2021',
            home_rev_date2: 'يوليو 2021',
            home_rev_date3: 'مايو 2021',
            home_rev_date4: 'يوليو 2021',
            home_rev_date5: 'مايو 2021',
            home_cta_title: 'عندك مشروع وتحتاج شريكًا يفهم احتياجك؟',
            home_cta_text: 'شاركنا فكرة المشروع والمعلومات المتاحة، وسنراجع احتياجك ونحدد نطاق العمل والمخرجات المناسبة.',
            svc_scope_title: 'ماذا تشمل الخدمة؟',
            svc_for_title: 'لمن تناسب الخدمة؟',
            svc_process_title: 'كيف نعمل؟',
            svc_faq_title: 'الأسئلة الشائعة',
            cp_meta_title: 'تصميم بروفايلات شركات المقاولات والمكاتب الهندسية — خطوة',
            cp_meta_desc: 'تنظيم المعلومات وكتابة المحتوى وتصميم بروفايلات احترافية لشركات المقاولات والمكاتب الهندسية وفق نطاق المشروع.',
            cp_title: 'بروفايل شركتك يبدأ من فهم أعمالك، مش من التصميم فقط.',
            cp_intro: 'نساعد شركات المقاولات والمكاتب الهندسية على تقديم خدماتها وخبراتها ومشروعاتها في بروفايل احترافي يجمع بين المحتوى المنظم والتصميم المتناسق. نراجع المعلومات والمستندات والصور التي تقدمها، وننظمها ونصوغ المحتوى ونحرره، ثم ننفذ التصميم والإخراج النهائي وفق نطاق المشروع.',
            cp_inc1_title: 'تنظيم المعلومات',
            cp_inc1_text: 'مراجعة المواد التي يقدمها العميل وترتيب المعلومات والأقسام بما يساعد القارئ على فهم الشركة وخدماتها.',
            cp_inc2_title: 'صياغة المحتوى وتحريره',
            cp_inc2_text: 'كتابة النصوص أو تطويرها وتحريرها بلغة واضحة ومهنية، مع الحفاظ على المعلومات المعتمدة من العميل.',
            cp_inc3_title: 'التصميم والإخراج',
            cp_inc3_text: 'بناء تسلسل بصري واضح للخدمات والخبرات والمشروعات، مع مراعاة الهوية البصرية وسهولة القراءة.',
            cp_inc4_title: 'التسليم النهائي',
            cp_inc4_text: 'تسليم الملفات والصيغ المتفق عليها في عرض السعر ونطاق العمل.',
            cp_for1: 'شركات المقاولات والإنشاءات.',
            cp_for2: 'المكاتب والاستشارات الهندسية.',
            cp_for3: 'شركات البنية التحتية والخدمات الفنية.',
            cp_for4: 'الشركات التي تستعد للتوسع أو التقدم لفرص جديدة.',
            cp_for5: 'الشركات التي تحتاج إلى تحديث بروفايلها الحالي.',
            cp_step1: 'نفهم نشاط الشركة والجمهور المستهدف والغرض من البروفايل.',
            cp_step2: 'نراجع المعلومات والمستندات والصور المتاحة.',
            cp_step3: 'ننظم المحتوى ونحرره للمراجعة والاعتماد.',
            cp_step4: 'ننفذ التصميم ونراجع الملاحظات وفق المراحل المتفق عليها.',
            cp_step5: 'نسلّم الملفات النهائية المعتمدة.',
            cp_q1: 'هل تساعدون في كتابة محتوى البروفايل أم تصممون فقط؟',
            cp_a1: 'نساعد في تنظيم المعلومات وكتابة المحتوى وتحريره اعتمادًا على مستندات ومعلومات وصور يقدمها العميل، ثم ننفذ التصميم والإخراج النهائي.',
            cp_q2: 'هل يمكن تحديث بروفايل موجود بالفعل؟',
            cp_a2: 'يمكن مراجعة البروفايل الحالي وتحديث محتواه وتصميمه وفق حالة المواد المتاحة والهدف من التحديث، ويُحدد نطاق العمل بعد مراجعة الملف.',
            cp_q3: 'هل تراجع خطوة صحة المعلومات الفنية؟',
            cp_a3: 'نعمل على تنظيم المعلومات وتحريرها وعرضها بوضوح، لكن العميل مسؤول عن دقة البيانات الفنية والتجارية واعتمادها قبل التسليم النهائي.',
            cp_q4: 'هل يمكن تنفيذ البروفايل بالعربية والإنجليزية؟',
            cp_a4: 'يمكن تحديد اللغات المطلوبة عند الاتفاق على نطاق المشروع، ويُوضح في عرض السعر ما إذا كانت كتابة أو ترجمة المحتوى بكل لغة مشمولة.',
            cp_q5: 'ما الملفات التي أستلمها؟',
            cp_a5: 'تُحدد صيغ الملفات النهائية وإمكانية تسليم الملفات القابلة للتحرير في عرض السعر قبل بدء العمل.',
            cp_cta: 'شاركنا معلومات شركتك واطلب عرض سعر لبروفايلك.',
            svc_types_title: 'أنواع المشروعات',
            pp_meta_title: 'تصميم العروض التقديمية وملفات المناقصات — خطوة',
            pp_meta_desc: 'إعداد المحتوى وتحريره وتصميم العروض التقديمية والعروض الفنية وملفات المناقصات اعتمادًا على مستندات العميل.',
            pp_title: 'محتوى منظم. عرض احترافي. صورة تعكس قدرات شركتك.',
            pp_intro: 'نساعد شركات المقاولات والمكاتب الهندسية على إعداد وتقديم المعلومات الفنية والتجارية بصورة واضحة ومنظمة. نراجع المستندات التي يقدمها العميل، وننظم المعلومات ونصوغ المحتوى ونحرره، ثم نصمم العرض أو الملف ونجهزه للتسليم وفق النطاق المتفق عليه.',
            pp_inc1: 'مراجعة مستندات العميل وتنظيم المعلومات.',
            pp_inc2: 'صياغة المحتوى وتحريره مع المحافظة على المعنى والبيانات المعتمدة.',
            pp_inc3: 'تنظيم تسلسل الأقسام والعناوين والجداول.',
            pp_inc4: 'تصميم الشرائح والصفحات والعناصر البصرية بما يخدم وضوح المعلومات.',
            pp_inc5: 'إخراج الملفات النهائية وفق الصيغ المتفق عليها.',
            pp_type1: 'العروض التقديمية للشركات واجتماعات العملاء.',
            pp_type2: 'العروض الفنية والتجارية.',
            pp_type3: 'ملفات المناقصات والتأهيل المسبق، في حدود نطاق المحتوى والتصميم المتفق عليه.',
            pp_type4: 'عروض المشروعات والحلول الهندسية.',
            pp_type5: 'العروض التعريفية بشركات المقاولات والبنية التحتية.',
            pp_step1: 'تحديد غرض العرض والجمهور المستهدف.',
            pp_step2: 'مراجعة مستندات العميل وتجميع المعلومات.',
            pp_step3: 'تنظيم المحتوى وصياغته وإرساله للمراجعة.',
            pp_step4: 'تنفيذ التصميم والإخراج ومراجعة الملاحظات وفق الاتفاق.',
            pp_step5: 'تسليم الملفات النهائية المتفق عليها.',
            pp_q1: 'هل تكتبون محتوى العرض الفني من مستنداتنا؟',
            pp_a1: 'نعم، تشمل الخدمة تنظيم المعلومات وصياغة المحتوى وتحريره اعتمادًا على المستندات التي يقدمها العميل، ثم التصميم والإخراج.',
            pp_q2: 'هل تشمل الخدمة إعدادًا هندسيًا أو اعتمادًا للمناقصة؟',
            pp_a2: 'الخدمة المعروضة هنا تخص تنظيم المحتوى وصياغته وتصميمه. إعداد الحلول الفنية أو مراجعة الامتثال لمتطلبات المناقصة أو اعتماد المستندات هندسيًا ليس ضمنها إلا إذا تم الاتفاق صراحةً على خدمة مستقلة ومؤهلة لذلك.',
            pp_q3: 'هل يمكنكم العمل على عرض موجود بالفعل؟',
            pp_a3: 'نعم، يمكن مراجعة المحتوى والتصميم الموجودين وتحديثهما بعد تقييم الملف وتحديد المطلوب.',
            pp_q4: 'هل يمكن تحديد صيغة التسليم مسبقًا؟',
            pp_a4: 'نعم، نحدد صيغ الملفات، وعدد الشرائح أو الصفحات، وعدد مراحل المراجعة في نطاق العمل وعرض السعر.',
            pp_cta: 'أرسل تفاصيل العرض والمستندات المتاحة لطلب عرض سعر.',
            wd_types_title: 'أنواع المواقع',
            wd_meta_title: 'تصميم وتطوير المواقع الإلكترونية للشركات — خطوة',
            wd_meta_desc: 'تخطيط محتوى المواقع وتصميمها وتطويرها وتجهيزها للنشر للشركات والمكاتب الهندسية، مع صيانة اختيارية بعد الإطلاق.',
            wd_title: 'موقع احترافي يعكس هوية شركتك ويعرض أعمالك بوضوح.',
            wd_intro: 'نساعد شركات المقاولات والمكاتب الهندسية على بناء حضور رقمي احترافي من خلال مواقع تجمع بين التصميم والمحتوى المنظم وتجربة الاستخدام الواضحة. تشمل الخدمة تخطيط الصفحات، وتنظيم وكتابة المحتوى اعتمادًا على معلومات العميل، وتصميم الموقع وتطويره وتجهيزه للنشر وربط الدومين ضمن نطاق المشروع. ويمكن الاتفاق على الصيانة والتحديثات بعد الإطلاق كخدمة إضافية.',
            wd_inc1: 'فهم نشاط الشركة وأهداف الموقع والجمهور المستهدف.',
            wd_inc2: 'تخطيط الصفحات وتنظيم الأقسام.',
            wd_inc3: 'تنظيم وكتابة محتوى الموقع اعتمادًا على معلومات ومستندات وصور العميل.',
            wd_inc4: 'تصميم الموقع وتطويره حسب نطاق المشروع.',
            wd_inc5: 'التجهيز للنشر على الاستضافة المتفق عليها والمساعدة في ربط الدومين.',
            wd_inc6: 'صيانة وتحديثات بعد الإطلاق عند طلب العميل وباتفاق منفصل.',
            wd_type1: 'مواقع تعريفية لشركات المقاولات والمكاتب الهندسية.',
            wd_type2: 'مواقع تعرض الخدمات والمشروعات والأعمال السابقة.',
            wd_type3: 'مواقع تعريفية للشركات الصغيرة والمتوسطة.',
            wd_type4: 'صفحات هبوط لحملات أو خدمات محددة، حسب نطاق المشروع.',
            wd_type5: 'تحديث وتطوير مواقع قائمة.',
            wd_step1: 'تحديد الهدف والصفحات والوظائف المطلوبة.',
            wd_step2: 'تنظيم المحتوى وتجهيز النصوص والصور.',
            wd_step3: 'تصميم الموقع وتطويره ومراجعته.',
            wd_step4: 'تجهيز النشر وربط الدومين حسب الاتفاق.',
            wd_step5: 'التسليم، مع خيار متابعة الموقع وصيانته بعد الإطلاق.',
            wd_q1: 'هل تشمل الخدمة كتابة محتوى الموقع؟',
            wd_a1: 'نعم، تشمل تنظيم وكتابة المحتوى اعتمادًا على المعلومات والمستندات والصور التي يقدمها العميل. ويُحدد نطاق اللغات والترجمة في عرض السعر.',
            wd_q2: 'هل تشمل الاستضافة والدومين؟',
            wd_a2: 'تشمل الخدمة تجهيز الموقع للنشر والمساعدة في ربط الدومين وفق نطاق المشروع. رسوم الدومين والاستضافة وأي خدمات أو اشتراكات خارجية تُذكر بشكل منفصل في عرض السعر ما لم يُنص على غير ذلك.',
            wd_q3: 'هل الصيانة والتحديثات بعد الإطلاق مشمولة؟',
            wd_a3: 'الصيانة والتحديثات ليست تلقائيًا جزءًا من التنفيذ الأساسي؛ يمكن طلبها والاتفاق على نطاقها وتكلفتها بعد الإطلاق.',
            wd_q4: 'هل تشمل الخدمة تحسين الظهور على محركات البحث (SEO)؟',
            wd_a4: 'لا ينبغي اعتبار خدمات SEO المتقدمة مشمولة تلقائيًا. يمكن تحديد إعدادات SEO الأساسية أو أي أعمال تحسين إضافية ضمن نطاق المشروع وعرض السعر.',
            wd_q5: 'هل يمكن تطوير موقع موجود بدلًا من إنشاء موقع جديد؟',
            wd_a5: 'يمكن مراجعة الموقع الحالي وتحديد ما يمكن تحديثه أو تطويره بعد تقييم حالته ومتطلبات العميل.',
            wd_cta: 'أخبرنا عن نشاطك وأهداف موقعك لطلب عرض سعر.',
            bi_meta_title: 'تصميم الشعارات والهوية البصرية — خطوة',
            bi_meta_desc: 'تصميم الشعارات والهوية البصرية ودليل الهوية وتطبيقاتها للشركات حسب نطاق المشروع.',
            bi_title: 'هوية بصرية تعكس شخصية شركتك وتوحّد صورتها أمام عملائها.',
            bi_intro: 'نساعد الشركات على بناء هوية بصرية واضحة ومتماسكة تبدأ من تصميم الشعار، وتمتد إلى اختيار الألوان والخطوط وإعداد دليل الهوية، مع تطبيقها على المطبوعات والأوراق الرسمية وبطاقات الأعمال وغيرها حسب احتياجات المشروع.',
            bi_inc1: 'تصميم الشعار.',
            bi_inc2: 'اختيار الألوان والخطوط.',
            bi_inc3: 'إعداد دليل الهوية البصرية وقواعد استخدام عناصرها.',
            bi_inc4: 'تصميم الأوراق الرسمية وبطاقات الأعمال والمطبوعات المطلوبة حسب الاتفاق.',
            bi_inc5: 'تجهيز الملفات النهائية والصيغ المتفق عليها.',
            bi_step1: 'فهم نشاط الشركة ومتطلبات الهوية.',
            bi_step2: 'تحديد الاتجاه الإبداعي ومراجع التصميم.',
            bi_step3: 'تصميم الشعار وعناصر الهوية ومراجعتها.',
            bi_step4: 'إعداد دليل الهوية وتنفيذ التطبيقات المطلوبة.',
            bi_step5: 'تسليم الملفات المعتمدة وفق نطاق المشروع.',
            bi_q1: 'هل الخدمة تقتصر على تصميم الشعار؟',
            bi_a1: 'لا. تبدأ الخدمة من تصميم الشعار ويمكن أن تمتد إلى اختيار الألوان والخطوط وإعداد دليل الهوية والتطبيقات المتفق عليها، حسب احتياجات كل مشروع.',
            bi_q2: 'ما التطبيقات التي يمكن تضمينها؟',
            bi_a2: 'يمكن تضمين الأوراق الرسمية وبطاقات الأعمال وغيرها من تطبيقات الهوية وفق ما يُتفق عليه في نطاق المشروع.',
            bi_q3: 'ما الملفات التي أستلمها؟',
            bi_a3: 'تستلم الملفات النهائية المعتمدة بالصيغ المتفق عليها ضمن نطاق المشروع.',
            bi_cta: 'ابدأ بناء هوية شركتك — اطلب عرض سعر.',
            sm_meta_title: 'تصميم منشورات السوشيال ميديا للشركات — خطوة',
            sm_meta_desc: 'تصميم منشورات سوشيال ميديا متناسقة مع هوية الشركة باستخدام النصوص والصور التي يقدمها العميل.',
            sm_title: 'تصميمات تعكس هوية شركتك وتحافظ على حضورها البصري.',
            sm_intro: 'نصمم منشورات السوشيال ميديا بما يتناسب مع الهوية البصرية لشركتك وطبيعة نشاطها. نساعدك على عرض مشروعاتك وخدماتك وأخبارك من خلال تصميمات متناسقة، باستخدام النصوص والصور والمعلومات التي تقدمها.',
            sm_inc1: 'تصميم منشورات منفردة أو مجموعات منشورات حسب الاتفاق.',
            sm_inc2: 'الالتزام بعناصر الهوية البصرية المعتمدة.',
            sm_inc3: 'تنظيم النصوص والصور التي يوفرها العميل داخل التصميم.',
            sm_inc4: 'تسليم التصميمات بالمقاسات والصيغ المتفق عليها.',
            sm_step1: 'تحديد نوع المنشورات والمنصات المستهدفة.',
            sm_step2: 'استلام النصوص والصور والهوية البصرية.',
            sm_step3: 'تنفيذ التصميمات ومراجعتها وفق الاتفاق.',
            sm_step4: 'تسليم الملفات النهائية.',
            sm_note_title: 'توضيح النطاق',
            sm_note: 'الخدمة الأساسية هي التصميم فقط. كتابة الكابشن، وإدارة الحسابات، والجدولة والنشر والرد على الرسائل ليست ضمن الخدمة الأساسية.',
            sm_cta: 'شاركنا احتياجاتك واطلب عرض سعر.',
            sm_q1: 'هل تكتبون الكابشن أو تديرون حساباتنا على السوشيال ميديا؟',
            sm_a1: 'لا. الخدمة الأساسية هي التصميم فقط. كتابة الكابشن، وإدارة الحسابات، والجدولة والنشر والرد على الرسائل ليست ضمن الخدمة الأساسية.',
            sm_q2: 'هل علينا تقديم النصوص والصور؟',
            sm_a2: 'نعم. نصمم باستخدام النصوص والصور والمعلومات التي تقدمها، وننظمها داخل التصميم بوضوح.',
            sm_q3: 'هل يمكن الاتفاق على المقاسات والصيغ مسبقًا؟',
            sm_a3: 'نعم. تُسلَّم التصميمات بالمقاسات والصيغ المتفق عليها في نطاق المشروع.',
            nav_work: 'أعمالنا',
            cta_services: 'تعرّف على خدماتنا',
            ab_meta_title: 'من نحن — خطوة للتصميمات',
            ab_meta_desc: 'تعرّف على خطوة للتصميمات، تأسست عام 2021 في المنصورة وتعمل مع شركات المقاولات والمكاتب الهندسية في مصر والسعودية.',
            ab_title: 'نفهم أعمالك الهندسية، ونساعدك على تقديمها باحترافية.',
            ab_p1: 'تأسست خطوة للتصميمات عام 2021، ويقع مقرها الرئيسي في المنصورة، مصر. نعمل كشريك إبداعي ورقمي لشركات المقاولات والمكاتب الهندسية، ونساعدها على بناء صورة احترافية تعكس خبراتها، وتبرز مشروعاتها، وتدعم حضورها في السوق.',
            ab_p2: 'ما يميز خطوة هو فهمنا لطبيعة القطاع الهندسي واحتياجاته. فمؤسس الشركة مهندس يقود العمل ويشارك مباشرة في تنفيذ بعض المشروعات، وهو ما يمنحنا منظورًا عمليًا عند تنظيم المعلومات الفنية والتجارية وتقديمها بصورة واضحة ومهنية.',
            ab_p3: 'نجمع تحت جهة واحدة مجموعة من الخدمات المترابطة؛ بدايةً من تصميم الهوية البصرية وبروفايلات الشركات، مرورًا بإعداد العروض التقديمية وملفات المناقصات والعروض الفنية، وصولًا إلى تصميم وتطوير المواقع الإلكترونية وتصميم منشورات السوشيال ميديا.',
            ab_p4: 'نفذنا مشروعات في مصر والمملكة العربية السعودية، ونعمل على فهم احتياجات كل عميل وأهدافه قبل تحديد الحل المناسب. نؤمن أن التصميم لا يقتصر على المظهر، بل يساعد الشركة على توصيل رسالتها، وإظهار قيمة أعمالها، وتقديم نفسها بشكل يعكس طبيعة نشاطها.',
            ab_closing: 'خطوة للتصميمات — فهم هندسي، وحلول إبداعية، وحضور رقمي متكامل.',
            ab_mission_title: 'رسالتنا',
            ab_mission: 'مساعدة الشركات، خصوصًا شركات المقاولات والمكاتب الهندسية، على تقديم خدماتها وخبراتها ومشروعاتها بصورة مهنية من خلال محتوى منظم وتصميمات متناسقة.',
            ab_vision_title: 'رؤيتنا',
            ab_vision: 'أن نكون شريكًا موثوقًا للشركات التي تبحث عن حلول تصميم ومحتوى وحضور رقمي متكاملة، مبنية على فهم احتياجاتها الفعلية.',
            ab_values_title: 'قيمنا',
            ab_val1: 'فهم احتياجات العميل قبل بدء التنفيذ.',
            ab_val2: 'وضوح المحتوى ودقة المعلومات المعتمدة.',
            ab_val3: 'الاتساق البصري في مختلف المخرجات.',
            ab_val4: 'التواصل المنظم والمراجعات الواضحة.',
            ab_val5: 'الالتزام بنطاق العمل والمخرجات المتفق عليها.',
            pf_meta_title: 'أعمال خطوة للتصميمات',
            pf_meta_desc: 'شاهد نماذج من بروفايلات الشركات والمواقع والهويات البصرية والعروض التقديمية التي نفذتها خطوة.',
            pf_title: 'أعمال مختارة من مشروعات خطوة.',
            pf_intro: 'نستعرض مجموعة من المشروعات التي نفذتها خطوة في بروفايلات الشركات، والمواقع الإلكترونية، والهويات البصرية، والعروض التقديمية، وتصميمات السوشيال ميديا.',
            pf_f_all: 'الكل',
            pf_f_profiles: 'بروفايلات الشركات',
            pf_f_presentations: 'العروض التقديمية',
            pf_f_websites: 'المواقع الإلكترونية',
            pf_f_brand: 'الهوية البصرية',
            pf_f_social: 'السوشيال ميديا',
            pf_cat_website: 'موقع إلكتروني',
            pf_cat_brand: 'هوية بصرية',
            pf_cat_social: 'تصميم سوشيال ميديا',
            pf_cat_portfolio: 'بورتفوليو هندسي',
            pf_view_profile: 'تصفح على صفحة Behance',
            pf_proj7: 'بورتفوليو المجموعة الهندسية',
            pf_proj8: 'موقع شركة المحامي فهد المطيري',
            pf_proj9: 'موقع أكاديمية أوميجا للتدريب',
            pf_proj10: 'تصميمات سوشيال — مكتب المهندس طلال شاكر',
            pf_proj11: 'مهندسة آية رشدي — Branding',
            pf_proj12: 'مهندس محمد النجار — Branding',
            cs_meta_title: 'آراء عملاء خطوة للتصميمات',
            cs_meta_desc: 'اقرأ مختارات من توصيات العملاء المنشورة على صفحة خطوة للتصميمات على فيسبوك.',
            cs_title: 'آراء عملائنا عن تجربة التعامل مع خطوة.',
            cs_intro: 'نعتز بالتوصيات التي شاركها عملاؤنا على صفحة خطوة للتصميمات على فيسبوك. نعرض هنا مجموعة من آرائهم كما نُشرت، مع الإشارة إلى المصدر والتاريخ.',
            cs_source: 'توصية منشورة على Facebook',
            cs_note: 'تعود هذه التوصيات إلى عام 2021، وتظهر بنصها الأصلي كما نُشرت.',
            cs_rev1: '«شركة محترمة جدا بيحترموا مواعيدهم وشغلهم عالي»',
            cs_rev2: '«من افضل الشركات في مجالهم مبدعين و محترفين»',
            cs_rev3: '«ربنا يوفقكم ويكرمكم يا بشمهندس ومن نجاح لنجاح إن شاء الله»',
            cs_rev4: '«من أفضل الشركات اللي ممكن تتعامل معاها وتفهم كويس منها وترتاح معاها جدا شكرا على ذوقكم»',
            cs_rev5: '«بجد حضرتكم شاطرين جدا وما شوفتش زيكم قبل كده سواء في الأخلاق أو التعامل»',
            cs_rev6: 'توصية بشأن الإبداع والاحترافية في تصميم اللوجو والفيديو.',
            cs_rev7: '«شكرا على التصميم وعلى ذوقكم جدا بالتوفيق إن شاء الله 🌹»',
            cs_rev8: '«شغل ممتاز وفي وقت منجز جدا شكرا ليكم ومش آخر تعامل إن شاء الله 😍»',
            cs_rev9: '«بجد شكرا جدا على التصميم الجميل»',
            cs_rev10: '“very professional people and highly recommended”',
            cs_rev11: '«بصراحة ناس فاهمين شغلهم كويس جدا وملتزمين في مواعيدهم»',
            cs_rev12: '«من أفضل الشركات اللي اتعاملت معاهم في خدمات التصميم والمونتاج بصراحة ناس فاهمين جدا وخبرتهم كبيرة في المجال»',
            cs_date1: '3 أكتوبر 2021',
            cs_date2: '3 أكتوبر 2021',
            cs_date3: '11 سبتمبر 2021',
            cs_date4: '11 سبتمبر 2021',
            cs_date5: '11 سبتمبر 2021',
            cs_date6: '13 يوليو 2021',
            cs_date7: '8 يوليو 2021',
            cs_date8: '7 يوليو 2021',
            cs_date9: '7 يوليو 2021',
            cs_date10: '15 مايو 2021',
            cs_date11: '15 مايو 2021',
            cs_date12: '15 مايو 2021',
            country_egypt: 'مصر (+20)',
            country_saudi: 'السعودية (+966)',
            country_kuwait: 'الكويت (+965)',
            country_uae: 'الإمارات (+971)',
            country_qatar: 'قطر (+974)',
            country_bahrain: 'البحرين (+973)',
            country_iraq: 'العراق (+964)',
            country_turkey: 'تركيا (+90)',
            country_spain: 'أسبانيا (+34)',
            country_other: 'أخرى'
        }
    };

    function getPathLang() {
        var params = new URLSearchParams(window.location.search);
        var lang = params.get('lang');
        if (SUPPORTED_LANGS.indexOf(lang) !== -1) {
            return lang;
        }
        return null;
    }

    function setPathLang(lang) {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        history.replaceState({}, '', url.toString());
    }

    function setText(selector, value) {
        if (!value) return;
        document.querySelectorAll(selector).forEach(function (el) {
            el.textContent = value;
        });
    }

    function setInputPlaceholder(selector, value) {
        if (!value) return;
        document.querySelectorAll(selector).forEach(function (el) {
            el.setAttribute('placeholder', value);
        });
    }

    function applyDataTranslations(dict) {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });
    }

    function applyGlobalText(lang) {
        var t = translations[lang];

        applyDataTranslations(t);

        setText('a.nav-link[href="index.html"]', t.nav_home);
        setText('a.nav-link[href="about.html"]', t.nav_about);
        setText('a.nav-link[href="services.html"]', t.nav_services);
        setText('a.nav-link[href="customer-stories.html"]', t.nav_testimonials);
        setText('a.nav-link[href="contact.html"]', t.nav_contact);

        setText('.search-form-box h2', t.search_title);
        setInputPlaceholder('.search-form-box .search-input', t.search_placeholder);

        document.querySelectorAll('.btn-double-text').forEach(function (el) {
            el.textContent = t.cta_quote;
            el.setAttribute('data-text', t.cta_quote);
        });

        setText('.language-switcher [data-lang="en"]', t.lang_en);
        setText('.language-switcher [data-lang="ar"]', t.lang_ar);
    }

    function applyHomeText(lang) {
        var t = translations[lang];
        var body = document.body;
        var titleKey = body.getAttribute('data-meta-title');
        var descKey = body.getAttribute('data-meta-desc');
        if (!titleKey) {
            var path = window.location.pathname.toLowerCase();
            if (!(path.endsWith('/index.html') || path.endsWith('/'))) return;
            titleKey = 'home_meta_title';
            descKey = 'home_meta_desc';
        }
        if (t[titleKey]) document.title = t[titleKey];
        var meta = document.querySelector('meta[name="description"]');
        if (meta && t[descKey]) meta.setAttribute('content', t[descKey]);
    }

    function applyStatusPageText(lang) {
        var t = translations[lang];

        setText('[data-coming-soon-title]', t.coming_soon_title);
        setText('[data-coming-soon-subtitle]', t.coming_soon_subtitle);
        setInputPlaceholder('[data-coming-soon-placeholder]', t.coming_soon_placeholder);
        setText('[data-coming-soon-button]', t.coming_soon_button);
        setText('[data-coming-soon-note]', t.coming_soon_note);

        setText('[data-maintenance-title]', t.maintenance_title);
        setText('[data-maintenance-text]', t.maintenance_text);
        setInputPlaceholder('[data-maintenance-placeholder]', t.maintenance_placeholder);
        setText('[data-maintenance-button]', t.maintenance_button);
    }

    function ensureLanguageSwitcher() {
        if (document.querySelector('.language-switcher')) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'language-switcher';
        wrapper.innerHTML = '' +
            '<button type="button" class="lang-btn" data-lang="en">English</button>' +
            '<button type="button" class="lang-btn" data-lang="ar">العربية</button>';

        var target = document.querySelector('.header-icon');
        if (target) {
            target.appendChild(wrapper);
        } else {
            document.body.appendChild(wrapper);
        }

        wrapper.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-lang]');
            if (!btn) return;
            var lang = btn.getAttribute('data-lang');
            applyLanguage(lang);
        });
    }

    function setLinksLanguage(lang) {
        document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
                return;
            }
            if (href.indexOf('.html') === -1) return;
            var url = new URL(href, window.location.origin + window.location.pathname);
            url.searchParams.set('lang', lang);
            var next = url.pathname.split('/').pop();
            if (url.search) {
                next += url.search;
            }
            link.setAttribute('href', next);
        });
    }

    function markActiveButton(lang) {
        document.querySelectorAll('.language-switcher .lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    function applyLanguage(lang) {
        var safeLang = SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : 'en';
        localStorage.setItem(STORAGE_KEY, safeLang);
        setPathLang(safeLang);

        document.documentElement.lang = safeLang;
        document.documentElement.dir = safeLang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('lang-ar', safeLang === 'ar');

        applyGlobalText(safeLang);
        applyHomeText(safeLang);
        applyStatusPageText(safeLang);
        setLinksLanguage(safeLang);
        markActiveButton(safeLang);
    }

    document.addEventListener('DOMContentLoaded', function () {
        ensureLanguageSwitcher();
        var savedLang = localStorage.getItem(STORAGE_KEY);
        var pathLang = getPathLang();
        var lang = pathLang || savedLang || 'en';
        applyLanguage(lang);
    });
})();


