const db = require('./db');

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

const SYMPTOM_MAP = {
  'fever': 'Fever & Pain', 'headache': 'Fever & Pain', 'pain': 'Fever & Pain', 'body ache': 'Fever & Pain',
  'cough': 'Cold & Allergy', 'cold': 'Cold & Allergy', 'allergy': 'Cold & Allergy', 'sneeze': 'Cold & Allergy', 'runny nose': 'Cold & Allergy',
  'infection': 'Antibiotics', 'bacterial': 'Antibiotics', 'antibiotic': 'Antibiotics',
  'asthma': 'Asthma & Respiratory', 'breathing': 'Asthma & Respiratory', 'inhaler': 'Asthma & Respiratory', 'wheeze': 'Asthma & Respiratory',
  'heart': 'Heart & Blood Pressure', 'blood pressure': 'Heart & Blood Pressure', 'bp': 'Heart & Blood Pressure', 'cardiac': 'Heart & Blood Pressure', 'hypertension': 'Heart & Blood Pressure',
  'diabetes': 'Diabetes', 'sugar': 'Diabetes', 'insulin': 'Diabetes', 'blood sugar': 'Diabetes',
  'stomach': 'Gastric & Digestive', 'acidity': 'Gastric & Digestive', 'gastric': 'Gastric & Digestive', 'ulcer': 'Gastric & Digestive', 'digestion': 'Gastric & Digestive',
  'dental': 'Dental & Oral', 'tooth': 'Dental & Oral', 'gum': 'Dental & Oral', 'oral': 'Dental & Oral',
  'skin': 'Skin & Dermatology', 'rash': 'Skin & Dermatology', 'fungal': 'Skin & Dermatology', 'eczema': 'Skin & Dermatology',
  'depression': 'Mental Health', 'anxiety': 'Mental Health', 'sleep': 'Mental Health', 'insomnia': 'Mental Health',
  'vitamin': 'Vitamins & Supplements', 'calcium': 'Vitamins & Supplements', 'iron': 'Vitamins & Supplements', 'supplement': 'Vitamins & Supplements',
  'worm': 'Others', 'diarrhea': 'Others', 'dehydration': 'Others'
};

async function search(queryStr) {
  if (!queryStr || queryStr.trim().length === 0) return { results: [], type: 'empty' };
  const q = queryStr.trim().toLowerCase();

  // 1. Check symptom/category mapping
  for (const [keyword, category] of Object.entries(SYMPTOM_MAP)) {
    if (q.includes(keyword)) {
      const results = await db.getDrugsByCategory(category);
      if (results.length > 0) return { results, type: 'category', category };
    }
  }

  // 2. Direct search
  const direct = await db.searchDrugs(q);
  if (direct.length > 0) return { results: direct, type: 'direct' };

  // 3. Fuzzy search fallback (in-memory only)
  const { drugs } = require('./data');
  const fuzzy = [];
  drugs.forEach(drug => {
    const gDist = levenshtein(q, drug.generic_name.toLowerCase());
    if (gDist <= 3) fuzzy.push({ ...drug, _score: gDist, _matchType: 'generic_fuzzy' });
    drug.brands.forEach(b => {
      const bDist = levenshtein(q, b.name.toLowerCase());
      if (bDist <= 2) fuzzy.push({ ...drug, _score: bDist, _matchType: 'brand_fuzzy' });
    });
  });
  fuzzy.sort((a, b) => a._score - b._score);
  if (fuzzy.length > 0) return { results: fuzzy.slice(0, 20), type: 'fuzzy' };

  return { results: [], type: 'none' };
}

module.exports = { search, levenshtein, SYMPTOM_MAP };
