// ═══════════════════════════════════════════════════════════════
// lib/achievements.js — Sistema de Logros de Space Camp Academy
// ═══════════════════════════════════════════════════════════════

/**
 * Catálogo completo de 30 logros.
 * Cada logro tiene: id, name, description, icon, rarity, category
 * La evaluación real ocurre en checkAchievements() más abajo.
 */
export const ACHIEVEMENTS_CATALOG = [
  // ── PRIMEROS PASOS ──────────────────────────────────────────
  {
    id: 'first_steps',
    name: 'Primer Despegue',
    description: 'Completa tu primer módulo del curso.',
    icon: '🚀',
    rarity: 'common',
    category: 'progreso',
    rarityColor: '#00FF88',
  },
  {
    id: 'course_finisher',
    name: 'Completista Estelar',
    description: 'Completa todos los módulos de un curso entero.',
    icon: '🏆',
    rarity: 'rare',
    category: 'progreso',
    rarityColor: '#00E4FF',
  },
  {
    id: 'halfway',
    name: 'Media Luna',
    description: 'Completa el 50% de todos los módulos disponibles.',
    icon: '🌗',
    rarity: 'epic',
    category: 'progreso',
    rarityColor: '#B02AFF',
  },
  {
    id: 'full_moon',
    name: 'Luna Llena',
    description: '¡Completa el 100% de todos los módulos disponibles!',
    icon: '🌕',
    rarity: 'legendary',
    category: 'progreso',
    rarityColor: '#FFD700',
  },

  // ── INSIGNIAS ────────────────────────────────────────────────
  {
    id: 'five_badges',
    name: 'Oficial de Escuadrón',
    description: 'Gana 5 insignias diferentes.',
    icon: '🎖️',
    rarity: 'common',
    category: 'insignias',
    rarityColor: '#00FF88',
  },
  {
    id: 'ten_badges',
    name: 'Comandante de Flota',
    description: 'Gana 10 insignias diferentes.',
    icon: '🎗️',
    rarity: 'rare',
    category: 'insignias',
    rarityColor: '#00E4FF',
  },
  {
    id: 'twenty_badges',
    name: 'Almirante Supremo',
    description: 'Gana 20 insignias diferentes.',
    icon: '👑',
    rarity: 'epic',
    category: 'insignias',
    rarityColor: '#B02AFF',
  },
  {
    id: 'collector',
    name: 'Coleccionista Obsesivo',
    description: 'Gana TODAS las insignias posibles del sistema.',
    icon: '🗃️',
    rarity: 'legendary',
    category: 'insignias',
    rarityColor: '#FFD700',
  },

  // ── QUIZZES ──────────────────────────────────────────────────
  {
    id: 'quiz_perfect_1',
    name: 'Disparo de Francotirador',
    description: 'Obtén tu primera puntuación perfecta en un quiz.',
    icon: '⭐',
    rarity: 'common',
    category: 'quizzes',
    rarityColor: '#00FF88',
  },
  {
    id: 'quiz_perfect_5',
    name: 'Francotirador Cerebral',
    description: 'Obtén 5 puntuaciones perfectas en quizzes.',
    icon: '🎯',
    rarity: 'rare',
    category: 'quizzes',
    rarityColor: '#00E4FF',
  },
  {
    id: 'quiz_perfect_10',
    name: 'Mente de Neutrones',
    description: '10 puntuaciones perfectas en quizzes.',
    icon: '💎',
    rarity: 'epic',
    category: 'quizzes',
    rarityColor: '#B02AFF',
  },
  {
    id: 'persistence',
    name: 'Nunca Te Rindas',
    description: 'Falla un quiz, vuelve a intentarlo y apruébalo.',
    icon: '🔥',
    rarity: 'common',
    category: 'quizzes',
    rarityColor: '#00FF88',
  },

  // ── POLVO ESTELAR ────────────────────────────────────────────
  {
    id: 'dust_500',
    name: 'Coleccionista Novato',
    description: 'Acumula 500 puntos de Polvo Estelar.',
    icon: '✨',
    rarity: 'common',
    category: 'polvo',
    rarityColor: '#00FF88',
  },
  {
    id: 'dust_2000',
    name: 'Minero de Estrellas',
    description: 'Acumula 2,000 puntos de Polvo Estelar.',
    icon: '🌟',
    rarity: 'rare',
    category: 'polvo',
    rarityColor: '#00E4FF',
  },
  {
    id: 'dust_5000',
    name: 'Barón del Polvo',
    description: 'Acumula 5,000 puntos de Polvo Estelar.',
    icon: '💫',
    rarity: 'epic',
    category: 'polvo',
    rarityColor: '#B02AFF',
  },

  // ── CURSOS COMPLETOS ─────────────────────────────────────────
  {
    id: 'explorer_dinos',
    name: 'Domador de Titanes',
    description: 'Completa el curso de Dinosaurios (10 módulos).',
    icon: '🦕',
    rarity: 'rare',
    category: 'cursos',
    rarityColor: '#00E4FF',
  },
  {
    id: 'explorer_marinos',
    name: 'Buceador del Mesozoico',
    description: 'Completa el curso de Reptiles Marinos (10 módulos).',
    icon: '🌊',
    rarity: 'rare',
    category: 'cursos',
    rarityColor: '#00E4FF',
  },
  {
    id: 'explorer_tesla',
    name: 'Heredero de Tesla',
    description: 'Completa el curso de Nikola Tesla (10 módulos).',
    icon: '⚡',
    rarity: 'rare',
    category: 'cursos',
    rarityColor: '#00E4FF',
  },
  {
    id: 'explorer_solar',
    name: 'Navegante del Sol',
    description: 'Completa los módulos del Sistema Solar.',
    icon: '🪐',
    rarity: 'rare',
    category: 'cursos',
    rarityColor: '#00E4FF',
  },
  {
    id: 'variety_5',
    name: 'Mente Abierta',
    description: 'Completa módulos de 5 cursos diferentes.',
    icon: '🎨',
    rarity: 'epic',
    category: 'cursos',
    rarityColor: '#B02AFF',
  },

  // ── HANGAR ───────────────────────────────────────────────────
  {
    id: 'first_ship',
    name: 'Primer Vuelo',
    description: 'Guarda tu primera nave en el hangar.',
    icon: '🛸',
    rarity: 'common',
    category: 'hangar',
    rarityColor: '#00FF88',
  },
  {
    id: 'five_ships',
    name: 'Ingeniero Naval',
    description: 'Guarda 5 configuraciones de naves diferentes.',
    icon: '🚢',
    rarity: 'rare',
    category: 'hangar',
    rarityColor: '#00E4FF',
  },
  {
    id: 'paint_master',
    name: 'Artista Estelar',
    description: 'Experimenta con al menos 5 combinaciones de color distintas.',
    icon: '🎨',
    rarity: 'common',
    category: 'hangar',
    rarityColor: '#00FF88',
  },

  // ── AVATAR ───────────────────────────────────────────────────
  {
    id: 'first_avatar',
    name: 'Identidad Estelar',
    description: 'Personaliza tu astronauta por primera vez.',
    icon: '👨‍🚀',
    rarity: 'common',
    category: 'avatar',
    rarityColor: '#00FF88',
  },

  // ── ESPECIALES ───────────────────────────────────────────────
  {
    id: 'night_owl',
    name: 'Búho Estelar',
    description: 'Accede a la plataforma después de medianoche.',
    icon: '🦉',
    rarity: 'rare',
    category: 'especiales',
    rarityColor: '#00E4FF',
  },
  {
    id: 'speed_demon',
    name: 'Velocidad Lumínica',
    description: 'Completa un quiz en menos de 60 segundos con al menos 80% de aciertos.',
    icon: '⏱️',
    rarity: 'epic',
    category: 'especiales',
    rarityColor: '#B02AFF',
  },
  {
    id: 'quiz_streak_3',
    name: 'Racha Galáctica',
    description: 'Aprueba 3 quizzes consecutivos sin fallar ninguno.',
    icon: '🔥',
    rarity: 'rare',
    category: 'especiales',
    rarityColor: '#00E4FF',
  },
  {
    id: 'early_bird',
    name: 'Aurora Boreal',
    description: 'Completa un módulo antes de las 7am.',
    icon: '🌅',
    rarity: 'common',
    category: 'especiales',
    rarityColor: '#00FF88',
  },
  {
    id: 'weekend_warrior',
    name: 'Guerrero de Fin de Semana',
    description: 'Estudia tanto un sábado como un domingo.',
    icon: '📅',
    rarity: 'common',
    category: 'especiales',
    rarityColor: '#00FF88',
  },
  {
    id: 'super_student',
    name: 'Super Estudiante',
    description: 'Completa 5 módulos en un solo día.',
    icon: '🌠',
    rarity: 'epic',
    category: 'especiales',
    rarityColor: '#B02AFF',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// checkAchievements — Evalúa qué logros debe tener el usuario dado su progreso
// ────────────────────────────────────────────────────────────────────────────
export function checkAchievements(userData, context = {}) {
  const progress = userData?.progress || {};
  const completedModules = progress?.completedModules || [];
  const badges = progress?.badges || {};
  const stars = progress?.stars || 0;
  const savedShips = userData?.savedShips || [];
  const achievements = progress?.achievements || {};

  const earned = {};
  const now = new Date().toISOString();

  const earn = (id) => {
    if (!achievements[id]) earned[id] = { unlockedAt: now };
  };

  // ── PROGRESO ─────────────────────────────────────────────────
  const completedCount = completedModules.length;

  if (completedCount >= 1) earn('first_steps');

  // Course finisher — check if all modules of any known course are done
  const coursePrefixes = {
    dinos: Array.from({ length: 10 }, (_, i) => `dinos_m${i + 1}`),
    marinos: Array.from({ length: 10 }, (_, i) => `marinos_m${i + 1}`),
    tesla: Array.from({ length: 10 }, (_, i) => `tesla_m${i + 1}`),
  };
  for (const [, mods] of Object.entries(coursePrefixes)) {
    if (mods.every(m => completedModules.includes(m))) {
      earn('course_finisher');
      break;
    }
  }

  // Variety — completed modules from at least 5 different course prefixes
  const coursesDone = new Set();
  for (const modId of completedModules) {
    const prefix = modId.split('_')[0];
    coursesDone.add(prefix);
  }
  if (coursesDone.size >= 5) earn('variety_5');

  // Halfway / Full moon — approximate total modules ≈ 100
  const TOTAL_MODULES_APPROX = 100;
  if (completedCount >= Math.floor(TOTAL_MODULES_APPROX * 0.5)) earn('halfway');
  if (completedCount >= TOTAL_MODULES_APPROX) earn('full_moon');

  // ── CURSOS ESPECÍFICOS ────────────────────────────────────────
  const dinosDone = coursePrefixes.dinos.every(m => completedModules.includes(m));
  const marinosDone = coursePrefixes.marinos.every(m => completedModules.includes(m));
  const teslaDone = coursePrefixes.tesla.every(m => completedModules.includes(m));
  const solarModules = ['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','pluto'];
  const solarDone = solarModules.every(m => completedModules.includes(m));

  if (dinosDone) earn('explorer_dinos');
  if (marinosDone) earn('explorer_marinos');
  if (teslaDone) earn('explorer_tesla');
  if (solarDone) earn('explorer_solar');

  // ── INSIGNIAS ─────────────────────────────────────────────────
  const badgeCount = Object.keys(badges).length;
  if (badgeCount >= 5) earn('five_badges');
  if (badgeCount >= 10) earn('ten_badges');
  if (badgeCount >= 20) earn('twenty_badges');

  // ── QUIZZES ───────────────────────────────────────────────────
  const perfectQuizzes = progress?.perfectQuizzes || 0;
  if (perfectQuizzes >= 1) earn('quiz_perfect_1');
  if (perfectQuizzes >= 5) earn('quiz_perfect_5');
  if (perfectQuizzes >= 10) earn('quiz_perfect_10');

  const quizRetryPass = context?.justPassedAfterFail || false;
  if (quizRetryPass) earn('persistence');

  const quizStreak = progress?.quizStreak || 0;
  if (quizStreak >= 3) earn('quiz_streak_3');

  // Speed quiz (passed with ≥ 80% in < 60 seconds) — context driven
  if (context?.speedQuiz) earn('speed_demon');

  // Modules in one day — context driven
  if ((context?.modulesToday || 0) >= 5) earn('super_student');

  // ── POLVO ESTELAR ──────────────────────────────────────────────
  if (stars >= 500) earn('dust_500');
  if (stars >= 2000) earn('dust_2000');
  if (stars >= 5000) earn('dust_5000');

  // ── HANGAR ─────────────────────────────────────────────────────
  const shipCount = savedShips.length;
  if (shipCount >= 1) earn('first_ship');
  if (shipCount >= 5) earn('five_ships');
  if (context?.colorVariantsUsed >= 5) earn('paint_master');

  // ── AVATAR ─────────────────────────────────────────────────────
  if (userData?.avatarCustomized) earn('first_avatar');

  // ── TIEMPO ─────────────────────────────────────────────────────
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) earn('night_owl');
  if (hour >= 5 && hour < 7) earn('early_bird');

  const day = new Date().getDay();
  const weekendActivity = progress?.weekendDays || [];
  const hasSat = weekendActivity.includes(6);
  const hasSun = weekendActivity.includes(0);
  if ((hasSat && hasSun) || context?.weekendStudy) earn('weekend_warrior');

  return earned;
}

/**
 * Returns only the achievements that are NEW (not previously in oldAchievements).
 * Used to detect what to show in toast notifications.
 */
export function getNewAchievements(oldAchievements = {}, newAchievements = {}) {
  return Object.entries(newAchievements).filter(([id]) => !oldAchievements[id]);
}

/**
 * Looks up an achievement from the catalog by ID.
 */
export function getAchievementInfo(id) {
  return ACHIEVEMENTS_CATALOG.find(a => a.id === id) || null;
}

/**
 * Returns the count of unlocked achievements out of the total catalog.
 */
export function getAchievementProgress(userAchievements = {}) {
  const total = ACHIEVEMENTS_CATALOG.length;
  const unlocked = ACHIEVEMENTS_CATALOG.filter(a => userAchievements[a.id]).length;
  return { unlocked, total, percent: Math.round((unlocked / total) * 100) };
}
