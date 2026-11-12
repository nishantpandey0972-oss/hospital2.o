import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Search,
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO, TIME_SLOTS } from '../data/hospitalData';
import {
  buildWhatsAppUrl,
  getTodayIsoDate,
  isIsoDateSunday,
  validateAppointmentPayload,
} from '../utils/validation';

interface ConfirmedAppointment {
  bookingRef: string;
  patientName: string;
  phone: string;
  email: string;
  departmentName: string;
  doctorName: string;
  preferredDate: string;
  timeSlot: string;
  visitType: string;
  message: string;
  status: string;
  createdAt: string;
}

export function AppointmentPage() {
  const [searchParams] = useSearchParams();
  const initialDept = searchParams.get('department') || DEPARTMENTS[0].id;
  const initialDoc = searchParams.get('doctor') || '';
  const initialVisitType = searchParams.get('visitType') || 'OPD Consultation';

  const todayIso = useMemo(() => getTodayIsoDate(), []);

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState(
    DEPARTMENTS.some((d) => d.id === initialDept) ? initialDept : DEPARTMENTS[0].id
  );

  const availableDoctors = useMemo(() => {
    const matched = DOCTORS.filter((doc) => doc.departmentIds.includes(departmentId));
    return matched.length > 0 ? matched : DOCTORS;
  }, [departmentId]);

  const [doctorId, setDoctorId] = useState(() => {
    if (initialDoc && DOCTORS.some((d) => d.id === initialDoc)) return initialDoc;
    const first = DOCTORS.find((d) => d.departmentIds.includes(initialDept));
    return first ? first.id : DOCTORS[0].id;
  });

  useEffect(() => {
    if (!availableDoctors.some((d) => d.id === doctorId)) {
      setDoctorId(availableDoctors[0]?.id ?? DOCTORS[0].id);
    }
  }, [availableDoctors, doctorId]);

  const [preferredDate, setPreferredDate] = useState(todayIso);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [visitType, setVisitType] = useState(initialVisitType);
  const [message, setMessage] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<ConfirmedAppointment | null>(null);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [lookupResults, setLookupResults] = useState<ConfirmedAppointment[] | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError('');

    const validation = validateAppointmentPayload(
      {
        patientName,
        phone,
        email,
        departmentId,
        doctorId,
        preferredDate,
        timeSlot,
        visitType,
        message,
      },
      todayIso
    );

    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });

      const data = await response.json();
      if (!response.ok || !data.ok || !data.appointment) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setSubmitError(
          data.error || 'Could not confirm your appointment. Please call +91 88820 06566.'
        );
        return;
      }

      setConfirmed(data.appointment);
      setLookupQuery(data.appointment.bookingRef);
    } catch {
      setSubmitError(
        'Network error while contacting the hospital booking server. Please try again or call +91 88820 06566.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLookup(e: FormEvent) {
    e.preventDefault();
    setLookupError('');
    const q = lookupQuery.trim();
    if (!q) {
      setLookupError('Enter your Booking Reference ID (e.g. AMH-...) or 10-digit mobile number.');
      return;
    }
    setLookupLoading(true);
    try {
      const res = await fetch(`/api/appointments/lookup?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setLookupError(data.error || 'Could not search appointments.');
        setLookupResults(null);
        return;
      }
      setLookupResults(data.appointments);
    } catch {
      setLookupError('Unable to reach booking verification server.');
    } finally {
      setLookupLoading(false);
    }
  }

  const isSunday = isIsoDateSunday(preferredDate);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-700">Online Appointment Desk</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Book an OPD Consultation or Checkup
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            {HOSPITAL_INFO.opdHours} · {HOSPITAL_INFO.emergencyHours}. Every submitted appointment
            is recorded in our hospital database and receives an official Booking Reference ID.
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Booking Form or Confirmation */}
          <div className="lg:col-span-7">
            {confirmed ? (
              <div
                data-testid="appointment-confirmation"
                className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 space-y-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-7 w-7 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-800">
                      Appointment Confirmed in Hospital Registry
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Booking Reference:{' '}
                      <span className="font-mono tabular-nums text-blue-800">
                        {confirmed.bookingRef}
                      </span>
                    </h2>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-xl border border-emerald-200/80 p-5 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500">Patient / Guardian Name</dt>
                    <dd className="font-semibold text-slate-950 mt-0.5">{confirmed.patientName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Mobile &amp; Email</dt>
                    <dd className="font-semibold text-slate-950 mt-0.5 tabular-nums">
                      {confirmed.phone} · {confirmed.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Department</dt>
                    <dd className="font-semibold text-slate-950 mt-0.5">
                      {confirmed.departmentName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Doctor</dt>
                    <dd className="font-semibold text-slate-950 mt-0.5">{confirmed.doctorName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Preferred Date &amp; Slot</dt>
                    <dd className="font-semibold text-slate-950 mt-0.5 tabular-nums">
                      {confirmed.preferredDate} · {confirmed.timeSlot}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Visit Type &amp; Status</dt>
                    <dd className="font-semibold text-emerald-800 mt-0.5">
                      {confirmed.visitType} · {confirmed.status}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      HOSPITAL_INFO.whatsappDigits,
                      `Hello Aradhya & Matulya Hospital, my appointment is booked.\nRef: ${confirmed.bookingRef}\nPatient: ${confirmed.patientName}\nDepartment: ${confirmed.departmentName}\nDate: ${confirmed.preferredDate} (${confirmed.timeSlot})`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Send Reference via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmed(null);
                      setMessage('');
                    }}
                    className="px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Patient &amp; Visit Details</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Fields marked with * are required to issue a verified booking reference.
                  </p>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 text-sm text-red-800"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="appt-patient-name"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Patient / Child Full Name *
                    </label>
                    <input
                      id="appt-patient-name"
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Aarav Verma"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.patientName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.patientName && (
                      <p className="mt-1.5 text-xs text-red-700">{fieldErrors.patientName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="appt-phone"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Mobile Number (10-digit) *
                    </label>
                    <input
                      id="appt-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-700">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="appt-email"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="appt-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-red-700">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="appt-visit-type"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Visit Type
                    </label>
                    <select
                      id="appt-visit-type"
                      value={visitType}
                      onChange={(e) => setVisitType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="OPD Consultation">OPD Consultation</option>
                      <option value="Follow-up Visit">Follow-up Visit</option>
                      <option value="Immunization / Vaccine">Immunization / Vaccine</option>
                      <option value="Health Checkup">Health Checkup</option>
                      <option value="Surgical Evaluation">Surgical Evaluation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="appt-department"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Department / Speciality *
                    </label>
                    <select
                      id="appt-department"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.departmentId ? 'border-red-400' : 'border-slate-300'
                      }`}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.departmentId && (
                      <p className="mt-1.5 text-xs text-red-700">{fieldErrors.departmentId}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="appt-doctor"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Preferred Doctor *
                    </label>
                    <select
                      id="appt-doctor"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.doctorId ? 'border-red-400' : 'border-slate-300'
                      }`}
                    >
                      {availableDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.doctorId && (
                      <p className="mt-1.5 text-xs text-red-700">{fieldErrors.doctorId}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="appt-date"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Preferred Appointment Date *
                    </label>
                    <input
                      id="appt-date"
                      type="date"
                      min={todayIso}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.preferredDate ? 'border-red-400' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.preferredDate && (
                      <p className="mt-1.5 text-xs text-red-700">{fieldErrors.preferredDate}</p>
                    )}
                    {isSunday && !fieldErrors.preferredDate && (
                      <p className="mt-1.5 text-xs text-amber-800">
                        Note: Regular OPD operates Mon–Sat (9:00–19:00). On Sundays, Emergency,
                        NICU &amp; PICU remain open 24×7.
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="appt-slot"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Preferred Time Slot *
                    </label>
                    <select
                      id="appt-slot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.timeSlot ? 'border-red-400' : 'border-slate-300'
                      }`}
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="appt-message"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Symptoms / Additional Message (Optional)
                  </label>
                  <textarea
                    id="appt-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly mention child age, symptoms, or vaccination card details..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Appointment'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Rail: Booking Lookup + 24x7 Emergency Card */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-6">
              <h2 className="text-lg font-bold text-slate-950">Verify Existing Booking</h2>
              <p className="mt-1 text-xs text-slate-600">
                Look up a confirmed appointment using your Reference ID (e.g. AMH-...) or
                10-digit mobile number.
              </p>

              <form onSubmit={handleLookup} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  aria-label="Booking reference or phone number"
                  placeholder="AMH-20261114-0001 or phone"
                  className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg whitespace-nowrap"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  <span>{lookupLoading ? 'Checking...' : 'Check'}</span>
                </button>
              </form>

              {lookupError && <p className="mt-3 text-xs text-red-700">{lookupError}</p>}

              {lookupResults && (
                <div className="mt-4 space-y-2.5" data-testid="lookup-results">
                  {lookupResults.length === 0 ? (
                    <p className="text-xs text-slate-600 bg-white rounded-lg border border-slate-200 p-3">
                      No matching appointments found in the hospital database.
                    </p>
                  ) : (
                    lookupResults.map((item) => (
                      <div
                        key={item.bookingRef}
                        className="bg-white rounded-xl border border-slate-200 p-4 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-bold text-blue-800 tabular-nums">
                            {item.bookingRef}
                          </span>
                          <span className="font-semibold text-emerald-700">{item.status}</span>
                        </div>
                        <div className="font-semibold text-slate-900">{item.patientName}</div>
                        <div className="text-slate-600">
                          {item.departmentName} · {item.doctorName}
                        </div>
                        <div className="text-slate-600 tabular-nums">
                          {item.preferredDate} · {item.timeSlot}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50/60 p-6 space-y-3">
              <div className="text-xs font-semibold text-red-800">
                Urgent Pediatric or Newborn Care?
              </div>
              <h3 className="text-lg font-bold text-slate-950">
                24×7 Emergency, NICU &amp; PICU Admission
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                For acute breathing difficulty, high fever, seizures, or newborn distress, do not
                wait for an OPD slot—contact our 24×7 emergency desk immediately.
              </p>
              <div className="pt-1 flex flex-wrap gap-3">
                <a
                  href={HOSPITAL_INFO.emergencyPhoneHref}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg tabular-nums"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Call {HOSPITAL_INFO.emergencyPhoneDisplay}</span>
                </a>
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 py-2">
                  <Clock className="h-4 w-4 text-red-700" aria-hidden="true" />
                  <span>{HOSPITAL_INFO.opdHours}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
