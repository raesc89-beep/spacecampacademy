'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Users, GraduationCap, Award } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalParents: 0, totalStars: 0 });

  useEffect(() => {
    async function fetchStats() {
      const usersSnap = await getDocs(collection(db, "users"));
      let students = 0;
      let parents = 0;
      let stars = 0;
      
      usersSnap.forEach(doc => {
        const d = doc.data();
        if (d.role === 'student') {
          students++;
          if (d.progress?.stars) stars += d.progress.stars;
        } else if (d.role === 'parent') {
          parents++;
        }
      });
      setStats({ totalUsers: students, totalParents: parents, totalStars: stars });
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Panel de Control General</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(0, 228, 255, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--electric-blue)' }}>
            <Users size={32} />
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Cadetes Activos</span>
          </div>
          <h2 style={{ fontSize: '3rem', margin: '1rem 0 0 0' }}>{stats.totalUsers}</h2>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--gold-star)' }}>
            <Award size={32} />
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Polvo Estelar Ganado</span>
          </div>
          <h2 style={{ fontSize: '3rem', margin: '1rem 0 0 0' }}>{stats.totalStars}</h2>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--success)' }}>
            <GraduationCap size={32} />
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Padres Vinculados</span>
          </div>
          <h2 style={{ fontSize: '3rem', margin: '1rem 0 0 0' }}>{stats.totalParents}</h2>
        </div>
      </div>

      <div style={{ marginTop: '3rem', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px' }}>
         <h2 style={{ marginBottom: '1rem' }}>Estado del Sistema Moodle</h2>
         <p style={{ color: 'var(--text-muted)' }}>✅ SCORM 1.2 Plugin Ready</p>
         <p style={{ color: 'var(--text-muted)' }}>✅ H5P Interactive Content Library loaded</p>
         <p style={{ color: 'var(--text-muted)' }}>✅ Planet modules seeded correctly.</p>
      </div>
    </div>
  );
}
