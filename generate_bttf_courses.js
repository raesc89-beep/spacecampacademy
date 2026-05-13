const fs = require('fs');

const raw = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = raw.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Find and remove old 'ciencia_volver_al_futuro' if it exists
const oldIndex = data.findIndex(m => m.id === 'ciencia_volver_al_futuro');
if (oldIndex !== -1) {
    data.splice(oldIndex, 1);
}

// Ensure the new ones don't already exist
data = data.filter(m => !m.id.startsWith('bttf_m'));

const bttfModules = [
  { id: 'bttf_m1', title: 'El Condensador de Flujo', desc: 'Descubre los fundamentos de la fisión nuclear y la física cuántica detrás del dispositivo que hace posible los viajes en el tiempo.' },
  { id: 'bttf_m2', title: 'Viajes en el Tiempo', desc: 'Explorando la Teoría de la Relatividad Especial de Einstein y cómo la velocidad y la gravedad alteran el flujo del tiempo real.' },
  { id: 'bttf_m3', title: 'Paradojas Temporales', desc: 'Análisis de la paradoja del abuelo, líneas de tiempo divergentes y la teoría de los universos paralelos de Hugh Everett.' },
  { id: 'bttf_m4', title: 'Energía a 1.21 Gigawatts', desc: 'La ingeniería eléctrica de los rayos y cómo generar y canalizar cantidades colosales de energía en un instante.' },
  { id: 'bttf_m5', title: 'Aeropatines y Antigravedad', desc: 'El uso de superconductores, levitación magnética (Maglev) y los desafíos de crear flotación sin fricción en el mundo real.' },
  { id: 'bttf_m6', title: 'La Máquina del Tiempo', desc: 'Termodinámica y aerodinámica: la ciencia de alcanzar 88 millas por hora y el estrés estructural en los metales como el acero inoxidable.' },
  { id: 'bttf_m7', title: 'Biotecnología del Futuro', desc: '¿Se puede detener el envejecimiento? Explorando terapias genéticas, células madre y las promesas de la medicina regenerativa.' },
];

const newCourses = bttfModules.map((mod, i) => ({
    id: mod.id,
    hub: 'bttf',
    title: mod.title,
    description: mod.desc,
    badgeId: `bttf_badge_${i + 1}`,
    contentEs: {
        title: mod.title,
        sections: [
            {
                id: `bttf_sec_${i + 1}`,
                title: mod.title,
                text: [ mod.desc ],
                image: `/assets/bttf/bttf_m${i+1}.png`
            }
        ]
    }
}));

data.push(...newCourses);

fs.writeFileSync('lib/courseData.js',
    'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n',
    { encoding: 'utf8' }
);
console.log('Inserted 7 BTTF modules.');
