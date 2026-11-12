import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { DEPARTMENTS, DOCTORS } from './src/data/hospitalData';
import { validateAppointmentPayload, validateEnquiryPayload } from './src/utils/validation';
import { createHospitalDatabase } from './server/db';

export function createApp() {
  const app = express();
  const hospitalDb = createHospitalDatabase(process.env.DATABASE_PATH);

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    try {
      hospitalDb.db.prepare('SELECT 1').get();
      res.json({ ok: true, database: 'connected' });
    } catch {
      res.status(500).json({ ok: false, error: 'Database unavailable' });
    }
  });

  app.post('/api/appointments', (req, res) => {
    const validation = validateAppointmentPayload(req.body ?? {});
    if (!validation.valid || !validation.sanitized) {
      res.status(400).json({
        ok: false,
        error: 'Please review the highlighted appointment fields.',
        fieldErrors: validation.errors,
      });
      return;
    }

    const data = validation.sanitized;
    const dept = DEPARTMENTS.find((d) => d.id === data.departmentId);
    const doc = DOCTORS.find((d) => d.id === data.doctorId);

    if (!dept) {
      res.status(400).json({
        ok: false,
        error: 'Selected department was not found.',
        fieldErrors: { departmentId: 'Please select a valid department.' },
      });
      return;
    }

    if (!doc) {
      res.status(400).json({
        ok: false,
        error: 'Selected doctor was not found.',
        fieldErrors: { doctorId: 'Please select a valid doctor.' },
      });
      return;
    }

    try {
      const created = hospitalDb.insertAppointment({
        patientName: data.patientName,
        phone: data.phone,
        email: data.email,
        departmentId: dept.id,
        departmentName: dept.name,
        doctorId: doc.id,
        doctorName: doc.name,
        preferredDate: data.preferredDate,
        timeSlot: data.timeSlot,
        visitType: data.visitType || 'OPD Consultation',
        message: data.message || '',
      });

      res.status(201).json({
        ok: true,
        appointment: created,
      });
    } catch (err) {
      console.error('Failed to persist appointment:', err);
      res.status(500).json({
        ok: false,
        error: 'Unable to save appointment at the moment. Please call +91 88820 06566.',
      });
    }
  });

  app.get('/api/appointments/lookup', (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q : '';
    if (!q.trim()) {
      res.status(400).json({ ok: false, error: 'Provide a Booking Reference ID or 10-digit phone number.' });
      return;
    }

    try {
      const results = hospitalDb.findAppointments(q);
      res.json({ ok: true, appointments: results });
    } catch (err) {
      console.error('Appointment lookup error:', err);
      res.status(500).json({ ok: false, error: 'Failed to look up appointments.' });
    }
  });

  app.post('/api/enquiries', (req, res) => {
    const validation = validateEnquiryPayload(req.body ?? {});
    if (!validation.valid || !validation.sanitized) {
      res.status(400).json({
        ok: false,
        error: 'Please check the contact form fields and try again.',
        fieldErrors: validation.errors,
      });
      return;
    }

    try {
      const created = hospitalDb.insertEnquiry(validation.sanitized);
      res.status(201).json({
        ok: true,
        enquiry: created,
      });
    } catch (err) {
      console.error('Failed to persist enquiry:', err);
      res.status(500).json({
        ok: false,
        error: 'Unable to submit enquiry right now. Please call +91 88820 06566.',
      });
    }
  });

  return app;
}

async function startServer() {
  const app = createApp();
  const port = Number(process.env.PORT || 3000);
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Aradhya & Matulya Hospital server listening on http://0.0.0.0:${port}`);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer().catch((err) => {
    console.error('Server startup error:', err);
    process.exit(1);
  });
}
