import React from 'react';
import { ShieldAlert, PhoneCall, AlertTriangle, EyeOff, CheckCircle2, X } from 'lucide-react';
import { emergencyHotlines } from '../data/statutoryData';

export function CrisisModal({ isOpen, onClose, onQuickExit, t }) {
  if (!isOpen) return null;

  return (
    <div className="crisis-modal-overlay" role="dialog" aria-modal="true">
      <div className="crisis-modal-card">
        {/* Urgent Header */}
        <div className="crisis-header">
          <div className="crisis-badge">
            <ShieldAlert size={22} className="animate-pulse" />
            <span>CRISIS FIRST-RESPONDER PROTOCOL</span>
          </div>
          <div className="crisis-header-actions">
            <button 
              type="button" 
              className="quick-exit-pill-btn" 
              onClick={onQuickExit}
              title="Disguise immediately as Calculator"
            >
              <EyeOff size={15} />
              <span>{t.quickExit}</span>
            </button>
            <button 
              type="button" 
              className="close-modal-icon-btn" 
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Step 1: Immediate Physical Safety */}
        <div className="crisis-step-box step-safety">
          <div className="step-tag">STEP 1 • IMMEDIATE SAFETY</div>
          <h3 className="crisis-safety-lead">
            {t.dangerBannerSub}
          </h3>
          <p className="crisis-safety-desc">
            If an attacker or abuser is in the house or building, prioritize reaching a room with a lockable door, a ground-floor window, or neighbors. Do not stay in areas with sharp objects or confined spaces.
          </p>
        </div>

        {/* Step 2: Emergency Hotlines */}
        <div className="crisis-step-box step-hotlines">
          <div className="step-tag">STEP 2 • TOLL-FREE EMERGENCY LINES (ETHIOPIA)</div>
          <div className="crisis-hotlines-grid">
            {emergencyHotlines.map((hotline) => (
              <a 
                key={hotline.id} 
                href={hotline.tel} 
                className={`crisis-hotline-card ${hotline.id === 'gbv-8044' ? 'featured-hotline' : ''}`}
              >
                <div className="hotline-phone-icon">
                  <PhoneCall size={20} />
                </div>
                <div className="hotline-details">
                  <div className="hotline-number-display">{hotline.phone}</div>
                  <div className="hotline-name-display">{hotline.name}</div>
                  <div className="hotline-am-display">{hotline.amName}</div>
                  <span className="hotline-hours-pill">{hotline.hours}</span>
                </div>
                <div className="hotline-call-action">
                  <span>Call Free</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Step 3: Action Steps */}
        <div className="crisis-step-box step-actions">
          <div className="step-tag">STEP 3 • THREE IMMEDIATE TACTICAL STEPS</div>
          <ul className="crisis-action-list">
            <li>
              <CheckCircle2 size={18} className="step-check-icon" />
              <div>
                <strong>1. Move to Safety:</strong> Exit the immediate radius of the abuser, or barricade a secure room.
              </div>
            </li>
            <li>
              <CheckCircle2 size={18} className="step-check-icon" />
              <div>
                <strong>2. Call 8044 or 991:</strong> Free 24/7 counselors and emergency police will initiate rapid response.
              </div>
            </li>
            <li>
              <CheckCircle2 size={18} className="step-check-icon" />
              <div>
                <strong>3. Contact AWSAD Safe Sanctuary Shelters:</strong> Confidential emergency housing in Addis Ababa, Adama, Hawassa, and Dessie.
              </div>
            </li>
          </ul>
        </div>

        {/* Zero-Victim-Blaming Affirmation */}
        <div className="crisis-affirmation-footer">
          <AlertTriangle size={18} />
          <span>{t.zeroBlameNotice}</span>
        </div>
      </div>
    </div>
  );
}
