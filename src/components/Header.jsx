import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  EyeOff, 
  PhoneCall, 
  Globe, 
  Trash2, 
  Scale, 
  HeartHandshake, 
  MessageSquare, 
  Building2, 
  ShieldAlert, 
  Clock,
  Sparkles,
  Heart,
  Users,
  Pill
} from 'lucide-react';
import { languages } from '../data/translations';

export function Header({ 
  currentLang, 
  setLang, 
  onQuickExit, 
  onOpenCrisis, 
  onClearSession, 
  activeTab, 
  setActiveTab, 
  t 
}) {
  const [isDisguisedTab, setIsDisguisedTab] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Keyboard shortcut: ESC triggers Quick Exit immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onQuickExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onQuickExit]);

  // Tab Title Camouflage Toggle
  const toggleTabDisguise = () => {
    if (!isDisguisedTab) {
      document.title = 'Calculator - Standard Utility';
      setIsDisguisedTab(true);
    } else {
      document.title = 'Yanchi AI (ያንቺ AI) — Digital Sanctuary';
      setIsDisguisedTab(false);
    }
  };

  const navItems = [
    { id: 'chat', label: t.tabChat, icon: MessageSquare },
    { id: 'health', label: t.tabHealth, icon: Pill },
    { id: 'ai-info', label: t.tabAiInfo || 'AI Info Tool', icon: Sparkles },
    { id: 'mental', label: t.tabMental || 'Mental Health', icon: Heart },
    { id: 'harassment', label: t.tabHarassment || 'Harassment Shield', icon: ShieldAlert },
    { id: 'peer-circle', label: t.tabPeerCircle || 'Peer Circle', icon: Users },
    { id: 'legal', label: t.tabLegal, icon: Scale },
    { id: 'directory', label: t.tabDirectory, icon: Building2 },
    { id: 'safety', label: t.tabSafety, icon: ShieldCheck }
  ];

  return (
    <header className="yanchi-master-header">
      {/* Top Banner Alert Bar */}
      <div className="top-safety-bar">
        <div className="safety-bar-left">
          <span className="secure-badge">
            <ShieldCheck size={14} />
            <span>Zero-Trust Sanctuary</span>
          </span>
          <span className="safety-bar-hint d-none-mobile">
            {t.quickExitHint}
          </span>
        </div>
        <div className="safety-bar-right">
          <button 
            type="button" 
            className="tab-disguise-toggle-btn"
            onClick={toggleTabDisguise}
            title="Toggle browser tab title between Yanchi and Calculator"
          >
            {isDisguisedTab ? 'Tab: Disguised (Calculator)' : 'Disguise Tab'}
          </button>
          <button 
            type="button" 
            className="panic-clear-header-btn"
            onClick={onClearSession}
            title="Wipe current session and data"
          >
            <Trash2 size={13} />
            <span>Wipe Memory</span>
          </button>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="header-main-row">
        {/* Brand */}
        <div className="brand-group" onClick={() => setActiveTab('chat')}>
          <div className="brand-logo-mark">
            <span className="logo-ethiopic">ያንቺ</span>
            <div className="logo-glow-ring"></div>
          </div>
          <div className="brand-texts">
            <div className="brand-title-wrap">
              <h1 className="brand-name">YANCHI AI</h1>
              <span className="brand-subtag">ያንቺ AI</span>
            </div>
            <p className="brand-motto">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Central / Urgent Action Controls */}
        <div className="header-actions">
          {/* Quick Exit Master Button */}
          <button 
            type="button" 
            className="quick-exit-master-btn" 
            onClick={onQuickExit}
            title="Instant Escape: Disguise as standard calculator (Press ESC)"
          >
            <EyeOff size={18} className="exit-icon" />
            <div className="exit-text-wrap">
              <span className="exit-main-label">{t.quickExit}</span>
              <span className="exit-sub-label">Press ESC / Tap</span>
            </div>
          </button>

          {/* Emergency Crisis Button */}
          <button 
            type="button" 
            className="crisis-trigger-header-btn" 
            onClick={onOpenCrisis}
            title="Open Emergency First-Responder Protocol"
          >
            <ShieldAlert size={17} />
            <span>8044 / 991</span>
          </button>

          {/* Language Switcher */}
          <div className="lang-switcher-wrapper">
            <button 
              type="button" 
              className="lang-trigger-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <Globe size={16} />
              <span>{languages.find(l => l.code === currentLang)?.name || 'አማርኛ'}</span>
            </button>
            {langMenuOpen && (
              <div className="lang-dropdown-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`lang-option-item ${currentLang === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      setLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-native">{lang.name}</span>
                    <span className="lang-en-sub">({lang.label})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="header-nav-tabs" aria-label="Main Navigation">
        <div className="nav-tabs-scrollable">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <IconComp size={16} className="nav-tab-icon" />
                <span>{item.label}</span>
                {isActive && <div className="nav-tab-active-indicator"></div>}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
