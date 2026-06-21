import { SEO, Breadcrumbs } from '../components';
import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Harding Secondary School website ("Website"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue use of this Website. These terms apply to all visitors, including learners, parents, staff, and members of the public.`,
  },
  {
    title: '2. Purpose of the Website',
    content: `This Website is operated by Harding Secondary School for informational and educational purposes. It is intended to provide information about the school, its programmes, resources, and community, as well as to facilitate communication between the school and its stakeholders.`,
  },
  {
    title: '3. Intellectual Property',
    content: `All content on this Website — including text, images, logos, graphics, and documents — is the property of Harding Secondary School or its content providers and is protected by applicable South African copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission from the school, except for personal, non-commercial use.`,
  },
  {
    title: '4. Permitted Use',
    content: `You agree to use this Website only for lawful purposes. You must not:
    \n• Use the Website in any way that violates applicable local, national, or international laws
    \n• Transmit unsolicited commercial communications (spam)
    \n• Attempt to gain unauthorised access to any part of the Website or its server
    \n• Introduce viruses, malware, or any harmful code
    \n• Engage in any conduct that could damage, disable, or impair the Website's functionality`,
  },
  {
    title: '5. User-Submitted Content',
    content: `If you submit information via our contact or newsletter forms, you confirm that the information is accurate and that you have the right to submit it. By submitting content, you grant the school a non-exclusive right to use that content for the purposes for which it was submitted.`,
  },
  {
    title: '6. Disclaimer of Warranties',
    content: `This Website is provided on an "as is" and "as available" basis. Harding Secondary School makes no warranties, express or implied, regarding the accuracy, completeness, or availability of the content. We do not guarantee that the Website will be error-free or uninterrupted.`,
  },
  {
    title: '7. Limitation of Liability',
    content: `To the fullest extent permitted by South African law, Harding Secondary School shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this Website or its content.`,
  },
  {
    title: '8. Third-Party Links',
    content: `This Website may contain links to third-party websites (e.g., Department of Basic Education, Ugu District resources). These links are provided for convenience only. Harding Secondary School does not endorse or assume responsibility for the content or practices of any third-party website.`,
  },
  {
    title: '9. Privacy',
    content: `Your use of this Website is also governed by our Privacy Policy, which describes how we collect and handle your personal information in compliance with POPIA. Please review our Privacy Policy before submitting any personal information.`,
  },
  {
    title: '10. Modifications to Terms',
    content: `Harding Secondary School reserves the right to update or modify these Terms of Use at any time without prior notice. Changes take effect immediately upon publication. Your continued use of the Website constitutes acceptance of the revised terms.`,
  },
  {
    title: '11. Governing Law',
    content: `These Terms of Use are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from your use of this Website shall be subject to the exclusive jurisdiction of the South African courts.`,
  },
  {
    title: '12. Contact',
    content: `For questions about these Terms of Use, please contact:\n\nHarding Secondary School\nHarding, KwaZulu-Natal, South Africa\nEmail: info@hardingsecondary.edu.za\nPhone: 039 433 1223`,
  },
];

const TermsOfUse = () => (
  <>
    <SEO
      title="Terms of Use | Harding Secondary School"
      description="Read the Terms of Use governing your access to and use of the Harding Secondary School website."
    />
    <div>
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-20 bg-primary-dark text-center">
        <div className="container-custom">
          <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold !text-white mb-3">
            Terms of Use
          </h1>
          <p className="text-white/70 text-sm">Effective date: 1 January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-neutral-600 leading-relaxed mb-10 text-sm border-l-4 border-primary pl-5 bg-primary/5 py-4 pr-4 rounded-r-xl">
              Please read these Terms of Use carefully before using the Harding Secondary School website. These terms constitute a legally binding agreement between you and the school regarding your use of this Website.
            </p>

            <div className="space-y-8">
              {SECTIONS.map(({ title, content }) => (
                <div key={title}>
                  <h2 className="text-lg font-heading font-bold text-primary-dark mb-3">{title}</h2>
                  <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{content}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-neutral-400">
              <p>© {new Date().getFullYear()} Harding Secondary School. All rights reserved.</p>
              <div className="flex gap-4">
                <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default TermsOfUse;
