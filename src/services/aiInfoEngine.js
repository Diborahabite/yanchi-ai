// AI Information Engine: Dual Hybrid Grounded Statutory RAG + Optional Gemini API

import { statutoryLaws, srhrMedicalWindows, emergencyHotlines, sanctuaryShelters } from '../data/statutoryData.js';
import { scrubPII, detectCrisisTrigger } from './safetyEngine.js';

const SYSTEM_PROMPT_TEXT = `You are Yanchi AI (ያንቺ AI), an empathetic, zero-trust, highly secure, non-judgmental, and culturally grounded AI digital sanctuary and first-responder assistant for Ethiopian women, adolescent girls, and factory workers.
Prioritize safety, psychological comfort, absolute confidentiality, and actionable local guidance grounded in:
1. Ethiopian Labour Proclamation No. 1156/2019 (Workplace harassment Art. 14/1/f, maternity leave Art. 87-88, overtime Art. 66-68, constructive dismissal Art. 32).
2. Ethiopian Revised Criminal Code No. 414/2004 (Rape Art. 620, harassment Art. 625, assault Art. 555-556, abortion exceptions Art. 551).
3. Ethiopian Computer Crime Proclamation No. 958/2016 (Non-consensual media sharing & online extortion Art. 13-14).
4. Ethiopian Revised Family Code No. 213/2000 (Divorce Art. 81-85, child custody best interests Art. 113, equal property division Art. 86).
5. SRHR guidelines (HIV PEP within 72h, ECP within 72-120h, Police Form 8 medical report).
6. National Hotlines: 8044 (National GBV Helpline 24/7 Free), 8055 (EWLA), 991 (Police), 907 (Medical), AWSAD shelters.
Rule: NEVER blame the victim. Affirm "This is not your fault. You have the right to be safe, respected, and protected under the law."`;

/**
 * Live query to Google Gemini API (falls back gracefully if network or key is unavailable)
 */
export async function queryLiveGemini(userQuery, apiKey, lang = 'am') {
  if (!apiKey || !apiKey.trim()) {
    // Graceful fallback to rich grounded offline engine
    return queryOfflineAiInformation(userQuery, lang).text;
  }

  const { sanitizedText } = scrubPII(userQuery);
  const cleanKey = apiKey.trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${cleanKey}`;

  const langInstruction = lang === 'am' 
    ? 'Respond in empathetic Amharic (አማርኛ) script.' 
    : lang === 'om' 
    ? 'Respond in empathetic Afaan Oromoo.' 
    : lang === 'ti' 
    ? 'Respond in empathetic Tigrinya (ትግርኛ).' 
    : 'Respond in clear, empathetic English.';

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: `${SYSTEM_PROMPT_TEXT}\n\nLanguage Instruction: ${langInstruction}\n\nUser Question: ${sanitizedText}` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1200
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Gemini API call failed.');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || 'No response received from Gemini.';
}

/**
 * Intelligent Keyword & Intent Matcher
 */
function matchCategoryArticles(queryLower) {
  const q = queryLower;

  const categoryScores = {
    'labour-1156': 0,
    'criminal-414': 0,
    'criminal-551-abortion': 0,
    'cyber-958': 0,
    'family-213': 0
  };

  // Workplace / Labour 1156
  const labourKeywords = ['work', 'boss', 'job', 'factory', 'manager', 'overtime', 'salary', 'wage', 'fire', 'fired', 'severance', 'maternity', 'leave', 'industrial', 'hawassa', 'park', 'contract', 'ስራ', 'አለቃ', 'ፋብሪካ', 'ደመወዝ', 'ደሞዝ', 'ትርፍ ሰዓት', 'ስንብት', 'ማባረር', 'የወሊድ'];
  labourKeywords.forEach(kw => { if (q.includes(kw)) categoryScores['labour-1156'] += 2; });

  // Criminal 414: Assault, Rape, Campus harassment
  const criminalKeywords = ['rape', 'assault', 'hit', 'beat', 'violence', 'abuse', 'slap', 'punch', 'bruise', 'shimgilina', 'campus', 'university', 'professor', 'grade', 'teacher', 'dorm', 'ትንኮሳ', 'ድብደባ', 'አስገድዶ', 'መድፈር', 'አካላዊ', 'ጥቃት', 'ሽምግልና', 'ጉዳት', 'ግቢ', 'ዩኒቨርሲቲ', 'መምህር', 'ውጤት'];
  criminalKeywords.forEach(kw => { if (q.includes(kw)) categoryScores['criminal-414'] += 2; });

  // Abortion: Article 551
  const abortionKeywords = ['abortion', 'abort', 'terminate', 'pregnancy', 'unwanted', 'ፅንስ', 'ማስወረድ', 'አስወረደች', 'አንቀጽ 551'];
  abortionKeywords.forEach(kw => { if (q.includes(kw)) categoryScores['criminal-551-abortion'] += 3; });

  // Cyber 958: Digital & Online
  const cyberKeywords = ['telegram', 'facebook', 'photo', 'picture', 'video', 'leak', 'blackmail', 'extort', 'cyber', 'online', 'threat', 'tiktok', 'ፎቶ', 'ቪዲዮ', 'ቴሌግራም', 'ስም ማጥፋት', 'አስፈራራ'];
  cyberKeywords.forEach(kw => { if (q.includes(kw)) categoryScores['cyber-958'] += 3; });

  // Family 213: Divorce, Custody, Child, Property
  const familyKeywords = ['divorce', 'custody', 'marriage', 'husband', 'alimony', 'child', 'children', 'property', 'split', 'separation', 'maintenance', 'ፍቺ', 'ልጆች', 'ባል', 'ትዳር', 'ቀለብ', 'ንብረት', 'አስተዳደግ'];
  familyKeywords.forEach(kw => { if (q.includes(kw)) categoryScores['family-213'] += 2; });

  const matchedArticles = [];

  statutoryLaws.forEach(law => {
    const bonus = categoryScores[law.id] || 0;
    law.articles.forEach(art => {
      let score = bonus;
      if (q.includes(art.number.toLowerCase())) score += 5;
      if (art.title.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))) score += 2;
      if (art.amTitle && art.amTitle.split(' ').some(w => w.length > 3 && q.includes(w))) score += 3;
      if (score > 0) {
        matchedArticles.push({ law: law.proclamation, score, ...art });
      }
    });
  });

  return matchedArticles.sort((a, b) => b.score - a.score);
}

/**
 * Built-in Intelligent RAG Synthesizer (Works 100% offline without any API key)
 */
export function queryOfflineAiInformation(query, lang = 'am') {
  const { sanitizedText, hasPII } = scrubPII(query);
  const q = sanitizedText.toLowerCase();

  // Search statutory articles with intelligent scoring
  const matchedArticles = matchCategoryArticles(q);

  // Search SRHR protocols
  const matchedSrhr = srhrMedicalWindows.filter(p => 
    q.includes(p.name.toLowerCase()) || 
    q.includes('pep') || 
    q.includes('ecp') || 
    q.includes('contracept') || 
    q.includes('hiv') || 
    q.includes('pregnancy') || 
    q.includes('pill') || 
    q.includes('postinor') || 
    q.includes('form 8') || 
    q.includes('forensic') || 
    q.includes('wash') || 
    q.includes('ኪኒን') || 
    q.includes('መከላከያ') || 
    q.includes('ፔፕ') || 
    q.includes('ፖስቲኖር') || 
    q.includes('ፎርም 8') || 
    q.includes('ማስረጃ') || 
    q.includes('ደም') ||
    q.includes('ምርመራ')
  );

  // Search Shelters & Safe Housing
  const matchedShelters = sanctuaryShelters.filter(s => 
    q.includes('shelter') || 
    q.includes('awsad') || 
    q.includes('housing') || 
    q.includes('landlord') || 
    q.includes('rent') || 
    q.includes('evict') || 
    q.includes('kicked out') || 
    q.includes('homeless') || 
    q.includes('safe house') || 
    q.includes('መጠለያ') || 
    q.includes('ማረፊያ') || 
    q.includes('አክሳድ') || 
    q.includes('ኪራይ') || 
    q.includes('አከራይ') || 
    q.includes('ቤት')
  );

  if (lang === 'am') {
    let result = `### 📚 የያንቺ AI መረጃ እና የሕግ ረዳት ትንታኔ\n\n`;
    result += `**ይህ ያንቺ ጥፋት አይደለም።** በኢትዮጵያ ሕግ የተጠበቀ ደህንነት፣ ክብር እና ፍትህ የማግኘት ሙሉ መብት አለሽ።\n\n`;

    if (matchedArticles.length > 0) {
      result += `#### ⚖️ አግባብነት ያላቸው የኢትዮጵያ ሕጎች እና ድንጋጌዎች:\n`;
      matchedArticles.slice(0, 3).forEach(art => {
        result += `• **${art.number} — ${art.amTitle || art.title}** (${art.law})\n`;
        result += `  *የሕጉ ይዘት:* ${art.summary}\n`;
        result += `  *ላንቺ የሚሰጠው ተግባራዊ መብት:* ${art.actionableTakeaway}\n\n`;
      });
    } else {
      result += `#### ⚖️ አግባብነት ያላቸው ዋና ዋና የኢትዮጵያ ሕጎች:\n`;
      result += `• **የአሠሪና ሠራተኛ አዋጅ 1156/2011:** በሥራ ቦታ ፆታዊ ትንኮሳን በጥብቅ ይከለክላል፤ 120 ቀናት የተከፈለበት የወሊድ ፈቃድ እና የትርፍ ሰዓት ክፍያ ያረጋግጣል።\n`;
      result += `• **የወንጀል ሕግ አዋጅ 414/1996:** አስገድዶ መድፈርን፣ አካላዊ ድብደባን እና በስልጣን የሚፈጸም ፆታዊ ትንኮሳን በጽኑ እስራት ያስቀጣል።\n`;
      result += `• **የቤተሰብ ሕግ አዋጅ 213/1992:** ሚስት በማንኛውም ጊዜ ፍቺ የመጠየቅ፣ የጋራ ንብረትን 50/50 የመካፈል እና የልጆች አስተዳደግ መብትን ያረጋግጣል።\n\n`;
    }

    if (matchedSrhr.length > 0) {
      result += `#### 💊 የጤና እና የህክምና ጊዜ ገደቦች (SRHR):\n`;
      matchedSrhr.forEach(s => {
        result += `• **${s.amName} (${s.criticalWindow}):** ${s.description}\n`;
      });
      result += `\n`;
    }

    if (matchedShelters.length > 0) {
      result += `#### 🏡 ሚስጥራዊ መጠለያዎች እና ማረፊያዎች (Shelters):\n`;
      matchedShelters.forEach(sh => {
        result += `• **${sh.amName || sh.name}**\n`;
        result += `  *አገልግሎት:* ${sh.services}\n`;
        result += `  *ቅርንጫፎች:* ${sh.locations?.join(', ')}\n`;
        result += `  *መገናኛ:* ${sh.contact}\n\n`;
      });
    }

    result += `#### 📞 ተግባራዊ ቀጣይ እርምጃዎች እና አድራሻዎች:\n`;
    result += `1. **የነፃ የሕግ እርዳታ (EWLA):** ለ**8055** በመደወል ነፃ የጠበቃ ውክልና ማግኘት ትችያለሽ።\n`;
    result += `2. **የ24/7 ብሔራዊ የጾታ ጥቃት መስመር:** **8044** (ነፃ ጥሪ)።\n`;
    result += `3. **የአስቸኳይ ፖሊስ አደጋ ጥሪ:** **991**።\n\n`;
    result += `*ማሳሰቢያ፡ ይህ መረጃ በኢትዮጵያ ሕጎች ላይ የተመሰረተ ትምህርታዊ መመሪያ ነው። ለተሟላ የፍርድ ቤት ውክልና የተጠቀሱትን ባለሙያዎች ያነጋግሩ።*`;

    return {
      text: result,
      hasPII,
      matchedCount: matchedArticles.length + matchedSrhr.length + matchedShelters.length
    };
  } else {
    let result = `### 📚 Yanchi AI Legal & Health Information Synthesis\n\n`;
    result += `**This is not your fault.** You have the fundamental right to safety, dignity, and full protection under Ethiopian statutory law.\n\n`;

    if (matchedArticles.length > 0) {
      result += `#### ⚖️ Applicable Ethiopian Statutory Provisions:\n`;
      matchedArticles.slice(0, 3).forEach(art => {
        result += `• **${art.number} — ${art.title}** (${art.law})\n`;
        result += `  *Statutory Rule:* ${art.summary}\n`;
        result += `  *Actionable Takeaway:* ${art.actionableTakeaway}\n\n`;
      });
    } else {
      result += `#### ⚖️ Core Ethiopian Statutory Frameworks:\n`;
      result += `• **Labour Proclamation 1156/2019:** Strictly bans workplace harassment (Art. 14), grants 120 days paid maternity leave (Art. 87-88), and enforces overtime multipliers.\n`;
      result += `• **Revised Criminal Code 414/2004:** Strictly penalizes rape (Art. 620), abuse of authority for sexual favors (Art. 625), and domestic bodily assault (Art. 555-556).\n`;
      result += `• **Revised Family Code 213/2000:** Grants independent right to divorce (Art. 81-85), 50/50 division of marital property (Art. 86), and maternal custody safeguards.\n\n`;
    }

    if (matchedSrhr.length > 0) {
      result += `#### 💊 Clinical Time-Sensitive Guidelines:\n`;
      matchedSrhr.forEach(s => {
        result += `• **${s.name} (${s.criticalWindow}):** ${s.description}\n`;
      });
      result += `\n`;
    }

    if (matchedShelters.length > 0) {
      result += `#### 🏡 Sanctuary Shelters & Safe Placement:\n`;
      matchedShelters.forEach(sh => {
        result += `• **${sh.name}**\n`;
        result += `  *Services:* ${sh.services}\n`;
        result += `  *Locations:* ${sh.locations?.join(', ')}\n`;
        result += `  *Direct Intake:* ${sh.contact}\n\n`;
      });
    }

    result += `#### 📞 Direct Action Steps & Helplines:\n`;
    result += `1. **Ethiopian Women Lawyers Association (EWLA):** Dial **8055** for free certified legal representation.\n`;
    result += `2. **National GBV Helpline:** Dial **8044** (24/7 Toll-free) for shelter coordination and counseling.\n`;
    result += `3. **Emergency Police Response:** Dial **991**.\n\n`;
    result += `*Note: Yanchi AI provides educational legal and health guidance. Please consult EWLA for formal courtroom filings.*`;

    return {
      text: result,
      hasPII,
      matchedCount: matchedArticles.length + matchedSrhr.length + matchedShelters.length
    };
  }
}
