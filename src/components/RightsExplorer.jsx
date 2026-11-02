import React, { useState } from 'react';
import { Scale, Search, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { statutoryLaws } from '../data/statutoryData';

export function RightsExplorer({ currentLang, t }) {
  const [selectedLawId, setSelectedLawId] = useState('labour-1156');
  const [searchQuery, setSearchQuery] = useState('');

  const activeLaw = statutoryLaws.find(l => l.id === selectedLawId) || statutoryLaws[0];

  const filteredArticles = activeLaw.articles.filter(art => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.number.toLowerCase().includes(q) ||
      art.title.toLowerCase().includes(q) ||
      art.amTitle.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.actionableTakeaway.toLowerCase().includes(q)
    );
  });

  return (
    <div className="rights-explorer-container">
      {/* Hero Header */}
      <div className="rights-hero">
        <div className="rights-hero-icon">
          <Scale size={28} />
        </div>
        <div>
          <h2>Ethiopian Statutory Legal Navigator</h2>
          <p className="rights-hero-sub">
            Clear, actionable legal facts grounded directly in Ethiopian Proclamations for women, girls, and industrial workers.
          </p>
        </div>
      </div>

      {/* Law Selector Tabs */}
      <div className="law-selector-tabs">
        {statutoryLaws.map((law) => (
          <button
            key={law.id}
            type="button"
            className={`law-tab-btn ${selectedLawId === law.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedLawId(law.id);
              setSearchQuery('');
            }}
          >
            <BookOpen size={16} />
            <div className="law-tab-text">
              <span className="law-tab-title">{law.proclamation}</span>
              <span className="law-tab-am">{law.amTitle}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div className="law-search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="law-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search legal articles (e.g., harassment, divorce, maternity, overtime, 14)..."
        />
        {searchQuery && (
          <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
            ✕
          </button>
        )}
      </div>

      {/* Active Law Description Banner */}
      <div className="active-law-badge-strip">
        <span className="active-law-category-tag">{activeLaw.category}</span>
        <span className="active-law-fullname">{activeLaw.proclamation}</span>
      </div>

      {/* Articles Grid */}
      <div className="articles-grid">
        {filteredArticles.length === 0 ? (
          <div className="no-articles-found">
            <FileText size={32} />
            <h4>No matching articles found for "{searchQuery}"</h4>
            <p>Try searching with broader terms like "harassment", "divorce", or "leave".</p>
          </div>
        ) : (
          filteredArticles.map((article, idx) => (
            <div key={idx} className="article-card">
              <div className="article-card-header">
                <div className="article-number-badge">
                  <span>{article.number}</span>
                </div>
                <div className="article-titles">
                  <h3 className="article-title-en">{article.title}</h3>
                  <h4 className="article-title-am">{article.amTitle}</h4>
                </div>
              </div>

              <div className="article-body">
                <div className="article-section-box">
                  <span className="section-label">THE STATUTORY PROVISION:</span>
                  <p className="article-summary-text">{article.summary}</p>
                </div>

                <div className="article-section-box actionable-box">
                  <span className="section-label actionable-label">
                    <CheckCircle2 size={13} />
                    <span>WHAT THIS MEANS FOR YOU IN PRACTICE:</span>
                  </span>
                  <p className="article-actionable-text">{article.actionableTakeaway}</p>
                </div>
              </div>

              <div className="article-footer-help">
                <ShieldCheck size={14} />
                <span>Contact EWLA at <strong>8055</strong> for free legal assistance filing under this article.</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
