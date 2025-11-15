import React from 'react';
import LeafletLocationSearch from './LeafletLocationSearch';

const SearchFiltersNew = ({ 
  selectedCollege,
  onCollegeSelect,
  maxBudget,
  setMaxBudget,
  rooms,
  setRooms,
  roommates,
  setRoommates
}) => {
  return (
    <div className="glass-panel rounded-3xl p-10 -mt-8 relative z-10 max-w-6xl mx-auto bg-black border border-gray-900">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Search</p>
          <h2 className="text-3xl font-semibold text-white">Model a housing scenario</h2>
        </div>
        <button
          onClick={() => onCollegeSelect(null)}
          className="text-xs uppercase tracking-[0.4em] text-gray-500 hover:text-white transition"
        >
          Reset
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Location Search with Leaflet & OpenStreetMap */}
        <div className="lg:col-span-2">
          <LeafletLocationSearch onCollegeSelect={onCollegeSelect} />
        </div>
      </div>

      {selectedCollege && (
        <div className="mb-6 rounded-2xl border border-gray-800 bg-black/60 px-6 py-5 relative">
          <button
            onClick={() => onCollegeSelect(null)}
            className="absolute top-5 right-5 text-gray-500 hover:text-white text-sm tracking-[0.4em] uppercase"
          >
            ×
          </button>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-1">Selected Location</p>
          <p className="text-xl font-semibold text-white">{selectedCollege.name}</p>
          <p className="text-sm text-gray-500">
            {selectedCollege.city && selectedCollege.state 
              ? `${selectedCollege.city}, ${selectedCollege.state}`
              : selectedCollege.address}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Budget Filter */}
        <div>
          <label className="block text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Budget Ceiling
          </label>
          <p className="text-2xl font-semibold mb-3 text-white">${maxBudget} / month</p>
          <input
            type="range"
            min="400"
            max="3000"
            step="50"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2 font-semibold">
            <span>$400</span>
            <span>$3000</span>
          </div>
        </div>

        {/* Number of Rooms */}
        <div>
          <label className="block text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Bedrooms
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:border-accent-500 focus:outline-none transition text-white font-semibold"
          >
            <option value={0}>Any</option>
            <option value={1}>1 Room</option>
            <option value={2}>2 Rooms</option>
            <option value={3}>3 Rooms</option>
            <option value={4}>4+ Rooms</option>
          </select>
        </div>

        {/* Number of Roommates */}
        <div>
          <label className="block text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Roommate Preference
          </label>
          <select
            value={roommates}
            onChange={(e) => setRoommates(Number(e.target.value))}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:border-accent-500 focus:outline-none transition text-white font-semibold"
          >
            <option value={-1}>Any</option>
            <option value={0}>0 (Solo)</option>
            <option value={1}>1 Roommate</option>
            <option value={2}>2 Roommates</option>
            <option value={3}>3+ Roommates</option>
          </select>
        </div>
      </div>

      {!selectedCollege && (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-700 px-6 py-4 text-sm text-gray-500">
          Select a campus to unlock tailored housing concepts.
        </div>
      )}
    </div>
  );
};

export default SearchFiltersNew;

