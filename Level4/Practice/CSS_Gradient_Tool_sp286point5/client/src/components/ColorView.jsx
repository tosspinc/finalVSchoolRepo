import React from 'react';

export default function ColorView({ gradientCSS }) {
    return (
      <div className="results-view" style={{ display: "block", background: gradientCSS }}></div>
    );
  }
