// pages/Admissions.js
import { useState } from 'react';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';

const Admissions = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const admissionSteps = [
    {
      number: '1',
      title: 'Submit Application',
      description: 'Complete the application form and submit all required documents during the application period.'
    },
    {
      number: '2',
      title: 'Document Verification',
      description: 'Our admissions team will review your application and verify all submitted documents.'
    },
    {
      number: '3',
      title: 'Assessment',
      description: 'Qualifying learners may be invited for an assessment or interview.'
    },
    {
      number: '4',
      title: 'Notification',
      description: 'Successful applicants will receive an admission letter with further instructions.'
    }
  ];

  const faqItems = [
    {
      question: 'When do applications open?',
      answer: 'Applications for the following academic year typically open in May and close in September. Late applications may be considered based on available space.'
    },
    {
      question: 'What are the school fees?',
      answer: 'As a public school, Harding Secondary School charges minimal fees. Fee structures are determined annually by the School Governing Body. Financial assistance and fee exemptions are available for qualifying families.'
    },
    {
      question: 'What documents are required?',
      answer: 'Required documents include: Birth certificate, latest academic report, transfer letter (if applicable), parent/guardian ID copies, proof of residence, and immunization records.'
    },
    {
      question: 'Is there an entrance exam?',
      answer: 'We do not have a formal entrance exam. However, learners may be assessed to determine appropriate academic support and subject placement.'
    },
    {
      question: 'Do you provide transport?',
      answer: 'While the school does not provide transport directly, we work with approved transport providers who service various routes. Contact the school office for more information.'
    }
  ];

  return (
    <>
      <SEO {...SEOConfigs.admissions} />
      <div>
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary-dark text-white py-16 md:py-20 lg:py-24 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 !text-white text-shadow-strong">
              Admissions
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto !text-white text-shadow-strong">
              Join our community of excellence at Harding Secondary School
            </p>
          </div>
        </section>

        {/* Application Process */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
              Application Process
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-500 mb-10 md:mb-12">
              We welcome applications from learners who are committed to academic excellence and personal growth. 
              Our streamlined application process ensures a smooth transition into our school community.
            </p>
            
            <div className="space-y-6 md:space-y-8">
              {admissionSteps.map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-neutral-50 p-6 md:p-8 rounded-xl transition-all duration-300 hover:translate-x-2 hover:shadow-md"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-dark text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-primary-dark">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Requirements */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-10 md:mb-12">
              Admission Requirements
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-l-4 border-primary-dark">
                <h3 className="text-xl md:text-2xl font-semibold mb-5 text-primary-dark">
                  Academic Requirements
                </h3>
                <ul className="space-y-3 text-neutral-500 leading-relaxed">
                  <li>Satisfactory academic record from previous school</li>
                  <li>Pass mark in core subjects (50% minimum)</li>
                  <li>Good conduct report</li>
                  <li>Age-appropriate grade placement</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-l-4 border-primary-dark">
                <h3 className="text-xl md:text-2xl font-semibold mb-5 text-primary-dark">
                  General Requirements
                </h3>
                <ul className="space-y-3 text-neutral-500 leading-relaxed">
                  <li>Completed application form</li>
                  <li>All required documentation</li>
                  <li>Application fee payment (if applicable)</li>
                  <li>Commitment to school values and code of conduct</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-dark mb-8 md:mb-10">
              Important Information
            </h2>
            
            <div className="bg-yellow-50 p-6 md:p-8 rounded-xl mb-10 md:mb-12">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-5 text-primary-dark">
                📍 School Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3">
                  <p className="text-sm md:text-base text-neutral-600">
                    <strong>Exam Number:</strong> 5312210
                  </p>
                  <p className="text-sm md:text-base text-neutral-600">
                    <strong>Education District:</strong> Ugu
                  </p>
                  <p className="text-sm md:text-base text-neutral-600">
                    <strong>Province:</strong> KwaZulu-Natal
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm md:text-base text-neutral-600">
                    <strong>Contact:</strong> 039 433 1223
                  </p>
                  <p className="text-sm md:text-base text-neutral-600">
                    <strong>Grades Offered:</strong> 8-12
                  </p>
                  <p className="text-sm md:text-base text-neutral-600">
                    <strong>Medium of Instruction:</strong> English
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-4 md:space-y-5">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                    className={`w-full px-6 md:px-8 py-5 md:py-6 flex justify-between items-center text-left transition-all duration-300 ${
                      activeAccordion === index
                        ? 'bg-primary-dark text-white'
                        : 'bg-neutral-50 text-black hover:bg-neutral-100'
                    }`}
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  >
                    <span className="text-base md:text-lg font-semibold pr-4">{item.question}</span>
                    <span className="text-2xl md:text-3xl flex-shrink-0">
                      {activeAccordion === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeAccordion === index && (
                    <div className="px-6 md:px-8 py-5 md:py-6 bg-white text-neutral-500 leading-relaxed text-sm md:text-base">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-16 md:pb-20">
          <div className="container-custom">
            <div className="bg-primary-dark text-white p-8 md:p-12 lg:p-16 rounded-xl text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-5 md:mb-6">
                Ready to Apply?
              </h2>
              <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-3xl mx-auto">
                Take the first step towards joining Harding Secondary School. 
                Contact our admissions office for application forms and guidance.
              </p>
              <a 
                href="tel:0394331223" 
                className="inline-block px-8 md:px-10 py-3 md:py-4 bg-white text-primary-dark rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                Call Us: 039 433 1223
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admissions;