import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  PlusCircle, 
  Send, 
  Filter, 
  Flower2, 
  Shield, 
  AlertCircle 
} from 'lucide-react';
import { scrubPII } from '../services/safetyEngine';

export function PeerCircle({ currentLang, t }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('factory');
  const [piiDetected, setPiiDetected] = useState(false);

  // Initial curated, culturally grounded anonymous peer stories
  const [stories, setStories] = useState([
    {
      id: 'story-1',
      category: 'factory',
      author: 'Anonymous Sister (Hawassa Industrial Park)',
      amAuthor: 'ስሟ ያልተጠቀሰ እህት (ሀዋሳ ኢንዱስትሪ ፓርክ)',
      timestamp: '2 hours ago',
      title: 'Breaking the silence with line supervisors',
      content: 'በልብስ ስፌት ፋብሪካ ውስጥ የበላይ ተቆጣጣሪው በየቀኑ የስራ ፈረቃ እየቀየረ ጫና ያደርግብኝ ነበር። ፍርሃት እና ይሉኝታ ተሰምቶኝ ነበር፤ ነገር ግን ከሌሎች 3 የሥራ ባልደረቦቼ ጋር በመሆን ለEWLA (8055) አመለከትን። አሁን መብታችን ተከብሯል፤ ብቻችንን አይደለንም!',
      reactions: { heart: 24, strength: 31, peace: 18 }
    },
    {
      id: 'story-2',
      category: 'campus',
      author: 'Anonymous Student (Addis Ababa University)',
      amAuthor: 'ስሟ ያልተጠቀሰ ተማሪ (አዲስ አበባ ዩኒቨርሲቲ)',
      timestamp: 'Yesterday',
      title: 'Saying NO to grades coercion in university',
      content: 'አንድ የኮርስ መምህር ውጤት ለመስጠት የግል ስልኬን እየጠየቀ ሲያስጨንቀኝ ነበር። ለግቢው የሴቶች እና የጾታ ጉዳይ ዳይሬክቶሬት ማስረጃዬን ይዤ አመለከትኩ። እህቶቼ፣ ፈተናን ማለፍ በራስሽ ጥረት እንጂ በአካልሽ መስዋዕትነት መሆን የለበትም!',
      reactions: { heart: 42, strength: 56, peace: 29 }
    },
    {
      id: 'story-3',
      category: 'family',
      author: 'Mother of Two (Kazanchis, Addis Ababa)',
      amAuthor: 'የሁለት ልጆች እናት (ካዛንቺስ፣ አዲስ አበባ)',
      timestamp: '3 days ago',
      title: 'Leaving domestic battery without shame',
      content: 'ለ10 ዓመታት "ቤተሰቤ ምን ይላል? ይሉኝታ" በሚል የትዳር ጥቃትን ታግሼ ቆየሁ። ልጆቼን ይዤ ስወጣ የአክሳድ (AWSAD) መጠለያ እጆቹን ዘርግቶ ተቀበለኝ። ዛሬ በሰላም እተኛለሁ፤ ክብር እና ነፃነት ከሁሉ ይበልጣል።',
      reactions: { heart: 67, strength: 73, peace: 51 }
    },
    {
      id: 'story-4',
      category: 'yilunta',
      author: 'Sister in Recovery',
      amAuthor: 'የመንፈስ ሰላም ያገኘች እህት',
      timestamp: '5 days ago',
      title: 'Reclaiming my dignity after assault',
      content: 'የደረሰብኝ ጥቃት የኔ ጥፋት እንደሆነ አድርጌ ራሴን ወንጅዬ ነበር። በያንቺ AI እና በባለሙያዎች ምክር አማካኝነት እውነቱን ተረዳሁ፡ ወንጀለኛው ጥቃት አድራሹ ነው እንጂ እኔ አይደለሁም!',
      reactions: { heart: 89, strength: 94, peace: 63 }
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Circles', amLabel: 'ሁሉም ክቦች' },
    { id: 'factory', label: 'Factory Workers', amLabel: 'የፋብሪካ እህቶች' },
    { id: 'campus', label: 'Campus Students', amLabel: 'የዩኒቨርሲቲ ተማሪዎች' },
    { id: 'family', label: 'Family & Marriage', amLabel: 'የትዳርና የቤተሰብ ጥንካሬ' },
    { id: 'yilunta', label: 'Overcoming Stigma', amLabel: 'ይሉኝታን ማሸነፍ' }
  ];

  const handleReaction = (storyId, reactionType) => {
    setStories(prev => prev.map(s => {
      if (s.id === storyId) {
        return {
          ...s,
          reactions: {
            ...s.reactions,
            [reactionType]: s.reactions[reactionType] + 1
          }
        };
      }
      return s;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const { sanitizedText, hasPII } = scrubPII(newPostText);
    if (hasPII) {
      setPiiDetected(true);
      setTimeout(() => setPiiDetected(false), 4000);
    }

    const newStory = {
      id: 'story-' + Date.now(),
      category: newPostCategory,
      author: 'Anonymous Sister',
      amAuthor: 'ስሟ ያልተጠቀሰ እህት',
      timestamp: 'Just now',
      title: 'Sisterhood Reflection',
      content: sanitizedText,
      reactions: { heart: 1, strength: 1, peace: 1 }
    };

    setStories([newStory, ...stories]);
    setNewPostText('');
    setShowPostModal(false);
  };

  const filteredStories = selectedCategory === 'all'
    ? stories
    : stories.filter(s => s.category === selectedCategory);

  return (
    <div className="peer-circle-container">
      {/* Hero */}
      <div className="peer-hero">
        <div className="peer-hero-icon">
          <Users size={30} />
        </div>
        <div>
          <h2>Sisterhood Peer Circle (የእህትማማቾች ክብ)</h2>
          <p className="peer-hero-sub">
            A 100% anonymous, safe sanctuary to share courage, receive sisterly affirmations, and know you are never alone.
          </p>
        </div>
      </div>

      {/* Community Zero-Blame Pledge */}
      <div className="peer-pledge-banner">
        <div className="pledge-icon">
          <ShieldCheck size={20} />
        </div>
        <div className="pledge-text">
          <strong>OUR SISTERHOOD PLEDGE:</strong>
          <span>Absolute anonymity, zero victim-blaming, zero judgment, and unwavering solidarity.</span>
        </div>
      </div>

      {/* Category Filter & Share Button */}
      <div className="peer-control-bar">
        <div className="peer-filter-chips">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`circle-cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{currentLang === 'am' ? cat.amLabel : cat.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="open-post-btn"
          onClick={() => setShowPostModal(true)}
        >
          <PlusCircle size={16} />
          <span>Share Anonymously</span>
        </button>
      </div>

      {/* Anonymous Share Modal */}
      {showPostModal && (
        <div className="peer-modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="peer-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <Sparkles size={20} />
              <h3>Share Your Story / Message to Sisters</h3>
              <button type="button" className="close-peer-modal-btn" onClick={() => setShowPostModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="peer-post-form">
              <div className="form-group">
                <label>Choose Peer Circle:</label>
                <select
                  className="peer-select"
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                >
                  <option value="factory">Factory & Industrial Park Workers (የፋብሪካ እህቶች)</option>
                  <option value="campus">University & College Students (የዩኒቨርሲቲ ተማሪዎች)</option>
                  <option value="family">Marriage & Family Journey (የትዳር ፈተና)</option>
                  <option value="yilunta">Overcoming Stigma & Shame (ይሉኝታን ማሸነፍ)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Anonymous Words of Strength or Reflection:</label>
                <textarea
                  className="peer-textarea"
                  rows={4}
                  required
                  placeholder="Share your encouragement, experience, or what gives you strength..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                />
              </div>

              <div className="post-privacy-note">
                <ShieldCheck size={14} />
                <span>Zero-Trust: Personal names, phone numbers, or IDs are automatically scrubbed for your protection.</span>
              </div>

              <div className="modal-form-actions">
                <button type="button" className="cancel-post-btn" onClick={() => setShowPostModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-story-btn">
                  <Send size={15} />
                  <span>Post Anonymously</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feed of Stories */}
      <div className="peer-stories-feed">
        {filteredStories.map((story) => (
          <div key={story.id} className="peer-story-card">
            <div className="story-card-top">
              <div className="story-author-info">
                <span className="author-avatar-dot"></span>
                <strong>{currentLang === 'am' ? story.amAuthor : story.author}</strong>
                <span className="story-time">• {story.timestamp}</span>
              </div>
              <span className="story-category-tag">
                {categories.find(c => c.id === story.category)?.amLabel || story.category}
              </span>
            </div>

            <h3 className="story-title">{story.title}</h3>
            <p className="story-body-text">{story.content}</p>

            <div className="story-reactions-bar">
              <button
                type="button"
                className="reaction-bubble-btn"
                onClick={() => handleReaction(story.id, 'heart')}
                title="I Hear You Sister"
              >
                <Heart size={15} className="react-icon heart" />
                <span className="reaction-label">{currentLang === 'am' ? 'እሰማሻለሁ' : 'I Hear You'}</span>
                <span className="reaction-count">{story.reactions.heart}</span>
              </button>

              <button
                type="button"
                className="reaction-bubble-btn"
                onClick={() => handleReaction(story.id, 'strength')}
                title="You Are Strong"
              >
                <Shield size={15} className="react-icon shield" />
                <span className="reaction-label">{currentLang === 'am' ? 'አንቺ ብርቱ ነሽ' : 'Stay Strong'}</span>
                <span className="reaction-count">{story.reactions.strength}</span>
              </button>

              <button
                type="button"
                className="reaction-bubble-btn"
                onClick={() => handleReaction(story.id, 'peace')}
                title="Peace & Healing"
              >
                <Flower2 size={15} className="react-icon flower" />
                <span className="reaction-label">{currentLang === 'am' ? 'ሰላም ለአንቺ' : 'Peace'}</span>
                <span className="reaction-count">{story.reactions.peace}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
