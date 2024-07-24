import Link from 'next/link';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { PRODUCT_NAME } from 'src/constants/meta';
import Image from 'next/image';
import { UserButton, useSession, useUser } from '@clerk/nextjs';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/utils/recoil/user';

const Navbar: React.FC = () => {
  const navigation = ['Features', 'Terms', 'ChangeLog'];
  const user = useUser();
  const session = useSession();
  const userValue = useRecoilValue(userState);

  return (
    <div className="w-full">
      <nav className="container relative mx-auto flex flex-wrap items-center justify-between p-8 lg:justify-between xl:px-24">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex w-full flex-wrap items-center justify-between lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-xl font-medium text-gray-900 dark:text-gray-100">
                    <Image
                      src={'/logo/logo.webp'}
                      alt=""
                      width={40}
                      height={40}
                    />
                    <span>{PRODUCT_NAME}</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="dark:focus:bg-trueGray-700 ml-auto rounded-md px-2 py-1 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-300 lg:hidden"
                >
                  <svg
                    className="fill-current h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>
                <span className="mx-1 block lg:hidden">
                  <UserButton />
                </span>

                <Disclosure.Panel className="my-5 flex w-full flex-wrap lg:hidden">
                  <section className="flex">
                    {userValue && (
                      <Link
                        href="/admin/default"
                        className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
                      >
                        Dashboard
                      </Link>
                    )}
                  </section>
                  <>
                    {navigation.map((item) => (
                      <Link
                        key={item}
                        href={`/info/${item}`}
                        className="-ml-4 w-full rounded-md px-4 py-2 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-300 dark:focus:bg-gray-800"
                      >
                        {item}
                      </Link>
                    ))}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
        {/* menu  */}
        {/* Dashboard */}

        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="flex-1 list-none items-center justify-end pt-6 lg:flex lg:pt-0">
            {navigation.map((menu) => (
              <li className="nav__item mr-3" key={menu}>
                <Link
                  href={`/info/${menu}`}
                  className="inline-block rounded-md px-4 py-2 text-lg font-normal text-gray-800 no-underline hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-200 dark:focus:bg-gray-800"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav__item mr-3 hidden space-x-4 lg:flex">
          {session.isLoaded && !user.isSignedIn ? (
            <Link
              href="/signIn"
              className="rounded-md bg-orange-400 px-6 py-2 text-white md:ml-5"
            >
              SignIn
            </Link>
          ) : (
            <section className="flex">
              <UserButton />
              {userValue && (
                <Link
                  href="/admin/default"
                  className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
                >
                  Dashboard
                </Link>
              )}
            </section>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
