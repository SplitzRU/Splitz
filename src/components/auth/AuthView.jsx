import { useEffect, useState } from 'react';
import RegisterWizard from './RegisterWizard';

const AuthView = ({ onLogin, onRegister, onClose }) => {
  const [mode, setMode] = useState('login');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('splitz_recent_credentials'));
      if (stored) {
        setCredentials({ email: stored.email || '', password: stored.password || '' });
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(credentials.email, credentials.password);
    if (!success) {
      setError('Invalid credentials. Please try again or register.');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-md text-white flex items-center justify-center px-6 fixed inset-0 z-50">
      <div className="max-w-4xl w-full glass-panel rounded-3xl p-10 relative">
        <button
          aria-label="Close"
          className="absolute top-6 right-6 text-gray-500 hover:text-white"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Splitz Access</h1>
          <div className="text-sm uppercase tracking-[0.4em] text-gray-500">
            {mode === 'login' ? 'Login' : 'Registration'}
          </div>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 outline-none"
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold uppercase tracking-wide"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-xs uppercase tracking-[0.4em] text-gray-500 hover:text-white"
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          <RegisterWizard
            onComplete={(profile) => {
              const result = onRegister(profile);
              if (!result.success) {
                setRegisterError(result.error || 'Unable to register.');
              } else {
                setRegisterError('');
              }
            }}
            onCancel={() => setMode('login')}
          />
        )}
        {mode === 'register' && registerError && (
          <p className="mt-4 text-sm text-red-400">{registerError}</p>
        )}
      </div>
    </div>
  );
};

export default AuthView;

