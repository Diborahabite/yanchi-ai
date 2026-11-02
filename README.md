# Yanchi AI (ያንቺ AI) — Digital Sanctuary, First Responder & Mobile App

> **An empathetic, zero-trust, highly secure, non-judgmental, and culturally grounded AI digital sanctuary for Ethiopian women, adolescent girls, and industrial factory workers.**

---

## 🌟 Complete Feature Suite

### 1. 🧠 Mental Health & Emotional Healing
- **Interactive Box Breathing Tool**: Visual animated breathing orb with inhale (4s), hold (4s), exhale (4s), and rest (4s) to calm acute panic attacks and trauma triggers.
- **5-4-3-2-1 Sensory Grounding Technique**: Tactical checklist grounding the mind in physical reality during flashbacks.
- **Dismantling "Yilunta" (ይሉኝታን መስበር)**: Guidance addressing societal shame and reinforcing that shame belongs to the perpetrator, never the survivor.
- **Sisterly Affirmation Generator**: Rotating empowering affirmations in Amharic and English.
- **Trauma Support Directory**: Direct access to Amanuel Mental Specialized Hospital and GBV counseling helplines.

### 2. 🛡️ Harassment Shield & Private Incident Evidence Builder
- **Four Defense Domains**:
  - *Factory & Workplace*: Industrial park rights under Labour Proclamation 1156/2019 (Art. 14/1/f & Art. 32).
  - *University & Campus*: Grades-for-sex coercion, dormitory safety, and Gender Directorate reporting.
  - *Street & Public Transit*: Taxi/minibus harassment, de-escalation, and loud projection techniques.
  - *Digital & Cyber Threats*: Telegram blackmail, non-consensual photo sharing, and cyber reporting.
- **Private Incident Logger & Evidence Builder**:
  - Log dates, locations, harassers, witnesses, and specific threats privately into local device memory.
  - One-click copy formatted into a formalized legal complaint for **EWLA (8055)** or Police.
  - Local memory only with one-click wipe.

### 3. 👭 Sisterhood Peer Circle (የእህትማማቾች ክብ)
- **100% Anonymous Community Space**:
  - Filtered circles: *Factory Workers (የፋብሪካ እህቶች)*, *Campus Students (የዩኒቨርሲቲ ተማሪዎች)*, *Family & Marriage (የትዳርና የቤተሰብ ጥንካሬ)*, *Overcoming Stigma (ይሉኝታን ማሸነፍ)*.
- **Anonymous Post Creator**: Write reflections or seek solidarity with zero-trust automatic PII scrubbing.
- **Supportive Reaction Buttons**:
  - ❤️ *"I Hear You Sister"* (እሰማሻለሁ)
  - 🛡️ *"Stay Strong"* (አንቺ ብርቱ ነሽ)
  - 🌸 *"Peace & Healing"* (ሰላም ለአንቺ)
- **Community Zero-Victim-Blaming Pledge**.

### 4. 🤖 AI Information & Statutory Tool
- **Built-in Grounded RAG (Free & Offline)**: Semantic search across Ethiopian Labour Proclamation 1156/2019, Criminal Code 414/2004, and Family Code 213/2000.
- **Live Google Gemini 2.5 Flash Mode**: Optional ephemeral API key input for real-time live LLM answers.
- **Speech Audio Playback**: Read advice out loud in Amharic or English.

### 5. 📱 Mobile Application (PWA + Native Android)
- **PWA with Calculator Disguise**: Install to Android/iOS home screen disguised as a standard calculator utility.
- **100% Offline Emergency Service Worker**: Caches emergency hotlines (**8044**, **8055**, **991**, **907**) without internet.
- **Native Android Project (Capacitor)**: Ready in `android/` directory to build `.apk`.
- **Native Mobile Bottom Navigation Bar**: Touch-optimized bottom bar.

### 6. ⚡ Quick Exit / Calculator Camouflage Mode
- Hit **`ESC`** or tap **Quick Exit (ካልኩሌተር)** to instantly transform the app into a working standard calculator.
- Secret passkey unlock: Type **`8044=`**, **`2026=`**, or triple-tap the title.

### 7. 🚨 Crisis First-Responder Protocol
- Emergency hotlines:
  - **8044**: National GBV Helpline (Free 24/7)
  - **8055**: EWLA (Ethiopian Women Lawyers Association)
  - **991**: Police Emergency Response
  - **907**: Medical / Ambulance Emergency
  - **AWSAD**: Confidential safe shelters in Addis Ababa, Hawassa, Adama, and Dessie.

---

## 🚀 Running & Building

### Web / PWA Dev Server
```bash
npm run dev
```
Open **http://127.0.0.1:5173/**.

### Android Native APK
```bash
npx cap sync android
npx cap open android
```
Or via terminal:
```bash
cd android
./gradlew assembleDebug
```
