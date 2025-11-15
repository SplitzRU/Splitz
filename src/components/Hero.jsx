import React from 'react';

const metrics = [
  { label: 'Campuses Covered', value: 'Global' },
  { label: 'Curated Listings', value: '200+' },
  { label: 'Starting Price', value: '$400 /mo' },
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-black via-zinc-950 to-black py-20 border-b border-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-6">
          Student Housing Intelligence
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white mb-6">
          Find thoughtful housing near any campus with zero guesswork.
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          Splitz blends real–time location data with curated listing templates so you can
          model housing ideas for any college in seconds.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="glass-panel rounded-2xl px-6 py-8 text-left"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
                {item.label}
              </p>
              <p className="text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
