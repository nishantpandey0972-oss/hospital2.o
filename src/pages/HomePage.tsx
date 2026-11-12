import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Baby,
  Calendar,
  ChevronDown,
  Clock,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import {
  DEPARTMENTS,
  DOCTORS,
  HEALTH_GUIDES,
  HOSPITAL_INFO,
  HOSPITAL_PHOTOS,
  HOSPITAL_STATISTICS,
  TESTIMONIALS,
  WHY_CHOOSE_STEPS,
} from '../data/hospitalData';
import { buildWhatsAppUrl } from '../utils/validation';
import { HospitalImage } from '../components/HospitalImage';

const DEPT_ICONS: Record<string, typeof Baby> = {
  nicu: Baby,
  picu: HeartPulse,
  pediatrics: Stethoscope,
  surgical: Activity,
  'newborn-support': ShieldCheck,
  diagnostics: Phone,
};

export function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const whatsappHref = buildWhatsAppUrl(
    HOSPITAL_INFO.whatsappDigits,
    'Hello Aradhya And Matulya Child Care Hospital, I would like to book a consultation or enquire about OPD timings.'
  );

  const currentTestimonial = TESTIMONIALS[activeTestimonial] ?? TESTIMONIALS[0];

  return (
    <div>
      {/* Hero Section — Atmospheric Clinical Light Blue inspired by Reference 1 & 2 */}
      <section className="bg-gradient-to-br from-[#F4F8FE] via-[#EDF4FC] to-[#E1ECFA] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-sm font-medium text-blue-800 mb-3">
                Civil Lines Road &amp; Nehru Nagar, Deoria · 24×7 Emergency, NICU &amp; PICU
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-extrabold text-slate-950 tracking-tight leading-[1.12] [text-wrap:balance]">
                Compassionate Pediatric &amp;{' '}
                <span className="text-blue-700">Neonatal Care</span> in Deoria
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Aradhya And Matulya Child Care Hospital delivers dedicated newborn intensive care
                (NICU), pediatric intensive care (PICU), outpatient pediatrics, and surgical
                support under one roof at Harmony Complex.
              </p>

              <div className="mt-7 flex flex-wrap lg:flex-nowrap items-center gap-3">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Book Appointment</span>
                </Link>

                <a
                  href={HOSPITAL_INFO.emergencyPhoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-700 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors duration-150 tabular-nums whitespace-nowrap shrink-0"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>24×7 Emergency: {HOSPITAL_INFO.emergencyPhoneDisplay}</span>
                </a>

                <Link
                  to="/departments"
                  className="inline-flex items-center justify-center gap-1.5 px-2.5 py-3 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Departments</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-300/70 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-slate-900">OPD &amp; Critical Care Hours</div>
                    <div className="text-slate-600">{HOSPITAL_INFO.opdHours}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-slate-900">Harmony Complex, Deoria</div>
                    <div className="text-slate-600">Opp. Zila Panchayat Gate, UP 274001</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm min-h-[300px] lg:h-full">
                <HospitalImage
                  src={HOSPITAL_PHOTOS.nicuDoctorNewborn}
                  alt="Dr. Kamlesh caring for a newborn baby beside a NICU radiant warmer"
                  loading="eager"
                  focusClass="object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-5 text-white">
                  <p className="text-xs font-medium text-blue-200">
                    NICU &amp; Neonatal Care · 24×7 Supervised
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    Dedicated Newborn &amp; Pediatric Specialists
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-column Hospital Key Highlights & Statistics Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOSPITAL_STATISTICS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-slate-200/90 p-5 flex flex-col justify-between"
              >
                <div className="text-xs font-medium text-slate-500">{stat.label}</div>
                <div className="mt-2 text-2xl font-bold text-slate-950 tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Introduction & Facade Showcase */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-72 sm:h-96 lg:h-full min-h-[320px]">
                <HospitalImage
                  src={HOSPITAL_PHOTOS.exterior}
                  alt="Aradhya And Matulya Child Care Hospital building exterior on Civil Lines Road, Deoria"
                  focusClass="object-center"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-semibold text-blue-700">About Our Hospital</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight [text-wrap:balance]">
                Focused Child Health, Intensive Care &amp; Surgical Readiness in Deoria
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Located at 1st Floor, Harmony Complex opposite Zila Panchayat Gate on Civil Lines
                Road &amp; Nehru Nagar, Aradhya And Matulya Child Care Hospital brings specialized
                neonatal, pediatric, and surgical clinical workflows together for families across
                Deoria and surrounding areas.
              </p>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Whether visiting for a scheduled Monday–Saturday outpatient consultation or
                requiring immediate 24×7 NICU and PICU emergency stabilization, our team prioritizes
                clear parent communication and attentive bedside monitoring.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">24×7 Critical Units</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Continuous NICU, PICU, and emergency pediatric stabilization around the clock.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Direct Coordination</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Reach our desk anytime on {HOSPITAL_INFO.emergencyPhoneDisplay} or via WhatsApp.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <span>Read Hospital Overview</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={HOSPITAL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  <span>Open Google Maps listing (Deoria)</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Medical Specialities — Reference 1 clean white cards on subtle ice-blue surface */}
      <section className="py-16 lg:py-20 bg-[#F4F8FD] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-700">Clinical Departments</p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight [text-wrap:balance]">
                Trusted Healthcare for Every Stage of Childhood
              </h2>
            </div>
            <Link
              to="/departments"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
            >
              <span>All Departments &amp; Treatments</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => {
              const Icon = DEPT_ICONS[dept.id] ?? Stethoscope;
              return (
                <article
                  key={dept.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="h-11 w-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        {dept.category} · {dept.availability}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950">{dept.name}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{dept.summary}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      to={`/departments/${dept.slug}`}
                      className="text-sm font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1.5"
                    >
                      <span>View Department</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to={`/appointment?department=${dept.id}`}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-950"
                    >
                      Book Visit
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Doctors — Reference 1 sky-blue mist band with white portrait cards */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-[#E8F2FC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-700">Doctors Directory</p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight [text-wrap:balance]">
                Medical Specialists &amp; Clinical Team
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Connect with our pediatric, neonatal, and surgical consultants. Editable credential
                fields are clearly marked until final hospital verification records are uploaded.
              </p>
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>Full Doctors Directory</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.slice(0, 4).map((doc) => (
              <article
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <HospitalImage
                    src={doc.image}
                    alt={doc.imageAlt}
                    focusClass={doc.imageFocus}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-700">{doc.role}</p>
                    <h3 className="mt-1 text-base font-bold text-slate-950">{doc.name}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {doc.qualification}
                    </p>
                    <p className="mt-2 text-xs text-slate-600">{doc.availability}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/appointment?doctor=${doc.id}&department=${doc.departmentIds[0]}`}
                      className="text-sm font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                    {doc.instagram && (
                      <a
                        href={HOSPITAL_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:text-slate-900"
                      >
                        {doc.instagram}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Hospital + Advanced Facilities Split */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-blue-700">Why Choose Us</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight [text-wrap:balance]">
                Clinical Readiness Built Around Children &amp; Families
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                From neonatal radiant warmers to laparoscopic operation theatre facilities, every
                unit at Aradhya And Matulya Child Care Hospital focuses on timely intervention.
              </p>

              <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 aspect-[16/10]">
                <HospitalImage
                  src={HOSPITAL_PHOTOS.laparoscopyOtTeam}
                  alt="Laparoscopic surgical team operating inside sterile theatre"
                  focusClass="object-center"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <span>Services &amp; Health Checkups</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/gallery"
                  className="text-sm font-semibold text-slate-700 hover:text-blue-700"
                >
                  Explore Facility Gallery →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {WHY_CHOOSE_STEPS.map((item, idx) => {
                const isOpen = activeStep === idx;
                return (
                  <div
                    key={item.step}
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? 'bg-[#F4F8FD] border-blue-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      aria-expanded={isOpen}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-semibold text-blue-700 tabular-nums">
                          {item.step}
                        </span>
                        <span className="text-base font-bold text-slate-950">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-500 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-blue-700' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pl-14 text-sm text-slate-600 leading-relaxed">
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Parent Testimonials Switcher — Reference 1 Interactive Layout */}
      <section className="py-16 lg:py-20 bg-[#F4F8FD] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-700">Patient &amp; Parent Stories</p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                Family Experiences &amp; Verified Feedback
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Placeholder slots shown below are ready to be updated with verified parent consent
              statements.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="aspect-[16/10] sm:w-56 lg:w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <HospitalImage
                  src={currentTestimonial.image}
                  alt={currentTestimonial.departmentTag}
                  focusClass="object-top"
                />
              </div>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    aria-label={`View testimonial ${idx + 1}: ${item.departmentTag}`}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      activeTestimonial === idx
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    0{idx + 1} · {item.departmentTag.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-medium text-blue-700">
                {currentTestimonial.departmentTag} · Verified Consent Slot
              </div>
              <blockquote className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed">
                “{currentTestimonial.quote}”
              </blockquote>
              <div className="pt-2 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-950">
                  {currentTestimonial.parentName}
                </div>
                <div className="text-xs text-slate-500">
                  Aradhya And Matulya Child Care Hospital, Deoria
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking CTA Banner */}
      <section className="py-14 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance]">
              Schedule an OPD Visit or Speak With Our 24×7 Care Desk
            </h2>
            <p className="mt-2 text-sm sm:text-base text-blue-100 max-w-2xl">
              {HOSPITAL_INFO.opdHours} · {HOSPITAL_INFO.emergencyHours}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-blue-900 bg-white hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Book Appointment Online</span>
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 border border-blue-500 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* Health Articles & Hospital Guides — Deep Navy Contrast Section (Reference 1) */}
      <section className="py-16 lg:py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-300">Hospital Guide &amp; Articles</p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Parent Guides &amp; Child Health Information
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 hover:text-white whitespace-nowrap"
            >
              <span>View Checkup Packages &amp; Guides</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HEALTH_GUIDES.map((article) => (
              <article
                key={article.id}
                className="rounded-xl bg-[#112A4C] border border-slate-700/70 overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] bg-slate-800 overflow-hidden">
                  <HospitalImage
                    src={article.image}
                    alt={article.imageAlt}
                    focusClass={article.imageFocus}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-blue-200 font-medium">
                      {article.category} · {article.readTime}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-white leading-snug">
                      {article.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-700/80">
                    <Link
                      to="/services#hospital-guide"
                      className="text-sm font-semibold text-blue-300 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
