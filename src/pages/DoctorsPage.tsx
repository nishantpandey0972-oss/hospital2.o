import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Instagram, MessageCircle, Search } from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { buildWhatsAppUrl } from '../utils/validation';
import { HospitalImage } from '../components/HospitalImage';

export function DoctorsPage() {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = selectedDept === 'all' || doc.departmentIds.includes(selectedDept);
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.role.toLowerCase().includes(q) ||
      doc.bio.toLowerCase().includes(q);
    return matchesDept && matchesQuery;
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-700">Doctors Directory</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Medical Specialists &amp; Consultants
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Browse specialist profiles, clinical availability, and book an outpatient consultation.
            Editable placeholders are retained where verified registration details are pending.
          </p>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedDept('all')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedDept === 'all'
                    ? 'bg-blue-700 text-white'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                All Specialists
              </button>
              {DEPARTMENTS.slice(0, 4).map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDept(dept.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedDept === dept.id
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {dept.shortName}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search
                className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search doctors by name or speciality"
                placeholder="Search doctor or speciality..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDoctors.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
              <p className="text-base font-semibold text-slate-900">
                No doctors found for your current filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-sm font-semibold text-blue-700 bg-white border border-slate-200 rounded-lg"
              >
                Show All Specialists
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredDoctors.map((doc) => {
                const deptNames = DEPARTMENTS.filter((d) => doc.departmentIds.includes(d.id))
                  .map((d) => d.shortName)
                  .join(' · ');

                const waLink = buildWhatsAppUrl(
                  HOSPITAL_INFO.whatsappDigits,
                  `Hello Aradhya & Matulya Hospital, I would like to enquire about consultation availability with ${doc.name}.`
                );

                return (
                  <article
                    key={doc.id}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-slate-100">
                      <HospitalImage
                        src={doc.image}
                        alt={doc.imageAlt}
                        focusClass={doc.imageFocus}
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div>
                        <p className="text-xs font-medium text-blue-700">{doc.role}</p>
                        <h2 className="mt-1 text-xl font-bold text-slate-950">{doc.name}</h2>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{doc.bio}</p>

                        <dl className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                          <div>
                            <dt className="font-semibold text-slate-700">Specialisations</dt>
                            <dd className="text-slate-600">{deptNames}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-700">Qualifications</dt>
                            <dd className="text-slate-500">{doc.qualification}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-700">Experience</dt>
                            <dd className="text-slate-500">{doc.experience}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-700">Availability</dt>
                            <dd className="text-slate-700 font-medium">{doc.availability}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                        <Link
                          to={`/appointment?doctor=${doc.id}&department=${doc.departmentIds[0]}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Book Appointment</span>
                        </Link>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                        {doc.instagram && (
                          <a
                            href={HOSPITAL_INFO.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Instagram ${doc.instagram}`}
                            className="inline-flex items-center justify-center p-2.5 text-slate-600 hover:text-blue-700 border border-slate-200 rounded-lg"
                          >
                            <Instagram className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
