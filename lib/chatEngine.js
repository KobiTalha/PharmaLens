const db = require('./db');
const { search, SYMPTOM_MAP } = require('./searchEngine');

const DISCLAIMER = '⚠️ This information is for educational purposes only. Always consult a licensed physician before taking any medication.';

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
  const brandList = (drug.brands || []).map(b => `  • **${b.name}** — ${b.company} (${b.dosage}, ${b.form})`).join('\n');
  return `💊 **${drug.generic_name}** [${drug.category}]\n${drug.description}\n\n📋 **Brands:**\n${brandList}\n\n📖 **Usage:** ${drug.usage_info || 'Consult physician'}\n💉 **Form:** ${drug.dosage_type || 'Various'}`;
}

async function chat(message) {
  const { intent, entity } = detectIntent(message);

  switch (intent) {
    case 'greeting':
      return { reply: `Hello! 👋 I'm PharmaLens AI assistant. I can help you find information about medicines in Bangladesh.\n\nTry asking:\n• "What is Napa?"\n• "Brands of Paracetamol"\n• "Medicine for fever"\n\n${DISCLAIMER}`, drugs: [] };

    case 'thanks':
      return { reply: `You're welcome! 😊 Feel free to ask anything about medicines.\n\n${DISCLAIMER}`, drugs: [] };

    case 'help':
      return { reply: `🤖 **PharmaLens Chat Help**\n\nI can help with:\n• **Drug lookup:** "What is Amoxicillin?"\n• **Brand search:** "Brands of Omeprazole"\n• **Category search:** "Medicine for headache"\n• **Brand info:** "Tell me about Napa"\n\n${DISCLAIMER}`, drugs: [] };

    case 'identify': {
      // Try brand first
      const brandResults = await db.getBrandByName(entity);
      if (brandResults.length > 0) {
        const b = brandResults[0];
        return {
          reply: `**${brandResults[0].name}** is a brand of **${b.generic_name}** [${b.category}].\nManufactured by: ${b.company}\nDosage: ${b.dosage} (${b.form || 'Tablet'})\n\n${b.description || ''}\n\n${DISCLAIMER}`,
          drugs: brandResults
        };
      }
      // Try generic
      const searchRes = await search(entity);
      if (searchRes.results.length > 0) {
        const drug = searchRes.results[0];
        return { reply: formatDrugCard(drug) + `\n\n${DISCLAIMER}`, drugs: searchRes.results.slice(0, 5) };
      }
      return { reply: `I couldn't find information about "${entity}". Please check the spelling or try a different name.\n\n${DISCLAIMER}`, drugs: [] };
    }

    case 'search_brands': {
      const res = await search(entity);
      if (res.results.length > 0) {
        const drug = res.results[0];
        const brandCount = (drug.brands || []).length;
        return { reply: `Found **${brandCount} brands** for **${drug.generic_name}**:\n\n${formatDrugCard(drug)}\n\n${DISCLAIMER}`, drugs: res.results.slice(0, 5) };
      }
      return { reply: `No brands found for "${entity}". Try searching with the generic name.\n\n${DISCLAIMER}`, drugs: [] };
    }

    case 'search_category': {
      const res = await search(entity);
      if (res.results.length > 0) {
        const names = res.results.slice(0, 8).map(d => `• **${d.generic_name}** — ${(d.brands||[]).slice(0,3).map(b=>b.name).join(', ')}`).join('\n');
        return { reply: `Found ${res.results.length} medicines related to "${entity}":\n\n${names}\n\nClick on any result for detailed brand information.\n\n${DISCLAIMER}`, drugs: res.results.slice(0, 10) };
      }
      return { reply: `No medicines found for "${entity}". Try different keywords.\n\n${DISCLAIMER}`, drugs: [] };
    }

    default: {
      const res = await search(entity || message);
      if (res.results.length > 0) {
        const drug = res.results[0];
        return { reply: formatDrugCard(drug) + `\n\n${DISCLAIMER}`, drugs: res.results.slice(0, 5) };
      }
      return { reply: `I couldn't understand your query. Try:\n• "What is [drug name]?"\n• "Brands of [generic name]"\n• "Medicine for [condition]"\n\n${DISCLAIMER}`, drugs: [] };
    }
  }
}

module.exports = { chat, detectIntent, DISCLAIMER };
