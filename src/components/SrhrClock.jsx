import React, { useState } from 'react';
import { 
  Clock, 
  ShieldAlert, 
  Pill, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  Hospital, 
  Heart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { srhrMedicalWindows } from '../data/statutoryData';

export function SrhrClock({ currentLang, t }) {
  const [elapsedHours, setElapsedHours] = useState(12);

  // Calculate PEP status (72 hours limit)
  const pepRemaining = Math.max(0, 72 - elapsedHours);
  const isPepExpired = elapsedHours >= 72;
  const isPepUrgent = elapsedHours >= 48 && elapsedHours < 72;
  const isPepOptimal = elapsedHours < 24;

  // Calculate ECP status (120 hours limit)
  const ecpRemaining = Math.max(0, 120 - elapsedHours);
  const isEcpExpired = elapsedHours >= 120;

  return (
    <div className="srhr-clock-container">
      {/* Header */}
      <div className="srhr-hero">
        <div className="srhr-hero-icon">
          <Clock size={28} />
        </div>
        <div>
          <h2>SRHR Emergency Medical Clock</h2>
          <p className="srhr-hero-sub">
            Medical prevention windows are strictly time-sensitive. Check your exact timeline below.
          </p>
        </div>
      </div>

      {/* Interactive Time Slider */}
      <div className="srhr-calculator-card">
        <div className="slider-header-row">
          <div>
            <span className="slider-label">HOURS ELAPSED SINCE POTENTIAL EXPOSURE / ASSAULT:</span>
            <div className="slider-current-value">
              <span className="hours-digit">{elapsedHours}</span>
              <span className="hours-unit">hours ago</span>
            </div>
          </div>
          <div className="slider-preset-chips">
            <button type="button" onClick={() => setElapsedHours(6)} className={elapsedHours === 6 ? 'active' : ''}>6h</button>
            <button type="button" onClick={() => setElapsedHours(24)} className={elapsedHours === 24 ? 'active' : ''}>24h</button>
            <button type="button" onClick={() => setElapsedHours(48)} className={elapsedHours === 48 ? 'active' : ''}>48h</button>
            <button type="button" onClick={() => setElapsedHours(70)} className={elapsedHours === 70 ? 'active' : ''}>70h</button>
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="130"
          value={elapsedHours}
          onChange={(e) => setElapsedHours(Number(e.target.value))}
          className="hours-range-slider"
        />

        {/* Real-time Status Badges */}
        <div className="srhr-status-grid">
          {/* PEP Status Card */}
          <div className={`srhr-time-card ${isPepExpired ? 'card-expired' : isPepUrgent ? 'card-urgent' : 'card-valid'}`}>
            <div className="time-card-top">
              <ShieldAlert size={20} />
              <span className="time-card-title">HIV Prevention (PEP)</span>
            </div>
            <div className="time-countdown-box">
              {isPepExpired ? (
                <div className="status-expired-text">72-Hour Window Expired</div>
              ) : (
                <>
                  <div className="countdown-hours-left">{pepRemaining}</div>
                  <div className="countdown-sub">hours remaining to initiate PEP</div>
                </>
              )}
            </div>
            <div className="time-card-verdict">
              {isPepOptimal && <span className="verdict-optimal">Optimal Effectiveness (Within 24h)</span>}
              {isPepUrgent && <span className="verdict-urgent">Urgent: Go directly to a clinic now</span>}
              {isPepExpired && <span className="verdict-expired">Visit a health center for baseline HIV testing and medical assessment</span>}
            </div>
          </div>

          {/* ECP Status Card */}
          <div className={`srhr-time-card ${isEcpExpired ? 'card-expired' : 'card-valid'}`}>
            <div className="time-card-top">
              <Pill size={20} />
              <span className="time-card-title">Emergency Contraception (ECP)</span>
            </div>
            <div className="time-countdown-box">
              {isEcpExpired ? (
                <div className="status-expired-text">120-Hour Window Closed</div>
              ) : (
                <>
                  <div className="countdown-hours-left">{ecpRemaining}</div>
                  <div className="countdown-sub">hours remaining for ECP efficacy</div>
                </>
              )}
            </div>
            <div className="time-card-verdict">
              {elapsedHours <= 72 ? (
                <span className="verdict-optimal">Levonorgestrel (Postinor-2) Highly Effective</span>
              ) : !isEcpExpired ? (
                <span className="verdict-urgent">Ulipristal Acetate effective up to 120h</span>
              ) : (
                <span className="verdict-expired">Consult a doctor or Marie Stopes clinic</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SRHR Medical Protocols Detail */}
      <div className="srhr-protocols-grid">
        {srhrMedicalWindows.map((protocol) => (
          <div key={protocol.id} className="srhr-detail-card">
            <div className="protocol-card-head">
              <div className="protocol-badge">{protocol.badge}</div>
              <h3 className="protocol-title">{protocol.name}</h3>
              <h4 className="protocol-am">{protocol.amName}</h4>
            </div>
            <p className="protocol-desc">{protocol.description}</p>
            <div className="protocol-rules-box">
              <span className="rules-heading">CRITICAL RULES & PROCEDURES:</span>
              <ul className="protocol-rules-list">
                {protocol.rules.map((rule, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className="rule-check-icon" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Forensic Evidence Preservation Banner */}
      <div className="forensic-preservation-card">
        <div className="forensic-left">
          <Stethoscope size={28} />
          <div>
            <h3>Forensic Medical Evidence Checklist (Form 8)</h3>
            <p>
              If sexual assault occurred, physical evidence on the body and clothing is critical for prosecuting the perpetrator in Ethiopian courts.
            </p>
          </div>
        </div>
        <div className="forensic-rules-row">
          <div className="forensic-do-card">
            <span className="card-badge-do">DO THIS</span>
            <ul>
              <li>Go to a hospital or public health center emergency ward.</li>
              <li>Request the doctor to fill out the standard <strong>Medical Report (Form 8 / ፎርም 8)</strong>.</li>
              <li>Store worn clothes in a clean dry paper bag (never plastic).</li>
            </ul>
          </div>
          <div className="forensic-dont-card">
            <span className="card-badge-dont">DO NOT DO THIS</span>
            <ul>
              <li>Do NOT bathe, shower, or wash yourself before the medical exam.</li>
              <li>Do NOT douche or brush your teeth if oral assault occurred.</li>
              <li>Do NOT throw away torn or stained clothing.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
