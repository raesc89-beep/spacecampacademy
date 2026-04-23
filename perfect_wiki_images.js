const fs = require('fs');

const wikiMap = {
  "El Sol": ["Sun", "Sunspot", "Solar flare", "Coronal mass ejection", "Solar core", "Solar cycle", "Solar wind", "Heliosphere", "Parker Solar Probe", "Solar eclipse", "Stellar nucleosynthesis", "Nuclear fusion", "Solar transition region", "Photosphere", "Chromosphere"],
  "Mercurio": ["Mercury (planet)", "Caloris Basin", "MESSENGER", "Mariner 10", "BepiColombo", "Transit of Mercury", "Impact crater", "Exosphere", "Planetary magnetic field", "Terrestrial planet", "Solar System", "Magnetic field of Mercury", "Geologic history of Mercury", "Water on Mercury", "Exploration of Mercury"],
  "Venus": ["Venus", "Atmosphere of Venus", "Venera", "Magellan (spacecraft)", "Transit of Venus", "Maxwell Montes", "Ishtar Terra", "Aphrodite Terra", "Geology of Venus", "Greenhouse effect", "Akatsuki (spacecraft)", "Mariner 2", "Pioneer Venus project", "Volcanism on Venus", "Observations and explorations of Venus"],
  "Tierra": ["Earth", "Atmosphere of Earth", "Earth's magnetic field", "Earth's core", "Earth's mantle", "Plate tectonics", "Moon", "Apollo 8", "International Space Station", "Earth observation satellite", "The Blue Marble", "Pale Blue Dot", "Water distribution on Earth", "Biosphere", "Earth's rotation"],
  "Marte": ["Mars", "Olympus Mons", "Valles Marineris", "Curiosity (rover)", "Perseverance (rover)", "Mars Reconnaissance Orbiter", "Phobos (moon)", "Deimos (moon)", "Water on Mars", "Atmosphere of Mars", "Mars Polar Lander", "Viking program", "Mars Science Laboratory", "Terraforming of Mars", "Exploration of Mars"],
  "Júpiter": ["Jupiter", "Great Red Spot", "Galilean moons", "Io (moon)", "Europa (moon)", "Ganymede (moon)", "Callisto (moon)", "Juno (spacecraft)", "Galileo project", "Magnetosphere of Jupiter", "Atmosphere of Jupiter", "Rings of Jupiter", "Comet Shoemaker–Levy 9", "Exploration of Jupiter", "Gas giant"],
  "Saturno": ["Saturn", "Rings of Saturn", "Titan (moon)", "Enceladus", "Cassini–Huygens", "Saturn's hexagon", "Atmosphere of Saturn", "Magnetosphere of Saturn", "Mimas (moon)", "Iapetus (moon)", "Rhea (moon)", "Pioneer 11", "Voyager 1", "Exploration of Saturn", "Gas giant"],
  "Urano": ["Uranus", "Rings of Uranus", "Atmosphere of Uranus", "Moons of Uranus", "Titania (moon)", "Oberon (moon)", "Miranda (moon)", "Ariel (moon)", "Umbriel (moon)", "Voyager 2", "Magnetosphere of Uranus", "Ice giant", "Exploration of Uranus", "Discovery of Uranus", "Climate of Uranus"],
  "Neptuno": ["Neptune", "Great Dark Spot", "Triton (moon)", "Rings of Neptune", "Atmosphere of Neptune", "Voyager 2", "Magnetosphere of Neptune", "Ice giant", "Discovery of Neptune", "Exploration of Neptune", "Proteus (moon)", "Nereid (moon)", "Despina (moon)", "Galatea (moon)", "Larissa (moon)"],
  "Plutón": ["Pluto", "Charon (moon)", "New Horizons", "Kuiper belt", "Dwarf planet", "Atmosphere of Pluto", "Tombaugh Regio", "Nix (moon)", "Hydra (moon)", "Kerberos (moon)", "Styx (moon)", "Discovery of Pluto", "Exploration of Pluto", "Sputnik Planitia", "Pluto system"],
  "Agujero Negro": ["Black hole", "Event Horizon Telescope", "Sagittarius A*", "Supermassive black hole", "Stellar black hole", "Accretion disk", "Event horizon", "Hawking radiation", "Gravitational wave", "LIGO", "Schwarzschild radius", "Spaghettification", "Cygnus X-1", "Microquasar", "Black hole thermodynamics"],
  "Cuásar": ["Quasar", "Active galactic nucleus", "Supermassive black hole", "3C 273", "Blazar", "Radio galaxy", "Accretion disk", "Astrophysical jet", "Redshift", "Galaxy formation and evolution", "Intergalactic medium", "Seyfert galaxy", "QSO", "Cosmic microwave background", "Hubble Space Telescope"],
  "Púlsar": ["Pulsar", "Neutron star", "Jocelyn Bell Burnell", "Crab Pulsar", "Millisecond pulsar", "Magnetar", "Pulsar wind nebula", "Vela Pulsar", "Hulse–Taylor binary", "Gravitational wave", "Lense–Thirring effect", "Neutron star merger", "X-ray pulsar", "Radio telescope", "Pulsar timing array"],
  "Enana Roja": ["Red dwarf", "Proxima Centauri", "TRAPPIST-1", "Gliese 581", "Stellar flare", "Main sequence", "Hertzsprung–Russell diagram", "Habitable zone", "Exoplanet", "Stellar magnetic field", "Convection zone", "Stellar evolution", "Brown dwarf", "M-type star", "Milky Way"],
  "Enana Blanca": ["White dwarf", "Sirius", "Chandrasekhar limit", "Electron degeneracy pressure", "Planetary nebula", "Type Ia supernova", "Stellar evolution", "Procyon", "Carbon detonation", "Helium flash", "Thermal pulses", "Black dwarf", "WD 1145+017", "Asteroid", "Stellar remnant"],
  "Agujero de Gusano": ["Wormhole", "General relativity", "Theory of relativity", "Albert Einstein", "Nathan Rosen", "Spacetime", "Quantum mechanics", "Exotic matter", "Time travel", "Kip Thorne", "String theory", "Cosmic string", "White hole", "Alcubierre drive", "Interstellar travel"],
  "Animales en el Espacio": ["Animals in space", "Soviet space dogs", "Monkeys and apes in space", "Zond 5", "Biosatellite program", "Bion space program", "Tardigrade", "Fruit flies in space", "Space medicine", "Weightlessness", "Microgravity", "Space suit", "V-2 rocket", "Space Race", "Astrobiology"],
  "Mamíferos en el Espacio": ["Animals in space", "Monkeys and apes in space", "Space medicine", "Weightlessness", "Microgravity", "Space suit", "Biosatellite program", "Bion space program", "Space Race", "Astrobiology", "Soviet space dogs", "V-2 rocket", "Enos (chimpanzee)", "Sam (rhesus macaque)", "Miss Baker"],
  "Simio Albert y Simio Ham": ["Monkeys and apes in space", "Ham (chimpanzee)", "Albert II (monkey)", "V-2 rocket", "Mercury-Redstone 2", "Project Mercury", "Space Race", "Space medicine", "Weightlessness", "Microgravity", "Space suit", "Holloman Air Force Base", "Cape Canaveral Space Force Station", "Splashdown", "Astrobiology"],
  "Laika": ["Laika", "Sputnik 2", "Soviet space dogs", "Space Race", "Soviet space program", "Belka and Strelka", "Korabl-Sputnik 2", "R-7 Semyorka", "Space medicine", "Weightlessness", "Microgravity", "Space suit", "Astrobiology", "Vostok programme", "Yuri Gagarin"],
  "Gatos en el espacio": ["Félicette", "Animals in space", "French space program", "Véronique (rocket)", "Space Race", "Space medicine", "Weightlessness", "Microgravity", "Space suit", "Astrobiology", "CNES", "Sahara", "Hammaguir", "Electroencephalography", "Animal testing"],
  "Asteroides": ["Asteroid", "Asteroid belt", "Ceres (dwarf planet)", "4 Vesta", "2 Pallas", "10 Hygiea", "Near-Earth object", "Impact event", "Asteroid mining", "OSIRIS-REx", "Hayabusa2", "Dawn (spacecraft)", "Meteorite", "Impact crater", "Yarkovsky effect"],
  "Meteoros": ["Meteoroid", "Meteor shower", "Perseids", "Leonids", "Geminids", "Meteorite", "Chelyabinsk meteor", "Tunguska event", "Impact crater", "Meteorite fall", "Tektite", "Bolide", "Near-Earth object", "Space debris", "Atmospheric entry"],
  "Cometas": ["Comet", "Halley's Comet", "Comet Hale–Bopp", "Comet Shoemaker–Levy 9", "Rosetta (spacecraft)", "Philae (spacecraft)", "Oort cloud", "Kuiper belt", "Coma (comet)", "Comet tail", "Meteor shower", "Great comet", "Sungrazing comet", "Extraterrestrial water", "Astrobiology"],
  "Sondas": ["Space probe", "Voyager 1", "Voyager 2", "Pioneer 10", "Pioneer 11", "New Horizons", "Cassini–Huygens", "Galileo project", "Juno (spacecraft)", "MESSENGER", "Dawn (spacecraft)", "Rosetta (spacecraft)", "Hayabusa2", "OSIRIS-REx", "Parker Solar Probe"],
  "Asteroide Apophis": ["99942 Apophis", "Near-Earth object", "Potentially hazardous object", "Asteroid impact avoidance", "Yarkovsky effect", "Arecibo Observatory", "Goldstone Deep Space Communications Complex", "Orbit", "Torino scale", "Palermo Technical Impact Hazard Scale", "Impact event", "Asteroid deflection strategies", "Gravity tractor", "Kinetic bombardment", "Space debris"]
};

async function getWikiImage(title) {
  try {
    const res = await fetch('https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=pageimages&format=json&pithumbsize=1000', {
      headers: { 'User-Agent': 'SpaceCampBot/1.0 (raesc89@gmail.com)' }
    });
    if (!res.ok) throw new Error('Status ' + res.status);
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pageId = Object.keys(data.query.pages)[0];
      if (data.query.pages[pageId].thumbnail) {
        return data.query.pages[pageId].thumbnail.source;
      }
    }
  } catch (e) {
    console.error('Wiki API Error for', title, e.message);
  }
  return null;
}

async function run() {
  const code = fs.readFileSync('lib/courseData.js', 'utf8');
  const tempFile = 'lib/courseData_temp_wiki.js';
  fs.writeFileSync(tempFile, code.replace('export const COURSE_DATA =', 'module.exports ='));
  const COURSE_DATA = require('./lib/courseData_temp_wiki.js');
  fs.unlinkSync(tempFile);

  const globalUsedImages = new Set();
  
  for (let i = 0; i < COURSE_DATA.length; i++) {
    const moduleData = COURSE_DATA[i];
    console.log('Procesando:', moduleData.titleEs);
    
    if (!moduleData.contentEs || !moduleData.contentEs.sections) continue;
    
    const concepts = wikiMap[moduleData.titleEs] || [];
    
    for (let j = 0; j < moduleData.contentEs.sections.length; j++) {
      const section = moduleData.contentEs.sections[j];
      const concept = concepts[j] || "Space"; // Fallback concept
      
      let imgUrl = await getWikiImage(concept);
      
      // If we don't find an image, try a fallback search
      if (!imgUrl) {
         const searchRes = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(concept) + '&format=json', {
           headers: { 'User-Agent': 'SpaceCampBot/1.0 (raesc89@gmail.com)' }
         });
         if (!searchRes.ok) throw new Error('Search Status ' + searchRes.status);
         const searchData = await searchRes.json();
         if (searchData.query && searchData.query.search.length > 0) {
            imgUrl = await getWikiImage(searchData.query.search[0].title);
         }
      }
      
      // If still no image or it's duplicated globally, use a reliable fallback API that guarantees uniqueness
      if (!imgUrl || globalUsedImages.has(imgUrl)) {
        imgUrl = `https://picsum.photos/seed/${moduleData.id}_${j}/800/500`; // Guaranteed unique placeholder if Wikipedia fails entirely
      }
      
      section.image = imgUrl; // NEVER touch section.video
      globalUsedImages.add(imgUrl);
      
      await new Promise(r => setTimeout(r, 100)); // Respect API limits
    }
  }

  const newContent = `// Archivo maestro estático del curso
export const COURSE_DATA = ${JSON.stringify(COURSE_DATA, null, 2)};
`;

  fs.writeFileSync('lib/courseData.js', newContent, 'utf8');
  console.log('Mapeo semántico de imágenes de Wikipedia completado con éxito.');
}

run();
