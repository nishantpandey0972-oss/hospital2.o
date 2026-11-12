import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Aradhya & Matulya Child Care Hospital | 24×7 NICU, PICU & Pediatrics in Deoria',
  '/about': 'About Us | Aradhya & Matulya Child Care Hospital, Deoria',
  '/departments': 'Departments & Specialities | Aradhya & Matulya Child Care Hospital',
  '/doctors': 'Doctors Directory | Aradhya & Matulya Child Care Hospital',
  '/services': 'Medical Services & Health Checkups | Aradhya & Matulya Child Care Hospital',
  '/gallery': 'Hospital Gallery | Aradhya & Matulya Child Care Hospital',
  '/appointment': 'Book Appointment | Aradhya & Matulya Child Care Hospital, Deoria',
  '/contact': 'Contact & Directions | Aradhya & Matulya Child Care Hospital, Deoria',
};

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const matched =
      ROUTE_TITLES[pathname] ??
      (pathname.startsWith('/departments/')
        ? 'Department Details | Aradhya & Matulya Child Care Hospital'
        : 'Aradhya & Matulya Child Care Hospital | Deoria, UP');
    document.title = matched;
  }, [pathname]);

  return null;
}
