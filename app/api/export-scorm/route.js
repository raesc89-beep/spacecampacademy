import { NextResponse } from 'next/server';
import archiver from 'archiver';
import { PassThrough } from 'stream';
import { COURSE_DATA } from '@/lib/courseData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const moduleId = searchParams.get('planet') || 'mars';

  const planetData = COURSE_DATA.find(p => p.id === moduleId);
  
  if (!planetData) {
    return NextResponse.json({ error: 'Módulo no encontrado' }, { status: 404 });
  }

  // Empaquetador de Streams para conectar Archiver (Node) a Next.js (Web Response)
  const stream = new PassThrough();

  const archive = archiver('zip', {
    zlib: { level: 9 } // Compresión máxima
  });

  // Manejo de errores de empaquetado
  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(stream);

  // 1. Añadir Index.html (El reproductor simulado del curso para SCORM)
  const scormHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Cápsula: ${planetData.titleEs}</title>
      <style>
        body { font-family: Arial, sans-serif; background: #020308; color: white; padding: 2rem; }
        .card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; }
        h1 { color: #E25A3D; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🌌 Expedición: ${planetData.titleEs}</h1>
        <p><strong>Clasificación:</strong> ${planetData.badgeEs}</p>
        <p>Esta cápsula ha sido exportada desde Space Camp Academy (Módulo SCORM 1.2 Genérico).</p>
        <hr/>
        <h2>${planetData.contentEs.sections[0]?.title || 'Visión General'}</h2>
        <p>${planetData.contentEs.sections[0]?.text || 'Recuperando datos satelitales...'}</p>
      </div>
      <script>
        // API mínima simulada SCORM 1.2 para dar Status Completed de Inmediato
        var API = {
          LMSInitialize: function() { return "true"; },
          LMSFinish: function() { return "true"; },
          LMSGetValue: function() { return ""; },
          LMSSetValue: function(model, value) { return "true"; },
          LMSCommit: function() { return "true"; },
          LMSGetLastError: function() { return "0"; },
          LMSGetErrorString: function() { return "No error"; },
          LMSGetDiagnostic: function() { return "No diagnostic"; }
        };
        // Autocompletar el módulo tras 3 segundos de lectura
        setTimeout(() => {
          if (window.parent && window.parent.API) {
            window.parent.API.LMSSetValue("cmi.core.lesson_status", "completed");
            window.parent.API.LMSCommit("");
            alert("Módulo validado en la plataforma de la Universidad.");
          }
        }, 3000);
      </script>
    </body>
    </html>
  `;
  archive.append(scormHTML, { name: 'index.html' });

  // 2. Generar y anexar imsmanifest.xml (Estandar Oficial Universal SCORM 1.2)
  const imsmanifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="SpaceCamp_${planetData.id}" version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="SpaceCamp_ORG">
    <organization identifier="SpaceCamp_ORG">
      <title>Space Camp Academy - Módulo SCORM Exportado</title>
      <item identifier="ITEM_1" identifierref="RES_1">
        <title>${planetData.titleEs}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>`;

  archive.append(imsmanifest, { name: 'imsmanifest.xml' });

  // Cerrar el empaquetador para que envíe el stream
  archive.finalize();

  // Convertimos el stream Node 'PassThrough' en un 'ReadableStream' de Web API para Next.js
  const readableWebStream = new ReadableStream({
    start(controller) {
      stream.on('data', (chunk) => controller.enqueue(chunk));
      stream.on('end', () => controller.close());
      stream.on('error', (err) => controller.error(err));
    }
  });

  return new Response(readableWebStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': \`attachment; filename="SpaceCamp_Mod_\${planetData.id}.zip"\`
    }
  });
}
