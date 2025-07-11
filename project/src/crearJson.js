// crearJson.mjs (puedes renombrarlo así también si quieres)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de patterns
const patternsDir = path.join('C:', 'Users', 'PC', 'Downloads', 'Geraldin', 'patterns');

const patrones = {};

function leerArchivosPorTipo(ejemploPath) {
  const tipos = ['model', 'view', 'controller'];
  const resultado = {};

  for (const tipo of tipos) {
    const tipoPath = path.join(ejemploPath, tipo);
    if (fs.existsSync(tipoPath)) {
      resultado[tipo] = {};
      for (const archivo of fs.readdirSync(tipoPath)) {
        const rutaArchivo = path.join(tipoPath, archivo);
        if (fs.lstatSync(rutaArchivo).isFile()) {
          const contenido = fs.readFileSync(rutaArchivo, 'utf8');
          resultado[tipo][archivo] = contenido;
        }
      }
    }
  }

  return resultado;
}

for (const patron of fs.readdirSync(patternsDir)) {
  const patronPath = path.join(patternsDir, patron);
  if (fs.lstatSync(patronPath).isDirectory()) {
    const ejemplos = [];

    for (const ejemplo of fs.readdirSync(patronPath)) {
      const ejemploPath = path.join(patronPath, ejemplo);
      if (fs.lstatSync(ejemploPath).isDirectory()) {
        ejemplos.push({
          nombre: ejemplo,
          archivos: leerArchivosPorTipo(ejemploPath),
        });
      }
    }

    patrones[patron] = {
      descripcion: "",
      ejemplos,
    };
  }
}

const outputDir = path.join('C:', 'Users', 'PC', 'Downloads', 'Geraldin', 'patterns');
fs.writeFileSync(path.join(outputDir, 'patrones.ts'), `export const patrones = ${JSON.stringify(patrones, null, 2)};`);
fs.writeFileSync(path.join(outputDir, 'patrones.json'), JSON.stringify(patrones, null, 2));

console.log('✅ Archivos generados correctamente');
