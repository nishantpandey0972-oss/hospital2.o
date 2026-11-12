import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

const NAV_ITEMS = [
  { label: 'About', to: '/about' },
  { label: 'Departments', to: '/departments' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-700 text-white text-sm font-extrabold"
          >
            +
          </span>
          <span>{HOSPITAL_INFO.shortName}</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 py-1 border-b-2 ${
                  isActive
                    ? 'text-blue-700 border-blue-700'
                    : 'text-slate-600 border-transparent hover:text-slate-950 hover:border-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/appointment"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Book Appointment
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/appointment"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
            >
              Book Appointment
            </Link>
            <a
              href={HOSPITAL_INFO.emergencyPhoneHref}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg tabular-nums"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              24×7 Emergency: {HOSPITAL_INFO.emergencyPhoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
