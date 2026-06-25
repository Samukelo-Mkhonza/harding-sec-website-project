import { FaFileAlt, FaDownload, FaSearch, FaShieldAlt, FaUserGraduate, FaChalkboardTeacher, FaRunning } from 'react-icons/fa';
import { useState } from 'react';
import { SEO, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { HERO_IMAGES } from '../utils/imageConstants';

const DOCUMENTS = [
  {
    category: 'Learner Policies',
    Icon: FaUserGraduate,
    color: 'text-primary bg-primary/10',
    docs: [
      { title: 'Code of Conduct for Learners', updated: 'January 2025', size: '1.2 MB' },
      { title: 'Disciplinary Procedure Policy', updated: 'January 2025', size: '0.8 MB' },
      { title: 'Uniform Policy', updated: 'January 2025', size: '0.5 MB' },
      { title: 'Device & Cellphone Usage Policy', updated: 'March 2024', size: '0.4 MB' },
    ],
  },
  {
    category: 'Academic Policies',
    Icon: FaChalkboardTeacher,
    color: 'text-blue-600 bg-blue-100',
    docs: [
      { title: 'Assessment Policy (CAPS Aligned)', updated: 'January 2025', size: '2.1 MB' },
      { title: 'Promotion & Retention Policy', updated: 'January 2025', size: '1.0 MB' },
      { title: 'Homework & Classwork Policy', updated: 'June 2024', size: '0.6 MB' },
      { title: 'Academic Integrity & Plagiarism Policy', updated: 'January 2025', size: '0.7 MB' },
    ],
  },
  {
    category: 'Safety & Wellness',
    Icon: FaShieldAlt,
    color: 'text-red-600 bg-red-100',
    docs: [
      { title: 'Health & Safety Policy', updated: 'January 2025', size: '1.5 MB' },
      { title: 'Anti-Bullying & Harassment Policy', updated: 'January 2025', size: '0.9 MB' },
      { title: 'Substance Abuse Policy', updated: 'March 2024', size: '0.7 MB' },
      { title: 'Learner Support & Inclusion Policy', updated: 'January 2025', size: '1.2 MB' },
    ],
  },
  {
    category: 'Sports & Activities',
    Icon: FaRunning,
    color: 'text-orange-500 bg-orange-100',
    docs: [
      { title: 'Extracurricular Activities Policy', updated: 'February 2025', size: '0.8 MB' },
      { title: 'School Sports Code of Conduct', updated: 'February 2025', size: '0.6 MB' },
      { title: 'Cultural Events Participation Policy', updated: 'February 2025', size: '0.5 MB' },
    ],
  },
];

const Policies = () => {
  const [search, setSearch] = useState('');

  const filtered = DOCUMENTS.map((cat) => ({
    ...cat,
    docs: cat.docs.filter((d) =>
      d.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.docs.length > 0);

  return (
    <>
      <SEO
        title="Policies & Documents | Harding Secondary School"
        description="Access official school policies and documents for Harding Secondary School including code of conduct, assessment policies, and safety guidelines."
      />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.library}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Official Documents</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4">
              Policies & Documents
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto !text-white/90">
              Official school policies, guidelines, and downloadable documents
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 bg-white border-b border-neutral-100">
          <div className="container-custom">
            <div className="max-w-lg mx-auto relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search policies and documents..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <FaFileAlt className="text-5xl text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">No documents match your search.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {filtered.map(({ category, Icon, color, docs }) => (
                  <AnimateOnScroll key={category} animation="fade-up">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                          <Icon />
                        </div>
                        <h2 className="text-xl font-heading font-bold text-primary-dark">{category}</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {docs.map(({ title, updated, size }) => (
                          <div
                            key={title}
                            className="flex items-center justify-between gap-4 bg-white border border-neutral-100 rounded-xl px-5 py-4 hover:border-primary/30 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <FaFileAlt className="text-neutral-400 text-lg flex-shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-neutral-800 leading-snug">{title}</p>
                                <p className="text-xs text-neutral-400 mt-0.5">Updated: {updated} · PDF · {size}</p>
                              </div>
                            </div>
                            <button
                              title={`Download ${title}`}
                              className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center"
                            >
                              <FaDownload className="text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            )}

            <div className="mt-12 p-5 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 max-w-2xl mx-auto text-center">
              <p className="font-semibold mb-1">Need a specific document?</p>
              <p>If you cannot find the document you need, contact the school's administrative office on <a href="tel:0394331223" className="underline font-medium">039 433 1223</a>.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Policies;
