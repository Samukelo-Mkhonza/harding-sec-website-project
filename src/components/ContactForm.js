import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  const formStyles = {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  };

  const inputStyles = {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    border: '2px solid #E0E0E0',
    borderRadius: '6px',
    fontSize: '16px',
    fontFamily: "'Open Sans', sans-serif",
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const textareaStyles = {
    ...inputStyles,
    minHeight: '150px',
    resize: 'vertical'
  };

  const buttonStyles = {
    width: '100%',
    padding: '15px',
    backgroundColor: '#19467E',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={formStyles}>
      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#19467E', marginBottom: '30px' }}>
        Send Us a Message
      </h2>
      
      {status === 'success' && (
        <div style={{
          padding: '15px',
          backgroundColor: '#00A651',
          color: '#FFFFFF',
          borderRadius: '6px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Thank you! Your message has been sent successfully.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyles}
          onFocus={(e) => e.target.style.borderColor = '#19467E'}
          onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyles}
          onFocus={(e) => e.target.style.borderColor = '#19467E'}
          onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyles}
          onFocus={(e) => e.target.style.borderColor = '#19467E'}
          onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject *"
          value={formData.subject}
          onChange={handleChange}
          required
          style={inputStyles}
          onFocus={(e) => e.target.style.borderColor = '#19467E'}
          onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
        />

        <textarea
          name="message"
          placeholder="Your Message *"
          value={formData.message}
          onChange={handleChange}
          required
          style={textareaStyles}
          onFocus={(e) => e.target.style.borderColor = '#19467E'}
          onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
        />

        <button
          type="submit"
          style={buttonStyles}
          disabled={status === 'sending'}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0D3F2F'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#19467E'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
