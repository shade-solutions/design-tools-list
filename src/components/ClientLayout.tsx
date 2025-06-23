'use client';

import Header from './Header';
import Footer from './Footer';
import type { DesignToolsData } from '@/types';

interface ClientLayoutProps {
  children: React.ReactNode;
  data: DesignToolsData | null;
}

export default function ClientLayout({ children, data }: ClientLayoutProps) {
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
