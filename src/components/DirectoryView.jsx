import React, { useState } from 'react';
import { 
  Building2, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  ExternalLink, 
  Scale, 
  Hospital, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { emergencyHotlines, sanctuaryShelters } from '../data/statutoryData';

export function DirectoryView({ currentLang, t }) {
  const [filter, setFilter] = useState('all');

  return (
    <div className="directory-view-container">
      {/* Hero */}
      <div className="directory-hero">
        <div className="directory-hero-icon">
          <Building2 size={28} />
        </div>
        <div>
          <h2>Verified Ethiopian Shelters & Legal Desks</h2>
          <p className="directory-hero-sub">
            Confidential physical sanctuaries, certified pro-bono lawyers, and non-judgmental healthcare clinics across Ethiopia.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="directory-filter-bar">
        <button 
          type="button" 
          className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Resources
        </button>
        <button 
          type="button" 
          className={`filter-pill ${filter === 'hotlines' ? 'active' : ''}`}
          onClick={() => setFilter('hotlines')}
        >
          📞 Emergency Hotlines
        </button>
        <button 
          type="button" 
          className={`filter-pill ${filter === 'shelters' ? 'active' : ''}`}
          onClick={() => setFilter('shelters')}
        >
          🏡 AWSAD Sanctuary Shelters
        </button>
        <button 
          type="button" 
          className={`filter-pill ${filter === 'legal' ? 'active' : ''}`}
          onClick={() => setFilter('legal')}
        >
          ⚖️ EWLA Legal Desks
        </button>
        <button 
          type="button" 
          className={`filter-pill ${filter === 'medical' ? 'active' : ''}`}
          onClick={() => setFilter('medical')}
        >
          🏥 Marie Stopes (MSI)
        </button>
      </div>

      {/* Hotlines Section */}
      {(filter === 'all' || filter === 'hotlines') && (
        <div className="directory-section">
          <div className="section-title-wrap">
            <h3 className="section-title">24/7 National Emergency Hotlines</h3>
            <span className="section-badge">Toll-Free & Confidential</span>
          </div>

          <div className="hotlines-cards-grid">
            {emergencyHotlines.map((hotline) => (
              <div key={hotline.id} className="directory-hotline-card">
                <div className="hotline-card-head">
                  <div className="phone-num-bubble">
                    <PhoneCall size={16} />
                    <span>{hotline.phone}</span>
                  </div>
                  <span className="hotline-lang-pill">{hotline.hours}</span>
                </div>
                <h4 className="hotline-title-en">{hotline.name}</h4>
                <h5 className="hotline-title-am">{hotline.amName}</h5>
                <p className="hotline-card-desc">{hotline.description}</p>
                <div className="hotline-supported-langs">
                  <strong>Languages:</strong> {hotline.languages}
                </div>
                <a href={hotline.tel} className="call-now-anchor-btn">
                  <PhoneCall size={16} />
                  <span>Call {hotline.phone} Now (Free)</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sanctuary Shelters & Partner Organizations */}
      {(filter === 'all' || filter === 'shelters' || filter === 'legal' || filter === 'medical') && (
        <div className="directory-section">
          <div className="section-title-wrap">
            <h3 className="section-title">Verified Sanctuaries & Protection Centers</h3>
            <span className="section-badge">Physical Safety & Representation</span>
          </div>

          <div className="shelters-cards-grid">
            {sanctuaryShelters
              .filter(s => {
                if (filter === 'shelters') return s.name.includes('AWSAD');
                if (filter === 'legal') return s.name.includes('EWLA');
                if (filter === 'medical') return s.name.includes('Marie Stopes');
                return true;
              })
              .map((org, idx) => (
                <div key={idx} className="shelter-org-card">
                  <div className="org-card-header">
                    <div className="org-badge-icon">
                      {org.name.includes('AWSAD') ? <Heart size={20} /> : org.name.includes('EWLA') ? <Scale size={20} /> : <Hospital size={20} />}
                    </div>
                    <div>
                      <h4 className="org-name-en">{org.name}</h4>
                      <h5 className="org-name-am">{org.amName}</h5>
                    </div>
                  </div>

                  <div className="org-body-block">
                    <div className="org-detail-row">
                      <span className="detail-tag">SERVICES PROVIDED:</span>
                      <p className="detail-text">{org.services}</p>
                    </div>

                    <div className="org-detail-row">
                      <span className="detail-tag">LOCATIONS / BRANCHES:</span>
                      <div className="locations-tags-list">
                        {org.locations.map((loc, i) => (
                          <span key={i} className="loc-tag">
                            <MapPin size={12} />
                            <span>{loc}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {org.confidential && (
                      <div className="confidential-address-notice">
                        <ShieldCheck size={14} />
                        <span>{org.confidential} (Intake coordinated via phone for safety)</span>
                      </div>
                    )}
                  </div>

                  <div className="org-card-footer">
                    <span className="org-contact-label">Contact / Referral:</span>
                    <strong className="org-contact-val">{org.contact}</strong>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
