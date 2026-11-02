import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Yanchi AI caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0F0B18',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            background: '#1D162D',
            border: '1px solid #E05D44',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px'
          }}>
            <h2 style={{ color: '#E05D44', marginBottom: '1rem' }}>ያንቺ AI (Yanchi AI)</h2>
            <p style={{ color: '#CBD5E1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              A temporary display error occurred. Tap below to reload the sanctuary:
            </p>
            <p style={{ fontSize: '0.8rem', color: '#F87171', background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              {this.state.error?.message || 'Unknown error'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              style={{
                background: '#E05D44',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Reload Sanctuary (እንደገና ጫን)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
