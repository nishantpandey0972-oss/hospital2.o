import { Link } from 'react-router-dom';
import {
  Activity,
  Ambulance,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Microscope,
  Phone,
  ShieldPlus,
} from 'lucide-react';
import {
  HEALTH_CHECKUPS,
  HEALTH_GUIDES,
  HOSPITAL_INFO,
  HOSPITAL_PHOTOS,
} from '../data/hospitalData';
import { HospitalImage } from '../components/HospitalImage';

const SERVICE_CATEGORIES = [
  {
    icon: Ambulance,
    title: '24×7 Emergency, NICU & PICU',
    availability: 'Open 24 Hours · 7 Days',
    summary:
      'Immediate newborn and pediatric emergency triage, radiant warmer stabilization, oxygen therapy, and intensive care admissions.',
    items: [
      'Round-the-clock NICU & PICU admission desk',
      'Neonatal radiant warmer & phototherapy monitoring',
      'Acute pediatric breathing, fever & seizure stabilization',
      'Direct emergency helpline: +91 88820 06566',
    ],
  },
  {
    icon: Microscope,
    title: 'Diagnostic & Monitoring Facilities',
    availability: 'Inpatient & OPD Support',
    summary:
      'Bedside vitals monitoring and essential diagnostic sample coordination supporting timely pediatric and surgical decisions.',
    items: [
      'Multi-parameter bedside vitals & pulse oximetry',
      'Newborn bilirubin & neonatal screening coordination',
      'Pre-operative laboratory fitness coordination',
      '[Editable In-House Lab & Imaging Facility List]',
    ],
  },
  {
    icon: Activity,
    title: 'Surgical & Laparoscopic OT',
    availability: 'Scheduled & Urgent Procedures',
    summary:
      'Sterile operating theatre equipped with laparoscopic visualization towers and monitored post-operative recovery bays.',
    items: [
      'Minimally invasive laparoscopic surgical suite',
      'Strict sterilization & surgical safety checklists',
      'Monitored pre-operative and post-operative recovery care',
    ],
  },
  {
    icon: ShieldPlus,
    title: 'Patient & Family Support',
    availability: 'OPD Mon–Sat 9:00–19:00',
    summary:
      'Thoughtful guidance for parents navigating vaccinations, discharge summaries, feeding support, and follow-up visits.',
    items: [
      'Immunization schedule reminders & record review',
      'Newborn feeding & mother-care counseling',
      'WhatsApp & phone appointment assistance',
      'Central Harmony Complex access in Civil Lines, Deoria',
    ],
  },
];

export function ServicesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-700">Services &amp; Health Checkups</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Medical Services, Diagnostics &amp; Preventive Checkups
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Comprehensive clinical services for newborns, infants, children, and surgical
              patients at Aradhya And Matulya Child Care Hospital, Deoria.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Book Service / Checkup</span>
            </Link>
            <a
              href={HOSPITAL_INFO.emergencyPhoneHref}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-lg tabular-nums"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>24×7: {HOSPITAL_INFO.emergencyPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Core Medical Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_CATEGORIES.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="h-11 w-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        {service.availability}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-950">{service.title}</h2>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.summary}</p>
                    <ul className="mt-5 space-y-2.5">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2
                            className="h-4 w-4 text-blue-700 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preventive Health Checkup Packages */}
      <section className="py-16 bg-[#F4F8FD] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-blue-700">Health Checkups</p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Pediatric &amp; Newborn Preventive Checkup Plans
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Structured wellness screenings tailored by age group. Package fees are editable
              placeholders—confirm current rates at our OPD desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HEALTH_CHECKUPS.map((pkg) => (
              <article
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-medium text-blue-700">
                    {pkg.ageGroup} · {pkg.scheduleNote}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">{pkg.name}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {pkg.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2
                          className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-xs font-mono text-slate-500">{pkg.feeNote}</div>
                  <Link
                    to={`/appointment?visitType=Health+Checkup`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
                  >
                    <span>Schedule Checkup</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Guide & Parent Checklists */}
      <section id="hospital-guide" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                <span>Hospital Guide</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                Practical Parent &amp; Visitor Guide
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Essential information before visiting our OPD or emergency department at Harmony
                Complex, Civil Lines Road &amp; Nehru Nagar, Deoria.
              </p>
            </div>
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9]">
              <HospitalImage
                src={HOSPITAL_PHOTOS.clinicalTeamCorridor}
                alt="Hospital nursing and medical team supporting families"
                focusClass="object-top"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HEALTH_GUIDES.map((guide) => (
              <article
                key={guide.id}
                className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-medium text-blue-700">
                    {guide.category} · {guide.readTime}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">{guide.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{guide.summary}</p>
                  <ul className="mt-4 space-y-2 border-t border-slate-200/80 pt-4">
                    {guide.keyPoints.map((pt) => (
                      <li key={pt} className="text-xs text-slate-700 leading-relaxed flex gap-2">
                        <span className="text-blue-700 font-bold" aria-hidden="true">
                          ·
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
