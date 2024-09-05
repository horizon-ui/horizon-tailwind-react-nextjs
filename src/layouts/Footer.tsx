import Container from '@component/container/Container';
import { COPYRIGHT, PRODUCT_DESCRIPTION, PRODUCT_NAME } from '@constants/meta';
import Link from 'next/link';
import React from 'react';
import Twitter from '@public/icons/socials/Twitter';
import Facebook from '@public/icons/socials//Facebook';
import Instagram from '@public/icons/socials//Instagram';
import LinkedIn from '@public/icons/socials//LinkedIn';
import Image from 'next/image';

export default function Footer() {
  // navigation items
  // at the moment, all pages are linked to the home page
  const navigation = [
    { name: 'Product', href: '/info/Product' },
    { name: 'Features', href: '/info/Features' },
    { name: 'Company', href: '/info/Company' },
    { name: 'Blog', href: 'https://blog.omerald.com/' },
  ];

  // legal items
  // at the moment, all pages are linked to the home page
  const legal = [
    { name: 'Terms', href: '/info/Terms' },
    { name: 'Privacy', href: '/info/Privacy' },
    { name: 'Legal', href: '/info/Legal' },
  ];

  // social items
  const socials = [
    {
      name: 'Twitter',
      href: 'https://x.com/OmeraldAvin',
      element: <Twitter />, // Updated Twitter link
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=100078867678767&ref=xav_ig_profile_web',
      element: <Facebook />, // Existing Facebook link
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/omeraldsocial/',
      element: <Instagram />, // Existing Instagram link
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/OmeraldAvin/',
      element: <LinkedIn />,
    },
  ];

  return (
    <div className="relative p-8 xl:px-24">
      <Container>
        <div className="dark:border-trueGray-700 mx-auto mt-5 grid grid-cols-1 gap-10 border-t border-gray-400 pt-10 lg:grid-cols-5 lg:px-20">
          <div className="lg:col-span-2">
            {/* product name and desc */}
            <div>
              {/* <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
              >
                <span>{PRODUCT_NAME}</span>
              </Link> */}
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
            </div>

            <div className="mt-4 max-w-md text-gray-500 dark:text-gray-400">
              {PRODUCT_DESCRIPTION}
            </div>
          </div>
          {/* product name and desc end */}

          {/* links to other pages */}
          <div className="col-span-1">
            <div className="-ml-3 -mt-2 flex w-full flex-wrap lg:ml-0">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="dark:focus:bg-trueGray-700 w-full rounded-md px-4 py-2 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* links to other pages end */}

          {/* legal links */}
          <div className="col-span-1">
            <div className="-ml-3 -mt-2 flex w-full flex-wrap lg:ml-0">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="dark:focus:bg-trueGray-700 w-full rounded-md px-4 py-2 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* legal links */}

          {/* social links */}
          <div className="col-span-1">
            <div>Follow us</div>
            <div className="mt-5 flex space-x-5 text-gray-400 dark:text-gray-500">
              {socials.map((item) => {
                return (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    key={item.name}
                  >
                    <span className="sr-only">{item.name}</span>
                    {item.element}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        {/* social links end */}

        {/* copyright */}
        <div className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
          {COPYRIGHT}
        </div>
      </Container>
    </div>
  );
}
