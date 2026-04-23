const db = require('../lib/db');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const name = req.query.name || '';
    if (!name) return res.status(400).json({ success: false, error: 'Brand name required' });
    const results = await db.getBrandByName(name);
    if (results.length === 0) return res.status(404).json({ success: false, error: 'Brand not found' });
    res.json({ success: true, brand: name, results });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};
