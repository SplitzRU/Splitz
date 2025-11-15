import { useMemo, useState } from 'react';
import { majors, personalityTraits } from '../../data/majors';
import { verifyIdentification } from '../../utils/geminiApi';

const steps = ['Profile', 'Personality', 'Major', 'Verification'];

const RegisterWizard = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [verification, setVerification] = useState({ status: 'idle', message: '' });
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    personality: [],
    major: '',
    frontId: null,
    backId: null,
    verified: false,
  });
  const [previews, setPreviews] = useState({ front: '', back: '' });

  const updatePreview = (key, file) => {
    if (!file) {
      setPreviews((prev) => ({ ...prev, [key]: '' }));
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [key]: url }));
  };

  const fullName = `${form.firstName} ${form.lastName}`.trim();
  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return form.firstName && form.lastName && form.email && form.password.length >= 6;
      case 1:
        return form.personality.length > 0;
      case 2:
        return Boolean(form.major);
      case 3:
        return form.verified;
      default:
        return false;
    }
  }, [step, form]);

  const toggleTrait = (trait) => {
    setForm((prev) => ({
      ...prev,
      personality: prev.personality.includes(trait)
        ? prev.personality.filter((t) => t !== trait)
        : [...prev.personality, trait],
    }));
  };

  const handleVerify = async () => {
    const failureMessage = 'Verification failed. Please try again.';
    if (!form.frontId || !form.backId) {
      setVerification({ status: 'error', message: failureMessage });
      return;
    }
    setVerification({ status: 'pending', message: 'Analyzing document...' });
    try {
      const result = await verifyIdentification({ fullName, frontFile: form.frontId, backFile: form.backId });
      const namesMatch =
        result.extractedName &&
        result.extractedName.toLowerCase().includes(form.firstName.toLowerCase()) &&
        result.extractedName.toLowerCase().includes(form.lastName.toLowerCase());
      if (result.isValid && result.age >= 18 && namesMatch) {
        setForm((prev) => ({ ...prev, verified: true }));
        setVerification({ status: 'success', message: 'Identity verified.' });
      } else {
        setVerification({ status: 'error', message: failureMessage });
      }
    } catch (error) {
      setVerification({ status: 'error', message: failureMessage });
    }
  };

  const handleFinish = async () => {
    setSubmitting(true);
    setTimeout(() => {
      onComplete({
        id: crypto.randomUUID(),
        fullName,
        email: form.email,
        password: form.password,
        personality: form.personality,
        major: form.major,
        verified: form.verified,
        createdAt: new Date().toISOString(),
      });
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gray-500 mb-6 flex-wrap">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                idx === step ? 'border-white text-white' : 'border-gray-700 text-gray-600'
              }`}
            >
              {idx + 1}
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
              required
            />
            <p className="text-xs text-gray-600 mt-2">Minimum 6 characters.</p>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="text-sm text-gray-400 mb-4">How would your friends describe you? Pick as many traits as you like.</p>
          <div className="grid md:grid-cols-3 gap-3">
            {personalityTraits.map((trait) => (
              <button
                key={trait}
                type="button"
                onClick={() => toggleTrait(trait)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  form.personality.includes(trait)
                    ? 'border-accent-500 text-white'
                    : 'border-gray-700 text-gray-400'
                }`}
              >
                {trait}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Major</label>
          <select
            value={form.major}
            onChange={(e) => setForm({ ...form, major: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
          >
            <option value="">Select your major</option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <p className="text-sm text-gray-400">
            Upload the front and back of your government ID. Gemini validates age (18+) and confirms your name matches on both sides.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Front Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setForm({ ...form, frontId: file, verified: false });
                  updatePreview('front', file);
                }}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
              />
              {previews.front && (
                <img src={previews.front} alt="Front preview" className="mt-3 rounded-xl border border-gray-800" />
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Back Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setForm({ ...form, backId: file, verified: false });
                  updatePreview('back', file);
                }}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
              />
              {previews.back && (
                <img src={previews.back} alt="Back preview" className="mt-3 rounded-xl border border-gray-800" />
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleVerify}
              className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold uppercase tracking-wide"
              disabled={verification.status === 'pending'}
            >
              {verification.status === 'pending' ? 'Checking...' : 'Verify with Gemini'}
            </button>
            <button
              type="button"
              onClick={() => {
                setForm((prev) => ({ ...prev, verified: true }));
                setVerification({ status: 'success', message: 'Manual override: passing test.' });
              }}
              className="px-6 py-3 border border-gray-700 rounded-full text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white"
            >
              Passing Test
            </button>
          </div>
          {verification.message && (
            <p
              className={`text-sm ${
                verification.status === 'success'
                  ? 'text-green-400'
                  : verification.status === 'error'
                  ? 'text-red-400'
                  : 'text-gray-400'
              }`}
            >
              {verification.message}
            </p>
          )}
          {form.verified && (
            <div className="mt-4 flex items-center gap-3 text-green-400">
              <span className="w-8 h-8 rounded-full border border-green-400 flex items-center justify-center">✓</span>
              <span>ID verified successfully.</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => (step === 0 ? onCancel() : setStep((prev) => prev - 1))}
          className="text-xs uppercase tracking-[0.4em] text-gray-500 hover:text-white"
        >
          {step === 0 ? 'Cancel' : 'Back'}
        </button>

        <div className="flex gap-3">
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold uppercase tracking-wide disabled:opacity-30"
              disabled={!canAdvance}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold uppercase tracking-wide disabled:opacity-30"
              disabled={!canAdvance || submitting}
            >
              {submitting ? 'Saving...' : 'Finish'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterWizard;

