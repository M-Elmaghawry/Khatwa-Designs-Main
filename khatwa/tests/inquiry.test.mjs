import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inquiryParameters, emailTemplateParameters, validateInquiry, sendInquiry, parameterNames } from '../src/lib/inquiry.js';

const valid = { name: 'أحمد محمد', email: 'client+quote@company.technology', country_code: '+20', phone_number: '01012345678', subject: 'Brand identity', comment: 'تفاصيل المشروع المطلوب' };
const config = { serviceId: 'test-service', templateId: 'test-template', publicKey: 'test-public' };

test('every inquiry field is required, including whitespace-only and non-string values', () => {
  assert.deepEqual(validateInquiry(valid), {});
  for (const name of parameterNames) {
    for (const value of ['', ' \n\t ', undefined, null, {}, 123]) {
      assert.equal(validateInquiry({ ...valid, [name]: value })[name], 'contact_error_required', name);
    }
  }
});

test('inquiries validate field types, lengths and allowed select options', () => {
  for (const email of ['missing', 'a@', '@example.com', 'a b@example.com', 'a@example', 'a@example..com']) {
    assert.equal(validateInquiry({ ...valid, email }).email, 'contact_error_email', email);
  }
  for (const phone_number of ['abc12345678', '123', '+20+12345678', '1234567890123456']) {
    assert.equal(validateInquiry({ ...valid, phone_number }).phone_number, 'contact_error_phone');
  }
  for (const phone_number of ['٠١٠١٢٣٤٥٦٧٨', '۰۱۰۱۲۳۴۵۶۷۸', '+20 (10) 1234-5678']) {
    assert.deepEqual(validateInquiry({ ...valid, phone_number }), {});
  }
  assert.equal(validateInquiry({ ...valid, name: '12345' }).name, 'contact_error_text');
  assert.equal(validateInquiry({ ...valid, country_code: '+999' }).country_code, 'contact_error_choice');
  assert.equal(validateInquiry({ ...valid, subject: 'unknown' }).subject, 'contact_error_choice');
  assert.equal(validateInquiry({ ...valid, comment: 'x'.repeat(10001) }).comment, 'contact_error_length');
});

test('invalid submissions cannot reach EmailJS even when calling the adapter directly', async () => {
  let calls = 0;
  const fetcher = async () => { calls++; return { status: 200 }; };
  for (const name of parameterNames) {
    await assert.rejects(sendInquiry({ ...valid, [name]: ' ' }, config, { fetcher }), /invalid fields/);
  }
  await assert.rejects(sendInquiry({ ...valid, email: 'invalid' }, config, { fetcher }), /invalid fields/);
  assert.equal(calls, 0);
  let payload;
  await sendInquiry({ ...valid, name: '  أحمد محمد  ', comment: '  تفاصيل المشروع المطلوب\n ' }, config, {
    fetcher: async (_, options) => { payload = JSON.parse(options.body); return { status: 200 }; }
  });
  assert.deepEqual(payload.template_params, emailTemplateParameters(valid));
});

test('all live EmailJS template variables receive the corresponding form values', () => {
  const parameters = emailTemplateParameters(valid);
  assert.equal(parameters.from_name, valid.name);
  assert.equal(parameters.from_email, valid.email);
  assert.equal(parameters.country, valid.country_code);
  assert.equal(parameters.phone, valid.phone_number);
  assert.equal(parameters.service, valid.subject);
  assert.equal(parameters.message, valid.comment);
  for (const [key, value] of Object.entries(inquiryParameters(valid))) assert.equal(parameters[key], value);
});
