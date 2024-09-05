import React from 'react';

import {
  MdHome,
  MdHealing,
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
];
export default routes;
