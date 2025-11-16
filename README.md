# 🎵 Stupid Spotify

A hilariously bad Spotify clone built for a 5-hour hackathon with intentionally terrible early 2000s GeoCities aesthetic. Features an AI chatbot that gaslights you about your music choices and plays random songs instead of the ones you click.

## 🎯 Judging Criteria
- **Stupidity** - How stupid is the concept?
- **Execution of the Bad Idea** - How well is the bad idea implemented?
- **Creativity** - How creative is the stupid idea?
- **Chaos & Entertainment Value** - How entertaining is the chaos?

## ✨ Features

- 🤡 **Intentionally Horrible UI** - Early 2000s GeoCities aesthetic with Comic Sans, neon colors, and 3D borders
- 🤖 **Gaslighting AI Chatbot** - Powered by Cohere AI, roasts your music taste in Gen Z slang
- 💀 **3D Spinning Skull** - Built with Three.js, because why not
- 🎨 **Billboard Hot 100 Songs** - Real chart data grouped by (fake) cover art colors
- 🔊 **Random Sound Effects** - Plays random SFX when you click songs
- 🎲 **Gaslight Mode** - Click a song, get a different one (TODO: implement)

## 🛠️ Tech Stack

### Core Framework
- **Next.js** 16.0.3 - React framework with App Router
- **React** 19.2.0 - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS** 4 - Utility-first CSS (used ironically)
- **PostCSS** - CSS processing

### AI & APIs
- **Cohere AI** (`cohere-ai`) - AI chatbot for gaslighting
  - Model: `command-r-08-2024`
  - Temperature: 1.2 (for maximum chaos)

### 3D Graphics
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Data Extraction (Python)
- **BeautifulSoup4** - HTML parsing for Billboard Hot 100 data
- **Python** 3.11+ - For scraping scripts

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "16.0.3",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "cohere-ai": "^7.15.2",
    "three": "^0.170.0",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.117.3"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^9",
    "tailwindcss": "^4.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.0.3"
  }
}
```

## 🚀 Getting Started

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
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```bash
COHERE_API_KEY=your_cohere_api_key_here
```

4. **Add sound effects (optional)**

Add your favorite meme sound effects (.mp3, .wav, .ogg) to `public/sfx/`:
- bruh.mp3
- yeet.mp3
- vine-boom.mp3
- emotional-damage.mp3
- etc.

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to experience the chaos.

### Extracting Billboard Data (Optional)

If you want to refresh the Billboard Hot 100 data:

1. Install Python dependencies:
```bash
pip install beautifulsoup4
```

2. Place your Billboard HTML file in the root directory

3. Run the parser:
```bash
python parse_billboard.py
```

This will generate `data/billboardSongs.ts` with the top 50 songs.

## 📁 Project Structure

```
stupid-spotify/
├── app/
│   ├── page.tsx              # Main page with song grid
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── chat/
│           └── route.ts      # Cohere AI API endpoint
├── components/
│   ├── GaslightBot.tsx       # AI chatbot UI
│   ├── DancingBaby.tsx       # 3D spinning skull
│   └── Player.tsx            # Music player (not implemented)
├── data/
│   ├── songs.ts              # Original bad songs
│   └── billboardSongs.ts     # Billboard Hot 100 data
├── hooks/
│   └── useAudioPlayer.ts     # Audio playback hook
├── lib/
│   └── musicPlayer.ts        # Play random song logic + roasts
├── public/
│   ├── billboard/            # Song cover images
│   ├── sfx/                  # Sound effects
│   └── skull_downloadable/   # 3D skull model
└── services/
    └── songService.ts        # Song data service
```

## 🎨 Features in Detail

### AI Gaslighting Chatbot
- Powered by Cohere's `command-r-08-2024` model
- Generates unique roasts in skibidi/Gen Z slang
- Auto-roasts your song choices when you click play
- Messages include song titles and artists for personalized gaslighting

### Billboard Hot 100 Integration
- Top 50 songs from Billboard charts
- Songs grouped by fake "cover art color detection"
- Unknown artists replaced with random hilarious names:
  - Lil Yeet, Big Chungus, DJ Skibidi, PostAlone, Billie Eyelash, etc.

### Intentionally Bad Design
- Early 2000s GeoCities aesthetic
- Comic Sans, Impact, and Arial Black fonts
- Neon colors: cyan, magenta, yellow, lime
- 3D CSS borders (ridge, groove, outset)
- Rotating cards, random emojis, visitor counter
- Blinking text and rainbow dividers

## 🤝 Contributing

This is a hackathon project meant to be hilariously bad. PRs that make it worse are encouraged!

## 📄 License

MIT - Do whatever you want with this mess

## 🙏 Acknowledgments

- Billboard for the chart data
- Cohere for the AI that roasts users
- Early 2000s web designers for the inspiration
- Gen Z for the slang fr fr no cap 💀

---

Built with ❤️ and maximum chaos for a 5-hour hackathon
