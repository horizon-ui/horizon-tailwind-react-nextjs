'use client';

import Admin from '@src/pages/dashboard/[[...index]]';
import dynamic from 'next/dynamic';

const DiagConditionsLayout = dynamic(
  () =>
    import('@src/components/admin/diagCondLayout/index').then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);

const DiagnosedConditions = () => {
  return (
    <Admin>
      <DiagConditionsLayout />
    </Admin>
  );
};

export default DiagnosedConditions;
