'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const AstroD = dynamic(() => import('./AstroD'), { ssr: false });

class AstroDErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, background: 'red', color: 'white', padding: '1rem', borderRadius: '8px' }}>
          Error en AstroD: {this.state.errorMsg}
        </div>
      );
    }
    return this.props.children;
  }
}

export default function AstroDWrapper() {
  return (
    <AstroDErrorBoundary>
      <AstroD />
    </AstroDErrorBoundary>
  );
}
