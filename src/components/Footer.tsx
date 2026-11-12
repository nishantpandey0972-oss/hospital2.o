import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { DEPARTMENTS, HOSPITAL_INFO } from '../data/hospitalData';
import { buildWhatsAppUrl } from '../utils/validation';

export function Footer() {
  const whatsappHref = buildWhatsAppUrl(
    HOSPITAL_INFO.whatsappDigits,
    'Hello Aradhya And Matulya Child Care Hospital, I would like to enquire about an appointment / OPD timing.'
  );

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-white font-bold text-lg tracking-tight">
              <span
                aria-hidden="true"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white text-sm font-extrabold"
              >
                +
              </span>
              <span>{HOSPITAL_INFO.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-300/90">
              {HOSPITAL_INFO.tagline}
            </p>
            <div className="pt-1 space-y-2 text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-1" aria-hidden="true" />
                <span>{HOSPITAL_INFO.fullAddress}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <Clock className="h-4 w-4 text-blue-400 shrink-0 mt-1" aria-hidden="true" />
                <span>
                  {HOSPITAL_INFO.opdHours}
                  <br />
                  {HOSPITAL_INFO.emergencyHours}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">Hospital Guide</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Hospital
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">
                  Doctors Directory
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services &amp; Health Checkups
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Hospital Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Visit &amp; Directions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">Departments</h3>
            <ul className="space-y-2.5 text-sm">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <Link to={`/departments/${dept.slug}`} className="hover:text-white transition-colors">
                    {dept.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide">Emergency &amp; Maps</h3>
            <div className="space-y-2.5">
              <a
                href={HOSPITAL_INFO.emergencyPhoneHref}
                className="flex items-center gap-2.5 text-white font-semibold text-base tabular-nums hover:text-blue-300 transition-colors"
              >
                <Phone className="h-4 w-4 text-red-400 shrink-0" aria-hidden="true" />
                <span>24×7 Emergency: {HOSPITAL_INFO.emergencyPhoneDisplay}</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            <div className="pt-2 space-y-2 text-sm">
              <a
                href={HOSPITAL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors"
              >
                <span>Open Google Maps listing (Deoria)</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <div>
                <a
                  href={HOSPITAL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4 text-blue-300" aria-hidden="true" />
                  <span>Instagram {HOSPITAL_INFO.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {HOSPITAL_INFO.name}, Deoria. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/appointment" className="hover:text-white transition-colors">
              Book Appointment
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Emergency &amp; Directions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
