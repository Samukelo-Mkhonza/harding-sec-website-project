import {
  FaComments, FaFlask, FaTheaterMasks, FaMusic, FaSeedling, FaCamera,
  FaChess, FaFirstAid, FaBullseye, FaBook, FaHospital, FaArrowRight
} from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import CounterAnimation from '../components/CounterAnimation';
import { ACTIVITY_IMAGES, HERO_IMAGES, PLACEHOLDER_IMAGES } from '../utils/imageConstants';

const ACTIVITIES = [
  {
    title: 'Sports Programs',
    image: ACTIVITY_IMAGES.sports,
    description: 'Soccer, rugby, netball, athletics, and more. Our sports programs develop teamwork, discipline, and healthy competition.',
    link: '#sports',
  },
  {
    title: 'Cultural Activities',
    image: ACTIVITY_IMAGES.cultural,
    description: 'Drama, music, dance, and debate societies that nurture creativity and self-expression.',
    link: '#clubs',
  },
  {
    title: 'Academic Clubs',
    image: ACTIVITY_IMAGES.academicClubs,
    description: 'Science club, mathematics olympiad, computer club, and reading clubs for academic enrichment.',
    link: '#clubs',
  },
];

const CLUBS = [
  { name: 'Debate Society', Icon: FaComments },
  { name: 'Science Club', Icon: FaFlask },
  { name: 'Drama Club', Icon: FaTheaterMasks },
  { name: 'Music Society', Icon: FaMusic },
  { name: 'Environmental Club', Icon: FaSeedling },
  { name: 'Photography Club', Icon: FaCamera },
  { name: 'Chess Club', Icon: FaChess },
  { name: 'First Aid Club', Icon: FaFirstAid },
];

const EVENTS = [
  { month: 'MAR', day: '15', title: 'Annual Sports Day', description: 'A day of athletic competition and school team spirit.' },
  { month: 'MAY', day: '20', title: 'Cultural Festival', description: 'Celebrating diversity through music, dance, and food.' },
  { month: 'AUG', day: '10', title: 'Science Fair', description: 'Students showcase innovative and creative science projects.' },
  { month: 'OCT', day: '25', title: 'Awards Ceremony', description: 'Recognizing academic and extracurricular excellence.' },
];

const SUPPORT_SERVICES = [
  {
    Icon: FaBullseye,
    title: 'Counseling Services',
    desc: "Professional guidance counselors available to support learners' emotional well-being and academic planning.",
  },
  {
    Icon: FaBook,
    title: 'Peer Tutoring',
    desc: 'Senior students mentor and tutor junior students, fostering a supportive learning community.',
  },
  {
    Icon: FaHospital,
    title: 'Health & Wellness',
    desc: 'On-site health services and wellness programs promoting physical and mental health.',
  },
];

const StudentLife = () => {
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGES.default;
  };

  return (
    <>
      <SEO {...SEOConfigs.studentLife} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Page Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden">
          <img
            src={ACTIVITY_IMAGES.sports}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Beyond the Classroom</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              Student Life
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white/90">
              Building character, friendships, and memories that last a lifetime
            </p>
          </div>
        </section>

        {/* Activities Overview — image-pillar cards */}
        <section id="sports" className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">School Community</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">
                  A Vibrant School Community
                </h2>
                <p className="text-neutral-500 leading-relaxed max-w-2xl">
                  At Harding Secondary School, we believe in developing well-rounded individuals.
                  Our diverse range of extracurricular activities ensures every learner finds their passion
                  and develops skills beyond academics.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ACTIVITIES.map((activity, index) => (
                <AnimateOnScroll key={activity.title} animation="slide-up" delay={index * 120}>
                  <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 group-hover:from-primary-dark/90 group-hover:via-primary-dark/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                      <p className="text-white/80 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                        {activity.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent-neon text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Explore <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Clubs & Societies */}
        <section id="clubs" className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Get Involved</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">
                  Clubs & Societies
                </h2>
                <p className="text-neutral-500 max-w-xl mx-auto">
                  Join our vibrant clubs and societies to explore your interests and develop new skills.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {CLUBS.map((club, index) => (
                <AnimateOnScroll key={club.name} animation="zoom-in" delay={index * 60}>
                  <div className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-neutral-200 hover:border-primary hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                      <club.Icon className="text-xl text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="text-sm font-semibold text-neutral-700 group-hover:text-primary transition-colors duration-200">
                      {club.name}
                    </h4>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Annual Events */}
        <section id="events" className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Calendar</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                  Annual Events
                </h2>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {EVENTS.map((event, index) => (
                <AnimateOnScroll key={event.title} animation="slide-up" delay={index * 100}>
                  <div className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="bg-primary-dark text-white text-center p-5">
                      <div className="text-xs font-semibold tracking-widest uppercase text-white/70 mb-1">{event.month}</div>
                      <div className="text-4xl font-bold">{event.day}</div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-primary-dark mb-2">{event.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Student Support */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">We're Here for You</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                  Student Support Services
                </h2>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUPPORT_SERVICES.map((service, index) => (
                <AnimateOnScroll key={service.title} animation="slide-up" delay={index * 100}>
                  <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-b-4 border-transparent hover:border-primary">
                    <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center mb-5 transition-colors duration-300">
                      <service.Icon className="text-2xl text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-dark mb-3">{service.title}</h3>
                    <p className="text-neutral-500 leading-relaxed text-sm">{service.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Student Leadership — image bg */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img
            src={HERO_IMAGES.graduation}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom text-center text-white">
            <AnimateOnScroll animation="zoom-in">
              <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Leadership</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold !text-white mb-4">
                Student Leadership
              </h2>
              <p className="text-white/85 mb-14 max-w-2xl mx-auto">
                Develop leadership skills through our Student Representative Council,
                prefect system, and various leadership programs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-xl mx-auto">
                {[
                  { end: 25, suffix: '', label: 'Prefects' },
                  { end: 15, suffix: '', label: 'SRC Members' },
                  { end: 30, suffix: '+', label: 'Club Leaders' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl md:text-5xl font-bold !text-white mb-2">
                      <CounterAnimation end={stat.end} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/80 text-sm uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
};

export default StudentLife;
