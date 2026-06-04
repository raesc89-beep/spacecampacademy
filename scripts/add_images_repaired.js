/**
 * add_images_to_repaired.js
 * Adds the "images" array to modules that were repaired and lost their images.
 * Images are inserted inside contentEs, after the sections array.
 */
const fs = require('fs');
const path = require('path');
const { getModuleChunk } = require('./patch_universal');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

// 15 Wikipedia images relevant to each course topic
const IMAGE_SETS = {
  // Area 51 - military aviation, secret tech
  area51: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lockheed_U-2.jpg/800px-Lockheed_U-2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/SR-71_Blackbird.jpg/800px-SR-71_Blackbird.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/F-117_Nighthawk.JPEG/800px-F-117_Nighthawk.JPEG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/B-2_Spirit.jpg/800px-B-2_Spirit.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Nevada_Test_Site.jpg/800px-Nevada_Test_Site.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Cold_War_Map.jpg/800px-Cold_War_Map.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Roswell_UFO_museum.jpg/800px-Roswell_UFO_museum.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Titanium_crystals.jpg/800px-Titanium_crystals.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Stealth_technology.jpg/800px-Stealth_technology.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Radar_dish.jpg/800px-Radar_dish.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/800px-The_Earth_seen_from_Apollo_17.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Milky_Way_Arch.jpg/800px-Milky_Way_Arch.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Summer_triangle.jpg/800px-Summer_triangle.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/640px-Camponotus_flavomarginatus_ant.jpg"
  ],
  // Apollo 8 - first lunar orbit
  apollo8: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/NASA_Apollo_8_Dec_24_1968.jpg/800px-NASA_Apollo_8_Dec_24_1968.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Earth_from_Apollo_8.jpg/800px-Earth_from_Apollo_8.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/800px-The_Earth_seen_from_Apollo_17.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Saturn_V_rocket.jpg/800px-Saturn_V_rocket.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Apollo_8_launch.jpg/800px-Apollo_8_launch.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Milky_Way_Arch.jpg/800px-Milky_Way_Arch.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Summer_triangle.jpg/800px-Summer_triangle.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Moon_landing_AS11-40-5931.jpg/800px-Moon_landing_AS11-40-5931.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lunar_surface.jpg/800px-Lunar_surface.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Kennedy_Space_Center.jpg/800px-Kennedy_Space_Center.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Apollo_CM_diagram.png/800px-Apollo_CM_diagram.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Astronaut_EVA.jpg/800px-Astronaut_EVA.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Apollo_mission_control.jpg/800px-Apollo_mission_control.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Borman_Lovell_Anders.jpg/800px-Borman_Lovell_Anders.jpg"
  ],
  // Apollo 10 - dress rehearsal
  apollo10: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Apollo_10_Snoopy_LM.jpg/800px-Apollo_10_Snoopy_LM.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/800px-The_Earth_seen_from_Apollo_17.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Saturn_V_rocket.jpg/800px-Saturn_V_rocket.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Milky_Way_Arch.jpg/800px-Milky_Way_Arch.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Moon_landing_AS11-40-5931.jpg/800px-Moon_landing_AS11-40-5931.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lunar_surface.jpg/800px-Lunar_surface.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Summer_triangle.jpg/800px-Summer_triangle.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Kennedy_Space_Center.jpg/800px-Kennedy_Space_Center.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Apollo_CM_diagram.png/800px-Apollo_CM_diagram.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Astronaut_EVA.jpg/800px-Astronaut_EVA.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Apollo_mission_control.jpg/800px-Apollo_mission_control.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lockheed_U-2.jpg/800px-Lockheed_U-2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/NASA_Apollo_8_Dec_24_1968.jpg/800px-NASA_Apollo_8_Dec_24_1968.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Earth_from_Apollo_8.jpg/800px-Earth_from_Apollo_8.jpg"
  ]
};

function addImages(src, moduleId, images) {
  const info = getModuleChunk(src, moduleId);
  if (!info) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const { modStart, chunk } = info;
  
  // Check if images already exist
  if (chunk.includes('"images"')) {
    console.log(`${moduleId} already has images`);
    return src;
  }
  
  // Find contentEs closing brace (after sections)
  const contentEsIdx = chunk.indexOf('"contentEs"');
  const cOpen = chunk.indexOf('{', contentEsIdx);
  let d3 = 0, k = cOpen;
  while (k < chunk.length) {
    if (chunk[k] === '{') d3++;
    else if (chunk[k] === '}') { d3--; if (d3 === 0) break; }
    k++;
  }
  // Insert images before the contentEs closing brace
  const insertAt = modStart + k;
  const imgStr = ',\n      "images": ' + JSON.stringify(images, null, 8);
  src = src.slice(0, insertAt) + imgStr + src.slice(insertAt);
  console.log(`✅ Added images to ${moduleId}`);
  return src;
}

// Add to area51 modules
['area51_m1','area51_m2','area51_m3','area51_m4','area51_m5'].forEach(id => {
  src = addImages(src, id, IMAGE_SETS.area51);
});

// Add to apollo8 modules
['apollo8_m1','apollo8_m2'].forEach(id => {
  src = addImages(src, id, IMAGE_SETS.apollo8);
});

// Add to apollo10 modules
src = addImages(src, 'apollo10_m1', IMAGE_SETS.apollo10);

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ Images added to all repaired modules!');
