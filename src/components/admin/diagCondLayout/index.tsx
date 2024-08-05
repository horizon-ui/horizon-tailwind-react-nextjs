'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

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

  const handleShowDc = (checked: Boolean) => {
    setShowDc(checked);
  };

  return (
    <div className="my-8">
      <DcHeader handleShowDc={handleShowDc} />
      {showDc ? <></> : <DcTable />}
    </div>
  );
};

export default DiagConditionsLayout;
