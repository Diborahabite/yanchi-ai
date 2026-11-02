import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, ShieldCheck, EyeOff, CheckCircle2 } from 'lucide-react';

export function MobileInstallBanner({ onQuickExit, t }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Listen for browser PWA beforeinstallprompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Check if already in standalone mobile mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstructions(true);
    }
  };

  if (isDismissed || isInstalled) return null;

  return (
    <div className="mobile-install-banner">
      <div className="install-banner-content">
        <div className="install-app-icon-wrap">
          <EyeOff size={22} className="calc-disguise-badge-icon" />
        </div>
        <div className="install-text-group">
          <div className="install-title-row">
            <strong>Install Mobile App on Phone</strong>
            <span className="install-tag">Disguised as Calculator</span>
          </div>
          <p className="install-desc">
            Install to your phone’s home screen with the secret calculator icon for 100% private, offline access.
          </p>
        </div>
      </div>

      <div className="install-actions-row">
        <button
          type="button"
          className="install-now-btn"
          onClick={handleInstallClick}
        >
          <Download size={15} />
          <span>Install Mobile App</span>
        </button>
        <button
          type="button"
          className="dismiss-banner-btn"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>

      {showInstructions && (
        <div className="install-steps-modal-overlay" onClick={() => setShowInstructions(false)}>
          <div className="install-steps-card" onClick={(e) => e.stopPropagation()}>
            <div className="steps-header">
              <Smartphone size={22} />
              <h3>How to Install on Mobile</h3>
              <button type="button" className="close-steps-btn" onClick={() => setShowInstructions(false)}>✕</button>
            </div>
            <div className="os-instructions-grid">
              <div className="os-box">
                <h4>Android (Chrome / Samsung Internet):</h4>
                <ol>
                  <li>Tap the <strong>three dots menu (⋮)</strong> in the top right.</li>
                  <li>Tap <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.</li>
                  <li>The app will install disguised as <strong>Calculator</strong>!</li>
                </ol>
              </div>
              <div className="os-box">
                <h4>iPhone / iPad (Safari):</h4>
                <ol>
                  <li>Tap the <strong>Share button (⎋ with arrow)</strong> at the bottom.</li>
                  <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                  <li>Tap <strong>"Add"</strong> in the top right corner.</li>
                </ol>
              </div>
            </div>
            <div className="steps-privacy-notice">
              <ShieldCheck size={16} />
              <span>Works offline and keeps emergency numbers (8044 / 8055) ready without data.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
