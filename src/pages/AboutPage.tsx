import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { DOCTORS, HOSPITAL_INFO, HOSPITAL_PHOTOS } from '../data/hospitalData';
import { HospitalImage } from '../components/HospitalImage';

export function AboutPage() {
  return (
    <div>
      {/* Header Band */}
      <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-blue-700">About Us</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight [text-wrap:balance]">
              {HOSPITAL_INFO.name}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Dedicated to pediatric, neonatal, and surgical healthcare in Deoria, Uttar Pradesh.
              Located at {HOSPITAL_INFO.fullAddress}.
            </p>
          </div>
        </div>
      </section>

      {/* Hospital Overview & Mission / Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Hospital Overview</h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Aradhya And Matulya Child Care Hospital serves families in Deoria and nearby
                districts with continuous 24×7 Neonatal Intensive Care (NICU), Pediatric Intensive
                Care (PICU), emergency triage, and Monday–Saturday outpatient clinics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-5">
                <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  <span>Our Mission</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Deliver timely, ethical, and family-centered newborn, child, and surgical care
                  with accessible emergency support around the clock.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-5">
                <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>Our Vision</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Strengthen regional pediatric and neonatal survival outcomes in eastern Uttar
                  Pradesh through disciplined clinical protocols and transparent family guidance.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-80 lg:h-full min-h-[320px]">
              <HospitalImage
                src={HOSPITAL_PHOTOS.exterior}
                alt="Aradhya And Matulya Child Care Hospital exterior at Harmony Complex, Deoria"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History, Recognition & Editable Milestones */}
      <section className="py-16 bg-[#F4F8FD] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-[4/3]">
              <HospitalImage
                src={HOSPITAL_PHOTOS.awardsStage}
                alt="Hospital leadership receiving medical recognition awards on stage"
                focusClass="object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>History &amp; Recognition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Milestones &amp; Institutional Commitments
            </h2>
            <p className="text-sm text-slate-500">
              Note: Specific founding dates, registration numbers, and award titles are marked as
              editable placeholders until verified hospital records are supplied.
            </p>

            <div className="space-y-3">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs font-mono text-blue-700">
                  [Editable Year — Founding Milestone]
                </div>
                <div className="mt-1 font-semibold text-slate-950">
                  Establishment at Harmony Complex, Civil Lines Road, Deoria
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Established to reduce critical referral delays for newborns and children across
                  Deoria district.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs font-mono text-blue-700">
                  [Editable Award Title &amp; Conferring Body]
                </div>
                <div className="mt-1 font-semibold text-slate-950">
                  Medical Excellence &amp; Clinical Recognition
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Replace this placeholder with verified award names, conference citations, and year
                  of recognition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Infrastructure & Facilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-blue-700">Medical Infrastructure</p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Clinical Zones &amp; Inpatient Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <div className="aspect-[16/10] bg-slate-100">
                <HospitalImage
                  src={HOSPITAL_PHOTOS.nicuSpecialistMonitor}
                  alt="NICU radiant warmer and monitoring station"
                  focusClass="object-top"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-950">NICU &amp; PICU Monitoring Bays</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Calibrated radiant warmers, central oxygen supply outlets, and continuous
                  multi-parameter newborn and pediatric monitors.
                </p>
              </div>
            </article>

            <article className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <div className="aspect-[16/10] bg-slate-100">
                <HospitalImage
                  src={HOSPITAL_PHOTOS.laparoscopyOtTeam}
                  alt="Laparoscopic surgical equipment and operation theatre"
                  focusClass="object-center"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-950">
                  Surgical &amp; Laparoscopic Theatre
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Dedicated sterile operation theatre equipped with high-definition laparoscopic
                  video imaging and trained surgical nursing staff.
                </p>
              </div>
            </article>

            <article className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <div className="aspect-[16/10] bg-slate-100">
                <HospitalImage
                  src={HOSPITAL_PHOTOS.clinicalTeamCorridor}
                  alt="Hospital doctors and nursing care team in corridor"
                  focusClass="object-top"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-950">
                  Outpatient Clinics &amp; Nursing Care
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Structured OPD chambers, immunization reception, and round-the-clock trained
                  nursing personnel.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Management & Leadership */}
      <section className="py-16 bg-[#F4F8FD] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-white">
              <HospitalImage
                src={HOSPITAL_PHOTOS.executiveCabinDoctor}
                alt="Hospital leadership inside consultation chamber"
                focusClass="object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              <span>Management &amp; Clinical Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Accountable Hospital Governance
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Our clinical leadership, led by {DOCTORS[0].name} ({DOCTORS[0].instagram}) alongside
              senior medical consultants and nursing supervisors, oversees patient safety, hygiene
              audits, and round-the-clock emergency response.
            </p>
            <p className="text-sm text-slate-500">
              [Editable Management Directory — Add Medical Superintendent, Hospital Administrator, and
              Nursing Lead names &amp; credentials as finalized.]
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <span>Meet Our Doctors</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span>Visit Harmony Complex</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
