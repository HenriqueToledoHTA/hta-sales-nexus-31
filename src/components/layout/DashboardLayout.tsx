
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return <div className="flex h-screen w-full bg-hta-dark text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 pt-6 md:p-6 scrollbar-hidden bg-inherit">
        {children}
      </main>
    </div>;
}
