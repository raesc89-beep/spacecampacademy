const fs = require('fs');

function runAudit() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  const jsonString = content.substring(startIndex, lastIndex + 1);
  const jsData = JSON.parse(jsonString);

  let totalErrors = 0;
  let allImagesGlobal = new Set();
  let duplicatesGlobal = [];
  let unsplashImages = [];

  const report = [];

  jsData.forEach(course => {
    let courseErrors = [];
    let courseImages = new Set();
    
    const sections = course.contentEs?.sections;
    
    // 1. Regla 15x15
    if (!sections || sections.length !== 15) {
      courseErrors.push(`Falla 15 secciones: Tiene ${sections ? sections.length : 0} secciones.`);
    } else {
      sections.forEach((sec, idx) => {
        if (!sec.text || sec.text.length !== 10) {
          courseErrors.push(`Falla 10 líneas en sección ${idx+1}: Tiene ${sec.text ? sec.text.length : 0} líneas.`);
        }
        
        // Revisar imágenes
        const img = sec.image;
        if (!img) {
          courseErrors.push(`Sección ${idx+1} no tiene imagen.`);
        } else {
          // Detectar Unsplash (placeholder)
          if (img.includes('unsplash.com')) {
            unsplashImages.push(`${course.id} -> Sec ${idx+1}`);
          }
          
          // Repetición interna
          if (courseImages.has(img)) {
            courseErrors.push(`Imagen REPETIDA internamente en sección ${idx+1}: ${img}`);
          }
          courseImages.add(img);

          // Repetición global (ignorar Unsplash para esta métrica si ya sabemos que es basura, o contarla igual)
          const baseImg = img.split('?')[0]; // quitar query params para ver si es la misma base
          if (allImagesGlobal.has(baseImg)) {
            duplicatesGlobal.push(`${course.id} -> Sec ${idx+1} repite imagen global: ${baseImg}`);
          }
          allImagesGlobal.add(baseImg);
        }
      });
    }

    if (courseErrors.length > 0) {
      totalErrors += courseErrors.length;
      report.push(`\\n[FALLA] Curso: ${course.id}`);
      courseErrors.forEach(e => report.push(`  - ${e}`));
    }
  });

  console.log("=== AUDITORÍA ESTRICTA DOBLE FACTOR ===");
  console.log(`Cursos analizados: ${jsData.length}`);
  console.log(`Total de errores de formato/repetición interna detectados: ${totalErrors}`);
  
  if (unsplashImages.length > 0) {
    console.log(`\\n[ALERTA GRAVE] Imágenes Placeholder (Unsplash) detectadas: ${unsplashImages.length}`);
    // console.log(unsplashImages.join(', '));
  }
  
  if (duplicatesGlobal.length > 0) {
    console.log(`\\n[ALERTA GRAVE] Imágenes Repetidas GLOBALMENTE entre distintos cursos: ${duplicatesGlobal.length}`);
    // console.log(duplicatesGlobal.slice(0, 10).join('\\n') + (duplicatesGlobal.length > 10 ? '\\n...y más' : ''));
  }

  if (totalErrors === 0 && unsplashImages.length === 0 && duplicatesGlobal.length === 0) {
    console.log("\\n[EXITO] La auditoría de doble factor pasó al 100%. Todo es único y correcto.");
  } else {
    console.log("\\n[FRACASO] La base de datos sigue comprometida. Es necesaria una corrección masiva de imágenes.");
  }
}

runAudit();
