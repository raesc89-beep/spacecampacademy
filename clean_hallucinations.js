const fs = require('fs');

const path = 'lib/courseData.js';
let content = fs.readFileSync(path, 'utf8');

// The hallucinated parts start mostly in asteroides_meteoros quiz, asteroides_cometas, asteroides_sondas, asteroides_apophis.
// I will replace their entire content objects safely using regex or string replacement, or since courseData is an array of objects exported as default, I can just require it, modify the objects, and rewrite it. BUT it relies on ES6 export default.

// Instead, I'll just write a script that does a controlled replacement of the quiz and text strings, removing all the repeated garbage words:
// "atenta", "pacientemente", "sutil", "majestuosa", "majestuosamente", "gloriosa", "gloriosamente", "asombrosa", "milenaria", "valiosa", "valerosa", "de a", "y atenta", "a a"

const badWords = [
  " pacientemente", " atenta", " sutil", " majestuosa", " majestuosamente", " majestuosísima", " gloriosa", " gloriosamente", " asombrosa", " asombrosamente", " milenaria", " milenario", " valiosa", " valerosa", " pálida", " gélida", " mística", " maravillosamente", " maravillosos", " maravillosa", " majestuosísimamente"
];

let cleaned = content;
badWords.forEach(word => {
  const regex = new RegExp(`(?<=\\s)${word.trim()}\\b`, 'gi');
  cleaned = cleaned.replace(regex, '');
});

// Fix double spaces
cleaned = cleaned.replace(/ +/g, ' ');
// Fix weird "de de", "a a"
cleaned = cleaned.replace(/\bde de\b/gi, 'de');
cleaned = cleaned.replace(/\ba a\b/gi, 'a');
cleaned = cleaned.replace(/\by y\b/gi, 'y');
cleaned = cleaned.replace(/\bla la\b/gi, 'la');
cleaned = cleaned.replace(/\bel el\b/gi, 'el');
cleaned = cleaned.replace(/\ben en\b/gi, 'en');

fs.writeFileSync(path, cleaned);
console.log('Limpiado exitosamente el lenguaje alucinado.');
