'use client';
import dynamic from 'next/dynamic';

const AstroD = dynamic(() => import('./AstroD'), { ssr: false });

export default function AstroDWrapper() {
  return <AstroD />;
}
