import React from 'react';

const features = [
  { title: 'Precision Search', body: 'Locate any campus worldwide with OpenStreetMap data and curated suggestions.' },
  { title: 'Financial Clarity', body: 'Model realistic budgets with price ranges that reflect the surrounding market.' },
  { title: 'Roommate Ready', body: 'Filter for occupancy style, bedrooms, and shared living preferences instantly.' },
];

const steps = [
  { title: 'Locate a campus', body: 'Search by school or city. We return high-confidence matches instantly.' },
  { title: 'Dial in requirements', body: 'Adjust rent ceilings, bedroom counts, and roommate preferences.' },
  { title: 'Review concepts', body: 'Explore modern listing templates that mirror polished rental marketplaces.' },
];

const HomePage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-black">
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-6">
          Splitz Platform
        </p>
        <h1 className="text-4xl md:text-[4.5rem] font-semibold leading-tight text-white mb-8">
          Splitz is the housing marketplace built for college students.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Let students explore real budgets, roommate mixes, and curated inventories for your community or campus rollout.
        </p>
        <button
          onClick={onGetStarted}
          className="px-10 py-4 text-sm font-semibold tracking-wide uppercase bg-white text-black rounded-full hover:bg-gray-100 transition"
        >
          Launch Finder
        </button>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className="glass-panel rounded-2xl p-8 text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
              {feature.title}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">{feature.body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-semibold text-white text-center mb-14">
          Build concepts in three deliberate steps.
        </h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.title} className="glass-panel rounded-2xl p-6 flex gap-6">
              <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div>
                <p className="text-lg font-semibold text-white mb-1">{step.title}</p>
                <p className="text-sm text-gray-400">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="gradient-border rounded-[32px] px-10 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4">
            Ready to launch
          </p>
          <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Curate a housing story that feels product ready.
          </h3>
          <p className="text-base text-gray-400 mb-8">
            Splitz gives your audience a polished housing journey during recruitment events, tabling sessions, or orientation week.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 text-sm font-semibold uppercase tracking-wide rounded-full border border-white/30 text-white hover:border-white transition"
          >
            Start Designing
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

