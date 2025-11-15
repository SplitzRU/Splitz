import React from 'react';
import ApartmentCard from './ApartmentCard';

const ListingsGrid = ({ apartments, selectedUniversity }) => {
  if (selectedUniversity === 0) {
    return null;
  }

  if (apartments.length === 0) {
    return (
      <div className="text-center py-20 border border-gray-800 rounded-2xl bg-black/60">
        <h3 className="text-2xl font-semibold text-white mb-3">No concepts available</h3>
        <p className="text-gray-500">Adjust your filters to explore additional configurations.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Concept Library</p>
          <h2 className="text-3xl font-semibold text-white">Listings curated for this campus</h2>
        </div>
        <select className="px-5 py-3 bg-black border border-gray-800 rounded-full focus:border-gray-600 focus:outline-none text-xs uppercase tracking-[0.3em] text-gray-400">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default ListingsGrid;
