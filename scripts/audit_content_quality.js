/**
 * audit_content_quality.js
 * Detecta módulos con alucinaciones, texto repetitivo o contenido insuficiente.
 * Uso: node scripts/audit_content_quality.js [--verbose] [--json]
 */

const path = require('path');
const fs = require('fs');

// Adjetivos "vacíos" típicos de alucinaciones de LLM en modo infantil excesivo
const EMPTY_ADJECTIVES = [
  'asombroso','asombrosa','asombrosos','asombrosas',
  'increíble','increíbles','increible','increibles',
  'mágico','mágica','mágicos','mágicas','magico','magica',
  'genial','geniales',
  'brillante','brillantes',
  'estelar','estelares',
  'inmenso','inmensa','inmensos','inmensas',
  'maravilloso','maravillosa','maravillosos','maravillosas',
  'fantástico','fantástica','fantastico','fantastica',
  'espectacular','espectaculares',
];

const FLAGS = {
  verbose: process.argv.includes('--verbose'),
  json:    process.argv.includes('--json'),
};

function loadCourseData() {
  // Try to require the courseData (CommonJS compatible)
  try {
    const mod = require('../lib/courseData.js');
    return mod.COURSE_DATA || mod.default || mod;
  } catch(e) {
    console.error('ERROR loading courseData.js:', e.message);
    process.exit(1);
  }
}

function countWordOccurrences(text, word) {
  const re = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = text.match(re);
  return matches ? matches.length : 0;
}

function auditText(text) {
  if (!text || text.length < 10) return { ok: false, issues: ['Texto vacío o muy corto'] };

  const issues = [];
  const words = text.toLowerCase().split(/\s+/);
  const totalWords = words.length;

  // 1. Texto demasiado corto
  if (totalWords < 40) {
    issues.push(`Texto demasiado corto: ${totalWords} palabras`);
  }

  // 2. Repetición excesiva de adjetivos vacíos
  let emptyAdjectiveCount = 0;
  const foundAdjectives = [];
  for (const adj of EMPTY_ADJECTIVES) {
    const count = countWordOccurrences(text, adj);
    if (count > 0) {
      emptyAdjectiveCount += count;
      if (count >= 3) foundAdjectives.push(`"${adj}" ×${count}`);
    }
  }

  const emptyRatio = emptyAdjectiveCount / totalWords;
  if (emptyRatio > 0.04) {
    issues.push(`Alta densidad de adjetivos vacíos: ${(emptyRatio*100).toFixed(1)}% (${emptyAdjectiveCount}/${totalWords} palabras) — ${foundAdjectives.join(', ')}`);
  }

  // 3. Repetición de cualquier palabra > 8 veces (excluyendo stopwords)
  const stopwords = new Set(['de','la','el','en','que','y','a','los','las','por','con','se','del','al','es','un','una','para','más','mas','como','no','su','sus','lo','le','les','pero','si','o','entre','sobre','cuando','también','tambien','hay','fue','son','han','ha','esto','esta','este','ese','esa','esos','esas','muy','sin','ni','cada','donde','así','así','hasta','desde','ya','ser','fue','sido','había','era','eran','tienen','tiene','pueden','puede','todo','toda','todos','todas','este','esta','estos','estas','ese','esa','esos','esas']);
  const wordCount = {};
  for (const w of words) {
    const clean = w.replace(/[^a-záéíóúüñ]/gi, '');
    if (clean.length > 3 && !stopwords.has(clean)) {
      wordCount[clean] = (wordCount[clean] || 0) + 1;
    }
  }
  const repeated = Object.entries(wordCount).filter(([w, c]) => c > 8 && !EMPTY_ADJECTIVES.includes(w)).map(([w, c]) => `"${w}" ×${c}`);
  if (repeated.length > 0) {
    issues.push(`Palabras muy repetidas: ${repeated.slice(0,5).join(', ')}`);
  }

  return { ok: issues.length === 0, issues, totalWords, emptyRatio: +(emptyRatio*100).toFixed(2) };
}

function auditModule(mod) {
  const moduleIssues = [];
  const sections = mod.contentEs?.sections || [];

  if (sections.length === 0) {
    moduleIssues.push({ section: 'GENERAL', issues: ['Sin secciones de contenido'] });
  }

  for (const section of sections) {
    const texts = Array.isArray(section.text) ? section.text : (section.text ? [section.text] : []);
    const allText = texts.join(' ');

    if (!allText.trim()) {
      moduleIssues.push({ section: section.title || section.id || '?', issues: ['Sección sin texto'] });
      continue;
    }

    const audit = auditText(allText);
    if (!audit.ok) {
      moduleIssues.push({
        section: section.title || section.id || '?',
        issues: audit.issues,
        wordCount: audit.totalWords,
        emptyRatio: audit.emptyRatio,
      });
    }
  }

  // Check quiz
  const quiz = mod.quizEs || [];
  if (quiz.length === 0) {
    moduleIssues.push({ section: 'QUIZ', issues: ['Sin preguntas de quiz'] });
  } else if (quiz.length < 3) {
    moduleIssues.push({ section: 'QUIZ', issues: [`Solo ${quiz.length} pregunta(s) — mínimo recomendado: 5`] });
  }

  return moduleIssues;
}

function main() {
  const courseData = loadCourseData();
  const results = [];
  let totalBad = 0;
  let totalModules = 0;

  for (const mod of courseData) {
    totalModules++;
    const issues = auditModule(mod);
    if (issues.length > 0) {
      totalBad++;
      results.push({
        id: mod.id,
        title: mod.titleEs || '(sin título)',
        issues,
      });
    }
  }

  if (FLAGS.json) {
    console.log(JSON.stringify({ totalModules, totalBad, results }, null, 2));
    return;
  }

  // Human-readable output
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📋 AUDITORÍA DE CALIDAD DE CONTENIDO — Space Camp Academy`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Total módulos auditados: ${totalModules}`);
  console.log(`Módulos con problemas:   ${totalBad} (${(totalBad/totalModules*100).toFixed(1)}%)`);
  console.log(`${'='.repeat(70)}\n`);

  if (totalBad === 0) {
    console.log('✅ Todos los módulos pasan la auditoría de calidad.\n');
    return;
  }

  // Sort by number of issues (worst first)
  results.sort((a, b) => b.issues.length - a.issues.length);

  for (const r of results) {
    console.log(`❌ [${r.id}] ${r.title}`);
    for (const issue of r.issues) {
      const prefix = issue.issues.length > 1 ? '   ├─' : '   └─';
      console.log(`${prefix} Sección: "${issue.section}"`);
      for (let i = 0; i < issue.issues.length; i++) {
        const isLast = i === issue.issues.length - 1;
        console.log(`   ${isLast ? '   └─' : '   ├─'} ${issue.issues[i]}`);
      }
    }
    console.log('');
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`Ejecuta con --verbose para ver extractos de texto.`);
  console.log(`Ejecuta con --json para exportar resultados en JSON.`);
}

main();
