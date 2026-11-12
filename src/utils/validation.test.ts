import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  formatBookingReference,
  isIsoDateSunday,
  normalizeIndianPhone,
  validateAppointmentPayload,
  validateEnquiryPayload,
} from './validation';

test('normalizeIndianPhone handles 10-digit, +91, and 0-prefixed Indian mobile numbers', () => {
  assert.equal(normalizeIndianPhone('8882006566'), '+91 88820 06566');
  assert.equal(normalizeIndianPhone('+91 88820-06566'), '+91 88820 06566');
  assert.equal(normalizeIndianPhone('08882006566'), '+91 88820 06566');
  assert.equal(normalizeIndianPhone('12345'), null);
  assert.equal(normalizeIndianPhone('5123456789'), null);
});

test('validateAppointmentPayload rejects missing/invalid fields and accepts valid booking', () => {
  const invalid = validateAppointmentPayload(
    {
      patientName: 'A',
      phone: '1234',
      email: 'bad-email',
      departmentId: '',
      doctorId: '',
      preferredDate: '2025-01-01',
      timeSlot: '',
    },
    '2026-11-12'
  );

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.patientName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.departmentId);
  assert.ok(invalid.errors.doctorId);
  assert.ok(invalid.errors.preferredDate);
  assert.ok(invalid.errors.timeSlot);

  const valid = validateAppointmentPayload(
    {
      patientName: 'Aarav Verma',
      phone: '9876543210',
      email: 'parent@example.com',
      departmentId: 'nicu',
      doctorId: 'dr-kamlesh',
      preferredDate: '2026-11-14',
      timeSlot: '10:00 AM – 11:00 AM',
      visitType: 'OPD Consultation',
      message: 'Newborn follow-up checkup',
    },
    '2026-11-12'
  );

  assert.equal(valid.valid, true);
  assert.equal(valid.sanitized?.phone, '+91 98765 43210');
  assert.equal(valid.sanitized?.patientName, 'Aarav Verma');
});

test('validateEnquiryPayload validates contact enquiry inputs', () => {
  const invalid = validateEnquiryPayload({
    name: '',
    phone: '999',
    email: 'nope',
    subject: 'Hi',
    message: 'Short',
  });
  assert.equal(invalid.valid, false);
  assert.equal(Object.keys(invalid.errors).length, 5);

  const valid = validateEnquiryPayload({
    name: 'Priya Tiwari',
    phone: '8882006566',
    email: 'priya@example.com',
    subject: 'NICU Visiting Hours',
    message: 'Could you please confirm neonatal visiting protocols for parents?',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.sanitized?.phone, '+91 88820 06566');
});

test('formatBookingReference, isIsoDateSunday, and buildWhatsAppUrl format deterministically', () => {
  assert.equal(formatBookingReference(7, '2026-11-14'), 'AMH-20261114-0007');
  assert.equal(isIsoDateSunday('2026-11-15'), true);
  assert.equal(isIsoDateSunday('2026-11-14'), false);
  assert.equal(
    buildWhatsAppUrl('+91 88820 06566', 'Hello Hospital'),
    'https://wa.me/918882006566?text=Hello%20Hospital'
  );
});
