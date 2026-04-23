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
  'fever': 'Fever & Pain', 'headache': 'Fever & Pain', 'pain': 'Fever & Pain', 'body ache': 'Fever & Pain', 'inflammation': 'Fever & Pain',
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

async function getFuzzySuggestion(q) {
  try {
    const allDrugs = await db.getAllDrugs(1, 1000); // Check first 1000 drugs for typo
    let bestMatch = null;
    let minDistance = 4; // Max distance to consider

    for (const drug of allDrugs) {
      const gDist = levenshtein(q, drug.generic_name.toLowerCase());
      if (gDist < minDistance) {
        minDistance = gDist;
        bestMatch = drug.generic_name;
      }
      for (const b of (drug.brands || [])) {
        const bDist = levenshtein(q, b.name.toLowerCase());
        if (bDist < minDistance) {
          minDistance = bDist;
          bestMatch = b.name;
        }
      }
    }
    return bestMatch;
  } catch (e) {
    return null;
  }
}

async function searchSingle(q) {
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

  return { results: [], type: 'none' };
}

async function search(queryStr) {
  if (!queryStr || queryStr.trim().length === 0) return { results: [], type: 'empty' };
  let q = queryStr.trim().toLowerCase();

  // Handle Multi-Query ("fever and cough medicine", "pain, allergy")
  const splitters = /\s+and\s+|\s*,\s*|\s+&\s+/g;
  const queries = q.replace(/\s+medicine|\s+drugs|\s+tablets/g, '').split(splitters).filter(Boolean);

  if (queries.length > 1) {
    const combinedResults = [];
    const seenIds = new Set();
    const categories = [];

    for (const subQ of queries) {
      const res = await searchSingle(subQ);
      if (res.category) categories.push(res.category);
      for (const item of res.results) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          combinedResults.push(item);
        }
      }
    }
    if (combinedResults.length > 0) {
      return { results: combinedResults, type: 'multi-query', category: categories.join(', ') || null };
    }
  }

  // Single query path
  const singleResult = await searchSingle(queries[0] || q);
  if (singleResult.results.length > 0) {
    return singleResult;
  }

  // 3. Typo Correction (Did you mean?)
  const suggestion = await getFuzzySuggestion(queries[0] || q);
  if (suggestion) {
    const sugResult = await searchSingle(suggestion.toLowerCase());
    return { results: sugResult.results, type: 'fuzzy', suggestion };
  }

  return { results: [], type: 'none' };
}

module.exports = { search, levenshtein, SYMPTOM_MAP };
