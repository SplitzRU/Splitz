import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Validates if a location is a college/university using Gemini Flash 2.5
 * @param {string} placeName - The name of the place from Google Maps
 * @param {string} address - The address of the place
 * @returns {Promise<{isCollege: boolean, collegeName: string, city: string, state: string, reason: string}>}
 */
export const validateCollege = async (placeName, address) => {
  try {
    // Use Gemini Flash 2.5 for fast validation
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Analyze this location and determine if it's a legitimate college or university:

Location Name: ${placeName}
Address: ${address}

Please respond in this EXACT JSON format (no additional text):
{
  "isCollege": true or false,
  "collegeName": "Official college name if valid, empty string if not",
  "city": "City name",
  "state": "State abbreviation (e.g., CA, NY)",
  "reason": "Brief explanation"
}

Rules:
- Return isCollege: true ONLY for accredited colleges, universities, community colleges
- Return isCollege: false for high schools, libraries, non-educational buildings
- Extract the official college name
- Provide the city and state`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }
    
    const data = JSON.parse(jsonMatch[0]);
    
    return {
      isCollege: data.isCollege || false,
      collegeName: data.collegeName || placeName,
      city: data.city || '',
      state: data.state || '',
      reason: data.reason || ''
    };
  } catch (error) {
    console.error('Error validating college:', error);
    
    // Fallback: Simple keyword check
    const collegeKeywords = [
      'university', 'college', 'institute', 'polytechnic',
      'school of', 'academy', 'community college'
    ];
    
    const lowerName = placeName.toLowerCase();
    const isCollege = collegeKeywords.some(keyword => lowerName.includes(keyword));
    
    return {
      isCollege,
      collegeName: placeName,
      city: '',
      state: '',
      reason: 'Fallback validation (API error)'
    };
  }
};

/**
 * Get apartment recommendations based on college info
 * @param {Object} collegeInfo - College information
 * @returns {Promise<Array>} Array of apartment suggestions
 */
export const getApartmentRecommendations = async (options) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const {
      collegeName,
      city,
      state,
      budget,
      rooms,
      roommates,
    } = options;

    const roomDescriptor = rooms === 0
      ? 'any bedroom count'
      : rooms === 4
        ? 'four or more bedrooms'
        : `${rooms} bedroom${rooms > 1 ? 's' : ''}`;

    const roommateDescriptor = roommates < 0
      ? 'any roommate configuration'
      : roommates === 0
        ? 'no additional roommates'
        : roommates === 3
          ? 'three or more roommates'
          : `${roommates} roommate${roommates > 1 ? 's' : ''}`;

    const prompt = `Generate 6 highly realistic student apartment concepts near ${collegeName} in ${city || 'the surrounding city'}, ${state}.

For each apartment, provide:
- name (distinct property name)
- price (cap at $${budget})
- rooms (match ${roomDescriptor})
- roommatesNeeded (match ${roommateDescriptor})
- location (distance from campus, e.g., "0.3 miles from campus")
- amenities (array of 3-4 amenities like WiFi, Furnished, Pool, etc.)
- available (e.g., "Available Now", "Aug 2024", etc.)

Respond in this EXACT JSON format (array of objects, no additional text):
[
  {
    "name": "...",
    "price": 1200,
    "rooms": 2,
    "roommatesNeeded": 1,
    "location": "0.5 miles from ${collegeInfo.collegeName}",
    "amenities": ["WiFi", "Furnished", "Laundry"],
    "available": "Available Now"
  }
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error getting apartment recommendations:', error);
    return [];
  }
};

const encodeFileToBase64 = (file) => {
  if (!file) return null;
  if (typeof file === 'string') return Promise.resolve(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const verifyIdentification = async ({ fullName, frontFile, backFile }) => {
  try {
    const [frontBase64, backBase64] = await Promise.all([
      encodeFileToBase64(frontFile),
      encodeFileToBase64(backFile),
    ]);

    if (!frontBase64 || !backBase64) {
      throw new Error('Missing ID images');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `You are verifying a government ID for a housing marketplace.
Use the encoded images and instructions below to determine validity.

Return ONLY JSON in this structure:
{
  "isValid": true/false,
  "age": number,
  "extractedName": "First Last",
  "reason": "short explanation"
}

Required conditions:
- The ID holder must be at least 18 years old.
- Name extracted from the card must match the provided name (case insensitive).
- Front and back images must appear to belong to the same ID document (matching style, numbers, and names).

Provided data:
- Name entered by user: ${fullName}
- Base64 front image of ID: data:image/jpeg;base64,${frontBase64.substring(0, 2000)}
- Base64 back image of ID: data:image/jpeg;base64,${backBase64.substring(0, 2000)}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid response');
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      isValid: parsed.isValid ?? false,
      age: parsed.age ?? 0,
      extractedName: parsed.extractedName ?? '',
      reason: parsed.reason ?? 'No reason returned',
    };
  } catch (error) {
    console.error('ID verification failed', error);
    return {
      isValid: false,
      age: 0,
      extractedName: '',
      reason: 'Verification unavailable. Use Passing Test to override.',
      fallback: true,
    };
  }
};

