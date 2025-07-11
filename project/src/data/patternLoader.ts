import type { DesignPattern, PatternCategoryInfo } from '../types';

export const patternCategories: PatternCategoryInfo[] = [
  {
    id: 'creational',
    name: 'Creacionales',
    color: 'from-emerald-500 to-teal-600',
    description: 'Patrones que tratan con la creación de objetos'
  },
  {
    id: 'structural',
    name: 'Estructurales',
    color: 'from-blue-500 to-indigo-600',
    description: 'Patrones que tratan con la composición de objetos'
  },
  {
    id: 'behavioral',
    name: 'Comportamiento',
    color: 'from-purple-500 to-pink-600',
    description: 'Patrones que tratan con la interacción entre objetos'
  }
];

// Mapeo de patrones a categorías
const patternCategoryMap: { [key: string]: string } = {
  'AbstractFactory': 'creational',
  'Builder': 'creational',
  'FactoryMethod': 'creational',
  'Prototype': 'creational',
  'Singleton': 'creational',
  'Adapter': 'structural',
  'Bridge': 'structural',
  'Composite': 'structural',
  'Decorator': 'structural',
  'Facade': 'structural',
  'Flyweight': 'structural',
  'Proxy': 'structural',
  'ChainOfResponsibility': 'behavioral',
  'Command': 'behavioral',
  'Interpreter': 'behavioral',
  'Iterator': 'behavioral',
  'Mediator': 'behavioral',
  'Memento': 'behavioral',
  'Observer': 'behavioral',
  'State': 'behavioral',
  'Strategy': 'behavioral',
  'TemplateMethod': 'behavioral',
  'Visitor': 'behavioral'
};

// Mapeo de iconos para cada patrón
const patternIcons: { [key: string]: string } = {
  'AbstractFactory': '🏭',
  'Builder': '🔨',
  'FactoryMethod': '⚙️',
  'Prototype': '📋',
  'Singleton': '🎯',
  'Adapter': '🔌',
  'Bridge': '🌉',
  'Composite': '🌳',
  'Decorator': '🎨',
  'Facade': '🏛️',
  'Flyweight': '🪶',
  'Proxy': '🛡️',
  'ChainOfResponsibility': '⛓️',
  'Command': '📝',
  'Interpreter': '🔤',
  'Iterator': '🔄',
  'Mediator': '🤝',
  'Memento': '💾',
  'Observer': '👁️',
  'State': '🔄',
  'Strategy': '🎯',
  'TemplateMethod': '📋',
  'Visitor': '🚶'
};

// Descripciones de los patrones
const patternDescriptions: { [key: string]: string } = {
  'AbstractFactory': 'Proporciona una interfaz para crear familias de objetos relacionados sin especificar sus clases concretas.',
  'Builder': 'Permite construir objetos complejos paso a paso.',
  'FactoryMethod': 'Crea objetos sin especificar la clase exacta a crear.',
  'Prototype': 'Permite copiar objetos existentes sin hacer que el código dependa de sus clases.',
  'Singleton': 'Garantiza que una clase tenga una única instancia.',
  'Adapter': 'Permite la colaboración entre objetos de interfaces incompatibles.',
  'Bridge': 'Separa una abstracción de su implementación.',
  'Composite': 'Permite componer objetos en estructuras de árbol.',
  'Decorator': 'Permite añadir funcionalidades a objetos colocándolos dentro de objetos encapsuladores.',
  'Facade': 'Proporciona una interfaz simplificada a una biblioteca, un framework o cualquier conjunto complejo de clases.',
  'Flyweight': 'Permite mantener más objetos en la cantidad disponible de RAM compartiendo eficientemente las partes comunes del estado.',
  'Proxy': 'Permite proporcionar un sustituto o marcador de posición para otro objeto.',
  'ChainOfResponsibility': 'Permite pasar solicitudes a lo largo de una cadena de manejadores.',
  'Command': 'Convierte una solicitud en un objeto independiente que contiene toda la información sobre la solicitud.',
  'Interpreter': 'Define una representación gramática para un lenguaje y proporciona un intérprete.',
  'Iterator': 'Permite recorrer elementos de una colección sin exponer su representación subyacente.',
  'Mediator': 'Define cómo interactúa un conjunto de objetos.',
  'Memento': 'Permite guardar y restaurar el estado previo de un objeto sin revelar los detalles de su implementación.',
  'Observer': 'Define un mecanismo de suscripción para notificar a varios objetos sobre cualquier evento.',
  'State': 'Permite a un objeto alterar su comportamiento cuando su estado interno cambia.',
  'Strategy': 'Define una familia de algoritmos, los coloca en clases separadas y hace sus objetos intercambiables.',
  'TemplateMethod': 'Define el esqueleto de un algoritmo en la superclase pero permite que las subclases sobrescriban pasos específicos.',
  'Visitor': 'Permite separar algoritmos de los objetos sobre los que operan.'
};

// Función para cargar los patrones desde el archivo JSON
export const loadPatterns = async (): Promise<DesignPattern[]> => {
  try {
    const response = await fetch('/src/data/patrones.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verificar que el JSON tiene la estructura esperada
    if (!data || typeof data !== 'object') {
      console.warn('El archivo patrones.json no tiene la estructura esperada');
      return [];
    }
    
    const patterns: DesignPattern[] = [];
    
    // Iterar sobre cada patrón en el JSON
    Object.entries(data).forEach(([patternKey, patternData]: [string, any]) => {
      if (patternData && patternData.ejemplos && Array.isArray(patternData.ejemplos)) {
        const pattern: DesignPattern = {
          id: patternKey,
          name: patternKey,
          category: (patternCategoryMap[patternKey] || 'behavioral') as any,
          description: patternData.descripcion || patternDescriptions[patternKey] || 'Descripción no disponible',
          icon: patternIcons[patternKey] || '📦',
          files: transformExamplesToFiles(patternData.ejemplos)
        };
        
        patterns.push(pattern);
      }
    });
    
    return patterns;
  } catch (error) {
    console.error('Error loading patterns:', error);
    return [];
  }
};

// Función para transformar los ejemplos en estructura de archivos
const transformExamplesToFiles = (ejemplos: any[]) => {
  return ejemplos.map((ejemplo, index) => ({
    id: `ejemplo-${index + 1}`,
    name: `Ejemplo ${index + 1}: ${ejemplo.nombre}`,
    type: 'folder' as const,
    expanded: index === 0, // Expandir el primer ejemplo por defecto
    children: [
      // Carpeta Model
      {
        id: `${ejemplo.nombre}-model-folder`,
        name: 'model',
        type: 'folder' as const,
        expanded: true,
        children: Object.entries(ejemplo.archivos.model || {}).map(([fileName, content]: [string, any]) => ({
          id: `${ejemplo.nombre}-model-${fileName}`,
          name: fileName,
          type: 'file' as const,
          language: 'java',
          content: typeof content === 'string' ? content.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n') : ''
        }))
      },
      // Carpeta View
      {
        id: `${ejemplo.nombre}-view-folder`,
        name: 'view',
        type: 'folder' as const,
        expanded: true,
        children: Object.entries(ejemplo.archivos.view || {}).map(([fileName, content]: [string, any]) => ({
          id: `${ejemplo.nombre}-view-${fileName}`,
          name: fileName,
          type: 'file' as const,
          language: 'java',
          content: typeof content === 'string' ? content.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n') : ''
        }))
      },
      // Carpeta Controller
      {
        id: `${ejemplo.nombre}-controller-folder`,
        name: 'controller',
        type: 'folder' as const,
        expanded: true,
        children: Object.entries(ejemplo.archivos.controller || {}).map(([fileName, content]: [string, any]) => ({
          id: `${ejemplo.nombre}-controller-${fileName}`,
          name: fileName,
          type: 'file' as const,
          language: 'java',
          content: typeof content === 'string' ? content.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n') : ''
        }))
      }
    ]
  }));
};