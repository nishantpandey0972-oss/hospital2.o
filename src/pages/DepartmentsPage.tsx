import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Phone, Search } from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { HospitalImage } from '../components/HospitalImage';

const CATEGORIES = ['All', 'Critical Care', 'Pediatrics', 'Surgical', 'Support & Diagnostics'] as const;

export function DepartmentsPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (slug) {
    const dept = DEPARTMENTS.find((d) => d.slug === slug);
    if (!dept) {
      return (
        <section className="py-20 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-950">Department Not Found</h1>
          <p className="mt-2 text-slate-600">
            The requested department page could not be located.
          </p>
          <Link
            to="/departments"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to All Departments</span>
          </Link>
        </section>
      );
    }

    const relatedDoctors = DOCTORS.filter((doc) => doc.departmentIds.includes(dept.id));

    return (
      <div>
        <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/departments"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 mb-5"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>All Departments</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <p className="text-sm font-medium text-blue-800">
                  {dept.category} · {dept.availability}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight [text-wrap:balance]">
                  {dept.name}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                  {dept.overview}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Link
                    to={`/appointment?department=${dept.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>Book {dept.shortName} Appointment</span>
                  </Link>

                  <a
                    href={HOSPITAL_INFO.emergencyPhoneHref}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg tabular-nums"
                  >
                    <Phone className="h-4 w-4 text-red-600" aria-hidden="true" />
                    <span>{HOSPITAL_INFO.emergencyPhoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-72 lg:h-full min-h-[280px] bg-white">
                  <HospitalImage
                    src={dept.image}
                    alt={dept.imageAlt}
                    focusClass={dept.imageFocus}
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">Conditions &amp; Treatments Managed</h2>
              <ul className="mt-5 space-y-3.5">
                {dept.treatments.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">Department-Specific Facilities</h2>
              <ul className="mt-5 space-y-3.5">
                {dept.facilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F4F8FD] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-950 mb-6">
              Doctors Associated With {dept.shortName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDoctors.map((doc) => (
                <article
                  key={doc.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/10] bg-slate-100">
                    <HospitalImage
                      src={doc.image}
                      alt={doc.imageAlt}
                      focusClass={doc.imageFocus}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-medium text-blue-700">{doc.role}</div>
                      <h3 className="mt-1 text-lg font-bold text-slate-950">{doc.name}</h3>
                      <p className="mt-1.5 text-xs text-slate-500">{doc.qualification}</p>
                      <p className="mt-2 text-xs text-slate-600">{doc.availability}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <Link
                        to={`/appointment?department=${dept.id}&doctor=${doc.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
                      >
                        <span>Book With This Doctor</span>
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

  const filtered = DEPARTMENTS.filter((dept) => {
    const matchesCat = selectedCategory === 'All' || dept.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      dept.name.toLowerCase().includes(q) ||
      dept.summary.toLowerCase().includes(q) ||
      dept.treatments.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-[#F4F8FE] to-[#E6F0FC] border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-700">Specialities &amp; Units</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Medical Departments
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Explore our specialized neonatal, pediatric, surgical, and 24×7 emergency departments
            at Aradhya And Matulya Child Care Hospital, Deoria.
          </p>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {category}
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
                aria-label="Search departments or treatments"
                placeholder="Search NICU, fever, surgery..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
              <p className="text-base font-semibold text-slate-900">
                No departments matched “{searchQuery}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 text-sm font-semibold text-blue-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dept) => (
                <article
                  key={dept.id}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-white flex flex-col hover:border-blue-300 transition-colors"
                >
                  <div className="aspect-[16/10] bg-slate-100">
                    <HospitalImage
                      src={dept.image}
                      alt={dept.imageAlt}
                      focusClass={dept.imageFocus}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-medium text-blue-700">
                        {dept.category} · {dept.availability}
                      </div>
                      <h2 className="mt-1.5 text-xl font-bold text-slate-950">{dept.name}</h2>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{dept.summary}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/departments/${dept.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
                      >
                        <span>Treatment Details</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        to={`/appointment?department=${dept.id}`}
                        className="text-xs font-semibold text-slate-700 hover:text-slate-950"
                      >
                        Book Visit
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
