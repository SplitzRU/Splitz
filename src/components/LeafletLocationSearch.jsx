import React, { useState, useRef, useEffect } from 'react';

const LeafletLocationSearch = ({ onCollegeSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef(null);

  // Search for locations using Nominatim (OpenStreetMap's geocoding service)
  const searchLocations = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // Search with original query first
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}` +
        `&format=json` +
        `&limit=20` +
        `&addressdetails=1` +
        `&extratags=1`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      
      // Prioritize educational institutions but show all results
      const educationalResults = data.filter(place => {
        const name = place.display_name.toLowerCase();
        const type = place.type?.toLowerCase() || '';
        const placeClass = place.class?.toLowerCase() || '';
        
        return (
          name.includes('university') ||
          name.includes('college') ||
          name.includes('institute') ||
          name.includes('school') ||
          type === 'university' ||
          type === 'college' ||
          placeClass === 'amenity'
        );
      });

      const otherResults = data.filter(place => {
        const name = place.display_name.toLowerCase();
        return !(
          name.includes('university') ||
          name.includes('college') ||
          name.includes('institute') ||
          name.includes('school')
        );
      });

      // Show educational first, then others, up to 15 results
      const combinedResults = [...educationalResults, ...otherResults].slice(0, 15);
      
      setSuggestions(combinedResults);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search - reduced to 300ms for faster response
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      searchLocations(searchValue);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchValue]);

  const handleSelectLocation = (place) => {
    const placeName = place.name || place.display_name.split(',')[0];
    const address = place.display_name;
    
    setSearchValue(placeName);
    setShowSuggestions(false);
    setSuggestions([]);
    
    // Extract address components
    const addressParts = place.address || {};
    const city = addressParts.city || addressParts.town || addressParts.village || 
                 addressParts.county || '';
    const state = addressParts.state || '';
    const country = addressParts.country || '';
    
    // Create college object
    const collegeData = {
      id: Date.now(),
      name: placeName,
      city: city,
      state: state,
      country: country,
      address: address,
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
      placeId: place.place_id
    };
    
    // Call parent callback immediately
    onCollegeSelect(collegeData);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative search-container">
      <label className="block text-[11px] uppercase tracking-[0.4em] text-gray-500 mb-3">
        Search campus or city
      </label>

      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Harvard University, Boston, MIT…"
          className="w-full px-5 py-3 bg-black border border-gray-800 rounded-2xl focus:border-accent-500 focus:outline-none transition text-white font-medium placeholder-gray-500"
        />
        
        {isSearching && (
          <div className="absolute right-4 top-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-accent-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-3 bg-black border border-gray-900 rounded-2xl shadow-2xl max-h-96 overflow-y-auto divide-y divide-gray-900">
          {suggestions.map((place, index) => {
            const placeName = place.name || place.display_name.split(',')[0];
            const isEducational = place.display_name.toLowerCase().includes('university') ||
                                 place.display_name.toLowerCase().includes('college') ||
                                 place.display_name.toLowerCase().includes('institute');
            
            return (
              <button
                key={place.place_id || index}
                onClick={() => handleSelectLocation(place)}
                className={`w-full text-left px-5 py-4 hover:bg-white/5 transition ${
                  isEducational ? 'bg-white/5' : ''
                }`}
              >
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{placeName}</p>
                  <p className="text-gray-500 text-xs truncate">{place.display_name}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && suggestions.length === 0 && !isSearching && searchValue.length > 2 && (
        <div className="absolute z-50 w-full mt-3 bg-black border border-gray-900 rounded-2xl shadow-2xl p-4">
          <p className="text-gray-500 text-center text-sm">
            No results found. Try a different spelling or search by city name.
          </p>
        </div>
      )}
      
      <div className="mt-2 text-[11px] text-gray-600 flex items-center justify-between">
        <span>Powered by OpenStreetMap</span>
        {searchValue.length > 0 && searchValue.length < 2 && (
          <span className="text-accent-500">Type at least 2 characters</span>
        )}
      </div>
    </div>
  );
};

export default LeafletLocationSearch;
