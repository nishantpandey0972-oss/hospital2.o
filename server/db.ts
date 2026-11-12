import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { formatBookingReference, formatEnquiryReference } from '../src/utils/validation';

export interface AppointmentRecord {
  id: number;
  bookingRef: string;
  patientName: string;
  phone: string;
  email: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  preferredDate: string;
  timeSlot: string;
  visitType: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface EnquiryRecord {
  id: number;
  enquiryRef: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const DEFAULT_DB_PATH = './data/hospital.db';

export function createHospitalDatabase(dbFilePath: string = process.env.DATABASE_PATH || DEFAULT_DB_PATH) {
  const resolved = path.resolve(dbFilePath);
  const dir = path.dirname(resolved);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(resolved);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_ref TEXT UNIQUE NOT NULL,
      patient_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      department_id TEXT NOT NULL,
      department_name TEXT NOT NULL,
      doctor_id TEXT NOT NULL,
      doctor_name TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      visit_type TEXT NOT NULL DEFAULT 'OPD Consultation',
      message TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Confirmed',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiry_ref TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Received',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_appointments_phone ON appointments(phone);
    CREATE INDEX IF NOT EXISTS idx_appointments_ref ON appointments(booking_ref);
  `);

  function mapAppointmentRow(row: any): AppointmentRecord {
    return {
      id: row.id,
      bookingRef: row.booking_ref,
      patientName: row.patient_name,
      phone: row.phone,
      email: row.email,
      departmentId: row.department_id,
      departmentName: row.department_name,
      doctorId: row.doctor_id,
      doctorName: row.doctor_name,
      preferredDate: row.preferred_date,
      timeSlot: row.time_slot,
      visitType: row.visit_type,
      message: row.message,
      status: row.status,
      createdAt: row.created_at,
    };
  }

  function insertAppointment(input: {
    patientName: string;
    phone: string;
    email: string;
    departmentId: string;
    departmentName: string;
    doctorId: string;
    doctorName: string;
    preferredDate: string;
    timeSlot: string;
    visitType: string;
    message: string;
  }): AppointmentRecord {
    const insertTx = db.transaction(() => {
      const tempRef = `PENDING-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const stmt = db.prepare(`
        INSERT INTO appointments (
          booking_ref, patient_name, phone, email,
          department_id, department_name, doctor_id, doctor_name,
          preferred_date, time_slot, visit_type, message, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')
      `);
      const info = stmt.run(
        tempRef,
        input.patientName,
        input.phone,
        input.email,
        input.departmentId,
        input.departmentName,
        input.doctorId,
        input.doctorName,
        input.preferredDate,
        input.timeSlot,
        input.visitType,
        input.message
      );

      const id = Number(info.lastInsertRowid);
      const bookingRef = formatBookingReference(id, input.preferredDate);
      db.prepare('UPDATE appointments SET booking_ref = ? WHERE id = ?').run(bookingRef, id);

      const row = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
      return mapAppointmentRow(row);
    });

    return insertTx();
  }

  function findAppointments(query: string): AppointmentRecord[] {
    const cleaned = query.trim();
    if (!cleaned) return [];
    const hasLetters = /[a-zA-Z]/.test(cleaned);
    const digitsOnly = cleaned.replace(/\D/g, '');

    if (!hasLetters && digitsOnly.length >= 10) {
      const last10 = digitsOnly.slice(-10);
      const formatted = `+91 ${last10.slice(0, 5)} ${last10.slice(5)}`;
      const rows = db
        .prepare('SELECT * FROM appointments WHERE phone = ? ORDER BY id DESC LIMIT 10')
        .all(formatted);
      return rows.map(mapAppointmentRow);
    }

    const rows = db
      .prepare('SELECT * FROM appointments WHERE UPPER(booking_ref) = UPPER(?) ORDER BY id DESC LIMIT 5')
      .all(cleaned);
    return rows.map(mapAppointmentRow);
  }

  function insertEnquiry(input: {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
  }): EnquiryRecord {
    const insertTx = db.transaction(() => {
      const tempRef = `PENDING-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const info = db
        .prepare(
          `INSERT INTO enquiries (enquiry_ref, name, phone, email, subject, message, status)
           VALUES (?, ?, ?, ?, ?, ?, 'Received')`
        )
        .run(tempRef, input.name, input.phone, input.email, input.subject, input.message);

      const id = Number(info.lastInsertRowid);
      const enquiryRef = formatEnquiryReference(id);
      db.prepare('UPDATE enquiries SET enquiry_ref = ? WHERE id = ?').run(enquiryRef, id);

      const row: any = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
      return {
        id: row.id,
        enquiryRef: row.enquiry_ref,
        name: row.name,
        phone: row.phone,
        email: row.email,
        subject: row.subject,
        message: row.message,
        status: row.status,
        createdAt: row.created_at,
      };
    });

    return insertTx();
  }

  return {
    db,
    insertAppointment,
    findAppointments,
    insertEnquiry,
  };
}
