# 💊 PharmaLens — Bangladesh Drug Intelligence Platform

PharmaLens is a highly-optimized, serverless drug intelligence platform that maps generic medications to brand names available in Bangladesh. It features an intelligent search engine, an AI-powered conversational chatbot, and a robust data ingestion pipeline.

## 🚀 Overview

PharmaLens aims to provide reliable, fast, and accessible information about medicines in Bangladesh. 

**Key Features:**
- **Smart Search System:** Supports generic, brand, category, and symptom-based searches with multi-query capability and typo correction ("Did you mean?").
- **AI Chatbot:** Conversational interface for natural language queries, intent detection, and structured markdown responses.
- **Robust Data Pipeline:** Built-in scraper using Axios and Cheerio to continuously ingest and normalize drug data directly into a PostgreSQL database.
- **Search Analytics:** Tracks popular queries and trending medications.
- **High Performance:** Client-side caching, search debouncing, and optimized database queries.

⚠️ **Disclaimer:** *This platform is for informational purposes only. Do NOT use this for medical advice. Always consult a licensed physician or pharmacist. PharmaLens does NOT rank drugs or endorse any specific brand.*

## 📐 Architecture Diagram

```mermaid
graph TD
    Client[Frontend SPA] --> |REST API| API[Vercel Serverless Functions]
    API --> |Queries| DB[(Supabase PostgreSQL)]
    
    subgraph Data Pipeline
        Scraper[scraper.js] --> |Extract & Normalize| Sources[External Pharmacies / Medex]
        Scraper --> |Upsert Data| DB
    end
    
    subgraph Core Engines
        API -.-> SearchEngine[Search Engine<br>Fuzzy Match, Multi-Query]
        API -.-> ChatEngine[Chat Engine<br>Intent Detection]
    end
```

## 🛠️ Tech Stack
- **Frontend:** Vanilla JS, HTML, CSS (Glassmorphism UI, Responsive)
- **Backend:** Node.js, Vercel Serverless Functions
- **Database:** PostgreSQL (via Supabase)
- **Ingestion:** Axios, Cheerio

## 📡 API Documentation

### `GET /api/search`
Search for drugs, brands, or symptoms.
- **Params:** `query` (string)
- **Returns:** List of matching drugs, search type, and potential suggestions.

### `POST /api/chat`
Interact with the AI chatbot.
- **Body:** `{ "message": "query string" }`
- **Returns:** Structured markdown reply and related drug data.

### `GET /api/drug`
Get details of a specific drug or list all.
- **Params:** `id` (string), `category` (string), `page` (number)

### `GET /api/categories`
List all therapeutic categories and their counts.

### `GET /api/analytics`
View search trends and popular queries.

## ⚙️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/pharmalens.git
   cd pharmalens
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and add your Supabase connection string.
   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

4. **Initialize Database Schema:**
   ```bash
   npm run migrate
   ```

5. **Run the Ingestion Pipeline:**
   Scrape and populate the database with initial data.
   ```bash
   npm run scrape
   ```
   *To scrape specific drugs: `npm run scrape paracetamol napa`*

6. **Start Local Server:**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`

## ☁️ Deployment Guide (Vercel + Supabase)

1. **Supabase:**
   - Create a new project in [Supabase](https://supabase.com).
   - Get the Connection String from Database Settings.
   - Run `npm run migrate` locally using the Supabase connection string to setup tables.

2. **Vercel:**
   - Install Vercel CLI or link GitHub repo directly in Vercel Dashboard.
   - Go to Project Settings > Environment Variables in Vercel.
   - Add `DATABASE_URL` pointing to your Supabase instance.
   - Deploy! Vercel will automatically host the `public` folder and route `/api/*` to the serverless functions in the `api` folder.
