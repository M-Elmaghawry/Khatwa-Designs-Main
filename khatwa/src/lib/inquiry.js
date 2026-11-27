import fields from '../content/form.json' with { type: 'json' };

export const DRAFT_KEY = 'khatwa_contact_retry';
const MAX_DRAFT_AGE = 30 * 60 * 1000;
export const parameterNames = ['name', 'email', 'country_code', 'phone_number', 'subject', 'comment'];
export function inquiryParameters(values = {}) { return Object.fromEntries(parameterNames.map(name => [name, typeof values?.[name] === 'string' ? values[name].trim() : ''])); }
export function emailTemplateParameters(values) {
  const parameters = inquiryParameters(values);
  // The live EmailJS template uses these names; retain the form names for compatibility.
  return { ...parameters, from_name: parameters.name, from_email: parameters.email, country: parameters.country_code, phone: parameters.phone_number, service: parameters.subject, message: parameters.comment };
}
export function inquiryFieldError(name, rawValue) {
  const field = fields.find(field => field.name === name);
  if (!field) return '';
  const value = typeof rawValue === 'string' ? rawValue.trim() : '';
  if (!value) return field.required ? 'contact_error_required' : '';
  if (field.maxLength && value.length > field.maxLength) return 'contact_error_length';
  if (field.tag === 'select' && !field.options.some(option => option.value === value)) return 'contact_error_choice';
  if (name === 'email' && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(value)) return 'contact_error_email';
  if (name === 'name' && !/\p{L}/u.test(value)) return 'contact_error_text';
  if (name === 'phone_number') {
    const phone = value.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0));
    const digits = phone.replace(/\D/g, '');
    if (!/^\+?[0-9\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) return 'contact_error_phone';
  }
  return '';
}
export function validateInquiry(values = {}) {
  return Object.fromEntries(parameterNames.map(name => [name, inquiryFieldError(name, values?.[name])]).filter(([, error]) => error));
}
export function restoreDraft(storage, now = Date.now()) {
  try {
    const draft = JSON.parse(storage.getItem(DRAFT_KEY) || 'null');
    if (draft && Number.isFinite(draft.savedAt) && now >= draft.savedAt && now - draft.savedAt < MAX_DRAFT_AGE && draft.fields && typeof draft.fields === 'object') {
      return Object.fromEntries(parameterNames.filter(name => typeof draft.fields[name] === 'string').map(name => [name, draft.fields[name]]));
    }
    storage.removeItem(DRAFT_KEY);
  } catch { /* Storage is optional and untrusted. */ }
  return null;
}
export function saveDraft(storage, values) { try { storage.setItem(DRAFT_KEY, JSON.stringify({ savedAt: Date.now(), fields: inquiryParameters(values) })); } catch { /* Sending still works. */ } }
export async function sendInquiry(values, config, { fetcher = globalThis.fetch, timeout = 20000, signal } = {}) {
  const parameters = inquiryParameters(values);
  if (Object.keys(validateInquiry(parameters)).length) throw new Error('Inquiry contains invalid fields.');
  if (![config?.serviceId, config?.templateId, config?.publicKey].every(value => typeof value === 'string' && value.trim())) throw new Error('EmailJS is not configured.');
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(abort, timeout);
  try {
    const response = await fetcher('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
      body: JSON.stringify({ service_id: config.serviceId, template_id: config.templateId, user_id: config.publicKey, template_params: emailTemplateParameters(parameters) })
    });
    if (response.status !== 200) throw new Error('EmailJS rejected the inquiry.');
  } finally { clearTimeout(timer); signal?.removeEventListener('abort', abort); }
}
