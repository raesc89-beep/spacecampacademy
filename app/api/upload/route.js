import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Limpiar el nombre de archivo de espacios y caracteres raros
    const filename = Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    
    // Guardar en la carpeta public/assets/uploads/
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'uploads');
    
    // Crear el directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({ success: true, url: `/assets/uploads/${filename}` });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
