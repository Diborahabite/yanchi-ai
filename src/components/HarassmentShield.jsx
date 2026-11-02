import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Building2, 
  GraduationCap, 
  Smartphone, 
  Users, 
  FileText, 
  PlusCircle, 
  Trash2, 
  Download, 
  CheckCircle2, 
  Lock, 
  EyeOff, 
  Copy, 
  Check 
} from 'lucide-react';

export function HarassmentShield({ currentLang, onQuickExit, t }) {
  const [activeCategory, setActiveCategory] = useState('workplace');
  const [incidents, setIncidents] = useState([]);
  
  // Incident Form state
  const [showForm, setShowForm] = useState(false);
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('workplace');
  const [perpetrator, setPerpetrator] = useState('');
  const [description, setDescription] = useState('');
  const [witnesses, setWitnesses] = useState('');
  const [copiedReport, setCopiedReport] = useState(false);

  const categories = [
    { id: 'workplace', label: 'Factory & Workplace', amLabel: 'የስራ ቦታ እና ፋብሪካ', icon: Building2 },
    { id: 'campus', label: 'University & Campus', amLabel: 'የዩኒቨርሲቲ ግቢ', icon: GraduationCap },
    { id: 'street', label: 'Street & Public Transit', amLabel: 'መንገድ እና ትራንስፖርት', icon: Users },
    { id: 'digital', label: 'Digital & Cyber Harassment', amLabel: 'የቴሌግራም እና ዲጂታል ዛቻ', icon: Smartphone }
  ];

  const handleAddIncident = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newRecord = {
      id: 'inc-' + Date.now(),
      date: incidentDate || new Date().toISOString().split('T')[0],
      location: incidentLocation,
      perpetrator: perpetrator || 'Unspecified individual',
      description,
      witnesses: witnesses || 'None documented'
    };

    setIncidents(prev => [newRecord, ...prev]);
    setDescription('');
    setPerpetrator('');
    setWitnesses('');
    setShowForm(false);
  };

  const handleCopyReport = () => {
    if (incidents.length === 0) return;
    let reportText = `CONFIDENTIAL HARASSMENT INCIDENT LOG (PREPARED FOR EWLA 8055 / POLIS TABIYA)\n`;
    reportText += `Generated on: ${new Date().toLocaleDateString()}\n`;
    reportText += `---------------------------------------------------------\n\n`;

    incidents.forEach((item, idx) => {
      reportText += `INCIDENT #${idx + 1}\n`;
      reportText += `Date: ${item.date}\n`;
      reportText += `Context/Location: ${item.location}\n`;
      reportText += `Person(s) Involved: ${item.perpetrator}\n`;
      reportText += `Description: ${item.description}\n`;
      reportText += `Witnesses: ${item.witnesses}\n`;
      reportText += `---------------------------------------------------------\n\n`;
    });

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const clearAllIncidents = () => {
    if (window.confirm('Wipe all logged harassment evidence from memory?')) {
      setIncidents([]);
    }
  };

  return (
    <div className="harassment-shield-container">
      {/* Hero */}
      <div className="harassment-hero">
        <div className="harassment-hero-icon">
          <ShieldAlert size={28} />
        </div>
        <div>
          <h2>Harassment Protection & Incident Evidence Builder</h2>
          <p className="harassment-hero-sub">
            Tactical safeguards and private evidence documentation for workplace, university campus, street, and digital cyber threats.
          </p>
        </div>
      </div>

      {/* Domain Category Selector */}
      <div className="harassment-category-tabs">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`harass-cat-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon size={18} />
              <div>
                <span className="cat-label-en">{cat.label}</span>
                <span className="cat-label-am">{cat.amLabel}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Guide Card */}
      <div className="harassment-domain-guide-card">
        {activeCategory === 'workplace' && (
          <div className="domain-content-block">
            <div className="domain-content-head">
              <Building2 size={22} />
              <h3>Factory & Workplace Protections (Labour Proclamation 1156/2019)</h3>
            </div>
            <p className="domain-desc">
              Industrial park managers, line supervisors, or coworkers are strictly prohibited from demanding sexual favors, making explicit comments, or altering your shifts as punishment.
            </p>
            <div className="domain-tactics-grid">
              <div className="tactic-box">
                <strong>Statutory Right (Article 14/1/f & Article 32):</strong>
                <p>If you quit because of management harassment, you are legally entitled to 100% severance pay plus statutory compensation for constructive dismissal.</p>
              </div>
              <div className="tactic-box">
                <strong>Documentation Rule:</strong>
                <p>Log every date, shift alteration, or wage reduction. Do not delete Telegram or SMS messages from managers.</p>
              </div>
              <div className="tactic-box">
                <strong>Action:</strong>
                <p>Submit your log to the factory Labour Committee, Woreda Labour Office, or contact <strong>EWLA at 8055</strong> for free legal defense.</p>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'campus' && (
          <div className="domain-content-block">
            <div className="domain-content-head">
              <GraduationCap size={22} />
              <h3>University & Campus Safety Guidelines</h3>
            </div>
            <p className="domain-desc">
              Lecturers, dormitory proctors, or student union members cannot condition exam grades, dorm assignments, or graduation on sexual compliance.
            </p>
            <div className="domain-tactics-grid">
              <div className="tactic-box">
                <strong>Criminal Penalties (Article 625):</strong>
                <p>Ethiopian Criminal Code Art. 625 severely penalizes anyone who abuses an educational or administrative hierarchy to solicit sexual favors.</p>
              </div>
              <div className="tactic-box">
                <strong>Buddy System for Evening Classes:</strong>
                <p>Always walk in pairs between libraries and dormitories after 8:00 PM. Memorize the campus security dispatch number.</p>
              </div>
              <div className="tactic-box">
                <strong>Campus Gender Office:</strong>
                <p>Every public university in Ethiopia has a designated Gender Directorate mandated to receive sealed complaints.</p>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'street' && (
          <div className="domain-content-block">
            <div className="domain-content-head">
              <Users size={22} />
              <h3>Street Harassment & Minibus Transit Safety</h3>
            </div>
            <p className="domain-desc">
              Dealing with aggressive catcalling ("Ketero"), stalking, or physical intimidation in public transport, light rail, and bus stops.
            </p>
            <div className="domain-tactics-grid">
              <div className="tactic-box">
                <strong>Taxi / Minibus Seating:</strong>
                <p>Choose window seats or seats near the driver/conductor where you cannot be pinned between two strangers.</p>
              </div>
              <div className="tactic-box">
                <strong>De-escalation & Drawing Attention:</strong>
                <p>If someone grabs or blocks you, project your voice loudly: *"ተው! ምን እያደረክ ነው?"* (Stop! What are you doing?). Abusers rely on silence.</p>
              </div>
              <div className="tactic-box">
                <strong>Emergency Police Dispatch:</strong>
                <p>Dial <strong>991</strong> immediately or approach any traffic police officer on the main avenue.</p>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'digital' && (
          <div className="domain-content-block">
            <div className="domain-content-head">
              <Smartphone size={22} />
              <h3>Digital Stalking & Telegram Blackmail</h3>
            </div>
            <p className="domain-desc">
              Blackmail using private photos, cyber-stalking, or unauthorized publishing in Telegram channels or Facebook groups.
            </p>
            <div className="domain-tactics-grid">
              <div className="tactic-box">
                <strong>Never Pay Blackmailers:</strong>
                <p>Paying money or agreeing to demands never stops a blackmailer; it only leads to more extortion.</p>
              </div>
              <div className="tactic-box">
                <strong>Preserve Digital Evidence:</strong>
                <p>Take screenshots showing the username (@username), user ID, and timestamp before blocking.</p>
              </div>
              <div className="tactic-box">
                <strong>Cyber Crime Division:</strong>
                <p>Contact EWLA (8055) or the Federal Police Cyber Crime Division for swift digital removal and prosecution.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Private Incident Documentation Logger (Evidence Builder) */}
      <div className="incident-logger-card">
        <div className="logger-card-header">
          <div>
            <h3>Private Harassment Evidence Logger</h3>
            <span className="logger-sub">Stored strictly in local memory with zero tracking. Download or export directly to EWLA.</span>
          </div>
          <div className="logger-head-actions">
            <button
              type="button"
              className="add-incident-btn"
              onClick={() => setShowForm(!showForm)}
            >
              <PlusCircle size={16} />
              <span>{showForm ? 'Close Form' : 'Log New Incident'}</span>
            </button>
          </div>
        </div>

        {/* Incident Form Modal / Drawer */}
        {showForm && (
          <form className="incident-entry-form" onSubmit={handleAddIncident}>
            <div className="form-grid">
              <div className="form-group">
                <label>Date of Incident:</label>
                <input
                  type="date"
                  className="form-input"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Context / Location:</label>
                <select
                  className="form-input"
                  value={incidentLocation}
                  onChange={(e) => setIncidentLocation(e.target.value)}
                >
                  <option value="Factory / Industrial Park">Factory / Industrial Park (የፋብሪካ ቦታ)</option>
                  <option value="Office / Workplace">Office / Workplace (ቢሮ)</option>
                  <option value="University Campus">University Campus (ግቢ/ዶርም)</option>
                  <option value="Public Transport / Taxi">Public Transport / Minibus (ታክሲ/መንገድ)</option>
                  <option value="Telegram / Social Media">Telegram / Online (ዲጂታል/ስልክ)</option>
                  <option value="Home / Residential">Home / Residential (ቤት ውስጥ)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Harasser Name / Role (or description):</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="E.g. Line Supervisor / Coworker / Unknown"
                  value={perpetrator}
                  onChange={(e) => setPerpetrator(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Witnesses (Colleagues/Neighbors):</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Names of colleagues or bystanders present"
                  value={witnesses}
                  onChange={(e) => setWitnesses(e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>What happened? (Specific words, threats, or physical actions):</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  required
                  placeholder="Describe exactly what was said or done..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-incident-btn">
                <CheckCircle2 size={16} />
                <span>Save to Local Evidence Log</span>
              </button>
            </div>
          </form>
        )}

        {/* Incidents Table / List */}
        <div className="logged-incidents-area">
          {incidents.length === 0 ? (
            <div className="no-incidents-logged">
              <Lock size={28} />
              <p>No incidents logged yet. Tap <strong>"Log New Incident"</strong> above to document events securely.</p>
            </div>
          ) : (
            <div className="incidents-stack">
              <div className="incidents-batch-actions">
                <span className="incidents-count">{incidents.length} Incident(s) Documented</span>
                <div className="batch-btns">
                  <button type="button" className="batch-action-btn" onClick={handleCopyReport}>
                    {copiedReport ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedReport ? 'Report Copied' : 'Copy Full EWLA Report'}</span>
                  </button>
                  <button type="button" className="batch-action-btn wipe-log" onClick={clearAllIncidents}>
                    <Trash2 size={14} />
                    <span>Wipe Log</span>
                  </button>
                </div>
              </div>

              {incidents.map((inc, i) => (
                <div key={inc.id} className="incident-card">
                  <div className="incident-card-top">
                    <span className="inc-badge">INCIDENT #{incidents.length - i}</span>
                    <span className="inc-date">{inc.date}</span>
                    <span className="inc-loc-tag">{inc.location}</span>
                  </div>
                  <div className="inc-person">
                    <strong>Person Involved:</strong> {inc.perpetrator}
                  </div>
                  <p className="inc-description">{inc.description}</p>
                  {inc.witnesses && (
                    <div className="inc-witnesses">
                      <small><strong>Witnesses:</strong> {inc.witnesses}</small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
