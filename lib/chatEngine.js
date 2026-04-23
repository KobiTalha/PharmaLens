const db = require('./db');
const { search } = require('./searchEngine');

const DISCLAIMER = '⚠️ **Disclaimer:** This platform is for informational purposes only. Do NOT use this for medical advice. Always consult a licensed physician or pharmacist.';

const INTENTS = [
  { name: 'greeting', patterns: [/^(hi|hello|hey|greetings|howdy|assalamu|salam)/i] },
  { name: 'identify', patterns: [/what is (.+)/i, /tell me about (.+)/i, /info(?:rmation)? (?:on|about) (.+)/i, /describe (.+)/i] },
  { name: 'search_brands', patterns: [/brands? (?:of|for) (.+)/i, /(.+) brands?/i, /which brands? (?:have|contain|make) (.+)/i, /generic (.+)/i] },
  { name: 'search_category', patterns: [/medicine for (.+)/i, /drug for (.+)/i, /treatment for (.+)/i, /(?:i have|got) (.+)/i, /(.+) medicine/i, /(.+) treatment/i] },
  { name: 'help', patterns: [/^(help|how|guide|what can you)/i] },
  { name: 'thanks', patterns: [/^(thanks|thank you|thx|ty)/i] },
];

function detectIntent(message) {
  const msg = message.trim().toLowerCase();
  for (const intent of INTENTS) {
    for (const pattern of intent.patterns) {
      const match = msg.match(pattern);
      if (match) {
        const entity = match[1] || match[2] || '';
        return { intent: intent.name, entity: entity.trim().replace(/[?.!]+$/, '') };
      }
    }
  }
  return { intent: 'search_generic', entity: msg.replace(/[?.!]+$/, '') };
}

function formatDrugCard(drug) {
  let card = `### 💊 ${drug.generic_name} \n**Class:** ${drug.category || 'General'}\n\n`;
  card += `*${drug.description || 'No description available.'}*\n\n`;
  
  if (drug.usage_info) card += `**📖 Indications:**\n${drug.usage_info}\n\n`;
  if (drug.dosage_forms) card += `**💊 Dosage Forms:**\n${drug.dosage_forms}\n\n`;
  if (drug.warnings) card += `**⚠️ Precautions:**\n${drug.warnings}\n\n`;
  if (drug.contraindications) card += `**⛔ Contraindications:**\n${drug.contraindications}\n\n`;

  card += `**📋 Top Brands:**\n`;
  const brands = (drug.brands || []).slice(0, 5);
  if (brands.length > 0) {
    brands.forEach(b => {
      card += `- **${b.name}** (${b.company}) — ${b.dosage || ''} ${b.form || ''}\n`;
    });
    if ((drug.brands || []).length > 5) {
      card += `- *...and ${(drug.brands || []).length - 5} more brands*\n`;
    }
  } else {
    card += `- No specific brands listed.\n`;
  }
  return card;
}

async function chat(message) {
  const { intent, entity } = detectIntent(message);

  switch (intent) {
    case 'greeting':
      return { reply: `Hello! 👋 I'm PharmaLens AI assistant. I can help you find information about medicines in Bangladesh.\n\nTry asking:\n• "What is Napa?"\n• "Brands of Paracetamol"\n• "Medicine for fever and cough"\n\n${DISCLAIMER}`, drugs: [] };

    case 'thanks':
      return { reply: `You're welcome! 😊 Feel free to ask anything about medicines.\n\n${DISCLAIMER}`, drugs: [] };

    case 'help':
      return { reply: `🤖 **PharmaLens Chat Help**\n\nI can help with:\n• **Drug lookup:** "What is Amoxicillin?"\n• **Brand search:** "Brands of Omeprazole"\n• **Category search:** "Medicine for headache"\n• **Brand info:** "Tell me about Napa"\n• **Multi-symptom:** "fever and cold medicine"\n\n${DISCLAIMER}`, drugs: [] };

    case 'identify': {
      // Try brand first
      const brandResults = await db.getBrandByName(entity);
      if (brandResults.length > 0) {
        const b = brandResults[0];
        return {
          reply: `### 🔖 ${b.name}\n**Generic:** ${b.generic_name}\n**Class:** ${b.category || 'General'}\n**Company:** ${b.company}\n**Dosage:** ${b.dosage} (${b.form || 'Tablet'})\n\n${b.description || ''}\n\n${DISCLAIMER}`,
          drugs: brandResults
        };
      }
      // Try generic
      const searchRes = await search(entity);
      if (searchRes.results.length > 0) {
        const drug = searchRes.results[0];
        const extraText = searchRes.suggestion ? `*(Did you mean **${searchRes.suggestion}**?)*\n\n` : '';
        return { reply: extraText + formatDrugCard(drug) + `\n\n${DISCLAIMER}`, drugs: searchRes.results.slice(0, 5) };
      }
      return { reply: `I couldn't find information about "${entity}". Please check the spelling or try a different name.\n\n${DISCLAIMER}`, drugs: [] };
    }

    case 'search_brands': {
      const res = await search(entity);
      if (res.results.length > 0) {
        const drug = res.results[0];
        const extraText = res.suggestion ? `*(Did you mean **${res.suggestion}**?)*\n\n` : '';
        return { reply: `${extraText}Found **${(drug.brands || []).length} brands** for **${drug.generic_name}**:\n\n${formatDrugCard(drug)}\n\n${DISCLAIMER}`, drugs: res.results.slice(0, 5) };
      }
      return { reply: `No brands found for "${entity}". Try searching with the generic name.\n\n${DISCLAIMER}`, drugs: [] };
    }

    case 'search_category': {
      const res = await search(entity);
      if (res.results.length > 0) {
        const title = res.type === 'multi-query' ? `Medicines for "${entity}"` : `Medicines related to "${entity}"`;
        let replyText = `### 🔍 ${title}\n\n`;
        res.results.slice(0, 5).forEach(d => {
          replyText += `**${d.generic_name}**\n- *${(d.brands||[]).slice(0,3).map(b=>b.name).join(', ')}*\n\n`;
        });
        return { reply: replyText + `\n\n${DISCLAIMER}`, drugs: res.results.slice(0, 5) };
      }
      return { reply: `No medicines found for "${entity}". Try different keywords like "fever" or "allergy".\n\n${DISCLAIMER}`, drugs: [] };
    }

    default: {
      const res = await search(entity || message);
      if (res.results.length > 0) {
        if (res.results.length > 1 && res.type !== 'direct') {
          // It's a list response
          let replyText = `### 🔍 Results for "${entity || message}"\n\n`;
          if (res.suggestion) replyText += `*(Did you mean **${res.suggestion}**?)*\n\n`;
          res.results.slice(0, 5).forEach(d => {
            replyText += `**${d.generic_name}**\n- *${(d.brands||[]).slice(0,3).map(b=>b.name).join(', ')}*\n\n`;
          });
          return { reply: replyText + `\n\n${DISCLAIMER}`, drugs: res.results.slice(0, 5) };
        } else {
          // Single drug
          const drug = res.results[0];
          const extraText = res.suggestion ? `*(Did you mean **${res.suggestion}**?)*\n\n` : '';
          return { reply: extraText + formatDrugCard(drug) + `\n\n${DISCLAIMER}`, drugs: res.results.slice(0, 5) };
        }
      }
      return { reply: `I couldn't understand your query or find results for it.\n\nTry:\n• "What is [drug name]?"\n• "Brands of [generic name]"\n• "Medicine for [condition]"\n\n${DISCLAIMER}`, drugs: [] };
    }
  }
}

module.exports = { chat, detectIntent, DISCLAIMER };
