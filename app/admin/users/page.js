'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Users, Trash2, Edit, Mail, Shield, User, Activity, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const userList = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
      setUsers(userList);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (uid, newRole) => {
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole });
      fetchUsers(); // Refresh
    } catch (e) {
      alert('Error actualizando rol');
    }
  };

  const handleDeleteUser = async (uid) => {
    if (confirm('Alerta: Estás a punto de borrar los datos de este cadete de la Base de Datos. Sus evaluaciones y puntajes se perderán para siempre. ¿Autorizas la purga?')) {
      try {
        await deleteDoc(doc(db, 'users', uid));
        fetchUsers();
      } catch (e) {
        alert('Error borrando el registro.');
      }
    }
  };

  // Metricas
  const statusData = [
    { name: 'Cadetes', value: users.filter(u => u.isApproved && u.role !== 'admin').length, color: '#00e4ff' },
    { name: 'En Espera', value: users.filter(u => !u.isApproved && u.role !== 'admin').length, color: '#ffa500' },
    { name: 'Admins', value: users.filter(u => u.role === 'admin').length, color: '#ff3366' }
  ];

  const topEarners = [...users]
    .filter(u => u.role !== 'admin')
    .sort((a,b) => (b.progress?.stars || 0) - (a.progress?.stars || 0))
    .slice(0, 5)
    .map(u => ({ name: u.name ? u.name.split(' ')[0] : 'Desconocido', stars: u.progress?.stars || 0 }));

  const globalEconomy = users.reduce((acc, u) => acc + (u.progress?.stars || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--electric-blue)' }}>Centro de Control Naval</h1>
          <p style={{ color: 'var(--text-muted)' }}>Métricas Globales y Aprobación de Cadetes Reclutados</p>
        </div>
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <Activity size={20} color="var(--success)" /> <span style={{ fontWeight: 'bold' }}>Sistemas en Línea</span>
        </div>
      </header>

      {/* DASHBOARD CHARTS */}
      {!loading && users.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Demografía de Mando</h3>
            <ResponsiveContainer width="100%" height={200}>
               <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={'cell-' + index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0a192f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
               </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {statusData.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                  <span>{s.name} ({s.value})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Top 5 - Oficiales Élite (Estrellas)</h3>
            <ResponsiveContainer width="100%" height={200}>
               <BarChart data={topEarners} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: '#0a192f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Bar dataKey="stars" fill="var(--gold-star)" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, rgba(0,0,0,0) 70%)' }}>
             <Star size={48} color="var(--gold-star)" style={{ marginBottom: '1rem' }} />
             <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>Economía Estelar Global</h3>
             <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--gold-star)' }}>{globalEconomy}</div>
             <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Polvo Estelar Circulante</p>
          </div>

        </div>
      )}

      {/* USER TABLE */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Descargando expedientes de la Flota...</div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
             <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users /> Directorio Operativo</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Cadete (Nombre)</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Email de Contacto</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Rango / Rol</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Polvo Estelar</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 'normal', textAlign: 'right' }}>Acciones Ejecutivas</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.uid} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <User size={18} />
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{u.name || 'Soldado Desconocido'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '1rem' }}>
                    {u.role === 'admin' ? (
                       <span style={{ background: 'rgba(255,0,0,0.2)', color: 'var(--danger)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Shield size={14} /> Admin
                       </span>
                    ) : u.isApproved ? (
                       <span style={{ background: 'rgba(0,255,136,0.1)', color: 'var(--success)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.8rem' }}>
                          Cadete
                       </span>
                    ) : (
                       <span style={{ background: 'rgba(255,165,0,0.2)', color: 'orange', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid rgba(255,165,0,0.5)' }}>
                          En Revisión
                       </span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--gold-star)', fontWeight: 'bold' }}>{u.progress?.stars || 0} ⭐</td>
                  
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      
                      {u.role !== 'admin' && !u.isApproved && (
                        <button 
                           onClick={async () => {
                             await updateDoc(doc(db, 'users', u.uid), { isApproved: true });
                             fetchUsers();
                           }}
                           title="Aprobar Ingreso de Cadete"
                           style={{ background: 'rgba(0,255,136,0.2)', border: '1px solid var(--success)', color: 'var(--success)', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                           ✅ Aprobar
                        </button>
                      )}
                      
                      <button 
                         onClick={() => handleRoleChange(u.uid, u.role === 'admin' ? 'user' : 'admin')}
                         title={u.role === 'admin' ? 'Revocar privilegios de Admin' : 'Ascender a Administrador'}
                         style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
                      >
                         <Shield size={16} />
                      </button>

                      {u.role !== 'admin' && (
                        <button 
                           onClick={() => handleDeleteUser(u.uid)}
                           title="Expulsar Cadete"
                           style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: 'var(--danger)', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
                        >
                           <Trash2 size={16} />
                        </button>
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
