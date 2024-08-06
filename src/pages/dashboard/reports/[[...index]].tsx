'use client';

import Admin from '@src/pages/dashboard/[[...index]]';
import dynamic from 'next/dynamic';

const ReportsLayout = dynamic(
  () =>
    import('@src/components/admin/reports/reportLayout').then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);

const Reports = () => {
  return (
    <Admin>
      <ReportsLayout />
    </Admin>
  );
};

export default Reports;
