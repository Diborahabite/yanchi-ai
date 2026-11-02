import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  PhoneCall, 
  HeartHandshake, 
  Clock, 
  HelpCircle,
  EyeOff,
  Copy,
  Check,
  Key,
  ChevronDown
} from 'lucide-react';
import { generateYanchiResponse, scrubPII } from '../services/safetyEngine.js';
import { queryLiveGemini } from '../services/aiInfoEngine.js';

export function ChatView({ currentLang, onTriggerCrisis, onQuickExit, t }) {
  const getInitialWelcome = (lang) => {
    if (lang === 'am') {
      return `እሰማሻለሁ እህቴ። ብቻሽን አይደለሽም። ይህ ያንቺ ጥፋት አይደለም። በሕግ የተጠበቀ ደህንነት፣ ክብር እና ፍትህ የማግኘት ሙሉ መብት አለሽ።\n\n` +
        `እኔ **ያንቺ AI (Yanchi AI)** ነኝ — ያንቺ ሚስጥራዊ ዲጂታል መጠጊያ እና የመጀመሪያ ደራሽ ረዳት። በሥራ ቦታ ትንኮሳ፣ በስነ-ተዋልዶ ጤና (72h PEP እና ድንገተኛ መከላከያ)፣ በቤተሰብ ሕግ፣ በፍቺ፣ በልጆች አስተዳደግ ወይም በአእምሮ ጤና ዙሪያ የሚሰማሽን ያለምንም ፍርሃት አካፍዪኝ።\n\n` +
        `*ማሳሰቢያ፡ ስጋት ከተሰማሽ ከላይ ያለውን የፈጣን መውጫ (Quick Exit) በመጫን ገጹን ወዲያውኑ ወደ ካልኩሌተር መቀየር ትችያለሽ።*`;
    } else if (lang === 'om') {
      return `Nagaan siif haa ta'u obboleettii koo! Balleessaa kee miti. Nageenya, kabaja fi mirga seeraan eegamu guutuu qabda.\n\n` +
        `Ani **Yanchi AI** — iddoo nagaa fi deeggarsa dhokataa keeti. Mirga hojjettootaa, fayyaa wal-hormaataa (sa'aatii 72 PEP fi ECP), cunqursaa, fi dhimmoota maatii sodaa tokko malee na gaafachuu dandeessa.`;
    } else if (lang === 'ti') {
      return `ሰላም እህተይ! በይነኺ ኣይኮንክን። እዚ ናትኺ ጌጋ ኣይኮነን። ብሕጊ ዝተሓለወ ድሕንነትን ክብረትን ናይ ምርካብ ምሉእ መሰል ኣለኪ።\n\n` +
        `ኣነ **ያንቺ AI** — ምስጢራዊ ዲጂታል መዕቆቢኺን ቀዳመይቲ ሓጋዚትክን እየ።`;
    } else {
      return `I hear you, sister. You are not alone, and this is not your fault. You have the full right to safety, respect, and legal protection.\n\n` +
        `I am **Yanchi AI (ያንቺ AI)** — your confidential digital sanctuary and empathetic first-responder assistant. Feel safe to ask about workplace rights, 72-hour PEP and emergency contraception, family code, child custody, abortion exceptions, or emotional grounding.\n\n` +
        `*Safety Reminder: Tap Quick Exit at any moment to instantly disguise this screen as a standard calculator.*`;
    }
  };

  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: getInitialWelcome(currentLang),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCrisis: false,
      hasPII: false
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [piiAlert, setPiiAlert] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [useLiveGeminiMode, setUseLiveGeminiMode] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Audio Speech synthesis
  const speakMessage = (id, text) => {
    if (!('speechSynthesis' in window)) {
      alert('Audio speech is not supported in this browser.');
      return;
    }

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanSpeechText = text
      .replace(/[*#_`]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/📞 \d+/g, 'phone number')
      .slice(0, 450);

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    if (currentLang === 'am' || currentLang === 'ti') {
      utterance.lang = 'am-ET';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Copy text to clipboard
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Send message
  const handleSendMessage = async (textToSend = null) => {
    const rawContent = textToSend || inputText;
    if (!rawContent.trim()) return;

    // Zero-Trust PII Check
    const { sanitizedText, hasPII } = scrubPII(rawContent);
    if (hasPII) {
      setPiiAlert(true);
      setTimeout(() => setPiiAlert(false), 5000);
    }

    const userMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: sanitizedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasPII
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      if (useLiveGeminiMode && geminiApiKey.trim()) {
        const liveReply = await queryLiveGemini(sanitizedText, geminiApiKey, currentLang);
        const assistantMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'assistant',
          text: liveReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCrisis: false,
          hasPII,
          modelLabel: 'Gemini 2.5 Flash (Live)'
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Built-in Grounded AI Engine (ultra-fast, zero-rate-limit, verified statutory)
        const response = generateYanchiResponse(sanitizedText, currentLang);
        const assistantMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'assistant',
          text: response.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCrisis: response.isCrisis,
          hasPII: response.hasPII,
          modelLabel: 'Yanchi Grounded AI'
        };
        setMessages(prev => [...prev, assistantMessage]);

        if (response.isCrisis) {
          onTriggerCrisis();
        }
      }
    } catch (err) {
      console.error('Chat AI error fallback:', err);
      // Seamless fallback to Grounded engine on any network failure
      const fallbackResponse = generateYanchiResponse(sanitizedText, currentLang);
      const assistantMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: fallbackResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCrisis: fallbackResponse.isCrisis,
        hasPII: fallbackResponse.hasPII,
        modelLabel: 'Yanchi Offline Fallback'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChipClick = (chipText) => {
    handleSendMessage(chipText);
  };

  const clearChat = () => {
    if (window.confirm('Wipe and clear chat session completely?')) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'assistant',
          text: getInitialWelcome(currentLang),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCrisis: false,
          hasPII: false
        }
      ]);
      window.speechSynthesis?.cancel();
      setSpeakingMessageId(null);
    }
  };

  const quickSafetyChips = [
    { label: currentLang === 'am' ? '🚨 አሁን አደጋ ላይ ነኝ' : '🚨 High Danger Crisis', text: currentLang === 'am' ? 'አሁን አደጋ ላይ ነኝ አስቸኳይ እርዳታ እፈልጋለሁ' : 'I am in danger right now, I need emergency first responder steps' },
    { label: currentLang === 'am' ? '⚖️ የስራ ቦታ ትንኮሳና ደሞዝ' : '⚖️ Workplace Harassment', text: currentLang === 'am' ? 'የስራ ቦታ ትንኮሳን ሪፖርት በማድረጌ አለቃዬ ሊያባርረኝ ይችላል?' : 'Can my boss fire me for reporting workplace harassment?' },
    { label: currentLang === 'am' ? '💊 72 ሰዓት PEP እና ኪኒን' : '💊 72h PEP & ECP', text: currentLang === 'am' ? 'የኤች አይ ቪ PEP እና የድንገተኛ እርግዝና መከላከያ ኪኒን የመጨረሻ ሰዓት ስንት ነው?' : 'What is the strict deadline for HIV PEP and Emergency Contraception pills?' },
    { label: currentLang === 'am' ? '📋 ፎርም 8 እና ማስረጃ' : '📋 Police Form 8', text: currentLang === 'am' ? 'ፎርም 8 ምንድነው? ወደ ሆስፒታል ከመሄዴ በፊት ለምን መታጠብ የለብኝም?' : 'What is Police Form 8 and why must I not wash before hospital examination?' },
    { label: currentLang === 'am' ? '⚖️ የፅንስ ማቋረጥ ሕግ' : '⚖️ Abortion Exceptions', text: currentLang === 'am' ? 'በኢትዮጵያ የወንጀል ሕግ አንቀጽ 551 መሠረት የፅንስ ማቋረጥ መቼ ይፈቀዳል?' : 'When is pregnancy termination legally permitted under Ethiopian Criminal Code Article 551?' },
    { label: currentLang === 'am' ? '📱 የቴሌግራም ፎቶ ማስፈራሪያ' : '📱 Telegram Blackmail', text: currentLang === 'am' ? 'በቴሌግራም ፎቶሽን እለቃለሁ ብሎ የሚያስፈራራኝ ሰው በሕግ ምን ይደረጋል?' : 'Someone is blackmailing me to leak my private photos on Telegram. What does Ethiopian law say?' },
    { label: currentLang === 'am' ? '💔 ፍቺና የልጆች አስተዳደግ' : '💔 Divorce & Custody', text: currentLang === 'am' ? 'በኢትዮጵያ የቤተሰብ ሕግ መሰረት የጋራ ንብረት እና የልጆች አስተዳደግ እንዴት ይወሰናል?' : 'How is marital property and child custody handled under Ethiopian Family Code?' },
    { label: currentLang === 'am' ? '🕊️ ይሉኝታን ማሸነፍ' : '🕊️ Overcoming Yilunta', text: currentLang === 'am' ? 'ማህበረሰቡ የሚጭንብኝን ይሉኝታ እና ፍርሃት እንዴት ላሸንፍ?' : 'How can I overcome societal stigma (Yilunta) and panic?' },
    { label: currentLang === 'am' ? '🏡 ሚስጥራዊ መጠለያ (AWSAD)' : '🏡 Sanctuary Shelters', text: currentLang === 'am' ? 'የአክሳድ (AWSAD) ሚስጥራዊ የሴቶች መጠለያ የት ይገኛል? እንዴት ማግኘት እችላለሁ?' : 'Where are AWSAD confidential women shelters located and how do I get placed?' }
  ];

  return (
    <div className="chat-view-container">
      {/* Top AI Engine Bar */}
      <div className="chat-ai-engine-banner">
        <div className="engine-status-left">
          <span className="live-ai-pulse-dot"></span>
          <div className="engine-status-text">
            <strong>{useLiveGeminiMode ? '⚡ Live Gemini AI Mode' : '✨ Yanchi Grounded AI'}</strong>
            <span className="engine-status-sub">Zero-Trust • Verified Ethiopian Statutory Code • 100% Confidential</span>
          </div>
        </div>
        <div className="engine-status-actions">
          <button
            type="button"
            className="engine-key-toggle-btn"
            onClick={() => setShowKeyModal(!showKeyModal)}
            title="Configure Live Gemini API Key (Optional)"
          >
            <Key size={13} />
            <span>{geminiApiKey ? 'API Key Active' : 'Gemini Key (Optional)'}</span>
          </button>
          <button 
            type="button" 
            className="chat-wipe-header-btn"
            onClick={clearChat}
            title="Wipe conversation completely"
          >
            <Trash2 size={13} />
            <span>Wipe Chat</span>
          </button>
        </div>
      </div>

      {/* Optional Gemini Key Input Drawer */}
      {showKeyModal && (
        <div className="gemini-chat-key-drawer animate-fade-in">
          <div className="drawer-inner">
            <div className="drawer-title-row">
              <Sparkles size={16} />
              <strong>Google Gemini API Mode (Optional)</strong>
            </div>
            <p className="drawer-desc">
              By default, Yanchi runs on a high-speed culturally grounded statutory AI engine that works without any keys. To connect directly to Google's live Gemini 2.5 Flash model, paste a key below:
            </p>
            <div className="drawer-input-row">
              <input
                type="password"
                className="drawer-key-field"
                value={geminiApiKey}
                onChange={(e) => {
                  setGeminiApiKey(e.target.value);
                  if (e.target.value.trim()) setUseLiveGeminiMode(true);
                }}
                placeholder="Paste Gemini API Key (stays in browser memory only)..."
              />
              <button
                type="button"
                className="drawer-save-btn"
                onClick={() => {
                  if (geminiApiKey.trim()) setUseLiveGeminiMode(true);
                  setShowKeyModal(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zero-Victim-Blaming & Safety Notice Banner */}
      <div className="zero-blame-banner">
        <div className="zero-blame-icon">
          <HeartHandshake size={20} />
        </div>
        <div className="zero-blame-text">
          <strong>{t.zeroBlameNotice}</strong>
          <span className="zero-blame-sub">
            Your conversations are non-judgmental, strictly private, and never stored on remote servers.
          </span>
        </div>
      </div>

      {/* PII Redaction Warning Toast */}
      {piiAlert && (
        <div className="pii-shield-alert animate-fade-in">
          <ShieldCheck size={18} />
          <span>{t.piiSafeNotice}</span>
        </div>
      )}

      {/* Messages Timeline */}
      <div className="chat-messages-area">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id} 
              className={`chat-bubble-row ${isUser ? 'user-row' : 'assistant-row'} ${msg.isCrisis ? 'crisis-highlight-row' : ''}`}
            >
              {!isUser && (
                <div className="assistant-avatar">
                  <span>ያንቺ</span>
                </div>
              )}
              <div className={`chat-bubble ${isUser ? 'bubble-user' : 'bubble-assistant'}`}>
                {msg.hasPII && (
                  <div className="pii-bubble-tag">
                    <ShieldCheck size={12} />
                    <span>PII Protected & Masked</span>
                  </div>
                )}

                {msg.isCrisis && (
                  <div className="bubble-crisis-badge">
                    <AlertCircle size={14} />
                    <span>CRISIS FIRST-RESPONDER PROTOCOL ACTIVE</span>
                  </div>
                )}

                <div className="bubble-content-text">
                  {msg.text.split('\n\n').map((para, i) => (
                    <p key={i}>
                      {para.split('\n').map((line, j) => {
                        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <span 
                            key={j} 
                            dangerouslySetInnerHTML={{ __html: formattedLine }} 
                            style={{ display: 'block', marginBottom: '4px' }}
                          />
                        );
                      })}
                    </p>
                  ))}
                </div>

                <div className="bubble-footer">
                  <div className="bubble-footer-left">
                    <span className="bubble-time">{msg.timestamp}</span>
                    {msg.modelLabel && (
                      <span className="bubble-model-tag">{msg.modelLabel}</span>
                    )}
                  </div>
                  {!isUser && (
                    <div className="bubble-actions-right">
                      <button
                        type="button"
                        className="bubble-action-btn"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check size={13} className="copied-icon" /> : <Copy size={13} />}
                      </button>
                      <button
                        type="button"
                        className={`bubble-action-btn ${speakingMessageId === msg.id ? 'playing' : ''}`}
                        onClick={() => speakMessage(msg.id, msg.text)}
                        title={speakingMessageId === msg.id ? t.stopAudio : t.audioListen}
                      >
                        {speakingMessageId === msg.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-bubble-row assistant-row animate-fade-in">
            <div className="assistant-avatar">
              <span>ያንቺ</span>
            </div>
            <div className="chat-bubble bubble-assistant typing-bubble">
              <span className="typing-label">Yanchi AI analyzing legal codes & health safety...</span>
              <div className="typing-dots-wrap">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Topic Chips */}
      <div className="chat-suggested-chips-bar">
        <span className="chips-label">Quick topics:</span>
        <div className="chips-scroll-container">
          {quickSafetyChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              className="suggestion-chip"
              onClick={() => handleChipClick(chip.text)}
            >
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="chat-input-toolbar">
        <button 
          type="button" 
          className="toolbar-btn wipe-btn"
          onClick={clearChat}
          title="Clear and wipe chat memory"
        >
          <Trash2 size={16} />
        </button>

        <textarea
          className="chat-textarea-field"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.chatPlaceholder}
          rows={1}
        />

        <button
          type="button"
          className="send-message-btn"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          title="Send safely"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Lightweight Educational Disclaimer */}
      <div className="chat-disclaimer-sub">
        <small>{t.disclaimer}</small>
      </div>
    </div>
  );
}

export default ChatView;
