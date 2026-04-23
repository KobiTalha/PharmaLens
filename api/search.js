const { search } = require('../lib/searchEngine');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const q = req.query.query || req.query.q || '';
    const result = await search(q);
    res.json({ success: true, query: q, type: result.type, category: result.category || null, count: result.results.length, results: result.results });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};
