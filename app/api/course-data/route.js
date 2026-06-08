import { NextResponse } from 'next/server';
import { COURSE_DATA } from '@/lib/courseData';

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
    if (typeof val === 'number') {
      if (Number.isInteger(val)) return { integerValue: String(val) };
      return { doubleValue: val };
    }
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
      return false;
    }
    return true;
  } catch (e) {
    console.error('[course-data API] Firestore write error:', e.message);
    return false;
  }
}

// ── In-memory mutable copy of the course data ──
// We keep a mutable copy in memory so edits persist across requests
// during the same server session (dev mode). The canonical source
// for production is Firestore; this is a convenience for the admin editor.
let mutableCourseData = null;

function getCourseData() {
  if (!mutableCourseData) {
    // Deep clone from the static import so mutations don't affect the module cache
    mutableCourseData = JSON.parse(JSON.stringify(COURSE_DATA));
  }
  return mutableCourseData;
}

export async function GET() {
  try {
    const data = getCourseData();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[course-data API] GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { action, payload } = await req.json();
    const data = getCourseData();

    if (action === 'update_module') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx === -1) {
        return NextResponse.json({ error: `Módulo "${payload.id}" no encontrado` }, { status: 404 });
      }
      // Merge payload into existing module (but don't overwrite contentEs/quizEs from here)
      const { id, ...updates } = payload;
      data[idx] = { ...data[idx], ...updates };
      // Sync metadata to Firestore
      const firestoreOk = await writeModuleToFirestore(payload.id, {
        titleEs: data[idx].titleEs || '',
        badgeEs: data[idx].badgeEs || '',
        color: data[idx].color || '#00e4ff',
        visible: data[idx].visible !== false,
        updatedAt: new Date().toISOString(),
      });
      if (!firestoreOk) {
        console.warn('[course-data API] Firestore sync failed for update_module, but in-memory update succeeded');
      }

    } else if (action === 'add_module') {
      // Check for duplicate ID
      const existingIdx = data.findIndex(m => m.id === payload.id);
      if (existingIdx !== -1) {
        return NextResponse.json({ error: `Ya existe un módulo con ID "${payload.id}"` }, { status: 409 });
      }
      const newModule = {
        id: payload.id || `mod_${Date.now()}`,
        order: data.length + 1,
        titleEn: payload.titleEs,
        titleEs: payload.titleEs,
        badge: payload.badgeEs,
        badgeEs: payload.badgeEs,
        color: payload.color || '#00e4ff',
        contentEs: { sections: [] },
        quizEs: [],
      };
      data.push(newModule);
      // Also write new module to Firestore
      await writeModuleToFirestore(newModule.id, {
        titleEs: newModule.titleEs,
        badgeEs: newModule.badgeEs,
        color: newModule.color,
        contentEs: newModule.contentEs,
        quizEs: newModule.quizEs,
        createdAt: new Date().toISOString(),
      });

    } else if (action === 'delete_module') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx !== -1) {
        data.splice(idx, 1);
      }

    } else if (action === 'update_sections') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx === -1) {
        return NextResponse.json({ error: `Módulo "${payload.id}" no encontrado` }, { status: 404 });
      }
      // Ensure contentEs exists
      if (!data[idx].contentEs) {
        data[idx].contentEs = {};
      }
      data[idx].contentEs.sections = payload.sections;
      // Write sections to Firestore so course page sees changes
      const firestoreOk = await writeModuleToFirestore(payload.id, {
        contentEs: data[idx].contentEs,
        updatedAt: new Date().toISOString(),
      });
      if (!firestoreOk) {
        console.warn('[course-data API] Firestore sync failed for update_sections');
      }

    } else if (action === 'update_quiz') {
      const idx = data.findIndex(m => m.id === payload.id);
      if (idx === -1) {
        return NextResponse.json({ error: `Módulo "${payload.id}" no encontrado` }, { status: 404 });
      }
      data[idx].quizEs = payload.quizEs;
      // Sync quiz to Firestore
      const firestoreOk = await writeModuleToFirestore(payload.id, {
        quizEs: payload.quizEs,
        updatedAt: new Date().toISOString(),
      });
      if (!firestoreOk) {
        console.warn('[course-data API] Firestore sync failed for update_quiz');
      }

    } else {
      return NextResponse.json({ error: `Acción desconocida: "${action}"` }, { status: 400 });
    }

    // Update the in-memory reference
    mutableCourseData = data;

    return NextResponse.json({ success: true, moduleCount: data.length });
  } catch (err) {
    console.error('[course-data API] POST error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
