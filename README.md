# 💊 PharmaLens — Bangladesh Drug Intelligence Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKobiTalha%2FPharmaLens)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)](https://supabase.com/)

**🌐 Live Demo:** [https://pharmalens-alpha.vercel.app](https://pharmalens-alpha.vercel.app)

A production-grade drug intelligence platform that maps **generic medicines to brand names** across Bangladesh's pharmaceutical market.

> ⚠️ **Disclaimer:** This platform provides informational data only and does not replace professional medical advice. Always consult a licensed physician before taking any medication.

## 🎯 Features

- **🔍 Smart Search** — Fuzzy search across generics, brands, aliases, and symptom keywords
- **💊 105 Generic Drugs** — Comprehensive database covering 12 medical categories
- **🏭 441+ Brand Names** — Real Bangladeshi manufacturers (Square, Beximco, Incepta, ACME, etc.)
- **🤖 AI Chat** — Natural language queries ("What is Napa?", "Medicine for fever")
- **📂 Category Browser** — Explore drugs by therapeutic category
- **🌐 REST API** — Clean JSON endpoints for programmatic access
- **📱 Responsive UI** — Dark glassmorphism design, works on all devices
- **🚀 Vercel Ready** — Serverless deployment with Supabase PostgreSQL

## 🏗️ Architecture

```
┌──────────────────────────────────────────┐
│              Vercel CDN                   │
│         (Static Frontend SPA)            │
├──────────────────────────────────────────┤
│         Vercel Serverless APIs           │
│  /api/search  /api/drug  /api/brand     │
│  /api/categories    /api/chat            │
├──────────────────────────────────────────┤
│           Shared Libraries               │
│  lib/db.js  lib/searchEngine.js         │
│  lib/chatEngine.js  lib/data.js         │
├──────────────────────────────────────────┤
│    Supabase PostgreSQL (Production)      │
│    In-Memory Data Store (Fallback)       │
└──────────────────────────────────────────┘
```

## 📊 Drug Categories

| Category | Drugs | Example Brands |
|----------|-------|---------------|
| Fever & Pain | 10 | Napa, Ace, Profen |
| Antibiotics | 10 | Zimax, Moxacil, Ciproxin |
| Gastric & Digestive | 8 | Seclo, Maxpro, Pantonix |
| Heart & Blood Pressure | 15 | Amdocal, Losatan, Ecosprin |
| Diabetes | 8 | Comet, Amaryl, Ista |
| Asthma & Respiratory | 7 | Sultolin, Monas, Budicort |
| Cold & Allergy | 7 | Fexo, Alatrol, Piriton |
| Mental Health | 8 | Entrust, Rivotril, Gabantin |
| Skin & Dermatology | 5 | Betnovate, Nizoral, Terfin |
| Vitamins & Supplements | 5 | Calbo-D, Ferogen, Bexon |
| Dental & Oral | 5 | Hexisol, Flugal, Daktarin |
| Others | 7 | ORSaline, Almex, Emistat |

## 🔗 API Documentation

### Search
```http
GET /api/search?query=paracetamol
```
Returns drugs matching by generic name, brand name, alias, or symptom category.

### Drug Detail
```http
GET /api/drug?id=d001
GET /api/drug?category=Antibiotics
GET /api/drug?page=1
```

### Brand Lookup
```http
GET /api/brand?name=Napa
```

### Categories
```http
GET /api/categories
```

### AI Chat
```http
POST /api/chat
Content-Type: application/json
{ "message": "What is Napa?" }
```

## 🚀 Quick Start

### Local Development
```bash
# Clone and enter directory
git clone <repo-url> && cd PharmaLens

# No npm install needed for local dev (zero dependencies!)
# The server uses Node.js built-in http module

# Start development server
npm run dev
# or: node server.js

# Open http://localhost:3000
```

### Deploy to Vercel + Supabase

1. **Create Supabase project** at [supabase.com](https://supabase.com)
2. **Copy connection string** from Supabase Dashboard → Settings → Database
3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   ```
4. **Run migrations:**
   ```bash
   npm install pg  # Only needed for Supabase connection
   npm run migrate
   npm run seed
   ```
5. **Deploy to Vercel:**
   ```bash
   npx vercel
   # Set DATABASE_URL in Vercel Environment Variables
   ```

## 🧰 Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Vanilla JS SPA, CSS3, HTML5 |
| Backend | Node.js Serverless Functions |
| Database | PostgreSQL (Supabase) / In-Memory Fallback |
| Search | Custom fuzzy engine (Levenshtein + FTS) |
| Chat AI | Rule-based NLP intent detection |
| Deploy | Vercel + Supabase |
| Fonts | Inter, JetBrains Mono (Google Fonts) |

## 📁 Project Structure

```
PharmaLens/
├── api/                  # Vercel serverless API routes
│   ├── search.js         # GET /api/search
│   ├── drug.js           # GET /api/drug
│   ├── brand.js          # GET /api/brand
│   ├── categories.js     # GET /api/categories
│   └── chat.js           # POST /api/chat
├── lib/                  # Shared backend logic
│   ├── data.js           # Drug dataset (105 drugs, 441 brands)
│   ├── db.js             # Database abstraction layer
│   ├── searchEngine.js   # Fuzzy search engine
│   └── chatEngine.js     # AI chat NLP engine
├── public/               # Static frontend
│   ├── index.html
│   ├── css/styles.css
│   └── js/app.js
├── scripts/              # Utilities
│   ├── migrate.js        # PostgreSQL schema migration
│   ├── seed.js           # Data seeding to Supabase
│   └── scraper.js        # Medex Bangladesh scraper
├── server.js             # Local dev server
├── vercel.json           # Vercel deployment config
├── package.json
└── README.md
```

## ⚠️ Safety & Ethics

This platform:
- ❌ Does NOT rank brands as "best" or "worst"
- ❌ Does NOT give medical advice
- ❌ Does NOT recommend drugs over others
- ✅ Shows structured, neutral pharmaceutical information
- ✅ Displays safety disclaimers on every page
- ✅ Encourages consulting licensed physicians

## 📄 License

MIT License — For educational and informational purposes only.
