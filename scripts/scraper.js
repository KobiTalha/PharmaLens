// Medex Bangladesh Scraper — Data Ingestion Pipeline
// Usage: node scripts/scraper.js [generic_names...]
// Requires: npm install axios cheerio pg dotenv

require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { Pool } = require('pg');
const crypto = require('crypto');

const BASE_URL = 'https://medex.com.bd';
const DELAY_MS = 2000;
const MAX_RETRIES = 3;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

function generateId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'PharmaLens-DataBot/2.0 (Educational Research)', 'Accept': 'text/html' },
        timeout: 15000
      });
      return response.data;
    } catch (e) {
      console.warn(`  ⚠️ Attempt ${i + 1} failed for ${url}: ${e.message}`);
      if (i === retries - 1) throw e;
      await sleep(DELAY_MS * (i + 1));
    }
  }
}

async function searchMedex(query) {
  try {
    console.log(`\n🔍 Searching Medex for: ${query}`);
    const data = await fetchWithRetry(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(data);
    const results = [];

    $('a[href*="/generics/"]').each((_, el) => {
      const name = $(el).text().trim();
      const href = $(el).attr('href');
      if (name && href) results.push({ name, url: BASE_URL + href });
    });

    return results;
  } catch (e) {
    console.error(`  ❌ Search failed: ${e.message}`);
    return [];
  }
}

async function scrapeGenericPage(url) {
  try {
    const data = await fetchWithRetry(url);
    const $ = cheerio.load(data);
    
    const drug = {
      generic_name: $('h1.page-heading-1-l').first().text().trim() || $('h1').first().text().trim(),
      category: '',
      description: '',
      usage_info: '',
      dosage_forms: '',
      warnings: '',
      contraindications: '',
      brands: []
    };

    if (!drug.generic_name) return null;

    // Extract sections
    $('#indications').nextUntil('.ac-body').each((_, el) => { drug.usage_info += $(el).text().trim() + ' '; });
    $('#description').nextUntil('.ac-body').each((_, el) => { drug.description += $(el).text().trim() + ' '; });
    $('#contraindications').nextUntil('.ac-body').each((_, el) => { drug.contraindications += $(el).text().trim() + ' '; });
    $('#precautions').nextUntil('.ac-body').each((_, el) => { drug.warnings += $(el).text().trim() + ' '; });
    $('.drug-class').each((_, el) => { drug.category = $(el).text().trim().replace(/Therapeutic Class: /i, ''); });

    drug.description = drug.description.substring(0, 500).trim();
    drug.usage_info = drug.usage_info.substring(0, 500).trim();
    drug.contraindications = drug.contraindications.substring(0, 500).trim();
    drug.warnings = drug.warnings.substring(0, 500).trim();

    // Extract brands
    $('a[href*="/brands/"]').each((_, el) => {
      const name = $(el).find('span').first().text().trim() || $(el).text().trim();
      const row = $(el).closest('tr, .row, .brand-item');
      if (name) {
        drug.brands.push({
          name: name.replace(/\s+/g, ' ').trim(),
          company: 'Extracted Company', // Simplify or parse more specifically if DOM known
          dosage: 'N/A',
          form: 'Tablet'
        });
      }
    });
    
    // Deduplicate brands
    const uniqueBrands = [];
    const seen = new Set();
    for (const b of drug.brands) {
      if (!seen.has(b.name.toLowerCase())) {
        seen.add(b.name.toLowerCase());
        uniqueBrands.push(b);
      }
    }
    drug.brands = uniqueBrands;

    return drug;
  } catch (e) {
    console.error(`  ❌ Scrape failed: ${e.message}`);
    return null;
  }
}

async function saveToSupabase(drug) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const drugId = generateId(drug.generic_name);
    
    // Insert Drug
    await client.query(`
      INSERT INTO drugs (id, generic_name, category, description, usage_info, dosage_forms, warnings, contraindications)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        description = EXCLUDED.description,
        usage_info = EXCLUDED.usage_info,
        warnings = EXCLUDED.warnings,
        contraindications = EXCLUDED.contraindications
    `, [drugId, drug.generic_name, drug.category || 'General', drug.description, drug.usage_info, drug.dosage_forms, drug.warnings, drug.contraindications]);

    // Insert Brands
    for (const brand of drug.brands) {
      const brandId = crypto.randomUUID();
      await client.query(`
        INSERT INTO brands (id, name, company, dosage, form, drug_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING
      `, [brandId, brand.name, brand.company, brand.dosage, brand.form, drugId]);
    }

    await client.query('COMMIT');
    console.log(`  💾 Saved ${drug.generic_name} with ${drug.brands.length} brands to Supabase`);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(`  ❌ DB Save failed for ${drug.generic_name}: ${e.message}`);
  } finally {
    client.release();
  }
}

async function main() {
  const queries = process.argv.slice(2);
  if (queries.length === 0) {
    queries.push('paracetamol', 'azithromycin', 'omeprazole', 'amoxicillin', 'ibuprofen'); // Default seed
  }

  console.log('📋 PharmaLens Data Ingestion Pipeline Starting...');
  console.log(`Total queries to process: ${queries.length}`);

  let successCount = 0;
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    console.log(`\n[${i + 1}/${queries.length}] Processing: ${q}`);
    
    const generics = await searchMedex(q);
    if (generics.length === 0) {
      console.log(`  ⚠️ No generic found for ${q}`);
      continue;
    }

    // Process top 2 generics per query to avoid overwhelming
    for (const generic of generics.slice(0, 2)) {
      console.log(`  📄 Scraping: ${generic.name} (${generic.url})`);
      const drug = await scrapeGenericPage(generic.url);
      if (drug) {
        await saveToSupabase(drug);
        successCount++;
      }
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n✅ Pipeline complete. Successfully ingested ${successCount} generics.`);
  await pool.end();
}

main().catch(e => {
  console.error('Fatal Error:', e);
  pool.end();
});
