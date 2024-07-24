'use client';
// Layout components
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import routes from '@src/routes';
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from '@utils/navigation';
import React from 'react';
import Navbar from '@component/navbar/RTL';
import Sidebar from '@component/sidebar/RTL';
import Footer from '@component/footer/Footer';

export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [fixed] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = 'rtl';
  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      <Sidebar
        routes={routes}
        open={open}
        setOpen={() => setOpen(!open)}
        variant="admin"
      />
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pl-2 xl:mr-[323px]`}
        >
          {/* Routes */}
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes, pathname)}
              secondary={getActiveNavbar(routes, pathname)}
            />
            <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
