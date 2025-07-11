import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/github.css';
import type { FileNode } from '../types';

// Register languages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);

interface CodeViewerProps {
  selectedFile: FileNode | null;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ selectedFile }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && selectedFile?.content) {
      codeRef.current.textContent = selectedFile.content;
      hljs.highlightElement(codeRef.current);
    }
  }, [selectedFile]);

  if (!selectedFile) {
    return (
      <div className="h-full bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-blue-300 mb-4">📄</div>
          <p className="text-blue-600 font-medium">Selecciona un archivo para ver su contenido</p>
        </div>
      </div>
    );
  }

  if (selectedFile.type === 'folder') {
    return (
      <div className="h-full bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-blue-300 mb-4">📁</div>
          <p className="text-blue-600 font-medium">Selecciona un archivo, no una carpeta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-blue-50 rounded-xl border border-blue-200 overflow-hidden">
      <div className="bg-blue-100 px-4 py-3 border-b border-blue-200 flex items-center justify-between">
        <h3 className="font-semibold text-blue-800">Visor de Código</h3>
        <span className="text-sm text-blue-600 bg-blue-200 px-2 py-1 rounded">
          {selectedFile.name}
        </span>
      </div>
      <div className="p-4 overflow-auto h-full">
        <pre className="text-sm">
          <code
            ref={codeRef}
            className={`language-${selectedFile.language || 'typescript'}`}
          >
            {selectedFile.content}
          </code>
        </pre>
      </div>
    </div>
  );
};