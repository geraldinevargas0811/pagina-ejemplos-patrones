import React from 'react';
import type { DesignPattern } from '../types';

interface PatternCardProps {
  pattern: DesignPattern;
  onClick: (pattern: DesignPattern) => void;
  categoryColor: string;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, onClick, categoryColor }) => {
  return (
    <button
      onClick={() => onClick(pattern)}
      className="group relative w-full p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${categoryColor} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
      
      <div className="relative z-10 flex flex-col items-center space-y-3">
        <div className="flex items-center justify-center w-12 h-12 text-2xl bg-gray-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
          {pattern.icon}
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
            {pattern.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {pattern.description}
          </p>
        </div>
      </div>
    </button>
  );
};