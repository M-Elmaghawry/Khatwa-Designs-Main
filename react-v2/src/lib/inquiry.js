export const DRAFT_KEY = 'khatwa_contact_retry';
const MAX_DRAFT_AGE = 30 * 60 * 1000;
export const parameterNames = ['name', 'email', 'country_code', 'phone_number', 'subject', 'comment'];
export function inquiryParameters(values) { return Object.fromEntries(parameterNames.map(name => [name, String(values[name] ?? '')])); }
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
  if (![config?.serviceId, config?.templateId, config?.publicKey].every(value => typeof value === 'string' && value.trim())) throw new Error('EmailJS is not configured.');
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(abort, timeout);
  try {
    const response = await fetcher('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
      body: JSON.stringify({ service_id: config.serviceId, template_id: config.templateId, user_id: config.publicKey, template_params: inquiryParameters(values) })
    });
    if (response.status !== 200) throw new Error('EmailJS rejected the inquiry.');
  } finally { clearTimeout(timer); signal?.removeEventListener('abort', abort); }
}
