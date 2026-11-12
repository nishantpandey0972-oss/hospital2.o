/**
 * Centralized Hospital Configuration & Editable Content Registry
 * -------------------------------------------------------------------------
 * Verified hospital details from the brief are populated directly.
 * Unverified metrics, secondary staff credentials, and testimonials are
 * explicitly marked as editable placeholders so administrators can replace
 * them cleanly without modifying component code.
 */

export interface HospitalContact {
  name: string;
  shortName: string;
  tagline: string;
  addressLine1: string;
  addressLine2: string;
  cityStatePin: string;
  fullAddress: string;
  opdHours: string;
  emergencyHours: string;
  emergencyPhoneDisplay: string;
  emergencyPhoneHref: string;
  whatsappDigits: string;
  emailPlaceholder: string;
  instagramHandle: string;
  instagramUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
}

export interface Department {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: 'Critical Care' | 'Pediatrics' | 'Surgical' | 'Support & Diagnostics';
  availability: string;
  summary: string;
  overview: string;
  treatments: string[];
  facilities: string[];
  image: string;
  imageAlt: string;
  imageFocus?: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  departmentIds: string[];
  qualification: string;
  experience: string;
  availability: string;
  bio: string;
  isPlaceholderProfile: boolean;
  instagram?: string;
  image: string;
  imageAlt: string;
  imageFocus?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Infrastructure' | 'Medical Team' | 'Clinical & NICU' | 'Events & Recognition';
  caption: string;
  image: string;
  imageFocus?: string;
}

export interface CheckupPackage {
  id: string;
  name: string;
  ageGroup: string;
  scheduleNote: string;
  includes: string[];
  feeNote: string;
}

export interface GuideArticle {
  id: string;
  category: string;
  readTime: string;
  title: string;
  summary: string;
  keyPoints: string[];
  image: string;
  imageAlt: string;
  imageFocus?: string;
}

export interface TestimonialItem {
  id: string;
  parentName: string;
  departmentTag: string;
  quote: string;
  isPlaceholder: boolean;
  image: string;
}

export const HOSPITAL_INFO: HospitalContact = {
  name: 'Aradhya And Matulya Child Care Hospital',
  shortName: 'Aradhya & Matulya',
  tagline: 'Dedicated Pediatric, Neonatal Intensive Care (NICU/PICU) & Surgical Care in Deoria',
  addressLine1: '1st Floor, Harmony Complex, Opp. Zila Panchayat Gate',
  addressLine2: 'Civil Lines Road & Nehru Nagar',
  cityStatePin: 'Deoria, Uttar Pradesh 274001',
  fullAddress:
    '1st Floor, Harmony Complex, Opp. Zila Panchayat Gate, Civil Lines Road & Nehru Nagar, Deoria, UP 274001',
  opdHours: 'Mon to Sat · 9:00 to 19:00 (9:00 AM – 7:00 PM)',
  emergencyHours: 'Emergency, NICU & PICU · Open 24×7',
  emergencyPhoneDisplay: '+91 88820 06566',
  emergencyPhoneHref: 'tel:+918882006566',
  whatsappDigits: '918882006566',
  emailPlaceholder: 'desk@aradhyamatulyahospital.in [Editable Email]',
  instagramHandle: '@dr.kamlesh2101',
  instagramUrl: 'https://www.instagram.com/dr.kamlesh2101/',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Aradhya+And+Matulya+Child+Care+Hospital+Harmony+Complex+Civil+Lines+Road+Deoria+UP+274001',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Harmony+Complex+Civil+Lines+Road+Deoria+Uttar+Pradesh+274001&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export const HOSPITAL_PHOTOS = {
  exterior: '/assets/aistudio/images__5__04ed5fad.jpg',
  nicuDoctorNewborn: '/assets/aistudio/images__7__ebdbef27.jpg',
  nicuSpecialistMonitor: '/assets/aistudio/images__12__5b211b6c.jpg',
  clinicalTeamCorridor: '/assets/aistudio/images__8__25da2655.jpg',
  opdDeskDoctor: '/assets/aistudio/images__6__d3064ac3.jpg',
  executiveCabinDoctor: '/assets/aistudio/images__4__f7dd7579.jpg',
  otSurgeonGown: '/assets/aistudio/images__9__f8052ed7.jpg',
  laparoscopyOtTeam: '/assets/aistudio/images__11__9d713b39.jpg',
  awardsStage: '/assets/aistudio/images__10__4292a33b.jpg',
  newbornCare: '/assets/aistudio/images__13__69b19644.jpg',
};

export const HOSPITAL_STATISTICS = [
  {
    label: 'Emergency, NICU & PICU',
    value: '24×7',
    note: 'Continuous round-the-clock critical pediatric and neonatal admissions',
  },
  {
    label: 'OPD Consultation Hours',
    value: '9:00 – 19:00',
    note: 'Monday to Saturday outpatient pediatric & specialty clinics',
  },
  {
    label: 'NICU & PICU Bed Capacity',
    value: '[Editable Bed Count]',
    note: 'Replace with verified sanctioned NICU, PICU, and ward bed numbers',
  },
  {
    label: 'Clinical Team & Specialists',
    value: '[Editable Staff Count]',
    note: 'Update with verified count of consultants, residents, and nursing staff',
  },
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'nicu',
    slug: 'neonatal-intensive-care-nicu',
    name: 'Neonatal Intensive Care (NICU)',
    shortName: 'NICU & Newborn Care',
    category: 'Critical Care',
    availability: '24×7 Active Unit',
    summary:
      'Specialized round-the-clock intensive monitoring and thermal support for premature, low-birth-weight, and critically ill newborns.',
    overview:
      'Our Neonatal Intensive Care Unit provides continuous newborn stabilization, radiant warmer thermoregulation, oxygen therapy, and infection control protocols supervised around the clock.',
    treatments: [
      'Premature and low-birth-weight newborn management',
      'Neonatal jaundice evaluation and phototherapy support',
      'Respiratory distress stabilization and oxygen monitoring',
      'Neonatal sepsis screening and feeding support',
    ],
    facilities: [
      'Radiant warmers with continuous skin & air temperature displays',
      'Central medical oxygen & suction lines at bedside',
      'Multi-parameter neonatal vitals monitoring',
      '24×7 trained neonatal nursing supervision',
    ],
    image: HOSPITAL_PHOTOS.nicuDoctorNewborn,
    imageAlt: 'Doctor caring for a newborn baby beside a NICU radiant warmer',
    imageFocus: 'object-center',
  },
  {
    id: 'picu',
    slug: 'pediatric-intensive-care-picu',
    name: 'Pediatric Intensive Care (PICU)',
    shortName: 'PICU & Emergency',
    category: 'Critical Care',
    availability: '24×7 Emergency Admission',
    summary:
      'Immediate stabilization and intensive pediatric monitoring for acute childhood illnesses, respiratory distress, dehydration, and seizures.',
    overview:
      'Designed for infants, toddlers, and adolescents requiring close hemodynamic and respiratory observation with rapid emergency triage.',
    treatments: [
      'Acute pediatric respiratory distress and severe pneumonia care',
      'Febrile seizures and pediatric neurological observation',
      'Severe dehydration, shock, and electrolyte correction',
      'Post-operative pediatric intensive recovery monitoring',
    ],
    facilities: [
      '24×7 pediatric emergency reception and rapid triage',
      'Continuous pulse oximetry, ECG, and infusion pump support',
      'Dedicated oxygen delivery and airway management readiness',
      'Direct coordination with surgical and diagnostic units',
    ],
    image: HOSPITAL_PHOTOS.nicuSpecialistMonitor,
    imageAlt: 'Pediatric critical care specialist beside intensive monitoring equipment',
    imageFocus: 'object-top',
  },
  {
    id: 'pediatrics',
    slug: 'general-pediatrics-immunization',
    name: 'General Pediatrics & Immunization',
    shortName: 'General Pediatrics',
    category: 'Pediatrics',
    availability: 'OPD Mon–Sat · 9:00–19:00',
    summary:
      'Comprehensive outpatient care covering childhood infections, growth and developmental tracking, nutrition advice, and vaccination clinics.',
    overview:
      'Our pediatric outpatient clinic supports families from infancy through adolescence with preventive checkups, routine immunizations, and evidence-based fever and infection care.',
    treatments: [
      'Childhood fever, respiratory, and gastrointestinal illness care',
      'Routine and catch-up pediatric immunization schedules',
      'Growth, weight, and developmental milestone assessments',
      'Infant feeding counseling and childhood nutrition guidance',
    ],
    facilities: [
      'Dedicated OPD consultation chambers at Harmony Complex',
      'Cold-chain maintained pediatric vaccination storage [Verify Cold-Chain Spec]',
      'Digital growth chart & prescription consultation desk',
      'Scheduled follow-up and parent counseling support',
    ],
    image: HOSPITAL_PHOTOS.opdDeskDoctor,
    imageAlt: 'Consultant physician at the hospital OPD desk with stethoscope',
    imageFocus: 'object-top',
  },
  {
    id: 'surgical',
    slug: 'pediatric-laparoscopic-surgery',
    name: 'Surgical & Laparoscopic Care',
    shortName: 'Surgical Care',
    category: 'Surgical',
    availability: 'Scheduled & Emergency OT',
    summary:
      'Clean modular operation theatre supporting minimally invasive laparoscopic and general surgical procedures with strict sterile protocols.',
    overview:
      'Equipped with laparoscopic video imaging towers and sterile OT workflows, our surgical unit coordinates closely with anesthesia and pediatric recovery teams.',
    treatments: [
      'Minimally invasive laparoscopic surgical evaluation',
      'General surgical consultations and minor procedures',
      'Pre-operative fitness assessment and post-operative follow-up',
      'Emergency surgical triage and wound care management',
    ],
    facilities: [
      'Laparoscopic tower and high-definition surgical monitor',
      'Controlled sterile operating theatre zone',
      'Pre-op and post-op monitored recovery care',
      'Coordinated surgical, anesthesia, and nursing team',
    ],
    image: HOSPITAL_PHOTOS.laparoscopyOtTeam,
    imageAlt: 'Surgical team performing laparoscopic procedure in operation theatre',
    imageFocus: 'object-center',
  },
  {
    id: 'newborn-support',
    slug: 'newborn-postnatal-support',
    name: 'Newborn & Postnatal Family Care',
    shortName: 'Newborn Support',
    category: 'Pediatrics',
    availability: 'OPD Mon–Sat · 24×7 Ward Support',
    summary:
      'Gentle first-month newborn wellness checks, breastfeeding guidance, jaundice screening, and parent readiness education.',
    overview:
      'Early weeks after birth require attentive medical guidance. Our team supports new parents with feeding latch checks, weight gain tracking, and safe newborn care habits.',
    treatments: [
      'First-week newborn discharge follow-up and weight checks',
      'Breastfeeding and lactation positioning support',
      'Newborn screening and congenital checkup referrals',
      'Parent education on safe sleep and danger signs',
    ],
    facilities: [
      'Quiet mother-and-baby assessment area',
      'Direct escalation pathway to NICU if needed',
      'Guided follow-up reminders via phone or WhatsApp desk',
    ],
    image: HOSPITAL_PHOTOS.newbornCare,
    imageAlt: 'Sleeping newborn wrapped safely in warm hospital blanket',
    imageFocus: 'object-top',
  },
  {
    id: 'diagnostics',
    slug: 'diagnostics-emergency-pharmacy',
    name: '24×7 Emergency & Patient Support',
    shortName: 'Emergency & Support',
    category: 'Support & Diagnostics',
    availability: '24×7 Emergency Desk',
    summary:
      'Prompt emergency reception, essential bedside monitoring, pathology/diagnostic coordination, and round-the-clock family assistance.',
    overview:
      'Located centrally on Civil Lines Road opposite Zila Panchayat Gate in Deoria, our emergency and support desk helps families navigate admissions, referrals, and urgent consultations without delay.',
    treatments: [
      '24×7 pediatric and general urgent triage',
      'Essential point-of-care monitoring and sample collection [Verify In-House Lab List]',
      'Medication guidance and discharge summary documentation',
      'Direct ambulance/referral coordination via +91 88820 06566',
    ],
    facilities: [
      'Accessible 1st Floor Harmony Complex location on Civil Lines Road',
      'Dedicated 24×7 helpline: +91 88820 06566',
      'Trained nursing and support staff team',
    ],
    image: HOSPITAL_PHOTOS.exterior,
    imageAlt: 'Aradhya And Matulya Child Care Hospital exterior facade in Deoria',
    imageFocus: 'object-center',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-kamlesh',
    name: 'Dr. Kamlesh',
    role: 'Lead Pediatrician & Neonatology Specialist',
    departmentIds: ['nicu', 'picu', 'pediatrics', 'newborn-support'],
    qualification: '[Editable Qualification: e.g., MBBS, MD (Pediatrics) — Verify Registration No.]',
    experience: '[Editable Experience — Update verified years of clinical practice]',
    availability: 'OPD Mon–Sat 9:00 – 19:00 · 24×7 NICU/PICU On-Call',
    bio: 'Leading pediatric, neonatal intensive care (NICU), and child wellness services at Aradhya And Matulya Child Care Hospital, Deoria.',
    isPlaceholderProfile: false,
    instagram: '@dr.kamlesh2101',
    image: HOSPITAL_PHOTOS.nicuDoctorNewborn,
    imageAlt: 'Dr. Kamlesh caring for a newborn beside a NICU warmer',
    imageFocus: 'object-center',
  },
  {
    id: 'dr-nicu-specialist',
    name: 'Consultant Neonatologist & Pediatrician [Editable Name]',
    role: 'NICU & Pediatric Critical Care',
    departmentIds: ['nicu', 'picu'],
    qualification: '[Editable Qualification & Medical Council Reg. No.]',
    experience: '[Editable Experience — Update verified tenure]',
    availability: 'NICU & PICU Rotation · OPD by Schedule',
    bio: 'Supervises neonatal radiant warmer stabilization, ventilator/oxygen monitoring, and round-the-clock PICU patient management.',
    isPlaceholderProfile: true,
    image: HOSPITAL_PHOTOS.nicuSpecialistMonitor,
    imageAlt: 'Critical care specialist in blue scrubs beside NICU monitoring system',
    imageFocus: 'object-top',
  },
  {
    id: 'dr-surgical-lead',
    name: 'Consultant Surgeon [Editable Name]',
    role: 'Surgical & Laparoscopic Procedures',
    departmentIds: ['surgical'],
    qualification: '[Editable Qualification: e.g., MBBS, MS — Verify Registration No.]',
    experience: '[Editable Experience — Update verified surgical tenure]',
    availability: 'OPD Mon–Sat · Scheduled & Emergency OT',
    bio: 'Handles laparoscopic and general surgical evaluations, sterile OT procedures, and structured post-operative follow-up.',
    isPlaceholderProfile: true,
    image: HOSPITAL_PHOTOS.otSurgeonGown,
    imageAlt: 'Surgeon in sterile blue operation theatre gown and cap',
    imageFocus: 'object-top',
  },
  {
    id: 'dr-opd-consultant',
    name: 'Consultant Physician [Editable Name]',
    role: 'Outpatient Consultation & Follow-Up Care',
    departmentIds: ['pediatrics', 'newborn-support', 'diagnostics'],
    qualification: '[Editable Qualification & Registration No.]',
    experience: '[Editable Experience — Update verified tenure]',
    availability: 'OPD Mon–Sat · 9:00 – 19:00',
    bio: 'Conducts daily outpatient consultations, diagnostic reviews, preventive health checkups, and family care counseling.',
    isPlaceholderProfile: true,
    image: HOSPITAL_PHOTOS.opdDeskDoctor,
    imageAlt: 'Physician seated at OPD consultation desk with stethoscope',
    imageFocus: 'object-top',
  },
  {
    id: 'dr-senior-director',
    name: 'Senior Medical Director [Editable Name]',
    role: 'Clinical Governance & Patient Relations',
    departmentIds: ['pediatrics', 'diagnostics'],
    qualification: '[Editable Qualification & Leadership Designation]',
    experience: '[Editable Experience — Update verified tenure]',
    availability: 'By Appointment · Mon–Sat',
    bio: 'Oversees hospital quality standards, clinical protocols, and family consultation coordination at Harmony Complex.',
    isPlaceholderProfile: true,
    image: HOSPITAL_PHOTOS.executiveCabinDoctor,
    imageAlt: 'Senior medical consultant inside hospital consultation chamber',
    imageFocus: 'object-top',
  },
];

export const TIME_SLOTS = [
  '09:00 AM – 10:30 AM',
  '10:30 AM – 12:00 PM',
  '12:00 PM – 02:00 PM',
  '02:00 PM – 04:00 PM',
  '04:00 PM – 06:00 PM',
  '06:00 PM – 07:00 PM',
];

export const WHY_CHOOSE_STEPS = [
  {
    step: '01',
    title: '24×7 Dedicated NICU, PICU & Pediatric Emergency',
    detail:
      'Critical care never waits for clinic hours. Our neonatal and pediatric intensive units remain staffed around the clock for urgent admissions in Deoria.',
  },
  {
    step: '02',
    title: 'Child-First Clinical Architecture & Hygiene',
    detail:
      'Dedicated radiant warmers, monitored recovery zones, and sterile laparoscopic operation theatre workflows designed specifically around safety and infection control.',
  },
  {
    step: '03',
    title: 'Transparent Communication with Parents',
    detail:
      'Clear consultation notes, direct phone & WhatsApp coordination (+91 88820 06566), and honest guidance before every test or procedure.',
  },
  {
    step: '04',
    title: 'Central Deoria Location at Harmony Complex',
    detail:
      'Conveniently situated on the 1st Floor, Harmony Complex, Opp. Zila Panchayat Gate on Civil Lines Road & Nehru Nagar for quick access from across Deoria district.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-exterior',
    title: 'Hospital Facade · Civil Lines Road, Deoria',
    category: 'Infrastructure',
    caption: 'Illuminated exterior of Aradhya And Matulya Child Care Hospital at Harmony Complex.',
    image: HOSPITAL_PHOTOS.exterior,
    imageFocus: 'object-center',
  },
  {
    id: 'gal-nicu-care',
    title: 'Neonatal Intensive Care Unit (NICU)',
    category: 'Clinical & NICU',
    caption: 'Supervised newborn care beside calibrated radiant warmer and thermal monitoring.',
    image: HOSPITAL_PHOTOS.nicuDoctorNewborn,
    imageFocus: 'object-center',
  },
  {
    id: 'gal-nicu-monitor',
    title: 'NICU Monitoring & Critical Care Bay',
    category: 'Clinical & NICU',
    caption: 'Specialist clinician beside continuous neonatal warmer and respiratory support station.',
    image: HOSPITAL_PHOTOS.nicuSpecialistMonitor,
    imageFocus: 'object-top',
  },
  {
    id: 'gal-ot-laparoscopy',
    title: 'Laparoscopic Operation Theatre',
    category: 'Clinical & NICU',
    caption: 'Sterile surgical team operating with high-definition laparoscopic visualization tower.',
    image: HOSPITAL_PHOTOS.laparoscopyOtTeam,
    imageFocus: 'object-center',
  },
  {
    id: 'gal-team',
    title: 'Doctors & Pediatric Nursing Staff',
    category: 'Medical Team',
    caption: 'Multidisciplinary clinical and nursing team inside the inpatient hospital corridor.',
    image: HOSPITAL_PHOTOS.clinicalTeamCorridor,
    imageFocus: 'object-top',
  },
  {
    id: 'gal-opd',
    title: 'Outpatient Consultation Desk',
    category: 'Infrastructure',
    caption: 'Daily OPD consultation clinic operating Monday to Saturday, 9:00 AM to 7:00 PM.',
    image: HOSPITAL_PHOTOS.opdDeskDoctor,
    imageFocus: 'object-top',
  },
  {
    id: 'gal-cabin',
    title: 'Senior Consultation Chamber',
    category: 'Infrastructure',
    caption: 'Private family consultation room for detailed treatment planning and counseling.',
    image: HOSPITAL_PHOTOS.executiveCabinDoctor,
    imageFocus: 'object-top',
  },
  {
    id: 'gal-surgeon',
    title: 'Surgical Team Readiness',
    category: 'Medical Team',
    caption: 'Surgeon in sterile operation theatre attire preparing for scheduled procedure.',
    image: HOSPITAL_PHOTOS.otSurgeonGown,
    imageFocus: 'object-top',
  },
  {
    id: 'gal-awards',
    title: 'Medical Conference & Recognition [Editable Event Title]',
    category: 'Events & Recognition',
    caption: 'Hospital leadership recognized on stage — replace caption with verified event & year.',
    image: HOSPITAL_PHOTOS.awardsStage,
    imageFocus: 'object-top',
  },
  {
    id: 'gal-newborn',
    title: 'Postnatal Newborn Comfort',
    category: 'Clinical & NICU',
    caption: 'Warm swaddling and gentle newborn care following clinical evaluation.',
    image: HOSPITAL_PHOTOS.newbornCare,
    imageFocus: 'object-top',
  },
];

export const HEALTH_CHECKUPS: CheckupPackage[] = [
  {
    id: 'pkg-newborn',
    name: 'Newborn First-Month Wellness Check',
    ageGroup: '0 – 28 Days',
    scheduleNote: 'OPD Mon–Sat · 9:00 – 19:00',
    includes: [
      'Weight, length & head circumference percentile tracking',
      'Jaundice & feeding adequacy clinical evaluation',
      'Umbilical cord, skin & reflex examination',
      'Parent guide on sleep safety & danger signs',
    ],
    feeNote: '[Editable Package Fee — Confirm at Front Desk]',
  },
  {
    id: 'pkg-infant-growth',
    name: 'Infant & Toddler Growth & Immunization Review',
    ageGroup: '1 Month – 5 Years',
    scheduleNote: 'By OPD Appointment',
    includes: [
      'Developmental milestone & nutrition screening',
      'Immunization card audit & catch-up schedule planning',
      'Hemoglobin & basic growth parameter review [As Advised]',
      'Pediatric dietary counseling for parents',
    ],
    feeNote: '[Editable Package Fee — Confirm at Front Desk]',
  },
  {
    id: 'pkg-school-child',
    name: 'School-Age Child Preventive Health Check',
    ageGroup: '5 – 16 Years',
    scheduleNote: 'OPD Mon–Sat · Fasting Optional',
    includes: [
      'Comprehensive pediatric physical & vision/ENT screening',
      'BMI, posture, and nutritional deficiency check',
      'Baseline blood panel coordination [As Advised by Physician]',
      'School fitness certificate consultation',
    ],
    feeNote: '[Editable Package Fee — Confirm at Front Desk]',
  },
];

export const HEALTH_GUIDES: GuideArticle[] = [
  {
    id: 'guide-newborn-signs',
    category: 'Neonatal Care',
    readTime: '4 min guide',
    title: 'When to Seek Immediate 24×7 Neonatal Care for Your Newborn',
    summary:
      'Key warning signs in the first 28 days—including fast breathing, poor feeding, fever or hypothermia, and deep yellowing—that warrant urgent NICU evaluation.',
    keyPoints: [
      'Rapid breathing (>60 breaths/min) or chest indrawing while resting.',
      'Refusal to feed, weak cry, or unusual lethargy over consecutive feeds.',
      'Fever above 100.4°F (38°C) or persistent cold extremities.',
      'Yellowish discoloration spreading to palms or soles within the first week.',
    ],
    image: HOSPITAL_PHOTOS.nicuDoctorNewborn,
    imageAlt: 'Doctor examining newborn beside NICU radiant warmer',
    imageFocus: 'object-center',
  },
  {
    id: 'guide-opd-visit',
    category: 'Hospital Guide',
    readTime: '3 min guide',
    title: 'Preparing for Your Pediatric OPD Visit at Harmony Complex',
    summary:
      'A quick checklist of immunization cards, prior prescriptions, and feeding logs to bring along for Monday–Saturday OPD consultations in Deoria.',
    keyPoints: [
      'Bring your child’s previous vaccination record and birth discharge summary.',
      'List all current syrups, drops, or antibiotics with exact dosages.',
      'Arrive 15 minutes ahead of your online appointment slot for vitals screening.',
      'For urgent fever or breathing difficulty outside 9:00–19:00, proceed straight to 24×7 Emergency.',
    ],
    image: HOSPITAL_PHOTOS.opdDeskDoctor,
    imageAlt: 'Pediatric OPD consultation desk',
    imageFocus: 'object-top',
  },
  {
    id: 'guide-ot-prep',
    category: 'Surgical Guidance',
    readTime: '4 min guide',
    title: 'Pre-Operative Safety & Recovery Checklist for Families',
    summary:
      'Understanding fasting instructions, pre-anesthesia checks, and post-operative monitoring for scheduled surgical or laparoscopic procedures.',
    keyPoints: [
      'Follow exact fasting times provided by the surgical and anesthesia team.',
      'Report any recent cold, cough, or fever before the scheduled OT morning.',
      'Keep emergency contact (+91 88820 06566) accessible during recovery.',
    ],
    image: HOSPITAL_PHOTOS.laparoscopyOtTeam,
    imageAlt: 'Surgical team in laparoscopic operation theatre',
    imageFocus: 'object-center',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    parentName: 'Parent Feedback Placeholder 01 [Replace with Verified Name]',
    departmentTag: 'NICU & Newborn Care',
    quote:
      '[Editable Testimonial — Replace with verified parent consent quote describing newborn care experience, NICU staff responsiveness, and discharge recovery.]',
    isPlaceholder: true,
    image: HOSPITAL_PHOTOS.newbornCare,
  },
  {
    id: 'test-2',
    parentName: 'Parent Feedback Placeholder 02 [Replace with Verified Name]',
    departmentTag: 'Pediatric OPD & Immunization',
    quote:
      '[Editable Testimonial — Replace with verified family feedback on OPD consultation clarity, waiting time, and pediatric follow-up.]',
    isPlaceholder: true,
    image: HOSPITAL_PHOTOS.clinicalTeamCorridor,
  },
  {
    id: 'test-3',
    parentName: 'Patient Feedback Placeholder 03 [Replace with Verified Name]',
    departmentTag: 'Surgical & Post-Op Recovery',
    quote:
      '[Editable Testimonial — Replace with verified patient/guardian note on surgical briefing, hygiene standards, and post-operative recovery.]',
    isPlaceholder: true,
    image: HOSPITAL_PHOTOS.exterior,
  },
];
