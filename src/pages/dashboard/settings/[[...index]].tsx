'use client';

import Admin from '@src/pages/dashboard/[[...index]]';
import dynamic from 'next/dynamic';

const SettingsLayout = dynamic(
  () =>
    import('@src/components/admin/settings/settingsLayout').then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);
const Vaccine = () => {
  return (
    <Admin>
      <SettingsLayout />
    </Admin>
  );
};

export default Vaccine;
