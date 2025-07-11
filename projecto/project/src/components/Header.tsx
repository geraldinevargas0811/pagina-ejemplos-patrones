import React from 'react';
import { Code2, Home } from 'lucide-react';

interface HeaderProps {
  onHomeClick?: () => void;
  showHomeButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, showHomeButton = true }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
            <Code2 size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800">Patrones de Diseño</span>
        </div>
        
        {showHomeButton && (
          <button
            onClick={onHomeClick}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Home size={20} />
            <span className="font-medium">Inicio</span>
          </button>
        )}
      </div>
    </header>
  );
};