import React from 'react';

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden hover:-translate-y-1 transition">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={apartment.imageUrl} 
          alt={apartment.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 text-black px-4 py-1 rounded-full text-xs font-semibold">
          ${apartment.price}/mo
        </div>
        <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-[11px] tracking-wide uppercase">
          {apartment.available}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{apartment.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{apartment.location}</p>
        
        <div className="flex flex-wrap gap-3 mb-4 text-xs uppercase tracking-[0.3em] text-gray-400">
          <span>{apartment.rooms} {apartment.rooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          <span>•</span>
          <span>
            {apartment.roommatesNeeded === 0 
              ? 'Private'
              : `${apartment.roommatesNeeded} ${apartment.roommatesNeeded === 1 ? 'Additional Resident' : 'Additional Residents'}`
            }
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {apartment.amenities.map((amenity, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-lg font-semibold border border-gray-700"
            >
              {amenity}
            </span>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white py-3 rounded-xl font-bold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg transform hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;
