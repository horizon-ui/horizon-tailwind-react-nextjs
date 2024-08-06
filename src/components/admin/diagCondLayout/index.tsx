'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import AddDC from './addEdit';

const DcHeader = dynamic(
  () => import('./table/dcHeader').then((mod) => mod.default),
  {
    ssr: false,
  },
);
const DcTable = dynamic(() => import('./table').then((mod) => mod.default), {
  ssr: false,
});

const DiagConditionsLayout = () => {
  const [showDc, setShowDc] = useState(false);

  const handleShowDc = (checked: any) => {
    setShowDc(checked);
  };

  return (
    <div className="my-8">
      <DcHeader showDc={showDc} handleShowDc={handleShowDc} />
      {showDc ? <AddDC handleShowDc={handleShowDc} /> : <DcTable />}
    </div>
  );
};

export default DiagConditionsLayout;
