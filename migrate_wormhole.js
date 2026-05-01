const fs = require('fs');

async function migrateWormhole() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const jsonString = content.substring(startIndex).replace(/;\s*$/, '');
  let jsData = eval(jsonString);

  // Encontrar y clonar el agujero de gusano original
  const wormholeIdx = jsData.findIndex(c => c.id === 'wormhole');
  if (wormholeIdx === -1) {
    console.log('No se encontró el módulo wormhole.');
    return;
  }
  
  const original = jsData[wormholeIdx];
  const newCourse = JSON.parse(JSON.stringify(original));
  
  newCourse.id = 'agujeros_gusano_er';
  newCourse.titleEs = 'Agujeros de Gusano Einstein-Rosen';
  newCourse.titleEn = 'Einstein-Rosen Wormholes';
  newCourse.descriptionEs = 'Exploración teórica de los atajos espaciotemporales propuestos por Albert Einstein y Nathan Rosen.';
  newCourse.bgImage = '/assets/dashboard/agujeros_gusano_cover.png';
  
  // Añadir la sección de Carl Sagan a las sections (si existe)
  if (newCourse.contentEs && newCourse.contentEs.sections) {
    newCourse.contentEs.sections.push({
      id: "er_contacto_sagan",
      title: "La Visión de Carl Sagan y 'Contacto'",
      text: "En la famosa novela y película 'Contacto', de Carl Sagan, se popularizó el concepto del puente Einstein-Rosen como medio para el viaje interestelar. Sagan consultó directamente al físico Kip Thorne para asegurarse de que la representación científica fuera lo más rigurosa posible. En la obra, la protagonista viaja a través de un sistema de agujeros de gusano construidos por una civilización alienígena avanzada, demostrando que teóricamente, con materia exótica, un atajo podría mantenerse estable. Esto inspiró a generaciones enteras de astrofísicos a tomar en serio estas matemáticas.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Carl_Sagan_Planetary_Society.JPG",
      style: "highlight"
    });
  } else {
    // Si usaba formato viejo, adaptarlo
    if (!newCourse.contentEs) newCourse.contentEs = {};
    if (!newCourse.contentEs.sections) newCourse.contentEs.sections = [];
  }

  // Actualizar quiz para incluir a Sagan
  if (newCourse.quizEs) {
    newCourse.quizEs.push({
      q: "¿A qué famoso físico y astrónomo consultó Carl Sagan para representar fielmente el viaje por un agujero de gusano en su obra 'Contacto'?",
      options: [
        "A Stephen Hawking para debatir sobre la radiación de los agujeros negros.",
        "Al físico Kip Thorne, quien propuso la idea de usar materia exótica para estabilizar un puente Einstein-Rosen para la película.",
        "A Neil deGrasse Tyson para crear el diseño de la nave espacial."
      ],
      a: 1
    });
  }

  // Eliminar el wormhole original
  jsData.splice(wormholeIdx, 1);
  
  // Insertar el nuevo curso
  jsData.push(newCourse);

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log('Migración completada exitosamente.');
}

migrateWormhole();
