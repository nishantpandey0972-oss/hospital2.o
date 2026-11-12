import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHospitalDatabase } from './db';

test('SQLite database inserts and retrieves appointments and enquiries', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'amh-test-'));
  const dbPath = path.join(tmpDir, 'test.db');

  try {
    const hospitalDb = createHospitalDatabase(dbPath);

    const appt = hospitalDb.insertAppointment({
      patientName: 'Rohan Gupta',
      phone: '+91 98765 43210',
      email: 'rohan@example.com',
      departmentId: 'nicu',
      departmentName: 'Neonatal Intensive Care (NICU)',
      doctorId: 'dr-kamlesh',
      doctorName: 'Dr. Kamlesh',
      preferredDate: '2026-11-18',
      timeSlot: '10:30 AM – 12:00 PM',
      visitType: 'OPD Consultation',
      message: 'Newborn follow-up',
    });

    assert.equal(appt.bookingRef, 'AMH-20261118-0001');
    assert.equal(appt.status, 'Confirmed');

    const byRef = hospitalDb.findAppointments('AMH-20261118-0001');
    assert.equal(byRef.length, 1);
    assert.equal(byRef[0].patientName, 'Rohan Gupta');

    const byPhone = hospitalDb.findAppointments('9876543210');
    assert.equal(byPhone.length, 1);
    assert.equal(byPhone[0].bookingRef, 'AMH-20261118-0001');

    const enq = hospitalDb.insertEnquiry({
      name: 'Neha Singh',
      phone: '+91 88820 06566',
      email: 'neha@example.com',
      subject: 'Pediatric Vaccination',
      message: 'Asking about routine infant vaccination availability on Saturday.',
    });

    assert.equal(enq.enquiryRef, 'ENQ-0001');
    assert.equal(enq.status, 'Received');
    hospitalDb.db.close();
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
