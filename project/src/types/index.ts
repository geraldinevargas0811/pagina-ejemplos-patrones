export interface DesignPattern {
  id: string;
  name: string;
  category: PatternCategory;
  description: string;
  icon: string;
  files: FileNode[];
  image?: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
  expanded?: boolean;
}

export type PatternCategory = 'creational' | 'structural' | 'behavioral';

export interface PatternCategoryInfo {
  id: PatternCategory;
  name: string;
  color: string;
  description: string;
}