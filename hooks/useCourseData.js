'use client';
import { useState, useEffect } from 'react';

export function useCourseData(moduleId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!moduleId) { setLoading(false); return; }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/courses/${moduleId}`)
      .then(r => {
        if (!r.ok) throw new Error(`Module ${moduleId} not found`);
        return r.json();
      })
      .then(d => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [moduleId]);

  return { data, loading, error };
}
