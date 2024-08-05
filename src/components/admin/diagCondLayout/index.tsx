'use client';
import dynamic from 'next/dynamic';
import DcHeader from './table/dcHeader';

const DcTable = dynamic(() => import('./table').then((mod) => mod.default), {
  ssr: false,
});

const DiagConditionsLayout = () => {
  return (
    <div className="my-8">
      <DcHeader />
      <DcTable />
    </div>
  );
};

export default DiagConditionsLayout;
