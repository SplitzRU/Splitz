# ⚡ Quick Start Guide

Get Splitz running in 5 minutes!

## 🎯 What You Need

- [x] Node.js installed
- [x] 2 API keys (free!)

## 🚀 Steps

### 1️⃣ Install Dependencies (30 seconds)

```bash
npm install
```

### 2️⃣ Get API Keys (3 minutes)

#### Google Maps API Key
1. Go to https://console.cloud.google.com/
2. Create a project
3. Enable "Maps JavaScript API" and "Places API"
4. Create API key

#### Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Click "Get API key"
3. Done!

**Need detailed instructions?** See [API_KEYS.md](./API_KEYS.md)

### 3️⃣ Add Your Keys (1 minute)

Open the `.env` file and paste your keys:

```env
VITE_GOOGLE_MAPS_API_KEY=paste_your_google_key_here
VITE_GEMINI_API_KEY=paste_your_gemini_key_here
```

### 4️⃣ Start the App (10 seconds)

```bash
npm run dev
```

Open http://localhost:5173 🎉

## 🎮 Try It Out!

1. Click **"Find Housing"** or **"Get Started"**
2. Type a college name (e.g., "Harvard University", "Stanford", "MIT")
3. Select from dropdown
4. Watch the AI validate and generate listings!

## 🐛 Not Working?

- **Maps not loading?** Check your Google Maps API key
- **Validation failing?** Check your Gemini API key
- **Nothing happens?** Did you restart the dev server after adding keys?

See [SETUP.md](./SETUP.md) for detailed troubleshooting.

## 💡 Tips

- Use full college names for best results
- Select from dropdown (don't just type)
- Works with ANY college worldwide! 🌍
- Generated listings are tailored to your location

---

**Happy Housing Hunting!** 🏠✨

