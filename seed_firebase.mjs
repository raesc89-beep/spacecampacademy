import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { COURSE_DATA } from './lib/courseData.js';

const firebaseConfig = {
  apiKey: "AIzaSyAE-Oquu9GuIAoX7nA-lJoLK0CRan_RcsE",
  authDomain: "space-camp-academy.firebaseapp.com",
  projectId: "space-camp-academy",
  storageBucket: "space-camp-academy.firebasestorage.app",
  messagingSenderId: "972324043693",
  appId: "1:972324043693:web:c325c93822c1433a473f24",
  measurementId: "G-ZPWMLBYG44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const moduleId = 'objetos_interestelares';
  const staticModule = COURSE_DATA.find(m => m.id === moduleId);
  
  if (!staticModule) {
    console.error('Module not found in courseData.js');
    process.exit(1);
  }

  const sections = (staticModule.contentEs?.sections || []).map((s, i) => ({
    id: s.id || `sec_${i}`,
    order: i,
    title: s.title || '',
    text: s.text || '',
    image: s.image || '',
    imgCaption: s.imgCaption || '',
    video: s.video || '',
  }));

  try {
    await setDoc(doc(db, 'course_modules', moduleId), {
      moduleId,
      titleEs: staticModule.titleEs || '',
      color: staticModule.color || '#00e4ff',
      sections,
      updatedAt: serverTimestamp(),
      seededFrom: 'courseData.js via CLI',
    });
    console.log('Firebase seeded successfully! Sections:', sections.length);
    process.exit(0);
  } catch(e) {
    console.error('Error seeding firebase:', e);
    process.exit(1);
  }
}

seed();
