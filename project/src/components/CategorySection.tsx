import React from 'react';
import type { DesignPattern, PatternCategoryInfo } from '../types';
import { PatternCard } from './PatternCard';

interface CategorySectionProps {
  category: PatternCategoryInfo;
  patterns: DesignPattern[];
  onPatternClick: (pattern: DesignPattern) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  patterns,
  onPatternClick
}) => {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} text-white rounded-2xl mb-4`}>
          <span className="text-2xl font-bold">{category.name[0]}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
        <p className="text-gray-600 text-sm">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {patterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            pattern={pattern}
            onClick={onPatternClick}
            categoryColor={category.color}
          />
        ))}
      </div>
    </div>
  );
};