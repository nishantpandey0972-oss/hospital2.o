import { FormEvent, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { buildWhatsAppUrl, validateEnquiryPayload } from '../utils/validation';

interface SubmittedEnquiry {
  enquiryRef: string;
  name: string;
  subject: string;
  status: string;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<SubmittedEnquiry | null>(null);

  const whatsappHref = buildWhatsAppUrl(
    HOSPITAL_INFO.whatsappDigits,
    'Hello Aradhya And Matulya Child Care Hospital, Deoria. I have an enquiry regarding visiting hours / patient care.'
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError('');

    const validation = validateEnquiryPayload({ name, phone, email, subject, message });
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.enquiry) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitError(data.error || 'Could not submit enquiry. Please call +91 88820 06566.');
        return;
      }

      setSubmitted(data.enquiry);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setSubmitError('Network error while sending enquiry. Please call +91 88820 06566.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-700">Visit &amp; Directions</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Contact Aradhya &amp; Matulya Child Care Hospital
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            {HOSPITAL_INFO.fullAddress}. Reach our OPD or 24×7 NICU/PICU emergency desk directly.
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Cards + Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-bold text-slate-950">Hospital Address &amp; Timings</h2>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-slate-950">{HOSPITAL_INFO.name}</div>
                    <p className="mt-0.5 text-slate-600">
                      {HOSPITAL_INFO.addressLine1}
                      <br />
                      {HOSPITAL_INFO.addressLine2}
                      <br />
                      {HOSPITAL_INFO.cityStatePin}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-slate-950">Working Hours</div>
                    <p className="mt-0.5 text-slate-600">
                      {HOSPITAL_INFO.opdHours}
                      <br />
                      {HOSPITAL_INFO.emergencyHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-slate-950">24×7 Emergency &amp; OPD Desk</div>
                    <a
                      href={HOSPITAL_INFO.emergencyPhoneHref}
                      className="mt-0.5 inline-block text-base font-bold text-blue-800 hover:underline tabular-nums"
                    >
                      {HOSPITAL_INFO.emergencyPhoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-slate-950">Instagram Updates</div>
                    <a
                      href={HOSPITAL_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-blue-700 hover:underline"
                    >
                      <span>{HOSPITAL_INFO.instagramHandle}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={HOSPITAL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <span>Open Google Maps listing (Deoria)</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>

            {/* Google Maps Integration */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100">
              <iframe
                title="Aradhya And Matulya Child Care Hospital Location Map in Deoria"
                src={HOSPITAL_INFO.googleMapsEmbedUrl}
                className="w-full h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Enquiry Form */}
          <div className="lg:col-span-6">
            {submitted ? (
              <div
                data-testid="enquiry-confirmation"
                className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-800">
                      Enquiry Recorded · Reference {submitted.enquiryRef}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                      Thank you, {submitted.name}
                    </h2>
                    <p className="mt-2 text-sm text-slate-700">
                      Your message regarding “{submitted.subject}” has been saved by our hospital
                      desk. For immediate medical assistance, please call{' '}
                      <a
                        href={HOSPITAL_INFO.emergencyPhoneHref}
                        className="font-semibold text-blue-800 underline tabular-nums"
                      >
                        {HOSPITAL_INFO.emergencyPhoneDisplay}
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(null)}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Send a Hospital Enquiry</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Questions about OPD schedules, NICU visiting rules, or health checkups.
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="enq-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="enq-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Tiwari"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.name ? 'border-red-400' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="enq-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      id="enq-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.phone ? 'border-red-400' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="enq-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="enq-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.email ? 'border-red-400' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="enq-subject" className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Subject *
                    </label>
                    <input
                      id="enq-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Vaccination Timing"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        fieldErrors.subject ? 'border-red-400' : 'border-slate-300'
                      }`}
                    />
                    {fieldErrors.subject && (
                      <p className="mt-1 text-xs text-red-700">{fieldErrors.subject}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="enq-message" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="enq-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your question for our hospital desk..."
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      fieldErrors.message ? 'border-red-400' : 'border-slate-300'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 text-xs text-red-700">{fieldErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
