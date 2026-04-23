const db = require('../lib/db');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const categories = await db.getCategories();
    res.json({ success: true, categories });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};
