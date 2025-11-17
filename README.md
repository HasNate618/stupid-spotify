# 💀🎵 STUPID SPOTIFY 🎵💀

> *"What if Spotify was built by a time traveler from 2003 who only knew Comic Sans and lies?"*

## 🚨 WARNING: THIS IS THE STUPIDEST THING WE'VE EVER BUILT 🚨

Welcome to **Stupid Spotify** - a hilariously cursed Spotify clone that plays random songs, gaslights you with an AI chatbot, and looks like a GeoCities website had a baby with a MySpace page. Built in **5 chaotic hours** for a hackathon where stupidity was literally the judging criteria.

## 🤔 WHY THO???

Because we could. Also because the hackathon judges wanted:
- **STUPIDITY** - Is it dumb? ✅ YES
- **EXECUTION** - Is it well-made garbage? ✅ ABSOLUTELY  
- **CREATIVITY** - Is it creative? ✅ UNFORTUNATELY
- **CHAOS** - Does it cause chaos? ✅ MAXIMUM CHAOS

## FEATURES (AKA THE STUPID STUFF)

### Real Spotify Playback (The Only Smart Thing Here)
- **ACTUAL Spotify integration** using OAuth 2.0 and Web Playback SDK
- Click random song button → plays ACTUAL music from a cringe music playlist
- Full playback controls that work (shocking, we know)
- Requires Spotify Premium because we're fancy like that

### AI Chatbot That GASLIGHTS You
- Powered by **Cohere AI** (command-r-08-2024 model)
- Ask it for music recommendations → it roasts you in Gen Z slang
- Temperature set to **1.2** for MAXIMUM UNHINGED ENERGY
- 18 different skibidi toilet jokes programmed in
- Will tell you your music taste is "mid" and "not bussin fr fr"

### Stupid Face Matching CAPTCHA
- Uses webcam and face detection (face-api.js)
- User must match their face to a stupid meme image (e.g. thinking monkey, confused Wojak)
- If you don't match, you can't proceed (the dumbest security ever)
- Great for making users feel as dumb as the app
  
### Spinning 3D Skull Background
- Implemented by rotating a 3D model using three.js
- 💀

### Billboard Hot 100 (But Make It Stupid)
- Scraped real Billboard chart data with Python
- Songs grouped by fake "cover art colors" 
- Click a song → **plays a DIFFERENT random song**
- Song data not scraped properly were replaced with "Lil Yeet" and "DJ Skibidi"

### Early 2000s Aesthetic
- **Comic Sans MS everywhere** (yes, really)
- Neon lime green, hot pink, and cyan colors
- 3D borders on literally everything
- Slanted buttons with `transform: rotate()` and `skewX()`
- Marquee scrolling text (we brought it back!)
- Random sticker images floating around
- Background patterns that hurt your eyes

## HOW WE BUILT THIS MONSTROSITY

### Tech Stack (Actually Kinda Modern???)
- **Next.js 16.0.3** - Because we needed server-side rendering for some reason
- **React 18.3.1** - (Downgraded from 19 because Three.js broke everything)
- **TypeScript** - For type safety in our stupid code
- **Tailwind CSS 4** - Used ironically to make ugly things
- **Spotify Web API + Web Playback SDK** - The only smart part
- **Cohere AI** - For the gaslighting chatbot
- **Python + BeautifulSoup4** - Scraped Billboard Hot 100 data
- **Three.js + @react-three/fiber** - For the 3D skull model
- **face-api.js + react-webcam** - For the stupid face matching CAPTCHA

### The Build Process (5 Hours of Chaos)

**Hour 1: "Let's make it bad on purpose"**
- Set up Next.js project
- Scraped Billboard Hot 100 with Python
- Made the ugliest UI possible with Comic Sans

**Hour 2: "We need more stupid features"**
- Added Cohere AI chatbot
- Programmed it to gaslight users
- Added 18 skibidi toilet roasts

**Hour 3: "SPINNING SKULL TIME"**
- Implemented a 3D skull model with Three.js and @react-three/fiber
- Skull rotates and glows with neon pink
- Fallback to CSS spinning emoji if 3D fails

**Hour 4: "Wait, we should add REAL Spotify"**
- Built complete OAuth 2.0 flow in Next.js API routes
- Struggled with localhost vs 127.0.0.1 cookie issues for 30 mins
- Token persistence with httpOnly cookies
- Web Playback SDK integration
- IT ACTUALLY WORKS???

**Hour 5: "MAKE IT STUPIDER"**
- Slanted the player controls with CSS transforms
- Added fake visualizer bars
- Marquee scrolling track names
- Random scattered images
- Neon glows EVERYWHERE
- Built face-matching CAPTCHA with webcam + face detection
- Implemented stupid meme face library (thinking monkey, ec.)
- Submitted at 3:59 PM**

### Spotify Integration Deep Dive

Because this is actually the coolest part:

1. **OAuth Flow** (`/api/spotify/login` → Spotify → `/api/spotify/callback`)
   - User clicks "Connect Spotify"
   - Redirects to Spotify authorization
   - Comes back with auth code
   - Exchange code for access + refresh tokens
   - Store in httpOnly cookies for security

2. **Token Management** (`/lib/spotifyTokens.ts`)
   - Tokens stored in memory + cookies
   - Automatic refresh when expired
   - 30-day refresh token lifespan

3. **Web Playback SDK** (`components/SpotifyPlayer.tsx`)
   - Loads Spotify's JavaScript player
   - Creates virtual device in your account
   - Play/pause/skip controls
   - Real-time playback state
   - Premium account required (SDK limitation)

4. **Random Song Player** (`/api/spotify/play-random`)
   - Fetches tracks from hardcoded playlist
   - Picks random track
   - Plays on Web Playback SDK device
   - Shows track info in bottom dock

## DEPENDENCIES (THE RECEIPTS)

```json
{
  "dependencies": {
    "@react-three/drei": "^9.114.3",
    "@react-three/fiber": "^8.17.10",
    "cohere-ai": "^7.19.0",
    "next": "16.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.169.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "eslint": "^9",
    "eslint-config-next": "16.0.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```


## GETTING STARTED (IF YOU DARE)

### Prerequisites
- **Node.js** 18+ (we used 20)
- **Spotify Premium Account** (Web Playback SDK requirement)
- **Spotify Developer App** (for OAuth credentials)
- **Cohere AI API Key** (for the gaslighting chatbot)
- A questionable sense of humor

### Environment Variables

Create a `.env.local` file in the root:

```bash
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
SPOTIFY_PLAYLIST_ID=03ILOfXD4E6VlS70yYZdtW  # Our hardcoded playlist

# Cohere AI
COHERE_API_KEY=your_cohere_api_key
```

### Spotify Developer Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://127.0.0.1:3000/api/spotify/callback`
4. **IMPORTANT:** Use `127.0.0.1` NOT `localhost` (trust us on this)
5. Copy your Client ID and Client Secret

### Installation & Running

```bash
# Install dependencies
npm install --legacy-peer-deps  # Because React versions are a mess

# Run development server
npm run dev

# Open browser (MUST USE 127.0.0.1)
# http://127.0.0.1:3000
```

### First Time Setup

1. Open `http://127.0.0.1:3000`
2. Click "Connect Spotify" in the bottom player
3. Authorize the app
4. Get redirected back
5. Click "Play Random Song"
6. Enjoy the chaos

## 📁 PROJECT STRUCTURE (THE GUTS)

```
stupid-spotify/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Server-side)
│   │   ├── chat/
│   │   │   └── route.ts         # Cohere AI chatbot endpoint
│   │   └── spotify/
│   │       ├── callback/
│   │       │   └── route.ts     # OAuth callback handler
│   │       ├── login/
│   │       │   └── route.ts     # OAuth initiation
│   │       ├── play-random/
│   │       │   └── route.ts     # Play random song from playlist
│   │       └── token/
│   │           └── route.ts     # Token management & refresh
│   ├── globals.css              # Global styles + custom animations
│   ├── layout.tsx               # Root layout with fonts
│   └── page.tsx                 # Main page (THE CHAOS)
│
├── components/                   # React Components
│   ├── DancingBaby.tsx          # CSS spinning skull emoji 💀
│   ├── GaslightBot.tsx          # AI chatbot UI
│   ├── Player.tsx               # Fake player for Billboard songs
│   └── SpotifyPlayer.tsx        # REAL Spotify player with slanted controls
│
├── data/                        # Static data
│   ├── billboardSongs.ts        # Top 50 Billboard songs (scraped)
│   └── songs.ts                 # Fake song data
│
├── lib/                         # Utility libraries
│   ├── musicPlayer.ts           # Song click handler + roast generator
│   └── spotifyTokens.ts         # Token storage & management
│
├── public/                      # Static assets
│   ├── sfx/                     # Random sound effects
│   └── images/                  # Scattered sticker images
│
├── .env.local                   # Environment variables (YOU CREATE THIS)
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind CSS config
└── parse_billboard.py           # Python scraper for Billboard data
```

## 🎨 KEY FILES EXPLAINED

### `app/page.tsx` - The Main Chaos
- 395 lines of pure stupidity
- Billboard songs grouped by fake colors
- Scattered random images
- All components assembled here

### `components/SpotifyPlayer.tsx` - The Actually Good Part
- 376 lines of Spotify integration
- OAuth state management
- Web Playback SDK initialization
- Slanted controls with CSS transforms
- Bottom dock player with cyberpunk aesthetic

### `app/api/spotify/callback/route.ts` - The OAuth Magic
- Exchanges auth code for tokens
- Stores in httpOnly cookies
- Redirects to `127.0.0.1:3000?authorized=true`
- **Key fix:** Using 127.0.0.1 consistently for cookie sharing

### `components/GaslightBot.tsx` - The Unhinged AI
- Cohere AI integration
- System prompt: "roast user's music taste in Gen Z slang"
- Temperature: 1.2 (chaos mode)
- 18 programmed skibidi roasts

### `lib/musicPlayer.ts` - The Deception Engine
- Plays random SFX when you click songs
- Generates roast messages
- Integrates with Spotify player
- The core of the "stupid" functionality

## 🎯 STUPID DESIGN DECISIONS

1. **Comic Sans MS** - Used unironically everywhere
2. **Slanted buttons** - `transform: rotate(-8deg) skewX(-5deg)`
3. **Polygon clip-paths** - Irregular button shapes
4. **Multiple shadows** - Up to 3 shadow layers per element
5. **Neon glows** - `0 0 40px rgba(255,0,0,0.9)`
6. **Marquee text** - CSS animation marquee (deprecated tag brought back)
7. **Random positioned stickers** - Fixed position images everywhere
8. **Fake visualizer** - 12 bouncing bars that do nothing
9. **127.0.0.1 instead of localhost** - Because cookies
10. **Temperature 1.2 AI** - Maximum chaos in responses

## 🐛 BUGS WE FIXED (DEBUGGING SAGA)

### The localhost vs 127.0.0.1 Cookie War (30 mins lost)
- **Problem:** Cookies set on `127.0.0.1` not readable on `localhost`
- **Symptoms:** Authorization worked but tokens disappeared
- **Solution:** Use `127.0.0.1` EVERYWHERE in redirects and env vars
- **Lesson:** Browser treats them as different origins

### The React 19 ReactCurrentOwner Apocalypse (1 hour lost)
- **Problem:** Three.js libraries broke with React 19
- **Error:** `Cannot read properties of undefined (reading 'ReactCurrentOwner')`
- **Solution:** Downgraded to React 18.3.1
- **Backup plan:** Replaced 3D skull with CSS emoji when still broken

### The Duplicate Player Instance Bug
- **Problem:** Multiple Spotify players spawning on hot-reload
- **Solution:** Check for existing player, disconnect before creating new
- **Code:** Added script existence check and cleanup

### The Token Persistence Issue
- **Problem:** In-memory tokens lost on dev server restart
- **Solution:** Store in httpOnly cookies, restore on page load
- **Implementation:** Check cookies first, fallback to memory

## �🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (for Billboard data extraction)
- Cohere API key ([get one free](https://cohere.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/HasNate618/stupid-spotify.git
cd stupid-spotify
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```bash
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
SPOTIFY_PLAYLIST_ID=5xbMyvLwLbtlhKuAOfWpsa

# Cohere AI
COHERE_API_KEY=your_cohere_api_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://127.0.0.1:3000
```
**IMPORTANT:** Use `127.0.0.1` NOT `localhost` for OAuth to work!

### Optional: Add Sound Effects

Add meme sound effects to `public/sfx/`:
- bruh.mp3
- yeet.mp3  
- vine-boom.mp3
- emotional-damage.mp3

They'll play randomly when you click songs.

### Optional: Refresh Billboard Data

```bash
pip install beautifulsoup4
python parse_billboard.py
```

## 🎮 HOW TO USE

1. **Open** `http://127.0.0.1:3000`
2. **Connect Spotify** - Click button in bottom player
3. **Authorize** - Allow app access (Premium required)
4. **Play Random Song** - Click the giant slanted play button
5. **Get Roasted** - Ask the AI chatbot for music recs
6. **Click Billboard Songs** - They play different songs lol
7. **Enjoy Chaos** - Watch the spinning skull, neon glows, and Comic Sans

## HACKATHON RESULTS

**Awards:**
- 🏅 Won **Worst User Experience** at Stupid Hackathon @ Western University 2025

**What We Learned:**
- OAuth 2.0 is actually not that hard
- `127.0.0.1` ≠ `localhost` in browser cookie land
- Comic Sans MS can make anything worse
- Cohere AI at temperature 1.2 is unhinged
- CSS transforms can make professional-looking things look stupid
- You can build a working Spotify player in 1 hour if you're desperate
- GeoCities aesthetic is timeless (in a bad way)

## 📝 LICENSE

MIT License - Do whatever you want with this cursed code

## ⚠️ DISCLAIMER

This project is satire. We know it's ugly. That's the point. If you actually deploy this to production, that's on you fam. No cap fr fr.

---

Made with 💀 and questionable decisions in 5 hours

*"It's not a bug, it's a stupid feature"* - The Developers, probably
