import React, { useState } from 'react';
import { 
  ShieldCheck, 
  EyeOff, 
  Trash2, 
  Lock, 
  ExternalLink, 
  AlertTriangle, 
  Smartphone, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';

export function PrivacyShield({ onQuickExit, onClearSession, t }) {
  const [pinCopied, setPinCopied] = useState(false);

  const panicRedirect = () => {
    onClearSession();
    window.location.replace('https://www.google.com');
  };

  return (
    <div className="privacy-shield-container">
      {/* Hero */}
      <div className="privacy-hero">
        <div className="privacy-hero-icon">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h2>Zero-Trust Digital Sanctuary Shield</h2>
          <p className="privacy-hero-sub">
            Your safety and digital footprint are our absolute priority. Here is how Yanchi AI protects you against surveillance.
          </p>
        </div>
      </div>

      {/* Primary Defense Cards */}
      <div className="defense-cards-grid">
        {/* Defense 1: Calculator Disguise */}
        <div className="defense-card">
          <div className="defense-card-head">
            <div className="defense-icon-wrap icon-calc">
              <EyeOff size={22} />
            </div>
            <div>
              <h3>Quick Exit / Calculator Camouflage</h3>
              <span className="defense-sub">Instant visual disguise</span>
            </div>
          </div>
          <p className="defense-desc">
            Pressing <strong>ESC</strong> on your keyboard or tapping the red <strong>Quick Exit</strong> button instantly replaces this entire application with a realistic, working calculator.
          </p>
          <div className="secret-pin-box">
            <span className="pin-title">SECRET UNLOCK PASSKEYS:</span>
            <div className="pin-codes-list">
              <span className="pin-badge">8044=</span>
              <span className="pin-badge">2026=</span>
              <span className="pin-badge">Triple-tap top title</span>
            </div>
          </div>
          <button type="button" className="test-disguise-btn" onClick={onQuickExit}>
            <EyeOff size={16} />
            <span>Test Calculator Disguise Now</span>
          </button>
        </div>

        {/* Defense 2: Panic Wipe & Escape */}
        <div className="defense-card">
          <div className="defense-card-head">
            <div className="defense-icon-wrap icon-wipe">
              <Trash2 size={22} />
            </div>
            <div>
              <h3>Panic Wipe & Instant Escape</h3>
              <span className="defense-sub">Zero trace left on device</span>
            </div>
          </div>
          <p className="defense-desc">
            Immediately destroys all chat history, clear session buffers from local memory, and redirects your browser to Google.
          </p>
          <div className="panic-action-wrap">
            <button type="button" className="panic-redirect-btn" onClick={panicRedirect}>
              <AlertTriangle size={17} />
              <span>Panic Wipe & Leave Site</span>
            </button>
          </div>
        </div>
      </div>

      {/* Zero-Trust Architecture Checklist */}
      <div className="zero-trust-architecture-card">
        <h3>Our Zero-Trust Privacy Guarantees</h3>
        <div className="guarantees-grid">
          <div className="guarantee-item">
            <CheckCircle2 size={18} className="guarantee-icon" />
            <div>
              <strong>No Account or Sign-in Required</strong>
              <p>You never need an email, phone number, password, or Ethiopian national ID.</p>
            </div>
          </div>

          <div className="guarantee-item">
            <CheckCircle2 size={18} className="guarantee-icon" />
            <div>
              <strong>Automatic PII Scrubbing</strong>
              <p>Any phone numbers or names typed into chat are masked locally before processing.</p>
            </div>
          </div>

          <div className="guarantee-item">
            <CheckCircle2 size={18} className="guarantee-icon" />
            <div>
              <strong>Zero Analytics or Tracking Cookies</strong>
              <p>No Google Analytics, Meta pixels, or third-party behavioral trackers.</p>
            </div>
          </div>

          <div className="guarantee-item">
            <CheckCircle2 size={18} className="guarantee-icon" />
            <div>
              <strong>RAM-Only Ephemeral Memory</strong>
              <p>Closing the browser tab purges conversation data automatically.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guide: How to Stay Safe on Shared Devices */}
      <div className="shared-device-guide-card">
        <div className="guide-header">
          <Smartphone size={24} />
          <div>
            <h3>Safety Checklist for Shared Phones & Computers</h3>
            <span className="guide-sub">If someone else has physical access to your phone or computer</span>
          </div>
        </div>

        <div className="guide-steps-grid">
          <div className="guide-step-col">
            <h4>On Mobile (Android / iPhone):</h4>
            <ol>
              <li>Always open this site in <strong>Incognito / Private Browsing</strong> mode.</li>
              <li>Close the browser tab immediately when finished.</li>
              <li>If you called <strong>8044</strong> or <strong>8055</strong>, remember to delete the call log from your phone's recent calls list!</li>
            </ol>
          </div>

          <div className="guide-step-col">
            <h4>On Work or Internet Cafe Computers:</h4>
            <ol>
              <li>Do not save any files or notes to the Desktop or Downloads folder.</li>
              <li>Press <strong>Ctrl + Shift + Delete</strong> to clear browser cache and history.</li>
              <li>Keep the <strong>Quick Exit</strong> button ready in case a manager or coworker approaches.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
