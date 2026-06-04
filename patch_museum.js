/**
 * Patches XenoPaleontologia.js safely using line-number based replacement
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/games/XenoPaleontologia.js');
let src = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF for easier manipulation
src = src.replace(/\r\n/g, '\n');
const lines = src.split('\n');

console.log(`Total lines: ${lines.length}`);

// ── 1. Fix imports ──────────────────────────────────────────────────────────
const importIdx = lines.findIndex(l => l.includes("import { Clock, Star, Trophy"));
if (importIdx >= 0) {
  lines[importIdx] = "import { Clock, Star, Trophy, ChevronRight, ChevronLeft, Pickaxe } from 'lucide-react';";
  console.log(`✅ 1. Imports fixed at line ${importIdx + 1}`);
} else {
  console.log('⚠️  Imports line not found, checking...');
  lines.forEach((l, i) => { if (l.includes('lucide-react')) console.log(`  Line ${i+1}: ${l.trim()}`); });
}

// ── 2. Add museumIdx state ──────────────────────────────────────────────────
const showMuseumIdx = lines.findIndex(l => l.includes("const [showMuseum, setShowMuseum] = useState(false)"));
if (showMuseumIdx >= 0) {
  lines.splice(showMuseumIdx + 1, 0, "  const [museumIdx, setMuseumIdx] = useState(0); // current specimen in museum viewer");
  console.log(`✅ 2. museumIdx state added after line ${showMuseumIdx + 1}`);
} else {
  console.log('⚠️  showMuseum state not found');
}

// ── 3. Fix discovery overlay img mixBlendMode ───────────────────────────────
// Find the img in the discovering overlay and add mixBlendMode
const blendTarget = lines.findIndex(l => l.includes('drop-shadow(0 0 60px') && l.includes('88)'));
if (blendTarget >= 0) {
  // Insert mixBlendMode after
  const indentMatch = lines[blendTarget].match(/^(\s+)/);
  const indent = indentMatch ? indentMatch[1] : '                        ';
  lines.splice(blendTarget + 1, 0, `${indent}mixBlendMode: 'screen',`);
  console.log(`✅ 3. mixBlendMode added at line ${blendTarget + 2}`);
} else {
  console.log('⚠️  Discovery image blend target not found');
}

// ── 4. Replace museum AnimatePresence block ─────────────────────────────────
// Find start: line with "BRITISH MUSEUM"
const museumCommentLine = lines.findIndex(l => l.includes('BRITISH MUSEUM') || l.includes('PERSONAL COLLECTION'));
if (museumCommentLine < 0) {
  console.error('❌ Museum comment not found!');
  process.exit(1);
}

// Walk back to find the start of the comment block (the {/* line)
let blockStart = museumCommentLine;
while (blockStart > 0 && !lines[blockStart].includes('{/*')) blockStart--;
console.log(`  Museum block starts at line ${blockStart + 1}`);

// Find end: the closing </AnimatePresence> followed by empty line and {/* HUD
let blockEnd = museumCommentLine;
while (blockEnd < lines.length) {
  if (lines[blockEnd].includes('</AnimatePresence>') && 
      lines[blockEnd + 2] && lines[blockEnd + 2].includes('{/* HUD */}')) {
    break;
  }
  blockEnd++;
}
console.log(`  Museum block ends at line ${blockEnd + 1}`);

const newMuseumLines = `      {/* Museum Overlay — Single Specimen Viewer */}
      <AnimatePresence>
        {showMuseum && (() => {
          const currentSlot = FOSSILS[museumIdx];
          const currentCollected = museum.find(m => m.id === currentSlot.name);
          const collectedDate = currentCollected
            ? new Date(currentCollected.discoveredAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
            : null;
          const prevIdx = (museumIdx - 1 + FOSSILS.length) % FOSSILS.length;
          const nextIdx = (museumIdx + 1) % FOSSILS.length;
          const gR = parseInt(currentSlot.glow.slice(1,3),16);
          const gG = parseInt(currentSlot.glow.slice(3,5),16);
          const gB = parseInt(currentSlot.glow.slice(5,7),16);

          return (
            <motion.div key="museum-overlay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 100,
                display: 'flex', flexDirection: 'column',
                borderRadius: '20px', overflow: 'hidden',
                background: 'linear-gradient(180deg, #060414 0%, #0A0820 55%, #06101A 100%)',
                fontFamily: "'Georgia', serif",
              }}
            >
              {/* Header */}
              <div style={{
                padding: '0.8rem 1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(100,60,200,0.3)',
                background: 'rgba(10,5,30,0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 2, position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ fontSize: '1.4rem' }}>🏛️</div>
                  <div>
                    <div style={{ color: '#C8A84A', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', textShadow: '0 0 12px rgba(200,168,74,0.5)' }}>
                      Museo Xeno-Paleontológico
                    </div>
                    <div style={{ color: 'rgba(200,168,74,0.45)', fontSize: '0.6rem', letterSpacing: '0.06em' }}>
                      COLECCIÓN PRIVADA · {museum.length}/{TOTAL_LEVELS} ESPECÍMENES
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {FOSSILS.map((f, i) => {
                      const has = museum.some(m => m.id === f.name);
                      return (
                        <button key={i} onClick={() => setMuseumIdx(i)}
                          style={{
                            width: i === museumIdx ? 12 : 8, height: i === museumIdx ? 12 : 8,
                            borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                            background: i === museumIdx ? '#C8A84A' : has ? f.glow : 'rgba(255,255,255,0.12)',
                            transition: 'all 0.25s',
                            boxShadow: i === museumIdx ? \`0 0 8px \${currentSlot.glow}\` : 'none',
                          }}
                        />
                      );
                    })}
                  </div>
                  <button onClick={() => setShowMuseum(false)}
                    style={{
                      background: 'rgba(100,60,200,0.2)', border: '1px solid rgba(100,60,200,0.5)',
                      color: '#C8A84A', borderRadius: '8px', width: 32, height: 32,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                    }}>
                    <Pickaxe size={14} />
                  </button>
                </div>
              </div>

              {/* Specimen display zone */}
              <div style={{
                flex: '0 0 auto', position: 'relative', height: '260px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                {currentCollected && (
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: \`radial-gradient(ellipse at 50% 70%, rgba(\${gR},\${gG},\${gB},0.18) 0%, transparent 70%)\`,
                  }} />
                )}
                <div style={{
                  position: 'absolute', top: '0.7rem', left: '50%', transform: 'translateX(-50%)',
                  padding: '3px 14px',
                  background: 'rgba(0,0,0,0.75)', border: \`1px solid \${currentSlot.glow}44\`,
                  borderRadius: '20px', color: currentSlot.glow,
                  fontFamily: 'monospace', fontSize: '0.62rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', zIndex: 3,
                }}>
                  XP-{String(museumIdx + 1).padStart(3, '0')} · {museumIdx + 1} / {FOSSILS.length}
                </div>
                <button onClick={() => setMuseumIdx(prevIdx)}
                  style={{
                    position: 'absolute', left: '0.8rem',
                    background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(200,168,74,0.35)',
                    borderRadius: '50%', width: 42, height: 42, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C8A84A', transition: 'all 0.2s', zIndex: 4,
                  }}>
                  <ChevronLeft size={20} />
                </button>
                <AnimatePresence mode="wait">
                  <motion.div key={museumIdx}
                    initial={{ opacity: 0, scale: 0.82, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.82, x: -30 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    {currentCollected ? (
                      <>
                        <img
                          src={currentSlot.imagePath}
                          alt={currentSlot.name}
                          style={{
                            width: '200px', height: '200px', objectFit: 'contain',
                            filter: \`drop-shadow(0 6px 20px \${currentSlot.glow}90) drop-shadow(0 0 50px \${currentSlot.glow}30)\`,
                            mixBlendMode: 'screen',
                          }}
                          onError={e => { e.currentTarget.style.opacity = '0'; }}
                        />
                        <div style={{
                          width: '180px', height: '6px', marginTop: '-6px',
                          background: \`linear-gradient(90deg, transparent 0%, \${currentSlot.glow}60 25%, rgba(200,168,74,0.8) 50%, \${currentSlot.glow}60 75%, transparent 100%)\`,
                          borderRadius: '2px',
                          boxShadow: \`0 0 20px \${currentSlot.glow}80, 0 0 40px \${currentSlot.glow}30\`,
                        }} />
                        <div style={{ width: '130px', height: '3px', marginTop: '2px', background: 'linear-gradient(90deg, transparent, rgba(200,168,74,0.3), transparent)', borderRadius: '1px' }} />
                      </>
                    ) : (
                      <div style={{
                        width: '180px', height: '200px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        border: '2px dashed rgba(100,100,150,0.25)', borderRadius: '14px', background: 'rgba(8,6,20,0.7)',
                      }}>
                        <div style={{ fontSize: '3rem', opacity: 0.25, marginBottom: '0.5rem' }}>?</div>
                        <div style={{ color: 'rgba(100,100,150,0.45)', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.1em' }}>SIN DESCUBRIR</div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <button onClick={() => setMuseumIdx(nextIdx)}
                  style={{
                    position: 'absolute', right: '0.8rem',
                    background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(200,168,74,0.35)',
                    borderRadius: '50%', width: 42, height: 42, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C8A84A', transition: 'all 0.2s', zIndex: 4,
                  }}>
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Info panel */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '0.8rem 1.2rem 1rem', background: 'rgba(5,3,15,0.95)', borderTop: \`1px solid \${currentSlot.glow}33\` }}>
                {currentCollected ? (
                  <>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.7rem' }}>
                      {[
                        { icon: '⚗️', label: \`\${currentSlot.pts} pts base\` },
                        { icon: '⏳', label: currentSlot.era },
                        { icon: '📍', label: currentSlot.location },
                      ].map((tag, i) => (
                        <div key={i} style={{
                          background: i === 0 ? \`rgba(\${gR},\${gG},\${gB},0.15)\` : i === 1 ? 'rgba(200,168,74,0.1)' : 'rgba(80,50,160,0.15)',
                          border: \`1px solid \${i === 0 ? currentSlot.glow + '44' : i === 1 ? 'rgba(200,168,74,0.3)' : 'rgba(80,50,160,0.3)'}\`,
                          borderRadius: '6px', padding: '3px 8px',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          <span style={{ fontSize: '0.65rem' }}>{tag.icon}</span>
                          <span style={{ color: 'rgba(220,200,180,0.75)', fontSize: '0.62rem', lineHeight: 1.3 }}>{tag.label}</span>
                        </div>
                      ))}
                    </div>
                    <h3 style={{ margin: '0 0 2px', color: '#C8A84A', fontSize: '1rem', letterSpacing: '0.04em', textShadow: \`0 0 14px \${currentSlot.glow}55\` }}>
                      {currentSlot.name}
                    </h3>
                    <div style={{ color: 'rgba(200,168,74,0.55)', fontSize: '0.63rem', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                      {currentSlot.classification}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                      <span style={{ color: '#FFD700', fontSize: '0.85rem' }}>
                        {'★'.repeat(getDifficultyStars(currentSlot.pts))}{'☆'.repeat(5 - getDifficultyStars(currentSlot.pts))}
                      </span>
                      <span style={{ color: 'rgba(255,215,0,0.5)', fontFamily: 'monospace', fontSize: '0.68rem' }}>{currentCollected.pts} pts obtenidos</span>
                      <span style={{ marginLeft: 'auto', color: 'rgba(200,168,74,0.35)', fontSize: '0.6rem' }}>{collectedDate}</span>
                    </div>
                    <div style={{
                      background: 'rgba(3,2,10,0.8)', border: \`1px solid rgba(\${gR},\${gG},\${gB},0.15)\`,
                      borderRadius: '8px', padding: '0.7rem 0.9rem',
                      color: 'rgba(215,205,185,0.82)', fontSize: '0.7rem', lineHeight: 1.75, fontFamily: "'Georgia', serif",
                    }}>
                      {currentSlot.description}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'rgba(80,80,120,0.5)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.7rem', opacity: 0.35 }}>🔒</div>
                    <div style={{ fontSize: '0.82rem', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Espécimen no recuperado</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.6 }}>Completa una excavación para añadir este fósil a tu colección</div>
                  </div>
                )}
              </div>

              {/* Footer progress */}
              <div style={{ padding: '0.5rem 1.2rem', borderTop: '1px solid rgba(80,50,160,0.2)', background: 'rgba(4,3,12,0.9)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: \`\${(museum.length / TOTAL_LEVELS) * 100}%\`, height: '100%', background: 'linear-gradient(90deg, #5533AA, #C8A84A)', transition: 'width 0.6s', borderRadius: '2px', boxShadow: '0 0 6px rgba(200,168,74,0.4)' }} />
                </div>
                <span style={{ color: 'rgba(200,168,74,0.5)', fontFamily: 'monospace', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                  {museum.length}/{TOTAL_LEVELS} · {museum.reduce((a, m) => a + (m.pts || 0), 0)} pts
                </span>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>`.split('\n');

// Replace lines blockStart through blockEnd (inclusive)
lines.splice(blockStart, blockEnd - blockStart + 1, ...newMuseumLines);
console.log(`✅ 4. Museum replaced (${blockEnd - blockStart + 1} lines → ${newMuseumLines.length} lines)`);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('✅ Done! File written successfully.');
