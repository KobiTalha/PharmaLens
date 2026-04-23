const { getPool } = require('../lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ success: false, error: 'Database not available' });
    }

    // Top searched queries
    const topSearchesResult = await pool.query(`
      SELECT query, COUNT(*) as search_count 
      FROM search_logs 
      GROUP BY query 
      ORDER BY search_count DESC 
      LIMIT 10
    `);

    // Total searches
    const totalSearchesResult = await pool.query(`
      SELECT COUNT(*) as total FROM search_logs
    `);

    // Category popularity based on searches (simplification, assuming queries might match categories, or we could just return total drugs per category)
    const categoryPopularity = await pool.query(`
      SELECT category, COUNT(*) as drug_count
      FROM drugs
      GROUP BY category
      ORDER BY drug_count DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        topSearches: topSearchesResult.rows,
        totalSearches: parseInt(totalSearchesResult.rows[0].total, 10),
        categoryPopularity: categoryPopularity.rows
      }
    });

  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
