# Gemini API Setup

## Why You Need a Key

Gemini powers the on-demand synthetic listings. Splitz stays free for mapping, but you must supply a Gemini API key for generated data.

---

## Steps

1. Visit https://aistudio.google.com/app/apikey
2. Generate a key
3. Create `.env` and add (you can use this placeholder for demos):

```
VITE_GEMINI_API_KEY=AIzaSyB_SS7F0HGG8q4jI5YNLR4ryn-yLINoGoM
```

4. Run `npm install` then `npm run dev`

---

## Quick Reference

```bash
npm install
npm run dev
```

If Gemini is unreachable, Splitz falls back to local placeholder listings.

Happy building.

