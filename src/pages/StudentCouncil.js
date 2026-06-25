import React, { useState } from 'react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimateOnScroll from '../components/AnimateOnScroll';
import {
  FaUsers, FaLightbulb, FaCalendarAlt, FaCheckCircle,
  FaEnvelope, FaTimes, FaHeart,
  FaFlag, FaLeaf, FaBook, FaRunning,
  FaPaperPlane, FaClock,
} from 'react-icons/fa';
import { HERO_IMAGES } from '../utils/imageConstants';

// ─── Data ──────────────────────────────────────────────────────────────────────

const SUGGESTION_KEY = 'hss_src_suggestions';

const SRC_MEMBERS = [
  {
    id: 1,
    name: 'Nkosi Mthembu',
    initials: 'NM',
    color: '#0D4E25',
    role: 'Chairperson',
    grade: 'Grade 12',
    goal: 'To improve academic support resources for all learners, especially those in rural feeder areas.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Every learner at Harding deserves to reach their full potential — my job is to make sure the school hears that."',
  },
  {
    id: 2,
    name: 'Ayanda Zulu',
    initials: 'AZ',
    color: '#6A1B9A',
    role: 'Deputy Chairperson',
    grade: 'Grade 12',
    goal: 'Champion gender equality initiatives and ensure all female learners feel safe and supported at school.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"I want every girl at this school to know she belongs here and that the sky is her starting point."',
  },
  {
    id: 3,
    name: 'Siphokazi Ndaba',
    initials: 'SN',
    color: '#1565C0',
    role: 'Secretary',
    grade: 'Grade 12',
    goal: 'Improve communication between the SRC, teachers, and the wider student body through regular updates.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Transparency and communication are the foundation of trust between learners and leadership."',
  },
  {
    id: 4,
    name: 'Lungelo Buthelezi',
    initials: 'LB',
    color: '#B71C1C',
    role: 'Treasurer',
    grade: 'Grade 12',
    goal: 'Manage SRC funds responsibly and fundraise for school projects that directly benefit learners.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Every rand we raise must go towards something learners can see and use."',
  },
  {
    id: 5,
    name: 'Thandi Cele',
    initials: 'TC',
    color: '#E65100',
    role: 'Academic Representative',
    grade: 'Grade 11',
    goal: 'Organise peer tutoring sessions and advocate for additional resources in the library.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Learning should not stop at the classroom door — I want to create study spaces everywhere on campus."',
  },
  {
    id: 6,
    name: 'Bongani Mkhize',
    initials: 'BM',
    color: '#00695C',
    role: 'Sports Representative',
    grade: 'Grade 11',
    goal: 'Increase participation in school sports and ensure proper equipment and facilities for all teams.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Sport builds character. I want every learner to have the chance to represent Harding Secondary."',
  },
  {
    id: 7,
    name: 'Nokwanda Shabalala',
    initials: 'NS',
    color: '#AD1457',
    role: 'Arts & Culture Representative',
    grade: 'Grade 11',
    goal: 'Revive the school drama club, coordinate cultural events, and showcase learner talent throughout the year.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Culture is what makes us who we are. Our art, music, and drama deserve a proper stage."',
  },
  {
    id: 8,
    name: 'Siyabonga Dlamini',
    initials: 'SD',
    color: '#37474F',
    role: 'Environmental Representative',
    grade: 'Grade 11',
    goal: 'Lead the school\'s recycling programme and establish a vegetable garden on the school grounds.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"We borrow this earth from our children. What we do at school today teaches habits that last a lifetime."',
  },
  {
    id: 9,
    name: 'Nomvula Mthiyane',
    initials: 'NM',
    color: '#0277BD',
    role: 'Junior SRC Representative',
    grade: 'Grade 9',
    goal: 'Be the voice of younger learners (Grades 8 & 9) in school decision-making processes.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Even Grade 8 learners have important things to say. I make sure their voices are heard."',
  },
  {
    id: 10,
    name: 'Lwandle Ntuli',
    initials: 'LN',
    color: '#5D4037',
    role: 'Health & Wellness Representative',
    grade: 'Grade 12',
    goal: 'Improve access to school counselling services and run mental health awareness campaigns each term.',
    email: 'src@hardingsecondary.edu.za',
    term: '2026',
    vision: '"Academic success means nothing if a learner is struggling emotionally. Mental health matters here."',
  },
];

const CAMPAIGNS = [
  {
    id: 1,
    title: 'Peer Tutoring Network',
    icon: FaBook,
    color: '#0D4E25',
    status: 'active',
    lead: 'Thandi Cele',
    description: 'A structured peer tutoring programme connecting top-performing Grade 11 and 12 learners with juniors who need support in Mathematics, Physical Sciences, and Accounting. Sessions run Tuesdays and Thursdays 14:30–16:00.',
    progress: 65,
    milestone: '38 students enrolled so far. Target: 60 by end of Term 3.',
    since: 'Term 2, 2026',
  },
  {
    id: 2,
    title: 'Green Campus Initiative',
    icon: FaLeaf,
    color: '#33691E',
    status: 'active',
    lead: 'Siyabonga Dlamini',
    description: 'Establishing a recycling system across all 18 classrooms, setting up a vegetable garden behind the science block, and hosting a monthly "green day" to raise environmental awareness.',
    progress: 40,
    milestone: 'Recycling bins now in 7 of 18 classrooms. Garden plot cleared.',
    since: 'Term 1, 2026',
  },
  {
    id: 3,
    title: 'Mental Health Awareness Month',
    icon: FaHeart,
    color: '#AD1457',
    status: 'upcoming',
    lead: 'Lwandle Ntuli',
    description: 'A dedicated Term 3 campaign covering mental health, stress management, and healthy relationships. Includes posters, a Q&A with the school counsellor, and an anonymous suggestion box.',
    progress: 15,
    milestone: 'Posters designed. Counsellor session confirmed for Week 2, Term 3.',
    since: 'Launching Term 3, 2026',
  },
  {
    id: 4,
    title: 'Sports Equipment Drive',
    icon: FaRunning,
    color: '#1565C0',
    status: 'completed',
    lead: 'Bongani Mkhize',
    description: 'A fundraising drive in Term 1 to replace aging soccer balls, netballs, and athletics equipment. Raised R4,800 through events and donations from local businesses.',
    progress: 100,
    milestone: 'R4,800 raised. New equipment delivered in March 2026.',
    since: 'Term 1, 2026',
  },
];

const MEETINGS = [
  {
    date: '18 June 2026',
    summary: 'Reviewed the Peer Tutoring Network enrolment figures. Agreed to increase recruitment push in Grade 8–9 classes. Treasurer presented fundraising idea for Term 3 cultural event.',
    attendees: 9,
  },
  {
    date: '4 June 2026',
    summary: 'Deputy Principal attended to discuss the new school uniform policy. SRC raised concerns about the cost of blazers for families. Agreement reached to explore second-hand uniform donations.',
    attendees: 10,
  },
  {
    date: '21 May 2026',
    summary: 'Green Campus Initiative: first set of recycling bins distributed to 7 classrooms. Environmental Rep presented vegetable garden plan. Principal approved the garden plot behind the Science block.',
    attendees: 8,
  },
  {
    date: '7 May 2026',
    summary: 'Sports Rep reported successful delivery of new equipment from the Equipment Drive. Soccer team heads of department thanked the SRC. Mental Health Awareness campaign outline presented.',
    attendees: 10,
  },
];

const STATUS_CONFIG = {
  active: { label: 'Active', bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  upcoming: { label: 'Upcoming', bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  completed: { label: 'Completed', bg: 'bg-neutral-100', text: 'text-neutral-600', dot: 'bg-neutral-400' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const loadSuggestions = () => {
  try { return JSON.parse(localStorage.getItem(SUGGESTION_KEY)) || []; } catch { return []; }
};
const saveSuggestions = (data) => {
  try { localStorage.setItem(SUGGESTION_KEY, JSON.stringify(data)); } catch {}
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ initials, color, size = 'md' }) => {
  const sizes = { sm: 'w-9 h-9 text-xs', md: 'w-14 h-14 text-base', lg: 'w-20 h-20 text-xl' };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-heading font-bold text-white flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}
    >
      {initials}
    </div>
  );
};

// ─── Member Card ──────────────────────────────────────────────────────────────

const MemberCard = ({ member, onClick }) => (
  <div
    onClick={() => onClick(member)}
    className="bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer p-5"
  >
    <div className="flex items-start gap-3 mb-3">
      <Avatar initials={member.initials} color={member.color} />
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-bold text-neutral-800 text-sm leading-tight">{member.name}</h3>
        <p className="text-xs font-semibold mt-0.5" style={{ color: member.color }}>{member.role}</p>
        <p className="text-xs text-neutral-400">{member.grade} · {member.term} SRC</p>
      </div>
    </div>
    <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">{member.goal}</p>
  </div>
);

// ─── Member Modal ─────────────────────────────────────────────────────────────

const MemberModal = ({ member, onClose }) => {
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
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative p-6 rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}99)` }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <FaTimes />
          </button>
          <div className="flex items-center gap-4">
            <Avatar initials={member.initials} color="white" size="lg" />
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">{member.grade} · {member.term} SRC</p>
              <h2 className="text-xl font-heading font-bold text-white">{member.name}</h2>
              <p className="text-white/80 text-sm">{member.role}</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="italic text-neutral-600 text-sm border-l-2 pl-4" style={{ borderColor: member.color }}>
            {member.vision}
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">This Year's Goal</p>
            <p className="text-sm text-neutral-700">{member.goal}</p>
          </div>
          <a
            href={`mailto:${member.email}?subject=Message for ${member.role} — ${member.name}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: member.color }}
          >
            <FaEnvelope className="text-xs" />
            Contact {member.name.split(' ')[0]}
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Campaign Card ────────────────────────────────────────────────────────────

const CampaignCard = ({ campaign }) => {
  const status = STATUS_CONFIG[campaign.status];
  const Icon = campaign.icon;

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: campaign.color + '18' }}>
            <Icon style={{ color: campaign.color }} className="text-sm" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-neutral-800 text-sm">{campaign.title}</h3>
            <p className="text-[10px] text-neutral-400">Led by {campaign.lead} · Since {campaign.since}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      <p className="text-xs text-neutral-500 leading-relaxed mb-4">{campaign.description}</p>

      {campaign.progress < 100 && (
        <div className="mb-3">
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-neutral-500">Progress</span>
            <span className="font-bold" style={{ color: campaign.color }}>{campaign.progress}%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${campaign.progress}%`, backgroundColor: campaign.color }}
            />
          </div>
        </div>
      )}

      <div className="bg-neutral-50 rounded-xl p-3">
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">Latest Milestone</p>
        <p className="text-xs text-neutral-600">{campaign.milestone}</p>
      </div>
    </div>
  );
};

// ─── Suggestion Box ───────────────────────────────────────────────────────────

const INITIAL_FORM = { category: 'academics', message: '', anonymous: true };

const SuggestionBox = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(() => loadSuggestions().length);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.message.trim() || form.message.length < 10) return;
    const suggestions = loadSuggestions();
    suggestions.push({
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split('T')[0],
    });
    saveSuggestions(suggestions);
    setCount(suggestions.length);
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const categories = [
    { value: 'academics', label: 'Academics' },
    { value: 'sports', label: 'Sports' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'events', label: 'Events & Culture' },
    { value: 'wellbeing', label: 'Wellbeing' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <FaLightbulb className="text-primary text-sm" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-neutral-800 text-base">Suggestion Box</h3>
          <p className="text-xs text-neutral-400">{count} suggestion{count !== 1 ? 's' : ''} submitted to the SRC</p>
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
          <h4 className="font-heading font-bold text-neutral-800 mb-1">Suggestion Received!</h4>
          <p className="text-neutral-500 text-sm">The SRC will review your suggestion at the next meeting. Thank you for engaging with your student council.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Category</label>
            <div className="grid grid-cols-3 gap-1.5">
              {categories.map(({ value, label }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setForm((f) => ({ ...f, category: value }))}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors border ${
                    form.category === value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-100 hover:border-neutral-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Your Suggestion *</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Write your idea, concern, or suggestion for the SRC here..."
              rows={4}
              maxLength={500}
              required
              minLength={10}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
            <p className="text-[10px] text-neutral-400 text-right">{form.message.length}/500</p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.anonymous}
              onChange={(e) => setForm((f) => ({ ...f, anonymous: e.target.checked }))}
              className="w-4 h-4 rounded accent-primary"
            />
            <span className="text-xs text-neutral-600">Submit anonymously (name will not be recorded)</span>
          </label>

          <button
            type="submit"
            disabled={form.message.length < 10}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-primary-dark transition-colors"
          >
            <FaPaperPlane className="text-xs" />
            Submit to SRC
          </button>
        </form>
      )}
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const StudentCouncil = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState('members');
  const chair = SRC_MEMBERS[0];

  return (
    <>
      <SEO
        title="Student Representative Council (SRC) | Harding Secondary School"
        description="Meet the 2026 Student Representative Council at Harding Secondary School. Explore active campaigns, meeting highlights, and submit suggestions to your student council."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.students}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/88" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-sm font-semibold tracking-widest uppercase mb-5">
              <FaUsers className="text-xs" />
              Student Life — Governance
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Student Representative Council
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/85">
              The voice of Harding Secondary School learners. Meet the 2026 SRC — their campaigns, meetings, and how to reach them.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { label: 'SRC Members', value: SRC_MEMBERS.length },
                { label: 'Active Campaigns', value: CAMPAIGNS.filter((c) => c.status === 'active').length },
                { label: 'Meetings This Year', value: MEETINGS.length },
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
        <div className="bg-neutral-50 min-h-screen py-12 md:py-20">
          <div className="container-custom space-y-10">

            {/* Chairperson spotlight */}
            <AnimateOnScroll animation="fade">
              <div className="bg-primary-dark rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center font-heading font-bold text-2xl text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${chair.color}, #147538)` }}
                >
                  {chair.initials}
                </div>
                <div className="flex-1">
                  <p className="text-accent-neon text-xs font-bold uppercase tracking-widest mb-1">2026 SRC Chairperson</p>
                  <h2 className="text-2xl font-heading font-bold text-white mb-1">{chair.name}</h2>
                  <p className="text-white/60 text-sm mb-3">{chair.grade}</p>
                  <p className="text-white/80 text-sm italic leading-relaxed mb-4">
                    {chair.vision}
                  </p>
                  <p className="text-white/65 text-sm">{chair.goal}</p>
                </div>
                <a
                  href={`mailto:${chair.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent-neon text-primary-dark rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  <FaEnvelope className="text-xs" />
                  Contact SRC
                </a>
              </div>
            </AnimateOnScroll>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'members', label: 'SRC Members', Icon: FaUsers },
                { id: 'campaigns', label: 'Campaigns', Icon: FaFlag },
                { id: 'meetings', label: 'Meeting Minutes', Icon: FaClock },
                { id: 'suggest', label: 'Suggestion Box', Icon: FaLightbulb },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === id ? 'bg-primary text-white shadow-sm' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <Icon className="text-xs" />
                  {label}
                </button>
              ))}
            </div>

            {/* ── MEMBERS ── */}
            {activeTab === 'members' && (
              <AnimateOnScroll animation="fade">
                <div>
                  <p className="text-sm text-neutral-500 mb-6">
                    Click any member to learn more about their role, vision, and how to reach them.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SRC_MEMBERS.map((m, i) => (
                      <AnimateOnScroll key={m.id} animation="fade" delay={i < 6 ? i * 60 : 0}>
                        <MemberCard member={m} onClick={setSelectedMember} />
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── CAMPAIGNS ── */}
            {activeTab === 'campaigns' && (
              <AnimateOnScroll animation="fade">
                <div>
                  <p className="text-sm text-neutral-500 mb-6">
                    The 2026 SRC is running {CAMPAIGNS.filter((c) => c.status === 'active').length} active campaigns this year to improve school life for all learners.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {CAMPAIGNS.map((c, i) => (
                      <AnimateOnScroll key={c.id} animation="slide-up" delay={i * 80}>
                        <CampaignCard campaign={c} />
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── MEETINGS ── */}
            {activeTab === 'meetings' && (
              <AnimateOnScroll animation="fade">
                <div className="space-y-4">
                  <p className="text-sm text-neutral-500 mb-2">
                    The SRC meets every two weeks. Summaries are published here so all learners stay informed.
                  </p>
                  {MEETINGS.map((meeting, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-primary text-sm" />
                          <p className="font-heading font-bold text-neutral-800 text-sm">{meeting.date}</p>
                        </div>
                        <span className="text-[10px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                          {meeting.attendees}/10 members
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">{meeting.summary}</p>
                    </div>
                  ))}
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm text-neutral-600">
                    <p>
                      Want to raise an issue at the next SRC meeting? Use the{' '}
                      <button onClick={() => setActiveTab('suggest')} className="text-primary font-semibold underline">
                        Suggestion Box
                      </button>{' '}
                      to submit your concern. The SRC reviews all submissions before each meeting.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── SUGGESTION BOX ── */}
            {activeTab === 'suggest' && (
              <AnimateOnScroll animation="fade">
                <div className="max-w-xl mx-auto space-y-5">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                    <p className="font-semibold mb-1">How it works</p>
                    <p>Your suggestion goes directly to the SRC and is reviewed at the next meeting. You can choose to submit anonymously. The SRC will post a response in the meeting minutes.</p>
                  </div>
                  <SuggestionBox />
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </div>

      {selectedMember && <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </>
  );
};

export default StudentCouncil;
