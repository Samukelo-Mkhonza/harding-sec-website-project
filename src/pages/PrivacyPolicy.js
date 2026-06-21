import { SEO, Breadcrumbs } from '../components';
import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect personal information that you voluntarily provide when you interact with our website or contact the school. This may include:
    \n• Full name, email address, and phone number (submitted via our contact or newsletter forms)
    \n• Learner and parent information provided during the admissions process
    \n• Information submitted through the Past Papers Portal, including account credentials
    \n• Technical data such as IP address, browser type, and pages visited (collected automatically via cookies or analytics tools)`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
    \n• Respond to enquiries and provide requested information about the school
    \n• Process admissions applications and communicate with applicants and parents
    \n• Send newsletters and updates to subscribers (with your consent)
    \n• Improve the functionality and user experience of this website
    \n• Comply with legal and regulatory obligations under South African law`,
  },
  {
    title: '3. Sharing of Information',
    content: `We do not sell, rent, or trade your personal information to third parties. We may share your information with:
    \n• The Department of Basic Education and the Ugu Education District, as required by law
    \n• Our School Governing Body (SGB) for governance purposes
    \n• Service providers who assist us in operating this website, subject to confidentiality agreements
    \n• Law enforcement or regulatory bodies where required by South African legislation`,
  },
  {
    title: '4. Cookies',
    content: `This website may use cookies to enhance your browsing experience. Cookies are small text files stored on your device. You can disable cookies in your browser settings, but this may affect certain website functionality. We use cookies strictly for operational and analytical purposes — not for advertising or profiling.`,
  },
  {
    title: '5. Data Security',
    content: `We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or disclosure. However, no method of transmission over the internet is 100% secure. We encourage you to contact us immediately if you suspect any unauthorised use of your information.`,
  },
  {
    title: '6. Your Rights (POPIA)',
    content: `In accordance with the Protection of Personal Information Act (POPIA) No. 4 of 2013, you have the right to:
    \n• Access the personal information we hold about you
    \n• Request correction of inaccurate or outdated information
    \n• Request deletion of your personal information, subject to legal retention requirements
    \n• Object to the processing of your information in certain circumstances
    \n• Lodge a complaint with the Information Regulator of South Africa
    \nTo exercise any of these rights, please contact us using the details below.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `As a secondary school, we handle information relating to learners who may be under 18 years of age. We process learner information solely for educational and administrative purposes in compliance with the Children's Act No. 38 of 2005 and POPIA. Parental consent is obtained where required.`,
  },
  {
    title: '8. Third-Party Links',
    content: `Our website may contain links to external websites (e.g., the Department of Basic Education, DBE). We are not responsible for the privacy practices or content of those sites and encourage you to review their respective privacy policies.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. Continued use of the website following such changes constitutes your acceptance of the revised policy.`,
  },
  {
    title: '10. Contact & Complaints',
    content: `If you have questions or concerns about this Privacy Policy, or wish to exercise your POPIA rights, please contact:\n\nHarding Secondary School — Information Officer\nAddress: Harding, KwaZulu-Natal, South Africa\nEmail: info@hardingsecondary.edu.za\nPhone: 039 433 1223`,
  },
];

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy | Harding Secondary School"
      description="Read the Privacy Policy for Harding Secondary School's website, including how we collect, use, and protect your personal information under POPIA."
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
            Privacy Policy
          </h1>
          <p className="text-white/70 text-sm">Effective date: 1 January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-neutral-600 leading-relaxed mb-10 text-sm border-l-4 border-primary pl-5 bg-primary/5 py-4 pr-4 rounded-r-xl">
              Harding Secondary School ("the School", "we", "us", or "our") is committed to protecting your privacy in accordance with the <strong>Protection of Personal Information Act (POPIA) No. 4 of 2013</strong>. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or interact with our school.
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
                <Link to="/terms-of-use" className="text-primary hover:underline">Terms of Use</Link>
                <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default PrivacyPolicy;
