import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Hero from './components/Hero';
import SearchFiltersNew from './components/SearchFiltersNew';
import ListingsGrid from './components/ListingsGrid';
import Footer from './components/Footer';
import AuthView from './components/auth/AuthView';
import { getApartmentRecommendations } from './utils/geminiApi';

const USERS_KEY = 'splitz_users_v2';
const SESSION_KEY = 'splitz_session_v2';
const RECENT_CREDS_KEY = 'splitz_recent_credentials';
const curatedImages = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464890100898-a385f744067f?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop',
];

const randomPhoto = () => {
  return curatedImages[Math.floor(Math.random() * curatedImages.length)];
};

const generateApartmentName = (college) => {
  const locality = (college.city || college.name || 'Campus').split(' ')[0];
  const adjectives = ['Atlas', 'Foundry', 'Union', 'Marble', 'Beacon', 'Elm', 'Slate', 'Hudson', 'Studio', 'Nexus'];
  const formats = ['Residences', 'Row', 'Lofts', 'House', 'Collective', 'Commons', 'Flats', 'Quarters'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const form = formats[Math.floor(Math.random() * formats.length)];
  return `${adj} ${locality} ${form}`;
};

const ensureUniqueNames = (units) => {
  const counts = new Map();
  return units.map((apt) => {
    const baseName = (apt.name || 'Residence').trim();
    const current = counts.get(baseName) || 0;
    counts.set(baseName, current + 1);
    const uniqueName = current === 0 ? baseName : `${baseName} ${current + 1}`;
    return { ...apt, name: uniqueName };
  });
};

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [isLoadingApartments, setIsLoadingApartments] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [maxBudget, setMaxBudget] = useState(3000);
  const [rooms, setRooms] = useState(0);
  const [roommates, setRoommates] = useState(-1);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // migrate legacy keys once
    localStorage.removeItem('splitz_users');
    localStorage.removeItem('splitz_session');
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const loadUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const handleLogin = (email, password) => {
    const users = loadUsers();
    const match = users.find((u) => u.email === email && u.password === password);
    if (match) {
      setUser(match);
      localStorage.setItem(SESSION_KEY, JSON.stringify(match));
      localStorage.setItem(RECENT_CREDS_KEY, JSON.stringify({ email, password }));
      setShowAuth(false);
      return true;
    }
    return false;
  };

  const handleRegister = (profile) => {
    const users = loadUsers();
    if (users.some((u) => u.email === profile.email)) {
      return { success: false, error: 'Email already registered.' };
    }
    const newProfile = { ...profile };
    users.push(newProfile);
    saveUsers(users);
    setUser(newProfile);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newProfile));
    localStorage.setItem(RECENT_CREDS_KEY, JSON.stringify({ email: profile.email, password: profile.password }));
    setShowAuth(false);
    return { success: true };
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  // Generate apartments using Gemini whenever filters change
  useEffect(() => {
    if (!selectedCollege) {
      setApartments([]);
      setGenerationError('');
      return;
    }

    let cancelled = false;

    const generateFromGemini = async () => {
      setIsLoadingApartments(true);
      setGenerationError('');
      try {
        const response = await getApartmentRecommendations({
          collegeName: selectedCollege.name,
          city: selectedCollege.city || selectedCollege.address || '',
          state: selectedCollege.state || '',
          budget: maxBudget,
          rooms,
          roommates,
        });

        const listingPool = response && response.length
          ? response
          : generateFallbackApartments(selectedCollege, maxBudget, rooms, roommates);

        if (!cancelled) {
          const mapped = listingPool.map((apt, index) => ({
            ...apt,
            name: apt.name || generateApartmentName(selectedCollege),
            id: `${selectedCollege.id}-${index}`,
            universityId: selectedCollege.id,
            imageUrl: apt.imageUrl || randomPhoto(`${selectedCollege.id}-${index}`),
          }));
          setApartments(ensureUniqueNames(mapped));
        }
      } catch (error) {
        console.error('Gemini listing generation failed', error);
        if (!cancelled) {
          const fallback = generateFallbackApartments(selectedCollege, maxBudget, rooms, roommates);
          setApartments(fallback);
          setGenerationError('Gemini is unavailable. Showing placeholder concepts.');
        }
      } finally {
        if (!cancelled) {
          setIsLoadingApartments(false);
        }
      }
    };

    generateFromGemini();

    return () => {
      cancelled = true;
    };
  }, [selectedCollege, maxBudget, rooms, roommates]);

  // Generate realistic apartments (fallback + placeholder)
  const generateFallbackApartments = (college, budget, preferredRooms, preferredRoommates) => {
    const apartmentNames = [
      `${college.city || 'Campus'} View Apartments`,
      `${college.name.split(' ')[0]} Student Living`,
      `University Heights`,
      `College Town Lofts`,
      `Scholar's Residence`,
      `Campus Edge Suites`,
      `Academic Arms`,
      `Student Village`,
    ];
    
    const count = 6;
    const apartments = [];
    
    for (let i = 0; i < count; i++) {
      const roomCount = preferredRooms > 0 ? Math.max(1, preferredRooms === 4 ? 4 : preferredRooms) : Math.floor(Math.random() * 4) + 1;
      const roommatesNeeded = preferredRoommates >= 0
        ? (preferredRoommates === 3
            ? Math.max(3, Math.floor(Math.random() * 2) + 2)
            : preferredRoommates)
        : (roomCount > 1 ? Math.floor(Math.random() * roomCount) : 0);
      const basePrice = Math.min(
        budget,
        roomCount * 450 + Math.floor(Math.random() * 400) + 400
      );
      
      apartments.push({
        id: i + 1,
        name: generateApartmentName(college),
        price: Math.round(basePrice / 50) * 50,
        rooms: roomCount,
        roommatesNeeded: roommatesNeeded,
        location: `${(Math.random() * 0.8 + 0.2).toFixed(1)} miles from ${college.name}`,
        universityId: college.id,
        imageUrl: randomPhoto(`${college.id}-${i}-${Date.now()}`),
        amenities: [
          ['WiFi', 'Furnished', 'Laundry'],
          ['WiFi', 'Pool', 'Gym'],
          ['WiFi', 'Parking', 'Study Lounge'],
          ['WiFi', 'Utilities Included', 'Pet Friendly'],
          ['WiFi', 'Modern Kitchen', 'Balcony'],
          ['WiFi', 'Security', '24/7 Access']
        ][i % 6],
        available: ['Available Now', 'Aug 2024', 'Sep 2024', 'Jan 2024'][Math.floor(Math.random() * 4)]
      });
    }
    
    return ensureUniqueNames(apartments);
  };

  // Filter apartments based on criteria
  const filteredApartments = useMemo(() => {
    if (!selectedCollege || apartments.length === 0) {
      return [];
    }

    return apartments.filter((apt) => {
      // Budget filter
      if (apt.price > maxBudget) {
        return false;
      }

      // Rooms filter
      if (rooms > 0) {
        if (rooms === 4) {
          if (apt.rooms < 4) return false;
        } else {
          if (apt.rooms !== rooms) return false;
        }
      }

      // Roommates filter
      if (roommates >= 0) {
        if (roommates === 3) {
          if (apt.roommatesNeeded < 3) return false;
        } else {
          if (apt.roommatesNeeded !== roommates) return false;
        }
      }

      return true;
    });
  }, [selectedCollege, apartments, maxBudget, rooms, roommates]);

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    // Reset filters
    setMaxBudget(3000);
    setRooms(0);
    setRoommates(-1);
  };

  const handleGetStarted = () => {
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={handleLogout}
        onRequestAuth={() => setShowAuth(true)}
      />
      
      {currentView === 'home' ? (
        <>
          <HomePage onGetStarted={handleGetStarted} />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          
          <main className="flex-grow bg-black">
            <div className="container mx-auto px-4">
              {user ? (
                <>
                  <SearchFiltersNew
                    selectedCollege={selectedCollege}
                    onCollegeSelect={handleCollegeSelect}
                    maxBudget={maxBudget}
                    setMaxBudget={setMaxBudget}
                    rooms={rooms}
                    setRooms={setRooms}
                    roommates={roommates}
                    setRoommates={setRoommates}
                  />

                  <div className="mt-16 mb-20">
                    {generationError && (
                      <div className="mb-6 rounded-2xl border border-yellow-800/40 bg-yellow-500/5 px-6 py-4 text-sm text-yellow-200">
                        {generationError}
                      </div>
                    )}
                    {isLoadingApartments ? (
                      <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent-500"></div>
                        <p className="text-white text-xl font-semibold mt-6">
                          Generating housing concepts...
                        </p>
                      </div>
                    ) : (
                      <ListingsGrid 
                        apartments={filteredApartments}
                        selectedUniversity={selectedCollege?.id || 0}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="glass-panel rounded-3xl p-10 text-center text-gray-400">
                  <h2 className="text-3xl font-semibold text-white mb-4">Sign in to explore listings</h2>
                  <p className="mb-6">
                    Create an account to browse campus-specific housing, roommate preferences, and verified concepts.
                  </p>
                  <button
                    onClick={() => setShowAuth(true)}
                    className="px-6 py-3 border border-gray-700 rounded-full text-sm uppercase tracking-[0.3em] hover:text-white"
                  >
                    Sign In / Register
                  </button>
                </div>
              )}
            </div>
          </main>

          <Footer />
        </>
      )}

      {showAuth && (
        <AuthView
          onLogin={handleLogin}
          onRegister={handleRegister}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}

export default App;
