import { useParams, Link, Navigate } from 'react-router-dom';
import {
  FaComments, FaFlask, FaTheaterMasks, FaMusic, FaSeedling, FaCamera,
  FaChess, FaFirstAid, FaArrowLeft, FaCalendarAlt, FaUserFriends,
  FaCheckCircle, FaChalkboardTeacher,
} from 'react-icons/fa';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';

const CLUBS = {
  'debate-society': {
    name: 'Debate Society',
    tagline: 'Sharpen Your Mind, Amplify Your Voice',
    Icon: FaComments,
    heroImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=80&fit=crop',
    description:
      'The Harding Secondary Debate Society is where critical thinkers are born. We train students in argumentation, research, public speaking, and persuasive reasoning — skills that serve them for life.',
    about:
      'Founded over two decades ago, our Debate Society has produced some of the most articulate and confident speakers in the Ugu District. Members compete in inter-school, district, and provincial tournaments while sharpening analytical and communication skills.',
    activities: [
      { title: 'Weekly Debates', desc: 'Structured practice sessions covering topical local and global issues.' },
      { title: 'Public Speaking', desc: 'Training in oratory, body language, and confident presentation.' },
      { title: 'Research Skills', desc: 'Learning to source, verify, and present evidence-based arguments.' },
      { title: 'Tournaments', desc: 'Competing in inter-school, district, and provincial debate championships.' },
    ],
    meetings: 'Every Tuesday & Thursday, 14:00 – 15:30 | Room 12B',
    teacher: 'Mrs. N. Mthembu',
    achievement: 'District Debate Champions 2023',
    stats: [
      { end: 28, suffix: '', label: 'Members' },
      { end: 5, suffix: '+', label: 'Tournaments / Year' },
      { end: 3, suffix: '', label: 'Trophies Won' },
    ],
  },
  'science-club': {
    name: 'Science Club',
    tagline: 'Explore, Experiment, Discover',
    Icon: FaFlask,
    heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&q=80&fit=crop',
    description:
      'The Harding Secondary Science Club ignites curiosity and fosters a love for scientific inquiry. We go beyond the textbook through hands-on experiments, STEM challenges, and real-world research.',
    about:
      'Our Science Club gives budding scientists the freedom to explore topics from chemistry and biology to physics and environmental science. We participate in the national Science Expo and collaborate with local universities on projects.',
    activities: [
      { title: 'Lab Experiments', desc: 'Hands-on experiments exploring chemistry, biology, and physics.' },
      { title: 'Science Expo', desc: 'Annual research projects submitted to the district and national Science Expo.' },
      { title: 'STEM Challenges', desc: 'Engineering challenges, robotics introductions, and coding basics.' },
      { title: 'Field Trips', desc: 'Visits to science museums, nature reserves, and university labs.' },
    ],
    meetings: 'Every Wednesday, 13:30 – 15:00 | Science Lab (Block C)',
    teacher: 'Mr. S. Dlamini',
    achievement: 'Best Project Award – Provincial Science Expo 2023',
    stats: [
      { end: 34, suffix: '', label: 'Members' },
      { end: 12, suffix: '+', label: 'Projects / Year' },
      { end: 2, suffix: '', label: 'Expo Awards' },
    ],
  },
  'drama-club': {
    name: 'Drama Club',
    tagline: 'Live the Story, Own the Stage',
    Icon: FaTheaterMasks,
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80&fit=crop',
    description:
      'The Harding Secondary Drama Club is a creative sanctuary where students discover confidence, empathy, and artistic expression through theatre. From Shakespeare to contemporary South African plays, we bring stories to life.',
    about:
      'Our Drama Club produces at least two major performances per year and actively participates in the KZN Schools Drama Festival. Members develop stagecraft, scriptwriting, set design, and collaborative teamwork in a supportive environment.',
    activities: [
      { title: 'Rehearsals', desc: 'Regular rehearsals for termly and year-end productions.' },
      { title: 'Workshops', desc: 'Improvisation, voice projection, and character development workshops.' },
      { title: 'Drama Festival', desc: 'Annual participation in the KZN Schools Drama Festival.' },
      { title: 'Set Design', desc: 'Students learn stagecraft, props, and costume creation.' },
    ],
    meetings: 'Every Monday & Wednesday, 14:00 – 16:00 | School Hall',
    teacher: 'Ms. T. Cele',
    achievement: 'Best Ensemble Cast – KZN Drama Festival 2023',
    stats: [
      { end: 40, suffix: '', label: 'Members' },
      { end: 2, suffix: '+', label: 'Productions / Year' },
      { end: 4, suffix: '', label: 'Festival Awards' },
    ],
  },
  'music-society': {
    name: 'Music Society',
    tagline: 'Every Note Tells a Story',
    Icon: FaMusic,
    heroImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&q=80&fit=crop',
    description:
      'The Harding Secondary Music Society nurtures musical talent across all genres — from classical and choral to Afrobeats and jazz. Whether you sing, play an instrument, or simply love music, there is a place for you here.',
    about:
      'Our Music Society includes a school choir, instrumental ensemble, and a contemporary music group. We perform at school events, community functions, and enter regional and national competitions throughout the year.',
    activities: [
      { title: 'School Choir', desc: 'Mixed choir practising traditional, contemporary, and gospel music.' },
      { title: 'Instrumental Ensemble', desc: 'Group for students who play guitar, keyboard, drums, or wind instruments.' },
      { title: 'Music Competitions', desc: 'District and provincial choir and music competitions.' },
      { title: 'Concerts & Events', desc: 'Performing at school events, prize-givings, and community functions.' },
    ],
    meetings: 'Choir: Tuesdays 14:00 – 15:30 | Instruments: Thursdays 14:00 – 15:30 | Music Room',
    teacher: 'Mr. B. Ngcobo',
    achievement: '1st Place – Ugu District Choir Festival 2023',
    stats: [
      { end: 55, suffix: '', label: 'Members' },
      { end: 8, suffix: '+', label: 'Performances / Year' },
      { end: 6, suffix: '', label: 'Competition Wins' },
    ],
  },
  'environmental-club': {
    name: 'Environmental Club',
    tagline: 'Protect Our Planet, One Action at a Time',
    Icon: FaSeedling,
    heroImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80&fit=crop',
    description:
      'The Harding Secondary Environmental Club is dedicated to raising awareness and taking meaningful action on environmental issues. We empower students to become stewards of the natural world in their school, community, and beyond.',
    about:
      'From maintaining our school garden and leading recycling initiatives to campaigning on climate change, our members are committed environmental advocates. We collaborate with local conservation organisations and take part in national clean-up campaigns.',
    activities: [
      { title: 'School Garden', desc: 'Maintaining a vegetable and indigenous plant garden on campus.' },
      { title: 'Recycling Drive', desc: "Running the school's paper, plastic, and can recycling programme." },
      { title: 'Awareness Campaigns', desc: 'Earth Day events, posters, and school-wide sustainability initiatives.' },
      { title: 'Community Clean-Ups', desc: 'Regular clean-ups in partnership with local NGOs and municipalities.' },
    ],
    meetings: 'Every Friday, 13:00 – 14:30 | Biology Lab / School Garden',
    teacher: 'Mrs. P. Nzuza',
    achievement: 'Greenest School Award – Ugu District 2023',
    stats: [
      { end: 22, suffix: '', label: 'Members' },
      { end: 4, suffix: '+', label: 'Campaigns / Year' },
      { end: 1, suffix: '', label: 'District Award' },
    ],
  },
  'photography-club': {
    name: 'Photography Club',
    tagline: 'Capture the Moment, Tell the Story',
    Icon: FaCamera,
    heroImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80&fit=crop',
    description:
      'The Harding Secondary Photography Club teaches the art and craft of photography — from composition and lighting to digital editing. We document school life and explore the world through a creative lens.',
    about:
      'Our club welcomes students at every skill level, from first-time phone photographers to those working with DSLR cameras. Members build a portfolio throughout the year and exhibit their best work at our annual photography showcase.',
    activities: [
      { title: 'Photography Workshops', desc: 'Lessons in composition, lighting, and camera settings.' },
      { title: 'Event Coverage', desc: 'Members photograph sports days, cultural events, and ceremonies.' },
      { title: 'Photo Editing', desc: 'Introduction to digital editing tools and colour grading.' },
      { title: 'Annual Exhibition', desc: "Year-end showcase of members' best work for the school community." },
    ],
    meetings: 'Every Thursday, 14:00 – 15:30 | Media Room',
    teacher: 'Mr. L. Sithole',
    achievement: 'Youth Photography Award – Ugu Arts & Culture 2023',
    stats: [
      { end: 18, suffix: '', label: 'Members' },
      { end: 200, suffix: '+', label: 'Photos Exhibited' },
      { end: 1, suffix: '', label: 'External Award' },
    ],
  },
  'chess-club': {
    name: 'Chess Club',
    tagline: 'Think Ahead, Play Smart',
    Icon: FaChess,
    heroImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1600&q=80&fit=crop',
    description:
      'The Harding Secondary Chess Club develops strategic thinking, patience, and problem-solving skills. Chess is more than a game — it is a mental sport that sharpens the mind for academic and real-world challenges.',
    about:
      'Our Chess Club competes in the KZN Schools Chess League and has produced several district and regional champions. We run coaching sessions for beginners and advanced players alike, fostering a love for the game at every level.',
    activities: [
      { title: 'Training Sessions', desc: 'Structured coaching for beginners through to advanced players.' },
      { title: 'Internal Tournaments', desc: 'Monthly round-robin tournaments to rank and reward club members.' },
      { title: 'Inter-school Matches', desc: 'Regular fixtures against other schools in the Ugu District League.' },
      { title: 'Provincial Championship', desc: 'Annual KZN Schools Chess Championship participation.' },
    ],
    meetings: 'Every Monday & Wednesday, 13:30 – 15:00 | Library',
    teacher: 'Mr. D. Khumalo',
    achievement: 'District Chess Champions 2022 & 2023',
    stats: [
      { end: 20, suffix: '', label: 'Members' },
      { end: 6, suffix: '+', label: 'Matches / Term' },
      { end: 2, suffix: '', label: 'District Titles' },
    ],
  },
  'first-aid-club': {
    name: 'First Aid Club',
    tagline: 'Ready to Help, Ready to Save',
    Icon: FaFirstAid,
    heroImage: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=1600&q=80&fit=crop',
    description:
      "The Harding Secondary First Aid Club trains students in life-saving skills and emergency response. Our members are a vital part of the school's safety network — certified first aiders ready to respond at any time.",
    about:
      'Partnering with St John Ambulance and local health professionals, our First Aid Club provides certified training to every member. Trained first aiders are deployed at all school sports events and assemblies, serving as a professional junior response team.',
    activities: [
      { title: 'First Aid Training', desc: 'CPR, wound care, choking response, and emergency assessment.' },
      { title: 'Event Duty', desc: 'Providing first aid coverage at sports days and school events.' },
      { title: 'Community Outreach', desc: 'Basic first aid workshops for junior learners and parents.' },
      { title: 'Certification', desc: 'Annual St John Ambulance First Aid certification for all members.' },
    ],
    meetings: 'Every Tuesday, 14:00 – 15:30 | Sickroom / Room 5A',
    teacher: 'Mrs. Z. Maphumulo',
    achievement: 'All members St John Ambulance certified (2024)',
    stats: [
      { end: 16, suffix: '', label: 'Members' },
      { end: 16, suffix: '', label: 'Certified Aiders' },
      { end: 20, suffix: '+', label: 'Events Covered / Year' },
    ],
  },
};

const ClubPage = () => {
  const { clubSlug } = useParams();
  const club = CLUBS[clubSlug];

  if (!club) return <Navigate to="/student-life" replace />;

  const { name, tagline, Icon, heroImage, description, about, activities, meetings, teacher, achievement, stats } = club;

  return (
    <>
      <SEO
        title={`${name} – Harding Secondary School`}
        description={description}
        keywords={`${name}, Harding Secondary School, student clubs, extracurricular, school activities`}
        url={`https://hardingsecondary.edu.za/student-life/clubs/${clubSlug}`}
      />

      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 ring-2 ring-white/20">
              <Icon className="text-3xl text-white" aria-hidden="true" />
            </div>
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-3">
              Clubs & Societies
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              {name}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">{tagline}</p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-primary-dark py-10">
          <div className="container-custom">
            <div className="grid grid-cols-3 gap-4 text-center text-white">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold text-accent-neon mb-1">
                    <CounterAnimation end={s.end} suffix={s.suffix} />
                  </div>
                  <p className="text-white/75 text-xs uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll animation="slide-up">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">About</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-6">
                  About the {name}
                </h2>
                <p className="text-neutral-500 leading-relaxed mb-6">{description}</p>
                <p className="text-neutral-500 leading-relaxed">{about}</p>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slide-up" delay={120}>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-primary text-sm" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-dark text-sm mb-1">Meeting Schedule</p>
                      <p className="text-neutral-500 text-sm">{meetings}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaChalkboardTeacher className="text-primary text-sm" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-dark text-sm mb-1">Club Supervisor</p>
                      <p className="text-neutral-500 text-sm">{teacher}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUserFriends className="text-primary text-sm" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-dark text-sm mb-1">Recent Achievement</p>
                      <p className="text-neutral-500 text-sm">{achievement}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What We Do</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                  Our Activities
                </h2>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {activities.map((activity, index) => (
                <AnimateOnScroll key={activity.title} animation="slide-up" delay={index * 80}>
                  <div className="group bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:border-primary hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                      <FaCheckCircle className="text-primary group-hover:text-white text-sm transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-primary-dark mb-2">{activity.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{activity.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary-dark text-center text-white">
          <div className="container-custom">
            <AnimateOnScroll animation="zoom-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Icon className="text-2xl text-white" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold !text-white mb-4">
                Ready to Join?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Speak to your class teacher or visit the club supervisor to sign up. New members are
                welcome at the start of every term.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent-neon text-primary-dark font-bold px-8 py-3 rounded-full hover:bg-white transition-colors duration-200"
                >
                  Contact Us to Join
                </Link>
                <Link
                  to="/student-life"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-full hover:border-white hover:bg-white/10 transition-all duration-200"
                >
                  <FaArrowLeft className="text-sm" />
                  Back to Student Life
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
};

export default ClubPage;
