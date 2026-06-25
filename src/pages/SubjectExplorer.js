import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaBook, FaSearch, FaTimes, FaArrowRight, FaUniversity,
  FaBriefcase, FaLightbulb, FaChevronRight,
  FaGraduationCap, FaCalculator, FaFlask, FaLeaf, FaGlobe,
  FaLandmark, FaHeartbeat, FaCode, FaPalette, FaMoneyBillWave,
  FaBalanceScale, FaChalkboardTeacher, FaHardHat, FaTractor,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Data ──────────────────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    stream: 'Mathematics',
    color: '#0D4E25',
    Icon: FaCalculator,
    apsWeight: 'High (×2 in APS calculations)',
    description: 'Pure Mathematics develops logical thinking, problem-solving, and abstract reasoning. It is the single most valuable subject for access to the widest range of university degrees in South Africa and globally. Students who pass Maths with 60%+ can study almost any field.',
    careers: [
      { title: 'Civil / Structural Engineer', sector: 'Engineering', salary: 'R450k – R1.1M/year', Icon: FaHardHat },
      { title: 'Chartered Accountant (CA)', sector: 'Finance', salary: 'R600k – R1.5M/year', Icon: FaMoneyBillWave },
      { title: 'Actuary', sector: 'Finance & Insurance', salary: 'R700k – R2M/year', Icon: FaCalculator },
      { title: 'Data Scientist', sector: 'Technology', salary: 'R400k – R1M/year', Icon: FaCode },
      { title: 'Architect', sector: 'Design & Construction', salary: 'R380k – R850k/year', Icon: FaLandmark },
      { title: 'Pilot', sector: 'Aviation', salary: 'R450k – R1.2M/year', Icon: FaGlobe },
    ],
    degrees: ['BSc Engineering (all fields)', 'BCom Accounting / Finance', 'BSc Mathematics & Statistics', 'BSc Computer Science', 'BSc Actuarial Science', 'BArch Architecture', 'BSc Physics'],
    apsNote: '60%+ opens most science and commerce degrees. 70%+ qualifies for bursaries.',
    tip: 'If you struggle with Maths, extra practice with past papers is the most effective solution. Attend every extra class offered.',
    universities: ['UCT', 'Wits', 'Stellenbosch', 'UKZN', 'UP', 'UJ', 'DUT', 'MUT'],
  },
  {
    id: 'physical-sciences',
    name: 'Physical Sciences',
    stream: 'Sciences',
    color: '#1565C0',
    Icon: FaFlask,
    apsWeight: 'High (required for engineering and medicine)',
    description: 'Physical Sciences (Physics + Chemistry) unlocks engineering, medicine, and research careers. It is a compulsory subject for most engineering degrees and highly recommended for medicine. Students who love how things work and enjoy experiments thrive in this subject.',
    careers: [
      { title: 'Mechanical Engineer', sector: 'Engineering', salary: 'R400k – R900k/year', Icon: FaHardHat },
      { title: 'Chemical Engineer', sector: 'Engineering', salary: 'R450k – R1M/year', Icon: FaFlask },
      { title: 'Medical Doctor', sector: 'Health Sciences', salary: 'R700k – R2.5M/year', Icon: FaHeartbeat },
      { title: 'Pharmacist', sector: 'Health Sciences', salary: 'R350k – R750k/year', Icon: FaHeartbeat },
      { title: 'Geologist', sector: 'Natural Sciences', salary: 'R300k – R750k/year', Icon: FaGlobe },
      { title: 'Research Scientist', sector: 'Research', salary: 'R350k – R800k/year', Icon: FaFlask },
    ],
    degrees: ['BSc Engineering (Mechanical/Chemical/Electrical)', 'MBChB Medicine', 'BPharm Pharmacy', 'BSc Physics/Chemistry', 'BSc Geology', 'BSc Environmental Science'],
    apsNote: 'Required for engineering, medicine, and pharmacy. A pass of 60%+ is typically required.',
    tip: 'Learn all formulas first, then understand when and how to apply them. Draw diagrams for every problem — it helps enormously.',
    universities: ['UCT', 'Wits', 'Stellenbosch', 'UKZN', 'UP', 'Medunsa / SMU', 'DUT', 'UNIZULU'],
  },
  {
    id: 'life-sciences',
    name: 'Life Sciences',
    stream: 'Sciences',
    color: '#2E7D32',
    Icon: FaLeaf,
    apsWeight: 'Medium-High (required for biology and health fields)',
    description: 'Life Sciences (Biology) is the foundation for careers in medicine, nursing, veterinary science, agriculture, and environmental work. It is essential for understanding living systems and is one of the most popular subjects at Harding Secondary.',
    careers: [
      { title: 'Medical Doctor', sector: 'Health Sciences', salary: 'R700k – R2.5M/year', Icon: FaHeartbeat },
      { title: 'Nurse / Midwife', sector: 'Health Sciences', salary: 'R280k – R650k/year', Icon: FaHeartbeat },
      { title: 'Veterinarian', sector: 'Animal Sciences', salary: 'R350k – R800k/year', Icon: FaLeaf },
      { title: 'Biotechnologist', sector: 'Science & Research', salary: 'R300k – R700k/year', Icon: FaFlask },
      { title: 'Agricultural Scientist', sector: 'Agriculture', salary: 'R280k – R650k/year', Icon: FaTractor },
      { title: 'Environmental Scientist', sector: 'Environment', salary: 'R300k – R700k/year', Icon: FaLeaf },
    ],
    degrees: ['MBChB Medicine', 'BNursing', 'BVSc Veterinary Science', 'BSc Botany/Zoology', 'BSc Biotechnology', 'BSc Agriculture', 'BSc Environmental Science'],
    apsNote: 'Essential for medical and health programmes. Most nursing and agriculture degrees require Life Sciences.',
    tip: 'Use labelled diagrams as much as possible. Create a glossary of all scientific terms — definitions form a major part of exams.',
    universities: ['UCT', 'Wits', 'Stellenbosch', 'UKZN', 'UP', 'UFS', 'UNIZULU', 'Walter Sisulu'],
  },
  {
    id: 'accounting',
    name: 'Accounting',
    stream: 'Commerce',
    color: '#5D4037',
    Icon: FaMoneyBillWave,
    apsWeight: 'Medium (counts well for commerce APS)',
    description: 'Accounting teaches the language of business. Students learn how money flows through organisations — recording, analysing, and reporting financial information. It is the gateway to careers in finance, auditing, and business management.',
    careers: [
      { title: 'Chartered Accountant (CA)', sector: 'Finance', salary: 'R600k – R1.5M/year', Icon: FaMoneyBillWave },
      { title: 'Financial Manager', sector: 'Finance', salary: 'R450k – R1M/year', Icon: FaMoneyBillWave },
      { title: 'Tax Consultant', sector: 'Finance', salary: 'R380k – R800k/year', Icon: FaBalanceScale },
      { title: 'Auditor', sector: 'Finance', salary: 'R350k – R900k/year', Icon: FaMoneyBillWave },
      { title: 'Management Accountant', sector: 'Commerce', salary: 'R350k – R750k/year', Icon: FaBriefcase },
      { title: 'Bank Manager', sector: 'Banking', salary: 'R400k – R900k/year', Icon: FaMoneyBillWave },
    ],
    degrees: ['BCom Accounting', 'BCom Finance', 'BCom Internal Auditing', 'BAcc (towards CA)', 'Higher Diploma in Accounting', 'BCom Financial Management'],
    apsNote: 'A strong Accounting mark strengthens any commerce application significantly.',
    tip: 'Always balance your accounts before moving on. Practice journal entries until they feel automatic — speed matters in exams.',
    universities: ['UCT', 'Wits', 'Stellenbosch', 'UKZN', 'UP', 'UJ', 'DUT', 'MUT', 'UNIZULU'],
  },
  {
    id: 'business-studies',
    name: 'Business Studies',
    stream: 'Commerce',
    color: '#BF360C',
    Icon: FaBriefcase,
    apsWeight: 'Medium',
    description: 'Business Studies introduces learners to the world of commerce — entrepreneurship, management, marketing, and finance. It develops critical thinking about how businesses operate and creates entrepreneurs and managers of the future.',
    careers: [
      { title: 'Entrepreneur', sector: 'Business', salary: 'Variable — unlimited potential', Icon: FaBriefcase },
      { title: 'Marketing Manager', sector: 'Marketing', salary: 'R380k – R900k/year', Icon: FaBriefcase },
      { title: 'Human Resources Manager', sector: 'HR', salary: 'R350k – R800k/year', Icon: FaBriefcase },
      { title: 'Operations Manager', sector: 'Business', salary: 'R400k – R950k/year', Icon: FaBriefcase },
      { title: 'Business Analyst', sector: 'Consulting', salary: 'R350k – R800k/year', Icon: FaCalculator },
      { title: 'Supply Chain Manager', sector: 'Logistics', salary: 'R380k – R850k/year', Icon: FaBriefcase },
    ],
    degrees: ['BCom Business Management', 'BCom Marketing', 'BCom Human Resources', 'BTech Business Administration', 'BAdmin', 'MBA (postgraduate)'],
    apsNote: 'Pairs well with Economics and Accounting for commerce programmes.',
    tip: 'Learn key definitions by heart — they are worth many marks. Apply concepts to real SA businesses you know for essay questions.',
    universities: ['UKZN', 'DUT', 'MUT', 'UJ', 'NWU', 'UNIZULU', 'WSU', 'UNIVEN'],
  },
  {
    id: 'economics',
    name: 'Economics',
    stream: 'Commerce',
    color: '#0277BD',
    Icon: FaMoneyBillWave,
    apsWeight: 'Medium',
    description: 'Economics is the study of how societies allocate scarce resources. It combines analysis of markets, government policy, and international trade. Graduates are highly sought after in banking, government, and international organisations.',
    careers: [
      { title: 'Economist', sector: 'Finance & Government', salary: 'R400k – R1.1M/year', Icon: FaCalculator },
      { title: 'Policy Analyst', sector: 'Government', salary: 'R380k – R850k/year', Icon: FaBalanceScale },
      { title: 'Investment Banker', sector: 'Banking', salary: 'R600k – R2M/year', Icon: FaMoneyBillWave },
      { title: 'Financial Planner', sector: 'Finance', salary: 'R350k – R800k/year', Icon: FaMoneyBillWave },
      { title: 'Research Analyst', sector: 'Research', salary: 'R300k – R750k/year', Icon: FaCalculator },
      { title: 'Development Consultant', sector: 'International Development', salary: 'R400k – R950k/year', Icon: FaGlobe },
    ],
    degrees: ['BCom Economics', 'BA Economics', 'BSc Economics', 'BCom Development Economics', 'BCom Econometrics (requires Maths)'],
    apsNote: 'Economics + Mathematics is a very powerful combination for finance degrees.',
    tip: 'Understand the circular flow model deeply — it underlies most exam questions. Draw demand and supply diagrams for every scenario.',
    universities: ['UCT', 'Wits', 'Stellenbosch', 'UKZN', 'UP', 'UJ', 'UNIZULU', 'DUT'],
  },
  {
    id: 'history',
    name: 'History',
    stream: 'Humanities',
    color: '#B71C1C',
    Icon: FaLandmark,
    apsWeight: 'Medium',
    description: 'History develops critical analysis, research skills, and the ability to construct well-argued essays. These skills are prized in law, journalism, politics, and academia. South African History also gives learners a deep understanding of our society.',
    careers: [
      { title: 'Attorney / Advocate', sector: 'Law', salary: 'R450k – R2M/year', Icon: FaBalanceScale },
      { title: 'Journalist / Editor', sector: 'Media', salary: 'R280k – R700k/year', Icon: FaBook },
      { title: 'Politician / Civil Servant', sector: 'Government', salary: 'R350k – R1.2M/year', Icon: FaLandmark },
      { title: 'Archivist / Museum Curator', sector: 'Heritage', salary: 'R250k – R600k/year', Icon: FaLandmark },
      { title: 'Diplomat', sector: 'Foreign Affairs', salary: 'R450k – R1.1M/year', Icon: FaGlobe },
      { title: 'University Lecturer', sector: 'Education', salary: 'R350k – R850k/year', Icon: FaChalkboardTeacher },
    ],
    degrees: ['BA Law / LLB', 'BA History', 'BA Politics & International Relations', 'BA Journalism', 'BA Social Work', 'MA/PhD History'],
    apsNote: 'History is a core requirement for LLB (law) at many universities.',
    tip: 'Use the SEEC method for source questions: Source, Evidence, Explanation, Context. Plan essay answers before writing.',
    universities: ['UCT', 'Wits', 'Stellenbosch', 'UKZN', 'UP', 'NWU', 'UNIZULU', 'WSU'],
  },
  {
    id: 'geography',
    name: 'Geography',
    stream: 'Humanities',
    color: '#00695C',
    Icon: FaGlobe,
    apsWeight: 'Medium',
    description: 'Geography bridges the natural sciences and social sciences. It develops spatial thinking, environmental awareness, and understanding of global systems. Skills developed are directly applicable in planning, environmental work, and development.',
    careers: [
      { title: 'Environmental Planner', sector: 'Urban Planning', salary: 'R350k – R800k/year', Icon: FaGlobe },
      { title: 'Climate Scientist', sector: 'Science & Research', salary: 'R350k – R750k/year', Icon: FaLeaf },
      { title: 'GIS Analyst', sector: 'Technology & Surveying', salary: 'R300k – R750k/year', Icon: FaGlobe },
      { title: 'Tourism Manager', sector: 'Tourism', salary: 'R280k – R650k/year', Icon: FaGlobe },
      { title: 'Disaster Risk Manager', sector: 'Government', salary: 'R300k – R700k/year', Icon: FaGlobe },
      { title: 'Development Worker', sector: 'NGO / Government', salary: 'R280k – R650k/year', Icon: FaLeaf },
    ],
    degrees: ['BSc Geography', 'BA Geography & Environmental Management', 'BSc Town & Regional Planning', 'BSc Environmental Science', 'BTech Surveying'],
    apsNote: 'Required or preferred for environmental science and planning programmes.',
    tip: 'Practise drawing and labelling diagrams every week. Learn causes, consequences, and responses for every topic.',
    universities: ['UCT', 'Wits', 'UKZN', 'UP', 'UFS', 'UNIZULU', 'WSU', 'NWU'],
  },
  {
    id: 'life-orientation',
    name: 'Life Orientation',
    stream: 'General',
    color: '#E65100',
    Icon: FaHeartbeat,
    apsWeight: 'Low (excluded from APS at some universities)',
    description: 'Life Orientation covers personal wellness, career guidance, citizenship, and physical education. While it has a lower APS weighting, it is a compulsory subject and provides essential life skills for all learners.',
    careers: [
      { title: 'Social Worker', sector: 'Social Services', salary: 'R250k – R550k/year', Icon: FaHeartbeat },
      { title: 'Counselling Psychologist', sector: 'Health', salary: 'R400k – R900k/year', Icon: FaHeartbeat },
      { title: 'Sports Coach', sector: 'Sports', salary: 'R200k – R650k/year', Icon: FaHeartbeat },
      { title: 'Youth Development Worker', sector: 'NGO', salary: 'R220k – R500k/year', Icon: FaChalkboardTeacher },
    ],
    degrees: ['BA Social Work', 'BA Psychology', 'BSc Sport Science', 'BA Education (Life Orientation)'],
    apsNote: 'Many universities exclude LO from APS calculation — check each university\'s requirements carefully.',
    tip: 'Use LO as a chance to excel. Strong performance improves your school average and your report.',
    universities: ['UKZN', 'UJ', 'NWU', 'UNIZULU', 'WSU', 'MUT', 'DUT'],
  },
  {
    id: 'information-technology',
    name: 'Information Technology',
    stream: 'Technology',
    color: '#00838F',
    Icon: FaCode,
    apsWeight: 'Medium',
    description: 'Information Technology covers programming, databases, and systems design using modern languages like Delphi and Java. It is the direct pathway into software development and the most in-demand career field globally right now.',
    careers: [
      { title: 'Software Developer', sector: 'Technology', salary: 'R400k – R1.2M/year', Icon: FaCode },
      { title: 'Database Administrator', sector: 'Technology', salary: 'R350k – R900k/year', Icon: FaCode },
      { title: 'Systems Analyst', sector: 'Technology', salary: 'R400k – R950k/year', Icon: FaCode },
      { title: 'Cybersecurity Analyst', sector: 'Technology', salary: 'R450k – R1.2M/year', Icon: FaCode },
      { title: 'IT Project Manager', sector: 'Technology', salary: 'R450k – R1M/year', Icon: FaBriefcase },
      { title: 'Cloud Architect', sector: 'Technology', salary: 'R600k – R1.5M/year', Icon: FaCode },
    ],
    degrees: ['BSc Computer Science', 'BSc Information Technology', 'BEng Computer Engineering', 'BTech IT', 'Diploma in IT'],
    apsNote: 'IT + Mathematics is a powerful combination for BSc Computer Science degrees.',
    tip: 'Build personal projects outside of school — a portfolio of code impresses universities and employers more than marks alone.',
    universities: ['Wits', 'UCT', 'UP', 'UKZN', 'UJ', 'DUT', 'TUT', 'CPUT'],
  },
  {
    id: 'english-hl',
    name: 'English Home Language',
    stream: 'Languages',
    color: '#6A1B9A',
    Icon: FaBook,
    apsWeight: 'High (required at a pass of 40% for ANY university)',
    description: 'English is the language of education, business, and global communication. It is compulsory for university admission and a high English mark significantly strengthens any application. Strong English opens doors to law, journalism, diplomacy, and all academic fields.',
    careers: [
      { title: 'Advocate / Attorney', sector: 'Law', salary: 'R450k – R2M/year', Icon: FaBalanceScale },
      { title: 'Journalist / Editor', sector: 'Media', salary: 'R280k – R700k/year', Icon: FaBook },
      { title: 'Teacher / Lecturer', sector: 'Education', salary: 'R280k – R650k/year', Icon: FaChalkboardTeacher },
      { title: 'Diplomat', sector: 'Foreign Affairs', salary: 'R450k – R1.1M/year', Icon: FaGlobe },
      { title: 'Public Relations Manager', sector: 'Communications', salary: 'R350k – R800k/year', Icon: FaBriefcase },
      { title: 'Author / Content Creator', sector: 'Creative Industries', salary: 'Variable', Icon: FaBook },
    ],
    degrees: ['BA English', 'BA Law / LLB', 'BA Journalism', 'BA Communication', 'BA Education (English)', 'BEd'],
    apsNote: 'English is required at a minimum of 40% for university entry. 70%+ in English is highly competitive.',
    tip: 'Read your set works multiple times. Practice writing timed essays — language and argument structure both matter.',
    universities: ['All 26 SA public universities'],
  },
  {
    id: 'agricultural-sciences',
    name: 'Agricultural Sciences',
    stream: 'Sciences',
    color: '#33691E',
    Icon: FaTractor,
    apsWeight: 'Medium',
    description: 'Agricultural Sciences is particularly relevant to the Harding region, which has significant farming and rural development activity. The subject covers crop production, animal husbandry, and sustainable agriculture — preparing students for a vital and growing industry.',
    careers: [
      { title: 'Agricultural Scientist', sector: 'Agriculture', salary: 'R280k – R700k/year', Icon: FaTractor },
      { title: 'Farm Manager', sector: 'Agriculture', salary: 'R260k – R650k/year', Icon: FaTractor },
      { title: 'Food Technologist', sector: 'Food Science', salary: 'R300k – R700k/year', Icon: FaLeaf },
      { title: 'Agri-Business Manager', sector: 'Business', salary: 'R350k – R800k/year', Icon: FaBriefcase },
      { title: 'Veterinary Technologist', sector: 'Animal Sciences', salary: 'R280k – R650k/year', Icon: FaLeaf },
      { title: 'Extension Officer', sector: 'Government', salary: 'R250k – R550k/year', Icon: FaTractor },
    ],
    degrees: ['BSc Agriculture', 'BSc Agri-Management', 'BTech Food Technology', 'BScAgric Animal Science', 'Diploma in Agriculture', 'BAgricAdmin'],
    apsNote: 'Agricultural Sciences opens specific agriculture bursaries from the Department of Agriculture.',
    tip: 'Agriculture has excellent government bursaries. Apply early in Grade 12 — the DAFF bursary specifically supports this subject.',
    universities: ['UKZN', 'UP', 'Stellenbosch', 'UFS', 'UNIZULU', 'Fort Hare', 'Limpopo', 'NWU'],
  },
  {
    id: 'visual-arts',
    name: 'Visual Arts',
    stream: 'Arts',
    color: '#AD1457',
    Icon: FaPalette,
    apsWeight: 'Medium',
    description: 'Visual Arts develops creativity, design thinking, and artistic technique. It is the foundation for careers in design, architecture, advertising, and the creative industries. The creative economy is one of the fastest-growing sectors in South Africa and globally.',
    careers: [
      { title: 'Graphic Designer', sector: 'Design', salary: 'R250k – R700k/year', Icon: FaPalette },
      { title: 'Architect', sector: 'Architecture', salary: 'R380k – R850k/year', Icon: FaLandmark },
      { title: 'Animator / Film Maker', sector: 'Creative Media', salary: 'R280k – R750k/year', Icon: FaPalette },
      { title: 'Fashion Designer', sector: 'Fashion', salary: 'R250k – R700k/year', Icon: FaPalette },
      { title: 'Interior Designer', sector: 'Design', salary: 'R280k – R700k/year', Icon: FaPalette },
      { title: 'Art Teacher', sector: 'Education', salary: 'R280k – R550k/year', Icon: FaChalkboardTeacher },
    ],
    degrees: ['BA Fine Arts', 'BDes Graphic Design', 'BArch', 'BA Fashion Design', 'Diploma in Graphic Design', 'BA Interior Design'],
    apsNote: 'A strong portfolio is often as important as marks for art and design programmes.',
    tip: 'Build a portfolio of your best work throughout school. Document your creative process — universities want to see thinking, not just finished pieces.',
    universities: ['UCT', 'Wits', 'Stellenbosch', 'UKZN', 'TUT', 'CPUT', 'DUT', 'UJ'],
  },
];

const STREAMS = ['All', 'Mathematics', 'Sciences', 'Commerce', 'Humanities', 'Languages', 'Technology', 'Arts', 'General'];

// ─── Subject Card ──────────────────────────────────────────────────────────────

const SubjectCard = ({ subject, onSelect, isSelected }) => (
  <button
    onClick={() => onSelect(subject)}
    className={`text-left w-full p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
      isSelected
        ? 'border-primary shadow-md'
        : 'border-neutral-100 bg-white shadow-sm hover:shadow-md hover:border-neutral-300'
    }`}
    style={isSelected ? { borderColor: subject.color, backgroundColor: subject.color + '08' } : {}}
  >
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: subject.color }}
      >
        <subject.Icon className="text-white text-sm" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-bold text-neutral-800 text-sm leading-snug">{subject.name}</p>
        <p className="text-[10px] text-neutral-400 mt-0.5">{subject.stream}</p>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">{subject.description.split('.')[0]}.</p>
      </div>
    </div>
  </button>
);

// ─── Detail Panel ──────────────────────────────────────────────────────────────

const SubjectDetail = ({ subject, onClose }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="relative p-6" style={{ backgroundColor: subject.color }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <subject.Icon className="text-white text-xl" />
          </div>
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{subject.stream}</p>
            <h2 className="text-2xl font-heading font-bold text-white">{subject.name}</h2>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-3 py-1.5 inline-flex items-center gap-1.5">
          <FaCalculator className="text-white/70 text-xs" />
          <span className="text-white/80 text-xs">APS Weight: {subject.apsWeight}</span>
        </div>
      </div>

      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Description */}
        <p className="text-neutral-600 text-sm leading-relaxed">{subject.description}</p>

        {/* Tip */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-2.5">
          <FaLightbulb className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-800 mb-0.5">Study Tip</p>
            <p className="text-xs text-amber-700 leading-relaxed">{subject.tip}</p>
          </div>
        </div>

        {/* Careers */}
        <div>
          <h3 className="font-heading font-bold text-neutral-800 text-base mb-3 flex items-center gap-2">
            <FaBriefcase className="text-sm" style={{ color: subject.color }} />
            Career Paths
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {subject.careers.map((career) => (
              <div
                key={career.title}
                className="p-3 rounded-xl border border-neutral-100 bg-neutral-50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <career.Icon className="text-xs flex-shrink-0" style={{ color: subject.color }} />
                  <p className="text-xs font-bold text-neutral-800">{career.title}</p>
                </div>
                <p className="text-[10px] text-neutral-400">{career.sector}</p>
                <p className="text-[10px] font-semibold mt-1" style={{ color: subject.color }}>{career.salary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Degrees */}
        <div>
          <h3 className="font-heading font-bold text-neutral-800 text-base mb-3 flex items-center gap-2">
            <FaGraduationCap className="text-sm" style={{ color: subject.color }} />
            University Degrees This Opens
          </h3>
          <div className="space-y-1.5">
            {subject.degrees.map((degree) => (
              <div key={degree} className="flex items-center gap-2 text-sm text-neutral-700">
                <FaChevronRight className="text-[10px] flex-shrink-0" style={{ color: subject.color }} />
                {degree}
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-neutral-50 border border-neutral-100 rounded-xl">
            <p className="text-xs font-semibold text-neutral-600 mb-0.5">APS Note</p>
            <p className="text-xs text-neutral-500">{subject.apsNote}</p>
          </div>
        </div>

        {/* Universities */}
        <div>
          <h3 className="font-heading font-bold text-neutral-800 text-base mb-3 flex items-center gap-2">
            <FaUniversity className="text-sm" style={{ color: subject.color }} />
            South African Universities
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {subject.universities.map((uni) => (
              <span
                key={uni}
                className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{ color: subject.color, borderColor: subject.color + '40', backgroundColor: subject.color + '08' }}
              >
                {uni}
              </span>
            ))}
          </div>
          <Link
            to="/university-applications"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors shadow-sm"
            style={{ backgroundColor: subject.color }}
          >
            <FaUniversity className="text-xs" />
            Browse All 26 SA Universities
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const SubjectExplorer = () => {
  const [streamFilter, setStreamFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = SUBJECTS.filter((s) => {
    const matchStream = streamFilter === 'All' || s.stream === streamFilter;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchStream && matchSearch;
  });

  const handleSelect = (subject) => {
    setSelected((prev) => prev?.id === subject.id ? null : subject);
  };

  return (
    <>
      <SEO
        title="Interactive Subject Explorer | Harding Secondary School"
        description="Explore any NSC subject and discover which careers and universities it leads to. Plan your future by understanding your subject choices at Harding Secondary."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-24 md:py-32 text-center overflow-hidden">
          <img
            src={HERO_IMAGES.students}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/87" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaBook className="text-xs" />
              Student Portal — Career Guidance
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Interactive Subject Explorer
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              Click any subject to discover the careers, university degrees, and opportunities it unlocks. Plan your future today.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { label: 'Subjects Covered', value: SUBJECTS.length },
                { label: 'Career Paths Mapped', value: SUBJECTS.reduce((a, s) => a + s.careers.length, 0) },
                { label: 'Degrees Listed', value: SUBJECTS.reduce((a, s) => a + s.degrees.length, 0) },
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
        <div className="bg-neutral-50 min-h-screen py-10 md:py-16">
          <div className="container-custom">

            {/* Intro tip */}
            <AnimateOnScroll animation="fade">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
                <FaLightbulb className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-neutral-700">
                  <strong className="text-primary">Click any subject card</strong> to explore the careers, university degrees, salary ranges, and study tips for that subject. Use this tool to make informed decisions about your subject choices.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-sm">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {STREAMS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStreamFilter(s)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      streamFilter === s ? 'bg-primary text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-start">

              {/* Subject grid */}
              <div className="flex-1 min-w-0">
                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <FaBook className="text-4xl text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500 text-sm">No subjects match your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filtered.map((subject, i) => (
                      <AnimateOnScroll key={subject.id} animation="fade" delay={i < 6 ? i * 40 : 0}>
                        <SubjectCard
                          subject={subject}
                          onSelect={handleSelect}
                          isSelected={selected?.id === subject.id}
                        />
                      </AnimateOnScroll>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail panel */}
              <div className="w-full xl:w-96 flex-shrink-0 xl:sticky xl:top-[120px] xl:max-h-[calc(100vh-136px)] xl:overflow-y-auto">
                {selected ? (
                  <AnimateOnScroll animation="slide-left">
                    <SubjectDetail subject={selected} onClose={() => setSelected(null)} />
                  </AnimateOnScroll>
                ) : (
                  <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <FaBook className="text-primary text-2xl" />
                    </div>
                    <h3 className="font-heading font-bold text-neutral-700 mb-2">Select a Subject</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Click any subject card to explore its career paths, degrees, and university options.
                    </p>
                    <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Quick Links</p>
                      <Link
                        to="/university-applications"
                        className="flex items-center justify-between gap-2 px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl text-sm font-semibold text-primary transition-colors"
                      >
                        <span className="flex items-center gap-2"><FaUniversity className="text-xs" /> University Applications</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                      <Link
                        to="/student-portal/bursaries"
                        className="flex items-center justify-between gap-2 px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl text-sm font-semibold text-primary transition-colors"
                      >
                        <span className="flex items-center gap-2"><FaGraduationCap className="text-xs" /> Find Bursaries</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                      <Link
                        to="/past-papers"
                        className="flex items-center justify-between gap-2 px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl text-sm font-semibold text-primary transition-colors"
                      >
                        <span className="flex items-center gap-2"><FaBook className="text-xs" /> Past Papers</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectExplorer;
