import React, { useState } from 'react';
import { Header } from './components/Header';
import { CalculatorCamouflage } from './components/CalculatorCamouflage';
import { CrisisModal } from './components/CrisisModal';
import { ChatView } from './components/ChatView';
import { AiInfoTool } from './components/AiInfoTool';
import { MentalHealthView } from './components/MentalHealthView';
import { HarassmentShield } from './components/HarassmentShield';
import { PeerCircle } from './components/PeerCircle';
import { RightsExplorer } from './components/RightsExplorer';
import { SrhrClock } from './components/SrhrClock';
import { DirectoryView } from './components/DirectoryView';
import { PrivacyShield } from './components/PrivacyShield';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileInstallBanner } from './components/MobileInstallBanner';
import { t } from './data/translations';
import { ShieldCheck, EyeOff } from 'lucide-react';

export function App() {
  const [currentLang, setCurrentLang] = useState('am');
  const [isCalculatorMode, setIsCalculatorMode] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [toastMessage, setToastMessage] = useState('');

  const currentStrings = t[currentLang] || t.am;

  // Show transient toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Quick Exit: Transform immediately to calculator
  const triggerQuickExit = () => {
    setIsCalculatorMode(true);
    setIsCrisisModalOpen(false);
    document.title = 'Calculator - Standard';
  };

  // Unlock from Calculator back to Sanctuary
  const unlockSanctuary = () => {
    setIsCalculatorMode(false);
    document.title = 'Yanchi AI (ያንቺ AI) — Digital Sanctuary';
    showToast('Discreet Sanctuary Reconnected');
  };

  // Wipe Session Memory
  const clearSessionMemory = () => {
    showToast(currentStrings.clearedNotice || 'Session wiped from memory');
    setActiveTab('chat');
  };

  // If in Calculator Camouflage mode, show only the working calculator!
  if (isCalculatorMode) {
    return (
      <div className="calculator-mode-wrapper">
        <CalculatorCamouflage onUnlock={unlockSanctuary} t={currentStrings} />
      </div>
    );
  }

  return (
    <div className="yanchi-app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="sanctuary-toast-notification">
          <ShieldCheck size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Navigation */}
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        onQuickExit={triggerQuickExit}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
        onClearSession={clearSessionMemory}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        t={currentStrings}
      />

      {/* Emergency First-Responder Sticky Bar (Always Accessible) */}
      <div className="emergency-quick-bar">
        <div className="emergency-bar-inner">
          <div className="emergency-bar-left">
            <span className="pulse-danger-dot"></span>
            <strong>{currentStrings.dangerBannerTitle}:</strong>
            <span className="emergency-bar-text">
              National GBV Helpline <strong>8044</strong> • Police <strong>991</strong> • Medical <strong>907</strong>
            </span>
          </div>
          <div className="emergency-bar-actions">
            <button 
              type="button" 
              className="srhr-clock-shortcut-btn"
              onClick={() => setActiveTab('health')}
              title="Jump directly to 72h PEP & Emergency Contraception Clock"
            >
              💊 72h PEP & ECP
            </button>
            <button 
              type="button" 
              className="open-protocol-btn"
              onClick={() => setIsCrisisModalOpen(true)}
            >
              Action Plan
            </button>
            <a href="tel:8044" className="call-8044-quick-btn">
              Call 8044 Free
            </a>
          </div>
        </div>
      </div>

      {/* Mobile App Install Banner */}
      <MobileInstallBanner onQuickExit={triggerQuickExit} t={currentStrings} />

      {/* Main View Area */}
      <main className="main-content-layout">
        <div className="content-container">
          {activeTab === 'chat' && (
            <ChatView
              currentLang={currentLang}
              onTriggerCrisis={() => setIsCrisisModalOpen(true)}
              onQuickExit={triggerQuickExit}
              t={currentStrings}
            />
          )}

          {activeTab === 'ai-info' && (
            <AiInfoTool
              currentLang={currentLang}
              t={currentStrings}
            />
          )}

          {activeTab === 'mental' && (
            <MentalHealthView
              currentLang={currentLang}
              t={currentStrings}
            />
          )}

          {activeTab === 'harassment' && (
            <HarassmentShield
              currentLang={currentLang}
              onQuickExit={triggerQuickExit}
              t={currentStrings}
            />
          )}

          {activeTab === 'peer-circle' && (
            <PeerCircle
              currentLang={currentLang}
              t={currentStrings}
            />
          )}

          {activeTab === 'legal' && (
            <RightsExplorer
              currentLang={currentLang}
              t={currentStrings}
            />
          )}

          {activeTab === 'health' && (
            <SrhrClock
              currentLang={currentLang}
              t={currentStrings}
            />
          )}

          {activeTab === 'directory' && (
            <DirectoryView
              currentLang={currentLang}
              t={currentStrings}
            />
          )}

          {activeTab === 'safety' && (
            <PrivacyShield
              onQuickExit={triggerQuickExit}
              onClearSession={clearSessionMemory}
              t={currentStrings}
            />
          )}
        </div>
      </main>

      {/* High Danger Emergency Crisis Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        onQuickExit={triggerQuickExit}
        t={currentStrings}
      />

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        t={currentStrings}
      />

      {/* Persistent Mobile Quick-Exit Floating Button */}
      <button 
        type="button" 
        className="mobile-floating-exit-btn"
        onClick={triggerQuickExit}
        title="Quick Exit (Calculator)"
      >
        <EyeOff size={20} />
        <span>Quick Exit</span>
      </button>
    </div>
  );
}

export default App;
