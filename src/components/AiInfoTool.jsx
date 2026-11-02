import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Key, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  BookOpen, 
  ShieldCheck, 
  Scale, 
  Clock, 
  PhoneCall, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { queryLiveGemini, queryOfflineAiInformation } from '../services/aiInfoEngine.js';

export function AiInfoTool({ currentLang, t }) {
  const [query, setQuery] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [useLiveGemini, setUseLiveGemini] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const sampleQueries = [
    { 
      en: 'Can my boss fire me for reporting workplace harassment?', 
      am: 'የስራ ቦታ ትንኮሳን ሪፖርት በማድረጌ አለቃዬ ሊያባርረኝ ይችላል?' 
    },
    { 
      en: 'What is the strict deadline for HIV PEP and Emergency Contraception?', 
      am: 'የኤች አይ ቪ PEP እና የድንገተኛ እርግዝና መከላከያ የመጨረሻ ሰዓት ስንት ነው?' 
    },
    { 
      en: 'What is Form 8 (ፎርም 8) and why must I not wash before hospital examination?', 
      am: 'ፎርም 8 ምንድነው? ወደ ሆስፒታል ከመሄዴ በፊት ለምን መታጠብ የለብኝም?' 
    },
    { 
      en: 'When is pregnancy termination permitted under Ethiopian Criminal Code Article 551?', 
      am: 'በኢትዮጵያ የወንጀል ሕግ አንቀጽ 551 መሠረት የፅንስ ማቋረጥ መቼ ይፈቀዳል?' 
    },
    { 
      en: 'Someone is blackmailing to leak my photos on Telegram. What are my rights under Proclamation 958?', 
      am: 'በቴሌግራም ፎቶሽን እለቃለሁ ብሎ የሚያስፈራራኝ ሰው በአዋጅ 958 መሠረት ምን ይቀጣል?' 
    },
    { 
      en: 'How is marital property and child custody handled under Ethiopian Family Code?', 
      am: 'በኢትዮጵያ የቤተሰብ ሕግ መሰረት የጋራ ንብረት እና የልጆች አስተዳደግ እንዴት ይወሰናል?' 
    }
  ];

  const handleSearch = async (queryText = null) => {
    const textToSearch = queryText || query;
    if (!textToSearch.trim()) return;

    setIsLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      if (useLiveGemini && apiKey.trim()) {
        const liveOutput = await queryLiveGemini(textToSearch, apiKey, currentLang);
        setResult({
          text: liveOutput,
          source: 'Google Gemini 2.5 Flash (Live Model)',
          isLive: true
        });
      } else {
        // Built-in Grounded Statutory RAG Engine
        const offlineOutput = queryOfflineAiInformation(textToSearch, currentLang);
        setResult({
          text: offlineOutput.text,
          source: 'Yanchi Grounded Ethiopian Statutory & Health Knowledge Base',
          isLive: false,
          hasPII: offlineOutput.hasPII
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Switched seamlessly to Yanchi Grounded Knowledge Base.');
      const fallbackOutput = queryOfflineAiInformation(textToSearch, currentLang);
      setResult({
        text: fallbackOutput.text,
        source: 'Yanchi Grounded Knowledge Base (Reliable Fallback)',
        isLive: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.text) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window) || !result?.text) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanSpeech = result.text.replace(/[*#_`]/g, '').slice(0, 500);
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = currentLang === 'am' ? 'am-ET' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="ai-info-tool-container">
      {/* Hero */}
      <div className="ai-info-hero">
        <div className="ai-info-hero-icon">
          <Sparkles size={28} />
        </div>
        <div className="ai-info-hero-text">
          <h2>AI Information & Statutory Knowledge Assistant</h2>
          <p className="ai-info-sub">
            Ask any question about Ethiopian workplace labor rights, penal assault codes, abortion exceptions (Art. 551), Telegram cyber blackmail (Proc. 958), or time-critical clinical care (PEP & Form 8).
          </p>
        </div>
      </div>

      {/* Query Engine Controls & Mode Selector */}
      <div className="ai-engine-config-bar">
        <div className="engine-mode-toggles">
          <button
            type="button"
            className={`engine-toggle-btn ${!useLiveGemini ? 'active' : ''}`}
            onClick={() => setUseLiveGemini(false)}
          >
            <BookOpen size={15} />
            <span>Built-in Ethiopian Statutory AI (Free, 100% Private, Instant)</span>
          </button>
          <button
            type="button"
            className={`engine-toggle-btn ${useLiveGemini ? 'active' : ''}`}
            onClick={() => setUseLiveGemini(true)}
          >
            <Sparkles size={15} />
            <span>Live Gemini AI Mode (Optional API Key)</span>
          </button>
        </div>

        {useLiveGemini && (
          <div className="gemini-key-input-row animate-fade-in">
            <div className="key-input-wrap">
              <Key size={16} className="key-icon" />
              <input
                type="password"
                className="api-key-field"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste Gemini API Key (Optional — stays in browser memory only)..."
              />
            </div>
            <span className="key-privacy-hint">
              {apiKey.trim() ? 'Key saved in local session.' : 'No key? Yanchi automatically uses the built-in statutory AI engine.'}
            </span>
          </div>
        )}
      </div>

      {/* Query Search Card */}
      <div className="ai-search-card">
        <div className="search-input-wrapper">
          <Search size={20} className="search-box-icon" />
          <textarea
            className="ai-query-textarea"
            rows={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSearch();
              }
            }}
            placeholder={currentLang === 'am' ? 'ለምሳሌ፡ በስራ ቦታ ትንኮሳ ቢደርስብኝ ያለ ማስጠንቀቂያ ስራ የማቆም እና ካሳ የማግኘት መብት አለኝ?...' : 'E.g., What are my rights if my manager at Hawassa Industrial Park refuses to pay overtime or threatens me?...'}
          />
          <button
            type="button"
            className="run-ai-query-btn"
            onClick={() => handleSearch()}
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <span className="spinner-mini"></span>
            ) : (
              <>
                <span>Analyze with AI</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {/* Sample One-Click Queries */}
        <div className="sample-queries-section">
          <span className="sample-queries-label">Frequently Consulted Situations:</span>
          <div className="sample-chips-wrap">
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="sample-query-chip"
                onClick={() => {
                  const sampleText = currentLang === 'am' ? item.am : item.en;
                  setQuery(sampleText);
                  handleSearch(sampleText);
                }}
              >
                <span>{currentLang === 'am' ? item.am : item.en}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="ai-error-banner animate-fade-in">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="ai-result-card animate-fade-in">
          <div className="result-card-header">
            <div className="result-source-badge">
              <ShieldCheck size={16} />
              <span>{result.source}</span>
            </div>
            <div className="result-header-actions">
              <button
                type="button"
                className={`action-pill-btn ${isSpeaking ? 'speaking' : ''}`}
                onClick={handleSpeak}
                title="Listen with voice"
              >
                {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
              </button>
              <button
                type="button"
                className="action-pill-btn"
                onClick={handleCopy}
                title="Copy response"
              >
                {copied ? <Check size={15} className="copied-icon" /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy Advice'}</span>
              </button>
            </div>
          </div>

          <div className="result-markdown-content">
            {result.text.split('\n\n').map((para, i) => {
              if (para.startsWith('### ')) {
                return <h3 key={i} className="res-h3">{para.replace('### ', '')}</h3>;
              }
              if (para.startsWith('#### ')) {
                return <h4 key={i} className="res-h4">{para.replace('#### ', '')}</h4>;
              }
              return (
                <p key={i} className="res-p">
                  {para.split('\n').map((line, j) => {
                    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return (
                      <span
                        key={j}
                        dangerouslySetInnerHTML={{ __html: formatted }}
                        style={{ display: 'block', marginBottom: '4px' }}
                      />
                    );
                  })}
                </p>
              );
            })}
          </div>

          <div className="result-card-footer">
            <PhoneCall size={14} />
            <span>Need certified courtroom representation or private intake? Contact <strong>EWLA at 8055</strong> or <strong>GBV Line 8044</strong>.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiInfoTool;
