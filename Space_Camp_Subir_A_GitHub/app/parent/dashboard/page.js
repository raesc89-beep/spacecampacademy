'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Star, Search, ShieldCheck } from 'lucide-react';

export default function ParentDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  
  const [children, setChildren] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'parent')) {
      router.push('/parent/auth');
    }
  }, [user, userData, loading, router]);

  useEffect(() => {
    async function fetchChildren() {
      if (userData?.linkedStudents?.length > 0) {
        const q = query(collection(db, 'users'), where('email', 'in', userData.linkedStudents));
        const snap = await getDocs(q);
        const childrenData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setChildren(childrenData);
      }
    }
    if (userData) fetchChildren();
  }, [userData]);

  const linkStudent = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    try {
      const q = query(collection(db, 'users'), where('email', '==', searchEmail), where('role', '==', 'student'));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        // Link to parent
        await updateDoc(doc(db, 'users', user.uid), {
          linkedStudents: arrayUnion(searchEmail)
        });
        const childData = snap.docs[0].data();
        childData.id = snap.docs[0].id;
        
        // Update local state if not already there
        if (!children.find(c => c.email === searchEmail)) {
          setChildren([...children, childData]);
        }
        setSearchEmail('');
        alert(`¡Cadete ${childData.name} vinculado exitosamente!`);
      } else {
        alert("No se encontró ningún cadete con ese correo electrónico.");
      }
    } catch (err) {
      console.error(err);
    }
    setSearchLoading(false);
  };

  if (loading || !userData) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '3rem 2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Users color="var(--starlight)" /> Control de Misión: Panel de Padres
        </h1>
        <p className="lead" style={{ marginBottom: '3rem' }}>Revisa el progreso de tus pequeños astronautas en la Academia.</p>

        <section className="glass-card" style={{ marginBottom: '3rem' }}>
          <h3>Vincular Nuevo Cadete</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Ingresa el correo electrónico con el que tu hijo(a) se registró en el juego.</p>
          <form onSubmit={linkStudent} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="email" 
              placeholder="Correo electrónico del cadete..." 
              value={searchEmail} 
              onChange={e => setSearchEmail(e.target.value)}
              style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
              required
            />
            <button type="submit" className="btn-secondary" disabled={searchLoading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={20} /> Vincular
            </button>
          </form>
        </section>

        <h3>Mis Cadetes Espaciales</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
          {children.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Aún no tienes cadetes vinculados.</p>
          ) : (
            children.map(child => (
              <div key={child.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ margin: 0 }}>{child.name}</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{child.email}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.1)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                  <Star color="var(--gold-star)" />
                  <span style={{ fontWeight: 'bold' }}>{child.progress?.stars || 0} Polvo Estelar</span>
                </div>

                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0 0.5rem 0' }}><ShieldCheck size={18} /> Medallas Obtenidas:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {child.progress?.badges?.length > 0 ? child.progress.badges.map((b, i) => (
                      <span key={i} style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem' }}>{b}</span>
                    )) : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Aún no hay medallas.</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
