import React, { useState, useCallback, useRef } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { validateCollege } from '../utils/geminiApi';

const libraries = ['places'];

const LocationSearch = ({ onCollegeSelect }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      
      if (!place.geometry) {
        setValidationMessage('Please select a valid location from the dropdown');
        return;
      }

      const placeName = place.name;
      const address = place.formatted_address || '';
      
      setIsValidating(true);
      setValidationMessage('🔍 Checking if this is a valid college...');
      
      try {
        // Validate with Gemini API
        const validation = await validateCollege(placeName, address);
        
        if (validation.isCollege) {
          setValidationMessage(`✅ ${validation.collegeName} validated!`);
          
          // Create college object
          const collegeData = {
            id: Date.now(),
            name: validation.collegeName,
            city: validation.city || place.vicinity || '',
            state: validation.state || '',
            address: address,
            location: place.geometry.location,
            placeId: place.place_id
          };
          
          // Call parent callback
          onCollegeSelect(collegeData);
          
          // Clear input after 2 seconds
          setTimeout(() => {
            setValidationMessage('');
          }, 2000);
        } else {
          setValidationMessage(`❌ Not a valid college: ${validation.reason}`);
          setTimeout(() => {
            setValidationMessage('');
          }, 4000);
        }
      } catch (error) {
        console.error('Error validating college:', error);
        setValidationMessage('❌ Error validating location. Please try again.');
        setTimeout(() => {
          setValidationMessage('');
        }, 4000);
      } finally {
        setIsValidating(false);
      }
    }
  };

  if (loadError) {
    return (
      <div className="text-red-500 font-semibold">
        Error loading Google Maps. Please check your API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="text-gray-400 font-semibold">
        Loading location search...
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-300 mb-3">
        🎓 Search for Your College/University *
      </label>
      
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          types: ['establishment'],
          fields: ['name', 'formatted_address', 'geometry', 'place_id', 'vicinity']
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Type your college name or location..."
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:border-accent-500 focus:outline-none transition text-white font-semibold placeholder-gray-500"
          disabled={isValidating}
        />
      </Autocomplete>
      
      {validationMessage && (
        <div className={`mt-3 p-3 rounded-lg font-semibold text-sm ${
          validationMessage.includes('✅') 
            ? 'bg-green-500/10 border border-green-500 text-green-400'
            : validationMessage.includes('❌')
            ? 'bg-red-500/10 border border-red-500 text-red-400'
            : 'bg-accent-500/10 border border-accent-500 text-accent-400'
        }`}>
          {validationMessage}
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500">
        Powered by Google Maps & Gemini AI
      </div>
    </div>
  );
};

export default LocationSearch;

