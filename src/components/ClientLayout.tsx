'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import type { DesignToolsData } from '@/types';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DesignToolsData | null>(null);

  useEffect(() => {
    fetch('/design_tools_database.json')
      .then(res => res.json())
      .then(data => setData(data as DesignToolsData))
      .catch(console.error);
  }, []);

  return (
    <>
      <Header data={data} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
