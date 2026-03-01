# 🐱 Nyanchess

> **Fork dari Lichess dengan sentuhan kucing yang menggemaskan!**

[![Version](https://img.shields.io/badge/version-1.0.0-ff6b9d)](https://github.com/nyanchess/nyanchess)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/license-AGPL-ff6b9d)](LICENSE)

Nyanchess adalah platform catur gratis, open-source, dan bebas iklan yang terinspirasi dari Lichess. Dengan tema kucing pink yang lucu, Nyanchess menghadirkan pengalaman bermain catur yang menyenangkan dan menggemaskan!

![Nyanchess Preview](https://via.placeholder.com/800x400/ff6b9d/ffffff?text=🐱+Nyanchess)

## ✨ Fitur

### 🎮 Mode Permainan
- **🤖 Play vs Bot** - Tantangan AI dengan rating 200-3000
- **🌐 Play Online** - Multiplayer real-time dengan pemain dunia
- **🧩 Daily Puzzle** - Puzzle harian untuk melatih taktik
- **⚡ Puzzle Storm** - Race melawan waktu
- **🏟️ Arena Tournament** - Turnamen online
- **📺 TV** - Tonton permainan pemain top

### 🎨 Tema
- **☀️ Light Mode** - Putih dengan aksen pink
- **🌙 Dark Mode** - Hitam dengan aksen pink
- **🐱 Nyan Cat Theme** - Animasi kucing yang menggemaskan

### 🔐 Autentikasi
- Login dengan Lichess OAuth
- Guest play (tanpa registrasi)
- Profile dengan statistik lengkap

### 📊 Fitur Lainnya
- Leaderboard global
- Game analysis
- Opening explorer
- Study/folder
- Forum
- Team
- Simul (Simultaneous exhibition)

## 🛠️ Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| **React 19** | UI Library |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI Components |
| **chess.js** | Chess Logic |
| **react-chessboard** | Chess Board |
| **Lichess API** | Backend Integration |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/nyanchess/nyanchess.git
cd nyanchess

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

### Environment Variables

Buat file `.env` di root project:

```env
VITE_LICHESS_CLIENT_ID=nyanchess
VITE_LICHESS_REDIRECT_URI=http://localhost:5173/callback
```

## 📁 Project Structure

```
nyanchess/
├── public/
│   └── sounds/           # Sound effects
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom hooks
│   ├── data/            # Static data
│   ├── types/           # TypeScript types
│   ├── lib/             # Utilities
│   ├── App.tsx          # Main app
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── README.md
├── package.json
└── vite.config.ts
```

## 🎨 Warna Tema

### Light Mode
```css
--nyan-pink: #ff6b9d;
--nyan-pink-light: #ffb8d0;
--nyan-cream: #fff5f7;
--nyan-white: #ffffff;
```

### Dark Mode
```css
--nyan-pink: #ff6b9d;
--nyan-pink-light: #ff8fab;
--nyan-cream: #1a0b2e;
--nyan-white: #0d0d1a;
```

## 🔌 Lichess API Integration

Nyanchess menggunakan Lichess API untuk:

- **Account** - User profile dan stats
- **Games** - Game history dan live games
- **Puzzles** - Daily puzzle dan puzzle storm
- **Challenges** - Create dan accept challenges
- **Board** - Real-time gameplay
- **Tournaments** - Arena dan Swiss tournaments
- **TV** - Live games dari pemain top

### Endpoints

```
https://lichess.org/api/account
https://lichess.org/api/user/{username}
https://lichess.org/api/games/user/{username}
https://lichess.org/api/puzzle/daily
https://lichess.org/api/board/game/stream/{gameId}
https://lichess.org/api/stream/event
```

## 🤖 Bot Levels

| Level | Rating | Deskripsi |
|-------|--------|-----------|
| 1 | 400 | Beginner - Random moves |
| 2 | 800 | Novice - Basic tactics |
| 3 | 1200 | Intermediate - Solid play |
| 4 | 1600 | Advanced - Good strategy |
| 5 | 2000 | Expert - Strong player |
| 6 | 2500 | Master - Very strong |
| 7 | 3000 | Grandmaster - Maximum strength |

## 🎯 Roadmap

### Phase 1 (Done)
- [x] Basic gameplay vs bot
- [x] Light/Dark theme
- [x] Sound effects
- [x] Move history

### Phase 2 (In Progress)
- [ ] Lichess OAuth login
- [ ] Real-time multiplayer
- [ ] Daily puzzles
- [ ] Leaderboard

### Phase 3 (Planned)
- [ ] Tournament system
- [ ] Game analysis
- [ ] Opening explorer
- [ ] Mobile app

### Phase 4 (Future)
- [ ] AI analysis with Stockfish
- [ ] Video lessons
- [ ] Coaching system
- [ ] Premium features

## 🤝 Contributing

Kontribusi sangat diterima! Silakan buat pull request atau buka issue.

```bash
# Fork repository
# Clone fork Anda
git clone https://github.com/YOUR_USERNAME/nyanchess.git

# Buat branch baru
git checkout -b feature/nama-fitur

# Commit changes
git commit -m "Add: nama fitur"

# Push ke branch
git push origin feature/nama-fitur

# Buat Pull Request
```

## 📄 License

[AGPL-3.0](LICENSE) - Seperti Lichess, Nyanchess juga open-source dan gratis!

## 🙏 Credits

- **Lichess** - Inspirasi dan API
- **chess.js** - Chess logic
- **react-chessboard** - Chess board component
- **shadcn/ui** - UI components
- **Nyan Cat** - Tema yang menggemaskan 🐱

## 📞 Contact

- Website: [nyanchess.vercel.app](https://nyanchess.vercel.app)
- Discord: [discord.gg/nyanchess](https://discord.gg/nyanchess)
- Twitter: [@nyanchess](https://twitter.com/nyanchess)
- Email: meow@nyanchess.com

---

<p align="center">
  <strong>🐱 Made with love and cat treats 🐟</strong>
</p>

<p align="center">
  <img src="https://via.placeholder.com/200x100/ff6b9d/ffffff?text=🐱+Meow!" alt="Nyanchess Logo">
</p>
