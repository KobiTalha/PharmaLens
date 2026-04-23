// Seed script — loads data.js into Supabase PostgreSQL
// Usage: DATABASE_URL=your_connection_string node scripts/seed.js

const { Pool } = require('pg');
const { drugs } = require('../lib/data');
require('dotenv').config();

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) { console.error('❌ DATABASE_URL not set.'); process.exit(1); }
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });

  try {
    console.log(`🌱 Seeding ${drugs.length} drugs...`);

    // Clear existing data
    await pool.query('DELETE FROM aliases');
    await pool.query('DELETE FROM brands');
    await pool.query('DELETE FROM drugs');

    let brandCount = 0, aliasCount = 0;

    for (const drug of drugs) {
      await pool.query(
        'INSERT INTO drugs (id, generic_name, category, description, usage_info, dosage_type) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING',
        [drug.id, drug.generic_name, drug.category, drug.description, drug.usage_info, drug.dosage_type]
      );

      for (const brand of drug.brands) {
        await pool.query(
          'INSERT INTO brands (id, name, company, dosage, form, drug_id) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING',
          [brand.id, brand.name, brand.company, brand.dosage, brand.form, drug.id]
        );
        brandCount++;
      }

      for (const alias of (drug.aliases || [])) {
        await pool.query(
          'INSERT INTO aliases (alias, drug_id) VALUES ($1,$2)',
          [alias, drug.id]
        );
        aliasCount++;
      }
    }

    console.log(`✅ Seeded: ${drugs.length} drugs, ${brandCount} brands, ${aliasCount} aliases`);
  } catch (e) { console.error('❌ Seed failed:', e.message); }
  await pool.end();
}

seed();
