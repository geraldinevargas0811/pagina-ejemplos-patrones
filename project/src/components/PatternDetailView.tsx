import React, { useState } from 'react';
import { Download } from 'lucide-react';
import type { DesignPattern, FileNode } from '../types';
import { FileExplorer } from './FileExplorer';
import { CodeViewer } from './CodeViewer';
import { PatternIllustration } from './PatternIllustration';
import { generatePatternZip } from '../utils/zipGenerator';

interface PatternDetailViewProps {
  pattern: DesignPattern;
}

export const PatternDetailView: React.FC<PatternDetailViewProps> = ({ pattern }) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const handleDownloadZip = () => {
    generatePatternZip(pattern.name, pattern.files);
  };

  return (
    <div className="pt-20 pb-12 px-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Patrón {pattern.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              {pattern.description}
            </p>
          </div>
          
          {/* Botón de descarga ZIP */}
          <div className="ml-6">
            <button
              onClick={handleDownloadZip}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download size={20} />
              <span>Descargar Código</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pattern Illustration - Parte superior */}
          <div className="w-full">
            <PatternIllustration pattern={pattern} />
          </div>

          {/* File Explorer y Code Viewer - Parte inferior */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(60vh-150px)]">
            {/* File Explorer - Left Column */}
            <div className="lg:col-span-1">
              <FileExplorer
                files={pattern.files}
                onFileSelect={setSelectedFile}
                selectedFileId={selectedFile?.id}
              />
            </div>

            {/* Code Viewer - Right Column (más ancho) */}
            <div className="lg:col-span-3">
              <CodeViewer selectedFile={selectedFile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};