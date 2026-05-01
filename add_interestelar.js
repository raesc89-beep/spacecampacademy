
const fs = require('fs');
const https = require('https');

async function fetchWiki(title) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'es.wikipedia.org',
      path: `/w/api.php?action=query&prop=extracts&exintro=0&explaintext=1&titles=${encodeURIComponent(title)}&format=json&redirects=1`,
      headers: { 'User-Agent': 'SpaceCampBot/1.0 (https://spacecampacademy.vercel.app)' }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === "-1") resolve("");
          resolve(pages[pageId].extract || "");
        } catch (e) { resolve(""); }
      });
    }).on('error', () => resolve(""));
  });
}

function splitIntoSentences(text, topic, minSentences = 10) {
  if (!text || text.length < 100) {
    return [
      `El objeto interestelar ${topic} representa un misterio para la astronomía moderna.`,
      `Su trayectoria hiperbólica indica que no está ligado gravitacionalmente al Sol.`,
      `Estos viajeros provienen de otros sistemas estelares lejanos.`,
      `La composición química de estos objetos revela secretos de sus sistemas de origen.`,
      `El descubrimiento de 'Oumuamua en 2017 cambió nuestra visión del espacio interestelar.`,
      `Borisov mostró una cola cometaria, a diferencia del primer objeto detectado.`,
      `El medio interestelar está compuesto por gas, polvo y rayos cósmicos de alta energía.`,
      `Las sondas Voyager son los únicos objetos humanos que han cruzado la heliopausa.`,
      `La detección de estos intrusos requiere telescopios de gran campo y alta sensibilidad.`,
      `El estudio de estos objetos es la clave para entender la formación de otros mundos.`
    ];
  }
  let sentences = text.replace(/\\n/g, ' ').split(/(?<=\.)\s+/).filter(s => s.trim().length > 30);
  while (sentences.length < 10) sentences.push("El vacío interestelar no es absoluto, contiene materia y campos magnéticos complejos.");
  return sentences.slice(0, 10);
}

async function addInterestelar() {
  console.log("Iniciando creación del curso: Objetos Interestelares...");
  
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

  const interestelarTopics = [
    { t: "Objeto_interestelar", title: "Intrusos en el Sistema Solar" },
    { t: "Oumuamua", title: "'Oumuamua: El primer mensajero" },
    { t: "2I/Borisov", title: "2I/Borisov: Un cometa de otro sol" },
    { t: "Medio_interestelar", title: "El Vacío: El medio interestelar" },
    { t: "Heliofunda", title: "La Heliopausa: El borde del Sol" },
    { t: "Nube_de_Oort", title: "Nube de Oort: La frontera helada" },
    { t: "Voyager_1", title: "Voyager 1: Embajador en el vacío" },
    { t: "Voyager_2", title: "Voyager 2: Exploración total" },
    { t: "Polvo_interestelar", title: "Polvo Estelar: Semillas de mundos" },
    { t: "Gas_interestelar", title: "Hidrógeno y Helio: El gas galáctico" },
    { t: "Rayo_cósmico", title: "Rayos Cósmicos: Radiación letal" },
    { t: "Cinturón_de_Kuiper", title: "Más allá de Plutón: Cinturón de Kuiper" },
    { t: "Sonda_interestelar", title: "Sondas del Futuro: Rompiendo barreras" },
    { t: "Viaje_interestelar", title: "Propulsión: El reto de las estrellas" },
    { t: "Enano_marrón", title: "Mundos Errantes: Planetas sin estrella" }
  ];

  const sections = [];
  for (let i = 0; i < 15; i++) {
    console.log(`Buscando: ${interestelarTopics[i].t}...`);
    const rawText = await fetchWiki(interestelarTopics[i].t);
    sections.push({
      id: `interestelar_sec_${i}`,
      title: interestelarTopics[i].title,
      text: splitIntoSentences(rawText, interestelarTopics[i].title, 10),
      image: `https://source.unsplash.com/featured/?space,nebula,voyager,asteroid,${i}`
    });
  }

  const newCourse = {
    id: "objetos_interestelares",
    titleEs: "Objetos Interestelares",
    titleEn: "Interstellar Objects",
    color: "#00E4FF",
    badgeEs: "Explorador de Estrellas",
    badgeEn: "Star Explorer",
    badgeImage: "/assets/badges/interestelar_badge.png",
    contentEs: { sections },
    contentEn: { intro: "Discover the visitors from other star systems.", facts: ["Oumuamua was the first."] },
    quiz: [
      { q: "¿Cuál fue el primer objeto interestelar detectado?", a: ["'Oumuamua", "Borisov", "Halley"], c: 0 },
      { q: "¿Qué sonda humana ha cruzado al espacio interestelar?", a: ["Voyager 1", "Sputnik", "Hubble"], c: 0 }
    ]
  };

  jsData.push(newCourse);
  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("¡Curso de Objetos Interestelares creado!");
}

addInterestelar();
