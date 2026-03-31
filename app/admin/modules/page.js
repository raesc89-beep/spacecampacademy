'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function ModulesManager() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    async function fetchModules() {
      const q = query(collection(db, "modules"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setModules(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchModules();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Editor de Módulos del Curso</h1>
        <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>+ Crear Módulo SCORM/H5P</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>Orden</th>
            <th style={{ padding: '1rem' }}>Planeta (ES/EN)</th>
            <th style={{ padding: '1rem' }}>Medalla</th>
            <th style={{ padding: '1rem' }}>Estado</th>
            <th style={{ padding: '1rem' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((m, i) => (
            <tr key={m.id} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <td style={{ padding: '1rem', color: m.color, fontWeight: 'bold' }}>{m.order}</td>
              <td style={{ padding: '1rem' }}>{m.titleEs} / {m.titleEn}</td>
              <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{m.badgeEs}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ padding: '0.3rem 0.6rem', background: 'rgba(0,255,136,0.2)', color: 'var(--success)', borderRadius: '20px', fontSize: '0.8rem' }}>Publicado</span>
              </td>
              <td style={{ padding: '1rem' }}>
                <button style={{ background: 'none', border: '1px solid var(--electric-blue)', color: 'var(--electric-blue)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
