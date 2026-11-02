import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Wind, 
  Eye, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  Compass, 
  Volume2
} from 'lucide-react';

export function MentalHealthView({ currentLang, t }) {
  // Breathing exercise states: inhale (4s), hold1 (4s), exhale (4s), hold2 (4s)
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold, exhale, rest
  const [countdown, setCountdown] = useState(4);
  const [groundingStep, setGroundingStep] = useState(5);

  const affirmations = [
    { am: 'ይህ ያንቺ ጥፋት አይደለም። አንቺ ብርቱ፣ የተከበርሽ እና የመወደድ ሙሉ መብት ያለሽ ሴት ነሽ።', en: 'This is not your fault. You are strong, dignified, and worthy of peace.' },
    { am: 'ይሉኝታ እና የሰዎች ወሬ ያንቺን ሰላም እና ሕይወት ሊነጥቅሽ አይገባም። ክብርሽ ሁልጊዜ ከአንቺ ጋር ነው።', en: 'Societal stigma ("Yilunta") cannot steal your peace. Your dignity is inherently yours.' },
    { am: 'አሁን የሚሰማሽ ጭንቀት እና ፍርሃት ያልፋል። እርዳታ መጠየቅ የድክመት ሳይሆን የታላቅ ድፍረት ምልክት ነው።', en: 'This wave of panic will pass. Asking for help is not weakness; it is immense bravery.' },
    { am: 'አካልሽ፣ ነፍስሽ እና ስሜትሽ ጥበቃ ሊደረግላቸው ይገባል። ብቻሽን አይደለሽም፤ እኛ ከአንቺ ጋር ነን።', en: 'Your body and soul deserve protection. You are not alone; a circle of sisters stands with you.' }
  ];
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  // Breathing timer logic
  useEffect(() => {
    let timer;
    if (breathingActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              if (currentPhase === 'inhale') return 'hold';
              if (currentPhase === 'hold') return 'exhale';
              if (currentPhase === 'exhale') return 'rest';
              return 'inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(4);
      setBreathPhase('inhale');
    }
    return () => clearInterval(timer);
  }, [breathingActive]);

  const nextAffirmation = () => {
    setAffirmationIdx((prev) => (prev + 1) % affirmations.length);
  };

  const currentAffirmation = affirmations[affirmationIdx];

  return (
    <div className="mental-health-container">
      {/* Hero */}
      <div className="mental-hero">
        <div className="mental-hero-icon">
          <Heart size={30} />
        </div>
        <div className="mental-hero-text">
          <h2>{t.tabMental || 'Mental Health & Emotional Sanctuary'}</h2>
          <p className="mental-hero-sub">
            Trauma de-escalation, overcoming societal shame ("Yilunta"), and reclaiming your inner peace.
          </p>
        </div>
      </div>

      {/* Daily Sisterhood Affirmation Card */}
      <div className="affirmation-card">
        <div className="affirmation-top">
          <div className="affirmation-badge">
            <Sparkles size={14} />
            <span>SISTERLY AFFIRMATION • የእህትነት ማጽናኛ</span>
          </div>
          <button type="button" className="refresh-affirmation-btn" onClick={nextAffirmation} title="Next affirmation">
            <RefreshCw size={14} />
            <span>New Affirmation</span>
          </button>
        </div>
        <blockquote className="affirmation-text-am">
          "{currentAffirmation.am}"
        </blockquote>
        <p className="affirmation-text-en">
          "{currentAffirmation.en}"
        </p>
      </div>

      {/* Interactive Box Breathing Tool (Calm Panic & Anxiety) */}
      <div className="breathing-tool-card">
        <div className="tool-card-head">
          <div className="tool-icon-wrap">
            <Wind size={22} />
          </div>
          <div>
            <h3>Box Breathing for Acute Anxiety & Panic</h3>
            <span className="tool-card-sub">Used by trauma counselors to reset the nervous system</span>
          </div>
        </div>

        <div className="breathing-stage-visual">
          <div className={`breathing-circle-outer phase-${breathPhase} ${breathingActive ? 'animating' : ''}`}>
            <div className="breathing-circle-inner">
              <span className="breath-phase-title">
                {breathPhase === 'inhale' && (currentLang === 'am' ? 'በአፍንጫሽ በጥልቀት አስገቢ' : 'Inhale Gently')}
                {breathPhase === 'hold' && (currentLang === 'am' ? 'ትንፋሽሽን ያዢ' : 'Hold Breath')}
                {breathPhase === 'exhale' && (currentLang === 'am' ? 'በአፍሽ ቀስ ብለሽ አስወጪ' : 'Exhale Slowly')}
                {breathPhase === 'rest' && (currentLang === 'am' ? 'ተረጋጊና ቆዪ' : 'Rest Calmly')}
              </span>
              <span className="breath-countdown-num">{countdown}</span>
              <span className="breath-seconds-tag">seconds</span>
            </div>
          </div>
        </div>

        <div className="breathing-controls">
          <button
            type="button"
            className={`breathing-toggle-btn ${breathingActive ? 'active' : ''}`}
            onClick={() => setBreathingActive(!breathingActive)}
          >
            {breathingActive ? 'Pause Exercise' : 'Start Calming Breathing'}
          </button>
        </div>
      </div>

      {/* 5-4-3-2-1 Sensory Trauma Grounding Exercise */}
      <div className="grounding-exercise-card">
        <div className="grounding-head">
          <Eye size={22} />
          <div>
            <h3>5-4-3-2-1 Sensory Grounding Technique</h3>
            <p className="grounding-sub">If you are experiencing flashbacks or intense fear, anchor your mind to the physical present moment.</p>
          </div>
        </div>

        <div className="grounding-steps-grid">
          <div className="grounding-step-box">
            <span className="step-num">5</span>
            <strong>LOOK</strong>
            <p>Spot 5 things you can see around you (e.g. a chair, light, door, wall, shoes).</p>
          </div>
          <div className="grounding-step-box">
            <span className="step-num">4</span>
            <strong>TOUCH</strong>
            <p>Feel 4 physical textures (e.g. your fabric, ground beneath your feet, cool water).</p>
          </div>
          <div className="grounding-step-box">
            <span className="step-num">3</span>
            <strong>LISTEN</strong>
            <p>Identify 3 distant sounds (e.g. wind, birds, distant voices, clock tick).</p>
          </div>
          <div className="grounding-step-box">
            <span className="step-num">2</span>
            <strong>SMELL</strong>
            <p>Notice 2 scents in the air (e.g. coffee / Buna, fresh rain, soap).</p>
          </div>
          <div className="grounding-step-box">
            <span className="step-num">1</span>
            <strong>TASTE</strong>
            <p>Acknowledge 1 taste or take a sip of cool drinking water.</p>
          </div>
        </div>
      </div>

      {/* Breaking Free from "Yilunta" (Societal Shaming) */}
      <div className="yilunta-breakdown-card">
        <div className="yilunta-card-head">
          <Compass size={24} />
          <div>
            <h3>Dismantling "Yilunta" (ይሉኝታን መስበር)</h3>
            <span className="yilunta-sub">Understanding how social stigma is used to silence Ethiopian women</span>
          </div>
        </div>

        <div className="yilunta-points-list">
          <div className="yilunta-point">
            <CheckCircle2 size={18} className="yilunta-check-icon" />
            <div>
              <strong>Shame Belongs to the Perpetrator, Never to You:</strong>
              <p>Society often pressures women to hide abuse to "protect family honor." True honor comes from truth, bodily safety, and justice.</p>
            </div>
          </div>

          <div className="yilunta-point">
            <CheckCircle2 size={18} className="yilunta-check-icon" />
            <div>
              <strong>"Shimgilina" (Elder Mediation) Cannot Forgive Crimes:</strong>
              <p>Under Ethiopian criminal law, severe assault, rape, and forced child marriage are serious public penal offenses. Elders cannot legally waive criminal prosecution.</p>
            </div>
          </div>

          <div className="yilunta-point">
            <CheckCircle2 size={18} className="yilunta-check-icon" />
            <div>
              <strong>Your Silence Protects the Abuser, Not Your Future:</strong>
              <p>Speaking to EWLA (8055) or a trusted counselor breaks the cycle of fear and safeguards other sisters.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ethiopian Mental Health Emergency Directory */}
      <div className="mental-directory-card">
        <h3>Certified Trauma & Counseling Contacts (Ethiopia)</h3>
        <div className="mental-contacts-grid">
          <div className="mental-contact-item">
            <strong>National GBV Trauma Helpline</strong>
            <span className="contact-tel">📞 8044 (Toll-Free 24/7)</span>
            <p>Immediate psychosocial trauma debriefing and shelter dispatch.</p>
          </div>

          <div className="mental-contact-item">
            <strong>Amanuel Mental Specialized Hospital</strong>
            <span className="contact-tel">📍 Addis Ababa (አማኑኤል ሆስፒታል)</span>
            <p>Specialized psychiatric and psychological clinical treatment center.</p>
          </div>

          <div className="mental-contact-item">
            <strong>AWSAD In-House Psychologists</strong>
            <span className="contact-tel">📞 8044 Referral Desk</span>
            <p>Confidential one-on-one therapy for survivors of physical and domestic trauma.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
