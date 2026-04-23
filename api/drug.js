const db = require('../lib/db');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const { id, category, page } = req.query;
    if (id) {
      const drug = await db.getDrugById(id);
      if (!drug) return res.status(404).json({ success: false, error: 'Drug not found' });
      return res.json({ success: true, drug });
    }
    if (category) {
      const drugs = await db.getDrugsByCategory(category);
      return res.json({ success: true, count: drugs.length, drugs });
    }
    const drugs = await db.getAllDrugs(parseInt(page) || 1, 20);
    res.json({ success: true, count: drugs.length, drugs });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};
