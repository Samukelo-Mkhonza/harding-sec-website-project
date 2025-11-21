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

  return (
    <div className="bg-white p-8 md:p-10 lg:p-12 rounded-xl shadow-lg">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary-dark mb-6 md:mb-8">
        Send Us a Message
      </h2>
      
      {status === 'success' && (
        <div className="p-4 md:p-5 bg-accent-neon text-white rounded-lg mb-6 md:mb-8 text-center font-medium">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-neutral-200 rounded-lg text-base md:text-lg font-body transition-all duration-300 focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/20 hover:border-neutral-300"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-neutral-200 rounded-lg text-base md:text-lg font-body transition-all duration-300 focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/20 hover:border-neutral-300"
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-neutral-200 rounded-lg text-base md:text-lg font-body transition-all duration-300 focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/20 hover:border-neutral-300"
          />
        </div>

        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-neutral-200 rounded-lg text-base md:text-lg font-body transition-all duration-300 focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/20 hover:border-neutral-300"
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-neutral-200 rounded-lg text-base md:text-lg font-body transition-all duration-300 focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark/20 hover:border-neutral-300 resize-vertical min-h-[150px]"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-6 md:px-8 py-3 md:py-4 bg-primary-dark text-white rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:bg-primary hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md hover:shadow-lg"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
