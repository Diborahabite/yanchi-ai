import React, { useState, useEffect } from 'react';
import { Delete, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export function CalculatorCamouflage({ onUnlock, t }) {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplayOnNext, setResetDisplayOnNext] = useState(false);
  const [secretBuffer, setSecretBuffer] = useState('');
  const [logoClicks, setLogoClicks] = useState(0);
  const [notification, setNotification] = useState('');

  // Handle secret code unlocking
  // Secret codes: 8044=, 2026=, 1234=
  const checkSecret = (code) => {
    if (code.endsWith('8044=') || code.endsWith('2026=') || code.endsWith('1234=')) {
      setNotification('Discreet Sanctuary Unlocked...');
      setTimeout(() => {
        onUnlock();
      }, 400);
      return true;
    }
    return false;
  };

  const handleDigit = (digit) => {
    setSecretBuffer(prev => (prev + digit).slice(-10));
    if (display === '0' || resetDisplayOnNext) {
      setDisplay(digit);
      setResetDisplayOnNext(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    setSecretBuffer(prev => (prev + '.').slice(-10));
    if (resetDisplayOnNext) {
      setDisplay('0.');
      setResetDisplayOnNext(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setResetDisplayOnNext(false);
    setSecretBuffer('');
  };

  const handleOp = (op) => {
    setSecretBuffer(prev => (prev + op).slice(-10));
    const current = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = compute(prevValue, current, operation);
      setPrevValue(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setResetDisplayOnNext(true);
  };

  const compute = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    const codeWithEquals = secretBuffer + '=';
    if (checkSecret(codeWithEquals)) {
      return;
    }

    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = compute(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setResetDisplayOnNext(true);
    }
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
  };

  const handleToggleSign = () => {
    const current = parseFloat(display);
    setDisplay(String(-current));
  };

  const handleLogoTripleClick = () => {
    const clicks = logoClicks + 1;
    setLogoClicks(clicks);
    if (clicks >= 3) {
      onUnlock();
    }
    setTimeout(() => setLogoClicks(0), 1500);
  };

  return (
    <div className="calculator-camouflage-container">
      {/* Camouflaged App Header */}
      <div className="calc-topbar">
        <div className="calc-brand" onClick={handleLogoTripleClick} title="Standard Calculator">
          <span className="calc-dot"></span>
          <span className="calc-title">{t.calculatorTitle || 'Calculator'}</span>
        </div>
        <div className="calc-right-actions">
          <button 
            type="button" 
            className="calc-secret-pill"
            onClick={onUnlock}
            title={t.calculatorSecretHint}
          >
            <Lock size={12} />
            <span>PIN: 8044=</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="calc-notification-toast">
          <ShieldCheck size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Calculator Window */}
      <div className="calc-window">
        {/* Screen */}
        <div className="calc-screen">
          <div className="calc-history">
            {prevValue !== null && `${prevValue} ${operation || ''}`}
          </div>
          <div className="calc-display-text">{display}</div>
        </div>

        {/* Keypad */}
        <div className="calc-keypad">
          <button type="button" className="calc-btn function" onClick={handleClear}>AC</button>
          <button type="button" className="calc-btn function" onClick={handleToggleSign}>±</button>
          <button type="button" className="calc-btn function" onClick={handlePercent}>%</button>
          <button type="button" className="calc-btn operator" onClick={() => handleOp('÷')}>÷</button>

          <button type="button" className="calc-btn number" onClick={() => handleDigit('7')}>7</button>
          <button type="button" className="calc-btn number" onClick={() => handleDigit('8')}>8</button>
          <button type="button" className="calc-btn number" onClick={() => handleDigit('9')}>9</button>
          <button type="button" className="calc-btn operator" onClick={() => handleOp('×')}>×</button>

          <button type="button" className="calc-btn number" onClick={() => handleDigit('4')}>4</button>
          <button type="button" className="calc-btn number" onClick={() => handleDigit('5')}>5</button>
          <button type="button" className="calc-btn number" onClick={() => handleDigit('6')}>6</button>
          <button type="button" className="calc-btn operator" onClick={() => handleOp('-')}>-</button>

          <button type="button" className="calc-btn number" onClick={() => handleDigit('1')}>1</button>
          <button type="button" className="calc-btn number" onClick={() => handleDigit('2')}>2</button>
          <button type="button" className="calc-btn number" onClick={() => handleDigit('3')}>3</button>
          <button type="button" className="calc-btn operator" onClick={() => handleOp('+')}>+</button>

          <button type="button" className="calc-btn number zero" onClick={() => handleDigit('0')}>0</button>
          <button type="button" className="calc-btn number" onClick={handleDecimal}>.</button>
          <button type="button" className="calc-btn equals" onClick={handleEquals}>=</button>
        </div>

        <div className="calc-footer-hint">
          <span>{t.calculatorSecretHint}</span>
        </div>
      </div>
    </div>
  );
}
