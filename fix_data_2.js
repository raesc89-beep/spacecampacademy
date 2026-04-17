const fs = require('fs');

const f1 = 'lib/courseData.js';
let c1 = fs.readFileSync(f1, 'utf8');

c1 = c1.replace(/\/assets\/cartoon_pluto\.png/g, '/assets/pluto_tombaugh_regio_2_1775540698119.png');

// En lugar de regex complejo, evaluamos el código y re-escribimos el módulo (peligroso por los exports, mejor usar replace simple)
c1 = c1.replace(/titleEs:\s*'Asteroides y Cometas'/, "titleEs: 'Asteroides'");

// Expandir Apophis: Buscar el final del array de secciones de Apophis y añadir las dos que faltan
const apophisInsert = `
  {
    title: 'Defensa Planetaria Activa',
    text: 'A raíz del descubrimiento de Apophis, las agencias espaciales han acelerado el desarrollo de protocolos de Defensa Planetaria. Misiones como DART, que ya probó desviar intencionalmente la trayectoria de otro asteroide (Dimorphos), son la prueba de que hoy contamos con la tecnología de intervención dinámica para desviar cualquier amenaza de impacto inminente.',
    style: 'highlight'
  },
  {
    title: 'Impacto Teórico Simulador',
    text: 'Si Apophis llegara a impactar con la Tierra bajo un escenario simulado, liberaría la energía de miles de megatones. Aunque no causaría un invierno global con extinción masiva, la devastación continental requeriría esfuerzos globales de recuperación masiva. Afortunadamente, sus posibilidades de impacto para las próximas décadas han sido descartadas.',
    style: 'normal'
  }
];`;

c1 = c1.replace(/style:\s*'highlight'\s*}\s*\]/, "style: 'highlight'\n  }," + apophisInsert);

fs.writeFileSync(f1, c1);
console.log('Fixed Apophis, Asteroides, and Pluto!');
