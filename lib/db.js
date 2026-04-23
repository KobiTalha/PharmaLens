let Pool;
try { Pool = require('pg').Pool; } catch(e) { Pool = null; }

let pool = null;

function getPool() {
  if (!Pool) return null;
  if (!pool) {

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return null;
    }
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000
    });
  }
  return pool;
}

// In-memory fallback when no DATABASE_URL
let memoryDB = null;

function getMemoryDB() {
  if (!memoryDB) {
    const { drugs } = require('./data');
    memoryDB = { drugs };
  }
  return memoryDB;
}

async function query(text, params) {
  const p = getPool();
  if (p) {
    const res = await p.query(text, params);
    return res.rows;
  }
  return [];
}

async function searchDrugs(term) {
  const p = getPool();
  if (p) {
    const q = `%${term.toLowerCase()}%`;
    return await query(
      `SELECT d.*, json_agg(json_build_object('id',b.id,'name',b.name,'company',b.company,'dosage',b.dosage,'form',b.form)) as brands
       FROM drugs d LEFT JOIN brands b ON b.drug_id = d.id
       WHERE LOWER(d.generic_name) LIKE $1 OR LOWER(d.category) LIKE $1 OR LOWER(d.description) LIKE $1
       OR d.id IN (SELECT drug_id FROM brands WHERE LOWER(name) LIKE $1)
       OR d.id IN (SELECT drug_id FROM aliases WHERE LOWER(alias) LIKE $1)
       GROUP BY d.id ORDER BY d.generic_name LIMIT 50`, [q]
    );
  }
  // In-memory fallback
  const db = getMemoryDB();
  const t = term.toLowerCase();
  return db.drugs.filter(d =>
    d.generic_name.toLowerCase().includes(t) ||
    d.category.toLowerCase().includes(t) ||
    d.description.toLowerCase().includes(t) ||
    d.brands.some(b => b.name.toLowerCase().includes(t)) ||
    (d.aliases || []).some(a => a.toLowerCase().includes(t))
  ).slice(0, 50);
}

async function getDrugById(id) {
  const p = getPool();
  if (p) {
    const rows = await query(
      `SELECT d.*, json_agg(json_build_object('id',b.id,'name',b.name,'company',b.company,'dosage',b.dosage,'form',b.form)) as brands
       FROM drugs d LEFT JOIN brands b ON b.drug_id = d.id WHERE d.id = $1 GROUP BY d.id`, [id]
    );
    return rows[0] || null;
  }
  const db = getMemoryDB();
  return db.drugs.find(d => d.id === id) || null;
}

async function getBrandByName(name) {
  const p = getPool();
  const t = name.toLowerCase();
  if (p) {
    const rows = await query(
      `SELECT b.*, d.generic_name, d.category, d.description, d.usage_info, d.dosage_type
       FROM brands b JOIN drugs d ON d.id = b.drug_id WHERE LOWER(b.name) = $1`, [t]
    );
    return rows;
  }
  const db = getMemoryDB();
  const results = [];
  db.drugs.forEach(d => {
    d.brands.forEach(b => {
      if (b.name.toLowerCase() === t) {
        results.push({ ...b, generic_name: d.generic_name, category: d.category, description: d.description, usage_info: d.usage_info, dosage_type: d.dosage_type, drug_id: d.id });
      }
    });
  });
  return results;
}

async function getCategories() {
  const p = getPool();
  if (p) {
    return await query(`SELECT category, COUNT(*) as count FROM drugs GROUP BY category ORDER BY category`);
  }
  const db = getMemoryDB();
  const cats = {};
  db.drugs.forEach(d => { cats[d.category] = (cats[d.category] || 0) + 1; });
  return Object.entries(cats).map(([category, count]) => ({ category, count: String(count) })).sort((a,b) => a.category.localeCompare(b.category));
}

async function getDrugsByCategory(cat) {
  const p = getPool();
  const t = cat.toLowerCase();
  if (p) {
    return await query(
      `SELECT d.*, json_agg(json_build_object('id',b.id,'name',b.name,'company',b.company,'dosage',b.dosage,'form',b.form)) as brands
       FROM drugs d LEFT JOIN brands b ON b.drug_id = d.id WHERE LOWER(d.category) LIKE $1 GROUP BY d.id ORDER BY d.generic_name`, [`%${t}%`]
    );
  }
  const db = getMemoryDB();
  return db.drugs.filter(d => d.category.toLowerCase().includes(t));
}

async function getAllDrugs(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const p = getPool();
  if (p) {
    return await query(
      `SELECT d.*, json_agg(json_build_object('id',b.id,'name',b.name,'company',b.company,'dosage',b.dosage,'form',b.form)) as brands
       FROM drugs d LEFT JOIN brands b ON b.drug_id = d.id GROUP BY d.id ORDER BY d.generic_name LIMIT $1 OFFSET $2`, [limit, offset]
    );
  }
  const db = getMemoryDB();
  return db.drugs.slice(offset, offset + limit);
}

module.exports = { query, searchDrugs, getDrugById, getBrandByName, getCategories, getDrugsByCategory, getAllDrugs, getPool };
