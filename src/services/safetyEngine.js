// Safety Engine: PII Scrubbing, Crisis Detection, and Culturally Grounded AI Response Generation
import { statutoryLaws, srhrMedicalWindows, emergencyHotlines, sanctuaryShelters } from '../data/statutoryData.js';

// Ethiopian & International Crisis Trigger Lexicon (Active high-risk situations)
const CRISIS_KEYWORDS = [
  // English
  'hitting me right now', 'breaking down the door', 'breaking door', 'help me right now',
  'kill me', 'kill myself', 'suicide', 'choking me', 'strangled', 'knife', 'gun',
  'he has a knife', 'he has a gun', 'bleeding heavily', 'locked inside', 'kidnapped',
  // Amharic
  'አሁን እየመታኝ', 'በር እየሰበረ', 'አሁን እርዱኝ', 'ሊገለኝ', 'ሊገድለኝ', 'ራሴን ላጠፋ',
  'ደም እየፈሰሰኝ', 'ቢላ', 'ሽጉጥ', 'ታግቼያለሁ', 'መውጣት አልቻልኩም'
];

// PII Regex Patterns
const ETH_PHONE_REGEX = /(\+251\s?[79]\d{8}|0[79]\d{8}|\+?251[79]\d{8})/g;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Scans input text and masks PII to enforce Zero-Trust privacy.
 */
export function scrubPII(text) {
  if (!text) return { sanitizedText: '', hasPII: false };
  let hasPII = false;
  let sanitized = text;

  if (ETH_PHONE_REGEX.test(sanitized)) {
    hasPII = true;
    sanitized = sanitized.replace(ETH_PHONE_REGEX, '[ስልክ ቁጥር ተደብቋል / Phone Redacted]');
  }

  if (EMAIL_REGEX.test(sanitized)) {
    hasPII = true;
    sanitized = sanitized.replace(EMAIL_REGEX, '[ኢሜል ተደብቋል / Email Redacted]');
  }

  return { sanitizedText: sanitized, hasPII };
}

/**
 * Checks if the message warrants an immediate Crisis First-Responder protocol.
 */
export function detectCrisisTrigger(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw.toLowerCase()));
}

/**
 * Dynamic, context-aware Yanchi AI reasoning engine matching Master System Prompt.
 */
export function generateYanchiResponse(rawUserMessage, lang = 'am') {
  const { sanitizedText, hasPII } = scrubPII(rawUserMessage);
  const isCrisis = detectCrisisTrigger(sanitizedText);
  const lower = sanitizedText.toLowerCase().trim();

  // 1. HIGH-DANGER CRISIS FIRST-RESPONDER TRIGGER
  if (isCrisis) {
    if (lang === 'am') {
      return {
        isCrisis: true,
        hasPII,
        content: `🚨 **አስቸኳይ የደህንነት መመሪያ (ይህ ያንቺ ጥፋት አይደለም!)**\n\n` +
          `እሰማሻለሁ፤ ብቻሽን አይደለሽም፤ በአሁኑ ቅጽበት ትልቁና የመጀመሪያው ነገር የአንቺ አካላዊ ደህንነት ነው!\n\n` +
          `**ወዲያውኑ መውሰድ ያለብሽ 3 እርምጃዎች:**\n` +
          `1. **ደህንነት ወዳለበት ቦታ ሂጂ:** አሁን አካላዊ አደጋ ላይ ከሆንሽ፣ ወደሚቆለፍ ክፍል ወይም መውጫ በር ወዳለው አስተማማኝ ቦታ ለመሄድ ሞክሪ።\n` +
          `2. **ነፃ የአስቸኳይ ጥሪ መስመሮችን ደውዪ:**\n` +
          `   • **ብሔራዊ የጾታ ጥቃት መስመር (ነፃ 24/7):** 📞 **8044**\n` +
          `   • **የፖሊስ አደጋ መከላከያ:** 📞 **991**\n` +
          `   • **የኢትዮጵያ ሴት ሕግ ባለሙያዎች ማህበር (EWLA):** 📞 **8055**\n` +
          `   • **የአምቡላንስ እና የሕክምና እርዳታ:** 📞 **907**\n` +
          `3. **ወደ ቅርብ መጠለያ ወይም ጤና ጣቢያ ተጠጊ:** የአክሳድ (AWSAD) ሚስጥራዊ መጠለያዎች ወይም የህዝብ ጤና ጣቢያ ወዲያውኑ ጥበቃ ያደርጉልሻል።\n\n` +
          `*ማሳሰቢያ፡ አጠገብሽ ሰው ከመጣ ከላይ ያለውን የፈጣን መውጫ (Quick Exit) ቁልፍ በመጫን ገጹን ወዲያውኑ ወደ ካልኩሌተር መቀየር ትችያለሽ።*`
      };
    } else {
      return {
        isCrisis: true,
        hasPII,
        content: `🚨 **EMERGENCY FIRST-RESPONDER PROTOCOL (THIS IS NOT YOUR FAULT)**\n\n` +
          `I hear you, you are not alone, and your immediate physical safety is the most important thing right now.\n\n` +
          `**Immediate 3-Step Safety Action Plan:**\n` +
          `1. **Move to Physical Safety:** If you are in danger, try to move to a room with an exit or a secure lockable door.\n` +
          `2. **Dial Emergency Hotlines Immediately:**\n` +
          `   • **National GBV Helpline (Toll-Free 24/7):** 📞 **8044**\n` +
          `   • **Ethiopian Police Emergency:** 📞 **991**\n` +
          `   • **Ethiopian Women Lawyers Association (EWLA):** 📞 **8055**\n` +
          `   • **Emergency Medical / Ambulance:** 📞 **907**\n` +
          `3. **Reach Verified Sanctuary Shelters:** AWSAD emergency shelters provide confidential sanctuary, protection, and trauma care.\n\n` +
          `*Safety Reminder: If someone enters the room, tap the Quick Exit button at the top to instantly disguise this app as a standard calculator.*`
      };
    }
  }

  // 2. GREETINGS, IDENTITY & CAPABILITIES
  const isGreetingOrId = (
    lower === 'hi' || lower === 'hello' || lower === 'hey' || lower.startsWith('hi ') || lower.startsWith('hello ') ||
    lower.includes('who are you') || lower.includes('your name') || lower.includes('what is yanchi') ||
    lower.includes('can you help') || lower.includes('what can you do') || lower.includes('how does this work') ||
    lower.includes('tell me about') || lower.includes('i need help') || lower === 'help' ||
    lower.includes('ሰላም') || lower.includes('ማን ነሽ') || lower.includes('እንደምን') || lower.includes('ምን ልታደርጊ') ||
    lower.includes('እርዳኝ') || lower.includes('እርዳታ') || lower.includes('ያንቺ ማን ናት') || lower === 'akkam' || lower.includes('akkam')
  );

  if (isGreetingOrId) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `ሰላም እህቴ! እኔ **ያንቺ AI (Yanchi AI)** ነኝ — የኢትዮጵያውያን ሴቶች፣ ልጃገረዶች እና የፋብሪካ ሰራተኞች ታማኝ ሚስጥራዊ ዲጂታል መጠጊያ እና የመጀመሪያ ደራሽ ረዳት።\n\n` +
          `እንደ አዛኝ እህትና የሕግ/የጤና መመሪያሽ ሆኜ እዚህ እገኛለሁ። ምንም አይነት ፍርድ ወይም ይሉኝታ ሳትፈሪ በሙሉ ነፃነት ልታናግሪኝ ትችያለሽ።\n\n` +
          `**በምን ልርዳሽ ትፈልጊያለሽ?**\n` +
          `• ⚖️ **የስራ ቦታና ፋብሪካ መብቶች:** የስራ ቦታ ትንኮሳ፣ የወሊድ ፈቃድ (120 ቀናት)፣ የትርፍ ሰዓት ክፍያ (አዋጅ 1156/2011)\n` +
          `• 💊 **የስነ-ተዋልዶ ጤና እና PEP:** የ72 ሰዓታት የኤች አይ ቪ መከላከያ (PEP)፣ የድንገተኛ እርግዝና መከላከያ (ECP) እና ፎርም 8\n` +
          `• ⚖️ **የፅንስ ማቋረጥ ሕግ:** በኢትዮጵያ የወንጀል ሕግ አንቀጽ 551 መሠረት በደፈራና በጤና ችግር የተፈቀዱ መመሪያዎች\n` +
          `• 📱 **የዲጂታል እና የቴሌግራም ትንኮሳ:** ፎቶና ቪዲዮ በማሰራጨት የሚደረግ ማስፈራሪያ መከላከያ (አዋጅ 958/2008)\n` +
          `• 💔 **የቤተሰብ እና የፍቺ ሕግ:** ፍቺ፣ የልጆች አስተዳደግ እና የጋራ ንብረት 50/50 ክፍፍል (አዋጅ 213/1992)\n` +
          `• 🧠 **የአእምሮ ጤና:** ይሉኝታን፣ ጭንቀትን እና ፍርሃትን የማሸነፍ ዘዴዎች\n` +
          `• 🏡 **የአስቸኳይ መጠለያ:** የአክሳድ (AWSAD) ሚስጥራዊ መጠለያዎች እና የEWLA ነፃ የሕግ ጠበቃ ድጋፍ (8055 / 8044)\n\n` +
          `*የደህንነት ማስታወሻ፡ አጠገብሽ ሰው ከመጣ የፈጣን መውጫ (Quick Exit) ቁልፍን በመጫን ገጹን ወዲያውኑ ወደ ካልኩሌተር መቀየር ትችያለሽ።*`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `Hello sister! I am **Yanchi AI (ያንቺ AI)** — an empathetic, zero-trust, highly secure digital sanctuary and first-responder assistant for Ethiopian women, adolescent girls, and factory workers.\n\n` +
          `I speak with the warmth, dignity, and respect of a trusted older sister and counselor. Everything you share is strictly confidential and zero-judgment.\n\n` +
          `**How can I support you right now?**\n` +
          `• ⚖️ **Workplace & Factory Rights:** Harassment, maternity leave (120 paid days), overtime pay, and constructive dismissal under Proclamation 1156/2019.\n` +
          `• 💊 **SRHR Health Windows:** 72-hour emergency windows for HIV PEP, Emergency Contraceptive Pills (ECP), and Forensic Form 8.\n` +
          `• ⚖️ **Abortion & Legal Exceptions:** Grounds for legal safe termination under Penal Code Art. 551 (rape, incest, minor, health danger).\n` +
          `• 📱 **Digital Harassment & Blackmail:** Telegram non-consensual image sharing defense under Computer Crime Proclamation 958/2016.\n` +
          `• 💔 **Family Law & Protection:** Grounds for divorce, alimony, and child custody under Proclamation 213/2000.\n` +
          `• 🧠 **Mental Health & Calming:** Box breathing, sensory grounding, and breaking free from societal stigma ("Yilunta").\n` +
          `• 🏡 **Sanctuary Shelters:** Direct coordination with AWSAD shelters and EWLA free legal counsel (8055 / 8044).\n\n` +
          `*Privacy Reminder: Hit ESC or tap Quick Exit at any moment to instantly disguise this app as a calculator.*`
      };
    }
  }

  // 3. SRHR: HIV PEP, EMERGENCY CONTRACEPTION (ECP), POSTINOR & TIME WINDOWS
  const isSrhrPepEcp = (
    lower.includes('pep') || lower.includes('ecp') || lower.includes('postinor') || lower.includes('morning after') ||
    lower.includes('emergency pill') || lower.includes('contracepti') || lower.includes('72 hour') || lower.includes('condom broke') ||
    lower.includes('unprotected') || lower.includes('hiv') || lower.includes('sti') ||
    lower.includes('ፔፕ') || lower.includes('ፖስቲኖር') || lower.includes('ኪኒን') || lower.includes('ክኒን') ||
    lower.includes('መከላከያ') || lower.includes('የድንገተኛ') || lower.includes('ኤች አይ ቪ') || lower.includes('72 ሰዓት') ||
    lower.includes('fayyaa') || lower.includes('qoricha')
  );

  if (isSrhrPepEcp) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `ውድ እህቴ፣ ስላካፈልከኝ አመሰግናለሁ፤ ምንም ፍርሃት አይግባሽ። ጊዜ እጅግ ወሳኝ ነው፤ የሚከተሉትን የህክምና ሰዓቶች በጥንቃቄ ተመልከቺ፡\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** አካልሽ እና ጤናሽ ሁልጊዜም ቅድሚያ ሊሰጣቸው ይገባል።\n\n` +
          `**1. የኤች አይ ቪ መከላከያ መድሃኒት (PEP) — በ72 ሰዓታት (3 ቀናት) ውስጥ:**\n` +
          `• ያልተጠበቀ ግንኙነት ወይም ጥቃት ካጋጠመሽ፣ በ72 ሰዓታት ውስጥ ህክምና መጀመር ቫይረሱ እንዳይከሰት ይከላከላል። (በመጀመሪያዎቹ 2-24 ሰዓታት መውሰድ እጅግ ውጤታማ ያደርገዋል)።\n` +
          `• በመንግስት ጤና ጣቢያዎች (Health Centers) እና ሆስፒታሎች በነፃ ይሰጣል።\n\n` +
          `**2. የአስቸኳይ ጊዜ እርግዝና መከላከያ ኪኒን (ECP / Postinor):**\n` +
          `• **Postinor-2 (Levonorgestrel):** በ72 ሰዓታት ውስጥ መወሰድ አለበት፤ እስከ 95% እርግዝናን ይከላከላል።\n` +
          `• **Ulipristal acetate:** እስከ 120 ሰዓታት (5 ቀናት) ድረስ ይሰራል\n` +
          `• በማንኛውም ማሪ ስቶፕስ (MSI Ethiopia) ክሊኒክ ወይም ፋርማሲ ያለ ዶክተር ማዘዣ በቀላሉ ይገኛል።\n\n` +
          `**3. ክሊኒካዊ ምርመራ እና ፎረንሲክ ማስረጃ (ፎርም 8):**\n` +
          `• በግዳጅ ጥቃት ከደረሰብሽ ልብስሽን ሳትቀይሪ ወይም ሳትታጠቢ ወደ ጤና ጣቢያ ሒጂ። ልብስ ከቀየርሽ በንጹህ የወረቀት ፌስታል አስቀምጪ።\n\n` +
          `*በቀጥታ የሰዓት ቆጣሪውን ለማየት ከላይ ያለውን "💊 72h PEP & ECP" ወይም "የስነ-ተዋልዶ ጤና" ገጽ ንኪ።*`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, and please take a gentle breath. You are safe here, and time is the most critical clinical factor:\n\n` +
          `**This is not your fault.** Your bodily autonomy and health come first.\n\n` +
          `**1. HIV Post-Exposure Prophylaxis (PEP) — Critical 72-Hour Window:**\n` +
          `• Must be initiated strictly within 72 hours (ideally within 2-24 hours) after potential exposure to prevent HIV infection.\n` +
          `• Available free of charge at all public health centers and government hospitals.\n\n` +
          `**2. Emergency Contraceptive Pills (ECP):**\n` +
          `• **Levonorgestrel (Postinor-2):** Take within 72 hours (up to 95% efficacy within the first 24h).\n` +
          `• **Ulipristal acetate:** Effective up to 120 hours (5 days).\n` +
          `• Available over the counter without prescription at Marie Stopes (MSI) clinics and local pharmacies.\n\n` +
          `**3. Forensic Evidence Checklist (Form 8):**\n` +
          `• Do not wash or bathe before clinic examination; store worn clothing in a clean paper bag.\n\n` +
          `*Tap the "💊 72h PEP & ECP" button at the top to access our interactive medical countdown clock.*`
      };
    }
  }

  // 4. POLICE FORM 8 & FORENSIC EVIDENCE PRESERVATION
  const isForm8 = (
    lower.includes('form 8') || lower.includes('form-8') || lower.includes('form8') || lower.includes('forensic') ||
    lower.includes('police form') || lower.includes('medical report') || lower.includes('wash') || lower.includes('paper bag') ||
    lower.includes('ፎርም 8') || lower.includes('ፎርም8') || lower.includes('የህክምና ማስረጃ') || lower.includes('ማስረጃ') ||
    lower.includes('መታጠብ')
  );

  if (isForm8) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `እሰማሻለሁ እህቴ። ፎርም 8 (Police Form 8) በኢትዮጵያ ፍርድ ቤቶች ትልቁና ወሳኙ የህክምና ማስረጃ ነው።\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** ማስረጃ መጠበቅ ፍትህ የማግኘት መብትሽን ያረጋግጣል።\n\n` +
          `**ፎርም 8 ምንድነው? እንዴትስ ይሞላል?**\n` +
          `1. **ከፖሊስ የሚሰጥ ማዘዣ:** በፖሊስ ጣቢያ (Polis Tabiya) የደረሰብሽን ጥቃት ስታሳውቂ ፖሊስ ወደ ሆስፒታል ወይም ጤና ጣቢያ የምትሄጂበት "ፎርም 8" የተሰኘ የህክምና ምርመራ ማዘዣ ይሰጥሻል።\n` +
          `2. **በሀኪም የሚሞላ የምርመራ ውጤት:** ሀኪሙ የአካል ጉዳትሽን፣ ቁስለትን፣ የዲኤንኤ ወይም የዘር ፈሳሽ ምልክቶችን መዝግቦ በታሸገ ፖስታ ለፍርድ ቤት ያቀርባል።\n\n` +
          `**እጅግ ወሳኝ የፎረንሲክ ጥንቃቄዎች:**\n` +
          `• **አትታጠቢ:** ወደ ሆስፒታል ከመሄድሽ በፊት ገላሽን ፈጽሞ እንዳትታጠቢ ወይም ጥርስሽን እንዳትፍቂ (የወንጀለኛውን የዲኤንኤ ማስረጃ እንዳይጠፋ)።\n` +
          `• **የለበስሽውን ልብስ ጠብቂ:** ልብስ ከቀየርሽ በንጹህ **የወረቀት ፌስታል** (Paper bag) ውስጥ አስቀምጪ (በፕላስቲክ ፌስታል እንዳይበላሽ)።\n` +
          `• **የነፃ ጠበቃ ድጋፍ:** ለ**EWLA በ8055** ደውለሽ ጠበቃ አብሮሽ እንዲቆም ማድረግ ትችያለሽ።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Police Form 8 (ፎርም 8) is the official medical forensic document recognized in Ethiopian courts.\n\n` +
          `**This is not your fault.** Preserving evidence empowers your legal rights.\n\n` +
          `**What is Form 8 & How Does it Work?**\n` +
          `1. **Police Dispatch Form:** Issued by your local police station (Polis Tabiya) dispatching you to a public hospital or certified clinical forensic center.\n` +
          `2. **Physician Examination:** The examining medical doctor documents physical bruises, trauma, DNA traces, and collects forensic swabs in a sealed legal report for court.\n\n` +
          `**Critical Forensic Evidence Rules:**\n` +
          `• **Do NOT wash or bathe:** Do not shower, douche, or brush teeth prior to the clinical exam to preserve biological and DNA evidence.\n` +
          `• **Store clothing in Paper Bag:** Do not use plastic (which causes moisture/mold). Keep worn garments in a clean paper bag.\n` +
          `• **Pro-Bono Legal Backing:** Call **EWLA at 8055** to have a certified lawyer guide your hospital and police process.`
      };
    }
  }

  // 5. ABORTION & LEGAL EXCEPTIONS UNDER PENAL CODE ART. 551
  const isAbortion = (
    lower.includes('abortion') || lower.includes('abort') || lower.includes('terminate pregnancy') || lower.includes('termination of pregnancy') ||
    lower.includes('unwanted pregnancy') || lower.includes('pregnant after rape') || lower.includes('ፅንስ') || lower.includes('ማስወረድ') ||
    lower.includes('አስወረደች') || lower.includes('አንቀጽ 551')
  );

  if (isAbortion) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `ውድ እህቴ፣ በኢትዮጵያ የፅንስ ማቋረጥ (Abortion) ሕግ ዙሪያ ግልጽ እና ደጋፊ መመሪያ ልስጥሽ።\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** የጤናሽና የህይወትሽ ደህንነት ቅድሚያ ይሰጠዋል!\n\n` +
          `**በኢትዮጵያ የወንጀል ሕግ አንቀጽ 551 እና በጤና ጥበቃ ሚኒስቴር መመሪያ መሠረት:**\n` +
          `በኢትዮጵያ ሕግ በሚከተሉት ሁኔታዎች አስተማማኝ የፅንስ ማቋረጥ ሙሉ በሙሉ የተፈቀደና ሕጋዊ ነው:\n` +
          `1. **እርግዝናው በአስገድዶ መድፈር (Rape) ወይም በዘመድ ጥቃት (Incest) የተከሰተ ከሆነ:**\n` +
          `   • *ወሳኝ መብትሽ:* በጤና ጥበቃ መመሪያ መሠረት የአንቺ የራስሽ ቃል ብቻ በቂ ነው፤ ፍርድ ቤት ወይም የፖሊስ ማረጋገጫ መጠየቅ በሕግ የተከለከለ ነው!\n` +
          `2. **እርግዝናው የእናቲቱን ህይወት ወይም አካላዊ/ስነ-ልቦናዊ ጤና አደጋ ላይ የሚጥል ከሆነ**\n` +
          `3. **ፅንሱ ከባድ የአካል ወይም የአእምሮ ጉድለት ካለበት**\n` +
          `4. **እርጉዟ ዕድሜዋ ከ18 ዓመት በታች (Minor) ከሆነች ወይም ልጅ ለማሳደግ የአእምሮ ዝግጁነት ከሌላት**\n\n` +
          `**አስተማማኝ የት ማግኘት ይቻላል?**\n` +
          `• በማሪ ስቶፕስ (Marie Stopes / MSI Ethiopia) ክሊኒኮች እና በመንግስት ሆስፒታሎች አስተማማኝና ሚስጥራዊ አገልግሎት ይሰጣል።\n` +
          `• ለሚስጥራዊ የካውንስሊንግ ድጋፍ በ**8044** ደውዪ።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Let me provide clear, non-judgmental guidance on pregnancy termination under Ethiopian law.\n\n` +
          `**This is not your fault.** Your health, future, and dignity are paramount.\n\n` +
          `**Legal Exceptions Under Ethiopian Revised Criminal Code Article 551:**\n` +
          `Termination of pregnancy is legally permitted in Ethiopia under the following statutory grounds:\n` +
          `1. **Pregnancy Resulting from Rape or Incest:**\n` +
          `   • *Crucial Takeaway:* Under Ministry of Health technical guidelines, a woman's own statement of rape is legally sufficient. You do NOT need a police report or court conviction.\n` +
          `2. **Threat to Physical or Mental Health:** If pregnancy continuation endangers the woman's life or health.\n` +
          `3. **Severe Fetal Deformity / Abnormality**\n` +
          `4. **Under 18 Years of Age (Minor)** or physically/mentally unprepared for motherhood.\n\n` +
          `**Where to Access Safe Confidential Care:**\n` +
          `• Certified clinical facilities such as **Marie Stopes International (MSI Ethiopia)** clinics and public hospitals.\n` +
          `• For confidential telephone counseling, call the toll-free **National Helpline at 8044**.`
      };
    }
  }

  // 6. WORKPLACE & FACTORY HARASSMENT (PROCLAMATION 1156/2019)
  const isWorkplace = (
    lower.includes('work') || lower.includes('boss') || lower.includes('harass') || lower.includes('factory') ||
    lower.includes('manager') || lower.includes('overtime') || lower.includes('salary') || lower.includes('fired') ||
    lower.includes('severance') || lower.includes('maternity') || lower.includes('leave') || lower.includes('park') ||
    lower.includes('industrial') || lower.includes('foreman') || lower.includes('wage') || lower.includes('job') ||
    lower.includes('ስራ') || lower.includes('አለቃ') || lower.includes('ትንኮሳ') || lower.includes('ፋብሪካ') ||
    lower.includes('ፓርክ') || lower.includes('ደመወዝ') || lower.includes('ደሞዝ') || lower.includes('ትርፍ ሰዓት') ||
    lower.includes('ስንብት') || lower.includes('የወሊድ') || lower.includes('ማባረር') || lower.includes('hojii') || lower.includes('warshaa')
  );

  if (isWorkplace) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `እሰማሻለሁ እህቴ። በሥራ ቦታሽ ወይም በፋብሪካ ውስጥ የሚደርስብሽ ጫና፣ ዛቻ ወይም ትንኮሳ በጭራሽ ተቀባይነት የሌለው እና በኢትዮጵያ ሕግ በጥብቅ የተከለከለ ወንጀል ነው።\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** በሕግ የተጠበቀ ክብር፣ ፍትህ እና ደህንነቱ የተጠበቀ የሥራ አካባቢ የማግኘት ሙሉ መብት አለሽ።\n\n` +
          `**በኢትዮጵያ የአሠሪና ሠራተኛ ጉዳይ አዋጅ ቁጥር 1156/2011 መሠረት ያሉሽ መብቶች:**\n` +
          `• **አንቀጽ 14 (1) (ረ):** በሥራ ቦታ ፆታዊ ትንኮሳ ወይም ጥቃት መፈጸም በጥብቅ የተከለከለ ነው። ማንኛውም አለቃ ወይም የሥራ ባልደረባ ተጠያቂ ይሆናል።\n` +
          `• **አንቀጽ 32 (የሥራ ውል ማቋረጥ):** አሠሪው ወይም የበላይ ኃላፊው ትንኮሳ ከፈጸመብሽ፣ ያለምንም ማስጠንቀቂያ ውልሽን አቋርጠሽ ሙሉ የስንብት ክፍያ (Severance) እና ካሳ የማግኘት ሕጋዊ መብት አለሽ።\n` +
          `• **አንቀጽ 87 - 88 (የወሊድ ፈቃድ):** 120 ተከታታይ ቀናት የተከፈለበት የወሊድ ፈቃድ የማግኘት እና ማታ ማታ ከማይመች ፈረቃ የመጠበቅ መብት አለሽ። በእርግዝና ምክንያት ማባረር ህገወጥ ነው።\n` +
          `• **አንቀጽ 66 - 68 (የትርፍ ሰዓት ክፍያ):** መደበኛ የስራ ሰዓት በቀን ከ8 ሰዓት መብለጥ የለበትም፤ የትርፍ ሰዓት ስራ በሕግ በተቀመጠው ተባዥ ሂሳብ (1.25x እስከ 2.5x) መከፈል አለበት።\n\n` +
          `**ተጨባጭ ቀጣይ እርምጃዎች:**\n` +
          `1. በፋብሪካው ወይም በቢሮው የተከሰተውን ቀን፣ ሰዓት እና ድርጊት በያንቺ AI **"ትንኮሳ መከላከያ"** ገጽ ላይ በግል መዝግቢ።\n` +
          `2. የነፃ የሕግ ድጋፍ እና የፍርድ ቤት ጥብቅና ለማግኘት ለ**EWLA በ8055** ደውዪ።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you clearly, and I validate what you are experiencing. Workplace harassment, exploitation, and intimidation are strictly illegal under Ethiopian federal law.\n\n` +
          `**This is not your fault.** You have the statutory right to a safe, dignified, and fair work environment.\n\n` +
          `**Your Protections Under Ethiopian Labour Proclamation No. 1156/2019:**\n` +
          `• **Article 14 (1) (f):** Strictly prohibits sexual harassment and verbal/physical abuse in workplaces and industrial parks.\n` +
          `• **Article 32 (Constructive Dismissal):** If subjected to harassment by management, you have the statutory right to resign immediately with full severance pay and damages.\n` +
          `• **Articles 87 - 88 (Maternity Rights):** 120 consecutive days of paid maternity leave, with complete prohibition on pregnant workers doing night shifts or dismissal.\n` +
          `• **Articles 66 - 68 (Overtime Pay):** Working hours must not exceed 8 hours per day; overtime must be multiplied at statutory rates.\n\n` +
          `**Action Steps:**\n` +
          `1. Use the **Harassment Shield** tab to log incident dates, supervisor names, and evidence privately.\n` +
          `2. Contact **EWLA at 8055** for certified pro-bono labor legal representation.`
      };
    }
  }

  // 7. CAMPUS & UNIVERSITY HARASSMENT (REVISED PENAL CODE ART. 625)
  const isCampus = (
    lower.includes('campus') || lower.includes('university') || lower.includes('college') || lower.includes('professor') ||
    lower.includes('teacher') || lower.includes('grade') || lower.includes('lecturer') || lower.includes('dorm') ||
    lower.includes('exam') || lower.includes('fail me') || lower.includes('pass me') ||
    lower.includes('ግቢ') || lower.includes('ዩኒቨርሲቲ') || lower.includes('ኮሌጅ') || lower.includes('መምህር') ||
    lower.includes('ውጤት') || lower.includes('ፈተና') || lower.includes('ዶርም')
  );

  if (isCampus) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `እሰማሻለሁ እህቴ። በዩኒቨርሲቲ ወይም በኮሌጅ ግቢ ውስጥ መምህራን ወይም አስተዳዳሪዎች ውጤት ወይም ዶርም ለመስጠት የጾታ ግንኙነት መጠየቅ በኢትዮጵያ የወንጀል ሕግ በጥብቅ የተከለከለ ከባድ ወንጀል ነው!\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** ፈተናን ማለፍ ያለብሽ በራስሽ ጥረት እንጂ በአካልሽ መስዋዕትነት መሆን የለበትም።\n\n` +
          `**በኢትዮጵያ የወንጀል ሕግ አዋጅ ቁጥር 414/1996 መሠረት:**\n` +
          `• **አንቀጽ 625 (በስልጣን በመነገድ የሚፈጸም ፆታዊ ትንኮሳ):** ማንኛውም መምህር ወይም የትምህርት ኃላፊ የስልጣን ወይም የማስተማር ደረጃውን ተጠቅሞ የጾታ ግንኙነት የጠየቀ በጽኑ እስራት ይቀጣል።\n` +
          `• **የማስረጃ አያያዝ:** የመምህሩን የቴሌግራም/የዋትስአፕ መልዕክቶች፣ የጥሪ ሰዓቶች እና የታዘቡ ጓደኞች ምስክርነት በጥንቃቄ አስቀምጪ።\n` +
          `• **ቀጣይ እርምጃዎች:** ለዩኒቨርሲቲው የሴቶች እና የጾታ ጉዳይ ዳይሬክቶሬት (Gender Directorate) ሚስጥራዊ አቤቱታ አቅርቢ፣ ወይም ለ**EWLA በ8055** ደውለሽ ነፃ የሕግ ጠበቃ ውክልና አግኚ።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Demanding sexual compliance for grades, dormitory placement, or graduation is criminal coercion under Ethiopian law.\n\n` +
          `**This is not your fault.** Your academic success belongs to your intellect, not your body.\n\n` +
          `**Statutory Protections Under Revised Criminal Code No. 414/2004:**\n` +
          `• **Article 625 (Abuse of Authority):** Strictly punishes any educator or university administrator who leverages educational hierarchy to solicit sexual favors.\n` +
          `• **Evidence Preservation:** Take screenshots of Telegram, SMS, or call logs showing timestamps before blocking.\n` +
          `• **Action Steps:** File a formal confidential report with your campus Gender Directorate, and contact **EWLA at 8055** for free certified legal defense.`
      };
    }
  }

  // 8. DIGITAL HARASSMENT, TELEGRAM, PHOTO LEAKS & BLACKMAIL
  const isDigitalHarass = (
    lower.includes('telegram') || lower.includes('facebook') || lower.includes('photo') || lower.includes('picture') ||
    lower.includes('video') || lower.includes('leak') || lower.includes('blackmail') || lower.includes('extort') ||
    lower.includes('cyber') || lower.includes('threaten to post') || lower.includes('share my') ||
    lower.includes('ፎቶ') || lower.includes('ቪዲዮ') || lower.includes('ቴሌግራም') || lower.includes('ስም ማጥፋት') ||
    lower.includes('አስፈራራ') || lower.includes('ማስፈራሪያ')
  );

  if (isDigitalHarass) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `እሰማሻለሁ እህቴ። ፎቶሽን ወይም ቪዲዮሽን በቴሌግራም ወይም በፌስቡክ እለቃለሁ ብሎ ማስፈራራት በኢትዮጵያ የኮምፒውተር ወንጀል ሕግ በጥብቅ የተከለከለ ከባድ ወንጀል ነው!\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** ጥፋተኛው ማስፈራሪያ የሚያደርሰው ሰው ነው፤ አንቺ ምንም ዓይነት የጥፋተኝነት ስሜት ሊሰማሽ አይገባም!\n\n` +
          `**በኢትዮጵያ የኮምፒውተር ወንጀል አዋጅ ቁጥር 958/2008 መሠረት:**\n` +
          `• **አንቀጽ 13 እና 14:** ያለ ሰውዬው ፈቃድ የግል ፎቶዎችን፣ ቪዲዮዎችን ማሰራጨት ወይም በማስፈራራት ገንዘብ/ወሲብ መጠየቅ በጽኑ እስራት እና ከፍተኛ የገንዘብ መቀጮ ያስቀጣል።\n` +
          `• **መልዕክቶችን አታጥፊ:** ቻቱን ከማጥፋትሽ በፊት የተላኩትን ማስፈራሪያዎች፣ የስልክ ቁጥሩን እና የዩዘር ኔሙን (Username) ስክሪንሾት (Screenshot) አንሺ።\n` +
          `• **ሪፖርት የምታደርጊባቸው ቦታዎች:**\n` +
          `  1. የፌዴራል ፖሊስ የሳይበር ወንጀል መርማሪ ክፍል እና ኢንሳ (INSA)\n` +
          `  2. ለ**EWLA በ8055** ደውለሽ ሕጋዊ ክስ እንዲመሰረት አድርጊ።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Blackmailing you with private photos or videos on Telegram, TikTok, or WhatsApp is a grave crime under Ethiopian federal law.\n\n` +
          `**This is not your fault.** The perpetrator is committing digital extortion; you hold zero blame or shame.\n\n` +
          `**Your Protections Under Computer Crime Proclamation No. 958/2016:**\n` +
          `• **Articles 13 & 14 (Cyber Extortion & Non-Consensual Media Dissemination):** Strictly penalizes distributing intimate images or demanding money/favors with rigorous imprisonment.\n` +
          `• **Crucial Evidence Step:** Do NOT delete the chat yet. Take timestamped screenshots clearly displaying the sender's username, phone number, and demands.\n` +
          `• **Reporting Channels:** File an immediate report with the Federal Police Cyber Crime Unit / INSA, and call **EWLA at 8055** for certified legal intervention.`
      };
    }
  }

  // 9. DOMESTIC ABUSE, BATTERY & PHYSICAL VIOLENCE
  const isDomesticBattery = (
    lower.includes('beat') || lower.includes('slap') || lower.includes('punch') || lower.includes('violence') ||
    lower.includes('abuse') || lower.includes('batter') || lower.includes('bruise') || lower.includes('hit me') ||
    lower.includes('husband hit') || lower.includes('boyfriend beat') || lower.includes('domestic') ||
    lower.includes('ደበደበ') || lower.includes('መታ') || lower.includes('አካላዊ') || lower.includes('ጥቃት') ||
    lower.includes('ጉዳት') || lower.includes('አስፈራራ')
  );

  if (isDomesticBattery) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `እሰማሻለሁ እህቴ። በትዳር አጋርሽ ወይም በማንኛውም ሰው የሚደርስብሽ አካላዊ ድብደባ እና ጥቃት በኢትዮጵያ የወንጀል ሕግ በጥብቅ የተከለከለ ከባድ ወንጀል ነው።\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** ማንም ሰው በአካልሽ ላይ ጉዳት የማድረስ መብት የለውም። ሽምግልና ወይም የቤተሰብ ግፊት የደረሰብሽን ጥቃት ሊያስተባብለው አይችልም!\n\n` +
          `**በኢትዮጵያ የወንጀል ሕግ አዋጅ ቁጥር 414/1996 መሠረት:**\n` +
          `• **አንቀጽ 555 እና 556 (በሰው አካል ላይ ጉዳት ማድረስ):** ቀላልም ሆነ ከባድ የአካል ጉዳት ማድረስ በጽኑ እስራት ያስቀጣል።\n` +
          `• **የፖሊስ ፎርም 8:** በአቅራቢያሽ ወዳለ የፖሊስ ጣቢያ (Polis Tabiya) በመሄድ የህክምና ምርመራ ማዘዣ (ፎርም 8) ጠይቂ። ይህም ፍርድ ቤት ተቀባይነት ያለው ዋና ማስረጃ ነው።\n` +
          `• **የአስቸኳይ መጠለያ:** ወደ ቤት መመለስ ካልቻልሽ የአክሳድ (AWSAD) ሚስጥራዊ መጠለያዎች ጥበቃ ያደርጉልሻል።\n\n` +
          `**የእርዳታ መስመሮች:**\n` +
          `• **ብሔራዊ የጾታ ጥቃት መስመር:** 📞 **8044** (ነፃ 24/7)\n` +
          `• **የፖሊስ አደጋ ጥሪ:** 📞 **991**\n` +
          `• **የEWLA ነፃ የሕግ ጠበቆች:** 📞 **8055**`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Physical assault, battery, and domestic violence are grave crimes under Ethiopian law.\n\n` +
          `**This is not your fault.** No one has the right to strike, intimidate, or harm your body. Domestic disputes do not excuse physical abuse.\n\n` +
          `**Statutory Rights Under Revised Criminal Code No. 414/2004:**\n` +
          `• **Articles 555 & 556 (Bodily Injury):** Inflicting physical harm carries severe penal penalties.\n` +
          `• **Police Form 8 (ፎርም 8):** Request a medical examination dispatch form from the police station to legally document bruises and physical trauma.\n` +
          `• **Sanctuary Shelters:** AWSAD emergency shelters offer confidential housing in Addis Ababa, Hawassa, Adama, and Dessie.\n\n` +
          `**Immediate Hotlines:**\n` +
          `• **National GBV Helpline:** 📞 **8044** (Toll-Free 24/7)\n` +
          `• **Police Response:** 📞 **991**\n` +
          `• **EWLA Pro-Bono Legal Aid:** 📞 **8055**`
      };
    }
  }

  // 10. DIVORCE, CHILD CUSTODY & FAMILY CODE
  const isFamilyCode = (
    lower.includes('divorce') || lower.includes('custody') || lower.includes('marriage') || lower.includes('husband') ||
    lower.includes('alimony') || lower.includes('child') || lower.includes('children') || lower.includes('property') ||
    lower.includes('split') || lower.includes('separation') || lower.includes('maintenance') ||
    lower.includes('ፍቺ') || lower.includes('ልጆች') || lower.includes('ባል') || lower.includes('ትዳር') ||
    lower.includes('ቀለብ') || lower.includes('ንብረት') || lower.includes('አስተዳደግ') || lower.includes('hiriyaa') || lower.includes('hiikkaa')
  );

  if (isFamilyCode) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `ውድ እህቴ፣ የትዳር ችግር እና የፍቺ ጥያቄ ሲገጥምሽ የሚሰማሽን ፍርሃት እረዳሻለሁ።\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** በሰላም፣ በክብር እና ያለ ፍርሃት የመኖር ተፈጥሯዊና ሕጋዊ መብት አለሽ።\n\n` +
          `**በኢትዮጵያ የተሻሻለው የቤተሰብ ሕግ አዋጅ ቁጥር 213/1992 መሠረት ያሉሽ መብቶች:**\n` +
          `• **አንቀጽ 81 - 85 (የፍቺ መብት):** ማንኛዋም ሚስት በማንኛውም ጊዜ ያለ ባልዋ ፍቃድ ወይም ያለ ሽምግልና ፍቺ የመጠየቅ ሙሉ ነፃነት አላት።\n` +
          `• **አንቀጽ 113 (የልጆች አስተዳደግ):** ፍርድ ቤት የልጆችን አስተዳደግ የሚወስነው የልጆቹን ደህንነት በማስቀደም ነው፤ በተለይ ጨቅላ ልጆች ከእናት ጋር ይቆያሉ። ባልሽ ልጆችን በኃይል ሊነጥቅሽ አይችልም።\n` +
          `• **አንቀጽ 86 (የንብረት ክፍፍል):** በትዳር ውስጥ የተፈራራ ንብረት በሙሉ እኩል (50/50) ይከፈላል፤ የቤት ውስጥ ስራሽም እንደ ገንዘብ አስተዋጽኦ እውቅና አለው።\n\n` +
          `**የእርዳታ አማራጮች:**\n` +
          `• የህግ ድጋፍ እና ፍርድ ቤት ውክልና በነፃ ለማግኘት ለ**EWLA በ8055** ደውዪ።\n` +
          `• ጊዜያዊ ማረፊያ ካስፈለገሽ ለ**AWSAD መጠለያ በ8044** በኩል ይደውላል።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Navigating separation, divorce, and child safety takes profound courage.\n\n` +
          `**This is not your fault.** You have the autonomous right to emotional safety and legal justice.\n\n` +
          `**Your Protections Under the Ethiopian Revised Family Code (Proclamation No. 213/2000):**\n` +
          `• **Articles 81 - 85 (Right to Divorce):** A woman has the independent legal right to petition for divorce without marital consent.\n` +
          `• **Article 113 (Child Custody):** Custody is determined strictly based on the child's emotional and physical best interests.\n` +
          `• **Article 86 (Equal Asset Division):** Marital property is split equally (50/50), acknowledging domestic care equally.\n\n` +
          `**Direct Legal Aid:** Contact **EWLA at 8055** for certified family law representation.`
      };
    }
  }

  // 11. HOUSING, LANDLORD & NIGHTTIME EVICTION
  const isHousing = (
    lower.includes('landlord') || lower.includes('rent') || lower.includes('evict') || lower.includes('kicked out') ||
    lower.includes('night') || lower.includes('locked out') || lower.includes('lease') ||
    lower.includes('አከራይ') || lower.includes('ኪራይ') || lower.includes('ማስወጣት') || lower.includes('ቤት አከራይ')
  );

  if (isHousing) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `እሰማሻለሁ እህቴ። አከራይ በሌሊት ከቤት ሊያስወጣሽ ወይም የቤት ኪራይን ምክንያት በማድረግ ፆታዊ ጥያቄ ሊያቀርብ በኢትዮጵያ ሕግ በፍጹም አይፈቀድለትም!\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** ደህንነቱ የተጠበቀ የመኖሪያ መጠለያ የማግኘት መብት አለሽ።\n\n` +
          `**ሕጋዊ መብቶችሽ እና መፍትሄዎች:**\n` +
          `1. **ያለ ፍርድ ቤት ትዕዛዝ ማስወጣት አይቻልም:** በኢትዮጵያ የፍትሐብሔር ሕግ እና የቀበሌ አስተዳደር ደንብ መሠረት ማንኛውም አከራይ ተከራይን በድንገት ወይም በሌሊት በጉልበት ሊያስወጣ አይችልም።\n` +
          `2. **የቀበሌ ማህበራዊ ፍርድ ቤት (Social Court):** በአካባቢሽ ላለው ቀበሌ አቤቱታ በማቅረብ አፋጣኝ የእግድ ትዕዛዝ ማግኘት ትችያለሽ።\n` +
          `3. **አስቸኳይ መጠለያ:** አደጋ ከተሰማሽ ወደ **AWSAD ሚስጥራዊ መጠለያዎች** ለመግባት በ**8044** ደውዪ።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Arbitrary nighttime evictions, landlord harassment, and extortion are completely illegal under Ethiopian civil law.\n\n` +
          `**This is not your fault.** You have the right to housing security and peace.\n\n` +
          `**Your Protections Under Ethiopian Law:**\n` +
          `1. **Prohibition of Self-Help Evictions:** Landlords cannot unilaterally throw tenants out or lock doors at night without formal Woreda Social Court orders.\n` +
          `2. **Kebelle Protection:** File an immediate complaint with your local Kebelle administration for an injunction.\n` +
          `3. **Emergency Sanctuary Shelters:** If you are unsafe tonight, call the **National Helpline at 8044** for emergency AWSAD placement.`
      };
    }
  }

  // 12. SHELTERS & SAFE HOUSING
  const isShelter = (
    lower.includes('shelter') || lower.includes('awsad') || lower.includes('housing') || lower.includes('homeless') ||
    lower.includes('where to stay') || lower.includes('where to sleep') || lower.includes('safe place') || lower.includes('safe house') ||
    lower.includes('መጠለያ') || lower.includes('ማረፊያ') || lower.includes('አክሳድ') || lower.includes('መሄጃ')
  );

  if (isShelter) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `ውድ እህቴ፣ የምትሄጂበት አስተማማኝ ቦታ ከሌለሽ ወይም ቤተሰብ ውስጥ አደጋ ከተጋረጠብሽ፡\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።**\n\n` +
          `**የአክሳድ (AWSAD) ሚስጥራዊ የሴቶች መጠለያዎች:**\n` +
          `• **ቦታዎች:** አዲስ አበባ፣ ሀዋሳ፣ አዳማ እና ደሴ።\n` +
          `• **አገልግሎቶች:** ነፃ ጊዜያዊ መኖሪያ፣ ምግብ፣ የስነ-ልቦና ህክምና፣ የህክምና ክትትል እና የህፃናት ጥበቃ።\n` +
          `• **እንዴት ማግኘት ይቻላል?** የመጠለያዎቹ አድራሻ ለደህንነት ሲባል በሚስጥር የተያዘ ሲሆን፣ በ**ብሔራዊ የጾታ ጥቃት መስመር (8044)** ወይም በ**EWLA (8055)** በኩል በቀጥታ ይመቻቻል።\n\n` +
          `*አሁኑኑ ወደ 8044 በመደወል አስተማማኝ መጠለያ ማግኘት ትችያለሽ።*`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `Sister, if you are displaced, unsafe at home, or need immediate sanctuary:\n\n` +
          `**This is not your fault.** Safe housing is available.\n\n` +
          `**AWSAD (Association for Women's Sanctuary and Development) Shelters:**\n` +
          `• **Locations:** Addis Ababa, Hawassa, Adama, and Dessie.\n` +
          `• **Services:** Confidential housing, meals, medical care, trauma counseling, and childcare support.\n` +
          `• **Intake Process:** Shelter addresses are confidential for security. Direct intake is coordinated via the **National Helpline at 8044** or **EWLA at 8055**.\n\n` +
          `*Dial 8044 (Free 24/7) right now to initiate safe sanctuary placement.*`
      };
    }
  }

  // 13. MENTAL HEALTH, ANXIETY, PANIC & "YILUNTA"
  const isMentalHealth = (
    lower.includes('mental') || lower.includes('depress') || lower.includes('anxiety') || lower.includes('panic') ||
    /\bsad\b/.test(lower) || lower.includes('cry') || lower.includes('crying') || lower.includes('scared') ||
    lower.includes('fear') || lower.includes('stigma') || lower.includes('shame') || lower.includes('yilunta') ||
    lower.includes('lonely') || lower.includes('hopeless') ||
    lower.includes('አእምሮ') || lower.includes('ጭንቀት') || lower.includes('ፍርሃት') || lower.includes('አለቀስኩ') ||
    lower.includes('ይሉኝታ') || lower.includes('ብቸኝነት') || lower.includes('ተስፋ') || lower.includes('ስነ-ልቦና')
  );

  if (isMentalHealth) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `ውድ እህቴ፣ የሚሰማሽን ከባድ ጭንቀት እና ሸክም ከልቤ እረዳሻለሁ።\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** አንቺ ብርቱ ነሽ፤ ማህበረሰቡ የሚጭንብሽ "ይሉኝታ" (የሰዎች ወሬ ወይም ሀፍረት) ያንቺን ሰላምና ክብር ሊነጥቅሽ አይገባም!\n\n` +
          `**አሁን ጭንቀትን ለማረጋጋት የሚረዱሽ እርምጃዎች:**\n` +
          `1. **ጥልቅ የአተነፋፈስ ልምምድ (Box Breathing):**\n` +
          `   • በአፍንጫሽ ለ4 ሰከንድ በጥልቀት አስገቢ\n` +
          `   • ትንፋሽሽን ለ4 ሰከንድ ያዢ\n` +
          `   • በአፍሽ ለ4 ሰከንድ ቀስ ብለሽ አስወጪ\n` +
          `   *(በአእምሮ ጤና ገጻችን ላይ ያለውን የሚተነፍስ ክብ ተመልከቺ)*\n\n` +
          `2. **የ5-4-3-2-1 ማረጋጊያ ዘዴ:** በአጠገብሽ ያሉ 5 የሚታዩ ነገሮችን፣ 4 የሚዳሰሱ ነገሮችን፣ 3 የሚሰሙ ድምጾችን፣ 2 ጠረኖችን እና 1 ጣዕምን ልብ በይ። ይህም አእምሮሽ ከአስደንጋጩ ሁኔታ እንዲላቀቅ ይረዳዋል።\n\n` +
          `3. **ነፃ የስነ-ልቦና ድጋፍ መስመሮች:**\n` +
          `   • ለብሔራዊ የካውንስሊንግ መስመር በ**8044** ደውለሽ በነፃ ማናገር ትችያለሽ።\n` +
          `   • አማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል ለከፍተኛ ጭንቀት የተሟላ ህክምና ይሰጣል።\n\n` +
          `*አንቺ ብቻሽን አይደለሽም፤ በእህትማማቾች ክብ (Peer Circle) ገጻችን ላይ የሌሎች እህቶችን የብርታት ታሪክ ማንበብ ትችያለሽ።*`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you deeply, sister. What you are feeling is real and valid, and taking a moment to acknowledge your pain takes great strength.\n\n` +
          `**This is not your fault.** You are worthy of peace, safety, and dignity. Societal stigma ("Yilunta") belongs to abusers and society, not to you.\n\n` +
          `**Immediate Calming & Grounding Exercises:**\n` +
          `1. **Box Breathing for Panic:** Inhale for 4 seconds, hold for 4 seconds, exhale slowly for 4 seconds, and rest for 4 seconds. Repeat 4 times to regulate your heart rate.\n` +
          `2. **5-4-3-2-1 Sensory Reset:** Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste to break trauma loops.\n` +
          `3. **Counseling Helplines:** Connect with professional trauma counselors confidentially via the **National GBV Helpline at 8044** (Free 24/7).\n\n` +
          `*You are welcome to visit our "Mental Health" tab or connect anonymously with other sisters in the "Peer Circle".*`
      };
    }
  }

  // 14. LEGAL AID, COURT & EWLA
  const isLegalAid = (
    lower.includes('lawyer') || lower.includes('ewla') || lower.includes('attorney') || lower.includes('court') ||
    lower.includes('legal aid') || lower.includes('pro-bono') || lower.includes('police station') ||
    lower.includes('ጠበቃ') || lower.includes('ፍርድ ቤት') || lower.includes('ሕግ') || lower.includes('የሕግ ድጋፍ')
  );

  if (isLegalAid) {
    if (lang === 'am') {
      return {
        isCrisis: false,
        hasPII,
        content: `እሰማሻለሁ እህቴ። በኢትዮጵያ የሴት ሕግ ባለሙያዎች ማህበር (EWLA) አማካኝነት ነፃ የሕግ ጠበቃ ማግኘት ትችያለሽ።\n\n` +
          `**ይህ ያንቺ ጥፋት አይደለም።** ፍትህ የማግኘት መብትሽ በሕገ-መንግስቱ የተረጋገጠ ነው።\n\n` +
          `**የEWLA ነፃ የሕግ አገልግሎቶች:**\n` +
          `• **ነፃ የጠበቃ ውክልና:** በፍርድ ቤት ለፍቺ፣ ለልጆች አስተዳደግ፣ ለንብረት ክፍፍል እና ለስራ ቦታ ክሶች ነፃ ጠበቃ ያቆማሉ።\n` +
          `• **የእርዳታ ስልክ መስመር:** 📞 **8055** (ከሰኞ እስከ አርብ በስራ ሰዓት)\n` +
          `• **ዋና ጽ/ቤት:** አዲስ አበባ (ካዛንቺስ) እንዲሁም በሀዋሳ፣ አዳማ፣ ባሕር ዳር እና ድሬዳዋ ቅርንጫፎች ይገኛሉ።`
      };
    } else {
      return {
        isCrisis: false,
        hasPII,
        content: `I hear you, sister. Certified pro-bono legal counsel and courtroom representation are available for you through the Ethiopian Women Lawyers Association (EWLA).\n\n` +
          `**This is not your fault.** Equal access to justice is your constitutional right.\n\n` +
          `**EWLA Free Legal Aid Services:**\n` +
          `• **Free Courtroom Representation:** Representation for divorce, child custody, alimony, workplace abuse, and assault cases.\n` +
          `• **Helpline:** 📞 **8055** (Monday - Friday during business hours).\n` +
          `• **Offices:** Headquarters in Addis Ababa (Kazanchis) and branch offices in Hawassa, Adama, Bahir Dar, and Dire Dawa.`
      };
    }
  }

  // 15. GENERAL INTELLIGENT SEMANTIC SYNTHESIS
  // Searches all statutes, articles, and SRHR medical rules for contextual match
  const matchedStatute = statutoryLaws.flatMap(l => l.articles.map(a => ({ ...a, proclamation: l.proclamation }))).find(a => 
    lower.split(' ').some(w => w.length > 2 && (a.summary.toLowerCase().includes(w) || a.title.toLowerCase().includes(w) || a.actionableTakeaway.toLowerCase().includes(w)))
  );

  if (lang === 'am') {
    let reply = `እሰማሻለሁ እህቴ። ብቻሽን አይደለሽም፤ የጠየቅሺውን ጉዳይ በሚመለከት ዝርዝር የሕግና የጤና መመሪያ እሰጥሻለሁ።\n\n`;
    reply += `**ይህ ያንቺ ጥፋት አይደለም።** በኢትዮጵያ ሕግ የተጠበቀ ደህንነት፣ ክብር እና ፍትህ የማግኘት ሙሉ መብት አለሽ።\n\n`;

    if (matchedStatute) {
      reply += `**አግባብነት ያለው የኢትዮጵያ ሕግ ድንጋጌ (${matchedStatute.proclamation}):**\n`;
      reply += `• **${matchedStatute.number} (${matchedStatute.amTitle || matchedStatute.title}):** ${matchedStatute.summary}\n`;
      reply += `• **ተግባራዊ መብትሽ:** ${matchedStatute.actionableTakeaway}\n\n`;
    } else {
      reply += `ያንቺ AI እንደ ታማኝ እህትና የሕግ/የጤና መመሪያ ረዳትሽ ሆኖ ከጎንሽ ይገኛል። ማንኛውንም ጥያቄ በተመለከተ ዝርዝር መረጃ ልሰጥሽ እችላለሁ።\n\n`;
    }

    reply += `**የአስቸኳይ እና የነፃ እርዳታ መስመሮች:**\n`;
    reply += `• **የነፃ የሕግ ጠበቃ ውክልና (EWLA):** 📞 **8055**\n`;
    reply += `• **የ24/7 ብሔራዊ የጾታ ጥቃት እና መጠለያ መስመር:** 📞 **8044**\n`;
    reply += `• **የፖሊስ አደጋ ጥሪ:** 📞 **991**\n\n`;
    reply += `*ለበለጠ ጥልቅ ትንታኔ ከላይ ያለውን "AI መረጃ እና ሕግ" ገጽ መጠቀም ትችያለሽ።*`;

    return {
      isCrisis: false,
      hasPII,
      content: reply
    };
  } else {
    let reply = `I hear you, sister. You are not alone, and I am here to provide clear, actionable guidance on your situation.\n\n`;
    reply += `**This is not your fault.** You have the right to be safe, respected, and protected under Ethiopian statutory law.\n\n`;

    if (matchedStatute) {
      reply += `**Relevant Statutory Protection (${matchedStatute.proclamation}):**\n`;
      reply += `• **${matchedStatute.number} (${matchedStatute.title}):** ${matchedStatute.summary}\n`;
      reply += `• **Actionable Rule:** ${matchedStatute.actionableTakeaway}\n\n`;
    } else {
      reply += `Yanchi AI stands as your confidential first responder and guide across legal, medical, and emotional questions.\n\n`;
    }

    reply += `**Emergency & Pro-Bono Resources:**\n`;
    reply += `• **EWLA Free Certified Lawyers:** 📞 **8055**\n`;
    reply += `• **National GBV Helpline & Shelters:** 📞 **8044** (Free 24/7)\n`;
    reply += `• **Police Response:** 📞 **991**\n\n`;
    reply += `*For deep statutory queries, consult our "AI Info Tool" tab above.*`;

    return {
      isCrisis: false,
      hasPII,
      content: reply
    };
  }
}
