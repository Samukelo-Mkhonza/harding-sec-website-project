import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGraduationCap,
  FaRunning,
  FaCalendarAlt,
  FaUsers,
  FaBuilding,
  FaNewspaper,
  FaArrowRight,
  FaSearch,
  FaChevronDown,
} from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { NEWS_IMAGES, HERO_IMAGES } from '../utils/imageConstants';

const NEWS_ARTICLES = [
  {
    id: 1,
    title: "Class of 2024 Achieves Remarkable 97% Matric Pass Rate",
    excerpt:
      "Harding Secondary School celebrates another outstanding year as 97% of matric learners pass their final examinations, with 65% achieving bachelor's passes — a new school record.",
    date: "January 14, 2025",
    category: "Academics",
    image: NEWS_IMAGES.matricResults,
    featured: true,
    author: "School Administration",
  },
  {
    id: 2,
    title: "New Science Laboratory Opens Its Doors",
    excerpt:
      "A state-of-the-art science facility worth R2.5 million has officially opened this term, providing learners with cutting-edge equipment for hands-on STEM education.",
    date: "March 10, 2025",
    category: "Facilities",
    image: NEWS_IMAGES.scienceLab,
    author: "School Administration",
  },
  {
    id: 3,
    title: "Soccer Team Clinches Regional Championship",
    excerpt:
      "Our under-19 soccer team beat rivals Paddock Secondary 3–1 in the Ugu District championship final, bringing home the trophy for the third consecutive year.",
    date: "May 3, 2025",
    category: "Sports",
    image: NEWS_IMAGES.sportsDay,
    author: "Sports Department",
  },
  {
    id: 4,
    title: "Community Clean-Up Drive a Resounding Success",
    excerpt:
      "Over 200 learners and educators took to the streets of Harding for our annual community service day, collecting waste and planting trees across the town.",
    date: "April 22, 2025",
    category: "Community",
    image: NEWS_IMAGES.community,
    author: "Student Representative Council",
  },
  {
    id: 5,
    title: "Academic Excellence Awards Ceremony 2025",
    excerpt:
      "Top-performing learners across all grades were recognized at our annual awards evening, with special trophies for academic achievement, leadership, and sportsmanship.",
    date: "March 28, 2025",
    category: "Events",
    image: NEWS_IMAGES.academicAwards,
    author: "School Administration",
  },
  {
    id: 6,
    title: "Harding Secondary Launches Digital Library Platform",
    excerpt:
      "Learners now have 24/7 access to over 10,000 digital books and study resources through our new online library, available on any device.",
    date: "February 15, 2025",
    category: "Academics",
    image: HERO_IMAGES.library,
    author: "School Administration",
  },
  {
    id: 7,
    title: "Annual Sports Day 2025 Highlights",
    excerpt:
      "A day of fierce competition, team spirit, and athletic achievement at our annual inter-house sports day, with House Mandela claiming the overall trophy.",
    date: "May 16, 2025",
    category: "Sports",
    image: NEWS_IMAGES.sportsDay,
    author: "Sports Department",
  },
  {
    id: 8,
    title: "School Governing Body Elections Completed",
    excerpt:
      "New parent and learner representatives have been elected to the School Governing Body for the 2025–2027 term in a transparent and well-attended election.",
    date: "February 7, 2025",
    category: "Events",
    image: NEWS_IMAGES.schoolEvent,
    author: "School Administration",
  },
  {
    id: 9,
    title: "Mathematics Olympiad Team Advances to Nationals",
    excerpt:
      "Four of our Grade 11 learners have qualified for the South African Mathematics Olympiad national round, following an exceptional performance in the provincial heats.",
    date: "April 5, 2025",
    category: "Academics",
    image: NEWS_IMAGES.academicAwards,
    author: "Mathematics Department",
  },
  {
    id: 10,
    title: "New Computer Lab Equipped with 40 Workstations",
    excerpt:
      "A generous donation from the local business community has enabled us to fully equip our second computer laboratory, doubling our IT capacity.",
    date: "January 30, 2025",
    category: "Facilities",
    image: HERO_IMAGES.classroom,
    author: "School Administration",
  },
  {
    id: 11,
    title: "Debate Society Wins Provincial Competition",
    excerpt:
      "Our school debate team returns triumphant from the KwaZulu-Natal Provincial Schools Debate Championships, defeating 24 other schools over three competitive rounds.",
    date: "May 22, 2025",
    category: "Community",
    image: NEWS_IMAGES.schoolEvent,
    author: "Debate Society",
  },
  {
    id: 12,
    title: "Open Day 2025 — Welcome Prospective Families",
    excerpt:
      "Join us on Saturday 14 June for our annual Open Day. Meet our educators, tour the campus, and discover everything Harding Secondary has to offer.",
    date: "June 1, 2025",
    category: "Events",
    image: NEWS_IMAGES.schoolEvent,
    author: "School Administration",
  },
];

const CATEGORIES = [
  { label: 'All', icon: FaNewspaper },
  { label: 'Academics', icon: FaGraduationCap },
  { label: 'Sports', icon: FaRunning },
  { label: 'Events', icon: FaCalendarAlt },
  { label: 'Community', icon: FaUsers },
  { label: 'Facilities', icon: FaBuilding },
];

const CATEGORY_STYLES = {
  Academics: 'bg-primary text-white',
  Sports: 'bg-secondary text-white',
  Facilities: 'bg-accent-info text-white',
  Community: 'bg-accent-success text-white',
  Events: 'bg-accent-warning text-white',
};

const getCategoryStyle = (category) =>
  CATEGORY_STYLES[category] || 'bg-neutral-500 text-white';

const ARTICLES_PER_PAGE = 6;

const NewsCard = ({ article, large = false }) => (
  <AnimateOnScroll animation="slide-up">
    <article className={`card card-hover h-full group flex flex-col ${large ? 'lg:flex-row' : ''}`}>
      <div
        className={`relative overflow-hidden flex-shrink-0 ${
          large ? 'lg:w-1/2 h-64 lg:h-auto' : 'h-52'
        }`}
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(
            article.category
          )}`}
        >
          {article.category}
        </span>
      </div>

      <div className={`flex flex-col flex-1 p-6 ${large ? 'lg:p-8' : ''}`}>
        <div className="flex items-center gap-2 text-neutral-400 text-xs mb-3">
          <FaCalendarAlt className="text-primary" />
          <span>{article.date}</span>
          <span className="text-neutral-300">·</span>
          <span>{article.author}</span>
        </div>

        <h2
          className={`font-heading font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug mb-3 ${
            large ? 'text-2xl md:text-3xl' : 'text-lg line-clamp-2'
          }`}
        >
          {article.title}
        </h2>

        <p className={`text-neutral-500 leading-relaxed flex-1 ${large ? 'text-base' : 'text-sm line-clamp-3'}`}>
          {article.excerpt}
        </p>

        <div className="mt-5">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
            Read Full Story <FaArrowRight className="text-xs" />
          </span>
        </div>
      </div>
    </article>
  </AnimateOnScroll>
);

const News = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const featuredArticle = NEWS_ARTICLES.find((a) => a.featured);

  const filteredArticles = NEWS_ARTICLES.filter((article) => {
    const matchesCategory =
      activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !article.featured;
  });

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(ARTICLES_PER_PAGE);
    setSearchQuery('');
  };

  const showFeatured = activeCategory === 'All' && !searchQuery;

  return (
    <>
      <SEO {...SEOConfigs.news} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
          <img
            src={NEWS_IMAGES.schoolEvent}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            aria-hidden="true"
          />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">
              Stay Informed
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              News &amp; Events
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white/90">
              The latest stories, announcements, and highlights from Harding Secondary School
            </p>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="bg-white border-b border-neutral-200 sticky top-[116px] z-30 shadow-sm">
          <div className="container-custom py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative w-full sm:w-72 flex-shrink-0">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                <input
                  type="search"
                  placeholder="Search news…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(ARTICLES_PER_PAGE);
                  }}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-neutral-200 rounded-full bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 sm:pb-0">
                {CATEGORIES.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleCategoryChange(label)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      activeCategory === label
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    <Icon className="text-xs" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">

            {/* Featured article */}
            {showFeatured && featuredArticle && (
              <div className="mb-14">
                <AnimateOnScroll animation="fade-in">
                  <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
                    Featured Story
                  </p>
                </AnimateOnScroll>
                <NewsCard article={featuredArticle} large />
              </div>
            )}

            {/* Section heading */}
            <AnimateOnScroll animation="fade-in">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-1">
                    {activeCategory === 'All' ? 'Latest Stories' : activeCategory}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-dark">
                    {searchQuery
                      ? `Search results for "${searchQuery}"`
                      : activeCategory === 'All'
                      ? 'All News & Announcements'
                      : `${activeCategory} News`}
                  </h2>
                </div>
                <span className="text-sm text-neutral-400 hidden sm:block">
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </span>
              </div>
            </AnimateOnScroll>

            {/* News grid */}
            {visibleArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {visibleArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
                      className="btn-outline inline-flex items-center gap-2"
                    >
                      Load More Stories
                      <FaChevronDown className="text-sm" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <AnimateOnScroll animation="fade-in">
                <div className="text-center py-24">
                  <FaNewspaper className="text-5xl text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-600 mb-2">No articles found</h3>
                  <p className="text-neutral-400 mb-6">
                    Try a different category or search term.
                  </p>
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className="btn-primary"
                  >
                    View All News
                  </button>
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-primary-dark">
          <img
            src={NEWS_IMAGES.community}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            aria-hidden="true"
          />
          <div className="relative z-10 container-custom text-center text-white">
            <AnimateOnScroll animation="zoom-in">
              <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">
                Never Miss an Update
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold !text-white mb-4">
                Stay Connected with Harding Secondary
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
                Get the latest news, event invitations, and school announcements delivered straight to your inbox.
              </p>
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Get in Touch <FaArrowRight className="text-sm" />
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
