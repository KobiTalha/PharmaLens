// Medex Bangladesh Scraper — Data Ingestion Pipeline
// Usage: node scripts/scraper.js [generic_name]
// Requires: npm install axios cheerio

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://medex.com.bd';
const DELAY_MS = 2000; // Respectful crawling delay

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function searchMedex(query) {
  try {
    console.log(`🔍 Searching Medex for: ${query}`);
    const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'PharmaLens-DataBot/1.0 (Educational Research)', 'Accept': 'text/html' },
      timeout: 10000
    });
    const $ = cheerio.load(data);
    const results = [];

    // Parse search results (structure may vary)
    $('a[href*="/generics/"], a[href*="/brands/"]').each((_, el) => {
      const name = $(el).text().trim();
      const href = $(el).attr('href');
      if (name && href) results.push({ name, url: BASE_URL + href, type: href.includes('/generics/') ? 'generic' : 'brand' });
    });

    console.log(`  Found ${results.length} results`);
    return results;
  } catch (e) {
    console.error(`  ❌ Search failed: ${e.message}`);
    return [];
  }
}

async function scrapeGenericPage(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'PharmaLens-DataBot/1.0 (Educational Research)' },
      timeout: 10000
    });
    const $ = cheerio.load(data);
    const drug = {
      generic_name: $('h1').first().text().trim(),
      category: '',
      description: '',
      brands: []
    };

    // Extract info sections
    $('p, .description, .indications').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 20 && text.length < 500 && !drug.description) drug.description = text;
    });

    // Extract brand list
    $('a[href*="/brands/"]').each((_, el) => {
      const name = $(el).text().trim();
      const row = $(el).closest('tr, .brand-item, li');
      const company = row.find('.company, .manufacturer, td:nth-child(2)').text().trim();
      const dosage = row.find('.strength, .dosage, td:nth-child(3)').text().trim();
      if (name) drug.brands.push({ name, company: company || 'Unknown', dosage: dosage || 'N/A', form: 'Tablet' });
    });

    return drug;
  } catch (e) {
    console.error(`  ❌ Scrape failed: ${e.message}`);
    return null;
  }
}

async function main() {
  const query = process.argv[2];
  if (!query) {
    console.log('📋 PharmaLens Medex Scraper');
    console.log('Usage: node scripts/scraper.js <generic_name>');
    console.log('Example: node scripts/scraper.js paracetamol');
    console.log('\nThis scraper searches Medex Bangladesh and extracts:');
    console.log('  - Generic drug information');
    console.log('  - Brand names and manufacturers');
    console.log('  - Dosage information');
    console.log('\n⚠️  Please use responsibly. Respect rate limits.');
    return;
  }

  const results = await searchMedex(query);
  const generics = results.filter(r => r.type === 'generic');

  if (generics.length === 0) {
    console.log('No generic results found. Trying brand search...');
    const brandResults = results.filter(r => r.type === 'brand');
    if (brandResults.length > 0) {
      console.log(`Found ${brandResults.length} brand results`);
      brandResults.slice(0, 5).forEach(b => console.log(`  - ${b.name}: ${b.url}`));
    }
    return;
  }

  const outputData = [];
  for (const generic of generics.slice(0, 3)) {
    console.log(`\n📄 Scraping: ${generic.name} (${generic.url})`);
    const drug = await scrapeGenericPage(generic.url);
    if (drug) {
      outputData.push(drug);
      console.log(`  ✅ ${drug.generic_name}: ${drug.brands.length} brands found`);
      drug.brands.slice(0, 5).forEach(b => console.log(`     - ${b.name} (${b.company})`));
    }
    await sleep(DELAY_MS);
  }

  // Save results
  const outPath = path.join(__dirname, '..', 'scraped_data.json');
  fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2));
  console.log(`\n💾 Results saved to ${outPath}`);
}

main().catch(console.error);
