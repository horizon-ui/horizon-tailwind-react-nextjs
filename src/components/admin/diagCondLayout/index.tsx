'use client';
import { useState } from 'react';
import AddDC from './create/add';
import EditDC from './create/update';
import { warningAlert } from '@src/components/alert';
import DcHeader from './table/header';
import DcTable from './table';

// const DcHeader = dynamic(
//   () => import('./table/header').then((mod) => mod.default),
//   {
//     ssr: false,
//   },
// );
// const DcTable = dynamic(() => import('./table').then((mod) => mod.default), {
//   ssr: false,
// });

const DiagConditionsLayout = () => {
  const [showDc, setShowDc] = useState(false);
  const [editDc, setEditDC] = useState(false);
  const [editRecordId, setRecordId] = useState('');

  const handleShowDc = (checked: boolean) => {
    setShowDc(checked);
    setEditDC(!checked);
  };

  const handleEditDc = (edit: boolean, recordId: string) => {
    if (recordId) {
      setRecordId(recordId);
      setShowDc(edit);
      setEditDC(edit);
    } else {
      warningAlert('invalid record id');
    }
  };

  return (
    <div className="my-8">
      <DcHeader showDc={showDc} handleShowDc={handleShowDc} />
      {showDc ? (
        <>
          {editDc ? (
            <>
              {editRecordId ? (
                <EditDC handleShowDc={handleShowDc} recordId={editRecordId} />
              ) : (
                <p>Invalid Record id</p>
              )}
            </>
          ) : (
            <AddDC handleShowDc={handleShowDc} />
          )}
        </>
      ) : (
        <DcTable handleEditDc={handleEditDc} />
      )}
    </div>
  );
};

export default DiagConditionsLayout;
