'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Trophy, Globe, Gamepad2, Medal } from 'lucide-react';

// ─────────────────────────────────────────────
//  Helper: save a score to Firestore
// ─────────────────────────────────────────────
export async function saveArcadeScore(db, gameId, gameName, userId, userName, score) {
  if (!userId || score === undefined || score === null) return;
  const numScore = Number(score);
  const docId = `${userId}_${gameId}`;
  try {
    const docRef = doc(db, 'arcadeScores', docId);
    const existing = await getDoc(docRef);
    if (existing.exists() && existing.data().score >= numScore) {
      // Existing score is equal or higher — skip
      return;
    }
    await setDoc(docRef, {
      gameId,
      gameName,
      userId,
      userName: userName || 'Jugador',
      score: numScore,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('[ArcadeRanking] Error saving score:', err);
  }
}

// ─────────────────────────────────────────────
//  Sub-component: a single rank row
// ─────────────────────────────────────────────
function RankRow({ rank, entry }) {
  const medalColors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };
  const color = medalColors[rank] || 'rgba(0,228,255,0.7)';

  const dateStr = entry.createdAt?.toDate
    ? entry.createdAt.toDate().toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })
    : '—';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '32px 1fr auto',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.55rem 0.75rem',
        borderRadius: '10px',
        background: rank <= 3 ? `rgba(${rank === 1 ? '255,215,0' : rank === 2 ? '192,192,192' : '205,127,50'},0.07)` : 'rgba(255,255,255,0.03)',
        borderLeft: `3px solid ${color}`,
        marginBottom: '0.4rem',
      }}
    >
      {/* Rank badge */}
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          fontWeight: 700,
          background: rank <= 3 ? color : 'rgba(255,255,255,0.08)',
          color: rank <= 3 ? '#000' : 'rgba(255,255,255,0.6)',
          flexShrink: 0,
        }}
      >
        {rank <= 3 ? ['🥇','🥈','🥉'][rank - 1] : rank}
      </div>

      {/* Name + date */}
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 600,
            fontSize: '0.82rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {entry.userName}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem' }}>
          {entry.gameName ? `${entry.gameName} · ` : ''}{dateStr}
        </div>
      </div>

      {/* Score */}
      <div
        style={{
          color,
          fontWeight: 700,
          fontSize: '0.9rem',
          textShadow: `0 0 8px ${color}`,
          flexShrink: 0,
        }}
      >
        {Number(entry.score || 0).toLocaleString()}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────
export default function ArcadeRanking({ gameId, gameName, currentUserId }) {
  const [tab, setTab] = useState(gameId === 'global' ? 'global' : 'game');
  const [allScores, setAllScores] = useState([]);   // top-50 global, used for both tabs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Switch to game tab whenever gameId changes
  useEffect(() => {
    if (gameId && gameId !== 'global') {
      setTab('game');
    } else {
      setTab('global');
    }
  }, [gameId]);

  // ── Single query: top-50 by score globally (NO composite index needed) ──
  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(
      collection(db, 'arcadeScores'),
      orderBy('score', 'desc'),
      limit(50)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setAllScores(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error('[ArcadeRanking] Firestore error:', err);
        setError('Sin conexión con el ranking');
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // Filter scores for the active tab
  const activeScores = tab === 'game' && gameId && gameId !== 'global'
    ? allScores.filter(s => s.gameId === gameId).slice(0, 10)
    : allScores.slice(0, 10);

  const showGameTab = gameId && gameId !== 'global';

  return (
    <div
      style={{
        position: 'sticky',
        top: '6rem',
        width: '280px',
        minWidth: '280px',
        maxHeight: 'calc(100vh - 8rem)',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10, 0, 30, 0.75)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,0,255,0.25)',
        borderRadius: '16px',
        boxShadow: '0 0 40px rgba(255,0,255,0.08), inset 0 0 40px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1rem 0.75rem',
          background: 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,0,255,0.08))',
          borderBottom: '1px solid rgba(255,0,255,0.15)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Trophy size={18} color="#FFD700" style={{ filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.8))' }} />
          <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.03em' }}>
            Ranking Arcade
          </span>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            gap: '0.35rem',
            background: 'rgba(0,0,0,0.35)',
            borderRadius: '10px',
            padding: '3px',
          }}
        >
          {showGameTab && (
            <button
              onClick={() => setTab('game')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                borderRadius: '7px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
                background: tab === 'game' ? 'rgba(255,0,255,0.25)' : 'transparent',
                color: tab === 'game' ? '#FF00FF' : 'rgba(255,255,255,0.45)',
                boxShadow: tab === 'game' ? '0 0 10px rgba(255,0,255,0.2)' : 'none',
              }}
            >
              <Gamepad2 size={12} /> Este Juego
            </button>
          )}
          <button
            onClick={() => setTab('global')}
            style={{
              flex: 1,
              padding: '0.4rem 0.5rem',
              borderRadius: '7px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s',
              background: tab === 'global' ? 'rgba(255,215,0,0.2)' : 'transparent',
              color: tab === 'global' ? '#FFD700' : 'rgba(255,255,255,0.45)',
              boxShadow: tab === 'global' ? '0 0 10px rgba(255,215,0,0.15)' : 'none',
            }}
          >
            <Globe size={12} /> Global
          </button>
        </div>

        {/* Game subtitle */}
        {tab === 'game' && showGameTab && (
          <div
            style={{
              marginTop: '0.5rem',
              color: 'rgba(255,0,255,0.8)',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {gameName || gameId}
          </div>
        )}
      </div>

      {/* Score list */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '0.75rem 0.75rem 1rem' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
            <span>Conectando…</span>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100px', gap: '0.5rem', color: 'rgba(255,100,100,0.6)' }}>
            <Medal size={28} style={{ opacity: 0.4, color: '#ff6464' }} />
            <span style={{ fontSize: '0.78rem', textAlign: 'center' }}>
              ⚠️ {error}<br />
              <span style={{ fontSize: '0.68rem', opacity: 0.6 }}>Reintentando conexión…</span>
            </span>
          </div>
        ) : activeScores.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100px', gap: '0.5rem', color: 'rgba(255,255,255,0.3)' }}>
            <Medal size={28} style={{ opacity: 0.3 }} />
            <span style={{ fontSize: '0.78rem', textAlign: 'center' }}>
              Aún no hay puntajes.<br />¡Sé el primero!
            </span>
          </div>
        ) : (
          activeScores.map((entry, idx) => (
            <RankRow key={entry.id} rank={idx + 1} entry={entry} />
          ))
        )}
      </div>

      {/* Footer glow */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255,0,255,0.5), rgba(255,215,0,0.5), transparent)',
          flexShrink: 0,
        }}
      />
    </div>
  );
}
