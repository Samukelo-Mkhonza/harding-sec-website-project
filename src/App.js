import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, FaUsers, FaTrophy, FaCalendarAlt, FaEnvelope, 
  FaPhone, FaMapMarkerAlt, FaBars, FaTimes, FaChevronRight,
  FaBook, FaFlask, FaLaptopCode, FaPalette, FaRunning, FaMusic,
  FaChartLine, FaAward, FaHandshake, FaLightbulb, FaGlobe,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaClock, FaCheckCircle, FaUserGraduate, FaChalkboardTeacher,
  FaUniversity, FaBrain, FaTheaterMasks, FaBasketballBall,
  FaNewspaper, FaDownload, FaExternalLinkAlt, FaSearch,
  FaHome, FaInfoCircle, FaUserTie, FaClipboardList, FaImages,
  FaBullhorn, FaQuoteLeft, FaPlay, FaExpand, FaCompress,
  FaVolleyballBall, FaFootballBall, FaTableTennis, FaSwimmer,
  FaDumbbell, FaMicroscope, FaRobot, FaPaintBrush, FaGuitar,
  FaDrum, FaChess, FaGamepad, FaLeaf, FaHeartbeat, FaShieldAlt,
  FaFileAlt, FaPaperPlane, FaArrowRight, FaArrowLeft, FaStar
} from 'react-icons/fa';
import { 
  MdSchool, MdScience, MdComputer, MdSportsBasketball,
  MdEmail, MdLocationOn, MdPhone, MdMenu, MdClose,
  MdArrowForward, MdDashboard, MdPeople, MdEmojiEvents,
  MdCalendarToday, MdNotifications, MdLibraryBooks,
  MdAssignment, MdGroup, MdStar, MdTrendingUp
} from 'react-icons/md';
import { 
  IoMdTime, IoMdCheckmarkCircle, IoMdPeople, IoMdSchool,
  IoMdTrophy, IoMdCalendar, IoMdMail, IoMdCall, IoMdPin
} from 'react-icons/io';
import { 
  BiChevronDown, BiChevronUp, BiChevronRight, BiChevronLeft,
  BiMenu, BiX, BiSearch, BiDownload, BiLinkExternal
} from 'react-icons/bi';
import { 
  AiOutlineMenu, AiOutlineClose, AiOutlineSearch,
  AiOutlineDownload, AiOutlineLink, AiOutlineHome,
  AiOutlineInfoCircle, AiOutlineUser, AiOutlineForm,
  AiOutlinePicture, AiOutlineNotification
} from 'react-icons/ai';
import { HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineTrophy } from 'react-icons/hi';
import { RiParentLine, RiGovernmentLine, RiTeamLine } from 'react-icons/ri';
import { GiTeacher, GiGraduateCap, GiTrophyCup } from 'react-icons/gi';
import { BsCalendarEvent, BsNewspaper, BsDownload } from 'react-icons/bs';
import { FiDownload, FiExternalLink, FiSearch } from 'react-icons/fi';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('all');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Add/remove body overflow when mobile menu opens/closes
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const colors = {
    primary: '#228B22',
    secondary: '#9ACD32',
    dark: '#0F0F0F',
    gray: '#999999',
    light: '#E8E8E8',
    white: '#FFFFFF'
  };

  const navigation = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'about', label: 'About', icon: <FaInfoCircle /> },
    { id: 'academics', label: 'Academics', icon: <FaGraduationCap /> },
    { id: 'admissions', label: 'Admissions', icon: <FaClipboardList /> },
    { id: 'student-life', label: 'Student Life', icon: <FaUsers /> },
    { id: 'news', label: 'News & Events', icon: <FaNewspaper /> },
    { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope /> }
  ];

  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Header = () => (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: scrolled ? '#0F0F0F' : '#0F0F0F',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      zIndex: 10000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: window.innerWidth < 768 ? '10px 15px' : scrolled ? '10px 20px' : '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: window.innerWidth < 768 ? '60px' : '75px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: window.innerWidth < 768 ? '40px' : '50px',
            height: window.innerWidth < 768 ? '40px' : '50px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(34, 139, 34, 0.3)',
            flexShrink: 0
          }}>
            <FaGraduationCap style={{ color: colors.white, fontSize: window.innerWidth < 768 ? '20px' : '24px' }} />
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: window.innerWidth < 768 ? '18px' : '24px', 
              fontWeight: '700', 
              color: colors.white,
              letterSpacing: '-0.5px',
              fontFamily: "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}>
              Harding Secondary
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: window.innerWidth < 768 ? '10px' : '12px', 
              color: colors.secondary,
              letterSpacing: '0.5px',
              fontFamily: "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              display: window.innerWidth < 480 ? 'none' : 'block'
            }}>
              Excellence in Education
            </p>
          </div>
        </div>

        {!isMobile && (
          <nav style={{ 
            display: 'flex', 
            gap: '25px'
          }}>
            {navigation.map(nav => (
              <button
                key={nav.id}
                onClick={() => setCurrentPage(nav.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPage === nav.id ? colors.primary : colors.white,
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  padding: '5px 0',
                  fontFamily: "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                }}
                onMouseEnter={e => e.target.style.color = colors.primary}
                onMouseLeave={e => e.target.style.color = currentPage === nav.id ? colors.primary : colors.white}
              >
                {nav.label}
                {currentPage === nav.id && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: colors.primary,
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            ))}
          </nav>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: mobileMenuOpen ? 'rgba(255,255,255,0.1)' : 'none',
              border: 'none',
              color: colors.white,
              fontSize: '28px',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 10001,
              position: 'relative',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px'
            }}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && isMobile && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999997 }}>
          {/* Overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              cursor: 'pointer',
              width: '100vw',
              height: '100vh'
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: window.innerWidth < 768 ? '60px' : '75px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgb(15, 15, 15)',
            background: 'rgb(15, 15, 15)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            overflowY: 'auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
            width: '100%',
            height: `calc(100vh - ${window.innerWidth < 768 ? '60px' : '75px'})`,
            opacity: 1,
            isolation: 'isolate',
            transform: 'translateZ(0)',
            contain: 'layout style'
          }}>
            {navigation.map(nav => (
              <button
                key={nav.id}
                onClick={() => {
                  setCurrentPage(nav.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: currentPage === nav.id ? colors.primary : 'transparent',
                  border: `2px solid ${currentPage === nav.id ? colors.primary : colors.gray}`,
                  color: colors.white,
                  padding: '15px 20px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                }}
              >
                {nav.icon}
                {nav.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
      {
        title: "Welcome to Excellence",
        subtitle: "Shaping Future Leaders Since 1950",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600",
        cta: "Discover More"
      },
      {
        title: "Academic Excellence",
        subtitle: "95% Matric Pass Rate • 67% Bachelor's Pass",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600",
        cta: "View Programs"
      },
      {
        title: "Beyond the Classroom",
        subtitle: "Sports, Arts, Culture & Leadership",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600",
        cta: "Student Life"
      }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ paddingTop: '0' }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          height: '100vh',
          minHeight: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 0,
          paddingTop: window.innerWidth < 768 ? '70px' : '80px'
        }}>
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 1s ease',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(15,15,15,0.7) 0%, rgba(34,139,34,0.3) 100%)',
                zIndex: 0
              }} />
            </div>
          ))}
          
          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: colors.white,
            padding: '0 20px',
            maxWidth: '1000px',
            paddingTop: window.innerWidth < 768 ? '40px' : '0'
          }}>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '64px',
              fontWeight: '800',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              animation: 'fadeInUp 1s ease',
              lineHeight: '1.2'
            }}>
              {heroSlides[currentSlide].title}
            </h1>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : window.innerWidth < 1024 ? '20px' : '24px',
              marginBottom: '30px',
              opacity: 0.9,
              animation: 'fadeInUp 1s ease 0.2s both',
              lineHeight: '1.4'
            }}>
              {heroSlides[currentSlide].subtitle}
            </p>
            <button
              onClick={() => setCurrentPage(currentSlide === 1 ? 'academics' : currentSlide === 2 ? 'student-life' : 'about')}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                border: 'none',
                color: colors.white,
                padding: window.innerWidth < 768 ? '14px 28px' : '18px 40px',
                fontSize: window.innerWidth < 768 ? '16px' : '18px',
                fontWeight: '600',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(34, 139, 34, 0.4)',
                transition: 'all 0.3s ease',
                animation: 'fadeInUp 1s ease 0.4s both',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                position: 'relative',
                zIndex: 2
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 40px rgba(34, 139, 34, 0.5)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 30px rgba(34, 139, 34, 0.4)';
              }}
            >
              {heroSlides[currentSlide].cta}
              <FaArrowRight />
            </button>
          </div>

          {/* Slide Indicators */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 2
          }}>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: currentSlide === index ? '30px' : '10px',
                  height: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: currentSlide === index ? colors.primary : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: window.innerWidth < 768 ? '30px' : '40px'
          }}>
            {[
              { icon: <FaUserGraduate />, number: '1,252', label: 'Students', color: colors.primary },
              { icon: <FaChalkboardTeacher />, number: '41', label: 'Qualified Teachers', color: colors.secondary },
              { icon: <FaTrophy />, number: '95%', label: 'Matric Pass Rate', color: colors.primary },
              { icon: <FaUniversity />, number: '70+', label: 'Years of Excellence', color: colors.secondary }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: window.innerWidth < 768 ? '30px' : '40px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}33`;
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{
                  fontSize: window.innerWidth < 768 ? '36px' : '48px',
                  color: stat.color,
                  marginBottom: '20px'
                }}>
                  {stat.icon}
                </div>
                <h3 style={{
                  fontSize: window.innerWidth < 768 ? '36px' : '48px',
                  fontWeight: '800',
                  color: colors.white,
                  marginBottom: '10px'
                }}>
                  {stat.number}
                </h3>
                <p style={{
                  fontSize: window.innerWidth < 768 ? '16px' : '18px',
                  color: colors.gray,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          backgroundColor: colors.white
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.dark,
              lineHeight: '1.2'
            }}>
              Why Choose <span style={{ color: colors.primary }}>Harding Secondary</span>?
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {[
                {
                  icon: <FaBook />,
                  title: 'Academic Excellence',
                  description: 'Comprehensive curriculum with exceptional results across all subjects',
                  features: ['95% Pass Rate', 'Top Achievers', 'Extra Classes']
                },
                {
                  icon: <FaFlask />,
                  title: 'Modern Facilities',
                  description: 'State-of-the-art laboratories, computer centers, and learning spaces',
                  features: ['Science Labs', 'Computer Labs', 'Library']
                },
                {
                  icon: <FaUsers />,
                  title: 'Holistic Development',
                  description: 'Sports, arts, culture, and leadership programs for well-rounded growth',
                  features: ['20+ Sports Codes', 'Cultural Activities', 'Leadership Programs']
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    padding: window.innerWidth < 768 ? '30px' : '40px',
                    backgroundColor: colors.light,
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    background: `linear-gradient(135deg, ${colors.primary}22, ${colors.secondary}22)`,
                    borderRadius: '50%',
                    filter: 'blur(50px)'
                  }} />
                  
                  <div style={{
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    color: colors.primary,
                    marginBottom: '20px'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: window.innerWidth < 768 ? '20px' : '24px',
                    fontWeight: '700',
                    marginBottom: '15px',
                    color: colors.dark
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: colors.gray,
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {feature.features.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaCheckCircle style={{ color: colors.primary, fontSize: '16px', flexShrink: 0 }} />
                        <span style={{ color: colors.dark, fontSize: '14px' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest News Preview */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.light} 100%)`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              gap: '20px'
            }}>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
                fontWeight: '800',
                color: colors.dark,
                margin: 0
              }}>
                Latest <span style={{ color: colors.primary }}>News & Events</span>
              </h2>
              <button
                onClick={() => setCurrentPage('news')}
                style={{
                  background: 'none',
                  border: `2px solid ${colors.primary}`,
                  color: colors.primary,
                  padding: '12px 30px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = colors.primary;
                  e.target.style.color = colors.white;
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.primary;
                }}
              >
                View All News
                <FaArrowRight />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1200 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {[
                {
                  category: 'Academic',
                  title: '2025 Academic Year Begins Successfully',
                  excerpt: 'We welcomed over 1,200 learners back for another exciting year of learning and growth.',
                  date: 'January 15, 2025',
                  image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
                },
                {
                  category: 'Achievement',
                  title: 'Outstanding Matric Results 2024',
                  excerpt: 'Celebrating our Class of 2024 with a 95% pass rate and numerous distinctions.',
                  date: 'January 10, 2025',
                  image: 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=800'
                },
                {
                  category: 'Sports',
                  title: 'Provincial Athletics Champions',
                  excerpt: 'Our athletics team brings home gold medals from the provincial championships.',
                  date: 'December 18, 2024',
                  image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800'
                }
              ].map((news, index) => (
                <article
                  key={index}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${news.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      background: colors.primary,
                      color: colors.white,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {news.category}
                    </div>
                  </div>
                  <div style={{ padding: window.innerWidth < 768 ? '20px' : '30px' }}>
                    <h3 style={{
                      fontSize: window.innerWidth < 768 ? '18px' : '22px',
                      fontWeight: '700',
                      marginBottom: '15px',
                      color: colors.dark,
                      lineHeight: '1.3'
                    }}>
                      {news.title}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: colors.gray,
                      marginBottom: '20px',
                      lineHeight: '1.6'
                    }}>
                      {news.excerpt}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: colors.gray,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <FaCalendarAlt />
                        {news.date}
                      </span>
                      <FaArrowRight style={{ color: colors.primary }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              Begin Your Journey With Us
            </h2>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.white,
              opacity: 0.9,
              marginBottom: '40px',
              lineHeight: '1.4'
            }}>
              Join our community of learners and discover your potential at Harding Secondary School
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <button
                onClick={() => setCurrentPage('admissions')}
                style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: 'none',
                  padding: window.innerWidth < 768 ? '14px 30px' : '18px 40px',
                  fontSize: window.innerWidth < 768 ? '16px' : '18px',
                  fontWeight: '600',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={e => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Apply Now
                <FaArrowRight />
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                style={{
                  backgroundColor: 'transparent',
                  color: colors.white,
                  border: `2px solid ${colors.white}`,
                  padding: window.innerWidth < 768 ? '14px 30px' : '18px 40px',
                  fontSize: window.innerWidth < 768 ? '16px' : '18px',
                  fontWeight: '600',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = colors.white;
                  e.target.style.color = colors.primary;
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.white;
                }}
              >
                Contact Us
                <FaPhone />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const AboutPage = () => (
    <div style={{ paddingTop: '0' }}>
      {/* Hero Section */}
      <section style={{
        padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
        paddingTop: window.innerWidth < 768 ? '130px' : '180px',
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '56px',
            fontWeight: '800',
            color: colors.white,
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            About <span style={{ color: colors.primary }}>Harding Secondary</span>
          </h1>
          <p style={{
            fontSize: window.innerWidth < 768 ? '16px' : '20px',
            color: colors.gray,
            lineHeight: '1.6'
          }}>
            A legacy of excellence in education, shaping futures since 1950
          </p>
        </div>
      </section>

      {/* History Section */}
      <section style={{ 
        padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px', 
        backgroundColor: colors.white 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'repeat(2, 1fr)',
            gap: window.innerWidth < 768 ? '40px' : '60px',
            alignItems: 'center'
          }}>
            <div style={{ order: window.innerWidth < 1024 ? 2 : 1 }}>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
                fontWeight: '800',
                color: colors.dark,
                marginBottom: '30px'
              }}>
                Our <span style={{ color: colors.primary }}>Story</span>
              </h2>
              <p style={{
                fontSize: window.innerWidth < 768 ? '16px' : '18px',
                color: colors.gray,
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                Harding Secondary School stands as a beacon of educational excellence in KwaZulu-Natal. 
                As a distinguished public secondary school operating under the Ugu Education District, 
                we have been committed to nurturing young minds and building future leaders for over seven decades.
              </p>
              <p style={{
                fontSize: window.innerWidth < 768 ? '16px' : '18px',
                color: colors.gray,
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                With our current enrollment of 1,252 learners supported by 41 dedicated educators, 
                we maintain an optimal learning environment that balances academic rigor with personal attention.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 480 ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                marginTop: '40px'
              }}>
                {[
                  { icon: <FaCalendarAlt />, text: 'Founded in 1950' },
                  { icon: <FaMapMarkerAlt />, text: 'Harding, KZN' },
                  { icon: <FaUsers />, text: '1,252 Students' },
                  { icon: <FaChalkboardTeacher />, text: '41 Teachers' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '20px',
                    backgroundColor: colors.light,
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '24px', color: colors.primary }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: '16px', color: colors.dark, fontWeight: '600' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              order: window.innerWidth < 1024 ? 1 : 2,
              height: window.innerWidth < 768 ? '300px' : '500px',
              backgroundImage: 'url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }} />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{
        padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
        background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.white} 100%)`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
            gap: window.innerWidth < 768 ? '40px' : '60px'
          }}>
            <div style={{
              padding: window.innerWidth < 768 ? '40px' : '60px',
              backgroundColor: colors.white,
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              borderLeft: `5px solid ${colors.primary}`
            }}>
              <div style={{
                fontSize: window.innerWidth < 768 ? '36px' : '48px',
                color: colors.primary,
                marginBottom: '30px'
              }}>
                <FaBullhorn />
              </div>
              <h3 style={{
                fontSize: window.innerWidth < 768 ? '24px' : '32px',
                fontWeight: '700',
                color: colors.dark,
                marginBottom: '20px'
              }}>
                Our Mission
              </h3>
              <p style={{
                fontSize: window.innerWidth < 768 ? '16px' : '18px',
                color: colors.gray,
                lineHeight: '1.8'
              }}>
                To provide quality education that empowers learners with knowledge, skills, and values 
                necessary for success in the 21st century. We strive to create an inclusive learning 
                environment that nurtures academic excellence, personal growth, and social responsibility.
              </p>
            </div>
            <div style={{
              padding: window.innerWidth < 768 ? '40px' : '60px',
              backgroundColor: colors.white,
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              borderLeft: `5px solid ${colors.secondary}`
            }}>
              <div style={{
                fontSize: window.innerWidth < 768 ? '36px' : '48px',
                color: colors.secondary,
                marginBottom: '30px'
              }}>
                <FaLightbulb />
              </div>
              <h3 style={{
                fontSize: window.innerWidth < 768 ? '24px' : '32px',
                fontWeight: '700',
                color: colors.dark,
                marginBottom: '20px'
              }}>
                Our Vision
              </h3>
              <p style={{
                fontSize: window.innerWidth < 768 ? '16px' : '18px',
                color: colors.gray,
                lineHeight: '1.8'
              }}>
                To be a leading secondary school in South Africa, recognized for producing well-rounded, 
                confident, and capable individuals who contribute positively to society and excel in 
                their chosen fields of endeavor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ 
        padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px', 
        backgroundColor: colors.white 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: window.innerWidth < 768 ? '40px' : '60px',
            color: colors.dark
          }}>
            Our Core <span style={{ color: colors.primary }}>Values</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: window.innerWidth < 768 ? '30px' : '40px'
          }}>
            {[
              { icon: <FaAward />, title: 'Excellence', description: 'We pursue the highest standards in academics, sports, and character development.' },
              { icon: <FaHandshake />, title: 'Integrity', description: 'We uphold honesty, fairness, and ethical behavior in all our interactions.' },
              { icon: <FaLightbulb />, title: 'Innovation', description: 'We embrace creative thinking and modern teaching methods to enhance learning.' },
              { icon: <FaGlobe />, title: 'Community', description: 'We foster a sense of belonging and encourage active community participation.' },
              { icon: <FaUsers />, title: 'Diversity', description: 'We celebrate diversity and promote inclusivity in our school community.' },
              { icon: <FaShieldAlt />, title: 'Respect', description: 'We treat everyone with dignity and create a safe, supportive environment.' }
            ].map((value, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: window.innerWidth < 768 ? '30px' : '40px',
                  backgroundColor: colors.light,
                  borderRadius: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: window.innerWidth < 768 ? '36px' : '48px',
                  color: colors.primary,
                  marginBottom: '20px'
                }}>
                  {value.icon}
                </div>
                <h3 style={{
                  fontSize: window.innerWidth < 768 ? '20px' : '24px',
                  fontWeight: '700',
                  color: colors.dark,
                  marginBottom: '15px'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: colors.gray,
                  lineHeight: '1.6'
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section style={{
        padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: window.innerWidth < 768 ? '40px' : '60px',
            color: colors.white
          }}>
            School <span style={{ color: colors.primary }}>Leadership</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: window.innerWidth < 768 ? '30px' : '40px'
          }}>
            {[
              { title: 'School Governing Body', icon: <RiGovernmentLine />, description: 'Parent representatives working with school management for excellence' },
              { title: 'Management Team', icon: <FaUserTie />, description: 'Experienced educators leading academic and administrative functions' },
              { title: 'Student Leadership', icon: <RiTeamLine />, description: 'Student Representative Council and prefects fostering student voice' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: window.innerWidth < 768 ? '30px' : '40px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{
                  fontSize: window.innerWidth < 768 ? '36px' : '48px',
                  color: colors.primary,
                  marginBottom: '20px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: window.innerWidth < 768 ? '20px' : '24px',
                  fontWeight: '700',
                  color: colors.white,
                  marginBottom: '15px'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: colors.gray,
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const AcademicsPage = () => {
    const [activeStream, setActiveStream] = useState('sciences');
    
    const streams = {
      sciences: {
        title: 'Sciences & Mathematics',
        icon: <FaMicroscope />,
        subjects: [
          'Mathematics',
          'Mathematical Literacy',
          'Physical Sciences',
          'Life Sciences',
          'Computer Applications Technology',
          'Information Technology'
        ]
      },
      commerce: {
        title: 'Business & Commerce',
        icon: <FaChartLine />,
        subjects: [
          'Business Studies',
          'Economics',
          'Accounting',
          'Consumer Studies',
          'Tourism'
        ]
      },
      humanities: {
        title: 'Humanities & Languages',
        icon: <FaBook />,
        subjects: [
          'History',
          'Geography',
          'Religion Studies',
          'Visual Arts',
          'Dramatic Arts',
          'Music'
        ]
      },
      technical: {
        title: 'Technical & Vocational',
        icon: <FaLaptopCode />,
        subjects: [
          'Engineering Graphics & Design',
          'Civil Technology',
          'Electrical Technology',
          'Mechanical Technology',
          'Agricultural Technology'
        ]
      }
    };

    return (
      <div style={{ paddingTop: '0' }}>
        {/* Hero Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          paddingTop: window.innerWidth < 768 ? '130px' : '180px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '56px',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '20px'
            }}>
              Academic <span style={{ color: colors.primary }}>Excellence</span>
            </h1>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.gray,
              lineHeight: '1.6'
            }}>
              Comprehensive curriculum designed to unlock every learner's potential
            </p>
          </div>
        </section>

        {/* Curriculum Overview */}
        <section style={{ 
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px', 
          backgroundColor: colors.white 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              padding: window.innerWidth < 768 ? '40px' : '60px',
              background: `linear-gradient(135deg, ${colors.primary}11, ${colors.secondary}11)`,
              borderRadius: '20px',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px'
            }}>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '28px' : '36px',
                fontWeight: '700',
                color: colors.dark,
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                National Senior Certificate (NSC)
              </h2>
              <p style={{
                fontSize: window.innerWidth < 768 ? '16px' : '18px',
                color: colors.gray,
                lineHeight: '1.8',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Harding Secondary School follows the South African National Curriculum (CAPS) for Grades 8-12. 
                Our comprehensive academic program prepares learners for the National Senior Certificate examination 
                and equips them with the knowledge and skills needed for tertiary education and future careers.
              </p>
            </div>

            {/* Subject Streams */}
            <h3 style={{
              fontSize: window.innerWidth < 768 ? '28px' : '36px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '40px',
              color: colors.dark
            }}>
              Subject Streams
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: window.innerWidth < 768 ? '10px' : '20px',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              flexWrap: 'wrap'
            }}>
              {Object.entries(streams).map(([key, stream]) => (
                <button
                  key={key}
                  onClick={() => setActiveStream(key)}
                  style={{
                    padding: window.innerWidth < 768 ? '10px 20px' : '15px 30px',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: window.innerWidth < 768 ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: activeStream === key ? colors.primary : colors.light,
                    color: activeStream === key ? colors.white : colors.dark,
                    marginBottom: window.innerWidth < 768 ? '10px' : 0
                  }}
                >
                  <span style={{ display: window.innerWidth < 480 ? 'none' : 'block' }}>{stream.icon}</span>
                  {window.innerWidth < 480 ? stream.title.split(' ')[0] : stream.title}
                </button>
              ))}
            </div>

            <div style={{
              backgroundColor: colors.light,
              padding: window.innerWidth < 768 ? '40px' : '60px',
              borderRadius: '20px'
            }}>
              <h4 style={{
                fontSize: window.innerWidth < 768 ? '24px' : '28px',
                fontWeight: '700',
                color: colors.dark,
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: window.innerWidth < 768 ? '28px' : '36px', color: colors.primary }}>
                  {streams[activeStream].icon}
                </span>
                {streams[activeStream].title}
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '20px'
              }}>
                {streams[activeStream].subjects.map((subject, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '20px',
                      backgroundColor: colors.white,
                      borderRadius: '10px',
                      borderLeft: `4px solid ${colors.primary}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FaCheckCircle style={{ color: colors.primary, fontSize: '20px', flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: colors.dark }}>
                      {subject}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Academic Support */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.white} 100%)`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.dark
            }}>
              Academic <span style={{ color: colors.primary }}>Support & Resources</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {[
                {
                  icon: <FaBook />,
                  title: 'Extra Classes',
                  description: 'Additional support in Mathematics, Sciences, and Languages for Grade 10-12 learners',
                  color: colors.primary
                },
                {
                  icon: <FaFlask />,
                  title: 'Modern Facilities',
                  description: 'Well-equipped science laboratories, computer labs, and a comprehensive library',
                  color: colors.secondary
                },
                {
                  icon: <FaGraduationCap />,
                  title: 'Career Guidance',
                  description: 'Comprehensive career counseling and university application support',
                  color: colors.primary
                },
                {
                  icon: <FaBrain />,
                  title: 'Learning Support',
                  description: 'Specialized programs for learners who need additional academic assistance',
                  color: colors.secondary
                },
                {
                  icon: <FaLaptopCode />,
                  title: 'Digital Learning',
                  description: 'Integration of technology in teaching and learning processes',
                  color: colors.primary
                },
                {
                  icon: <FaChalkboardTeacher />,
                  title: 'Expert Teachers',
                  description: 'Qualified and experienced educators dedicated to student success',
                  color: colors.secondary
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: window.innerWidth < 768 ? '30px' : '40px',
                    backgroundColor: colors.white,
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    borderTop: `4px solid ${item.color}`
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    color: item.color,
                    marginBottom: '20px'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontSize: window.innerWidth < 768 ? '20px' : '24px',
                    fontWeight: '700',
                    color: colors.dark,
                    marginBottom: '15px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: colors.gray,
                    lineHeight: '1.6'
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Achievements */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.white
            }}>
              Academic Achievements
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {[
                { number: '95%', label: 'Matric Pass Rate', icon: <FaTrophy /> },
                { number: '67%', label: "Bachelor's Pass", icon: <FaGraduationCap /> },
                { number: '150+', label: 'Distinctions Annually', icon: <FaAward /> },
                { number: '12', label: 'Top Achievers Awards', icon: <FaStar /> }
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: window.innerWidth < 768 ? '30px' : '40px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <div style={{
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    color: colors.white,
                    marginBottom: '20px'
                  }}>
                    {stat.icon}
                  </div>
                  <h3 style={{
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    fontWeight: '800',
                    color: colors.white,
                    marginBottom: '10px'
                  }}>
                    {stat.number}
                  </h3>
                  <p style={{
                    fontSize: window.innerWidth < 768 ? '16px' : '18px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const AdmissionsPage = () => {
    const [activeTab, setActiveTab] = useState('process');

    return (
      <div style={{ paddingTop: '0' }}>
        {/* Hero Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          paddingTop: window.innerWidth < 768 ? '130px' : '180px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '56px',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '20px'
            }}>
              <span style={{ color: colors.primary }}>Admissions</span>
            </h1>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.gray,
              lineHeight: '1.6'
            }}>
              Join our community of excellence at Harding Secondary School
            </p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section style={{
          padding: window.innerWidth < 768 ? '20px' : '40px 20px',
          backgroundColor: colors.white,
          position: 'sticky',
          top: window.innerWidth < 768 ? '70px' : '85px',
          zIndex: 90,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: window.innerWidth < 768 ? '10px' : '20px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'process', label: 'Application Process', icon: <FaClipboardList /> },
              { id: 'requirements', label: 'Requirements', icon: <FaCheckCircle /> },
              { id: 'dates', label: 'Important Dates', icon: <FaCalendarAlt /> },
              { id: 'fees', label: 'School Fees', icon: <FaFileAlt /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: window.innerWidth < 768 ? '10px 20px' : '15px 30px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: activeTab === tab.id ? colors.primary : colors.light,
                  color: activeTab === tab.id ? colors.white : colors.dark,
                  marginBottom: window.innerWidth < 768 ? '10px' : 0
                }}
              >
                <span style={{ display: window.innerWidth < 480 ? 'none' : 'block' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Content Sections */}
        <section style={{ 
          padding: window.innerWidth < 768 ? '40px 20px' : '60px 20px', 
          backgroundColor: colors.white 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {activeTab === 'process' && (
              <div>
                <h2 style={{
                  fontSize: window.innerWidth < 768 ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: colors.dark,
                  textAlign: 'center'
                }}>
                  Application Process
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: window.innerWidth < 768 ? '20px' : '30px' }}>
                  {[
                    {
                      step: '1',
                      title: 'Submit Application',
                      description: 'Complete the application form and submit all required documents during the application period.',
                      icon: <FaFileAlt />
                    },
                    {
                      step: '2',
                      title: 'Document Verification',
                      description: 'Our admissions team will review your application and verify all submitted documents.',
                      icon: <FaCheckCircle />
                    },
                    {
                      step: '3',
                      title: 'Assessment',
                      description: 'Qualifying learners may be invited for an assessment or interview.',
                      icon: <FaClipboardList />
                    },
                    {
                      step: '4',
                      title: 'Notification',
                      description: 'Successful applicants will receive an admission letter with further instructions.',
                      icon: <FaEnvelope />
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: window.innerWidth < 768 ? '20px' : '30px',
                        padding: window.innerWidth < 768 ? '25px' : '40px',
                        backgroundColor: colors.light,
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        flexDirection: window.innerWidth < 480 ? 'column' : 'row',
                        textAlign: window.innerWidth < 480 ? 'center' : 'left'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateX(10px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        width: window.innerWidth < 768 ? '60px' : '80px',
                        height: window.innerWidth < 768 ? '60px' : '80px',
                        backgroundColor: colors.primary,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: window.innerWidth < 768 ? '28px' : '36px',
                        fontWeight: '700',
                        color: colors.white,
                        flexShrink: 0
                      }}>
                        {item.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: window.innerWidth < 768 ? '20px' : '24px',
                          fontWeight: '700',
                          marginBottom: '10px',
                          color: colors.dark,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          justifyContent: window.innerWidth < 480 ? 'center' : 'flex-start'
                        }}>
                          {item.icon}
                          {item.title}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          color: colors.gray,
                          lineHeight: '1.6'
                        }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div>
                <h2 style={{
                  fontSize: window.innerWidth < 768 ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: colors.dark,
                  textAlign: 'center'
                }}>
                  Admission Requirements
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
                  gap: window.innerWidth < 768 ? '30px' : '40px'
                }}>
                  <div style={{
                    padding: window.innerWidth < 768 ? '30px' : '40px',
                    backgroundColor: colors.light,
                    borderRadius: '20px',
                    borderTop: `4px solid ${colors.primary}`
                  }}>
                    <h3 style={{
                      fontSize: window.innerWidth < 768 ? '20px' : '24px',
                      fontWeight: '700',
                      marginBottom: '20px',
                      color: colors.dark,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <FaGraduationCap style={{ color: colors.primary }} />
                      Academic Requirements
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {[
                        'Satisfactory academic record from previous school',
                        'Pass mark in core subjects (50% minimum)',
                        'Good conduct report',
                        'Age-appropriate grade placement'
                      ].map((req, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '15px',
                          color: colors.gray,
                          fontSize: '16px'
                        }}>
                          <FaCheckCircle style={{ color: colors.primary, marginTop: '2px', flexShrink: 0 }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{
                    padding: window.innerWidth < 768 ? '30px' : '40px',
                    backgroundColor: colors.light,
                    borderRadius: '20px',
                    borderTop: `4px solid ${colors.secondary}`
                  }}>
                    <h3 style={{
                      fontSize: window.innerWidth < 768 ? '20px' : '24px',
                      fontWeight: '700',
                      marginBottom: '20px',
                      color: colors.dark,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <FaFileAlt style={{ color: colors.secondary }} />
                      Required Documents
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {[
                        'Birth certificate (certified copy)',
                        'Latest academic report',
                        'Transfer letter (if applicable)',
                        'Parent/guardian ID copies',
                        'Proof of residence',
                        'Immunization records',
                        'Passport photos (2)'
                      ].map((doc, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '15px',
                          color: colors.gray,
                          fontSize: '16px'
                        }}>
                          <FaCheckCircle style={{ color: colors.secondary, marginTop: '2px', flexShrink: 0 }} />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dates' && (
              <div>
                <h2 style={{
                  fontSize: window.innerWidth < 768 ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: colors.dark,
                  textAlign: 'center'
                }}>
                  Important Dates 2025
                </h2>
                <div style={{
                  display: 'grid',
                  gap: '20px',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  {[
                    { date: 'May 1 - July 31', event: 'Application Period Opens', icon: <FaCalendarAlt /> },
                    { date: 'August 1-15', event: 'Document Verification', icon: <FaClipboardList /> },
                    { date: 'August 20-31', event: 'Assessment/Interviews', icon: <FaUserGraduate /> },
                    { date: 'September 15', event: 'Admission Letters Sent', icon: <FaEnvelope /> },
                    { date: 'October 1-31', event: 'Registration Period', icon: <FaCheckCircle /> },
                    { date: 'January 15, 2026', event: 'School Year Begins', icon: <FaGraduationCap /> }
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        padding: window.innerWidth < 768 ? '20px' : '25px',
                        backgroundColor: colors.light,
                        borderRadius: '15px',
                        borderLeft: `4px solid ${index % 2 === 0 ? colors.primary : colors.secondary}`
                      }}
                    >
                      <div style={{
                        fontSize: window.innerWidth < 768 ? '28px' : '32px',
                        color: index % 2 === 0 ? colors.primary : colors.secondary,
                        display: window.innerWidth < 480 ? 'none' : 'block'
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 style={{
                          fontSize: window.innerWidth < 768 ? '18px' : '20px',
                          fontWeight: '700',
                          color: colors.dark,
                          marginBottom: '5px'
                        }}>
                          {item.event}
                        </h4>
                        <p style={{
                          fontSize: window.innerWidth < 768 ? '14px' : '16px',
                          color: colors.gray,
                          margin: 0
                        }}>
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div>
                <h2 style={{
                  fontSize: window.innerWidth < 768 ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: colors.dark,
                  textAlign: 'center'
                }}>
                  School Fees Information
                </h2>
                <div style={{
                  maxWidth: '800px',
                  margin: '0 auto',
                  padding: window.innerWidth < 768 ? '30px' : '40px',
                  backgroundColor: colors.light,
                  borderRadius: '20px'
                }}>
                  <p style={{
                    fontSize: window.innerWidth < 768 ? '16px' : '18px',
                    color: colors.gray,
                    lineHeight: '1.8',
                    marginBottom: '30px'
                  }}>
                    As a public school, Harding Secondary School charges minimal fees. Fee structures are 
                    determined annually by the School Governing Body. Financial assistance and fee exemptions 
                    are available for qualifying families.
                  </p>
                  <div style={{
                    display: 'grid',
                    gap: '20px'
                  }}>
                    <div style={{
                      padding: '20px',
                      backgroundColor: colors.white,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <FaCheckCircle style={{ color: colors.primary, fontSize: '24px', flexShrink: 0 }} />
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: colors.dark }}>School Fees</h4>
                        <p style={{ margin: 0, color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>Annual fees determined by SGB (contact office for current rates)</p>
                      </div>
                    </div>
                    <div style={{
                      padding: '20px',
                      backgroundColor: colors.white,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <FaCheckCircle style={{ color: colors.primary, fontSize: '24px', flexShrink: 0 }} />
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: colors.dark }}>Fee Exemptions</h4>
                        <p style={{ margin: 0, color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>Available for qualifying families based on financial need</p>
                      </div>
                    </div>
                    <div style={{
                      padding: '20px',
                      backgroundColor: colors.white,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <FaCheckCircle style={{ color: colors.primary, fontSize: '24px', flexShrink: 0 }} />
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: colors.dark }}>Payment Options</h4>
                        <p style={{ margin: 0, color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>Full payment, termly installments, or monthly debit orders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '80px 20px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '28px' : '36px',
              fontWeight: '700',
              color: colors.white,
              marginBottom: '20px'
            }}>
              Ready to Apply?
            </h2>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '18px',
              color: colors.white,
              opacity: 0.9,
              marginBottom: '30px'
            }}>
              Contact our admissions office for application forms and guidance
            </p>
            <button
              onClick={() => setCurrentPage('contact')}
              style={{
                backgroundColor: colors.white,
                color: colors.primary,
                border: 'none',
                padding: window.innerWidth < 768 ? '14px 30px' : '18px 40px',
                fontSize: window.innerWidth < 768 ? '16px' : '18px',
                fontWeight: '600',
                borderRadius: '50px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <FaPhone />
              Contact Admissions
            </button>
          </div>
        </section>
      </div>
    );
  };

  const StudentLifePage = () => {
    const [activeActivity, setActiveActivity] = useState('sports');

    const activities = {
      sports: {
        title: 'Sports & Athletics',
        icon: <FaRunning />,
        items: [
          { name: 'Soccer', icon: <FaFootballBall /> },
          { name: 'Rugby', icon: <FaFootballBall /> },
          { name: 'Netball', icon: <FaVolleyballBall /> },
          { name: 'Athletics', icon: <FaRunning /> },
          { name: 'Swimming', icon: <FaSwimmer /> },
          { name: 'Table Tennis', icon: <FaTableTennis /> },
          { name: 'Basketball', icon: <FaBasketballBall /> },
          { name: 'Fitness Club', icon: <FaDumbbell /> }
        ]
      },
      cultural: {
        title: 'Arts & Culture',
        icon: <FaPalette />,
        items: [
          { name: 'Drama Club', icon: <FaTheaterMasks /> },
          { name: 'Music Society', icon: <FaMusic /> },
          { name: 'Art Club', icon: <FaPaintBrush /> },
          { name: 'Dance Team', icon: <FaMusic /> },
          { name: 'Debate Society', icon: <FaUsers /> },
          { name: 'Poetry Club', icon: <FaBook /> },
          { name: 'Choir', icon: <FaMusic /> },
          { name: 'Band', icon: <FaGuitar /> }
        ]
      },
      academic: {
        title: 'Academic Clubs',
        icon: <FaBook />,
        items: [
          { name: 'Science Club', icon: <FaMicroscope /> },
          { name: 'Mathematics Olympiad', icon: <FaBrain /> },
          { name: 'Computer Club', icon: <FaLaptopCode /> },
          { name: 'Robotics Club', icon: <FaRobot /> },
          { name: 'Reading Club', icon: <FaBook /> },
          { name: 'Chess Club', icon: <FaChess /> },
          { name: 'Environmental Club', icon: <FaLeaf /> },
          { name: 'First Aid Club', icon: <FaHeartbeat /> }
        ]
      }
    };

    return (
      <div style={{ paddingTop: '0' }}>
        {/* Hero Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          paddingTop: window.innerWidth < 768 ? '130px' : '180px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '56px',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '20px'
            }}>
              Student <span style={{ color: colors.primary }}>Life</span>
            </h1>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.gray,
              lineHeight: '1.6'
            }}>
              Beyond the classroom: Building character, friendships, and memories
            </p>
          </div>
        </section>

        {/* Activities Overview */}
        <section style={{ 
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px', 
          backgroundColor: colors.white 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '20px',
              color: colors.dark
            }}>
              A Vibrant School <span style={{ color: colors.primary }}>Community</span>
            </h2>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '18px',
              color: colors.gray,
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              maxWidth: '800px',
              margin: '0 auto 60px'
            }}>
              At Harding Secondary School, we believe in developing well-rounded individuals. 
              Our diverse range of extracurricular activities ensures every learner finds their passion 
              and develops skills beyond academics.
            </p>

            {/* Activity Tabs */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: window.innerWidth < 768 ? '10px' : '20px',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              flexWrap: 'wrap'
            }}>
              {Object.entries(activities).map(([key, activity]) => (
                <button
                  key={key}
                  onClick={() => setActiveActivity(key)}
                  style={{
                    padding: window.innerWidth < 768 ? '15px 25px' : '20px 40px',
                    border: 'none',
                    borderRadius: '15px',
                    fontSize: window.innerWidth < 768 ? '16px' : '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: activeActivity === key ? colors.primary : colors.light,
                    color: activeActivity === key ? colors.white : colors.dark,
                    boxShadow: activeActivity === key ? '0 10px 30px rgba(34, 139, 34, 0.3)' : 'none',
                    marginBottom: window.innerWidth < 768 ? '10px' : 0
                  }}
                >
                  <span style={{ fontSize: window.innerWidth < 768 ? '20px' : '24px' }}>{activity.icon}</span>
                  {window.innerWidth < 480 ? activity.title.split(' ')[0] : activity.title}
                </button>
              ))}
            </div>

            {/* Activity Items */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : window.innerWidth < 1024 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
              gap: window.innerWidth < 768 ? '20px' : '30px'
            }}>
              {activities[activeActivity].items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: window.innerWidth < 768 ? '25px' : '30px',
                    backgroundColor: colors.light,
                    borderRadius: '15px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    borderBottom: `4px solid transparent`
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderBottomColor = colors.primary;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderBottomColor = 'transparent';
                  }}
                >
                  <div style={{
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    color: colors.primary,
                    marginBottom: '15px'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontSize: window.innerWidth < 768 ? '16px' : '20px',
                    fontWeight: '600',
                    color: colors.dark
                  }}>
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Support */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.white} 100%)`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.dark
            }}>
              Student <span style={{ color: colors.primary }}>Support Services</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {[
                {
                  icon: <FaUsers />,
                  title: 'Counseling Services',
                  description: 'Professional guidance counselors available to support students\' emotional well-being and academic planning.',
                  color: colors.primary
                },
                {
                  icon: <FaBook />,
                  title: 'Peer Tutoring',
                  description: 'Senior students mentor and tutor junior students, fostering a supportive learning community.',
                  color: colors.secondary
                },
                {
                  icon: <FaHeartbeat />,
                  title: 'Health & Wellness',
                  description: 'On-site health services and wellness programs promoting physical and mental health.',
                  color: colors.primary
                },
                {
                  icon: <FaShieldAlt />,
                  title: 'Safety & Security',
                  description: 'Comprehensive safety measures ensuring a secure learning environment for all students.',
                  color: colors.secondary
                },
                {
                  icon: <FaChalkboardTeacher />,
                  title: 'Academic Support',
                  description: 'Extra classes and learning support for students who need additional assistance.',
                  color: colors.primary
                },
                {
                  icon: <FaGraduationCap />,
                  title: 'Career Guidance',
                  description: 'Career counseling and university application support for Grade 11 and 12 learners.',
                  color: colors.secondary
                }
              ].map((service, index) => (
                <div
                  key={index}
                  style={{
                    padding: window.innerWidth < 768 ? '30px' : '40px',
                    backgroundColor: colors.white,
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    borderTop: `4px solid ${service.color}`
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    color: service.color,
                    marginBottom: '20px'
                  }}>
                    {service.icon}
                  </div>
                  <h3 style={{
                    fontSize: window.innerWidth < 768 ? '20px' : '24px',
                    fontWeight: '700',
                    color: colors.dark,
                    marginBottom: '15px'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: colors.gray,
                    lineHeight: '1.6'
                  }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Opportunities */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              marginBottom: '20px',
              color: colors.white
            }}>
              Student Leadership
            </h2>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.white,
              opacity: 0.9,
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              maxWidth: '800px',
              margin: '0 auto 60px'
            }}>
              Develop leadership skills through our Student Representative Council, 
              prefect system, and various leadership programs.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {[
                { number: '25', label: 'Prefects', icon: <FaUserTie /> },
                { number: '15', label: 'SRC Members', icon: <FaUsers /> },
                { number: '30+', label: 'Club Leaders', icon: <FaTrophy /> },
                { number: '100+', label: 'Leadership Roles', icon: <FaAward /> }
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    padding: window.innerWidth < 768 ? '25px' : '30px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <div style={{
                    fontSize: window.innerWidth < 768 ? '28px' : '36px',
                    color: colors.white,
                    marginBottom: '15px'
                  }}>
                    {stat.icon}
                  </div>
                  <h3 style={{
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    fontWeight: '800',
                    color: colors.white,
                    marginBottom: '10px'
                  }}>
                    {stat.number}
                  </h3>
                  <p style={{
                    fontSize: window.innerWidth < 768 ? '14px' : '18px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const NewsPage = () => {
    const newsItems = [
      {
        id: 1,
        category: 'Academic',
        title: '2025 Academic Year Begins Successfully',
        excerpt: 'We welcomed over 1,200 learners back for another exciting year of learning and growth. The first week has been filled with orientation activities and setting goals for the year ahead.',
        date: 'January 15, 2025',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        featured: true
      },
      {
        id: 2,
        category: 'Achievement',
        title: 'Outstanding Matric Results 2024',
        excerpt: 'Celebrating our Class of 2024 with a 95% pass rate and numerous distinctions. Special congratulations to our top achievers who received multiple university offers.',
        date: 'January 10, 2025',
        image: 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=800',
        featured: true
      },
      {
        id: 3,
        category: 'Sports',
        title: 'Provincial Athletics Champions',
        excerpt: 'Our athletics team dominated at the provincial championships, bringing home 12 gold medals, 8 silver, and 5 bronze medals.',
        date: 'December 18, 2024',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800'
      },
      {
        id: 4,
        category: 'Cultural',
        title: 'Drama Club Wins Regional Competition',
        excerpt: 'Our talented drama students took first place at the regional drama festival with their original production.',
        date: 'December 10, 2024',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'
      },
      {
        id: 5,
        category: 'Academic',
        title: 'Science Fair Excellence',
        excerpt: 'Grade 11 learners showcase innovative projects at the district science fair, with three projects advancing to provincials.',
        date: 'November 28, 2024',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'
      },
      {
        id: 6,
        category: 'Community',
        title: 'Community Outreach Success',
        excerpt: 'Students raised over R50,000 for local charities through various fundraising initiatives throughout the term.',
        date: 'November 15, 2024',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800'
      }
    ];

    const filteredNews = selectedNewsCategory === 'all' 
      ? newsItems 
      : newsItems.filter(item => item.category.toLowerCase() === selectedNewsCategory);

    return (
      <div style={{ paddingTop: '0' }}>
        {/* Hero Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          paddingTop: window.innerWidth < 768 ? '130px' : '180px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '56px',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '20px'
            }}>
              News & <span style={{ color: colors.primary }}>Events</span>
            </h1>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.gray,
              lineHeight: '1.6'
            }}>
              Stay updated with the latest happenings at Harding Secondary School
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '20px' : '40px 20px',
          backgroundColor: colors.white,
          position: 'sticky',
          top: window.innerWidth < 768 ? '70px' : '85px',
          zIndex: 90,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: window.innerWidth < 768 ? '10px' : '15px',
            flexWrap: 'wrap'
          }}>
            {['all', 'academic', 'sports', 'cultural', 'achievement', 'community'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedNewsCategory(category)}
                style={{
                  padding: window.innerWidth < 768 ? '8px 20px' : '10px 25px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: selectedNewsCategory === category ? colors.primary : colors.light,
                  color: selectedNewsCategory === category ? colors.white : colors.dark,
                  textTransform: 'capitalize',
                  marginBottom: window.innerWidth < 768 ? '5px' : 0
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured News */}
        {selectedNewsCategory === 'all' && (
          <section style={{ 
            padding: window.innerWidth < 768 ? '40px 20px' : '60px 20px', 
            backgroundColor: colors.light 
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: window.innerWidth < 768 ? '28px' : '36px',
                fontWeight: '700',
                marginBottom: '40px',
                color: colors.dark
              }}>
                Featured Stories
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
                gap: window.innerWidth < 768 ? '30px' : '40px'
              }}>
                {newsItems.filter(item => item.featured).map(item => (
                  <article
                    key={item.id}
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{
                      height: window.innerWidth < 768 ? '200px' : '300px',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div style={{ padding: window.innerWidth < 768 ? '30px' : '40px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '20px',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          backgroundColor: colors.primary,
                          color: colors.white,
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          {item.category}
                        </span>
                        <span style={{
                          color: colors.gray,
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <FaCalendarAlt />
                          {item.date}
                        </span>
                      </div>
                      <h3 style={{
                        fontSize: window.innerWidth < 768 ? '22px' : '28px',
                        fontWeight: '700',
                        marginBottom: '15px',
                        color: colors.dark,
                        lineHeight: '1.3'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: window.innerWidth < 768 ? '16px' : '18px',
                        color: colors.gray,
                        lineHeight: '1.6'
                      }}>
                        {item.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All News */}
        <section style={{ 
          padding: window.innerWidth < 768 ? '40px 20px' : '60px 20px', 
          backgroundColor: colors.white 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '40px',
              color: colors.dark
            }}>
              {selectedNewsCategory === 'all' ? 'All News' : `${selectedNewsCategory} News`}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {filteredNews.map(item => (
                <article
                  key={item.id}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      backgroundColor: colors.primary,
                      color: colors.white,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {item.category}
                    </div>
                  </div>
                  <div style={{ padding: window.innerWidth < 768 ? '25px' : '30px' }}>
                    <h3 style={{
                      fontSize: window.innerWidth < 768 ? '18px' : '22px',
                      fontWeight: '700',
                      marginBottom: '15px',
                      color: colors.dark,
                      lineHeight: '1.3'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: colors.gray,
                      marginBottom: '20px',
                      lineHeight: '1.6'
                    }}>
                      {item.excerpt}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: colors.gray,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <FaCalendarAlt />
                        {item.date}
                      </span>
                      <FaArrowRight style={{ color: colors.primary }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '80px 20px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.white
            }}>
              Upcoming <span style={{ color: colors.primary }}>Events</span>
            </h2>
            <div style={{
              display: 'grid',
              gap: '20px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {[
                { date: 'FEB 14', event: "Valentine's Day Celebration", time: '12:00 PM' },
                { date: 'MAR 15', event: 'Annual Sports Day', time: '8:00 AM' },
                { date: 'MAR 21', event: 'Human Rights Day Assembly', time: '10:00 AM' },
                { date: 'APR 10', event: 'Parent-Teacher Meeting', time: '2:00 PM' },
                { date: 'MAY 20', event: 'Cultural Festival', time: '9:00 AM' }
              ].map((event, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: window.innerWidth < 768 ? '20px' : '30px',
                    padding: window.innerWidth < 768 ? '20px' : '25px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                    padding: window.innerWidth < 768 ? '15px' : '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    minWidth: window.innerWidth < 768 ? '70px' : '80px'
                  }}>
                    <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                      {event.date.split(' ')[0]}
                    </div>
                    <div style={{ fontSize: window.innerWidth < 768 ? '20px' : '24px', fontWeight: '700' }}>
                      {event.date.split(' ')[1]}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: window.innerWidth < 768 ? '18px' : '20px',
                      fontWeight: '600',
                      color: colors.white,
                      marginBottom: '5px'
                    }}>
                      {event.event}
                    </h3>
                    <p style={{
                      fontSize: window.innerWidth < 768 ? '14px' : '16px',
                      color: colors.gray,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <FaClock />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    
    const galleryImages = [
      {
        id: 1,
        category: 'academic',
        title: 'Science Laboratory',
        image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800'
      },
      {
        id: 2,
        category: 'sports',
        title: 'Athletics Day',
        image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800'
      },
      {
        id: 3,
        category: 'cultural',
        title: 'Drama Performance',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'
      },
      {
        id: 4,
        category: 'facilities',
        title: 'School Library',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'
      },
      {
        id: 5,
        category: 'events',
        title: 'Graduation Ceremony',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
      },
      {
        id: 6,
        category: 'academic',
        title: 'Computer Lab',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'
      },
      {
        id: 7,
        category: 'sports',
        title: 'Soccer Team',
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800'
      },
      {
        id: 8,
        category: 'cultural',
        title: 'Music Festival',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800'
      },
      {
        id: 9,
        category: 'facilities',
        title: 'School Grounds',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'
      }
    ];

    const filteredImages = selectedGalleryCategory === 'all' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === selectedGalleryCategory);

    return (
      <div style={{ paddingTop: '0' }}>
        {/* Hero Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          paddingTop: window.innerWidth < 768 ? '130px' : '180px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '56px',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '20px'
            }}>
              <span style={{ color: colors.primary }}>Gallery</span>
            </h1>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.gray,
              lineHeight: '1.6'
            }}>
              Capturing moments and memories at Harding Secondary School
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '20px' : '40px 20px',
          backgroundColor: colors.white,
          position: 'sticky',
          top: window.innerWidth < 768 ? '70px' : '85px',
          zIndex: 90,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: window.innerWidth < 768 ? '10px' : '15px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'all', label: 'All', icon: <FaImages /> },
              { id: 'academic', label: 'Academic', icon: <FaGraduationCap /> },
              { id: 'sports', label: 'Sports', icon: <FaRunning /> },
              { id: 'cultural', label: 'Cultural', icon: <FaPalette /> },
              { id: 'events', label: 'Events', icon: <FaCalendarAlt /> },
              { id: 'facilities', label: 'Facilities', icon: <FaUniversity /> }
            ].map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedGalleryCategory(category.id)}
                style={{
                  padding: window.innerWidth < 768 ? '8px 20px' : '12px 25px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: selectedGalleryCategory === category.id ? colors.primary : colors.light,
                  color: selectedGalleryCategory === category.id ? colors.white : colors.dark,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: window.innerWidth < 768 ? '5px' : 0
                }}
              >
                <span style={{ display: window.innerWidth < 480 ? 'none' : 'block' }}>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section style={{ 
          padding: window.innerWidth < 768 ? '40px 20px' : '60px 20px', 
          backgroundColor: colors.white 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: window.innerWidth < 768 ? '20px' : '30px'
            }}>
              {filteredImages.map(image => (
                <div
                  key={image.id}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    aspectRatio: '4/3',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setSelectedImage(image)}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: colors.white
                  }}>
                    <h3 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600' }}>{image.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20000,
              padding: '20px'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'transparent',
                border: 'none',
                color: colors.white,
                fontSize: '40px',
                cursor: 'pointer',
                padding: '10px'
              }}
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={{
                maxWidth: '90%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '10px'
              }}
            />
          </div>
        )}

        {/* Video Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '80px 20px',
          background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.white} 100%)`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.dark
            }}>
              Video <span style={{ color: colors.primary }}>Highlights</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
              gap: window.innerWidth < 768 ? '30px' : '40px'
            }}>
              {[
                { title: 'School Tour', thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800' },
                { title: 'Year in Review 2024', thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' }
              ].map((video, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: window.innerWidth < 768 ? '60px' : '80px',
                      height: window.innerWidth < 768 ? '60px' : '80px',
                      backgroundColor: colors.primary,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: window.innerWidth < 768 ? '24px' : '30px',
                      color: colors.white,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    >
                      <FaPlay style={{ marginLeft: '5px' }} />
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    color: colors.white
                  }}>
                    <h3 style={{ fontSize: window.innerWidth < 768 ? '20px' : '24px', fontWeight: '600' }}>{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const ContactPage = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      alert('Thank you for your message. We will get back to you soon!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    };

    return (
      <div style={{ paddingTop: '0' }}>
        {/* Hero Section */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px',
          paddingTop: window.innerWidth < 768 ? '130px' : '180px',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '48px' : '56px',
              fontWeight: '800',
              color: colors.white,
              marginBottom: '20px'
            }}>
              Contact <span style={{ color: colors.primary }}>Us</span>
            </h1>
            <p style={{
              fontSize: window.innerWidth < 768 ? '16px' : '20px',
              color: colors.gray,
              lineHeight: '1.6'
            }}>
              Get in touch with Harding Secondary School
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section style={{ 
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px', 
          backgroundColor: colors.white 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'repeat(2, 1fr)',
              gap: window.innerWidth < 768 ? '40px' : '60px'
            }}>
              {/* Contact Information */}
              <div style={{ order: window.innerWidth < 1024 ? 2 : 1 }}>
                <h2 style={{
                  fontSize: window.innerWidth < 768 ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: colors.dark
                }}>
                  Get In Touch
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: window.innerWidth < 768 ? '20px' : '30px' }}>
                  <div style={{
                    padding: window.innerWidth < 768 ? '25px' : '30px',
                    backgroundColor: colors.light,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: window.innerWidth < 768 ? '40px' : '50px',
                      height: window.innerWidth < 768 ? '40px' : '50px',
                      backgroundColor: colors.primary,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: window.innerWidth < 768 ? '20px' : '24px',
                      color: colors.white,
                      flexShrink: 0
                    }}>
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h3 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', marginBottom: '10px', color: colors.dark }}>
                        Address
                      </h3>
                      <p style={{ color: colors.gray, lineHeight: '1.6', fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                        Harding Secondary School<br />
                        Harding<br />
                        KwaZulu-Natal, South Africa
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: window.innerWidth < 768 ? '25px' : '30px',
                    backgroundColor: colors.light,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: window.innerWidth < 768 ? '40px' : '50px',
                      height: window.innerWidth < 768 ? '40px' : '50px',
                      backgroundColor: colors.primary,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: window.innerWidth < 768 ? '20px' : '24px',
                      color: colors.white,
                      flexShrink: 0
                    }}>
                      <FaPhone />
                    </div>
                    <div>
                      <h3 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', marginBottom: '10px', color: colors.dark }}>
                        Phone
                      </h3>
                      <p style={{ color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                        039 433 1223
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: window.innerWidth < 768 ? '25px' : '30px',
                    backgroundColor: colors.light,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: window.innerWidth < 768 ? '40px' : '50px',
                      height: window.innerWidth < 768 ? '40px' : '50px',
                      backgroundColor: colors.primary,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: window.innerWidth < 768 ? '20px' : '24px',
                      color: colors.white,
                      flexShrink: 0
                    }}>
                      <FaEnvelope />
                    </div>
                    <div>
                      <h3 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', marginBottom: '10px', color: colors.dark }}>
                        Email
                      </h3>
                      <p style={{ color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                        info@hardingsecondary.edu.za
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: window.innerWidth < 768 ? '25px' : '30px',
                    backgroundColor: colors.light,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: window.innerWidth < 768 ? '40px' : '50px',
                      height: window.innerWidth < 768 ? '40px' : '50px',
                      backgroundColor: colors.primary,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: window.innerWidth < 768 ? '20px' : '24px',
                      color: colors.white,
                      flexShrink: 0
                    }}>
                      <FaClock />
                    </div>
                    <div>
                      <h3 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', marginBottom: '10px', color: colors.dark }}>
                        Office Hours
                      </h3>
                      <p style={{ color: colors.gray, lineHeight: '1.6', fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                        Monday - Thursday: 7:30 AM - 4:00 PM<br />
                        Friday: 7:30 AM - 3:00 PM<br />
                        Weekends: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div style={{ order: window.innerWidth < 1024 ? 1 : 2 }}>
                <h2 style={{
                  fontSize: window.innerWidth < 768 ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: colors.dark
                }}>
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} style={{
                  padding: window.innerWidth < 768 ? '30px' : '40px',
                  backgroundColor: colors.light,
                  borderRadius: '20px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{
                        padding: '15px 20px',
                        border: `2px solid ${colors.light}`,
                        borderRadius: '10px',
                        fontSize: '16px',
                        backgroundColor: colors.white,
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primary}
                      onBlur={(e) => e.target.style.borderColor = colors.light}
                    />
                    
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{
                        padding: '15px 20px',
                        border: `2px solid ${colors.light}`,
                        borderRadius: '10px',
                        fontSize: '16px',
                        backgroundColor: colors.white,
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primary}
                      onBlur={(e) => e.target.style.borderColor = colors.light}
                    />
                    
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        padding: '15px 20px',
                        border: `2px solid ${colors.light}`,
                        borderRadius: '10px',
                        fontSize: '16px',
                        backgroundColor: colors.white,
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primary}
                      onBlur={(e) => e.target.style.borderColor = colors.light}
                    />
                    
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      style={{
                        padding: '15px 20px',
                        border: `2px solid ${colors.light}`,
                        borderRadius: '10px',
                        fontSize: '16px',
                        backgroundColor: colors.white,
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primary}
                      onBlur={(e) => e.target.style.borderColor = colors.light}
                    >
                      <option value="">Select Subject</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="academic">Academic Information</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                    
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows="6"
                      style={{
                        padding: '15px 20px',
                        border: `2px solid ${colors.light}`,
                        borderRadius: '10px',
                        fontSize: '16px',
                        backgroundColor: colors.white,
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: '150px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primary}
                      onBlur={(e) => e.target.style.borderColor = colors.light}
                    />
                    
                    <button
                      type="submit"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        color: colors.white,
                        border: 'none',
                        padding: window.innerWidth < 768 ? '14px 30px' : '18px 40px',
                        fontSize: window.innerWidth < 768 ? '16px' : '18px',
                        fontWeight: '600',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                      onMouseEnter={e => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 10px 30px rgba(34, 139, 34, 0.3)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Send Message
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section style={{
          padding: window.innerWidth < 768 ? '60px 20px' : '80px 20px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '28px' : '36px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.white
            }}>
              Quick Links & Resources
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: window.innerWidth < 768 ? '20px' : '30px'
            }}>
              {[
                { icon: <FaDownload />, title: 'Application Forms', description: 'Download admission forms' },
                { icon: <FaCalendarAlt />, title: 'School Calendar', description: 'View academic calendar' },
                { icon: <FaFileAlt />, title: 'Policies', description: 'School policies & procedures' },
                { icon: <FaUsers />, title: 'Parent Portal', description: 'Access parent resources' }
              ].map((link, index) => (
                <div
                  key={index}
                  style={{
                    padding: window.innerWidth < 768 ? '25px' : '30px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: window.innerWidth < 768 ? '32px' : '36px', color: colors.white, marginBottom: '15px' }}>
                    {link.icon}
                  </div>
                  <h3 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', color: colors.white, marginBottom: '10px' }}>
                    {link.title}
                  </h3>
                  <p style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px', color: 'rgba(255,255,255,0.8)' }}>
                    {link.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section style={{ 
          padding: window.innerWidth < 768 ? '60px 20px' : '100px 20px', 
          backgroundColor: colors.light 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: window.innerWidth < 768 ? '40px' : '60px',
              color: colors.dark
            }}>
              Find <span style={{ color: colors.primary }}>Us</span>
            </h2>
            <div style={{
              backgroundColor: colors.gray,
              height: window.innerWidth < 768 ? '300px' : '500px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              fontSize: window.innerWidth < 768 ? '18px' : '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <FaMapMarkerAlt style={{ fontSize: window.innerWidth < 768 ? '36px' : '48px', marginBottom: '20px' }} />
                <p>Interactive Map</p>
                <p style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px', opacity: 0.8 }}>Integration with Google Maps API</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const Footer = () => (
    <footer style={{
      backgroundColor: colors.dark,
      color: colors.white,
      padding: window.innerWidth < 768 ? '60px 20px 40px' : '80px 20px 40px',
      marginTop: 0
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: window.innerWidth < 768 ? '40px' : '60px',
          marginBottom: window.innerWidth < 768 ? '40px' : '60px'
        }}>
          {/* School Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{
                width: window.innerWidth < 768 ? '40px' : '50px',
                height: window.innerWidth < 768 ? '40px' : '50px',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaGraduationCap style={{ fontSize: window.innerWidth < 768 ? '20px' : '24px' }} />
              </div>
              <h3 style={{ fontSize: window.innerWidth < 768 ? '20px' : '24px', fontWeight: '700' }}>Harding Secondary</h3>
            </div>
            <p style={{ color: colors.gray, lineHeight: '1.8', marginBottom: '20px', fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
              Excellence in education since 1950. Nurturing tomorrow's leaders 
              in the heart of KwaZulu-Natal with over 1,250 learners and 41 dedicated educators.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    width: window.innerWidth < 768 ? '35px' : '40px',
                    height: window.innerWidth < 768 ? '35px' : '40px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', marginBottom: '20px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {navigation.slice(0, 6).map(nav => (
                <a
                  key={nav.id}
                  onClick={() => setCurrentPage(nav.id)}
                  style={{
                    color: colors.gray,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: window.innerWidth < 768 ? '14px' : '16px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = colors.primary}
                  onMouseLeave={e => e.currentTarget.style.color = colors.gray}
                >
                  <FaChevronRight style={{ fontSize: '12px' }} />
                  {nav.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', marginBottom: '20px' }}>Contact Information</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                <FaPhone style={{ color: colors.primary }} />
                039 433 1223
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                <FaEnvelope style={{ color: colors.primary }} />
                info@hardingsecondary.edu.za
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: colors.gray, fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                <FaMapMarkerAlt style={{ color: colors.primary, marginTop: '4px' }} />
                <div>
                  Harding Secondary School<br />
                  Harding, KwaZulu-Natal<br />
                  South Africa
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: window.innerWidth < 768 ? '18px' : '20px', fontWeight: '600', marginBottom: '20px' }}>Stay Connected</h4>
            <p style={{ color: colors.gray, marginBottom: '20px', fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
              Subscribe to our newsletter for updates and announcements.
            </p>
            <form style={{ display: 'flex', gap: '10px', flexDirection: window.innerWidth < 480 ? 'column' : 'row' }} onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}>
              <input
                type="email"
                placeholder="Your email"
                required
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '50px',
                  border: 'none',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: colors.white,
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}
                onFocus={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onBlur={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 30px',
                  borderRadius: '50px',
                  border: 'none',
                  backgroundColor: colors.primary,
                  color: colors.white,
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}
                onMouseEnter={e => e.target.style.backgroundColor = colors.secondary}
                onMouseLeave={e => e.target.style.backgroundColor = colors.primary}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          color: colors.gray
        }}>
          <p style={{ marginBottom: '10px', fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
            © 2025 Harding Secondary School. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: window.innerWidth < 768 ? '20px' : '30px',
            flexWrap: 'wrap'
          }}>
            <a
              href="#"
              style={{
                color: colors.gray,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}
              onMouseEnter={e => e.target.style.color = colors.primary}
              onMouseLeave={e => e.target.style.color = colors.gray}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: colors.gray,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}
              onMouseEnter={e => e.target.style.color = colors.primary}
              onMouseLeave={e => e.target.style.color = colors.gray}
            >
              Terms of Use
            </a>
            <a
              href="#"
              style={{
                color: colors.gray,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}
              onMouseEnter={e => e.target.style.color = colors.primary}
              onMouseLeave={e => e.target.style.color = colors.gray}
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );

  // Add CSS animations
  const styles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      overflow-x: hidden;
    }

    body {
      font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: ${colors.light};
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.primary};
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.secondary};
    }

    @media (max-width: 768px) {
      .hide-mobile {
        display: none !important;
      }
    }
  `;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.white, margin: 0, padding: 0, position: 'relative', overflowX: 'hidden' }}>
      <style>{styles}</style>
      <Header />
      <main style={{ paddingTop: '0', position: 'relative', zIndex: 1 }}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'academics' && <AcademicsPage />}
        {currentPage === 'admissions' && <AdmissionsPage />}
        {currentPage === 'student-life' && <StudentLifePage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;