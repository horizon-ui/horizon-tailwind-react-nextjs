import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdStar,
  MdHealing,
  MdReport,
  MdEditDocument,
  MdVaccines,
  MdSettings,
  MdAdminPanelSettings,
} from 'react-icons/md';

const routes = [
  {
    name: 'Dashboard',
    layout: '/dashboard',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Diganosed Conditions',
    layout: '/dashboard',
    path: 'diagnosedConditions',
    icon: <MdHealing className="h-6 w-6" />,
  },
  {
    name: 'Reports',
    layout: '/dashboard',
    path: 'reports',
    icon: <MdEditDocument className="h-6 w-6" />,
  },
  {
    name: 'Vaccine',
    layout: '/dashboard',
    path: 'vaccine',
    icon: <MdVaccines className="h-6 w-6" />,
  },
  {
    name: 'Settings',
    layout: '/dashboard',
    path: 'settings',
    icon: <MdSettings className="h-6 w-6" />,
  },
  {
    name: 'Admin Users',
    layout: '/dashboard',
    path: 'adminUsers',
    icon: <MdAdminPanelSettings className="h-6 w-6" />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/dashboard',
  //   path: 'nft-marketplace',
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,

  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/dashboard',
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: 'data-tables',
  // },
  // {
  //   name: 'Profile',
  //   layout: '/dashboard',
  //   path: 'profile',
  //   icon: <MdPerson className="h-6 w-6" />,
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/dashboard',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
];
export default routes;
