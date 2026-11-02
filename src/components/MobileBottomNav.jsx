import React from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  Users, 
  Scale, 
  Clock, 
  Building2,
  Pill
} from 'lucide-react';

export function MobileBottomNav({ activeTab, setActiveTab, t }) {
  const items = [
    { id: 'chat', label: 'Chat', amLabel: 'ውይይት', icon: MessageSquare },
    { id: 'health', label: 'SRHR', amLabel: 'የስነ-ተዋልዶ ጤና', icon: Pill },
    { id: 'ai-info', label: 'AI Info', amLabel: 'AI መረጃ', icon: Sparkles },
    { id: 'mental', label: 'Mental', amLabel: 'አእምሮ', icon: Heart },
    { id: 'harassment', label: 'Shield', amLabel: 'ትንኮሳ', icon: ShieldAlert },
    { id: 'peer-circle', label: 'Circle', amLabel: 'እህትማማች', icon: Users },
    { id: 'legal', label: 'Law', amLabel: 'ሕጎች', icon: Scale },
    { id: 'directory', label: 'Shelters', amLabel: 'መጠለያ', icon: Building2 }
  ];

  return (
    <nav className="mobile-native-bottom-bar" aria-label="Mobile Navigation">
      <div className="bottom-bar-scrollable">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={19} />
                {item.id === 'health' && <span className="srhr-pulse-dot"></span>}
                {item.id === 'ai-info' && <span className="ai-nav-glow-dot"></span>}
              </div>
              <span className="mobile-nav-label">{item.amLabel}</span>
              {isActive && <div className="mobile-nav-indicator"></div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
