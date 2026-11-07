(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('contact-form');
        if (!form) return;
        var result = form.querySelector('.form-results');
        var submit = form.querySelector('button[type="submit"]');
        var sending = false;
        var draftKey = 'khatwa_contact_retry';
        var fields = Array.from(form.querySelectorAll('input:not([type="hidden"]), select, textarea'));
        var services = {
            profiles: 'Company portfolio', presentations: 'PowerPoint presentations',
            websites: 'Web design', brand: 'Brand identity', social: 'Social media design'
        };
        var selected = services[new URLSearchParams(window.location.search).get('service')];
        if (selected) form.elements.subject.value = selected;

        // Keep a failed inquiry only in this tab's session, never in the URL.
        if (new URLSearchParams(window.location.search).get('retry') === '1') {
            try {
                var saved = JSON.parse(sessionStorage.getItem(draftKey) || 'null');
                if (saved && Date.now() - saved.savedAt < 30 * 60 * 1000) {
                    fields.forEach(function (field) {
                        if (Object.prototype.hasOwnProperty.call(saved.fields, field.name) && typeof saved.fields[field.name] === 'string') field.value = saved.fields[field.name];
                    });
                } else sessionStorage.removeItem(draftKey);
            } catch (error) { /* Storage may be unavailable in a private context. */ }
        }

        function text(key) { return window.KhatwaI18n.text(key); }
        function validate(field) {
            var key = field.validity.valueMissing ? 'contact_error_required' : field.validity.typeMismatch ? 'contact_error_email' : '';
            var errorId = field.id + '-error';
            var error = document.getElementById(errorId);
            if (!error) {
                error = document.createElement('span');
                error.id = errorId;
                error.className = 'khatwa-field-error';
                field.closest('.form-group').after(error);
                field.setAttribute('aria-describedby', errorId);
            }
            error.hidden = !key;
            field.classList.toggle('is-invalid', !!key);
            field.setAttribute('aria-invalid', key ? 'true' : 'false');
            if (key) {
                error.setAttribute('data-i18n', key);
                error.textContent = text(key);
            } else {
                error.removeAttribute('data-i18n');
                error.textContent = '';
            }
            return !key;
        }
        fields.forEach(function (field) {
            field.addEventListener('blur', function () { validate(field); });
            field.addEventListener('input', function () {
                if (field.getAttribute('aria-invalid') === 'true') validate(field);
                result.classList.add('d-none');
            });
        });
        function setSending(active) {
            sending = active;
            submit.disabled = active;
            form.setAttribute('aria-busy', active ? 'true' : 'false');
            var label = submit.querySelector('.khatwa-button-text') || submit;
            label.setAttribute('data-i18n', active ? 'contact_sending' : 'contact_submit');
            label.textContent = text(active ? 'contact_sending' : 'contact_submit');
            label.setAttribute('data-text', label.textContent);
        }
        function goToResult(status) {
            var url = new URL('thank-you.html', window.location.href);
            url.searchParams.set('status', status);
            url.searchParams.set('lang', document.documentElement.lang === 'en' ? 'en' : 'ar');
            window.location.assign(url.toString());
        }
        async function sendInquiry(parameters) {
            var config = window.KhatwaEmailJSConfig || {};
            if (![config.serviceId, config.templateId, config.publicKey].every(function (value) { return typeof value === 'string' && value.trim(); })) {
                throw new Error('EmailJS is not configured.');
            }
            var controller = new AbortController();
            var timeout = setTimeout(function () { controller.abort(); }, 20000);
            try {
                var response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: controller.signal,
                    body: JSON.stringify({service_id: config.serviceId, template_id: config.templateId, user_id: config.publicKey, template_params: parameters})
                });
                if (response.status !== 200) throw new Error('EmailJS rejected the inquiry.');
            } finally { clearTimeout(timeout); }
        }
        window.addEventListener('pageshow', function (event) { if (event.persisted) setSending(false); });
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            if (sending) return;
            var invalid = fields.filter(function (field) { return !validate(field); });
            if (invalid.length) { invalid[0].focus(); return; }

            var parameters = {};
            fields.forEach(function (field) { parameters[field.name] = field.value; });
            try { sessionStorage.setItem(draftKey, JSON.stringify({savedAt: Date.now(), fields: parameters})); }
            catch (error) { /* The send operation must still work without storage. */ }
            setSending(true);
            try {
                await sendInquiry(parameters);
                try { sessionStorage.removeItem(draftKey); } catch (error) { /* Optional storage. */ }
                form.reset();
                goToResult('success');
            } catch (error) {
                goToResult('error');
            } finally { setSending(false); }
        });
    });
})();
