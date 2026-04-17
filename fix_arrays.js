const fs = require('fs');
const { COURSE_DATA } = require('./lib/courseData.js');

COURSE_DATA.forEach(mod => {
  if (mod.id === 'asteroides_intro') {
    mod.titleEs = 'Asteroides';
    mod.titleEn = 'Asteroids';
    // Fill to 6
    while (mod.contentEs.sections.length < 6) {
      mod.contentEs.sections.push({
        title: 'El Cinturón Principal',
        text: 'Entre las órbitas rocosas de Marte y Júpiter se extiende el vasto Cinturón Principal. Un anillo disperso donde orbitan rocas heladas, minerales primordiales y polvo estelar sobrante de la creación de nuestro vecindario galáctico. Aunque en películas los asteroides chocan, en realidad están inmensamente separados entre sí.',
        image: '/assets/asteroide_hub_intro_1776401829457.png',
        style: 'normal'
      });
    }
  }

  if (mod.id === 'asteroides_cometas') {
    while (mod.contentEs.sections.length < 6) {
      mod.contentEs.sections.push({
        title: 'La Cola de Hielo y Polvo',
        text: 'Cuando la órbita altamente elíptica de un cometa lo incita a acercarse bruscamente al feroz calor del sol, el inestable hielo primordial comienza una sublimación agresiva que dispara gas y polvo en sentido contrario a su trayectoria de giro, destellando a lo largo del sistema y regalándonos el famoso efecto luminoso cósmico.',
        image: '/assets/asteroide_hub_cometas_1776401858841.png',
        style: 'normal'
      });
    }
  }

  if (mod.id === 'asteroides_apophis') {
    while (mod.contentEs.sections.length < 6) {
      mod.contentEs.sections.push({
        title: 'Defensa Planetaria Activa',
        text: 'A raíz del descubrimiento de Apophis, las agencias espaciales han acelerado el desarrollo de protocolos de Defensa Planetaria usando tecnología balística de desvió kinético.',
        image: '/assets/asteroides_apophis_1776401895084.png',
        style: 'highlight'
      });
    }
  }

  // Adjust sondas to 6 exact if it's 9.
  if (mod.id === 'asteroides_sondas') {
    if (mod.contentEs.sections.length > 6) {
      mod.contentEs.sections = mod.contentEs.sections.slice(0, 6);
    }
  }

  // Adjust meteoros to 6
  if (mod.id === 'asteroides_meteoros') {
    if (mod.contentEs.sections.length > 6) {
      mod.contentEs.sections = mod.contentEs.sections.slice(0, 6);
    }
  }
});

const output = 'export const COURSE_DATA = ' + JSON.stringify(COURSE_DATA, null, 2) + ';\n';
fs.writeFileSync('lib/courseData.js', output);
console.log('Matrix 6x6 Applied!');
