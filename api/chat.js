const { chat } = require('../lib/chatEngine');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') return res.status(400).json({ success: false, error: 'Message required and must be text' });
    if (message.length > 200) return res.status(400).json({ success: false, error: 'Message too long. Maximum 200 characters.' });
    const result = await chat(message);
    res.json({ success: true, ...result });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};
