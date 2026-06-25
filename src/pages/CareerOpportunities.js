import { FaBriefcase, FaMapMarkerAlt, FaClock, FaEnvelope, FaChevronDown, FaChevronUp, FaUserTie, FaChalkboardTeacher, FaWrench } from 'react-icons/fa';
import { useState } from 'react';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { HERO_IMAGES } from '../utils/imageConstants';

const VACANCIES = [
  {
    id: 1,
    title: 'Mathematics Teacher (Grades 10–12)',
    type: 'Permanent',
    department: 'Academics',
    Icon: FaChalkboardTeacher,
    iconColor: 'text-primary bg-primary/10',
    posted: '10 June 2025',
    closing: '10 July 2025',
    description: 'Harding Secondary School invites applications from suitably qualified and experienced Mathematics teachers for Grades 10–12. The successful candidate will be responsible for CAPS-aligned lesson delivery, formal assessments, and learner support.',
    requirements: [
      'B.Ed or PGCE with Mathematics as a major subject',
      'Registered with SACE (South African Council for Educators)',
      'Minimum 3 years\' teaching experience in the FET phase',
      'Experience with NSC examination preparation',
      'Strong classroom management skills',
    ],
  },
  {
    id: 2,
    title: 'Physical Science Teacher (Grades 10–12)',
    type: 'Permanent',
    department: 'Academics',
    Icon: FaChalkboardTeacher,
    iconColor: 'text-blue-600 bg-blue-100',
    posted: '10 June 2025',
    closing: '10 July 2025',
    description: 'We are seeking a dedicated Physical Science teacher for the FET phase. The role involves planning and delivering engaging science lessons, conducting practical experiments, and preparing learners for NSC examinations.',
    requirements: [
      'B.Ed or PGCE with Physical Science as a major subject',
      'Valid SACE registration',
      'Minimum 2 years\' FET phase teaching experience',
      'Competence in laboratory safety and management',
      'Ability to work collaboratively in a departmental team',
    ],
  },
  {
    id: 3,
    title: 'School Administrative Officer',
    type: 'Full-time',
    department: 'Administration',
    Icon: FaUserTie,
    iconColor: 'text-purple-600 bg-purple-100',
    posted: '1 June 2025',
    closing: '30 June 2025',
    description: 'We are looking for a detail-oriented Administrative Officer to manage school records, correspondence, and front-office operations. The candidate will support the principal and SGB with administrative tasks.',
    requirements: [
      'Diploma or degree in Office Administration or equivalent',
      'Proficient in Microsoft Office Suite (Word, Excel, Outlook)',
      'Minimum 2 years\' experience in an administrative role',
      'Excellent written and verbal communication skills',
      'Ability to handle confidential information with discretion',
    ],
  },
  {
    id: 4,
    title: 'School Maintenance Officer',
    type: 'Full-time',
    department: 'Facilities',
    Icon: FaWrench,
    iconColor: 'text-orange-500 bg-orange-100',
    posted: '5 June 2025',
    closing: '5 July 2025',
    description: 'Harding Secondary School seeks a reliable Maintenance Officer to oversee the upkeep of school facilities, including buildings, grounds, plumbing, and electrical systems.',
    requirements: [
      'Relevant trade qualification (plumbing, electrical, or general maintenance)',
      'Minimum 3 years\' maintenance experience',
      'Ability to perform minor repairs independently',
      'Valid driver\'s licence',
      'Physically fit and able to perform manual tasks',
    ],
  },
];

const VacancyCard = ({ title, type, department, Icon, iconColor, posted, closing, description, requirements }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor}`}>
            <Icon className="text-lg" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-neutral-800 text-base leading-snug">{title}</h3>
            <div className="flex flex-wrap gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <FaMapMarkerAlt className="text-primary text-[10px]" /> Harding, KZN
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <FaBriefcase className="text-[10px]" /> {type}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <FaClock className="text-[10px]" /> Closes: {closing}
              </span>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{department}</span>
            </div>
          </div>
        </div>
        {open ? <FaChevronUp className="text-neutral-400 flex-shrink-0 mt-1" /> : <FaChevronDown className="text-neutral-400 flex-shrink-0 mt-1" />}
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-neutral-100 pt-5">
          <p className="text-sm text-neutral-600 leading-relaxed mb-5">{description}</p>
          <h4 className="text-sm font-semibold text-neutral-800 mb-3">Requirements</h4>
          <ul className="space-y-1.5 mb-6">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm text-neutral-600">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                {req}
              </li>
            ))}
          </ul>
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-600">
            <p className="font-semibold text-neutral-800 mb-1">How to Apply</p>
            <p>
              Send your CV, certified copies of qualifications, and a covering letter to{' '}
              <a href="mailto:info@hardingsecondary.edu.za" className="text-primary font-medium hover:underline">
                info@hardingsecondary.edu.za
              </a>{' '}
              before {closing}. Late applications will not be considered.
            </p>
            <p className="mt-1 text-xs text-neutral-400">Posted: {posted}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const CareerOpportunities = () => (
  <>
    <SEO
      title="Career Opportunities | Harding Secondary School"
      description="Explore career opportunities and job vacancies at Harding Secondary School. Join our dedicated team of educators and staff."
    />
    <div>
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
        <img
          src={HERO_IMAGES.graduation}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="relative z-10 container-custom">
          <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Join Our Team</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
            Career Opportunities
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">
            Shape the next generation — join the Harding Secondary School family
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-14 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Why Harding Secondary?</p>
              <h2 className="text-3xl font-heading font-bold text-primary-dark mb-4">A great place to build your career</h2>
              <p className="text-neutral-500 leading-relaxed text-sm">
                Harding Secondary School has been at the forefront of education in KwaZulu-Natal since 1950. We foster a collaborative, inclusive, and professional working environment where every team member is valued and supported in their growth.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-primary-dark">Current Vacancies</h2>
                  <p className="text-neutral-500 text-sm mt-1">Click a position to view details and apply</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 bg-primary text-white rounded-full">
                  {VACANCIES.length} Open
                </span>
              </div>

              <div className="space-y-4">
                {VACANCIES.map((v) => (
                  <VacancyCard key={v.id} {...v} />
                ))}
              </div>

              <div className="mt-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                <h3 className="font-heading font-bold text-primary-dark mb-2">Don't see a suitable vacancy?</h3>
                <p className="text-neutral-500 text-sm mb-4">Send us your CV and we'll keep it on file for future opportunities.</p>
                <a
                  href="mailto:info@hardingsecondary.edu.za"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
                >
                  <FaEnvelope />
                  Send Speculative Application
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  </>
);

export default CareerOpportunities;
