import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { AboutPage } from './pages/AboutPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';

function NotFoundPage() {
  return (
    <section className="py-24 max-w-3xl mx-auto px-4 text-center">
      <p className="text-sm font-semibold text-blue-700">404 · Page Not Found</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        The requested hospital page could not be found
      </h1>
      <p className="mt-3 text-base text-slate-600">
        Please return to the home page or book an appointment directly.
      </p>
      <div className="mt-7 flex items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
        >
          Back to Home
        </Link>
        <Link
          to="/appointment"
          className="px-5 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg"
        >
          Book Appointment
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/:slug" element={<DepartmentsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
