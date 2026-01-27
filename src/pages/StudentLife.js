// pages/StudentLife.js
import { 
  FaComments, FaFlask, FaTheaterMasks, FaMusic, FaSeedling, FaCamera, 
  FaChess, FaFirstAid, FaBullseye, FaBook, FaHospital 
} from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import { ACTIVITY_IMAGES } from '../utils/imageConstants';

const StudentLife = () => {

  const activitiesData = [
    {
      title: 'Sports Programs',
      image: ACTIVITY_IMAGES.sports,
      description: 'Soccer, rugby, netball, athletics, and more. Our sports programs develop teamwork, discipline, and healthy competition.'
    },
    {
      title: 'Cultural Activities',
      image: ACTIVITY_IMAGES.cultural,
      description: 'Drama, music, dance, and debate societies that nurture creativity and self-expression.'
    },
    {
      title: 'Academic Clubs',
      image: ACTIVITY_IMAGES.academicClubs,
      description: 'Science club, mathematics olympiad, computer club, and reading clubs for academic enrichment.'
    }
  ];

  const clubs = [
    { name: 'Debate Society', Icon: FaComments },
    { name: 'Science Club', Icon: FaFlask },
    { name: 'Drama Club', Icon: FaTheaterMasks },
    { name: 'Music Society', Icon: FaMusic },
    { name: 'Environmental Club', Icon: FaSeedling },
    { name: 'Photography Club', Icon: FaCamera },
    { name: 'Chess Club', Icon: FaChess },
    { name: 'First Aid Club', Icon: FaFirstAid }
  ];

  const events = [
    {
      month: 'MAR',
      day: '15',
      title: 'Annual Sports Day',
      description: 'A day of athletic competition and team spirit'
    },
    {
      month: 'MAY',
      day: '20',
      title: 'Cultural Festival',
      description: 'Celebrating diversity through music, dance, and food'
    },
    {
      month: 'AUG',
      day: '10',
      title: 'Science Fair',
      description: 'Students showcase innovative science projects'
    },
    {
      month: 'OCT',
      day: '25',
      title: 'Awards Ceremony',
      description: 'Recognizing academic and extracurricular excellence'
    }
  ];

  return (
    <>
      <SEO {...SEOConfigs.studentLife} />
      <div>
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-16 md:py-20 lg:py-24 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 !text-white text-shadow-strong">
              Student Life
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white text-shadow-strong">
              Beyond the classroom: Building character, friendships, and memories
            </p>
          </div>
        </section>

        {/* Activities Overview */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
              A Vibrant School Community
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-500 mb-10 md:mb-12">
              At Harding Secondary School, we believe in developing well-rounded individuals. 
              Our diverse range of extracurricular activities ensures every learner finds their passion 
              and develops skills beyond academics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {activitiesData.map((activity, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">
                      {activity.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clubs and Societies */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6 md:mb-8" style={{ color: '#0D4E25' }}>
              Clubs & Societies
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-500 mb-10 md:mb-12">
              Join our vibrant clubs and societies to explore your interests and develop new skills.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5">
              {clubs.map((club, index) => {
                const IconComponent = club.Icon;
                return (
                  <div 
                    key={index}
                    className="bg-primary-dark text-white p-6 md:p-8 rounded-xl text-center transition-all duration-300 cursor-pointer hover:bg-primary hover:scale-105"
                  >
                    <div className="mb-4">
                      <IconComponent className="text-3xl md:text-4xl mx-auto !text-white" />
                    </div>
                    <h4 className="text-sm md:text-base lg:text-lg font-medium !text-white">{club.name}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Annual Events */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12 text-center">
              Annual Events Calendar
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              {events.map((event, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="text-white p-5 md:p-6 rounded-lg min-w-[100px] md:min-w-[120px] text-center flex-shrink-0" style={{ backgroundColor: '#0D4E25' }}>
                    <div className="text-xs md:text-sm mb-1">{event.month}</div>
                    <div className="text-2xl md:text-3xl font-bold">{event.day}</div>
                  </div>
                  <div className="bg-neutral-50 p-6 md:p-8 rounded-xl flex-1 w-full">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-primary-dark">
                      {event.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Support */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12">
              Student Support Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-md">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-5 md:mb-6" style={{ backgroundColor: '#0D4E25' }}>
                  <FaBullseye className="text-2xl md:text-3xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">
                  Counseling Services
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  Professional guidance counselors available to support students' emotional 
                  well-being and academic planning.
                </p>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-xl shadow-md">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-5 md:mb-6" style={{ backgroundColor: '#0D4E25' }}>
                  <FaBook className="text-2xl md:text-3xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">
                  Peer Tutoring
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  Senior students mentor and tutor junior students, fostering a 
                  supportive learning community.
                </p>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-xl shadow-md">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-5 md:mb-6" style={{ backgroundColor: '#0D4E25' }}>
                  <FaHospital className="text-2xl md:text-3xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary-dark">
                  Health & Wellness
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  On-site health services and wellness programs promoting physical 
                  and mental health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Opportunities */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-primary-dark text-white p-8 md:p-12 lg:p-16 rounded-xl text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-5 md:mb-6 !text-white">
                Student Leadership
              </h2>
              <p className="text-base md:text-lg lg:text-xl mb-10 md:mb-12 max-w-3xl mx-auto !text-white">
                Develop leadership skills through our Student Representative Council, 
                prefect system, and various leadership programs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-3">25</div>
                  <p className="text-base md:text-lg">Prefects</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-3">15</div>
                  <p className="text-base md:text-lg">SRC Members</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-3">30+</div>
                  <p className="text-base md:text-lg">Club Leaders</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StudentLife;