# 🔑 How to Get Your API Keys

This guide walks you through getting the required API keys for Splitz.

## 📍 Google Maps API Key

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click **"Select a project"** at the top
4. Click **"NEW PROJECT"**
5. Name it (e.g., "Splitz Student Housing")
6. Click **"CREATE"**

### Step 2: Enable Required APIs

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Maps JavaScript API"**
3. Click on it and click **"ENABLE"**
4. Go back to Library
5. Search for **"Places API"**
6. Click on it and click **"ENABLE"**

### Step 3: Create API Key

1. In the left sidebar, go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. Your API key will be created and displayed
5. **Copy the API key** (you'll need this!)

### Step 4: (Optional) Restrict Your API Key

For security, it's recommended to restrict your API key:

1. Click on your API key to edit it
2. Under **"Application restrictions"**:
   - Select **"HTTP referrers (web sites)"**
   - Add: `http://localhost:5173/*` (for development)
   - Add your production URL when deploying
3. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check **"Maps JavaScript API"**
   - Check **"Places API"**
4. Click **"SAVE"**

**Note:** Google Maps offers $200 free credit per month, which is plenty for development and moderate use!

---

## 🤖 Gemini API Key

### Step 1: Go to Google AI Studio

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account

### Step 2: Get API Key

1. Click **"Get API key"** button
2. Either:
   - Select an existing Google Cloud project, OR
   - Click **"Create API key in new project"**
3. Your API key will be generated
4. **Copy the API key** (you'll need this!)

### Step 3: (Optional) Test Your Key

You can test your Gemini API key at [AI Studio](https://aistudio.google.com/):
1. Try the playground with some prompts
2. Verify it works before using in the app

**Note:** Gemini API has a free tier with generous quotas:
- 15 requests per minute
- 1 million tokens per minute
- 1,500 requests per day

Perfect for development and demos!

---

## 📝 Add Keys to Your Project

Once you have both keys:

1. **Open the `.env` file** in your project root
2. **Add your keys:**

```env
VITE_GOOGLE_MAPS_API_KEY=AIza...your_actual_key_here
VITE_GEMINI_API_KEY=AIza...your_actual_key_here
```

3. **Save the file**
4. **Restart your dev server:**

```bash
npm run dev
```

---

## 🔒 Important Security Notes

1. **Never commit `.env` to Git** (it's already in .gitignore)
2. **Never share your API keys publicly**
3. **Regenerate keys if accidentally exposed**
4. **Use API restrictions in production**
5. **Monitor usage in Google Cloud Console**

---

## ❓ Troubleshooting

### Google Maps shows errors
- Verify both APIs are enabled (Maps JavaScript API + Places API)
- Check API key is copied correctly (no extra spaces)
- Wait a few minutes after creating the key (can take time to activate)

### Gemini API errors
- Check your API key is correct
- Verify you have quota remaining
- Try using a fresh API key

### Still having issues?
1. Check browser console for specific error messages
2. Verify `.env` file is in the root directory
3. Make sure you restarted the dev server after adding keys
4. Check that variable names match exactly: `VITE_GOOGLE_MAPS_API_KEY` and `VITE_GEMINI_API_KEY`

---

## 💰 Pricing Information

### Google Maps API
- **Free Tier:** $200/month credit
- **Maps JavaScript API:** $7 per 1,000 loads
- **Places API:** $17 per 1,000 requests
- Your free credit covers plenty for development!

### Gemini API
- **Free Tier:**
  - 15 RPM (requests per minute)
  - 1M TPM (tokens per minute)  
  - 1,500 RPD (requests per day)
- **Paid Tiers:** Available if you need more

For sharing housing concepts with college students or running demos, the free tiers are more than sufficient! 🎓

---

**Ready to start?** Go back to [SETUP.md](./SETUP.md) to continue! 🚀

