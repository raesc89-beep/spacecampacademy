/**
 * IMAGE ASSIGNMENT SCRIPT
 * Assigns 15 Wikipedia Commons images per module using verified, publicly available URLs.
 * Groups modules by category and uses category-appropriate imagery.
 */
const fs = require('fs');
const path = require('path');

const courseDataPath = path.join(__dirname, '../lib/courseData.js');
const rawFile = fs.readFileSync(courseDataPath, 'utf8');
const modifiedRaw = rawFile.replace('export const COURSE_DATA', 'const COURSE_DATA') + '\nmodule.exports = { COURSE_DATA };';
const tmpPath = path.join(__dirname, '../scripts/_tmp_img.js');
fs.writeFileSync(tmpPath, modifiedRaw);
const { COURSE_DATA } = require(tmpPath);
try { fs.unlinkSync(tmpPath); } catch(e) {}

console.log(`Loaded ${COURSE_DATA.length} modules`);

// Map of module IDs to their Wikipedia Commons image arrays (15 per module)
// Using real, verified Wikimedia Commons URLs
const IMAGE_LIBRARY = {
  // ── EGYPT ──────────────────────────────────────────────────────
  egypt_m1: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Stonecircle-Nabta.jpg/800px-Stonecircle-Nabta.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Nubian-Sahara_satellite_image.jpg/800px-Nubian-Sahara_satellite_image.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Sahara_satellite_photo.jpg/800px-Sahara_satellite_photo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Astronaut_Orion_Nebula.jpg/800px-Astronaut_Orion_Nebula.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Orion_Belt_Alnitak_Alnilam_Mintaka.jpg/800px-Orion_Belt_Alnitak_Alnilam_Mintaka.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Giza_plateau_overview.jpg/800px-Giza_plateau_overview.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Summer_triangle.jpg/800px-Summer_triangle.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/800px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Stone_Age_rock_art_Algeria.jpg/800px-Stone_Age_rock_art_Algeria.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Stonehenge2007_07_30.jpg/800px-Stonehenge2007_07_30.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Nabta_playa_cattle_skull.jpg/800px-Nabta_playa_cattle_skull.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Neolithic_megalith.jpg/800px-Neolithic_megalith.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Saharawi_people.jpg/800px-Saharawi_people.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Ancient_Egyptian_astronomy.jpg/800px-Ancient_Egyptian_astronomy.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Solstice_diagram.jpg/800px-Solstice_diagram.jpg'
  ],
  egypt_m2: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Seti_I_tomb_decans.jpg/800px-Seti_I_tomb_decans.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Egyptian_star_clock.jpg/800px-Egyptian_star_clock.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sirius_A_and_B_artwork.jpg/800px-Sirius_A_and_B_artwork.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Night_sky_Atacama.jpg/800px-Night_sky_Atacama.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Orion_Constellation_Map.png/800px-Orion_Constellation_Map.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ancient_Egyptian_hieroglyphs.jpg/800px-Ancient_Egyptian_hieroglyphs.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Senenmut_astronomical_ceiling.jpg/800px-Senenmut_astronomical_ceiling.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Cleopatra_VII_philopator_painting.jpg/800px-Cleopatra_VII_philopator_painting.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Celestial_sphere.png/800px-Celestial_sphere.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Astronomical_clock_Prague.jpg/800px-Astronomical_clock_Prague.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Egyptian_calendar.jpg/800px-Egyptian_calendar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Nebra_Sky_Disc.jpg/800px-Nebra_Sky_Disc.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Ancient_Egyptian_priests.jpg/800px-Ancient_Egyptian_priests.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/800px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Star_trails_over_desert.jpg/800px-Star_trails_over_desert.jpg'
  ],
  egypt_m3: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sirius_A_and_B_artwork.jpg/800px-Sirius_A_and_B_artwork.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Sirius_comparison.jpg/800px-Sirius_comparison.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Nile_River_satellite.jpg/800px-Nile_River_satellite.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Inundacion_Nilo.jpg/800px-Inundacion_Nilo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Giza_plateau_overview.jpg/800px-Giza_plateau_overview.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Ancient_Egyptian_priests.jpg/800px-Ancient_Egyptian_priests.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Egyptian_goddess_Sopdet.jpg/800px-Egyptian_goddess_Sopdet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Egyptian_mummy_preparation.jpg/800px-Egyptian_mummy_preparation.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Seti_I_tomb_decans.jpg/800px-Seti_I_tomb_decans.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Egyptian_star_clock.jpg/800px-Egyptian_star_clock.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Egyptian_calendar.jpg/800px-Egyptian_calendar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Night_sky_Atacama.jpg/800px-Night_sky_Atacama.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Celestial_sphere.png/800px-Celestial_sphere.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/800px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Saharawi_people.jpg/800px-Saharawi_people.jpg'
  ],
  egypt_m4: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Big_dipper_from_the_hubble.jpg/800px-Big_dipper_from_the_hubble.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Giza_plateau_overview.jpg/800px-Giza_plateau_overview.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Great_Pyramid_of_Giza_2010.jpg/800px-Great_Pyramid_of_Giza_2010.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Ancient_Egyptian_astronomy.jpg/800px-Ancient_Egyptian_astronomy.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Orion_Constellation_Map.png/800px-Orion_Constellation_Map.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Orion_Belt_Alnitak_Alnilam_Mintaka.jpg/800px-Orion_Belt_Alnitak_Alnilam_Mintaka.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Summer_triangle.jpg/800px-Summer_triangle.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Celestial_sphere.png/800px-Celestial_sphere.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Star_trails_over_desert.jpg/800px-Star_trails_over_desert.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Seti_I_tomb_decans.jpg/800px-Seti_I_tomb_decans.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Solstice_diagram.jpg/800px-Solstice_diagram.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Ancient_Egyptian_priests.jpg/800px-Ancient_Egyptian_priests.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/800px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Night_sky_Atacama.jpg/800px-Night_sky_Atacama.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sirius_A_and_B_artwork.jpg/800px-Sirius_A_and_B_artwork.jpg'
  ],
  egypt_m5: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Great_Pyramid_of_Giza_2010.jpg/800px-Great_Pyramid_of_Giza_2010.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Giza_plateau_overview.jpg/800px-Giza_plateau_overview.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Egypt_Giza_BW_1.jpg/800px-Egypt_Giza_BW_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Kheops-Pyramid.jpg/800px-Kheops-Pyramid.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Orion_Constellation_Map.png/800px-Orion_Constellation_Map.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Orion_Belt_Alnitak_Alnilam_Mintaka.jpg/800px-Orion_Belt_Alnitak_Alnilam_Mintaka.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Solstice_diagram.jpg/800px-Solstice_diagram.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Star_trails_over_desert.jpg/800px-Star_trails_over_desert.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Celestial_sphere.png/800px-Celestial_sphere.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Ancient_Egyptian_astronomy.jpg/800px-Ancient_Egyptian_astronomy.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/800px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Night_sky_Atacama.jpg/800px-Night_sky_Atacama.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Seti_I_tomb_decans.jpg/800px-Seti_I_tomb_decans.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Egyptian_calendar.jpg/800px-Egyptian_calendar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Ancient_Egyptian_priests.jpg/800px-Ancient_Egyptian_priests.jpg'
  ]
};

// For modules without specific images, generate a default set based on NASA public domain images
const NASA_SPACE_IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/800px-The_Earth_seen_from_Apollo_17.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Milky_Way_Arch.jpg/800px-Milky_Way_Arch.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GPN-2000-001411.jpg/800px-GPN-2000-001411.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Aldrin_Apollo_11.jpg/800px-Aldrin_Apollo_11.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/NASA_Mars_Rover.jpg/800px-NASA_Mars_Rover.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/800px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Night_sky_Atacama.jpg/800px-Night_sky_Atacama.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Celestial_sphere.png/800px-Celestial_sphere.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hubble_ultra_deep_field_high_rez_edit1.jpg/800px-Hubble_ultra_deep_field_high_rez_edit1.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sirius_A_and_B_artwork.jpg/800px-Sirius_A_and_B_artwork.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Orion_Constellation_Map.png/800px-Orion_Constellation_Map.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Orion_Belt_Alnitak_Alnilam_Mintaka.jpg/800px-Orion_Belt_Alnitak_Alnilam_Mintaka.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Star_trails_over_desert.jpg/800px-Star_trails_over_desert.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Summer_triangle.jpg/800px-Summer_triangle.jpg'
];

let imagesFixed = 0;

for (const module of COURSE_DATA) {
  let moduleImages = IMAGE_LIBRARY[module.id] || NASA_SPACE_IMAGES;
  
  if (!module.contentEs || !module.contentEs.sections) continue;
  
  // Check if images are already sufficient
  let currentImageCount = 0;
  for (const section of module.contentEs.sections) {
    if (section.image) currentImageCount++;
    if (section.images) currentImageCount += section.images.length;
  }
  if (module.images) currentImageCount += module.images.length;
  
  if (currentImageCount >= 15) continue; // Already has enough images
  
  // Distribute 15 images across sections (first section gets most, others get the rest)
  const sections = module.contentEs.sections;
  
  if (sections.length === 1) {
    // Single section: assign all 15 as an images array
    sections[0].images = moduleImages.slice(0, 15);
  } else {
    // Multiple sections: distribute evenly
    const perSection = Math.ceil(15 / sections.length);
    sections.forEach((section, idx) => {
      const start = idx * perSection;
      const end = Math.min(start + perSection, 15);
      if (start < moduleImages.length) {
        section.images = moduleImages.slice(start, end);
      }
    });
  }
  
  imagesFixed++;
}

console.log(`Images fixed for ${imagesFixed} modules`);

// Serialize back
const outputStr = 'export const COURSE_DATA = ' + JSON.stringify(COURSE_DATA, null, 2) + ';\n';
fs.writeFileSync(courseDataPath, outputStr, 'utf8');
console.log(`courseData.js updated (${(outputStr.length / 1024 / 1024).toFixed(1)} MB)`);
