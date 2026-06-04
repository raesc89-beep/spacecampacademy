const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../components/games/XenoPaleontologia.js');
let content = fs.readFileSync(targetFile, 'utf8');

const newFossilsArray = `
// ─────────────────────────────────────────────────────────────
// FOSSILS array — 8 total
// ─────────────────────────────────────────────────────────────
const FOSSILS = [
  {
    name: 'Amonita Alienígena',
    imagePath: '/assets/fossils/fossil_amonita.png',
    color: '#8B4513', glow: '#D4692A',
    hint: 'Cefalópodo espiral con caparazón bio-luminiscente que emitía luz en océanos de amoníaco.',
    pts: 350
  },
  {
    name: 'Esqueleto del Visitante',
    imagePath: '/assets/fossils/fossil_esqueleto.png',
    color: '#C8C8C8', glow: '#00FFFF',
    hint: 'Restos óseos de un humanoide de cráneo grande, adaptado a gravedad cero y telepatía.',
    pts: 500
  },
  {
    name: 'Leviatán del Vacío',
    imagePath: '/assets/fossils/fossil_ballena.png',
    color: '#1A4A6B', glow: '#00DDFF',
    hint: 'Gigantesca criatura que filtraba polvo estelar para alimentarse en nebulosas frías.',
    pts: 600
  },
  {
    name: 'Hongo de Esporas Cuánticas',
    imagePath: '/assets/fossils/fossil_hongo.png',
    color: '#4a2a6a', glow: '#aa44ff',
    hint: 'Fósil de flora fúngica capaz de interconectar biomas enteros a través de micelio cuántico.',
    pts: 300
  },
  {
    name: 'Artrópodo Magmático',
    imagePath: '/assets/fossils/fossil_escorpion.png',
    color: '#5a2a0a', glow: '#ff6622',
    hint: 'Depredador blindado que nadaba en ríos de lava, con una cola de aguijón termo-tóxico.',
    pts: 450
  },
  {
    name: 'Gusano Devorador de Rocas',
    imagePath: '/assets/fossils/fossil_gusano.png',
    color: '#2a4a2a', glow: '#44ee44',
    hint: 'Colosal anélido subterráneo con fauces circulares dentadas para triturar cuarzo alienígena.',
    pts: 550
  },
  {
    name: 'Cazador Atmosférico',
    imagePath: '/assets/fossils/fossil_pterodactilo.png',
    color: '#3a3a6a', glow: '#8888ff',
    hint: 'Reptil volador fosilizado con alas cristalinas para surcar tormentas de gas tóxico.',
    pts: 480
  },
  {
    name: 'Cefalópodo del Cristal',
    imagePath: '/assets/fossils/fossil_pulpo.png',
    color: '#3a1a5a', glow: '#cc44ff',
    hint: 'Entidad cefalópoda con tentáculos cristalinos que manipulaba las ondas gravitacionales.',
    pts: 520
  }
];

const TOTAL_LEVELS = FOSSILS.length;
`;

const startIndex = content.indexOf('// ─────────────────────────────────────────────────────────────\n// Custom draw helpers');
const endIndex = content.indexOf('const TOTAL_LEVELS = FOSSILS.length;') + 'const TOTAL_LEVELS = FOSSILS.length;'.length;

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newFossilsArray + content.substring(endIndex);
  
  // Now modify the XenoPaleontologia component to handle preloading
  const componentStart = content.indexOf('export default function XenoPaleontologia({ onComplete }) {');
  
  const stateHooksInsert = `
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedImagesRef = useRef({});

  useEffect(() => {
    let loadedCount = 0;
    FOSSILS.forEach(f => {
      const img = new window.Image();
      img.src = f.imagePath;
      img.onload = () => {
        loadedImagesRef.current[f.name] = img;
        loadedCount++;
        if (loadedCount === FOSSILS.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error('Error loading fossil image:', f.imagePath);
        loadedCount++;
        if (loadedCount === FOSSILS.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);
`;
  
  content = content.replace(
    'export default function XenoPaleontologia({ onComplete }) {',
    'export default function XenoPaleontologia({ onComplete }) {' + stateHooksInsert
  );

  // Replace Early Return to wait for images
  content = content.replace(
    "return (\\n    <div style={{ background: 'rgba(0,0,0,0.9)',",
    `
  if (!imagesLoaded) {
    return (
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', borderRadius: '20px', border: '1px solid rgba(0,228,255,0.4)', color: '#00E4FF', fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Loader2 size={32} className="animate-spin" />
          <span>Sincronizando Holo-Fósiles con la base de datos...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'rgba(0,0,0,0.9)`
  );

  // Add Loader2 to imports if not there
  if (!content.includes('Loader2')) {
    content = content.replace('X, ChevronRight', 'X, ChevronRight, Loader2');
  }

  // Replace Canvas Draw Fossil Logic
  const canvasDrawFossilMatch = `      // Fossil
      if (currentFossil.customDraw) {
        currentFossil.customDraw(ctx, FOSSIL_CX, FOSSIL_CY, 1);
      } else {
        ctx.translate(FOSSIL_CX, FOSSIL_CY);
        ctx.fillStyle = currentFossil.color;
        ctx.shadowColor = currentFossil.glow;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        currentFossil.path.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
        ctx.closePath();
        ctx.fill();
      }`;
      
  const newCanvasDrawFossil = `      // Fossil Image Draw
      const currentImage = loadedImagesRef.current[currentFossil.name];
      if (currentImage) {
        ctx.save();
        ctx.translate(FOSSIL_CX, FOSSIL_CY);
        ctx.shadowColor = currentFossil.glow;
        ctx.shadowBlur = 40;
        ctx.globalCompositeOperation = 'lighter';
        const iw = 180, ih = 180;
        ctx.drawImage(currentImage, -iw/2, -ih/2, iw, ih);
        ctx.restore();
      }`;

  content = content.replace(canvasDrawFossilMatch, newCanvasDrawFossil);

  // Replace Discovery Animation Draw Fossil Logic
  const discAnimMatch = `        if (currentFossil.customDraw) {
          currentFossil.customDraw(ctx, FOSSIL_CX, FOSSIL_CY, 1);
        } else {
          ctx.globalAlpha = 1;
          ctx.translate(FOSSIL_CX, FOSSIL_CY);
          ctx.fillStyle = currentFossil.color;
          ctx.shadowColor = currentFossil.glow;
          ctx.shadowBlur = 30;
          ctx.beginPath();
          currentFossil.path.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
          ctx.closePath();
          ctx.fill();
        }`;
        
  const newDiscAnimMatch = `        const currentImage = loadedImagesRef.current[currentFossil.name];
        if (currentImage) {
          ctx.globalCompositeOperation = 'lighter';
          ctx.shadowColor = currentFossil.glow;
          ctx.shadowBlur = 40;
          const iw = 180, ih = 180;
          ctx.drawImage(currentImage, -iw/2, -ih/2, iw, ih);
        }`;

  content = content.replace(discAnimMatch, newDiscAnimMatch);

  // Replace Vitrina Preview Canvas Logic
  const vitrinaMatch = `                      if (currentFossil.customDraw) {
                        currentFossil.customDraw(vctx, 90, 90, 1);
                      } else {
                        vctx.translate(90, 90);
                        vctx.fillStyle = currentFossil.color;
                        vctx.shadowColor = currentFossil.glow;
                        vctx.shadowBlur = 20;
                        vctx.beginPath();
                        currentFossil.path.forEach(([px, py], i) => i === 0 ? vctx.moveTo(px, py) : vctx.lineTo(px, py));
                        vctx.closePath();
                        vctx.fill();
                      }`;
                      
  const newVitrinaMatch = `                      const currentImage = loadedImagesRef.current[currentFossil.name];
                      if (currentImage) {
                        vctx.globalCompositeOperation = 'lighter';
                        vctx.shadowColor = currentFossil.glow;
                        vctx.shadowBlur = 30;
                        const iw = 150, ih = 150;
                        vctx.translate(90, 90);
                        vctx.drawImage(currentImage, -iw/2, -ih/2, iw, ih);
                      }`;
                      
  content = content.replace(vitrinaMatch, newVitrinaMatch);

  fs.writeFileSync(targetFile, content, 'utf8');
  console.log("XenoPaleontologia rewritten successfully.");
} else {
  console.error("Could not find start/end bounds for customDraws");
}
