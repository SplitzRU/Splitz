import React from 'react';

const SearchFilters = ({ 
  universities, 
  selectedUniversity, 
  setSelectedUniversity,
  maxBudget,
  setMaxBudget,
  rooms,
  setRooms,
  roommates,
  setRoommates
}) => {
  return (
    <div className="glass-panel rounded-3xl p-10 -mt-8 relative z-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-white mb-6">
        Configure your housing blueprint
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* University Selection */}
        <div>
          <label className="block text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Your university
          </label>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(Number(e.target.value))}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:border-accent-500 focus:outline-none transition text-white font-semibold"
          >
            <option value={0}>Select Your University</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name} ({uni.state})
              </option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="block text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">
            Max budget
          </label>
          <p className="text-2xl font-semibold text-white mb-3">${maxBudget}/mo</p>
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
            Roommates needed
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

      {selectedUniversity === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-700 px-6 py-4 text-sm text-gray-500">
          Select a university to preview tailored listings.
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
