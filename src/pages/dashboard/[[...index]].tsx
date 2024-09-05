'use client';
// Layout @component
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getActiveNavbar, getActiveRoute } from '@utils/navigation';
import React from 'react';
import Navbar from '@component/navbar';
import Sidebar from '@component/sidebar';
import Footer from '@component/footer/Footer';
import routes from '@src/routes';
import Head from 'next/head';
import { PRODUCT_DESCRIPTION, PRODUCT_NAME } from '@src/constants/meta';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/utils/recoil/user';
import { ALLOWED_USERS } from '@src/constants/appConstants';
import { UserData } from '@src/api/utils/interface';
import { useRouter } from 'next/router';
import { errorAlert2 } from '@src/components/alert';

function Admin({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const user: UserData = useRecoilValue(userState);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && user.role && !ALLOWED_USERS.includes(user.role)) {
      errorAlert2('You dont have relevant access');
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      <Head>
        <title>{PRODUCT_NAME}</title>
        <link rel="icon" href={'@public/logo/logo.webp'} />
        <meta name="description" content={PRODUCT_DESCRIPTION} />
      </Head>
      {/* end of page meta data */}
      <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin" />
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[323px]`}
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

export default Admin;
