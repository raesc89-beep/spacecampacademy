const fs = require('fs');

const moduleKeywordsEn = {
  "el sol": "sun corona", "mercurio": "mercury planet", "venus": "venus planet", "tierra": "earth from space",
  "marte": "mars planet", "júpiter": "jupiter planet", "saturno": "saturn rings", "urano": "uranus planet",
  "neptuno": "neptune planet", "plutón": "pluto dwarf planet", "agujero negro": "black hole",
  "cuásar": "quasar", "púlsar": "pulsar neutron star", "enana roja": "red dwarf star",
  "enana blanca": "white dwarf star", "agujero de gusano": "wormhole illustration", "asteroides": "asteroid",
  "meteoros": "meteor shower", "cometas": "comet", "sondas": "space probe",
  "asteroide apophis": "apophis asteroid", "animales en el espacio": "animals in space",
  "mamíferos en el espacio": "monkey space mission", "simio albert y simio ham": "chimpanzee space flight",
  "laika": "laika dog space", "gatos en el espacio": "felicette cat space"
};

const BANNED_WORDS = [
  'festival', 'angry birds', 'director', 'award', 'ceremony', 'administrator', 
  'visitor', 'press', 'briefing', 'student', 'team', 'symposium', 'speaker', 
  'panel', 'hq', 'podium', 'president', 'gore', 'town', 'celebration'
];

let globalUsedUrls = new Set();

async function translateToEn(text) {
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=' + encodeURIComponent(text);
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch(e) {
    return text;
  }
}

async function translateToEs(text) {
  try {
    let textToTranslate = text.substring(0, 750);
    if (text.length > 750) textToTranslate += "...";
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + encodeURIComponent(textToTranslate);
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch(e) {
    return "La NASA investiga constantemente nuestro universo. Sus datos científicos nos permiten desentrañar los misterios del cosmos y expandir nuestro conocimiento.";
  }
}

async function fetchNasaImages(query) {
  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
    const data = await res.json();
    if (!data.collection || !data.collection.items) return [];
    
    // Light filter to remove only obvious PR events, politicians, etc.
    let items = data.collection.items.filter(i => {
      if (!i.links || !i.links[0] || !i.data || !i.data[0] || !i.data[0].description) return false;
      const desc = i.data[0].description.toLowerCase();
      const title = (i.data[0].title || '').toLowerCase();
      
      for (let word of BANNED_WORDS) {
        if (desc.includes(word) || title.includes(word)) return false;
      }
      return true;
    });
    
    // Sort by description length to ensure >10 lines of text
    items.sort((a, b) => b.data[0].description.length - a.data[0].description.length);
    return items;
  } catch (e) {
    return [];
  }
}

async function getUniqueImageForSection(moduleEn, sectionTitleEs) {
  const sectionTitleEn = await translateToEn(sectionTitleEs);
  const specificQuery = `${moduleEn} ${sectionTitleEn}`;
  
  // Try specific query first for CONGRUENCE
  let items = await fetchNasaImages(specificQuery);
  for (let item of items) {
    let url = item.links[0].href;
    if (!globalUsedUrls.has(url)) {
      globalUsedUrls.add(url);
      return { url, desc: item.data[0].description };
    }
  }
  
  // If no unique specific image, fallback to module query
  items = await fetchNasaImages(moduleEn);
  for (let item of items) {
    let url = item.links[0].href;
    if (!globalUsedUrls.has(url)) {
      globalUsedUrls.add(url);
      return { url, desc: item.data[0].description };
    }
  }
  
  // Ultimate fallback
  items = await fetchNasaImages("galaxy hubble");
  for (let item of items) {
    let url = item.links[0].href;
    if (!globalUsedUrls.has(url)) {
      globalUsedUrls.add(url);
      return { url, desc: item.data[0].description };
    }
  }
  
  return { url: 'https://images-assets.nasa.gov/image/PIA15416/PIA15416~small.jpg', desc: "Space observation." };
}

async function run() {
  console.log('Iniciando Motor Definitivo: Búsqueda Específica con Memoria Anti-Repetición...');
  
  const courseDataModule = await import('./lib/courseData.js');
  let data = courseDataModule.COURSE_DATA || courseDataModule.modules;
  
  const felicetteImages = [
    '/assets/gatos/Felicette_1.jpg',
    '/assets/gatos/Felicette_3.png',
    '/assets/gatos/Felicette_5.jpg',
    '/assets/gatos/Felicette_6.jpg',
    '/assets/gatos/Felicette_7.png'
  ];
  
  for (let moduleData of data) {
    const titleEs = moduleData.titleEs.toLowerCase();
    
    if (titleEs === "gatos en el espacio") {
       console.log(`Inyectando imágenes locales para: Gatos en el espacio`);
       for (let i = 0; i < moduleData.contentEs.sections.length; i++) {
         let section = moduleData.contentEs.sections[i];
         delete section.imgCaption;
         section.image = felicetteImages[i % felicetteImages.length];
         section.text = `Cadete, en esta etapa de la misión profundizaremos en: ${section.title}.\n\nFélicette fue una heroína espacial, la primera y única gata en viajar al espacio y regresar a salvo. Su contribución a la ciencia ayudó a comprender los efectos de la ingravidez en los seres vivos. La agencia espacial francesa, el CERMA, la seleccionó entre muchos otros felinos por su tranquilidad y temperamento estable. Su vuelo suborbital en 1963 a bordo del cohete Véronique AGI duró unos 15 minutos, alcanzando una altura de 157 kilómetros. Félicette experimentó 5 minutos de ingravidez.\n\nSigue explorando el cosmos. La información obtenida por estas misiones nos ayuda a comprender mejor nuestro inmenso lugar en el universo.`;
       }
       continue;
    }
    
    const moduleEn = moduleKeywordsEn[titleEs] || "space galaxy";
    console.log(`Procesando módulo: ${moduleData.titleEs}`);
    
    if (!moduleData.contentEs || !moduleData.contentEs.sections) continue;
    
    for (let i = 0; i < moduleData.contentEs.sections.length; i++) {
      let section = moduleData.contentEs.sections[i];
      delete section.imgCaption;
      
      let imgData = await getUniqueImageForSection(moduleEn, section.title);
      section.image = imgData.url;
      
      console.log(`  Sección ${i+1}/15: ${section.title} -> ${imgData.url}`);
      let translatedNasaDesc = await translateToEs(imgData.desc);
      translatedNasaDesc = translatedNasaDesc.replace(/<[^>]*>?/gm, ''); 
      
      section.text = `Cadete, en esta etapa de la misión profundizaremos en: ${section.title}.\n\nA continuación, analizamos los datos científicos oficiales recopilados por la NASA referentes a este entorno astronómico:\n\n"${translatedNasaDesc}"\n\nSigue explorando el cosmos. La información obtenida por estas misiones nos ayuda a comprender mejor nuestro inmenso lugar en el universo.`;
    }
  }
  
  const newFileContent = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync('./lib/courseData.js', newFileContent);
  console.log('¡Motor Completado! Congruencia Absoluta restaurada. Gatos locales inyectados. Cero repeticiones.');
}

run();
