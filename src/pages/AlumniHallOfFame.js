import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaGraduationCap, FaMapMarkerAlt, FaSearch,
  FaQuoteLeft, FaTimes, FaArrowRight,
  FaHeart, FaStar, FaEnvelope,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Data ──────────────────────────────────────────────────────────────────────

const ALUMNI = [
  {
    id: 1,
    name: 'Dr. Nomvula Dlamini',
    initials: 'ND',
    avatarColor: '#0D4E25',
    year: '2002',
    field: 'Medicine & Health',
    role: 'General Practitioner',
    employer: 'Durban Metro Health Department',
    location: 'Durban, KwaZulu-Natal',
    quote: 'Harding Secondary gave me the discipline to pursue medicine. My Physical Sciences teacher, Mr Khumalo, worked with me after school every Friday for two years. That dedication changed my life.',
    story: 'Nomvula matriculated with 6 distinctions in 2002 and enrolled at UKZN\'s Nelson R. Mandela School of Medicine. She completed her MBChB in 2008, did her internship at King Edward VIII Hospital, and has served Durban Metro communities since 2012. She returns to Harding Secondary each year to mentor Grade 12 learners pursuing medicine.',
    achievements: ['MBChB from UKZN Medical School (2008)', 'Internship at King Edward VIII Hospital', 'Durban Metro GP of the Year — 2019', 'Annual Harding Sec mentorship visits'],
    featured: true,
    stream: 'Sciences',
  },
  {
    id: 2,
    name: 'Siyanda Mthembu',
    initials: 'SM',
    avatarColor: '#1565C0',
    year: '2007',
    field: 'Engineering',
    role: 'Electrical Engineer',
    employer: 'Eskom Transmission, KwaZulu-Natal',
    location: 'Pietermaritzburg, KwaZulu-Natal',
    quote: 'I was the first in my family to go to university. The teachers at Harding believed in me when I didn\'t believe in myself. Engineering felt impossible — they made it possible.',
    story: 'Siyanda came from a farming family in the Harding area and was the first in his family to attend university. His Mathematics teacher at Harding Secondary identified his talent and helped him apply for an Eskom bursary. He studied Electrical Engineering at UKZN Durban, graduated in 2012, and has worked on Eskom\'s KZN transmission grid ever since.',
    achievements: ['BEng (Electrical) from UKZN — First Class Honours', 'Eskom Bursary Recipient (2008–2012)', 'Professional Engineer (PrEng) registered with ECSA', 'Mentors Harding Sec learners through the Eskom bursary programme'],
    featured: true,
    stream: 'Sciences',
  },
  {
    id: 3,
    name: 'Lindiwe Cele',
    initials: 'LC',
    avatarColor: '#6A1B9A',
    year: '1998',
    field: 'Education',
    role: 'School Principal',
    employer: 'Umzimkhulu Primary School',
    location: 'Umzimkhulu, KwaZulu-Natal',
    quote: 'I became a teacher because of the educators at Harding Secondary. I wanted to give other children what my teachers gave me — belief, knowledge, and opportunity.',
    story: 'Lindiwe graduated from Harding Secondary in 1998 and applied for a Funza Lushaka teaching bursary. She studied for a B.Ed at the University of Zululand, specialising in Foundation Phase education. After teaching at various KZN schools, she was appointed principal of Umzimkhulu Primary in 2018 — one of the youngest principals in the Ugu district.',
    achievements: ['B.Ed (Foundation Phase) — University of Zululand', 'Funza Lushaka Bursary Recipient', 'KZN Ugu District Teacher of the Year — 2014', 'Appointed School Principal aged 38'],
    featured: false,
    stream: 'Humanities',
  },
  {
    id: 4,
    name: 'Advocate Thabo Zondi',
    initials: 'TZ',
    avatarColor: '#B71C1C',
    year: '2004',
    field: 'Law',
    role: 'Advocate',
    employer: 'Durban High Court Bar',
    location: 'Durban, KwaZulu-Natal',
    quote: 'History and English at Harding Secondary taught me to argue a case and back it with evidence. Those skills are exactly what I use every day in court.',
    story: 'Thabo was the debate team captain at Harding Secondary, winning the Ugu District Debate Championship in 2003. He studied BA Law at UKZN followed by an LLB, was admitted as an attorney in 2011, and completed his pupillage to become an Advocate at the Durban Bar in 2014. He now specialises in labour law and constitutional matters.',
    achievements: ['BA Law & LLB from UKZN', 'Admitted as Attorney — 2011', 'Called to the Durban Bar — 2014', 'Pro bono cases for rural KZN communities'],
    featured: false,
    stream: 'Humanities',
  },
  {
    id: 5,
    name: 'Nompumelelo Ngcobo',
    initials: 'NN',
    avatarColor: '#2E7D32',
    year: '2011',
    field: 'Nursing & Health',
    role: 'ICU Registered Nurse',
    employer: 'Addington Hospital, eThekwini',
    location: 'Durban, KwaZulu-Natal',
    quote: 'Many people said nursing was not a prestigious career. My teachers told me that a nurse who saves a life has done the most important thing in the world. I believed them.',
    story: 'Nompumelelo grew up in the Harding area and was inspired by nurses at the local clinic who treated her community. She applied for a bursary from the KZN Department of Health and studied BNursing at UKZN. After graduating in 2015, she joined Addington Hospital and specialised in Intensive Care nursing. She is currently completing her Honours degree in Critical Care Nursing.',
    achievements: ['BNursing from UKZN (2015)', 'KZN Department of Health Bursary', 'ICU Specialist Certification — 2019', 'Enrolled for Honours in Critical Care Nursing'],
    featured: false,
    stream: 'Sciences',
  },
  {
    id: 6,
    name: 'Sandile Buthelezi',
    initials: 'SB',
    avatarColor: '#E65100',
    year: '2006',
    field: 'Business & Entrepreneurship',
    role: 'Founder & CEO',
    employer: 'Harding Fresh Produce (Pty) Ltd',
    location: 'Harding, KwaZulu-Natal',
    quote: 'Business Studies at school taught me to see every problem as a business opportunity. I came back to Harding because I saw the opportunity — and the community needed what I had to offer.',
    story: 'Sandile studied BCom Business Management at DUT on a scholarship and graduated in 2010. Rather than moving to a city, he returned to Harding and established a fresh produce distribution business supplying local supermarkets, schools, and hotels. His company now employs 34 local workers and is expanding into agri-processing.',
    achievements: ['BCom Business Management — DUT', 'DTI Youth Entrepreneurship Award — 2018', 'Employs 34 people in the Harding area', 'Supplies fresh produce to 12 local institutions'],
    featured: true,
    stream: 'Commerce',
  },
  {
    id: 7,
    name: 'Zanele Mkhize',
    initials: 'ZM',
    avatarColor: '#33691E',
    year: '2013',
    field: 'Agriculture',
    role: 'Farm Manager & Agronomist',
    employer: 'KZN Department of Agriculture',
    location: 'Ixopo, KwaZulu-Natal',
    quote: 'Agricultural Sciences at Harding Secondary showed me that the land around me was full of opportunity. I wanted to help small-scale farmers in KZN improve their yields — and that\'s exactly what I do.',
    story: 'Zanele applied for a Department of Agriculture bursary in Grade 12, driven by her passion for Agricultural Sciences. She studied BSc Agriculture at UKZN Pietermaritzburg, graduating in 2017. She now works as an agricultural extension officer, helping small-scale and subsistence farmers across the Ugu and Harry Gwala districts improve their crop yields.',
    achievements: ['BSc Agriculture — UKZN Pietermaritzburg', 'DALRRD Bursary Recipient', 'Currently helping 120+ small-scale farmers in KZN', 'Completing MSc in Agronomy part-time'],
    featured: false,
    stream: 'Sciences',
  },
  {
    id: 8,
    name: 'Mr. Sibusiso Ndlovu',
    initials: 'SN',
    avatarColor: '#0D4E25',
    year: '2009',
    field: 'Education',
    role: 'Mathematics Educator',
    employer: 'Harding Secondary School',
    location: 'Harding, KwaZulu-Natal',
    quote: 'I sat in these classrooms as a student. Now I stand at the front. Giving back to the school that shaped me is the most meaningful thing I\'ve ever done.',
    story: 'Sibusiso is perhaps the proudest example of Harding Secondary\'s legacy — he matriculated here in 2009 and returned as a Mathematics teacher in 2016. He studied B.Ed Mathematics at UKZN, receiving a Funza Lushaka bursary, and chose to come back to his home school. His Mathematics pass rate for Grade 12 learners has improved every year since he joined the staff.',
    achievements: ['B.Ed Mathematics — UKZN', 'Funza Lushaka Bursary', 'Returned to teach at Harding Secondary (2016)', 'Ugu District Best New Teacher — 2018'],
    featured: false,
    stream: 'Mathematics',
  },
  {
    id: 9,
    name: 'Ayanda Shabalala',
    initials: 'AS',
    avatarColor: '#AD1457',
    year: '2015',
    field: 'Social Work',
    role: 'NGO Programme Director',
    employer: 'Ubuntu Foundation, KZN',
    location: 'Ugu District, KwaZulu-Natal',
    quote: 'The Life Orientation teacher at Harding helped me process my own struggles as a teenager. I knew then that I wanted to do that for others — to be the person young people needed.',
    story: 'Ayanda studied BA Social Work at UKZN, graduating in 2019. She founded a youth empowerment programme within the Ubuntu Foundation in 2021, working with at-risk teenagers across the Ugu and Umdoni districts. Her programme has supported over 300 young people since its launch and now partners with the KZN Department of Social Development.',
    achievements: ['BA Social Work — UKZN (2019)', 'Ubuntu Foundation Programme Director since 2021', 'Supports 300+ youth annually across Ugu district', 'SASSA Community Hero Award — 2023'],
    featured: false,
    stream: 'Humanities',
  },
  {
    id: 10,
    name: 'Lwazi Mkhwanazi',
    initials: 'LM',
    avatarColor: '#00695C',
    year: '2016',
    field: 'Information Technology',
    role: 'Senior Software Developer',
    employer: 'Takealot Group, Cape Town',
    location: 'Cape Town, Western Cape',
    quote: 'There was no IT class at Harding when I started. We had a small computer room and one teacher who pushed us. That\'s all it took — curiosity and one person who believed in the possibilities.',
    story: 'Lwazi was in the first cohort when Harding Secondary introduced Computer Applications Technology. He pursued BSc Computer Science at UKZN Westville, supported by a Vodacom bursary. He started as a junior developer at a Cape Town tech startup in 2021 and was promoted to Senior Developer at Takealot in 2023, working on e-commerce systems serving millions of South Africans.',
    achievements: ['BSc Computer Science — UKZN Westville', 'Vodacom Bursary Recipient', 'Senior Developer at Takealot — 2023', 'Open-source contributor on GitHub (500+ stars)'],
    featured: false,
    stream: 'Technology',
  },
  {
    id: 11,
    name: 'Nokwanda Msomi',
    initials: 'NM',
    avatarColor: '#37474F',
    year: '2012',
    field: 'Journalism & Media',
    role: 'Television Journalist',
    employer: 'SABC News, Durban',
    location: 'Durban, KwaZulu-Natal',
    quote: 'My English teacher at Harding told me I had a voice — and that the world needed to hear it. I\'ve been amplifying voices that aren\'t heard enough ever since.',
    story: 'Nokwanda won the Ugu District essay writing competition in Grade 11 and was encouraged by her English teacher to pursue journalism. She studied BA Journalism at DUT Durban, graduating in 2016. After working as a community journalist for two years, she joined SABC News\'s Durban bureau in 2018, where she covers stories from across KwaZulu-Natal.',
    achievements: ['BA Journalism — DUT Durban (2016)', 'SABC KZN Regional Journalist since 2018', 'Reported from 15+ KZN communities', 'SANEF Regional Journalist Award — 2022'],
    featured: false,
    stream: 'Languages',
  },
  {
    id: 12,
    name: 'Bongani Mthethwa',
    initials: 'BM',
    avatarColor: '#0277BD',
    year: '2010',
    field: 'Sport & Coaching',
    role: 'Academy Head Coach',
    employer: 'AmaZulu FC Youth Academy',
    location: 'Durban, KwaZulu-Natal',
    quote: 'Football gave me a path when I had no idea where I was going. Harding Secondary\'s soccer field was where I learned about teamwork, discipline, and leadership. I teach those same lessons now.',
    story: 'Bongani was the captain of Harding Secondary\'s soccer team that won the Ugu District Championship in 2010. He played semi-professional football while studying Sport Science at UKZN. After his playing career, he completed a UEFA coaching certificate and joined AmaZulu FC\'s youth development academy, where he now coaches the U17 squad and has developed several players now in the PSL.',
    achievements: ['BSc Sport Science — UKZN', 'Former Ugu District Soccer Captain (2010)', 'UEFA B Coaching Licence', 'AmaZulu FC U17 Head Coach since 2021'],
    featured: false,
    stream: 'General',
  },
];

const FIELDS = ['All', 'Medicine & Health', 'Engineering', 'Education', 'Law', 'Nursing & Health',
  'Business & Entrepreneurship', 'Agriculture', 'Social Work', 'Information Technology',
  'Journalism & Media', 'Sport & Coaching'];

const DECADES = ['All', '1990s', '2000s', '2010s', '2020s'];

const yearToDecade = (year) => {
  const y = parseInt(year);
  if (y < 2000) return '1990s';
  if (y < 2010) return '2000s';
  if (y < 2020) return '2010s';
  return '2020s';
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ initials, color, size = 'md' }) => {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
    xl: 'w-32 h-32 text-3xl',
  };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-heading font-bold text-white flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
    >
      {initials}
    </div>
  );
};

// ─── Alumni Detail Modal ────────────────────────────────────────────────────────

const AlumniModal = ({ alumni, onClose }) => {
  React.useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={alumni.name}
      >
        {/* Header */}
        <div className="relative p-8 rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${alumni.avatarColor}ee, ${alumni.avatarColor}99)` }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <FaTimes />
          </button>

          <div className="flex items-start gap-5">
            <Avatar initials={alumni.initials} color={alumni.avatarColor} size="xl" />
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                Class of {alumni.year}
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">{alumni.name}</h2>
              <p className="text-white/80 text-sm mt-1">{alumni.role}</p>
              <p className="text-white/60 text-sm">{alumni.employer}</p>
              <div className="flex items-center gap-1.5 mt-2 text-white/60 text-xs">
                <FaMapMarkerAlt className="text-[10px]" />
                {alumni.location}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Quote */}
          <div className="relative pl-6">
            <FaQuoteLeft className="absolute left-0 top-0 text-2xl opacity-20" style={{ color: alumni.avatarColor }} />
            <p className="text-neutral-600 text-sm leading-relaxed italic">"{alumni.quote}"</p>
          </div>

          {/* Story */}
          <div>
            <h3 className="font-heading font-bold text-neutral-800 text-base mb-2">Their Story</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">{alumni.story}</p>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-heading font-bold text-neutral-800 text-base mb-3 flex items-center gap-2">
              <FaStar style={{ color: alumni.avatarColor }} className="text-sm" />
              Achievements
            </h3>
            <ul className="space-y-2">
              {alumni.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: alumni.avatarColor }} />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Inspire button */}
          <div className="pt-4 border-t border-neutral-100 text-center">
            <p className="text-sm text-neutral-500 mb-3">
              Inspired by this story? Explore bursaries and career paths available to you right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/student-portal/bursaries"
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                <FaGraduationCap className="text-xs" />
                Find Bursaries
              </Link>
              <Link
                to="/student-portal/subjects"
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-5 py-2.5 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Explore Career Paths
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Alumni Card ───────────────────────────────────────────────────────────────

const AlumniCard = ({ alumni, onOpen }) => (
  <div
    onClick={() => onOpen(alumni)}
    className="group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
  >
    {/* Top colour bar */}
    <div className="h-1" style={{ backgroundColor: alumni.avatarColor }} />

    <div className="p-5">
      <div className="flex items-start gap-4 mb-4">
        <Avatar initials={alumni.initials} color={alumni.avatarColor} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-neutral-800 text-base leading-tight group-hover:text-primary transition-colors">
            {alumni.name}
          </h3>
          <p className="text-neutral-500 text-xs mt-0.5">{alumni.role}</p>
          <p className="text-neutral-400 text-xs truncate">{alumni.employer}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: alumni.avatarColor }}
            >
              Class of {alumni.year}
            </span>
            <span className="text-[10px] text-neutral-400 flex items-center gap-1">
              <FaMapMarkerAlt className="text-[9px]" />
              {alumni.location.split(',')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Quote snippet */}
      <div className="relative pl-4 border-l-2 mb-4" style={{ borderColor: alumni.avatarColor + '40' }}>
        <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 italic">
          "{alumni.quote}"
        </p>
      </div>

      {/* Field badge */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{alumni.field}</span>
        <span
          className="text-xs font-semibold transition-all group-hover:gap-2 flex items-center gap-1"
          style={{ color: alumni.avatarColor }}
        >
          Read story <FaArrowRight className="text-[10px]" />
        </span>
      </div>
    </div>
  </div>
);

// ─── Submit Story Banner ───────────────────────────────────────────────────────

const SubmitBanner = () => (
  <div className="bg-primary-dark rounded-2xl p-8 text-center text-white">
    <FaHeart className="text-accent-neon text-2xl mx-auto mb-3" />
    <h3 className="font-heading font-bold text-xl mb-2">Are You a Former Harding Secondary Learner?</h3>
    <p className="text-white/70 text-sm max-w-lg mx-auto mb-6">
      We would love to add your story to the Hall of Fame. Your journey — wherever it has taken you — inspires the learners sitting in those classrooms today.
    </p>
    <a
      href="mailto:info@hardingsecondary.edu.za?subject=Alumni%20Hall%20of%20Fame%20Submission"
      className="inline-flex items-center gap-2 px-6 py-3 bg-accent-neon text-primary-dark rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
    >
      <FaEnvelope />
      Submit Your Story
    </a>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

const AlumniHallOfFame = () => {
  const [search, setSearch] = useState('');
  const [field, setField] = useState('All');
  const [decade, setDecade] = useState('All');
  const [selected, setSelected] = useState(null);

  const featured = ALUMNI.filter((a) => a.featured);
  const others = ALUMNI.filter((a) => !a.featured);

  const filtered = ALUMNI.filter((a) => {
    const matchField = field === 'All' || a.field === field;
    const matchDecade = decade === 'All' || yearToDecade(a.year) === decade;
    const matchSearch = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase()) ||
      a.field.toLowerCase().includes(search.toLowerCase());
    return matchField && matchDecade && matchSearch;
  });

  const isFiltering = search || field !== 'All' || decade !== 'All';

  return (
    <>
      <SEO
        title="Old Hardingian Hall of Fame | Harding Secondary School"
        description="Meet the alumni of Harding Secondary School — doctors, engineers, teachers, entrepreneurs, and more. Discover where former learners are today and be inspired."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-40 text-center overflow-hidden">
          <img
            src={HERO_IMAGES.graduation}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/88" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Old Hardingian</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Hall of Fame
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              From the classrooms of Harding Secondary to the world. Meet the graduates who are making a difference — and discover what's possible for you.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { label: 'Featured Alumni', value: ALUMNI.length },
                { label: 'Fields Represented', value: new Set(ALUMNI.map((a) => a.field)).size },
                { label: 'Years Represented', value: '1998–2016' },
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
        <div className="bg-neutral-50 min-h-screen py-16 md:py-24">
          <div className="container-custom space-y-16">

            {/* Featured alumni */}
            {!isFiltering && (
              <AnimateOnScroll animation="fade">
                <section>
                  <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Spotlight</p>
                  <h2 className="text-2xl font-heading font-bold text-primary-dark mb-8">Notable Old Hardingians</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featured.map((alumni, i) => (
                      <AnimateOnScroll key={alumni.id} animation="slide-up" delay={i * 100}>
                        <div
                          onClick={() => setSelected(alumni)}
                          className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                          style={{ background: `linear-gradient(135deg, ${alumni.avatarColor}, ${alumni.avatarColor}99)` }}
                        >
                          <div className="p-6 pb-5">
                            <Avatar initials={alumni.initials} color="white" size="lg" />
                            <div className="mt-4">
                              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                                Class of {alumni.year}
                              </span>
                              <h3 className="text-lg font-heading font-bold text-white mt-1 leading-tight">{alumni.name}</h3>
                              <p className="text-white/75 text-xs">{alumni.role}</p>
                              <p className="text-white/55 text-xs">{alumni.employer}</p>
                            </div>
                          </div>
                          <div className="bg-black/20 px-6 py-3">
                            <p className="text-white/80 text-xs italic line-clamp-2">"{alumni.quote.split('.')[0]}."</p>
                          </div>
                          <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white/80 text-xs font-semibold flex items-center gap-1">
                              Read story <FaArrowRight className="text-[10px]" />
                            </span>
                          </div>
                        </div>
                      </AnimateOnScroll>
                    ))}
                  </div>
                </section>
              </AnimateOnScroll>
            )}

            {/* Filter + Search */}
            <AnimateOnScroll animation="fade">
              <section>
                {!isFiltering && (
                  <>
                    <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">All Alumni</p>
                    <h2 className="text-2xl font-heading font-bold text-primary-dark mb-6">The Full Hall of Fame</h2>
                  </>
                )}

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search by name, role, or field..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-white border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
                    />
                    {search && (
                      <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  {/* Field filter */}
                  <select
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="px-4 py-3 border border-neutral-200 bg-white rounded-2xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
                  >
                    {FIELDS.map((f) => <option key={f} value={f}>{f === 'All' ? 'All Fields' : f}</option>)}
                  </select>

                  {/* Decade filter */}
                  <div className="flex gap-2">
                    {DECADES.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDecade(d)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                          decade === d ? 'bg-primary text-white border-primary' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <FaGraduationCap className="text-4xl text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500 text-sm">No alumni found. Try different filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(isFiltering ? filtered : others).map((alumni, i) => (
                      <AnimateOnScroll key={alumni.id} animation="fade" delay={i < 6 ? i * 60 : 0}>
                        <AlumniCard alumni={alumni} onOpen={setSelected} />
                      </AnimateOnScroll>
                    ))}
                  </div>
                )}
              </section>
            </AnimateOnScroll>

            {/* Submit banner */}
            <AnimateOnScroll animation="fade">
              <SubmitBanner />
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {selected && <AlumniModal alumni={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default AlumniHallOfFame;
