import React from 'react';
import { useState, useEffect } from 'react';
import type { DesignPattern } from '../types';
import { loadPatterns, patternCategories } from '../data/patternLoader';
import { CategorySection } from './CategorySection';

interface HomeViewProps {
  onPatternSelect: (pattern: DesignPattern) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onPatternSelect }) => {
  const [patterns, setPatterns] = useState<DesignPattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const loadedPatterns = await loadPatterns();
        setPatterns(loadedPatterns);
      } catch (error) {
        console.error('Error fetching patterns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  const getPatternsByCategory = (categoryId: string) => {
    return patterns.filter(pattern => pattern.category === categoryId);
  };

  if (loading) {
    return (
      <div className="pt-20 pb-12 px-6 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando patrones de diseño...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Patrones de Diseño de Software
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora los 21 patrones de diseño fundamentales organizados por categorías.
            Haz clic en cualquier patrón para ver su implementación completa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {patternCategories.map(category => (
            <CategorySection
              key={category.id}
              category={category}
              patterns={getPatternsByCategory(category.id)}
              onPatternClick={onPatternSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};