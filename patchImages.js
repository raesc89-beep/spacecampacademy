const fs = require('fs');

const replacements = [
  "/assets/quasar_1.png", "/assets/quasar_2.png", "/assets/quasar_3.png",
  "/assets/pulsar_1.png", "/assets/pulsar_2.png", "/assets/pulsar_3.png",
  "/assets/red_dwarf_1.png", "/assets/red_dwarf_2.png", "/assets/red_dwarf_3.png",
  "/assets/white_dwarf_1.png", "/assets/white_dwarf_2.png", "/assets/white_dwarf_3.png",
  "/assets/wormhole_1.png", "/assets/wormhole_2.png", "/assets/wormhole_3.png"
];

let content = fs.readFileSync('lib/courseData.js', 'utf8');

const regex = /https:\/\/images\.unsplash\.com[^"]+/g;
const matches = content.match(regex);
console.log("Found matches:", matches ? matches.length : 0);

if (matches && matches.length === replacements.length) {
    let index = 0;
    content = content.replace(regex, () => {
        return replacements[index++];
    });
    fs.writeFileSync('lib/courseData.js', content);
    console.log("Successfully replaced all images!");
} else {
    console.log("Warning: Number of matches does not equal exactly 15! We found", matches ? matches.length : 0);
}
