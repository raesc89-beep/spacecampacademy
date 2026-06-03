import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to lib/courseData.js
const courseDataPath = path.join(process.cwd(), 'lib', 'courseData.js');

// ── Local file helpers (work in dev, fail gracefully on Vercel) ──
function readCourseData() {
  const content = fs.readFileSync(courseDataPath, 'utf8');
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  return JSON.parse(jsonStr);
}

function tryWriteCourseData(data) {
  try {
    const newContent =
      '// Archivo maestro estático del curso\nexport const COURSE_DATA = ' +
      JSON.stringify(data, null, 2) +
      ';\n';
    fs.writeFileSync(courseDataPath, newContent, 'utf8');
  } catch (_) {
    // Vercel read-only filesystem — silently skip local write
  }
}

// ── Firestore write via REST (no Admin SDK needed) ──
// Uses the Firebase Web REST API with the project's public API key.
// This writes the module doc to course_modules/{moduleId} so the course page
// sees the update immediately (it reads Firestore first, then falls back to static).
async function writeModuleToFirestore(moduleId, fields) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'space-camp-academy';
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAE-Oquu9GuIAoX7nA-lJoLK0CRan_RcsE';

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/course_modules/${moduleId}?key=${apiKey}`;

  // Convert JS object to Firestore REST document format
  function toFirestoreValue(val) {
    if (val === null || val === undefined) return { nullValue: null };
    if (typeof val === 'boolean') return { booleanValue: val };
    if (typeof val === 'number') return { integerValue: String(val) };
    if (typeof val === 'string') return { stringValue: val };
    if (Array.isArray(val)) {
      return { arrayValue: { values: val.map(toFirestoreValue) } };
    }
    if (typeof val === 'object') {
      const fields = {};
      for (const [k, v] of Object.entries(val)) {
        fields[k] = toFirestoreValue(v);
      }
      return { mapValue: { fields } };
    }
    return { stringValue: String(val) };
  }

  const firestoreFields = {};
  for (const [k, v] of Object.entries(fields)) {
    firestoreFields[k] = toFirestoreValue(v);
  }

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: firestoreFields }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('[course-data API] Firestore write failed:', res.status, errText);
    }
  } catch (e) {
    console.error('[course-data API] Firestore write error:', e.message);
  }
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
        // Sync metadata to Firestore
        await writeModuleToFirestore(payload.id, {
          titleEs: data[idx].titleEs || '',
          badgeEs: data[idx].badgeEs || '',
          color: data[idx].color || '#00e4ff',
        });
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
        quiz: [],
      };
      data.push(newModule);
    } else if (action === 'delete_module') {
      data = data.filter(m => m.id !== payload.id);
    } else if (action === 'update_sections') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx !== -1) {
        data[idx].contentEs.sections = payload.sections;
        // ── KEY FIX: write sections to Firestore so course page sees changes ──
        await writeModuleToFirestore(payload.id, {
          sections: payload.sections,
          updatedAt: new Date().toISOString(),
        });
      }
    } else if (action === 'update_quiz') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx !== -1) {
        data[idx].quizEs = payload.quizEs;
        // Also sync quiz to Firestore
        await writeModuleToFirestore(payload.id, {
          quizEs: payload.quizEs,
          updatedAt: new Date().toISOString(),
        });
      }
    }

    // Always try to write local file (works in dev)
    tryWriteCourseData(data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[course-data API] POST error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
