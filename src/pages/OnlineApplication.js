import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser, FaUsers, FaGraduationCap, FaClipboardCheck,
  FaCheckCircle, FaArrowRight, FaArrowLeft, FaPrint,
} from 'react-icons/fa';
import { SEO, SEOConfigs, Breadcrumbs } from '../components';
import AnimateOnScroll from '../components/AnimateOnScroll';

// ─── Constants ────────────────────────────────────────────────────────────────

const GRADES = [
  { value: 'Grade 8',  label: 'Grade 8 — Standard Intake' },
  { value: 'Grade 9',  label: 'Grade 9' },
  { value: 'Grade 10', label: 'Grade 10' },
  { value: 'Grade 11', label: 'Grade 11' },
  { value: 'Grade 12', label: 'Grade 12 (Matric)' },
];

const PREV_GRADES = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const HOME_LANGUAGES = ['English', 'isiZulu', 'isiXhosa', 'Afrikaans', 'Sesotho', 'Setswana', 'Sepedi', 'Other'];

const GENDERS = ['Male', 'Female', 'Prefer not to say'];

const RELATIONSHIPS = ['Mother', 'Father', 'Legal Guardian', 'Grandparent', 'Sibling (18+)', 'Other'];

const CURRENT_YEAR = new Date().getFullYear();
const REPORT_YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2, CURRENT_YEAR - 3, CURRENT_YEAR - 4];

const STEPS = [
  { id: 1, label: 'Learner Details',   icon: FaUser },
  { id: 2, label: 'Guardian Details',  icon: FaUsers },
  { id: 3, label: 'Academic History',  icon: FaGraduationCap },
  { id: 4, label: 'Review & Submit',   icon: FaClipboardCheck },
];

const REQUIRED_DOCS = [
  'Certified copy of birth certificate',
  'Certified copy of parent/guardian ID',
  'Latest school report (original)',
  'Proof of residential address (utility bill / affidavit)',
  'Transfer letter from previous school (if applicable)',
  'Immunisation card',
];

const INITIAL_FORM = {
  gradeApplying: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  homeLanguage: '',
  idNumber: '',
  guardianName: '',
  guardianRelationship: '',
  guardianCell: '',
  guardianAltPhone: '',
  guardianEmail: '',
  streetAddress: '',
  suburb: '',
  postalCode: '',
  previousSchool: '',
  previousGrade: '',
  lastYear: String(CURRENT_YEAR),
  averageMark: '',
  reasonForLeaving: '',
  specialNeeds: '',
  confirmAccuracy: false,
  confirmRequirements: false,
};

// ─── Utilities ────────────────────────────────────────────────────────────────

const generateRef = () => {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HSS-${CURRENT_YEAR}-${rand}`;
};

const cls = (hasError) =>
  `w-full px-4 py-2.5 rounded-lg border text-sm text-neutral-800 bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors ${
    hasError ? 'border-red-400 bg-red-50' : 'border-neutral-300 hover:border-neutral-400'
  }`;

// ─── Small helpers ────────────────────────────────────────────────────────────

const Field = ({ label, required, error, className = '', children }) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1.5" role="alert">{error}</p>}
  </div>
);

const ReviewCard = ({ title, children }) => (
  <div className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
    <div className="bg-primary-dark/5 px-4 py-3 border-b border-neutral-200">
      <h4 className="text-sm font-bold text-primary-dark">{title}</h4>
    </div>
    <div className="divide-y divide-neutral-100">{children}</div>
  </div>
);

const ReviewRow = ({ label, value }) => (
  <div className="px-4 py-2.5 flex justify-between gap-4 text-sm">
    <span className="text-neutral-500 flex-shrink-0">{label}</span>
    <span className="text-neutral-800 font-medium text-right">{value || '—'}</span>
  </div>
);

// ─── Step 1: Learner Details ──────────────────────────────────────────────────

const StepLearner = ({ form, onChange, errors }) => (
  <div className="space-y-5">
    <Field label="Grade Applying For" required error={errors.gradeApplying}>
      <select
        value={form.gradeApplying}
        onChange={(e) => onChange('gradeApplying', e.target.value)}
        className={cls(errors.gradeApplying)}
      >
        <option value="">Select a grade…</option>
        {GRADES.map((g) => (
          <option key={g.value} value={g.value}>{g.label}</option>
        ))}
      </select>
    </Field>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="First Name(s)" required error={errors.firstName}>
        <input
          type="text"
          placeholder="e.g. Thabo"
          value={form.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          className={cls(errors.firstName)}
        />
      </Field>
      <Field label="Surname" required error={errors.lastName}>
        <input
          type="text"
          placeholder="e.g. Dlamini"
          value={form.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          className={cls(errors.lastName)}
        />
      </Field>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Date of Birth" required error={errors.dateOfBirth}>
        <input
          type="date"
          value={form.dateOfBirth}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => onChange('dateOfBirth', e.target.value)}
          className={cls(errors.dateOfBirth)}
        />
      </Field>
      <Field label="Gender" required error={errors.gender}>
        <select
          value={form.gender}
          onChange={(e) => onChange('gender', e.target.value)}
          className={cls(errors.gender)}
        >
          <option value="">Select…</option>
          {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </Field>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Home Language" required error={errors.homeLanguage}>
        <select
          value={form.homeLanguage}
          onChange={(e) => onChange('homeLanguage', e.target.value)}
          className={cls(errors.homeLanguage)}
        >
          <option value="">Select…</option>
          {HOME_LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </Field>
      <Field label="SA ID / Birth Certificate Number" required error={errors.idNumber}>
        <input
          type="text"
          placeholder="e.g. 0601015800086"
          value={form.idNumber}
          onChange={(e) => onChange('idNumber', e.target.value)}
          className={cls(errors.idNumber)}
        />
      </Field>
    </div>
  </div>
);

// ─── Step 2: Guardian Details ─────────────────────────────────────────────────

const StepGuardian = ({ form, onChange, errors }) => (
  <div className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Full Name" required error={errors.guardianName} className="sm:col-span-2">
        <input
          type="text"
          placeholder="Parent or guardian full name"
          value={form.guardianName}
          onChange={(e) => onChange('guardianName', e.target.value)}
          className={cls(errors.guardianName)}
        />
      </Field>
      <Field label="Relationship to Learner" required error={errors.guardianRelationship}>
        <select
          value={form.guardianRelationship}
          onChange={(e) => onChange('guardianRelationship', e.target.value)}
          className={cls(errors.guardianRelationship)}
        >
          <option value="">Select…</option>
          {RELATIONSHIPS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </Field>
      <Field label="Cell Number" required error={errors.guardianCell}>
        <input
          type="tel"
          placeholder="e.g. 082 000 0000"
          value={form.guardianCell}
          onChange={(e) => onChange('guardianCell', e.target.value)}
          className={cls(errors.guardianCell)}
        />
      </Field>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Alternative Phone" error={errors.guardianAltPhone}>
        <input
          type="tel"
          placeholder="Optional"
          value={form.guardianAltPhone}
          onChange={(e) => onChange('guardianAltPhone', e.target.value)}
          className={cls(false)}
        />
      </Field>
      <Field label="Email Address" required error={errors.guardianEmail}>
        <input
          type="email"
          placeholder="e.g. parent@email.com"
          value={form.guardianEmail}
          onChange={(e) => onChange('guardianEmail', e.target.value)}
          className={cls(errors.guardianEmail)}
        />
      </Field>
    </div>

    <div className="border-t border-neutral-100 pt-5">
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Residential Address</p>
      <div className="space-y-4">
        <Field label="Street Address" required error={errors.streetAddress}>
          <input
            type="text"
            placeholder="Street number and name"
            value={form.streetAddress}
            onChange={(e) => onChange('streetAddress', e.target.value)}
            className={cls(errors.streetAddress)}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Suburb / Town" required error={errors.suburb}>
            <input
              type="text"
              placeholder="e.g. Harding"
              value={form.suburb}
              onChange={(e) => onChange('suburb', e.target.value)}
              className={cls(errors.suburb)}
            />
          </Field>
          <Field label="Postal Code" required error={errors.postalCode}>
            <input
              type="text"
              placeholder="e.g. 4680"
              value={form.postalCode}
              onChange={(e) => onChange('postalCode', e.target.value)}
              className={cls(errors.postalCode)}
            />
          </Field>
        </div>
      </div>
    </div>
  </div>
);

// ─── Step 3: Academic History ─────────────────────────────────────────────────

const StepAcademic = ({ form, onChange, errors }) => (
  <div className="space-y-5">
    <Field label="Name of Previous / Current School" required error={errors.previousSchool}>
      <input
        type="text"
        placeholder="Full school name"
        value={form.previousSchool}
        onChange={(e) => onChange('previousSchool', e.target.value)}
        className={cls(errors.previousSchool)}
      />
    </Field>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <Field label="Current / Last Grade" required error={errors.previousGrade}>
        <select
          value={form.previousGrade}
          onChange={(e) => onChange('previousGrade', e.target.value)}
          className={cls(errors.previousGrade)}
        >
          <option value="">Select…</option>
          {PREV_GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </Field>
      <Field label="Year of Last Report" required error={errors.lastYear}>
        <select
          value={form.lastYear}
          onChange={(e) => onChange('lastYear', e.target.value)}
          className={cls(errors.lastYear)}
        >
          {REPORT_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </Field>
      <Field label="Overall Average (%)" required error={errors.averageMark}>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="e.g. 65"
          value={form.averageMark}
          onChange={(e) => onChange('averageMark', e.target.value)}
          className={cls(errors.averageMark)}
        />
      </Field>
    </div>

    <Field label="Reason for Leaving / Transferring" error={errors.reasonForLeaving}>
      <textarea
        rows={3}
        placeholder="Briefly explain if you are transferring from another school…"
        value={form.reasonForLeaving}
        onChange={(e) => onChange('reasonForLeaving', e.target.value)}
        className={`${cls(false)} resize-none`}
      />
    </Field>

    <Field label="Special Educational Needs or Support Requirements" error={errors.specialNeeds}>
      <textarea
        rows={3}
        placeholder="Disclose any learning difficulties, disability, or support needs. This helps us prepare appropriate support. (Optional)"
        value={form.specialNeeds}
        onChange={(e) => onChange('specialNeeds', e.target.value)}
        className={`${cls(false)} resize-none`}
      />
    </Field>
  </div>
);

// ─── Step 4: Review & Submit ──────────────────────────────────────────────────

const StepReview = ({ form, onChange, errors }) => (
  <div className="space-y-6">
    <div className="space-y-4">
      <ReviewCard title="Learner Information">
        <ReviewRow label="Grade Applying For"   value={form.gradeApplying} />
        <ReviewRow label="Full Name"             value={`${form.firstName} ${form.lastName}`} />
        <ReviewRow label="Date of Birth"         value={form.dateOfBirth} />
        <ReviewRow label="Gender"                value={form.gender} />
        <ReviewRow label="Home Language"         value={form.homeLanguage} />
        <ReviewRow label="ID / Birth Certificate" value={form.idNumber} />
      </ReviewCard>

      <ReviewCard title="Parent / Guardian">
        <ReviewRow label="Name"         value={form.guardianName} />
        <ReviewRow label="Relationship" value={form.guardianRelationship} />
        <ReviewRow label="Cell"         value={form.guardianCell} />
        <ReviewRow label="Email"        value={form.guardianEmail} />
        <ReviewRow label="Address"      value={[form.streetAddress, form.suburb, form.postalCode].filter(Boolean).join(', ')} />
      </ReviewCard>

      <ReviewCard title="Academic Background">
        <ReviewRow label="Previous School"  value={form.previousSchool} />
        <ReviewRow label="Last Grade"        value={form.previousGrade} />
        <ReviewRow label="Year"              value={form.lastYear} />
        <ReviewRow label="Average Mark"      value={form.averageMark ? `${form.averageMark}%` : ''} />
      </ReviewCard>
    </div>

    {/* Required documents notice */}
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
      <p className="font-bold text-amber-800 mb-3 text-sm">
        Documents to bring when visiting the school office:
      </p>
      <ul className="space-y-1.5">
        {REQUIRED_DOCS.map((doc) => (
          <li key={doc} className="flex items-start gap-2 text-sm text-amber-700">
            <FaCheckCircle className="text-amber-500 flex-shrink-0 mt-0.5 text-xs" />
            {doc}
          </li>
        ))}
      </ul>
    </div>

    {/* Declarations */}
    <div className="space-y-3">
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.confirmAccuracy}
            onChange={(e) => onChange('confirmAccuracy', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-primary"
          />
          <span className="text-sm text-neutral-700">
            I confirm that all information provided is accurate and complete to the best of my knowledge.
            <span className="text-red-500 ml-1">*</span>
          </span>
        </label>
        {errors.confirmAccuracy && (
          <p className="text-red-500 text-xs mt-1 ml-7" role="alert">{errors.confirmAccuracy}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.confirmRequirements}
            onChange={(e) => onChange('confirmRequirements', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-primary"
          />
          <span className="text-sm text-neutral-700">
            I have read and understood the{' '}
            <Link to="/admissions" className="text-primary underline hover:text-primary-dark">
              admission requirements
            </Link>{' '}
            and agree to abide by the school's code of conduct.
            <span className="text-red-500 ml-1">*</span>
          </span>
        </label>
        {errors.confirmRequirements && (
          <p className="text-red-500 text-xs mt-1 ml-7" role="alert">{errors.confirmRequirements}</p>
        )}
      </div>
    </div>
  </div>
);

// ─── Success Screen ───────────────────────────────────────────────────────────

const SuccessScreen = ({ refNumber, form }) => (
  <div className="text-center py-8 px-4">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
      <FaCheckCircle className="text-primary text-4xl" />
    </div>

    <h2 className="text-2xl font-bold text-primary-dark mb-2">Application Received!</h2>
    <p className="text-neutral-500 mb-8 max-w-md mx-auto">
      Thank you, <strong className="text-neutral-700">{form.firstName} {form.lastName}</strong>.
      Your online application for <strong className="text-neutral-700">{form.gradeApplying}</strong> has been submitted.
    </p>

    <div className="bg-primary-dark text-white rounded-2xl px-10 py-6 inline-block mb-10 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">Application Reference Number</p>
      <p className="text-3xl font-mono font-bold tracking-widest">{refNumber}</p>
      <p className="text-xs text-white/60 mt-1">Please keep this reference for your records</p>
    </div>

    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-left mb-8 max-w-lg mx-auto">
      <p className="font-bold text-neutral-800 mb-4">What happens next?</p>
      <ol className="space-y-3">
        {[
          'Save or print your application reference number.',
          'Gather all the required documents listed above.',
          'Visit the school admissions office during working hours (Mon–Fri, 07:30–14:30) to submit your documents.',
          'Our admissions team will review your application within 5–10 working days.',
          'Successful applicants will receive an official admission letter via post or email.',
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>

    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={() => window.print()}
        className="flex items-center justify-center gap-2 bg-neutral-100 text-neutral-700 font-semibold px-6 py-3 rounded-lg hover:bg-neutral-200 transition-colors"
      >
        <FaPrint /> Print Confirmation
      </button>
      <Link
        to="/admissions"
        className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Back to Admissions
      </Link>
    </div>
  </div>
);

// ─── Validation ───────────────────────────────────────────────────────────────

const validateStep = (step, form) => {
  const e = {};
  const req = (key, msg = 'This field is required.') => { if (!form[key] || !String(form[key]).trim()) e[key] = msg; };

  if (step === 1) {
    req('gradeApplying', 'Please select a grade.');
    req('firstName');
    req('lastName');
    req('dateOfBirth');
    req('gender');
    req('homeLanguage');
    req('idNumber');
  }

  if (step === 2) {
    req('guardianName');
    req('guardianRelationship');
    req('guardianCell');
    req('guardianEmail');
    if (form.guardianEmail && !/\S+@\S+\.\S+/.test(form.guardianEmail))
      e.guardianEmail = 'Please enter a valid email address.';
    req('streetAddress');
    req('suburb');
    req('postalCode');
  }

  if (step === 3) {
    req('previousSchool');
    req('previousGrade', 'Please select a grade.');
    req('lastYear');
    req('averageMark');
    if (form.averageMark) {
      const n = Number(form.averageMark);
      if (isNaN(n) || n < 0 || n > 100)
        e.averageMark = 'Enter a valid percentage between 0 and 100.';
    }
  }

  if (step === 4) {
    if (!form.confirmAccuracy)
      e.confirmAccuracy = 'Please confirm the accuracy of your information.';
    if (!form.confirmRequirements)
      e.confirmRequirements = 'Please agree to the admission requirements.';
  }

  return e;
};

// ─── Main Component ───────────────────────────────────────────────────────────

const OnlineApplication = () => {
  const [step, setStep]         = useState(1);
  const [form, setForm]         = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [refNumber]             = useState(() => generateRef());

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep((s) => s + 1);
    scrollUp();
  };

  const back = () => {
    setErrors({});
    setStep((s) => s - 1);
    scrollUp();
  };

  const submit = () => {
    const e = validateStep(4, form);
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    scrollUp();
  };

  const stepComponents = {
    1: <StepLearner  form={form} onChange={onChange} errors={errors} />,
    2: <StepGuardian form={form} onChange={onChange} errors={errors} />,
    3: <StepAcademic form={form} onChange={onChange} errors={errors} />,
    4: <StepReview   form={form} onChange={onChange} errors={errors} />,
  };

  return (
    <>
      <SEO {...SEOConfigs.onlineApplication} />
      <div>
        <div className="bg-white">
          <Breadcrumbs />
        </div>

        {/* Hero */}
        <section className="py-16 md:py-20 bg-primary-dark text-center">
          <div className="container-custom">
            <p className="text-accent-neon font-semibold text-sm tracking-widest uppercase mb-3">
              {CURRENT_YEAR + 1} Intake Now Open
            </p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3">
              Online Application
            </h1>
            <p className="text-white/80 text-lg">
              Grades 8 – 12 &nbsp;·&nbsp; Harding Secondary School
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-neutral-50 min-h-screen">
          <div className="container-custom max-w-3xl mx-auto">
            {submitted ? (
              <AnimateOnScroll animation="fade-in">
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-10">
                  <SuccessScreen refNumber={refNumber} form={form} />
                </div>
              </AnimateOnScroll>
            ) : (
              <>
                {/* Step progress indicator */}
                <div className="mb-8">
                  <div className="flex items-center">
                    {STEPS.map((s, i) => {
                      const Icon     = s.icon;
                      const isComplete = step > s.id;
                      const isCurrent  = step === s.id;
                      return (
                        <div key={s.id} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                                isComplete
                                  ? 'bg-primary text-white'
                                  : isCurrent
                                  ? 'bg-primary-dark text-white ring-4 ring-primary/20'
                                  : 'bg-white text-neutral-400 border-2 border-neutral-200'
                              }`}
                            >
                              {isComplete ? <FaCheckCircle /> : <Icon />}
                            </div>
                            <span
                              className={`text-xs mt-1.5 font-medium hidden sm:block whitespace-nowrap ${
                                isCurrent  ? 'text-primary-dark' :
                                isComplete ? 'text-primary'      : 'text-neutral-400'
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div
                              className={`flex-1 h-0.5 mx-2 mb-5 sm:mb-0 transition-colors duration-300 ${
                                step > s.id ? 'bg-primary' : 'bg-neutral-200'
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form card */}
                <AnimateOnScroll animation="fade-in" key={step}>
                  <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                    {/* Card header */}
                    <div className="bg-primary-dark/5 border-b border-neutral-200 px-6 py-4">
                      <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                        Step {step} of {STEPS.length}
                      </p>
                      <h2 className="text-xl font-bold text-primary-dark mt-0.5">
                        {STEPS[step - 1].label}
                      </h2>
                    </div>

                    {/* Fields */}
                    <div className="p-6 md:p-8">
                      {stepComponents[step]}
                    </div>

                    {/* Navigation */}
                    <div className="px-6 md:px-8 pb-6 md:pb-8 flex justify-between items-center gap-4 border-t border-neutral-100 pt-6">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={back}
                          className="flex items-center gap-2 text-neutral-600 font-semibold px-5 py-2.5 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-colors"
                        >
                          <FaArrowLeft className="text-xs" /> Back
                        </button>
                      ) : (
                        <span />
                      )}

                      {step < STEPS.length ? (
                        <button
                          type="button"
                          onClick={next}
                          className="flex items-center gap-2 bg-primary text-white font-bold px-7 py-2.5 rounded-lg hover:bg-primary-dark transition-colors shadow"
                        >
                          Continue <FaArrowRight className="text-xs" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={submit}
                          className="flex items-center gap-2 bg-primary-dark text-white font-bold px-7 py-2.5 rounded-lg hover:bg-primary transition-colors shadow"
                        >
                          Submit Application <FaCheckCircle className="text-xs" />
                        </button>
                      )}
                    </div>
                  </div>
                </AnimateOnScroll>

                <p className="text-center text-xs text-neutral-400 mt-6">
                  Fields marked <span className="text-red-500 font-bold">*</span> are required. &nbsp;
                  Need help? Call <a href="tel:0394331223" className="text-primary underline">039 433 1223</a>.
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default OnlineApplication;
