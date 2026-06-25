import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaSearch, FaTimes, FaFilter, FaExternalLinkAlt, FaGraduationCap,
  FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave,
  FaCheckCircle, FaUniversity,
  FaArrowRight, FaLightbulb,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Data ─────────────────────────────────────────────────────────────────────

const BURSARIES = [
  {
    id: 'nsfas',
    name: 'NSFAS Student Bursary',
    provider: 'National Student Financial Aid Scheme',
    type: 'government',
    value: 'Full cost of study',
    fields: ['all'],
    provinces: ['all'],
    deadline: 'November – January',
    deadlineMonth: 11,
    description: 'NSFAS provides financial assistance to eligible South African students at public universities and TVET colleges. Covers tuition, accommodation, books, and living expenses for qualifying students. This is the primary government bursary for students from low-income households.',
    requirements: [
      'South African citizen',
      'Combined household income ≤ R350,000 per year',
      'First-time entering higher education (or continuing with good standing)',
      'Accepted at a public university or TVET college',
    ],
    applyUrl: 'https://www.nsfas.org.za',
    funded: 'Full tuition + accommodation + book allowance + transport + personal care allowance',
    renewable: true,
    featured: true,
  },
  {
    id: 'funza-lushaka',
    name: 'Funza Lushaka Teaching Bursary',
    provider: 'Department of Basic Education',
    type: 'government',
    value: 'Full cost of study',
    fields: ['education'],
    provinces: ['all'],
    deadline: 'September – October',
    deadlineMonth: 9,
    description: 'The Funza Lushaka Bursary Programme funds students who want to become teachers at public schools. Recipients must teach at a public school for each year of study funded — a rewarding career with job security.',
    requirements: [
      'South African citizen',
      'Commit to teaching at a public school after graduation',
      'Study a PGCE or B.Ed at an approved university',
      'Good academic record in relevant subjects',
    ],
    applyUrl: 'https://www.funzalushaka.doe.gov.za',
    funded: 'Full tuition + accommodation + books + monthly stipend',
    renewable: true,
    featured: true,
  },
  {
    id: 'isfap',
    name: 'ISFAP Bursary',
    provider: 'Ikusasa Student Financial Aid Programme',
    type: 'government',
    value: 'Full cost of study',
    fields: ['medicine', 'law', 'engineering', 'accounting', 'actuarial'],
    provinces: ['all'],
    deadline: 'September – October',
    deadlineMonth: 9,
    description: 'ISFAP targets the "missing middle" — students from households earning R350,000–R600,000/year who don\'t qualify for NSFAS but cannot afford university fees. Focuses on scarce and critical skills programmes in South Africa.',
    requirements: [
      'South African citizen',
      'Household income between R350,000–R600,000/year',
      'Enrolled in an ISFAP-approved scarce skills programme',
      'Good academic standing',
    ],
    applyUrl: 'https://www.isfap.org.za',
    funded: 'Full cost of study including accommodation and living allowance',
    renewable: true,
    featured: true,
  },
  {
    id: 'kzn-provincial',
    name: 'KZN Provincial Bursary',
    provider: 'KwaZulu-Natal Department of Education',
    type: 'provincial',
    value: 'Up to R75,000/year',
    fields: ['all'],
    provinces: ['KwaZulu-Natal'],
    deadline: 'October – November',
    deadlineMonth: 10,
    description: 'The KwaZulu-Natal Department of Education offers bursaries to KZN residents pursuing higher education. Special preference is given to students from rural and previously disadvantaged communities — making this ideal for Harding-area learners.',
    requirements: [
      'KwaZulu-Natal resident',
      'South African citizen',
      'Good academic record',
      'Demonstrated financial need',
    ],
    applyUrl: 'https://www.kzneducation.gov.za',
    funded: 'Tuition + accommodation allowance',
    renewable: true,
    featured: true,
  },
  {
    id: 'kzn-treasury',
    name: 'KZN Provincial Treasury Bursary',
    provider: 'KwaZulu-Natal Provincial Treasury',
    type: 'provincial',
    value: 'Up to R90,000/year',
    fields: ['finance', 'accounting', 'economics', 'public-admin'],
    provinces: ['KwaZulu-Natal'],
    deadline: 'August – September',
    deadlineMonth: 8,
    description: 'KZN Provincial Treasury bursaries target students studying finance, accounting, economics, and public administration. Graduates are placed in KZN provincial government departments.',
    requirements: [
      'KwaZulu-Natal resident',
      'South African citizen',
      'Studying finance, accounting, or economics',
      'Work-back obligation in the KZN provincial government',
    ],
    applyUrl: 'https://www.kzntreasury.gov.za',
    funded: 'Full tuition + living allowance',
    renewable: true,
    featured: false,
  },
  {
    id: 'eskom',
    name: 'Eskom Scholarship',
    provider: 'Eskom',
    type: 'corporate',
    value: 'Up to R150,000/year',
    fields: ['engineering', 'it', 'finance', 'science'],
    provinces: ['all'],
    deadline: 'August – September',
    deadlineMonth: 8,
    description: 'Eskom offers scholarships to exceptional students pursuing qualifications in engineering, IT, finance, and related fields. Includes work-back obligation at Eskom after graduation and mentorship throughout your studies.',
    requirements: [
      'South African citizen',
      'Excellent matric results (70%+ average)',
      'Mathematics and Physical Sciences as subjects',
      'Accepted at a South African university',
    ],
    applyUrl: 'https://www.eskom.co.za/careers',
    funded: 'Tuition + accommodation + books + monthly living allowance',
    renewable: true,
    featured: false,
  },
  {
    id: 'sasol',
    name: 'Sasol Bursary Programme',
    provider: 'Sasol',
    type: 'corporate',
    value: 'Up to R120,000/year',
    fields: ['engineering', 'science', 'it', 'finance'],
    provinces: ['all'],
    deadline: 'August – October',
    deadlineMonth: 8,
    description: 'Sasol offers bursaries to students studying in fields aligned to their business — chemical engineering, mechanical engineering, IT, and science. Includes vacation work experience at Sasol facilities.',
    requirements: [
      'South African citizen',
      '70%+ in Mathematics and Physical Sciences',
      'Accepted at an accredited South African university',
      'Strong overall academic record',
    ],
    applyUrl: 'https://www.sasol.com/careers',
    funded: 'Full tuition + books + accommodation + living costs',
    renewable: true,
    featured: false,
  },
  {
    id: 'standard-bank',
    name: 'Standard Bank Bursary',
    provider: 'Standard Bank Group',
    type: 'corporate',
    value: 'Up to R100,000/year',
    fields: ['finance', 'it', 'engineering', 'commerce', 'actuarial'],
    provinces: ['all'],
    deadline: 'September – October',
    deadlineMonth: 9,
    description: 'Standard Bank provides bursaries to high-achieving students studying finance, IT, engineering, and commerce. Successful recipients receive mentorship, banking industry exposure, and internship opportunities.',
    requirements: [
      'South African citizen',
      '65%+ academic average',
      'Enrolled in a relevant degree at a South African university',
      'Leadership potential demonstrated through activities',
    ],
    applyUrl: 'https://www.standardbank.co.za/careers',
    funded: 'Tuition + books allowance + possible living stipend',
    renewable: true,
    featured: false,
  },
  {
    id: 'fnb',
    name: 'FNB Bursary Programme',
    provider: 'First National Bank',
    type: 'corporate',
    value: 'Up to R90,000/year',
    fields: ['finance', 'accounting', 'it', 'commerce', 'law'],
    provinces: ['all'],
    deadline: 'October – November',
    deadlineMonth: 10,
    description: 'FNB offers bursaries to students studying finance, accounting, IT, and law. Includes mentorship throughout your studies and vacation work opportunities at FNB branches and head offices.',
    requirements: [
      'South African citizen',
      'Good matric results in relevant subjects',
      'Accepted at a reputable South African university',
      '60%+ average in relevant school subjects',
    ],
    applyUrl: 'https://www.fnb.co.za/careers',
    funded: 'Full tuition + book allowance',
    renewable: true,
    featured: false,
  },
  {
    id: 'transnet',
    name: 'Transnet Bursary Scheme',
    provider: 'Transnet',
    type: 'government',
    value: 'Up to R130,000/year',
    fields: ['engineering', 'logistics', 'it', 'finance'],
    provinces: ['all'],
    deadline: 'July – September',
    deadlineMonth: 7,
    description: 'Transnet bursaries support students studying engineering, logistics, IT, and finance. Recipients are expected to complete vacation work and join Transnet after graduation, building South Africa\'s transport infrastructure.',
    requirements: [
      'South African citizen',
      '65%+ in Mathematics and Physical Sciences (engineering applicants)',
      'Accepted at a South African university',
      'Strong matric academic performance',
    ],
    applyUrl: 'https://www.transnet.net/careers',
    funded: 'Full tuition + books + accommodation + monthly stipend',
    renewable: true,
    featured: false,
  },
  {
    id: 'telkom',
    name: 'Telkom Bursary Programme',
    provider: 'Telkom',
    type: 'corporate',
    value: 'Up to R110,000/year',
    fields: ['it', 'engineering', 'science', 'commerce'],
    provinces: ['all'],
    deadline: 'August – October',
    deadlineMonth: 8,
    description: 'Telkom provides bursaries to students studying ICT-related and engineering qualifications. Focus is on building South Africa\'s digital economy and telecommunications infrastructure.',
    requirements: [
      'South African citizen',
      '65%+ in Mathematics',
      'Accepted for an ICT or engineering programme',
      'Demonstrated financial need',
    ],
    applyUrl: 'https://www.telkom.co.za/careers',
    funded: 'Tuition + accommodation + books allowance',
    renewable: true,
    featured: false,
  },
  {
    id: 'mtn',
    name: 'MTN SA Foundation Bursary',
    provider: 'MTN South Africa Foundation',
    type: 'corporate',
    value: 'Up to R80,000/year',
    fields: ['it', 'engineering', 'science', 'commerce'],
    provinces: ['all'],
    deadline: 'August – September',
    deadlineMonth: 8,
    description: 'The MTN SA Foundation bursary supports students in ICT, engineering, and commerce at South African universities. Focuses on students from disadvantaged backgrounds with strong academic performance.',
    requirements: [
      'South African citizen',
      'Financially disadvantaged background',
      'Good matric results in relevant subjects',
      'Community involvement and leadership',
    ],
    applyUrl: 'https://www.mtn.com/south-africa/foundation',
    funded: 'Tuition + books + accommodation',
    renewable: true,
    featured: false,
  },
  {
    id: 'vodacom',
    name: 'Vodacom Foundation Bursary',
    provider: 'Vodacom Foundation',
    type: 'corporate',
    value: 'Up to R90,000/year',
    fields: ['it', 'engineering', 'science', 'commerce'],
    provinces: ['all'],
    deadline: 'August – September',
    deadlineMonth: 8,
    description: 'Vodacom\'s bursary programme targets ICT, engineering, and commerce students at South African universities. Successful recipients get mentorship and opportunities to work at Vodacom after completing their studies.',
    requirements: [
      'South African citizen',
      '70%+ in Mathematics',
      'Accepted at a South African university',
      'Interest in telecommunications and technology',
    ],
    applyUrl: 'https://www.vodacom.co.za',
    funded: 'Tuition + books + possible stipend',
    renewable: true,
    featured: false,
  },
  {
    id: 'old-mutual',
    name: 'Old Mutual Foundation Bursary',
    provider: 'Old Mutual Foundation',
    type: 'corporate',
    value: 'Up to R85,000/year',
    fields: ['finance', 'actuarial', 'accounting', 'commerce'],
    provinces: ['all'],
    deadline: 'September – October',
    deadlineMonth: 9,
    description: 'Old Mutual supports students in financial and actuarial sciences through its foundation bursary. Includes structured mentorship and internship opportunities within the Old Mutual Group.',
    requirements: [
      'South African citizen',
      '70%+ in Mathematics',
      'Studying actuarial science, finance, or accounting',
      'Demonstrated financial need',
    ],
    applyUrl: 'https://www.oldmutual.co.za/foundation',
    funded: 'Tuition + books + living allowance',
    renewable: true,
    featured: false,
  },
  {
    id: 'nedbank',
    name: 'Nedbank Bursary',
    provider: 'Nedbank',
    type: 'corporate',
    value: 'Up to R95,000/year',
    fields: ['finance', 'it', 'accounting', 'commerce', 'law'],
    provinces: ['all'],
    deadline: 'September – October',
    deadlineMonth: 9,
    description: 'Nedbank\'s bursary programme funds students in finance, IT, law, and commerce. Recipients benefit from mentorship throughout their studies and potential employment opportunities at Nedbank after graduation.',
    requirements: [
      'South African citizen',
      'Good matric performance',
      'Studying at a South African university',
      'Demonstrated financial need',
    ],
    applyUrl: 'https://www.nedbank.co.za/careers',
    funded: 'Tuition + book allowance',
    renewable: true,
    featured: false,
  },
  {
    id: 'nrf',
    name: 'NRF Postgraduate Bursary',
    provider: 'National Research Foundation',
    type: 'government',
    value: 'Up to R200,000/year',
    fields: ['science', 'engineering', 'technology', 'research'],
    provinces: ['all'],
    deadline: 'April – June',
    deadlineMonth: 4,
    description: 'The NRF supports postgraduate students in STEM and research fields. Focuses on building South Africa\'s research capacity through competitive bursaries for honours, masters, and doctoral study.',
    requirements: [
      'South African citizen',
      'Registered or accepted for a postgraduate degree',
      'Strong academic record (70%+ average)',
      'Research proposal or supervisor confirmation letter',
    ],
    applyUrl: 'https://www.nrf.ac.za',
    funded: 'Annual stipend for postgraduate study',
    renewable: true,
    featured: false,
  },
  {
    id: 'merseta',
    name: 'MERSETA Bursary',
    provider: 'Manufacturing, Engineering and Related Services SETA',
    type: 'government',
    value: 'Up to R70,000/year',
    fields: ['engineering', 'manufacturing', 'it'],
    provinces: ['all'],
    deadline: 'August – October',
    deadlineMonth: 8,
    description: 'MERSETA provides bursaries in engineering, manufacturing, and automotive sectors. Covers qualifications from N-level diplomas through to degree programmes at accredited institutions.',
    requirements: [
      'South African citizen',
      'Accepted at an accredited institution',
      'Studying in an engineering or manufacturing field',
      'South African ID document',
    ],
    applyUrl: 'https://www.merseta.org.za',
    funded: 'Tuition + registration fees',
    renewable: false,
    featured: false,
  },
  {
    id: 'daff',
    name: 'Agriculture & Land Reform Bursary',
    provider: 'Department of Agriculture, Land Reform & Rural Development',
    type: 'government',
    value: 'Up to R80,000/year',
    fields: ['agriculture', 'environmental', 'food-science'],
    provinces: ['all'],
    deadline: 'September – October',
    deadlineMonth: 9,
    description: 'This bursary supports students studying agricultural sciences, food science, and related environmental fields. Particularly relevant for KZN students given the region\'s strong agricultural sector.',
    requirements: [
      'South African citizen',
      'Agricultural Sciences or Life Sciences in matric',
      'Accepted at a university for an agricultural programme',
      'Work-back obligation in government agriculture departments',
    ],
    applyUrl: 'https://www.dalrrd.gov.za',
    funded: 'Tuition + books + accommodation + monthly stipend',
    renewable: true,
    featured: false,
  },
  {
    id: 'anglo',
    name: 'Anglo American Bursary',
    provider: 'Anglo American',
    type: 'corporate',
    value: 'Up to R140,000/year',
    fields: ['engineering', 'science', 'it', 'finance'],
    provinces: ['all'],
    deadline: 'July – September',
    deadlineMonth: 7,
    description: 'Anglo American offers bursaries in mining, engineering, geology, and related fields. Includes structured vacation work at Anglo mines and strong prospects of permanent employment after graduation.',
    requirements: [
      'South African citizen',
      '70%+ in Mathematics and Physical Sciences',
      'Accepted for a relevant degree at a South African university',
      'Leadership qualities and community involvement',
    ],
    applyUrl: 'https://www.angloamerican.com/careers',
    funded: 'Full tuition + accommodation + books + monthly stipend',
    renewable: true,
    featured: false,
  },
  {
    id: 'shoprite',
    name: 'Shoprite Bursary',
    provider: 'Shoprite Group of Companies',
    type: 'corporate',
    value: 'Up to R60,000/year',
    fields: ['commerce', 'logistics', 'it', 'finance'],
    provinces: ['all'],
    deadline: 'October – November',
    deadlineMonth: 10,
    description: 'Shoprite bursaries support students in commerce, logistics, supply chain, and IT — with potential employment in South Africa\'s largest retailer after graduation.',
    requirements: [
      'South African citizen',
      '60%+ in matric',
      'Studying commerce, logistics, or IT',
      'Demonstrated financial need',
    ],
    applyUrl: 'https://www.shoprite.co.za/about-shoprite/careers/bursaries',
    funded: 'Tuition + book allowance',
    renewable: false,
    featured: false,
  },
];

const FIELD_OPTIONS = [
  { value: 'all', label: 'All Fields' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'science', label: 'Natural Sciences' },
  { value: 'it', label: 'Information Technology' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'accounting', label: 'Accounting' },
  { value: 'commerce', label: 'Commerce & Business' },
  { value: 'education', label: 'Education & Teaching' },
  { value: 'law', label: 'Law' },
  { value: 'medicine', label: 'Medicine & Health' },
  { value: 'actuarial', label: 'Actuarial Science' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'environmental', label: 'Environmental Science' },
  { value: 'logistics', label: 'Logistics & Supply Chain' },
  { value: 'research', label: 'Research' },
  { value: 'public-admin', label: 'Public Administration' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'food-science', label: 'Food Science' },
];

const TYPE_CONFIG = {
  government: { label: 'Government', color: 'bg-green-100 text-green-800', dot: 'bg-green-500', badge: 'bg-green-600' },
  corporate: { label: 'Corporate', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', badge: 'bg-blue-600' },
  provincial: { label: 'Provincial (KZN)', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500', badge: 'bg-amber-600' },
};

// ─── Bursary Detail Modal ──────────────────────────────────────────────────────

const BursaryModal = ({ bursary, onClose }) => {
  const type = TYPE_CONFIG[bursary.type];

  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Bursary details: ${bursary.name}`}
      >
        {/* Header */}
        <div className="bg-primary-dark p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          >
            <FaTimes />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full text-white ${type.badge}`}>
              {type.label}
            </span>
            {bursary.featured && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent-neon text-primary-dark">
                KZN Priority
              </span>
            )}
          </div>

          <h2 className="text-xl font-heading font-bold text-white leading-snug pr-10">{bursary.name}</h2>
          <p className="text-white/70 text-sm mt-1">{bursary.provider}</p>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <FaMoneyBillWave className="text-accent-neon text-xs" />
              {bursary.value}
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <FaCalendarAlt className="text-accent-neon text-xs" />
              Deadline: {bursary.deadline}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-neutral-600 text-sm leading-relaxed">{bursary.description}</p>

          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">What's Funded</p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-800 flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
              {bursary.funded}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Requirements</p>
            <ul className="space-y-2">
              {bursary.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <FaCheckCircle className="text-primary mt-0.5 flex-shrink-0 text-xs" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-500 bg-neutral-50 rounded-xl p-4">
            <FaCheckCircle className={`${bursary.renewable ? 'text-green-600' : 'text-neutral-400'}`} />
            {bursary.renewable ? 'Renewable — can be renewed each year with good academic performance' : 'Once-off — not automatically renewable'}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={bursary.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
            >
              Apply Now
              <FaExternalLinkAlt className="text-xs" />
            </a>
            <Link
              to="/university-applications"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all"
            >
              <FaUniversity className="text-xs" />
              Find Universities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Bursary Card ──────────────────────────────────────────────────────────────

const BursaryCard = ({ bursary, onOpen }) => {
  const type = TYPE_CONFIG[bursary.type];

  return (
    <div
      className="bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
      onClick={() => onOpen(bursary)}
    >
      {/* Top accent */}
      <div className={`h-1 ${type.badge}`} />

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-neutral-800 text-sm leading-snug line-clamp-2">
              {bursary.name}
            </h3>
            <p className="text-neutral-400 text-xs mt-0.5 flex items-center gap-1">
              <FaBuilding className="text-[10px]" />
              {bursary.provider}
            </p>
          </div>
          {bursary.featured && (
            <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              KZN
            </span>
          )}
        </div>

        <p className="text-neutral-500 text-xs leading-relaxed line-clamp-3">{bursary.description}</p>

        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <FaMoneyBillWave className="text-primary text-[10px]" />
              <span className="font-semibold">{bursary.value}</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${type.color}`}>
              {type.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <FaCalendarAlt className="text-[10px]" />
            Deadline: {bursary.deadline}
          </div>
        </div>

        <button
          className="w-full mt-1 py-2 bg-primary/8 hover:bg-primary text-primary hover:text-white rounded-xl text-xs font-semibold transition-all duration-200 border border-primary/20 hover:border-primary"
          onClick={(e) => { e.stopPropagation(); onOpen(bursary); }}
        >
          View Details & Apply
        </button>
      </div>
    </div>
  );
};

// ─── Filter Sidebar ────────────────────────────────────────────────────────────

const FilterSidebar = ({ filters, onChange, resultCount }) => {
  const hasFilters = filters.type !== 'all' || filters.field !== 'all' || filters.kznOnly;

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFilter className="text-primary text-sm" />
          <span className="font-heading font-bold text-neutral-800 text-sm">Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={() => onChange({ type: 'all', field: 'all', kznOnly: false, search: filters.search })}
            className="text-xs text-primary font-semibold hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <p className="text-xs text-neutral-400 -mt-2">
        {resultCount} bursary{resultCount !== 1 ? 'ies' : 'y'} found
      </p>

      {/* KZN filter */}
      <button
        onClick={() => onChange({ ...filters, kznOnly: !filters.kznOnly })}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          filters.kznOnly
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
        }`}
      >
        <FaMapMarkerAlt className="text-xs flex-shrink-0" />
        KwaZulu-Natal Only
      </button>

      {/* Type */}
      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Bursary Type</p>
        <div className="flex flex-col gap-1">
          {[
            { value: 'all', label: 'All Types' },
            { value: 'government', label: 'Government' },
            { value: 'corporate', label: 'Corporate' },
            { value: 'provincial', label: 'Provincial' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange({ ...filters, type: value })}
              className={`text-left text-sm px-3 py-2 rounded-xl font-medium transition-colors ${
                filters.type === value
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Field */}
      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Field of Study</p>
        <select
          value={filters.field}
          onChange={(e) => onChange({ ...filters, field: e.target.value })}
          className="w-full text-sm border border-neutral-200 rounded-xl px-3 py-2 text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          {FIELD_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const BursaryFinder = () => {
  const [filters, setFilters] = useState({ type: 'all', field: 'all', kznOnly: false, search: '' });
  const [selected, setSelected] = useState(null);
  const [showTip, setShowTip] = useState(true);

  const filtered = useMemo(() => {
    let result = BURSARIES;

    if (filters.kznOnly) {
      result = result.filter((b) => b.provinces.includes('KwaZulu-Natal') || b.provinces.includes('all'));
    }
    if (filters.type !== 'all') {
      result = result.filter((b) => b.type === filters.type);
    }
    if (filters.field !== 'all') {
      result = result.filter((b) => b.fields.includes('all') || b.fields.includes(filters.field));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((b) =>
        b.name.toLowerCase().includes(q) ||
        b.provider.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [filters]);

  const stats = useMemo(() => ({
    total: BURSARIES.length,
    kzn: BURSARIES.filter((b) => b.provinces.includes('KwaZulu-Natal')).length,
    government: BURSARIES.filter((b) => b.type === 'government').length,
    corporate: BURSARIES.filter((b) => b.type === 'corporate').length,
  }), []);

  return (
    <>
      <SEO
        title="Bursary & Scholarship Finder | Harding Secondary School"
        description="Find bursaries and scholarships available to KZN and Harding-area students. Search by field of study, bursary type, and more."
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
          <div className="absolute inset-0 bg-primary-dark/87" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaGraduationCap className="text-xs" />
              Student Portal — Bursary Finder
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Bursary &amp; Scholarship Finder
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Discover funding opportunities available to KZN and Harding-area students — from government bursaries to corporate scholarships.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { label: 'Bursaries Listed', value: stats.total },
                { label: 'Government Funded', value: stats.government },
                { label: 'Corporate Sponsors', value: stats.corporate },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-heading font-bold text-accent-neon">{value}</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main */}
        <div className="bg-neutral-50 min-h-screen">
          <div className="container-custom py-10 md:py-16">

            {/* Tip Banner */}
            {showTip && (
              <AnimateOnScroll animation="fade">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
                  <FaLightbulb className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-800">Pro Tip for Harding Students</p>
                    <p className="text-sm text-amber-700 mt-0.5">
                      Start with NSFAS if your household income is under R350,000/year — it covers the most costs. KZN provincial bursaries give preference to rural learners from areas like Harding. Apply to multiple bursaries at once since deadlines often fall in Aug–Nov.
                    </p>
                  </div>
                  <button onClick={() => setShowTip(false)} className="text-amber-400 hover:text-amber-600 flex-shrink-0">
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              </AnimateOnScroll>
            )}

            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* Sidebar */}
              <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-[120px]">
                <FilterSidebar filters={filters} onChange={setFilters} resultCount={filtered.length} />

                {/* NSFAS callout */}
                <div className="mt-4 bg-primary/5 border border-primary/20 rounded-2xl p-4">
                  <p className="text-xs font-bold text-primary mb-1">Apply for NSFAS First</p>
                  <p className="text-xs text-neutral-500 mb-3">
                    NSFAS is the most comprehensive bursary available to qualifying students. Open applications in Nov–Jan each year.
                  </p>
                  <a
                    href="https://www.nsfas.org.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Visit NSFAS <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>

                {/* Uni link */}
                <div className="mt-4 bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-bold text-neutral-700 mb-1">Track University Applications</p>
                  <p className="text-xs text-neutral-500 mb-3">Use our University Applications tracker to manage your applications alongside your bursary search.</p>
                  <Link
                    to="/university-applications"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Open Tracker <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </aside>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-5">

                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search bursaries by name, provider, or keyword..."
                    value={filters.search}
                    onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                    className="w-full pl-10 pr-10 py-3.5 bg-white border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
                  />
                  {filters.search && (
                    <button
                      onClick={() => setFilters((f) => ({ ...f, search: '' }))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                {/* Featured */}
                {!filters.search && filters.type === 'all' && filters.field === 'all' && (
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                      Recommended for Harding / KZN Students
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {BURSARIES.filter((b) => b.featured).map((b) => (
                        <BursaryCard key={b.id} bursary={b} onOpen={setSelected} />
                      ))}
                    </div>
                    <div className="border-t border-neutral-200 mb-6" />
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">All Bursaries</p>
                  </div>
                )}

                {/* Grid */}
                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <FaGraduationCap className="text-4xl text-neutral-300 mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-neutral-700 mb-2">No bursaries found</h3>
                    <p className="text-neutral-400 text-sm">Try adjusting your filters or search terms.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {(filters.search || filters.type !== 'all' || filters.field !== 'all' || filters.kznOnly
                      ? filtered
                      : BURSARIES.filter((b) => !b.featured)
                    ).map((b) => (
                      <BursaryCard key={b.id} bursary={b} onOpen={setSelected} />
                    ))}
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 text-sm text-neutral-600">
                  <p className="font-semibold text-primary mb-1">Disclaimer</p>
                  <p>
                    Bursary information is updated regularly but deadlines and amounts may change. Always verify directly on the funder's official website before applying. For assistance, speak to your school's career guidance counsellor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selected && <BursaryModal bursary={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default BursaryFinder;
