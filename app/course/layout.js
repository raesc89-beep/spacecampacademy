'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CourseLayout({ children }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/auth'); return; }
    if (userData && userData.role !== 'admin' && userData.isApproved !== true) {
      router.push('/dashboard');
    }
  }, [user, userData, loading, router]);

  if (loading) return null;
  if (!user) return null;
  if (userData && userData.role !== 'admin' && userData.isApproved !== true) return null;

  return children;
}
