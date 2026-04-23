import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to lib/courseData.js
const courseDataPath = path.join(process.cwd(), 'lib', 'courseData.js');

function readCourseData() {
  const content = fs.readFileSync(courseDataPath, 'utf8');
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  return JSON.parse(jsonStr);
}

function writeCourseData(data) {
  const newContent = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync(courseDataPath, newContent, 'utf8');
}

export async function GET() {
  try {
    const data = readCourseData();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { action, payload } = await req.json();
    let data = readCourseData();

    if (action === 'update_module') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx !== -1) {
        data[idx] = { ...data[idx], ...payload };
      }
    } else if (action === 'add_module') {
      const newModule = {
        id: payload.id || `mod_${Date.now()}`,
        order: data.length + 1,
        titleEn: payload.titleEs,
        titleEs: payload.titleEs,
        badge: payload.badgeEs,
        badgeEs: payload.badgeEs,
        color: payload.color || '#00e4ff',
        contentEs: { sections: [], bibliography: [] },
        quizEs: [],
        quiz: []
      };
      data.push(newModule);
    } else if (action === 'delete_module') {
      data = data.filter(m => m.id !== payload.id);
    } else if (action === 'update_sections') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx !== -1) {
        data[idx].contentEs.sections = payload.sections;
      }
    }

    writeCourseData(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
