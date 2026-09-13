import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://localhost:8085';

const FALLBACK_JOBS = [
  {
    id: 'intern-trainee',
    title: 'Internship / Project Trainee / Trainee',
    responsibility: 'To conduct Market survey / Viability study / Product development / Customer Survey / Market expansion study, To develop tech solutions / process / AI tools / recruitment / market engagement, forming new digital marketing team',
    qualification: 'Minimum Bachelor Degree — Degree completed or final year students',
    experience: 'Fresher with commitment and confidence',
    age: 'Above 19 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-3.png',
    category: 'care-provider',
  },
  {
    id: 'patient-care-assistant',
    title: 'Patient Care Assistant / Care Taker',
    responsibility: 'Patient Care and Execution of Non clinical care plan and deliverables.',
    qualification: 'Minimum successfully completed skill development programs related to Healthcare / Patient Care / Homecare / Patient Assistant / Paramedics / Lab Technician',
    experience: 'Minimum one year in Patient Care services in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-4.png',
    category: 'care-provider',
  },
  {
    id: 'home-healthcare-nurse',
    title: 'Home Healthcare Nurse',
    responsibility: 'Patient Care and Execution of Nursing care plan and deliverables.',
    qualification: 'Minimum ANM / GNM / B.Sc (Nursing)',
    experience: 'Minimum one year in Patient Care services in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-5.png',
    category: 'care-provider',
  },
  {
    id: 'home-healthcare-physician',
    title: 'Home Healthcare Physician',
    responsibility: 'Patient Health Care and Execution of Nursing care plan and deliverables.',
    qualification: 'Minimum MBBS or Equivalent, recognized by MCI',
    experience: 'Minimum one year in Patient Care treatment in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-5b.png',
    category: 'care-provider',
  },
  {
    id: 'home-healthcare-physiotherapist',
    title: 'Home Healthcare Physiotherapist',
    responsibility: 'Patient Health Care and Execution of Physiotherapy care plan and deliverables.',
    qualification: 'Minimum BPT',
    experience: 'Minimum one year in Patient Care treatment in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-8.png',
    category: 'care-provider',
  },
  {
    id: 'rehabilitation-expert',
    title: 'Rehabilitation Expert',
    responsibility: 'Patient Health Care and Execution of Rehabilitation Care plan and deliverables.',
    qualification: 'Minimum BPT / Dietician / psychologist / Councilor / Physician / speech therapist etc',
    experience: 'Minimum one year in Rehabilitation Care treatment in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-9.png',
    category: 'care-provider',
  },
  {
    id: 'nursing-supervisor',
    title: 'Home Healthcare Nursing Supervisor',
    responsibility: 'Supervising and Guiding team of nurses, Patient Health Care and Execution of Nursing care plan and deliverables, process and documentation',
    qualification: 'Minimum GNM / B.Sc (Nursing)',
    experience: 'Minimum 5 year in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-10.png',
    category: 'care-provider',
  },
  {
    id: 'nursing-educator',
    title: 'Home Healthcare Nursing Educator',
    responsibility: 'Training, Supervising and Guiding team of nurses in Patient Health Care and Execution of Nursing care plan and deliverables, process and documentation',
    qualification: 'Minimum GNM / B.Sc (Nursing)',
    experience: 'Minimum 5 year in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Female',
    image: '/images/career/pic-11.png',
    category: 'care-provider',
  },
  {
    id: 'bio-medical-engineer',
    title: 'Bio Medical Engineer – Field Service',
    responsibility: 'Install, trouble shoot, service medical equipment at patient home. Retrieve, service, maintain stocks.',
    qualification: 'Minimum Diploma / BE',
    experience: 'Fresher / Minimum 1 year medical equipment industry',
    age: 'Above 20 Years',
    gender: 'Male',
    image: '/images/career/pic-12.png',
    category: 'care-provider',
  },
  {
    id: 'customer-service-delivery',
    title: 'Customer Service Delivery',
    responsibility: 'Manage daily patient care operations, execution of process, care provider deployment, monitor, measure and control patient care performance',
    qualification: 'Minimum Diploma / BE / GNM / B.Sc (Nursing)',
    experience: 'Fresher / Minimum 1 year Healthcare Industry',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-13.png',
    category: 'care-provider',
  },
  {
    id: 'client-relationship-manager',
    title: 'Client Relationship Manager',
    responsibility: 'Identify, convert and acquire clients requiring our services. Develop relationship with major hospitals / business sources. Acquire accounts and generate revenue, market expansion, product launching',
    qualification: 'Minimum Diploma / BE / GNM / B.Sc (Nursing)',
    experience: 'Fresher / Minimum 1 year medical equipment industry',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-14.png',
    category: 'care-provider',
  },
  {
    id: 'hr-team',
    title: 'Human Resource Team – Executive / Manager',
    responsibility: 'Recruitment — Care Providers — Homecare Nurses / Physician / Physiotherapist / Lab Technician / Rehabilitation expert. Experts in Sales / Marketing / Accounts / HR / Operations',
    qualification: 'Minimum Bachelor Degree',
    experience: 'Fresher / Minimum 1 year in HR',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-15.png',
    category: 'care-provider',
  },
  {
    id: 'sales-team',
    title: 'Sales Team – Field Executive / Manager',
    responsibility: 'Client Acquisition, Revenue generation, Business tie up, Account manager',
    qualification: 'Minimum Bachelor Degree',
    experience: 'Fresher / Minimum 1 year in Retail sales / Corporate sales / B2B / B2C — healthcare exposure is an added advantage',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-16.png',
    category: 'care-provider',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing – Executive / Manager',
    responsibility: 'Client acquisition through digital marketing — Social media promotions / create and run media ads / generate qualified leads, experts in design ad collaterals, managing postings etc',
    qualification: 'Minimum Bachelor Degree',
    experience: 'Fresher / Minimum 1 year in Digital Marketing',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-17.png',
    category: 'care-provider',
  },
  {
    id: 'resource-partner',
    title: 'Resource Partner – Care Provider / Medical Equipment etc',
    responsibility: 'To provide resources and services in — Recruitment, Care provider supply, medical equipment, Training, Sales & Marketing, accounts, due diligence, client acquisition, finance & accounts etc',
    qualification: 'Individual or entity, registered, existing and running, having physical presence and having expertise in the field selected',
    experience: 'Minimum 1 years in select field',
    age: '',
    gender: '',
    image: '/images/career/pic-18.png',
    category: 'resource-partner',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || '';

  try {
    const queryPart = category ? '?category=' + encodeURIComponent(category) : '';
    const backendUrl = BACKEND_API_BASE_URL + '/api/join-us/jobs' + queryPart;
    const res = await fetch(backendUrl, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (err) {
    console.warn('Backend jobs API unreachable, serving fallback catalog:', err);
  }

  // Fallback if backend is starting up
  const filtered = category
    ? FALLBACK_JOBS.filter((j) => j.category === category)
    : FALLBACK_JOBS;

  return NextResponse.json({
    ok: true,
    count: filtered.length,
    jobs: filtered,
    source: 'fallback',
  });
}
