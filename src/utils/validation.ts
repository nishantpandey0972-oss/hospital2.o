export interface AppointmentInput {
  patientName: string;
  phone: string;
  email: string;
  departmentId: string;
  doctorId: string;
  preferredDate: string;
  timeSlot: string;
  visitType?: string;
  message?: string;
}

export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult<T> {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: T;
}

export function normalizeIndianPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    const local = digits.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  if (digits.length === 11 && digits.startsWith('0') && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    const local = digits.slice(1);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return null;
}

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function getTodayIsoDate(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isIsoDateSunday(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCDay() === 0;
}

export function validateAppointmentPayload(
  input: Partial<AppointmentInput>,
  todayIso: string = getTodayIsoDate()
): ValidationResult<AppointmentInput> {
  const errors: Record<string, string> = {};

  const patientName = (input.patientName ?? '').trim();
  if (patientName.length < 2) {
    errors.patientName = 'Please enter the patient or guardian full name (at least 2 characters).';
  } else if (patientName.length > 100) {
    errors.patientName = 'Name cannot exceed 100 characters.';
  }

  const normalizedPhone = normalizeIndianPhone(input.phone ?? '');
  if (!normalizedPhone) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (starting with 6–9).';
  }

  const email = (input.email ?? '').trim();
  if (!email) {
    errors.email = 'Please provide an email address for appointment confirmation.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const departmentId = (input.departmentId ?? '').trim();
  if (!departmentId) {
    errors.departmentId = 'Please select a medical department.';
  }

  const doctorId = (input.doctorId ?? '').trim();
  if (!doctorId) {
    errors.doctorId = 'Please select a doctor or specialist.';
  }

  const preferredDate = (input.preferredDate ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    errors.preferredDate = 'Please select a valid preferred appointment date.';
  } else if (preferredDate < todayIso) {
    errors.preferredDate = 'Preferred date cannot be in the past.';
  }

  const timeSlot = (input.timeSlot ?? '').trim();
  if (!timeSlot) {
    errors.timeSlot = 'Please select a preferred consultation slot.';
  }

  const visitType = (input.visitType ?? 'OPD Consultation').trim();
  const message = (input.message ?? '').trim().slice(0, 1000);

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      patientName,
      phone: normalizedPhone!,
      email,
      departmentId,
      doctorId,
      preferredDate,
      timeSlot,
      visitType,
      message,
    },
  };
}

export function validateEnquiryPayload(
  input: Partial<EnquiryInput>
): ValidationResult<EnquiryInput> {
  const errors: Record<string, string> = {};

  const name = (input.name ?? '').trim();
  if (name.length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const normalizedPhone = normalizeIndianPhone(input.phone ?? '');
  if (!normalizedPhone) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  const email = (input.email ?? '').trim();
  if (!email || !isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const subject = (input.subject ?? '').trim();
  if (subject.length < 3) {
    errors.subject = 'Please specify the enquiry subject.';
  }

  const message = (input.message ?? '').trim();
  if (message.length < 10) {
    errors.message = 'Please enter a brief message (at least 10 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      name,
      phone: normalizedPhone!,
      email,
      subject,
      message: message.slice(0, 1500),
    },
  };
}

export function formatBookingReference(id: number, dateStr: string): string {
  const cleanDate = dateStr.replace(/-/g, '').slice(0, 8) || '00000000';
  const padded = String(id).padStart(4, '0');
  return `AMH-${cleanDate}-${padded}`;
}

export function formatEnquiryReference(id: number): string {
  return `ENQ-${String(id).padStart(4, '0')}`;
}

export function buildWhatsAppUrl(rawPhoneDigits: string, text: string): string {
  const digits = rawPhoneDigits.replace(/\D/g, '');
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${digits}?text=${encoded}`;
}
