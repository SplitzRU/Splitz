# 🚀 Setup Guide - Splitz with AI Integration

This guide will help you set up the Splitz student housing platform with Google Maps API and Gemini AI integration.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Cloud Account (for Google Maps API)
- Google AI Studio Account (for Gemini API)

## 🔑 Step 1: Get Your API Keys

### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key
6. (Optional but recommended) Restrict your API key:
   - Application restrictions: HTTP referrers
   - API restrictions: Maps JavaScript API, Places API

### Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **Get API Key**
3. Create a new API key or use an existing one
4. Copy your API key

## 🛠️ Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- Vite (build tool)
- Tailwind CSS
- Google Maps React (`@react-google-maps/api`)
- Google Generative AI SDK (`@google/generative-ai`)

## 🔐 Step 3: Configure Environment Variables

1. Create a `.env` file in the root directory:

```bash
# Create .env file (it's already in .gitignore)
touch .env
```

2. Add your API keys to `.env`:

```env
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** Replace `your_google_maps_api_key_here` and `your_gemini_api_key_here` with your actual API keys!

## ▶️ Step 4: Run the Application

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 🎯 How It Works

### Google Maps Integration
- Users can search for any location using Google Places Autocomplete
- The search is optimized for educational establishments
- Returns place details including name, address, and coordinates

### Gemini AI Validation
- Uses **Gemini 2.0 Flash** (fast and efficient)
- Validates if the selected location is a legitimate college/university
- Filters out high schools, libraries, and non-educational buildings
- Extracts official college name, city, and state

### AI-Generated Listings
- Once a college is validated, Gemini generates realistic apartment listings
- Listings include pricing appropriate for the area
- Creates unique apartment complex names
- Suggests relevant amenities and availability

## 🧪 Testing the Application

1. **Start on Home Page:**
   - Click "Get Started" or "Find Housing" in the navigation

2. **Search for a College:**
   - Type a college name (e.g., "Harvard University", "UCLA", "MIT")
   - Select from the dropdown suggestions
   - Wait for AI validation (usually 1-2 seconds)

3. **View Generated Listings:**
   - If validated, Gemini will generate 5 apartment listings
   - Filter by budget, rooms, and roommates
   - Browse the AI-generated listings

## 🐛 Troubleshooting

### Google Maps not loading
- Check if your Google Maps API key is correct in `.env`
- Ensure Maps JavaScript API and Places API are enabled
- Check browser console for specific errors

### Gemini validation fails
- Check if your Gemini API key is correct in `.env`
- Ensure you have API quota remaining
- Check network tab for API errors

### "Error validating college" message
- The app has a fallback mechanism using keyword matching
- Check if you have a stable internet connection
- Verify your Gemini API key is active

### No listings appear
- Make sure you selected a location from the dropdown (not just typed)
- The location must be validated as a college
- Check browser console for errors

## 💡 Tips

1. **API Key Security:**
   - Never commit `.env` file to Git (it's already in .gitignore)
   - Use API key restrictions in Google Cloud Console
   - Regenerate keys if accidentally exposed

2. **Better Results:**
   - Type full college names for better accuracy
   - Select from the dropdown suggestions
   - Try alternative names if validation fails

3. **Development:**
   - Hot reload is enabled - changes appear instantly
   - Check console for debugging information
   - API calls are logged for troubleshooting

## 📦 Build for Production

```bash
npm run build
```

**Important:** For production deployment, you'll need to:
1. Set environment variables in your hosting platform
2. Enable proper CORS settings
3. Consider using API proxies to hide keys from client

## 🎓 Features Overview

- ✅ Google Maps autocomplete for location search
- ✅ AI-powered college validation with Gemini Flash 2.5
- ✅ Dynamic apartment listing generation
- ✅ Real-time filtering
- ✅ Black & hot pink modern design
- ✅ Fully responsive
- ✅ Fallback mechanisms for reliability

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify API keys are correctly set
3. Ensure all dependencies are installed
4. Check that APIs are enabled in Google Cloud Console

---

**Happy Housing Hunting! 🏠✨**

