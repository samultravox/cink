'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--obsidian))] via-[rgb(var(--charcoal))] to-[rgb(var(--obsidian))] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[rgb(var(--neon-orchid))] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[rgb(var(--muted-foreground))]">Loading PINK™ Command Center...</p>
      </div>
    </div>
  );
}