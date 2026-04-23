const { search } = require('../lib/searchEngine');
const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const q = req.query.query || req.query.q || '';
    if (q.length > 100) {
      return res.status(400).json({ success: false, error: 'Query too long. Maximum 100 characters allowed.' });
    }
    const result = await search(q);

    const pool = getPool();
    if (pool && q.trim()) {
      pool.query('INSERT INTO search_logs (query, results_count, search_type) VALUES ($1, $2, $3)', [q.trim(), result.results.length, result.type]).catch(() => {});
    }

    res.json({ success: true, query: q, type: result.type, category: result.category || null, count: result.results.length, results: result.results, suggestion: result.suggestion || null });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};
