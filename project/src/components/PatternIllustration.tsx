import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { DesignPattern } from '../types';

interface PatternIllustrationProps {
  pattern: DesignPattern;
}

export const PatternIllustration: React.FC<PatternIllustrationProps> = ({ pattern }) => {
  const [images, setImages] = useState<string[]>([]);
  const [exampleNames, setExampleNames] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadPatternImages = async () => {
      setLoading(true);
      setImageError(false);
      
      try {
        // Obtener los ejemplos del patrón desde el JSON
        const response = await fetch('/src/data/patrones.json');
        const data = await response.json();
        
        const patternData = data[pattern.id];
        if (patternData && patternData.ejemplos) {
          const imageUrls = patternData.ejemplos.map((ejemplo: any) => 
            `/img/${pattern.id}-${ejemplo.nombre}.png`
          );
          const names = patternData.ejemplos.map((ejemplo: any) => ejemplo.nombre);
          setImages(imageUrls);
          setExampleNames(names);
        }
      } catch (error) {
        console.error('Error loading pattern images:', error);
        setImageError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPatternImages();
    setCurrentImageIndex(0);
  }, [pattern.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="h-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Diagrama del Patrón</h3>
        </div>
        <div className="p-8 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando imágenes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (imageError || images.length === 0) {
    return (
      <div className="h-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Diagrama del Patrón</h3>
        </div>
        <div className="p-8 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-6">{pattern.icon}</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">{pattern.name}</h4>
            <p className="text-gray-600 max-w-sm leading-relaxed mb-4">
              {pattern.description}
            </p>
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                Imágenes no disponibles para este patrón
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Diagrama del Patrón</h3>
        {images.length > 1 && (
          <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
            {currentImageIndex + 1} / {images.length}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Imagen principal */}
        <div className="lg:col-span-2 relative bg-white rounded-lg border border-gray-200 overflow-hidden h-96">
          {/* Nombre del ejemplo */}
          {exampleNames[currentImageIndex] && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm font-medium">
              {exampleNames[currentImageIndex]}
            </div>
          )}
          
          <img
            src={images[currentImageIndex]}
            alt={`Diagrama del patrón ${pattern.name} - ${exampleNames[currentImageIndex] || `Ejemplo ${currentImageIndex + 1}`}`}
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
          
          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Panel lateral con información y miniaturas */}
        <div className="lg:col-span-1 space-y-4">
          {/* Información del patrón */}
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">{pattern.icon}</span>
              <h4 className="font-bold text-gray-800 text-lg">{pattern.name}</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {pattern.description}
            </p>
          </div>

          {/* Miniaturas */}
          {images.length > 1 && (
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-3">Ejemplos disponibles</h5>
              <div className="grid grid-cols-1 gap-2">
              {images.map((image, index) => (
                <div key={index} className="space-y-1">
                  <button
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-full h-20 rounded border-2 overflow-hidden transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  >
                    <img
                      src={image}
                      alt={`Miniatura ${exampleNames[index] || `${index + 1}`}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                  {exampleNames[index] && (
                    <p className="text-xs text-gray-600 text-center font-medium truncate">
                      {exampleNames[index]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};