# Leaflet.js Setup Guide

## Stack Overview

- Leaflet.js for interactive maps  
- React-Leaflet for declarative components  
- OpenStreetMap tile layers (public, free)  
- Nominatim search for location lookups  
- Gemini API (Flash) for synthetic listings  

You must supply `VITE_GEMINI_API_KEY` for listing generation (a placeholder key is provided below for demos).

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

Environment example:
```
VITE_GEMINI_API_KEY=AIzaSyB_SS7F0HGG8q4jI5YNLR4ryn-yLINoGoM
```

## Location Search

The search component queries the public Nominatim API:

```javascript
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=20&addressdetails=1`
);
```

- No authentication required  
- Fair use: roughly 1 request/second  
- Debounced input (300 ms) honors this limit  

## Mapping

Leaflet CSS is already included in `index.html`. Tiles are sourced from:

```
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

The styling in `src/index.css` ensures popups and tiles match the Splitz dark theme.

## Testing Recommendations

Try searching for:
- "Harvard University"
- "Stanford"
- "MIT"
- "UC Berkeley"
- "Yale"

Selecting any suggestion instantly generates six concept listings tailored to that campus.

## Key Benefits to Mention

1. Open-source mapping stack with zero cost.
2. No billing surprises or quotas.
3. Lightweight assets (Leaflet ~39 KB).
4. Works globally without configuration.

## Next Steps

The application is ready for demos:
- Update copy or imagery as needed.
- Adjust price ranges or amenities in `App.jsx`.
- Deploy via any static hosting provider once you run `npm run build`.

Happy mapping.

