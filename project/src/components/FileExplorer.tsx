import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import type { FileNode } from '../types';

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  selectedFileId?: string;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  selectedFileId
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(files.filter(f => f.expanded).map(f => f.id))
  );

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileNode = (node: FileNode, depth = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = selectedFileId === node.id;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-green-50 rounded-lg transition-colors duration-200 ${
            isSelected ? 'bg-green-100 border-l-4 border-green-500' : ''
          }`}
          style={{ paddingLeft: `${depth * 20 + 12}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown size={16} className="text-gray-500" />
              ) : (
                <ChevronRight size={16} className="text-gray-500" />
              )}
              <Folder size={16} className="text-green-600" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <File size={16} className="text-blue-600" />
            </>
          )}
          <span className={`text-sm font-medium ${
            isSelected ? 'text-green-800' : 'text-gray-700'
          }`}>
            {node.name}
          </span>
        </div>

        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-green-50 rounded-xl border border-green-200 overflow-hidden">
      <div className="bg-green-100 px-4 py-3 border-b border-green-200">
        <h3 className="font-semibold text-green-800">Explorador de Archivos</h3>
      </div>
      <div className="flex flex-col h-full">
        <div className="p-2 overflow-y-auto flex-1">
        {files.map(file => renderFileNode(file))}
        </div>
      </div>
    </div>
  );
};