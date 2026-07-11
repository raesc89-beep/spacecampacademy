'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useShipStore } from '@/store/useShipStore';
import { Rocket, Trash2, ArrowLeft, Loader2, Edit3, Check, X, Archive, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Stat pentagon component (inspired by Ace Combat stat radar)
function StatRadar({ stats }) {
  const entries = [
    { label: 'DAÑO', value: stats.damage, color: '#FF2A2A' },
    { label: 'ESCUDO', value: stats.shield, color: '#00E4FF' },
    { label: 'ALCANCE', value: stats.range, color: '#B02AFF' },
    { label: 'MANIOB.', value: stats.maneuverability, color: '#00FF66' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
      {entries.map(({ label, value, color }) => (
        <div key={label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', fontFamily: 'monospace' }}>{label}</span>
            <span style={{ fontSize: '9px', color, fontFamily: 'monospace', fontWeight: 700 }}>{Math.round(value)}</span>
          </div>
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: '2px', boxShadow: `0 0 6px ${color}80` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Rename inline input
function RenameField({ currentName, onSave, onCancel }) {
  const [val, setVal] = useState(currentName);
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <input
        autoFocus
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSave(val); if (e.key === 'Escape') onCancel(); }}
        style={{
          flex: 1, background: 'rgba(0,228,255,0.08)', border: '1px solid #00E4FF',
          borderRadius: '5px', color: 'white', padding: '4px 8px',
          fontSize: '13px', fontFamily: 'monospace', outline: 'none',
        }}
      />
      <button onClick={() => onSave(val)} style={{ background: 'rgba(0,255,136,0.15)', border: '1px solid #00FF88', borderRadius: '5px', color: '#00FF88', cursor: 'pointer', padding: '4px 7px' }}><Check size={12} /></button>
      <button onClick={onCancel} style={{ background: 'rgba(255,42,42,0.1)', border: '1px solid rgba(255,42,42,0.4)', borderRadius: '5px', color: '#FF2A2A', cursor: 'pointer', padding: '4px 7px' }}><X size={12} /></button>
    </div>
  );
}

export default function MiHangar() {
  const router = useRouter();
  const { savedShips, deleteShip, loadShip, renameShip } = useShipStore();
  const [loadingId, setLoadingId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [mounted, setMounted] = useState(false);

  // SSR hydration guard — prevents Zustand persist mismatch crash
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#050A15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <Navbar />
        <div style={{ color: '#00E4FF', fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '3px' }}>CARGANDO HANGAR...</div>
      </div>
    );
  }

  const selectedShip = selectedId ? savedShips.find(s => s.id === selectedId) : null;

  const FUSELAGE_LABELS = {
    fighter: 'INTERCEPTOR', cargo: 'CARGA PESADA', explorer: 'EXPLORADOR',
    cruiser: 'CRUCERO', destroyer: 'DESTRUCTOR', stealth: 'SIGILO', carrier: 'PORTANAVES',
  };

  const handleRename = (id, newName) => {
    if (newName.trim()) renameShip(id, newName.trim());
    setRenamingId(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #020810 0%, #050A15 40%, #030610 100%)', color: '#c0d8ff', fontFamily: 'monospace' }}>
      <Navbar />

      {/* Scanline overlay effect */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)', opacity: 0.4 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid rgba(0,228,255,0.15)', paddingBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(0,228,255,0.08)', border: '1px solid rgba(0,228,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Archive size={24} color="#00E4FF" />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(0,228,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '2px' }}>Archivo Holográfico</div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#00E4FF', textTransform: 'uppercase', letterSpacing: '4px', textShadow: '0 0 20px rgba(0,228,255,0.4)' }}>
                MI HANGAR
              </h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
              {savedShips.length} nave{savedShips.length !== 1 ? 's' : ''} archivada{savedShips.length !== 1 ? 's' : ''}
            </div>
            <Link href="/hangar/nave" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '8px 18px', background: 'rgba(0,228,255,0.08)', border: '1px solid rgba(0,228,255,0.4)', borderRadius: '8px', color: '#00E4FF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', transition: 'all 0.2s', letterSpacing: '1px' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,228,255,0.18)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,228,255,0.25)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,228,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <ArrowLeft size={14} /> ASTILLERO
              </div>
            </Link>
          </div>
        </div>

        {savedShips.length === 0 ? (
          /* ── Empty state ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '80px 20px', border: '1px dashed rgba(0,228,255,0.15)', borderRadius: '20px', background: 'rgba(0,228,255,0.02)' }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>🛸</div>
            <h2 style={{ color: 'rgba(0,228,255,0.5)', letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 0.8rem' }}>HANGAR VACÍO</h2>
            <p style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '2rem' }}>Diseña y guarda tu primera nave desde el Astillero Naval.</p>
            <Link href="/hangar/nave" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'rgba(0,228,255,0.1)', border: '1px solid #00E4FF', borderRadius: '10px', color: '#00E4FF', fontWeight: 700, cursor: 'pointer', letterSpacing: '1px' }}>
                <Rocket size={16} /> IR AL ASTILLERO
              </div>
            </Link>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', alignItems: 'start' }}>

            {/* ── Ship List (Left — Ace Combat ship selector) ── */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,228,255,0.12)', borderRadius: '14px', overflow: 'hidden' }}>
              {/* List header */}
              <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(0,228,255,0.06)', borderBottom: '1px solid rgba(0,228,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#00E4FF', letterSpacing: '2px', textTransform: 'uppercase' }}>Seleccionar Nave</span>
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)' }}>{savedShips.length} / ∞</span>
              </div>

              <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {savedShips.map((ship, i) => {
                  const isSelected = ship.id === selectedId;
                  return (
                    <motion.div
                      key={ship.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelectedId(ship.id)}
                      style={{
                        padding: '0.9rem 1.2rem',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(0,228,255,0.08)' : 'transparent',
                        borderLeft: `3px solid ${isSelected ? '#00E4FF' : 'transparent'}`,
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                      }}
                      whileHover={{ backgroundColor: 'rgba(0,228,255,0.05)' }}
                    >
                      {/* Ship icon */}
                      <div style={{ width: 36, height: 36, borderRadius: '8px', background: `linear-gradient(135deg, ${ship.config.colors.primary}33, transparent)`, border: `1px solid ${ship.config.colors.primary}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Rocket size={16} color={ship.config.colors.primary} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ship.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', marginTop: '2px' }}>
                          {FUSELAGE_LABELS[ship.config.fuselage] || ship.config.fuselage}
                        </div>
                      </div>
                      {isSelected && <ChevronRight size={14} color="#00E4FF" />}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ── Ship Detail (Right — Ace Combat info panel) ── */}
            <AnimatePresence mode="wait">
              {selectedShip ? (
                <motion.div
                  key={selectedShip.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${selectedShip.config.colors.primary}40`, borderRadius: '14px', overflow: 'hidden' }}
                >
                  {/* Preview area */}
                  <div style={{
                    height: '220px',
                    background: `linear-gradient(135deg, #050A15, ${selectedShip.config.colors.primary}18)`,
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderBottom: `1px solid ${selectedShip.config.colors.primary}25`,
                    overflow: 'hidden',
                  }}>
                    {/* Grid */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${selectedShip.config.colors.primary}08 1px, transparent 1px), linear-gradient(90deg, ${selectedShip.config.colors.primary}08 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                    {/* Center cross */}
                    <div style={{ position: 'absolute', width: '1px', height: '60%', background: `${selectedShip.config.colors.primary}20`, left: '50%' }} />
                    <div style={{ position: 'absolute', height: '1px', width: '60%', background: `${selectedShip.config.colors.primary}20`, top: '50%' }} />
                    {/* Ship icon */}
                    <motion.div
                      animate={{ y: [-6, 6, -6] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    >
                      <Rocket size={90} color={selectedShip.config.colors.primary} style={{ filter: `drop-shadow(0 0 30px ${selectedShip.config.colors.emissive})`, transform: 'rotate(-30deg)' }} />
                    </motion.div>
                    {/* Corner HUD brackets */}
                    {[['top:8px;left:8px;border-top:2px;border-left:2px', 'topLeft'], ['top:8px;right:8px;border-top:2px;border-right:2px', 'topRight'], ['bottom:8px;left:8px;border-bottom:2px;border-left:2px', 'bottomLeft'], ['bottom:8px;right:8px;border-bottom:2px;border-right:2px', 'bottomRight']].map((_, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        ...(i === 0 ? { top: 8, left: 8, borderTop: `2px solid ${selectedShip.config.colors.primary}80`, borderLeft: `2px solid ${selectedShip.config.colors.primary}80` } : {}),
                        ...(i === 1 ? { top: 8, right: 8, borderTop: `2px solid ${selectedShip.config.colors.primary}80`, borderRight: `2px solid ${selectedShip.config.colors.primary}80` } : {}),
                        ...(i === 2 ? { bottom: 8, left: 8, borderBottom: `2px solid ${selectedShip.config.colors.primary}80`, borderLeft: `2px solid ${selectedShip.config.colors.primary}80` } : {}),
                        ...(i === 3 ? { bottom: 8, right: 8, borderBottom: `2px solid ${selectedShip.config.colors.primary}80`, borderRight: `2px solid ${selectedShip.config.colors.primary}80` } : {}),
                        width: 20, height: 20,
                      }} />
                    ))}
                    {/* Designation tag */}
                    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', border: `1px solid ${selectedShip.config.colors.primary}40`, borderRadius: '4px', padding: '2px 10px', fontSize: '0.6rem', color: selectedShip.config.colors.primary, letterSpacing: '2px' }}>
                      {FUSELAGE_LABELS[selectedShip.config.fuselage] || selectedShip.config.fuselage}
                    </div>
                  </div>

                  {/* Info panel */}
                  <div style={{ padding: '1.3rem 1.5rem' }}>
                    {/* Name + rename */}
                    <div style={{ marginBottom: '1rem' }}>
                      {renamingId === selectedShip.id ? (
                        <RenameField
                          currentName={selectedShip.name}
                          onSave={name => handleRename(selectedShip.id, name)}
                          onCancel={() => setRenamingId(null)}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <h2 style={{ margin: 0, color: 'white', fontSize: '1.3rem', textTransform: 'uppercase', letterSpacing: '2px', flex: 1 }}>{selectedShip.name}</h2>
                          <button
                            onClick={() => setRenamingId(selectedShip.id)}
                            title="Renombrar nave"
                            style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.25)', borderRadius: '6px', color: '#FFD700', cursor: 'pointer', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', transition: 'all 0.2s' }}
                            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,215,0,0.18)'}
                            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,215,0,0.08)'}
                          >
                            <Edit3 size={12} /> RENOMBRAR
                          </button>
                        </div>
                      )}
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', marginTop: '4px', letterSpacing: '1px' }}>
                        Registrada: {new Date(selectedShip.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Config details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                      {[
                        ['FUSELAJE', selectedShip.config.fuselage],
                        ['ALAS', selectedShip.config.wings],
                        ['MOTORES', selectedShip.config.engines],
                        ['ARMA', selectedShip.config.weapon],
                      ].map(([label, val]) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginBottom: '2px' }}>{label}</div>
                          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Colors */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>COLOR</span>
                      {Object.entries(selectedShip.config.colors).map(([key, hex]) => (
                        <div key={key} title={key} style={{ width: 18, height: 18, borderRadius: '50%', background: hex, border: '2px solid rgba(255,255,255,0.15)', boxShadow: `0 0 8px ${hex}60` }} />
                      ))}
                    </div>

                    {/* Stats */}
                    <div style={{ marginBottom: '1.3rem' }}>
                      <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '8px' }}>ESTADÍSTICAS</div>
                      <StatRadar stats={selectedShip.stats} />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => {
                          setLoadingId(selectedShip.id);
                          loadShip(selectedShip.id);
                          setTimeout(() => router.push('/hangar/nave'), 500);
                        }}
                        style={{ flex: 1, padding: '11px 0', background: 'rgba(0,228,255,0.1)', border: '1px solid #00E4FF', borderRadius: '8px', color: '#00E4FF', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,228,255,0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,228,255,0.3)'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,228,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        {loadingId === selectedShip.id ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Rocket size={14} />}
                        CARGAR NAVE
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar "${selectedShip.name}" del archivo holográfico?`)) {
                            deleteShip(selectedShip.id);
                            setSelectedId(null);
                          }
                        }}
                        style={{ padding: '11px 16px', background: 'rgba(255,42,42,0.08)', border: '1px solid rgba(255,42,42,0.35)', borderRadius: '8px', color: '#FF2A2A', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,42,42,0.18)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(255,42,42,0.25)'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,42,42,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-detail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ height: '400px', background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(0,228,255,0.1)', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'rgba(255,255,255,0.2)' }}
                >
                  <Rocket size={48} color="rgba(0,228,255,0.15)" />
                  <p style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Selecciona una nave</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(0,228,255,0.25); border-radius: 2px; }
      `}</style>
    </div>
  );
}
