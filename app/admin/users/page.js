'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Users, Trash2, Edit, Mail, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "users"));
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
      await updateDoc(doc(db, "users", uid), { role: newRole });
      fetchUsers(); // Refresh
    } catch (e) {
      alert("Error actualizando rol");
    }
  };

  const handleDeleteUser = async (uid) => {
    if (confirm("Alerta: Estás a punto de borrar los datos de este cadete de la Base de Datos. Sus evaluaciones y puntajes se perderán para siempre. ¿Autorizas la purga?")) {
      try {
        await deleteDoc(doc(db, "users", uid));
        fetchUsers();
      } catch (e) {
        alert("Error borrando el registro.");
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--electric-blue)' }}>Módulo de Estudiantes</h1>
          <p style={{ color: 'var(--text-muted)' }}>Lista de todos los cadetes inscritos en la plataforma.</p>
        </div>
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <Users size={20} /> <span style={{ fontWeight: 'bold' }}>{users.length} Registros Activos</span>
        </div>
      </header>

      {loading ? (
        <p>Decodificando base de datos de tripulación...</p>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
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
                    ) : (
                       <span style={{ background: 'rgba(0,255,136,0.1)', color: 'var(--success)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.8rem' }}>
                          Cadete
                       </span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--gold-star)', fontWeight: 'bold' }}>{u.progress?.stars || 0} ⭐</td>
                  
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      
                      <button 
                         onClick={() => handleRoleChange(u.uid, u.role === 'admin' ? 'user' : 'admin')}
                         title={u.role === 'admin' ? 'Revocar privilegios de Admin' : 'Ascender a Administrador'}
                         style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
                      >
                         <Shield size={16} />
                      </button>

                      <button 
                         onClick={() => alert('Debido a las políticas de seguridad de Firebase, envíales un enlace de recuperación de contraseña directamente al correo presionando el botón de Recuperar en la página de Login principal.')}
                         title="Auditar Contraseña"
                         style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
                      >
                         <Edit size={16} />
                      </button>

                      {/* No permitimos borrar la propia cuenta del admin principal por seguridad */}
                      {u.role !== 'admin' && (
                        <button 
                           onClick={() => handleDeleteUser(u.uid)}
                           title="Expulsar Cadete (Eliminar de Base de Datos)"
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
