import React, { useState } from 'react';
import type { DesignPattern } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { PatternDetailView } from './components/PatternDetailView';

function App() {
  const [selectedPattern, setSelectedPattern] = useState<DesignPattern | null>(null);

  const handlePatternSelect = (pattern: DesignPattern) => {
    setSelectedPattern(pattern);
  };

  const handleHomeClick = () => {
    setSelectedPattern(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onHomeClick={handleHomeClick}
        showHomeButton={selectedPattern !== null}
      />
      
      {selectedPattern ? (
        <PatternDetailView pattern={selectedPattern} />
      ) : (
        <HomeView onPatternSelect={handlePatternSelect} />
      )}
    </div>
  );
}

export default App;