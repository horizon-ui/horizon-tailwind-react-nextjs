/* eslint-disable */
import React, { useMemo } from 'react';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import DashIcon from '@component/icons/DashIcon';

import Link from 'next/link';

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname();
  const { routes } = props;

  const activeRoute = useCallback(
    (routeName: string) => pathname?.includes(routeName),
    [pathname],
  );

  const createLinks = useMemo(() => {
    return routes.map((route) => (
      <Link
        key={route.path}
        href={route.layout + '/' + route.path}
        prefetch={true}
      >
        <div
          className={`relative mb-8 flex items-center rounded-md px-8 py-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <li className="my-[3px] flex w-full items-center">
            <span
              className={`${
                activeRoute(route.path)
                  ? 'font-medium text-brand-500 dark:text-white'
                  : 'font-medium text-gray-600'
              }`}
            >
              {route.icon || <DashIcon />}
            </span>
            <p
              className={`leading-1 ml-4 flex ${
                activeRoute(route.path)
                  ? 'font-medium text-navy-700 dark:text-white'
                  : 'font-medium text-gray-600'
              }`}
            >
              {route.name}
            </p>
          </li>
          {activeRoute(route.path) && (
            <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
          )}
        </div>
      </Link>
    ));
  }, [routes, activeRoute]);

  return <ul>{createLinks}</ul>;
};

export default React.memo(SidebarLinks);
