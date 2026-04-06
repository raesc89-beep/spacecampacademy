'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

import { COURSE_DATA } from '@/lib/courseData';

export default function SeedDatabasePage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleSeed = async () => {
    setLoading(true);
    setLogs(["Starting database seed..."]);
    
    try {
      for (const module of COURSE_DATA) {
        setLogs(prev => [...prev, `Seeding ${module.titleEn}...`]);
        await setDoc(doc(db, "modules", module.id), module);
      }
      setLogs(prev => [...prev, "🎉 All modules seeded successfully!"]);
    } catch (e) {
      console.error(e);
      setLogs(prev => [...prev, "❌ Error seeding database: " + e.message]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Moodle Admin: Seed Space Course Data</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Notice: Use this strictly for initially populating Firestore. Doing this will overwrite the 9 planet modules.
      </p>
      
      <button 
        onClick={handleSeed}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? "Seeding Data..." : "Seed Firebase Database"}
      </button>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#000', borderRadius: '12px', minHeight: '150px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Terminal Logs:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {logs.map((log, i) => (
            <li key={i} style={{ fontFamily: 'monospace', color: '#00FF88', marginBottom: '0.2rem' }}>
              &gt; {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
