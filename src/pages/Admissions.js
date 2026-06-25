import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';
import { HERO_IMAGES } from '../utils/imageConstants';

const AccordionItem = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200 hover:border-primary/30 transition-colors duration-200">
      <button
        className={`w-full px-6 py-5 flex justify-between items-center text-left transition-all duration-300 ${
          isOpen ? 'bg-primary-dark text-white' : 'bg-white text-neutral-800 hover:bg-neutral-50'
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold pr-4">{item.question}</span>
        <FaChevronDown
          className={`flex-shrink-0 transition-transform duration-300 text-sm ${
            isOpen ? 'rotate-180 text-white' : 'text-neutral-400'
          }`}
        />
      </button>
      <div
        style={{ maxHeight: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-6 py-5 text-neutral-500 leading-relaxed text-sm border-t border-neutral-100">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const STEPS = [
  {
    number: '01',
    title: 'Submit Application',
    description: 'Complete the application form and submit all required documents during the application period (May–September).',
  },
  {
    number: '02',
    title: 'Document Verification',
    description: 'Our admissions team will review your application and verify all submitted documents.',
  },
  {
    number: '03',
    title: 'Assessment',
    description: 'Qualifying learners may be invited for an assessment or interview to determine academic placement.',
  },
  {
    number: '04',
    title: 'Notification',
    description: 'Successful applicants will receive an admission letter with further enrollment instructions.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'When do applications open?',
    answer: 'Applications for the following academic year typically open in May and close in September. Late applications may be considered based on available space.',
  },
  {
    question: 'What are the school fees?',
    answer: 'As a public school, Harding Secondary School charges minimal fees. Fee structures are determined annually by the School Governing Body. Financial assistance and fee exemptions are available for qualifying families.',
  },
  {
    question: 'What documents are required?',
    answer: 'Required documents include: Birth certificate, latest academic report, transfer letter (if applicable), parent/guardian ID copies, proof of residence, and immunization records.',
  },
  {
    question: 'Is there an entrance exam?',
    answer: 'We do not have a formal entrance exam. However, learners may be assessed to determine appropriate academic support and subject placement.',
  },
  {
    question: 'Do you provide transport?',
    answer: 'While the school does not provide transport directly, we work with approved transport providers who service various routes. Contact the school office for more information.',
  },
];

const Admissions = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <>
      <SEO {...SEOConfigs.admissions} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Page Hero */}
        <section className="relative py-28 md:py-36 text-center overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.graduation}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Join Our Community</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold !text-white mb-4 text-shadow-strong">
              Admissions
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white/90">
              Join our community of excellence at Harding Secondary School
            </p>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">How to Apply</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">Application Process</h2>
                <p className="text-neutral-500 leading-relaxed max-w-2xl">
                  We welcome applications from learners committed to academic excellence and personal growth.
                  Our streamlined process ensures a smooth transition into our school community.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Steps — horizontal on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Connecting line on desktop */}
              <div
                className="absolute top-10 left-0 right-0 h-0.5 bg-primary/20 hidden lg:block"
                style={{ top: '2.5rem', left: '12.5%', right: '12.5%' }}
                aria-hidden="true"
              />
              {STEPS.map((step, index) => (
                <AnimateOnScroll key={step.number} animation="slide-up" delay={index * 100}>
                  <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-neutral-200 hover:border-primary hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-primary-dark text-white rounded-full flex items-center justify-center text-xl font-bold mb-5 shadow-lg relative z-10">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark mb-3">{step.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Requirements */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="text-center mb-12">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Eligibility</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Admission Requirements</h2>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary">
                  <h3 className="text-xl font-bold text-primary-dark mb-6">Academic Requirements</h3>
                  <ul className="space-y-4">
                    {[
                      'Satisfactory academic record from previous school',
                      'Pass mark in core subjects (50% minimum)',
                      'Good conduct report',
                      'Age-appropriate grade placement',
                    ].map((req) => (
                      <li key={req} className="flex items-start gap-3 text-neutral-600">
                        <FaCheckCircle className="text-primary text-lg flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slide-right">
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-dark">
                  <h3 className="text-xl font-bold text-primary-dark mb-6">General Requirements</h3>
                  <ul className="space-y-4">
                    {[
                      'Completed application form',
                      'All required documentation (birth certificate, ID, etc.)',
                      'Application fee payment (if applicable)',
                      'Commitment to school values and code of conduct',
                    ].map((req) => (
                      <li key={req} className="flex items-start gap-3 text-neutral-600">
                        <FaCheckCircle className="text-primary text-lg flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <AnimateOnScroll animation="fade-in">
              <div className="mb-10">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Key Details</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">Important Information</h2>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-up">
              <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl mb-10">
                <h3 className="text-xl font-bold text-primary-dark mb-6">School Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    { label: 'Exam Number', value: '5312210' },
                    { label: 'Contact', value: '039 433 1223' },
                    { label: 'Education District', value: 'Ugu' },
                    { label: 'Grades Offered', value: '8–12' },
                    { label: 'Province', value: 'KwaZulu-Natal' },
                    { label: 'Medium of Instruction', value: 'English' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <FaCheckCircle className="text-primary flex-shrink-0" />
                      <p className="text-neutral-600">
                        <span className="font-semibold text-neutral-800">{label}:</span>{' '}
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* FAQ */}
            <AnimateOnScroll animation="fade-in">
              <div className="mb-8">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Common Questions</p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-dark">
                  Frequently Asked Questions
                </h3>
              </div>
            </AnimateOnScroll>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <AnimateOnScroll key={index} animation="slide-up" delay={index * 60}>
                  <AccordionItem
                    item={item}
                    isOpen={activeAccordion === index}
                    onToggle={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-primary-dark">
          <img
            src={HERO_IMAGES.students}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative z-10 container-custom text-center text-white">
            <AnimateOnScroll animation="fade-in">
              <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-4">Take the First Step</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold !text-white mb-6">
                Ready to Apply?
              </h2>
              <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto">
                Take the first step towards joining Harding Secondary School.
                Apply online now or contact our admissions office for guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/admissions/apply"
                  className="bg-accent-neon text-primary-dark font-bold px-10 py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-xl"
                >
                  Apply Online Now
                </Link>
                <a
                  href="tel:0394331223"
                  className="bg-white text-primary-dark font-bold px-10 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 shadow-xl"
                >
                  Call: 039 433 1223
                </a>
                <a
                  href="mailto:info@hardingsecondary.edu.za"
                  className="border-2 border-white text-white font-bold px-10 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Send an Email
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admissions;
