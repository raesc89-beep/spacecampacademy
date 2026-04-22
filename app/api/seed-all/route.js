import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { COURSE_DATA } from '@/lib/courseData';

export async function POST(request) {
  try {
    let totalSeeded = 0;
    
    for (const staticModule of COURSE_DATA) {
      const moduleId = staticModule.id;
      
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
      
      totalSeeded++;
    }

    return NextResponse.json({ success: true, modulesSeeded: totalSeeded });
  } catch (err) {
    console.error('Seed all error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
