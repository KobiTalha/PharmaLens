/* PharmaLens — SPA Application */
(function() {
'use strict';

const API = '/api';
const CATEGORY_ICONS = {'Fever & Pain':'🤒','Antibiotics':'💉','Gastric & Digestive':'🫁','Heart & Blood Pressure':'❤️','Diabetes':'🩸','Asthma & Respiratory':'🌬️','Cold & Allergy':'🤧','Mental Health':'🧠','Skin & Dermatology':'🧴','Vitamins & Supplements':'💊','Dental & Oral':'🦷','Others':'📦'};
let debounceTimer = null;
let chatHistory = [];

// === API Client ===
async function api(endpoint, opts = {}) {
  try {
    const res = await fetch(API + endpoint, {
      ...opts,
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    return await res.json();
  } catch (e) { console.error('API Error:', e); return { success: false, error: e.message }; }
}

// === Router ===
function route() {
  const hash = location.hash.slice(1) || '/';
  const main = document.getElementById('main-content');
  const parts = hash.split('/').filter(Boolean);

  // Update active nav
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + hash || (hash === '/' && l.dataset.nav === 'home'));
  });

  if (hash === '/' || hash === '') return renderHome(main);
  if (parts[0] === 'search') return renderSearch(main, decodeURIComponent(parts.slice(1).join('/')));
  if (parts[0] === 'drug') return renderDrugDetail(main, parts[1]);
  if (parts[0] === 'categories') return renderCategories(main);
  if (parts[0] === 'category') return renderCategoryView(main, decodeURIComponent(parts.slice(1).join('/')));
  if (parts[0] === 'chat') return renderChat(main);
  renderHome(main);
}

// === Home ===
async function renderHome(el) {
  el.innerHTML = `
    <section class="hero">
      <div class="hero-badge">🔬 Bangladesh Drug Intelligence Platform</div>
      <h1>Find Any Medicine<br>in <span class="grad">Bangladesh</span></h1>
      <p>Search 100+ generic drugs, 440+ brand names across 12 categories. Powered by structured pharmaceutical data.</p>
      <div class="hero-search">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" id="hero-search-input" placeholder="Try: Paracetamol, Napa, fever medicine...">
          <button class="hero-search-btn" id="hero-search-btn">Search</button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat"><div class="stat-num" id="stat-drugs">105</div><div class="stat-label">Generics</div></div>
        <div class="stat"><div class="stat-num" id="stat-brands">441</div><div class="stat-label">Brands</div></div>
        <div class="stat"><div class="stat-num" id="stat-cats">12</div><div class="stat-label">Categories</div></div>
      </div>
    </section>
    <section class="section"><h2 class="section-title">📂 Drug Categories</h2><p class="section-sub">Browse medicines by therapeutic category</p><div class="cat-grid" id="home-categories"><div class="skeleton"></div></div></section>
    <section class="section"><h2 class="section-title">🔥 Featured Drugs</h2><p class="section-sub">Commonly searched medicines in Bangladesh</p><div class="drug-grid" id="home-drugs"><div class="skeleton"></div><div class="skeleton"></div></div></section>`;

  // Hero search
  const heroInput = document.getElementById('hero-search-input');
  const heroBtn = document.getElementById('hero-search-btn');
  heroInput.addEventListener('keydown', e => { if (e.key === 'Enter' && heroInput.value.trim()) location.hash = '/search/' + encodeURIComponent(heroInput.value.trim()); });
  heroBtn.addEventListener('click', () => { if (heroInput.value.trim()) location.hash = '/search/' + encodeURIComponent(heroInput.value.trim()); });
  setTimeout(() => heroInput.focus(), 100);

  // Load categories
  const catData = await api('/categories');
  if (catData.success) {
    document.getElementById('home-categories').innerHTML = catData.categories.map(c =>
      `<div class="cat-card" onclick="location.hash='/category/${encodeURIComponent(c.category)}'">
        <span class="cat-icon">${CATEGORY_ICONS[c.category] || '💊'}</span>
        <div class="cat-name">${c.category}</div>
        <div class="cat-count">${c.count} drugs</div>
      </div>`
    ).join('');
  }

  // Load featured drugs
  const drugData = await api('/drug?page=1');
  if (drugData.success) {
    document.getElementById('home-drugs').innerHTML = drugData.drugs.slice(0, 6).map(d => drugCard(d)).join('');
  }
}

// === Search Results ===
async function renderSearch(el, query) {
  el.innerHTML = `<section class="section"><div class="loader"><div class="spinner"></div></div></section>`;
  const data = await api('/search?query=' + encodeURIComponent(query));

  if (!data.success || data.count === 0) {
    el.innerHTML = `<section class="section"><button class="back-btn" onclick="history.back()">← Back</button><div class="no-results"><h2>No results for "${escHtml(query)}"</h2><p>Try different spelling or search by category</p></div></section>`;
    return;
  }

  const typeClass = data.type === 'fuzzy' ? 'fuzzy' : data.type === 'category' ? 'category' : 'direct';
  const typeLabel = data.type === 'fuzzy' ? 'Fuzzy Match' : data.type === 'category' ? `Category: ${data.category}` : 'Direct Match';

  el.innerHTML = `<section class="section">
    <button class="back-btn" onclick="history.back()">← Back</button>
    <div class="results-header">
      <h2 class="section-title">🔍 Results for "${escHtml(query)}"</h2>
      <div><span class="results-count">${data.count} found</span> <span class="results-type ${typeClass}">${typeLabel}</span></div>
    </div>
    <div class="drug-grid">${data.results.map((d, i) => drugCard(d, i)).join('')}</div>
    <div class="disclaimer-banner"><span>⚠️</span><p>Consult a licensed physician before using any medication. This platform does not provide medical advice.</p></div>
  </section>`;
}

// === Drug Detail ===
async function renderDrugDetail(el, id) {
  el.innerHTML = `<div class="drug-detail"><div class="loader"><div class="spinner"></div></div></div>`;
  const data = await api('/drug?id=' + id);

  if (!data.success || !data.drug) {
    el.innerHTML = `<div class="drug-detail"><button class="back-btn" onclick="history.back()">← Back</button><div class="no-results"><h2>Drug not found</h2></div></div>`;
    return;
  }

  const d = data.drug;
  const brands = d.brands || [];

  el.innerHTML = `<div class="drug-detail">
    <button class="back-btn" onclick="history.back()">← Back</button>
    <div class="drug-detail-header">
      <h1>💊 ${escHtml(d.generic_name)}</h1>
      <div class="drug-meta">
        <span class="meta-pill">${CATEGORY_ICONS[d.category] || '📦'} ${escHtml(d.category)}</span>
        <span class="meta-pill">📋 ${brands.length} Brands</span>
        <span class="meta-pill">💉 ${escHtml(d.dosage_type || 'Various')}</span>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-card"><h3>📝 Description</h3><p>${escHtml(d.description || 'N/A')}</p></div>
      <div class="info-card"><h3>📖 Usage</h3><p>${escHtml(d.usage_info || 'Consult physician')}</p></div>
      ${d.aliases && d.aliases.length ? `<div class="info-card"><h3>🏷️ Also Known As</h3><p>${d.aliases.map(a => escHtml(a)).join(', ')}</p></div>` : ''}
    </div>
    <h2 class="section-title" style="margin-bottom:1rem">🏭 Available Brands in Bangladesh</h2>
    <table class="brands-table">
      <thead><tr><th>Brand Name</th><th>Manufacturer</th><th>Dosage</th><th>Form</th></tr></thead>
      <tbody>${brands.map(b => `<tr><td style="color:var(--text);font-weight:600">${escHtml(b.name)}</td><td>${escHtml(b.company)}</td><td><code style="color:var(--accent);font-family:var(--mono);font-size:.85rem">${escHtml(b.dosage)}</code></td><td>${escHtml(b.form)}</td></tr>`).join('')}</tbody>
    </table>
    <div class="disclaimer-banner"><span>⚠️</span><p>This information is for educational purposes only. Do not self-medicate. Always consult a licensed physician before taking any medication. No brand is ranked or recommended over another.</p></div>
  </div>`;
}

// === Categories ===
async function renderCategories(el) {
  el.innerHTML = `<section class="section"><h2 class="section-title">📂 All Categories</h2><p class="section-sub">Browse medicines by therapeutic category</p><div class="cat-grid"><div class="skeleton"></div></div></section>`;
  const data = await api('/categories');
  if (data.success) {
    el.querySelector('.cat-grid').innerHTML = data.categories.map(c =>
      `<div class="cat-card" onclick="location.hash='/category/${encodeURIComponent(c.category)}'">
        <span class="cat-icon">${CATEGORY_ICONS[c.category] || '💊'}</span>
        <div class="cat-name">${c.category}</div>
        <div class="cat-count">${c.count} drugs</div>
      </div>`
    ).join('');
  }
}

// === Category View ===
async function renderCategoryView(el, category) {
  el.innerHTML = `<section class="section"><div class="loader"><div class="spinner"></div></div></section>`;
  const data = await api('/drug?category=' + encodeURIComponent(category));
  el.innerHTML = `<section class="section">
    <button class="back-btn" onclick="location.hash='/categories'">← Back to Categories</button>
    <h2 class="section-title">${CATEGORY_ICONS[category] || '📦'} ${escHtml(category)}</h2>
    <p class="section-sub">${data.count || 0} medicines in this category</p>
    <div class="drug-grid">${(data.drugs || []).map((d, i) => drugCard(d, i)).join('')}</div>
  </section>`;
}

// === Chat ===
function renderChat(el) {
  el.innerHTML = `<div class="chat-container">
    <div class="chat-messages" id="chat-messages">
      <div class="chat-msg bot">👋 <strong>Welcome to PharmaLens AI!</strong><br>I can help you find information about medicines in Bangladesh. Try asking:<br><br>• "What is Napa?"<br>• "Brands of Paracetamol"<br>• "Medicine for fever"<br><br><em style="color:var(--text3)">⚠️ I provide information only — not medical advice.</em></div>
      <div class="chat-suggestions" id="chat-suggestions">
        <div class="suggest-chip" onclick="sendChat('What is Napa?')">What is Napa?</div>
        <div class="suggest-chip" onclick="sendChat('Brands of Omeprazole')">Brands of Omeprazole</div>
        <div class="suggest-chip" onclick="sendChat('Medicine for headache')">Medicine for headache</div>
        <div class="suggest-chip" onclick="sendChat('Tell me about Azithromycin')">About Azithromycin</div>
      </div>
    </div>
    <div class="chat-input-area">
      <input type="text" id="chat-input" placeholder="Ask about any medicine..." autocomplete="off">
      <button class="chat-send-btn" id="chat-send" aria-label="Send">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </button>
    </div>
  </div>`;

  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(input.value); });
  sendBtn.addEventListener('click', () => sendChat(input.value));
  setTimeout(() => input.focus(), 100);
}

window.sendChat = async function(msg) {
  if (!msg || !msg.trim()) return;
  const messages = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  if (input) input.value = '';

  // Hide suggestions
  const sug = document.getElementById('chat-suggestions');
  if (sug) sug.style.display = 'none';

  // User message
  messages.innerHTML += `<div class="chat-msg user">${escHtml(msg)}</div>`;
  messages.innerHTML += `<div class="typing-indicator" id="typing"><span></span><span></span><span></span></div>`;
  messages.scrollTop = messages.scrollHeight;

  const data = await api('/chat', { method: 'POST', body: { message: msg } });
  const typing = document.getElementById('typing');
  if (typing) typing.remove();

  if (data.success) {
    let reply = data.reply.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    // Add inline drug cards
    if (data.drugs && data.drugs.length > 0) {
      reply += '<div style="margin-top:.75rem">';
      data.drugs.slice(0, 3).forEach(d => {
        const drugId = d.id || d.drug_id;
        if (drugId) {
          reply += `<div class="drug-inline" onclick="location.hash='/drug/${drugId}'"><strong>${escHtml(d.generic_name || d.name)}</strong>${d.category ? ' — ' + escHtml(d.category) : ''}</div>`;
        }
      });
      reply += '</div>';
    }
    messages.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
  } else {
    messages.innerHTML += `<div class="chat-msg bot">Sorry, something went wrong. Please try again.</div>`;
  }
  messages.scrollTop = messages.scrollHeight;
};

// === Helpers ===
function drugCard(d, i = 0) {
  const brands = d.brands || [];
  const shown = brands.slice(0, 4);
  const more = brands.length - 4;
  return `<div class="drug-card" style="animation-delay:${i * .05}s" onclick="location.hash='/drug/${d.id}'">
    <div class="drug-card-header">
      <div class="drug-name">${escHtml(d.generic_name)}</div>
      <span class="drug-category-badge">${CATEGORY_ICONS[d.category] || '📦'} ${escHtml(d.category)}</span>
    </div>
    <div class="drug-desc">${escHtml(d.description || '')}</div>
    <div class="drug-brands-preview">
      ${shown.map(b => `<span class="brand-chip">${escHtml(b.name)}</span>`).join('')}
      ${more > 0 ? `<span class="brand-more">+${more} more</span>` : ''}
    </div>
  </div>`;
}

function escHtml(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// === Header Search with Autocomplete ===
function initHeaderSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('autocomplete-dropdown');
  if (!input) return;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    if (q.length < 2) { dropdown.classList.remove('show'); return; }
    debounceTimer = setTimeout(async () => {
      const data = await api('/search?query=' + encodeURIComponent(q));
      if (!data.success || data.count === 0) { dropdown.classList.remove('show'); return; }
      dropdown.innerHTML = data.results.slice(0, 8).map(d => {
        const type = d._matchType === 'brand_fuzzy' || d._matchType === 'brand' ? 'brand' : 'generic';
        return `<div class="ac-item" onclick="location.hash='/drug/${d.id}';document.getElementById('autocomplete-dropdown').classList.remove('show')">
          <span class="ac-type ${type}">${type}</span>
          <div><div class="ac-name">${escHtml(d.generic_name)}</div><div class="ac-sub">${(d.brands||[]).slice(0,3).map(b=>b.name).join(', ')}</div></div>
        </div>`;
      }).join('');
      dropdown.classList.add('show');
    }, 250);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      dropdown.classList.remove('show');
      location.hash = '/search/' + encodeURIComponent(input.value.trim());
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) dropdown.classList.remove('show');
  });

  // Ctrl+K shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); input.focus(); }
  });
}

// === Mobile Menu ===
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-links');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));
  }
}

// === Init ===
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  initMobileMenu();
  route();
});

})();
