// pages/Admissions.js
import React, { useState } from 'react';
import { SEO, SEOConfigs } from '../components';

const Admissions = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const pageStyles = {
    paddingTop: '40px'
  };

  const heroSectionStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '80px 20px',
    textAlign: 'center'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const sectionStyles = {
    padding: '80px 20px'
  };

  const headingStyles = {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '20px'
  };

  const subHeadingStyles = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#19467E',
    marginBottom: '30px'
  };

  const processStepStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: '#F9F9F9',
    padding: '30px',
    borderRadius: '12px',
    transition: 'all 0.3s ease'
  };

  const stepNumberStyles = {
    width: '60px',
    height: '60px',
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '700',
    marginRight: '30px',
    flexShrink: 0
  };

  const accordionStyles = {
    marginBottom: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  };

  const accordionHeaderStyles = {
    padding: '25px 30px',
    backgroundColor: '#F9F9F9',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontSize: '20px',
    fontWeight: '600',
    color: '#333'
  };

  const accordionContentStyles = {
    padding: '30px',
    backgroundColor: '#FFFFFF',
    lineHeight: '1.8',
    color: '#666'
  };

  const requirementCardStyles = {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '20px',
    borderLeft: '4px solid #19467E'
  };

  const ctaBoxStyles = {
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    padding: '60px 40px',
    borderRadius: '12px',
    textAlign: 'center',
    marginTop: '60px'
  };

  const buttonStyles = {
    display: 'inline-block',
    backgroundColor: '#FFFFFF',
    color: '#19467E',
    padding: '15px 40px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginTop: '20px'
  };

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
      <div style={pageStyles}>
        {/* Hero Section */}
      <section style={heroSectionStyles}>
        <div style={containerStyles}>
          <h1 style={headingStyles}>Admissions</h1>
          <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto' }}>
            Join our community of excellence at Harding Secondary School
          </p>
        </div>
      </section>

      {/* Application Process */}
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={subHeadingStyles}>Application Process</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666', marginBottom: '40px' }}>
          We welcome applications from learners who are committed to academic excellence and personal growth. 
          Our streamlined application process ensures a smooth transition into our school community.
        </p>
        
        {admissionSteps.map((step, index) => (
          <div 
            key={index}
            style={processStepStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(10px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={stepNumberStyles}>{step.number}</div>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#19467E' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Admission Requirements */}
      <section style={{ backgroundColor: '#F9F9F9', ...sectionStyles }}>
        <div style={containerStyles}>
          <h2 style={subHeadingStyles}>Admission Requirements</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
            <div style={requirementCardStyles}>
              <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#19467E' }}>
                Academic Requirements
              </h3>
              <ul style={{ lineHeight: '2', color: '#666' }}>
                <li>Satisfactory academic record from previous school</li>
                <li>Pass mark in core subjects (50% minimum)</li>
                <li>Good conduct report</li>
                <li>Age-appropriate grade placement</li>
              </ul>
            </div>
            
            <div style={requirementCardStyles}>
              <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#19467E' }}>
                General Requirements
              </h3>
              <ul style={{ lineHeight: '2', color: '#666' }}>
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
      <section style={{ ...sectionStyles, ...containerStyles }}>
        <h2 style={subHeadingStyles}>Important Information</h2>
        
        <div style={{ backgroundColor: '#FFF9E6', padding: '30px', borderRadius: '12px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#19467E' }}>
            📍 School Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                <strong>Exam Number:</strong> 5312210
              </p>
              <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                <strong>Education District:</strong> Ugu
              </p>
              <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                <strong>Province:</strong> KwaZulu-Natal
              </p>
            </div>
            <div>
              <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                <strong>Contact:</strong> 039 433 1223
              </p>
              <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                <strong>Grades Offered:</strong> 8-12
              </p>
              <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                <strong>Medium of Instruction:</strong> English
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <h3 style={{ fontSize: '28px', marginBottom: '30px', color: '#19467E' }}>
          Frequently Asked Questions
        </h3>
        
        {faqItems.map((item, index) => (
          <div key={index} style={accordionStyles}>
            <button
              style={{
                ...accordionHeaderStyles,
                backgroundColor: activeAccordion === index ? '#19467E' : '#F9F9F9',
                color: activeAccordion === index ? '#FFFFFF' : '#333'
              }}
              onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
            >
              <span>{item.question}</span>
              <span style={{ fontSize: '24px' }}>
                {activeAccordion === index ? '−' : '+'}
              </span>
            </button>
            {activeAccordion === index && (
              <div style={accordionContentStyles}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section style={{ ...containerStyles, paddingBottom: '80px' }}>
        <div style={ctaBoxStyles}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
            Ready to Apply?
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto' }}>
            Take the first step towards joining Harding Secondary School. 
            Contact our admissions office for application forms and guidance.
          </p>
          <a 
            href="tel:0394331223" 
            style={buttonStyles}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F0F0F0';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Call Us: 039 433 1223
          </a>
        </div>
      </section>
      </div>
    </>
  );
};

export default Admissions;