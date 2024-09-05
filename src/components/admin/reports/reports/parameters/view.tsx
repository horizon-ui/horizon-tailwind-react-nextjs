//@ts-nocheck

import { useState } from 'react';
import { useRecoilState } from 'recoil';
import UpdateParam from './create/update';
import {
  bioRefState,
  paramState,
  testDetailsState,
} from '@src/utils/recoil/reports';

import { PARAMETER_COLUMNS } from '../../utils/columns';
import ReportsTable, { CommonSettingTable } from '../../utils/table';

export const ViewParameters = () => {
  const [testDetails, setTestDetail] = useRecoilState(testDetailsState);
  const [param, setParam] = useRecoilState(paramState);
  const [bioRef, setBioRef] = useRecoilState(bioRefState);
  const [editParam, setEditParam] = useState(false);

  const handleHide = () => {
    setEditParam(false);
  };

  const handleEdit = (record) => {
    setEditParam(true);
    setParam(record);
    setBioRef(record?.bioRefRange);
  };

  const handleDelete = (record) => {
    const updatedParameters = testDetails?.parameters?.filter(
      (param) => param?.name !== record?.name,
    );
    setTestDetail({ ...testDetails, parameters: updatedParameters });
  };

  const columns = PARAMETER_COLUMNS({ handleEdit, handleDelete });

  return (
    <section>
      {/* <CommonSettingTable data={testDetails?.parameters} columns={columns} /> */}
      <ReportsTable
        columns={columns || []}
        tableDataSource={
          // @ts-ignore
          testDetails?.parameters?.length > 0 ? testDetails?.parameters : []
        }
        isLoading={false}
      />
      {editParam && <UpdateParam handleHide={handleHide} />}
    </section>
  );
};
