import React from 'react';

const Header = ({ currentView, setCurrentView, user, onLogout, onRequestAuth }) => {
  const links = [
    { id: 'home', label: 'Overview' },
    { id: 'search', label: 'Find Housing' },
  ];

  return (
    <header className="bg-black/80 backdrop-blur-xl border-b border-gray-900 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-3"
        >
          <img src="/logo.svg" alt="Splitz logo" className="h-7 w-7" />
          <span className="text-2xl tracking-wide font-semibold uppercase text-white">Splitz</span>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              className={`transition-colors ${
                currentView === id ? 'text-accent-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
          <span className="text-gray-600">Find Roommates</span>
          <span className="text-gray-600">List Your Space</span>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="px-4 py-2 rounded-full border border-gray-800 text-sm uppercase tracking-[0.3em] text-gray-300">
                {user.fullName || user.email}
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-gray-100 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRequestAuth}
                className="px-4 py-2 text-sm font-semibold text-gray-200 border border-gray-700 rounded-full hover:border-gray-500 transition"
              >
                Sign In
              </button>
              <button
                onClick={onRequestAuth}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-gray-100 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
