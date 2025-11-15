import { colleges } from './colleges';

// Generate apartments for popular colleges
const generateApartments = () => {
  const apartments = [];
  let apartmentId = 1;
  
  // Popular colleges to generate listings for
  const popularCollegeIds = [
    78, 79, 80, 81, 83, 84, // MA - Harvard, MIT, BU, Northeastern, UMass, BC
    13, 14, 15, 16, 17, 18, // CA - Stanford, Berkeley, UCLA, UCSD, UCI, Davis
    108, 109, 110, 111, // NY - Columbia, NYU, Cornell, Syracuse
    149, 150, 151, 152, // TX - UT Austin, A&M, Rice, Houston
    42, 43, 44, 45, // FL - UF, FSU, Miami, UCF
    56, 57, 58, // IL - UIUC, Northwestern, UChicago
    86, 87, // MI - UMich, MSU
    134, 135, 136, 137, // PA - UPenn, Penn State, CMU, Pitt
    168, 169, // WA - UW, WSU
    49, 50, 51, // GA - UGA, Georgia Tech, Emory
  ];
  
  const apartmentNames = [
    "Campus View Apartments", "Student Living Commons", "University Heights",
    "College Town Lofts", "Scholar's Residence", "Campus Edge Suites",
    "Student Village", "Academic Arms", "College Square Apartments",
    "University Quarters", "Campus Corner", "Student Haven",
    "College Park Residences", "University Plaza", "Campus Life Apartments",
    "Scholar House", "College Crest", "Academic Place",
    "Student Manor", "Campus Gardens", "University Terrace"
  ];
  
  const amenitiesList = [
    ["WiFi", "Furnished", "Laundry"],
    ["WiFi", "Pool", "Gym"],
    ["WiFi", "Study Room", "24/7 Security"],
    ["WiFi", "Parking", "Shared Kitchen"],
    ["WiFi", "Furnished", "Rooftop Access"],
    ["WiFi", "Utilities Included", "Bike Storage"],
    ["WiFi", "Furnished", "Pet Friendly"],
    ["WiFi", "Pool", "Study Lounge"],
    ["WiFi", "Laundry", "Common Area"],
    ["WiFi", "Parking", "Gym"],
    ["WiFi", "Modern Kitchen", "Hardwood Floors"],
    ["WiFi", "Backyard", "Fireplace"],
    ["WiFi", "Bike Storage", "Study Room"],
    ["WiFi", "Balcony", "Parking"],
    ["WiFi", "Doorman", "Elevator"]
  ];
  
  const availabilityOptions = [
    "Available Now", "Jan 2024", "Feb 2024", "Mar 2024", 
    "Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Aug 2024"
  ];
  
  const images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
  ];
  
  popularCollegeIds.forEach(collegeId => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return;
    
    // Generate 3-5 apartments per popular college
    const numApartments = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < numApartments; i++) {
      const rooms = Math.floor(Math.random() * 4) + 1; // 1-4 rooms
      const roommatesNeeded = rooms > 1 ? Math.floor(Math.random() * (rooms)) : 0;
      const basePrice = rooms * 400 + Math.floor(Math.random() * 400);
      const price = Math.round(basePrice / 50) * 50; // Round to nearest 50
      
      apartments.push({
        id: apartmentId++,
        name: apartmentNames[Math.floor(Math.random() * apartmentNames.length)],
        price: price,
        rooms: rooms,
        roommatesNeeded: roommatesNeeded,
        location: `${(Math.random() * 0.8 + 0.1).toFixed(1)} miles from ${college.name}`,
        universityId: collegeId,
        imageUrl: images[Math.floor(Math.random() * images.length)],
        amenities: amenitiesList[Math.floor(Math.random() * amenitiesList.length)],
        available: availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)]
      });
    }
  });
  
  return apartments;
};

export const apartments = generateApartments();
