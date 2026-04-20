
const fs = require('fs');
let code = fs.readFileSync('components/games/LaikaFinder.js', 'utf8');

const newChallenges = \const CHALLENGES = [
  {
    riddle: '1. IGNICIÓN: El poderoso R-7 vuela hacia las estrellas despidiendo fuego, pero hay un problema. Un diminuto tubo de presurización tiene una fuga de vapor frío en la aleta más baja del extremo derecho del cohete. Señálalo.',
    imageUrl: '/assets/animales/laika_challenge_1.png', 
    targetX: 83, 
    targetY: 92, 
    radius: 6 
  },
  {
    riddle: '2. ÓRBITA SOLITARIA: La oscura inmensidad rodea el satélite, pero los sensores ópticos de largo alcance han identificado el brillo de una galaxia con forma espiral minúscula escondida en la esquina superior izquierda del cosmos.',
    imageUrl: '/assets/animales/laika_challenge_2.png', 
    targetX: 8, 
    targetY: 12, 
    radius: 6 
  },
  {
    riddle: '3. EL LEGADO ETERNO: Más allá del rostro de bronce, el tiempo ha marcado un desperfecto arquitectónico. Localiza la pequeña grieta esculpida en la base del pilar inferior izquierdo del monumento.',
    imageUrl: '/assets/animales/laika_challenge_3.png', 
    targetX: 25, 
    targetY: 88, 
    radius: 6 
  },
  {
    riddle: '4. COLONIA MARCIANA: Entre la magnitud de las biosferas naranjas, busca al Ingeniero Principal que repara la antena parabólica colapsada en el techo del domo lejano de la extrema derecha.',
    imageUrl: '/assets/mars_human_colony_dome.png', 
    targetX: 92, 
    targetY: 83, 
    radius: 5 
  },
  {
    riddle: '5. RADAR EXÓTICO: La cápsula Venera escanea la infernal superficie de Venus amarilla. Detecta el pequeño cráter humeante que se esconde cerca del destello de azufre en el borde hiper-derecho.',
    imageUrl: '/assets/venera_probe_venus.png', 
    targetX: 88, 
    targetY: 92, 
    radius: 5
  }
];\

code = code.replace(/const CHALLENGES = \[[\s\S]*?\];/m, newChallenges);
fs.writeFileSync('components/games/LaikaFinder.js', code);
console.log('Retos de Laika ajustados para Dificultad Extrema (Radio: ~5)');

