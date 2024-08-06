'use client';

import Admin from '@src/pages/dashboard/[[...index]]';
import dynamic from 'next/dynamic';

const VaccineLayout = dynamic(
  () =>
    import('@src/components/admin/vaccine/vaccineLayout').then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);
const Vaccine = () => {
  return (
    <Admin>
      <VaccineLayout />
    </Admin>
  );
};

export default Vaccine;
