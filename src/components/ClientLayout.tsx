'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/design_tools_database.json')
      .then(res => res.json())
      .then(data => setData(data))
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
