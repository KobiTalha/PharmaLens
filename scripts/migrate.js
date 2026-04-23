// Database migration script for Supabase PostgreSQL
// Usage: DATABASE_URL=your_connection_string node scripts/migrate.js

const { Pool } = require('pg');
require('dotenv').config();

const SCHEMA = `
CREATE TABLE IF NOT EXISTS drugs (
  id TEXT PRIMARY KEY,
  generic_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  usage_info TEXT,
  dosage_type TEXT,
  dosage_forms TEXT,
  warnings TEXT,
  contraindications TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  dosage TEXT,
  form TEXT,
  drug_id TEXT NOT NULL REFERENCES drugs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS aliases (
  id SERIAL PRIMARY KEY,
  alias TEXT NOT NULL,
  drug_id TEXT NOT NULL REFERENCES drugs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS search_logs (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  search_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_drugs_category ON drugs(category);
CREATE INDEX IF NOT EXISTS idx_drugs_generic ON drugs(LOWER(generic_name));
CREATE INDEX IF NOT EXISTS idx_brands_name ON brands(LOWER(name));
CREATE INDEX IF NOT EXISTS idx_brands_drug ON brands(drug_id);
CREATE INDEX IF NOT EXISTS idx_aliases_alias ON aliases(LOWER(alias));
CREATE INDEX IF NOT EXISTS idx_aliases_drug ON aliases(drug_id);

ALTER TABLE drugs ADD COLUMN IF NOT EXISTS dosage_forms TEXT;
ALTER TABLE drugs ADD COLUMN IF NOT EXISTS warnings TEXT;
ALTER TABLE drugs ADD COLUMN IF NOT EXISTS contraindications TEXT;
`;

async function migrate() {
  const url = process.env.DATABASE_URL;
  if (!url) { console.error('❌ DATABASE_URL not set. Copy .env.example to .env and configure.'); process.exit(1); }
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  try {
    console.log('🔄 Running migration...');
    await pool.query(SCHEMA);
    console.log('✅ Migration complete!');
    const { rows } = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
    console.log('📋 Tables:', rows.map(r => r.tablename).join(', '));
  } catch (e) { console.error('❌ Migration failed:', e.message); }
  await pool.end();
}

migrate();
