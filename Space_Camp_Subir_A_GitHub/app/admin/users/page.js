'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function UsersManager() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    if (confirm("¿Hacer a este usuario Admin?")) {
      await updateDoc(doc(db, "users", id), { role: 'admin' });
      setUsers(users.map(u => u.id === id ? { ...u, role: 'admin' } : u));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Gestión de Usuarios</h1>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>Nombre / Email</th>
            <th style={{ padding: '1rem' }}>Tipo de Cuenta</th>
            <th style={{ padding: '1rem' }}>Progreso (Cadetes)</th>
            <th style={{ padding: '1rem' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <td style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 'bold' }}>{u.name || (u.role === 'admin' ? 'Master Admin' : 'Padre/Madre')}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{u.email}</div>
              </td>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  padding: '0.3rem 0.6rem', 
                  background: u.role === 'admin' ? 'rgba(255,51,102,0.2)' : u.role === 'student' ? 'rgba(0,228,255,0.2)' : 'rgba(255,215,0,0.2)',
                  color: u.role === 'admin' ? 'var(--danger)' : u.role === 'student' ? 'var(--electric-blue)' : 'var(--gold-star)', 
                  borderRadius: '20px', fontSize: '0.8rem', textTransform: 'uppercase' 
                }}>
                  {u.role}
                </span>
              </td>
              <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                {u.role === 'student' ? (
                  <span>⭐ {u.progress?.stars || 0} | 🛡️ {u.progress?.badges?.length || 0}</span>
                ) : '-'}
              </td>
              <td style={{ padding: '1rem' }}>
                {u.role !== 'admin' && (
                  <button onClick={() => makeAdmin(u.id)} style={{ background: 'none', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Hacer Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
