'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookOpen, AlertCircle, ArrowRight, CheckCircle, X, Maximize2, ChevronLeft, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SatisfactionScale from '@/components/SatisfactionScale';
import ApophisCountdown from '@/components/ApophisCountdown';


const InteractiveInfographic_EgyptM11 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM11'));
const InteractiveInfographic_EgyptM9 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM9'));
const InteractiveInfographic_EgyptM10 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM10'));
const InteractiveInfographic_EgyptM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM1'));
const InteractiveInfographic_EgyptM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM6'));
const InteractiveInfographic_EgyptM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM5'));
const InteractiveInfographic_EgyptM8 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM8'));
const InteractiveInfographic_EgyptM14 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM14'));
const InteractiveInfographic_EgyptM12 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM12'));
const InteractiveInfographic_EgyptM13 = lazy(() => import('@/components/infographics/InteractiveInfographic_EgyptM13'));
const InteractiveInfographic_BttfM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_BttfM3'));
const InteractiveInfographic_BttfM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_BttfM5'));
const InteractiveInfographic_BttfM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_BttfM2'));
const InteractiveInfographic_BttfM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_BttfM6'));
const InteractiveInfographic_BttfM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_BttfM1'));
const InteractiveInfographic_BttfM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_BttfM4'));
const InteractiveInfographic_BttfM7 = lazy(() => import('@/components/infographics/InteractiveInfographic_BttfM7'));
const InteractiveInfographic_SwSec2 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec2'));
const InteractiveInfographic_SwSec1 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec1'));
const InteractiveInfographic_SwSec7 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec7'));
const InteractiveInfographic_SwSec8 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec8'));
const InteractiveInfographic_SwSec3 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec3'));
const InteractiveInfographic_SwSec4 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec4'));
const InteractiveInfographic_SwSec5 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec5'));
const InteractiveInfographic_SwSec6 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec6'));
const InteractiveInfographic_SwSec9 = lazy(() => import('@/components/infographics/InteractiveInfographic_SwSec9'));
const InteractiveInfographic_InterstellarM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterstellarM1'));
const InteractiveInfographic_InterstellarM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterstellarM2'));
const InteractiveInfographic_InterstellarM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterstellarM3'));
const InteractiveInfographic_InterstellarM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterstellarM4'));
const InteractiveInfographic_InterstellarM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterstellarM5'));
const InteractiveInfographic_InterestelarM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterestelarM1'));
const InteractiveInfographic_InterestelarM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterestelarM2'));
const InteractiveInfographic_InterestelarM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterestelarM3'));
const InteractiveInfographic_InterestelarM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterestelarM4'));
const InteractiveInfographic_InterestelarM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterestelarM5'));
const InteractiveInfographic_InterestelarM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_InterestelarM6'));
const InteractiveInfographic_MayaM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM1'));
const InteractiveInfographic_MayaM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM2'));
const InteractiveInfographic_MayaM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM3'));
const InteractiveInfographic_MayaM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM4'));
const InteractiveInfographic_MayaM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM5'));
const InteractiveInfographic_MayaM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM6'));
const InteractiveInfographic_MayaM7 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM7'));
const InteractiveInfographic_MayaM8 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM8'));
const InteractiveInfographic_MayaM9 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM9'));
const InteractiveInfographic_MayaM10 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM10'));
const InteractiveInfographic_MayaM11 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM11'));
const InteractiveInfographic_MayaM12 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM12'));
const InteractiveInfographic_MayaM13 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM13'));
const InteractiveInfographic_MayaM14 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM14'));
const InteractiveInfographic_MayaM15 = lazy(() => import('@/components/infographics/InteractiveInfographic_MayaM15'));

// --- ANIMALES DEL ESPACIO ---
const InteractiveInfographic_AnimalesM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_AnimalesM1'));
const InteractiveInfographic_AnimalesM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_AnimalesM2'));
const InteractiveInfographic_AnimalesM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_AnimalesM3'));
const InteractiveInfographic_AnimalesM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_AnimalesM4'));

// --- PIONEROS DEL COSMOS ---
const InteractiveInfographic_PionerosM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_PionerosM1'));
const InteractiveInfographic_PionerosM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_PionerosM2'));
const InteractiveInfographic_PionerosM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_PionerosM3'));
const InteractiveInfographic_PionerosM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_PionerosM4'));
const InteractiveInfographic_PionerosM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_PionerosM5'));
const InteractiveInfographic_PionerosM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_PionerosM6'));
const InteractiveInfographic_PionerosM7 = lazy(() => import('@/components/infographics/InteractiveInfographic_PionerosM7'));

// --- PLANETAS GASEOSOS ---
const InteractiveInfographic_GaseososM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_GaseososM1'));

// --- PLANETAS ROCOSOS ---
const InteractiveInfographic_RocososM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_RocososM1'));
const InteractiveInfographic_RocososM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_RocososM2'));
const InteractiveInfographic_RocososM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_RocososM3'));
const InteractiveInfographic_RocososM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_RocososM4'));
const InteractiveInfographic_RocososM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_RocososM5'));
const InteractiveInfographic_RocososM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_RocososM6'));

// --- LOS EXOPLANETAS ---
const InteractiveInfographic_ExoplanetasM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_ExoplanetasM1'));
const InteractiveInfographic_ExoplanetasM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_ExoplanetasM2'));
const InteractiveInfographic_ExoplanetasM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_ExoplanetasM3'));
const InteractiveInfographic_ExoplanetasM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_ExoplanetasM4'));

// --- ASTEROIDES Y COMETAS ---
const InteractiveInfographic_AsteroidesM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_AsteroidesM1'));
const InteractiveInfographic_AsteroidesM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_AsteroidesM2'));
const InteractiveInfographic_AsteroidesM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_AsteroidesM3'));
const InteractiveInfographic_AsteroidesM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_AsteroidesM4'));
const InteractiveInfographic_AsteroidesM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_AsteroidesM5'));





// --- DINOSAURIOS ---
const InteractiveInfographic_DinosM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM1'));
const InteractiveInfographic_DinosM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM2'));
const InteractiveInfographic_DinosM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM3'));
const InteractiveInfographic_DinosM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM4'));
const InteractiveInfographic_DinosM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM5'));
const InteractiveInfographic_DinosM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM6'));
const InteractiveInfographic_DinosM7 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM7'));
const InteractiveInfographic_DinosM8 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM8'));
const InteractiveInfographic_DinosM9 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM9'));
const InteractiveInfographic_DinosM10 = lazy(() => import('@/components/infographics/InteractiveInfographic_DinosM10'));

// --- REPTILES MARINOS ---
const InteractiveInfographic_MarinosM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM1'));
const InteractiveInfographic_MarinosM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM2'));
const InteractiveInfographic_MarinosM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM3'));
const InteractiveInfographic_MarinosM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM4'));
const InteractiveInfographic_MarinosM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM5'));
const InteractiveInfographic_MarinosM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM6'));
const InteractiveInfographic_MarinosM7 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM7'));
const InteractiveInfographic_MarinosM8 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM8'));
const InteractiveInfographic_MarinosM9 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM9'));
const InteractiveInfographic_MarinosM10 = lazy(() => import('@/components/infographics/InteractiveInfographic_MarinosM10'));

// --- NIKOLA TESLA ---
const InteractiveInfographic_TeslaM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM1'));
const InteractiveInfographic_TeslaM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM2'));
const InteractiveInfographic_TeslaM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM3'));
const InteractiveInfographic_TeslaM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM4'));
const InteractiveInfographic_TeslaM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM5'));
const InteractiveInfographic_TeslaM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM6'));
const InteractiveInfographic_TeslaM7 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM7'));
const InteractiveInfographic_TeslaM8 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM8'));
const InteractiveInfographic_TeslaM9 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM9'));
const InteractiveInfographic_TeslaM10 = lazy(() => import('@/components/infographics/InteractiveInfographic_TeslaM10'));

// --- ALBERT EINSTEIN ---
const InteractiveInfographic_EinsteinM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_EinsteinM1'));
const InteractiveInfographic_EinsteinM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_EinsteinM2'));
const InteractiveInfographic_EinsteinM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_EinsteinM3'));
const InteractiveInfographic_EinsteinM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_EinsteinM4'));
const InteractiveInfographic_EinsteinM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_EinsteinM5'));
const InteractiveInfographic_EinsteinM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_EinsteinM6'));

// --- CARL SAGAN ---
const InteractiveInfographic_SaganM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_SaganM1'));
const InteractiveInfographic_SaganM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_SaganM2'));
const InteractiveInfographic_SaganM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_SaganM3'));
const InteractiveInfographic_SaganM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_SaganM4'));
const InteractiveInfographic_SaganM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_SaganM5'));
const InteractiveInfographic_SaganM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_SaganM6'));

// --- MARIE CURIE ---
const InteractiveInfographic_CurieM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_CurieM1'));
const InteractiveInfographic_CurieM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_CurieM2'));
const InteractiveInfographic_CurieM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_CurieM3'));
const InteractiveInfographic_CurieM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_CurieM4'));
const InteractiveInfographic_CurieM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_CurieM5'));
const InteractiveInfographic_CurieM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_CurieM6'));

// --- CECILIA PAYNE ---
const InteractiveInfographic_CeciliaM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_CeciliaM1'));
const InteractiveInfographic_CeciliaM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_CeciliaM2'));
const InteractiveInfographic_CeciliaM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_CeciliaM3'));
const InteractiveInfographic_CeciliaM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_CeciliaM4'));

// --- GRIEGOS EN LA CIENCIA ---
const InteractiveInfographic_GriegosM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_GriegosM1'));
const InteractiveInfographic_GriegosM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_GriegosM2'));
const InteractiveInfographic_GriegosM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_GriegosM3'));
const InteractiveInfographic_GriegosM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_GriegosM4'));
const InteractiveInfographic_GriegosM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_GriegosM5'));
const InteractiveInfographic_GriegosM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_GriegosM6'));

// --- ENTRENAMIENTO ASTRONAUTA ---
const InteractiveInfographic_AstroTrainM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_AstroTrainM1'));
const InteractiveInfographic_AstroTrainM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_AstroTrainM2'));
const InteractiveInfographic_AstroTrainM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_AstroTrainM3'));
const InteractiveInfographic_AstroTrainM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_AstroTrainM4'));
const InteractiveInfographic_AstroTrainM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_AstroTrainM5'));
const InteractiveInfographic_AstroTrainM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_AstroTrainM6'));

// --- ARRIVAL ---
const InteractiveInfographic_ArrivalM1 = lazy(() => import('@/components/infographics/InteractiveInfographic_ArrivalM1'));
const InteractiveInfographic_ArrivalM2 = lazy(() => import('@/components/infographics/InteractiveInfographic_ArrivalM2'));
const InteractiveInfographic_ArrivalM3 = lazy(() => import('@/components/infographics/InteractiveInfographic_ArrivalM3'));
const InteractiveInfographic_ArrivalM4 = lazy(() => import('@/components/infographics/InteractiveInfographic_ArrivalM4'));
const InteractiveInfographic_ArrivalM5 = lazy(() => import('@/components/infographics/InteractiveInfographic_ArrivalM5'));
const InteractiveInfographic_ArrivalM6 = lazy(() => import('@/components/infographics/InteractiveInfographic_ArrivalM6'));

import { useCourseData } from '@/hooks/useCourseData';


export default function CourseModule() {
  const { user, userData, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { data: staticData, loading: catalogLoading } = useCourseData(params.moduleId);
  
  const [moduleData, setModuleData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [expandedImg, setExpandedImg] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    if (catalogLoading || !params.moduleId) return;

    async function fetchModule() {
      try {
        // --- ALGORITMO IRROMPIBLE DE REGLA 15x15 ---
        // Este algoritmo garantiza que NUNCA se renderice un curso con menos de 15 secciones
        // o con menos de 10 líneas por sección, sin importar cómo se haya guardado en la DB,
        // a no ser que el administrador agregue *más* secciones por su voluntad.
        const enforce15x15Rule = (mod) => {
          if (!mod || !mod.contentEs || !mod.contentEs.sections) return mod;
          if (!mod.id.startsWith('robots_')) return mod; // SOLO APLICA A LOS ROVERS, no corromper otros cursos
          
          let sections = [...mod.contentEs.sections];
          const fallbacks = [
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
          ];
          const genericLines = [
            "La NASA y otras agencias continúan su gran investigación.",
            "Estos datos son vitales para la exploración astronómica.",
            "Observar el cosmos expande infinitamente la mente humana.",
            "Nuestros científicos analizan cada lectura minuciosamente."
          ];

          // 1. Si el admin puso menos de 15, rellenar hasta 15
          while (sections.length < 15) {
            sections.push({
              id: `${mod.id}_pad_${sections.length}`,
              title: `Exploración Adicional - Parte ${sections.length + 1}`,
              text: [],
              image: fallbacks[sections.length % fallbacks.length],
              style: "normal"
            });
          }

          // Parser de Google Drive automático
          const parseDriveUrl = (url, type) => {
            if (!url || !url.includes('drive.google.com')) return url;
            const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
              if (type === 'image') return `https://drive.google.com/uc?export=view&id=${match[1]}`;
              if (type === 'video') return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
            return url;
          };

          // 2. Garantizar que cada sección tenga al menos 10 líneas
          sections = sections.map((sec, i) => {
            let txtArray = [];
            if (Array.isArray(sec.text)) {
              txtArray = [...sec.text];
            } else if (typeof sec.text === 'string') {
              txtArray = sec.text.replace(/\\n/g, ' ').split(/(?<=\.)\s+/).filter(t => t.trim().length > 0);
            }
            
            let padIdx = 0;
            while (txtArray.length < 10) {
              txtArray.push(genericLines[(i + padIdx) % genericLines.length]);
              padIdx++;
            }

            return { 
              ...sec, 
              text: txtArray,
              image: parseDriveUrl(sec.image, 'image'),
              video: parseDriveUrl(sec.video, 'video')
            };
          });

          mod.contentEs.sections = sections;
          return mod;
        };

        // ══════════════════════════════════════════════════════════════════
        // FORCE-STATIC CHECK — MUST RUN BEFORE ANY FIRESTORE CALL
        // This ensures modules with static data NEVER touch Firestore,
        // preventing crashes from corrupted/missing Firestore documents.
        // ══════════════════════════════════════════════════════════════════
        const isForceStatic = (
          params.moduleId === 'objetos_interestelares' ||
          params.moduleId === 'arqueoastronomia_maya' ||
          params.moduleId === 'ciencia_star_wars' ||
          params.moduleId === 'ciencia_volver_al_futuro' ||
          params.moduleId.startsWith('egypt_') ||
          params.moduleId.startsWith('robots_') ||
          params.moduleId.startsWith('galileo_') ||
          params.moduleId.startsWith('faraday_') ||
          params.moduleId.startsWith('davinci_') ||
          params.moduleId.startsWith('cecilia_') ||
          params.moduleId.startsWith('sagan_') ||
          params.moduleId.startsWith('curie_') ||
          params.moduleId.startsWith('astro_train_') ||
          params.moduleId.startsWith('einstein_') ||
          params.moduleId.startsWith('griegos_') ||
          params.moduleId.startsWith('arrival_') ||
                    params.moduleId.startsWith('dinos_') ||
          params.moduleId.startsWith('marinos_') ||
          params.moduleId.startsWith('tesla_') ||
          params.moduleId.startsWith('bttf_')
        );

        if (isForceStatic && staticData) {
          setModuleData(enforce15x15Rule(JSON.parse(JSON.stringify(staticData))));
          setDataLoading(false);
          return;
        }

        // 1. Try Firestore (CMS-edited version) — only for non-force-static modules
        const firestoreDoc = await getDoc(doc(db, 'course_modules', params.moduleId));
        if (firestoreDoc.exists()) {
          // Found a CMS-edited version — merge with static data for quiz/color/etc
          const firestoreData = firestoreDoc.data();
          if (staticData) {
            // Admin API writes sections to top-level 'sections' field in Firestore
            // Legacy format had them nested under contentEs.sections
            const firestoreSections = firestoreData.sections || firestoreData.contentEs?.sections || null;
            const firestoreQuiz = firestoreData.quizEs || null;
            let mergedMod = {
              ...staticData,
              // Override color/title if admin changed them
              ...(firestoreData.titleEs ? { titleEs: firestoreData.titleEs } : {}),
              ...(firestoreData.badgeEs ? { badgeEs: firestoreData.badgeEs } : {}),
              ...(firestoreData.color ? { color: firestoreData.color } : {}),
              contentEs: {
                ...staticData.contentEs,
                sections: firestoreSections || staticData.contentEs?.sections || [],
              },
              // Use Firestore quiz if available
              quizEs: firestoreQuiz || staticData.quizEs || [],
            };
            setModuleData(enforce15x15Rule(mergedMod));
          } else {
            router.push('/dashboard');
          }
        } else {
          // 2. Fallback: use static data from API
          if (staticData) setModuleData(enforce15x15Rule(JSON.parse(JSON.stringify(staticData))));
          else router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error loading module:', err);
        // On any error, fallback to static data
        if (staticData) setModuleData(staticData);
        else router.push('/dashboard');
      }
      setDataLoading(false);
    }
    fetchModule();
  }, [params.moduleId, staticData, catalogLoading]);

  if (loading || dataLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Viajando al planeta...</div>;
  }

  if (!moduleData) return null;

  // ── Smart hub back-navigation based on module ID prefix ──
  const HUB_MAP = {
    egypt: { path: '/hub/egypt-astro', name: 'Arqueoastronomía Egipcia' },
    animales: { path: '/hub/animales', name: 'Animales del Espacio' },
    apollo8: { path: '/hub/apollo8', name: 'Apollo 8' },
    apollo10: { path: '/hub/apollo10', name: 'Apollo 10' },
    apollo11: { path: '/hub/apollo11', name: 'Apollo 11' },
    area51: { path: '/hub/area51', name: 'Área 51' },
    asteroides: { path: '/hub/asteroides-cometas', name: 'Asteroides y Cometas' },
    bttf: { path: '/hub/bttf', name: 'Volver al Futuro' },
    copernico: { path: '/hub/copernico', name: 'Copérnico' },
    davinci: { path: '/hub/davinci', name: 'Da Vinci' },
    exoplanetas: { path: '/hub/exoplanetas', name: 'Exoplanetas' },
    faraday: { path: '/hub/faraday', name: 'Faraday' },
    galileo: { path: '/hub/galileo', name: 'Galileo' },
    interestelar: { path: '/hub/objetos-interestelares', name: 'Objetos Interestelares' },
    interstellar: { path: '/hub/interstellar', name: 'Interstellar' },
    maya: { path: '/hub/maya-astro', name: 'Arqueoastronomía Maya' },
    arqueoastronomia_maya: { path: '/hub/maya-astro', name: 'Arqueoastronomía Maya' },
    objetos_interestelares: { path: '/hub/objetos-interestelares', name: 'Objetos Interestelares' },
    pioneros: { path: '/hub/pioneros', name: 'Pioneros del Espacio' },
    rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
    viaje_planetas_rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
    robots: { path: '/hub/robots-espacio', name: 'Robots en el Espacio' },
    starwars: { path: '/hub/star-wars', name: 'Ciencia de Star Wars' },
    agujeros: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
    wormhole: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
    stellar: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    black_hole: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    pulsar: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    quasar: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    white_dwarf: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    red_dwarf: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    earth: { path: '/hub/solar-system', name: 'Sistema Solar' },
    mars: { path: '/hub/solar-system', name: 'Sistema Solar' },
    jupiter: { path: '/hub/solar-system', name: 'Sistema Solar' },
    saturn: { path: '/hub/solar-system', name: 'Sistema Solar' },
    venus: { path: '/hub/solar-system', name: 'Sistema Solar' },
    mercury: { path: '/hub/solar-system', name: 'Sistema Solar' },
    neptune: { path: '/hub/solar-system', name: 'Sistema Solar' },
    uranus: { path: '/hub/solar-system', name: 'Sistema Solar' },
    pluto: { path: '/hub/solar-system', name: 'Sistema Solar' },
    sun: { path: '/hub/solar-system', name: 'Sistema Solar' },
    cecilia: { path: '/hub/cecilia-payne', name: 'Cecilia Payne-Gaposchkin' },
    marinos: { path: '/hub/reptiles-marinos', name: 'Reptiles Marinos' },
    dinos: { path: '/hub/dinosaurios', name: 'Los Dinosaurios' },
    tesla: { path: '/hub/tesla', name: 'Nikola Tesla' },
    sagan: { path: '/hub/carl-sagan', name: 'Carl Sagan' },
    curie: { path: '/hub/marie-curie', name: 'Marie Curie' },
    astro_train: { path: '/hub/astronauts-training', name: 'Entrenamiento Astronauta' },
    einstein: { path: '/hub/albert-einstein', name: 'Albert Einstein' },
    griegos: { path: '/hub/griegos-ciencia', name: 'Los Griegos en la Ciencia' },
    arrival: { path: '/hub/arrival-ciencia', name: 'La Ciencia de Arrival' },
  };

  function getHubInfo(moduleId) {
    // Try exact match first
    if (HUB_MAP[moduleId]) return HUB_MAP[moduleId];
    // Try prefix matching (longest prefix first)
    const keys = Object.keys(HUB_MAP).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      if (moduleId.startsWith(key + '_') || moduleId.startsWith(key)) {
        return HUB_MAP[key];
      }
    }
    return null;
  }

  const hubInfo = getHubInfo(moduleData.id);

  const isCompleted = userData?.progress?.completedModules?.includes(moduleData.id);
  
  const isAnomaly = moduleData.id.startsWith('stellar-') || ['black_hole','pulsar','quasar','white_dwarf','red_dwarf'].includes(moduleData.id);
  const isAnimal = moduleData.id.startsWith('animales_');
  const isAsteroide = moduleData.id.startsWith('asteroides_');
  const isPionero = moduleData.id.startsWith('pioneros_');
  const isRobot = moduleData.id.startsWith('robots_');
  const isEgypt = moduleData.id.startsWith('egypt_');
  const isEinsteinRosen = moduleData.id === 'agujeros_gusano_er';
  const isPluto = moduleData.id === 'pluto';
  const isSun = moduleData.id === 'sun';
  const isBttf = moduleData.id.startsWith('bttf_');
  
  const getSidebarImage = () => {
    if (isEgypt) return moduleData.contentEs?.sections?.[0]?.image?.replace('/assets/', '') || 'egypt_placeholder.png';
    if (isBttf) return `bttf/${moduleData.id}.png`;
    if (isRobot) return `rovers/ai_${moduleData.id.replace('robots_', '')}.png`;
    if (isPionero) return `pioneros/hub_${moduleData.id.replace('pioneros_', '')}.png`;
    if (isAnimal) return `animales/hub_${moduleData.id.replace('animales_', '')}.png`;
    if (isAsteroide) return `asteroides/hub_${moduleData.id.replace('asteroides_', '')}.png`;
    if (isAnomaly) return `${moduleData.id}_icon.png`;
    if (isSun) return 'cartoon_sun.png';
    if (isPluto) return 'planet_pluto.png';
    const fb = moduleData.badgeIcon || moduleData.icon || moduleData.contentEs?.sections?.[0]?.image;
    if (fb) return fb.replace(/^\/assets\//, '');
    return `cartoon_${moduleData.titleEn?.toLowerCase().replace(/\s+/g, '_')}.png`;
  };
  const planetImageName = getSidebarImage();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* ── Breadcrumb Navigation Bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 90,
        background: 'rgba(7, 11, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0.65rem 2rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        fontSize: '0.82rem',
      }}>
        <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.2s' }}>
          <Home size={13} /> Estación Orbital
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
        {hubInfo ? (
          <>
            <Link href={hubInfo.path} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}>
              ← {hubInfo.name}
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
          </>
        ) : (
          <>
            <Link href="/dashboard/misiones" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Base de Misiones
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
          </>
        )}
        <span style={{ color: moduleData.color, fontWeight: 600 }}>{moduleData.titleEs}</span>
      </div>
      {/* Dynamic Rotating Planet Background */}
      <div style={{ position: 'fixed', top: '-20%', right: '-20%', width: '150vw', height: '150vw', zIndex: -1, pointerEvents: 'none', filter: 'blur(3px)' }}>
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 300, ease: "linear" }}
          style={{ width: '100%', height: '100%', background: `url(/assets/${planetImageName}) center center / contain no-repeat`, opacity: 0.15 }}
        />
      </div>

      <AnimatePresence>
        {expandedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImg(null)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'pointer' }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1200px', maxHeight: '90vh' }}
            >
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={expandedImg} alt="Expanded view" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
               <button onClick={(e) => { e.stopPropagation(); setExpandedImg(null); }} style={{ position: 'absolute', top: '-2rem', right: '-2rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem' }}>
                 <X size={32} />
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '3rem', alignItems: 'start' }}>
        
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h1 style={{ color: moduleData.color, display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {moduleData.badgeImage && <img src={moduleData.badgeImage} width={45} height={45} alt="Insignia de Misión" style={{ borderRadius: '50%', boxShadow: `0 0 10px ${moduleData.color}` }} />}
              {moduleData.titleEs} 
              {isCompleted && <CheckCircle color="var(--success)" size={32} />}
            </h1>
          </div>

          {/* ── INTERACTIVE INFOGRAPHICS: egypt modules ── */}
          {moduleData.id === 'egypt_m11' && (
            <InteractiveInfographic_EgyptM11 />
          )}
          {moduleData.id === 'egypt_m9' && (
            <InteractiveInfographic_EgyptM9 />
          )}
          {moduleData.id === 'egypt_m10' && (
            <InteractiveInfographic_EgyptM10 />
          )}
          {moduleData.id === 'egypt_m1' && (
            <InteractiveInfographic_EgyptM1 />
          )}
          {moduleData.id === 'egypt_m6' && (
            <InteractiveInfographic_EgyptM6 />
          )}
          {moduleData.id === 'egypt_m5' && (
            <InteractiveInfographic_EgyptM5 />
          )}
          {moduleData.id === 'egypt_m8' && (
            <InteractiveInfographic_EgyptM8 />
          )}
          {moduleData.id === 'egypt_m14' && (
            <InteractiveInfographic_EgyptM14 />
          )}
          {moduleData.id === 'egypt_m12' && (
            <InteractiveInfographic_EgyptM12 />
          )}
          {moduleData.id === 'egypt_m13' && (
            <InteractiveInfographic_EgyptM13 />
          )}
          {moduleData.id === 'bttf_m3' && (
            <InteractiveInfographic_BttfM3 />
          )}
          {moduleData.id === 'bttf_m5' && (
            <InteractiveInfographic_BttfM5 />
          )}
          {moduleData.id === 'bttf_m2' && (
            <InteractiveInfographic_BttfM2 />
          )}
          {moduleData.id === 'bttf_m6' && (
            <InteractiveInfographic_BttfM6 />
          )}
          {moduleData.id === 'bttf_m1' && (
            <InteractiveInfographic_BttfM1 />
          )}
          {moduleData.id === 'bttf_m4' && (
            <InteractiveInfographic_BttfM4 />
          )}
          {moduleData.id === 'bttf_m7' && (
            <InteractiveInfographic_BttfM7 />
          )}
          {moduleData.id === 'starwars_sec_2' && (
            <InteractiveInfographic_SwSec2 />
          )}
          {moduleData.id === 'starwars_sec_1' && (
            <InteractiveInfographic_SwSec1 />
          )}
          {moduleData.id === 'starwars_sec_7' && (
            <InteractiveInfographic_SwSec7 />
          )}
          {moduleData.id === 'starwars_sec_8' && (
            <InteractiveInfographic_SwSec8 />
          )}
          {moduleData.id === 'starwars_sec_3' && (
            <InteractiveInfographic_SwSec3 />
          )}
          {moduleData.id === 'starwars_sec_4' && (
            <InteractiveInfographic_SwSec4 />
          )}
          {moduleData.id === 'starwars_sec_5' && (
            <InteractiveInfographic_SwSec5 />
          )}
          {moduleData.id === 'starwars_sec_6' && (
            <InteractiveInfographic_SwSec6 />
          )}
          {moduleData.id === 'starwars_sec_9' && (
            <InteractiveInfographic_SwSec9 />
          )}
          {moduleData.id === 'interstellar_m1' && (
            <InteractiveInfographic_InterstellarM1 />
          )}
          {moduleData.id === 'interstellar_m2' && (
            <InteractiveInfographic_InterstellarM2 />
          )}
          {moduleData.id === 'interstellar_m3' && (
            <InteractiveInfographic_InterstellarM3 />
          )}
          {moduleData.id === 'interstellar_m4' && (
            <InteractiveInfographic_InterstellarM4 />
          )}
          {moduleData.id === 'interstellar_m5' && (
            <InteractiveInfographic_InterstellarM5 />
          )}
          {moduleData.id === 'interestelar_m1' && (
            <InteractiveInfographic_InterestelarM1 />
          )}
          {moduleData.id === 'interestelar_m2' && (
            <InteractiveInfographic_InterestelarM2 />
          )}
          {moduleData.id === 'interestelar_m3' && (
            <InteractiveInfographic_InterestelarM3 />
          )}
          {moduleData.id === 'interestelar_m4' && (
            <InteractiveInfographic_InterestelarM4 />
          )}
          {moduleData.id === 'interestelar_m5' && (
            <InteractiveInfographic_InterestelarM5 />
          )}
          {moduleData.id === 'interestelar_m6' && (
            <InteractiveInfographic_InterestelarM6 />
          )}
          {moduleData.id === 'maya_m1' && (
            <InteractiveInfographic_MayaM1 />
          )}
          {moduleData.id === 'maya_m2' && (
            <InteractiveInfographic_MayaM2 />
          )}
          {moduleData.id === 'maya_m3' && (
            <InteractiveInfographic_MayaM3 />
          )}
          {moduleData.id === 'maya_m4' && (
            <InteractiveInfographic_MayaM4 />
          )}
          {moduleData.id === 'maya_m5' && (
            <InteractiveInfographic_MayaM5 />
          )}
          {moduleData.id === 'maya_m6' && (
            <InteractiveInfographic_MayaM6 />
          )}
          {moduleData.id === 'maya_m7' && (
            <InteractiveInfographic_MayaM7 />
          )}
          {moduleData.id === 'maya_m8' && (
            <InteractiveInfographic_MayaM8 />
          )}
          {moduleData.id === 'maya_m9' && (
            <InteractiveInfographic_MayaM9 />
          )}
          {moduleData.id === 'maya_m10' && (
            <InteractiveInfographic_MayaM10 />
          )}
          {moduleData.id === 'maya_m11' && (
            <InteractiveInfographic_MayaM11 />
          )}
          {moduleData.id === 'maya_m12' && (
            <InteractiveInfographic_MayaM12 />
          )}
          {moduleData.id === 'maya_m13' && (
            <InteractiveInfographic_MayaM13 />
          )}
          {moduleData.id === 'maya_m14' && (
            <InteractiveInfographic_MayaM14 />
          )}
          {moduleData.id === 'maya_m15' && (
            <InteractiveInfographic_MayaM15 />
          )}
          {moduleData.id === 'viaje-planetas-gaseosos' && (
            <InteractiveInfographic_GaseososM1 />
          )}
          {moduleData.id === 'animales_intro' && (
            <InteractiveInfographic_AnimalesM1 />
          )}
          {moduleData.id === 'animales_albert_ham' && (
            <InteractiveInfographic_AnimalesM2 />
          )}
          {moduleData.id === 'animales_laika' && (
            <InteractiveInfographic_AnimalesM3 />
          )}
          {moduleData.id === 'animales_gatos' && (
            <InteractiveInfographic_AnimalesM4 />
          )}
          {moduleData.id === 'pioneros_yuri' && (
            <InteractiveInfographic_PionerosM1 />
          )}
          {moduleData.id === 'pioneros_alan' && (
            <InteractiveInfographic_PionerosM2 />
          )}
          {moduleData.id === 'pioneros_john' && (
            <InteractiveInfographic_PionerosM3 />
          )}
          {moduleData.id === 'pioneros_valentina' && (
            <InteractiveInfographic_PionerosM4 />
          )}
          {moduleData.id === 'pioneros_leonov' && (
            <InteractiveInfographic_PionerosM5 />
          )}
          {moduleData.id === 'pioneros_svetlana' && (
            <InteractiveInfographic_PionerosM6 />
          )}
          {moduleData.id === 'pioneros_sally' && (
            <InteractiveInfographic_PionerosM7 />
          )}
          {moduleData.id === 'rocosos_m1' && (
            <InteractiveInfographic_RocososM1 />
          )}
          {moduleData.id === 'rocosos_m2' && (
            <InteractiveInfographic_RocososM2 />
          )}
          {moduleData.id === 'rocosos_m3' && (
            <InteractiveInfographic_RocososM3 />
          )}
          {moduleData.id === 'rocosos_m4' && (
            <InteractiveInfographic_RocososM4 />
          )}
          {moduleData.id === 'rocosos_m5' && (
            <InteractiveInfographic_RocososM5 />
          )}
          {moduleData.id === 'rocosos_m6' && (
            <InteractiveInfographic_RocososM6 />
          )}
          {moduleData.id === 'exoplanetas_m1' && (
            <InteractiveInfographic_ExoplanetasM1 />
          )}
          {moduleData.id === 'exoplanetas_m2' && (
            <InteractiveInfographic_ExoplanetasM2 />
          )}
          {moduleData.id === 'exoplanetas_m3' && (
            <InteractiveInfographic_ExoplanetasM3 />
          )}
          {moduleData.id === 'exoplanetas_m4' && (
            <InteractiveInfographic_ExoplanetasM4 />
          )}
          {moduleData.id === 'asteroides_intro' && (
            <InteractiveInfographic_AsteroidesM1 />
          )}
          {moduleData.id === 'asteroides_meteoros' && (
            <InteractiveInfographic_AsteroidesM2 />
          )}
          {moduleData.id === 'asteroides_cometas' && (
            <InteractiveInfographic_AsteroidesM3 />
          )}
          {moduleData.id === 'asteroides_sondas' && (
            <InteractiveInfographic_AsteroidesM4 />
          )}
          {moduleData.id === 'asteroides_apophis' && (
            <InteractiveInfographic_AsteroidesM5 />
          )}

          
          {/* ── INTERACTIVE INFOGRAPHICS: 10 nuevos cursos (70 módulos) ── */}
          {/* --- DINOSAURIOS --- */}
          {moduleData.id === 'dinos_m1' && (
            <InteractiveInfographic_DinosM1 />
          )}
          {moduleData.id === 'dinos_m2' && (
            <InteractiveInfographic_DinosM2 />
          )}
          {moduleData.id === 'dinos_m3' && (
            <InteractiveInfographic_DinosM3 />
          )}
          {moduleData.id === 'dinos_m4' && (
            <InteractiveInfographic_DinosM4 />
          )}
          {moduleData.id === 'dinos_m5' && (
            <InteractiveInfographic_DinosM5 />
          )}
          {moduleData.id === 'dinos_m6' && (
            <InteractiveInfographic_DinosM6 />
          )}
          {moduleData.id === 'dinos_m7' && (
            <InteractiveInfographic_DinosM7 />
          )}
          {moduleData.id === 'dinos_m8' && (
            <InteractiveInfographic_DinosM8 />
          )}
          {moduleData.id === 'dinos_m9' && (
            <InteractiveInfographic_DinosM9 />
          )}
          {moduleData.id === 'dinos_m10' && (
            <InteractiveInfographic_DinosM10 />
          )}
          {/* --- REPTILES MARINOS --- */}
          {moduleData.id === 'marinos_m1' && (
            <InteractiveInfographic_MarinosM1 />
          )}
          {moduleData.id === 'marinos_m2' && (
            <InteractiveInfographic_MarinosM2 />
          )}
          {moduleData.id === 'marinos_m3' && (
            <InteractiveInfographic_MarinosM3 />
          )}
          {moduleData.id === 'marinos_m4' && (
            <InteractiveInfographic_MarinosM4 />
          )}
          {moduleData.id === 'marinos_m5' && (
            <InteractiveInfographic_MarinosM5 />
          )}
          {moduleData.id === 'marinos_m6' && (
            <InteractiveInfographic_MarinosM6 />
          )}
          {moduleData.id === 'marinos_m7' && (
            <InteractiveInfographic_MarinosM7 />
          )}
          {moduleData.id === 'marinos_m8' && (
            <InteractiveInfographic_MarinosM8 />
          )}
          {moduleData.id === 'marinos_m9' && (
            <InteractiveInfographic_MarinosM9 />
          )}
          {moduleData.id === 'marinos_m10' && (
            <InteractiveInfographic_MarinosM10 />
          )}
          {/* --- NIKOLA TESLA --- */}
          {moduleData.id === 'tesla_m1' && (
            <InteractiveInfographic_TeslaM1 />
          )}
          {moduleData.id === 'tesla_m2' && (
            <InteractiveInfographic_TeslaM2 />
          )}
          {moduleData.id === 'tesla_m3' && (
            <InteractiveInfographic_TeslaM3 />
          )}
          {moduleData.id === 'tesla_m4' && (
            <InteractiveInfographic_TeslaM4 />
          )}
          {moduleData.id === 'tesla_m5' && (
            <InteractiveInfographic_TeslaM5 />
          )}
          {moduleData.id === 'tesla_m6' && (
            <InteractiveInfographic_TeslaM6 />
          )}
          {moduleData.id === 'tesla_m7' && (
            <InteractiveInfographic_TeslaM7 />
          )}
          {moduleData.id === 'tesla_m8' && (
            <InteractiveInfographic_TeslaM8 />
          )}
          {moduleData.id === 'tesla_m9' && (
            <InteractiveInfographic_TeslaM9 />
          )}
          {moduleData.id === 'tesla_m10' && (
            <InteractiveInfographic_TeslaM10 />
          )}
          {/* --- ALBERT EINSTEIN --- */}
          {moduleData.id === 'einstein_m1' && (
            <InteractiveInfographic_EinsteinM1 />
          )}
          {moduleData.id === 'einstein_m2' && (
            <InteractiveInfographic_EinsteinM2 />
          )}
          {moduleData.id === 'einstein_m3' && (
            <InteractiveInfographic_EinsteinM3 />
          )}
          {moduleData.id === 'einstein_m4' && (
            <InteractiveInfographic_EinsteinM4 />
          )}
          {moduleData.id === 'einstein_m5' && (
            <InteractiveInfographic_EinsteinM5 />
          )}
          {moduleData.id === 'einstein_m6' && (
            <InteractiveInfographic_EinsteinM6 />
          )}
          {/* --- CARL SAGAN --- */}
          {moduleData.id === 'sagan_m1' && (
            <InteractiveInfographic_SaganM1 />
          )}
          {moduleData.id === 'sagan_m2' && (
            <InteractiveInfographic_SaganM2 />
          )}
          {moduleData.id === 'sagan_m3' && (
            <InteractiveInfographic_SaganM3 />
          )}
          {moduleData.id === 'sagan_m4' && (
            <InteractiveInfographic_SaganM4 />
          )}
          {moduleData.id === 'sagan_m5' && (
            <InteractiveInfographic_SaganM5 />
          )}
          {moduleData.id === 'sagan_m6' && (
            <InteractiveInfographic_SaganM6 />
          )}
          {/* --- MARIE CURIE --- */}
          {moduleData.id === 'curie_m1' && (
            <InteractiveInfographic_CurieM1 />
          )}
          {moduleData.id === 'curie_m2' && (
            <InteractiveInfographic_CurieM2 />
          )}
          {moduleData.id === 'curie_m3' && (
            <InteractiveInfographic_CurieM3 />
          )}
          {moduleData.id === 'curie_m4' && (
            <InteractiveInfographic_CurieM4 />
          )}
          {moduleData.id === 'curie_m5' && (
            <InteractiveInfographic_CurieM5 />
          )}
          {moduleData.id === 'curie_m6' && (
            <InteractiveInfographic_CurieM6 />
          )}
          {/* --- CECILIA PAYNE --- */}
          {moduleData.id === 'cecilia_m1' && (
            <InteractiveInfographic_CeciliaM1 />
          )}
          {moduleData.id === 'cecilia_m2' && (
            <InteractiveInfographic_CeciliaM2 />
          )}
          {moduleData.id === 'cecilia_m3' && (
            <InteractiveInfographic_CeciliaM3 />
          )}
          {moduleData.id === 'cecilia_m4' && (
            <InteractiveInfographic_CeciliaM4 />
          )}
          {/* --- GRIEGOS EN LA CIENCIA --- */}
          {moduleData.id === 'griegos_m1' && (
            <InteractiveInfographic_GriegosM1 />
          )}
          {moduleData.id === 'griegos_m2' && (
            <InteractiveInfographic_GriegosM2 />
          )}
          {moduleData.id === 'griegos_m3' && (
            <InteractiveInfographic_GriegosM3 />
          )}
          {moduleData.id === 'griegos_m4' && (
            <InteractiveInfographic_GriegosM4 />
          )}
          {moduleData.id === 'griegos_m5' && (
            <InteractiveInfographic_GriegosM5 />
          )}
          {moduleData.id === 'griegos_m6' && (
            <InteractiveInfographic_GriegosM6 />
          )}
          {/* --- ENTRENAMIENTO ASTRONAUTA --- */}
          {moduleData.id === 'astro_train_m1' && (
            <InteractiveInfographic_AstroTrainM1 />
          )}
          {moduleData.id === 'astro_train_m2' && (
            <InteractiveInfographic_AstroTrainM2 />
          )}
          {moduleData.id === 'astro_train_m3' && (
            <InteractiveInfographic_AstroTrainM3 />
          )}
          {moduleData.id === 'astro_train_m4' && (
            <InteractiveInfographic_AstroTrainM4 />
          )}
          {moduleData.id === 'astro_train_m5' && (
            <InteractiveInfographic_AstroTrainM5 />
          )}
          {moduleData.id === 'astro_train_m6' && (
            <InteractiveInfographic_AstroTrainM6 />
          )}
          {/* --- ARRIVAL --- */}
          {moduleData.id === 'arrival_m1' && (
            <InteractiveInfographic_ArrivalM1 />
          )}
          {moduleData.id === 'arrival_m2' && (
            <InteractiveInfographic_ArrivalM2 />
          )}
          {moduleData.id === 'arrival_m3' && (
            <InteractiveInfographic_ArrivalM3 />
          )}
          {moduleData.id === 'arrival_m4' && (
            <InteractiveInfographic_ArrivalM4 />
          )}
          {moduleData.id === 'arrival_m5' && (
            <InteractiveInfographic_ArrivalM5 />
          )}
          {moduleData.id === 'arrival_m6' && (
            <InteractiveInfographic_ArrivalM6 />
          )}

          {moduleData.id !== 'egypt_m11' && moduleData.id !== 'egypt_m9' && moduleData.id !== 'egypt_m10' && moduleData.id !== 'egypt_m1' && moduleData.id !== 'egypt_m6' && moduleData.id !== 'egypt_m5' && moduleData.id !== 'egypt_m8' && moduleData.id !== 'egypt_m14' && moduleData.id !== 'egypt_m12' && moduleData.id !== 'egypt_m13' && moduleData.id !== 'bttf_m3' && moduleData.id !== 'bttf_m5' && moduleData.id !== 'bttf_m2' && moduleData.id !== 'bttf_m6' && moduleData.id !== 'bttf_m1' && moduleData.id !== 'bttf_m4' && moduleData.id !== 'bttf_m7' && moduleData.id !== 'starwars_sec_2' && moduleData.id !== 'starwars_sec_1' && moduleData.id !== 'starwars_sec_7' && moduleData.id !== 'starwars_sec_8' && moduleData.id !== 'starwars_sec_3' && moduleData.id !== 'starwars_sec_4' && moduleData.id !== 'starwars_sec_5' && moduleData.id !== 'starwars_sec_6' && moduleData.id !== 'starwars_sec_9' && moduleData.id !== 'interstellar_m1' && moduleData.id !== 'interstellar_m2' && moduleData.id !== 'interstellar_m3' && moduleData.id !== 'interstellar_m4' && moduleData.id !== 'interstellar_m5' && moduleData.id !== 'interestelar_m1' && moduleData.id !== 'interestelar_m2' && moduleData.id !== 'interestelar_m3' && moduleData.id !== 'interestelar_m4' && moduleData.id !== 'interestelar_m5' && moduleData.id !== 'interestelar_m6' && moduleData.id !== 'maya_m1' && moduleData.id !== 'maya_m2' && moduleData.id !== 'maya_m3' && moduleData.id !== 'maya_m4' && moduleData.id !== 'maya_m5' && moduleData.id !== 'maya_m6' && moduleData.id !== 'maya_m7' && moduleData.id !== 'maya_m8' && moduleData.id !== 'maya_m9' && moduleData.id !== 'maya_m10' && moduleData.id !== 'maya_m11' && moduleData.id !== 'maya_m12' && moduleData.id !== 'maya_m13' && moduleData.id !== 'maya_m14' && moduleData.id !== 'maya_m15' && moduleData.id !== 'viaje-planetas-gaseosos' && !moduleData.id.startsWith('rocosos_') && !moduleData.id.startsWith('exoplanetas_') && !moduleData.id.startsWith('asteroides_') && !moduleData.id.startsWith('animales_') && !moduleData.id.startsWith('dinos_') && !moduleData.id.startsWith('marinos_') && !moduleData.id.startsWith('tesla_') && !moduleData.id.startsWith('einstein_') && !moduleData.id.startsWith('sagan_') && !moduleData.id.startsWith('curie_') && !moduleData.id.startsWith('cecilia_') && !moduleData.id.startsWith('griegos_') && !moduleData.id.startsWith('astro_train_') && !moduleData.id.startsWith('arrival_') && !moduleData.id.startsWith('pioneros_') && (
            moduleData.contentEs?.sections ? (
            // NUEVO FORMATO 2.0 (Científico NASA)
            moduleData.contentEs.sections.map((section, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '0', overflow: 'hidden', borderLeft: `4px solid ${section.style === 'highlight' ? 'var(--gold-star)' : moduleData.color}` }}>
                {section.video && (section.video.includes('drive.google.com') || section.video.includes('youtube.com') || section.video.includes('youtu.be')) ? (
                  <div style={{ width: '100%', background: '#000', position: 'relative', aspectRatio: '16/9' }}>
                    <iframe src={section.video} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} allow="autoplay; fullscreen" allowFullScreen></iframe>
                  </div>
                ) : section.video ? (
                  <div style={{ width: '100%', background: '#000', position: 'relative' }}>
                     <video src={section.video} preload="none" controls style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', background: '#111' }} />
                  </div>
                ) : null}
                {section.image && !section.video && (
                  <div 
                    onClick={() => setExpandedImg(section.image)}
                    className="expandable-image-container"
                    style={{ width: '100%', height: '300px', background: '#000', position: 'relative', cursor: 'pointer', group: 'hover' }}
                  >
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={section.image} loading="lazy" alt={section.title} style={{ width: '100%', height: '100%', objectFit: section.image.includes('cartoon_') ? 'contain' : 'cover', transition: 'transform 0.3s ease' }} className="course-image-hover" />
                     
                     <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '0.4rem', borderRadius: '50%', color: 'white', opacity: 0.8 }}>
                        <Maximize2 size={16} />
                     </div>

                     {/* Caption eliminado a petición del usuario */}
                  </div>
                )}
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '1.4rem', color: section.style === 'highlight' ? 'var(--gold-star)' : 'inherit' }}>
                    <BookOpen size={24} color={section.style === 'highlight' ? 'var(--gold-star)' : moduleData.color} />
                    {section.title}
                  </h3>
                  <div style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>
                    {Array.isArray(section.text) 
                      ? section.text.map((line, i) => (
                          <p key={i} style={{ display: 'block', margin: '0 0 0.5rem 0' }}>{line}</p>
                        ))
                      : <p style={{ whiteSpace: 'pre-line' }}>{section.text}</p>
                    }
                  </div>
                </div>
              </div>
            ))
          ) : moduleData.contentEs?.facts ? (
            // FORMATO VIEJO 1.0 (Compatibilidad Inversa) — only if facts exist
            <div className="glass-card" style={{ borderLeft: `4px solid ${moduleData.color}` }}>
               <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                 <BookOpen size={24} color={moduleData.color} />
                 Visión General
               </h3>
               <p style={{ marginBottom: '1rem' }}>{moduleData.contentEs.intro}</p>
               <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Datos Curiosos</h3>
               <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {moduleData.contentEs.facts.map((fact, i) => <li key={i}>{fact}</li>)}
               </ul>
            </div>
          ) : null
          )}

          {/* Sección de Bibliografía Oficial */}
          {moduleData.contentEs.bibliography && (
            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', borderLeft: '3px solid var(--text-muted)' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Fuentes de Investigación Oficial</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', listStyleType: 'circle', paddingLeft: '1.2rem' }}>
                {moduleData.contentEs.bibliography.map((bib, i) => (
                  <li key={i}>{bib}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Encuesta de Satisfacción */}
          <div style={{ marginTop: '2rem' }}>
            {moduleData.id === 'asteroides_apophis' && <ApophisCountdown />}
            <SatisfactionScale moduleId={moduleData.id} userId={user?.uid} />
          </div>

        </section>

        {/* Sidebar / Quiz Section */}
        <aside style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', background: `linear-gradient(135deg, rgba(255,255,255,0.05), ${moduleData.color}20)`, backdropFilter: 'blur(20px)' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', boxShadow: `0 0 40px ${moduleData.color}60`, overflow: 'hidden', border: `4px solid ${moduleData.color}`, background: 'black' }}>
               <motion.img 
                 src={`/assets/${planetImageName}?v=2`} 
                 alt={moduleData.titleEs} 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                 style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'normal' }} 
                 onError={(e) => {e.target.style.display='none'}} 
               />
            </div>
            
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Misión {moduleData.titleEs || moduleData.title}</h2>
            {(moduleData.badgeIcon || moduleData.badgeImage) && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', marginTop: '1rem', position: 'relative' }}>
                <div style={{
                   position: 'relative',
                   width: '100px', height: '100px',
                   borderRadius: '50%',
                   background: `linear-gradient(45deg, #FFD700, #FFA500, #FF4500)`,
                   padding: '6px',
                   boxShadow: `0 0 20px ${moduleData.color}80, inset 0 0 10px rgba(0,0,0,0.5)`,
                   display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                   <div style={{ position: 'absolute', top: '-10px', width: '20px', height: '30px', background: 'var(--gold-star)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)', zIndex: 1 }} />
                   <img src={moduleData.badgeIcon || moduleData.badgeImage} width={88} height={88} alt="Insignia" style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid #222' }} />
                </div>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--gold-star)', letterSpacing: '1.5px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  Insignia Oficial
                </span>
              </div>
            )}
            
            {!isCompleted ? (
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Lee toda la información y luego pon a prueba tus conocimientos para ganar la medalla.</p>
            ) : (
              <div style={{ padding: '0.5rem 1rem', background: 'rgba(0, 255, 136, 0.2)', color: 'var(--success)', borderRadius: '20px', fontWeight: 'bold' }}>
                ¡Misión Completada!
              </div>
            )}

            <Link href={`/quiz/${moduleData.id}`} className="btn-primary" style={{ width: '100%', marginTop: '1rem', background: moduleData.color }}>
              {isCompleted ? 'Repasar Misión' : 'Ir a la Prueba'} <ArrowRight size={20} />
            </Link>
          </div>

          {hubInfo ? (
            <Link href={hubInfo.path} className="btn-secondary" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ChevronLeft size={16} /> Volver a {hubInfo.name}
            </Link>
          ) : (
            <Link href="/dashboard/misiones" className="btn-secondary" style={{ textAlign: 'center' }}>
              Volver al Mapa Estelar
            </Link>
          )}
        </aside>

      </main>
    </div>
  );
}
