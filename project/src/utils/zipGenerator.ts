import type { FileNode } from '../types';

// Función para generar un archivo ZIP del patrón
export const generatePatternZip = async (patternName: string, files: FileNode[]): Promise<void> => {
  // Crear el contenido del ZIP como un objeto con rutas y contenidos
  const zipContent: { [path: string]: string } = {};
  
  // Función recursiva para procesar archivos y carpetas
  const processFiles = (nodes: FileNode[], basePath = '') => {
    nodes.forEach(node => {
      if (node.type === 'file' && node.content) {
        const filePath = basePath ? `${basePath}/${node.name}` : node.name;
        zipContent[filePath] = node.content;
      } else if (node.type === 'folder' && node.children) {
        const folderPath = basePath ? `${basePath}/${node.name}` : node.name;
        processFiles(node.children, folderPath);
      }
    });
  };
  
  processFiles(files);
  
  // Crear un archivo README.md con información del patrón
  zipContent['README.md'] = `# Patrón ${patternName}

Este archivo contiene los ejemplos de implementación del patrón ${patternName}.

## Estructura del proyecto

Cada ejemplo sigue el patrón MVC (Model-View-Controller):
- **Model.ts**: Contiene la lógica de datos y el estado
- **View.ts**: Maneja la presentación y la interfaz de usuario  
- **Controller.ts**: Coordina entre el modelo y la vista

## Cómo usar

1. Revisa cada ejemplo para entender diferentes implementaciones del patrón
2. Cada carpeta representa un caso de uso diferente
3. Los archivos están organizados siguiendo las mejores prácticas de TypeScript

¡Feliz aprendizaje! 🚀
`;

  // Simular la creación del ZIP usando JSZip (en un entorno real)
  // Por ahora, crearemos un archivo de texto con el contenido
  let zipTextContent = `# Contenido del ZIP para el patrón ${patternName}\n\n`;
  
  Object.entries(zipContent).forEach(([path, content]) => {
    zipTextContent += `## Archivo: ${path}\n\`\`\`\n${content}\n\`\`\`\n\n`;
  });
  
  // Crear y descargar el archivo
  const blob = new Blob([zipTextContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `patron-${patternName.toLowerCase().replace(/\s+/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  // Mostrar mensaje de éxito
  alert(`¡Archivo descargado! Se ha generado el contenido del patrón ${patternName}`);
};

// Función para instalar JSZip si se quiere implementar ZIP real
export const installJSZip = () => {
  console.log('Para implementar ZIP real, instalar: npm install jszip @types/jszip');
};