import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { COURSE_DATA } from '@/lib/courseData';

export async function POST(request) {
  try {
    const { moduleId } = await request.json();
    if (!moduleId) return NextResponse.json({ error: 'moduleId required' }, { status: 400 });

    const staticModule = COURSE_DATA.find(m => m.id === moduleId);
    if (!staticModule) return NextResponse.json({ error: 'Module not found in courseData' }, { status: 404 });

    const sections = (staticModule.contentEs?.sections || []).map((s, i) => ({
      id: `sec_${i}`,
      order: i,
      title: s.title || '',
      text: s.text || '',
      image: s.image || '',
      imgCaption: s.imgCaption || '',
      video: s.video || '',
    }));

    await setDoc(doc(db, 'course_modules', moduleId), {
      moduleId,
      titleEs: staticModule.titleEs || '',
      color: staticModule.color || '#00e4ff',
      sections,
      updatedAt: serverTimestamp(),
      seededFrom: 'courseData.js',
    });

    return NextResponse.json({ success: true, sectionsCount: sections.length });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
