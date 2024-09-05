/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import { IRoute } from '@src/types/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_NAME } from '@src/constants/meta';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  const router = useRouter();

  useEffect(() => {
    // Prefetch important pages
    router.prefetch('/dashboard/default');
    router.prefetch('/dashboard/diagnosedConditions');
    router.prefetch('/dashboard/reports');
    router.prefetch('/dashboard/vaccine');
    router.prefetch('/dashboard/settings');
    router.prefetch('/dashboard/adminUsers');
  }, [router]);

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={`mx-[30px] mt-[50px] items-center`}>
        <Link href="/">
          <span className="flex items-center space-x-2 text-xl font-medium text-gray-900 dark:text-gray-100">
            <Image src={'/logo/logo.webp'} alt="" width={40} height={40} />
            <span>{PRODUCT_NAME}</span>
          </span>
        </Link>
      </div>
      <div className="mb-7 mt-[30px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      {/* <div className="flex justify-center">
        <SidebarCard />
      </div> */}

      {/* Nav item end */}
    </div>
  );
}

export default SidebarHorizon;
