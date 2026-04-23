// Local development server - mimics Vercel's serverless structure
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const MIME = { '.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.webp':'image/webp' };

// Import API handlers
const searchHandler = require('./api/search');
const drugHandler = require('./api/drug');
const brandHandler = require('./api/brand');
const categoriesHandler = require('./api/categories');
const chatHandler = require('./api/chat');
const analyticsHandler = require('./api/analytics');

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { resolve({}); } });
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // API routes
  if (pathname.startsWith('/api/')) {
    req.query = parsed.query;
    if (req.method === 'POST') req.body = await parseBody(req);
    res.setHeader('Content-Type', 'application/json');

    // Vercel compatibility shims
    if (!res.status) res.status = (code) => { res.statusCode = code; return res; };
    if (!res.json) res.json = (data) => { res.end(JSON.stringify(data)); };


    const route = pathname.replace('/api/', '').split('/')[0];
    try {
      switch (route) {
        case 'search': return await searchHandler(req, res);
        case 'drug': return await drugHandler(req, res);
        case 'brand': return await brandHandler(req, res);
        case 'categories': return await categoriesHandler(req, res);
        case 'chat': return await chatHandler(req, res);
        case 'analytics': return await analyticsHandler(req, res);
        default: res.statusCode = 404; return res.end(JSON.stringify({ error: 'Not found' }));
      }
    } catch (e) { res.statusCode = 500; return res.end(JSON.stringify({ error: e.message })); }
  }

  // Static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, 'public', filePath);
  const ext = path.extname(filePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    return fs.createReadStream(filePath).pipe(res);
  }

  // SPA fallback
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'public', 'index.html')).pipe(res);
});

server.listen(PORT, () => {
  const { drugs } = require('./lib/data');
  const brandCount = drugs.reduce((s, d) => s + d.brands.length, 0);
  console.log(`\n  💊 PharmaLens running at http://localhost:${PORT}`);
  console.log(`  📊 ${drugs.length} drugs | ${brandCount} brands loaded`);
  console.log(`  🔍 API: http://localhost:${PORT}/api/search?query=paracetamol\n`);
});
