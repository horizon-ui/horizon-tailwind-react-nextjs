'use client';

import { useGetReports } from '@src/utils/reactQuery';
import ReportsTable from '../utils/table';
import { DataWithKeys, REPORTS_COLUMNS } from '../utils/columns';
import { useEffect } from 'react';

const ReportsTab = () => {
  const { data: reportData, isLoading, refetch } = useGetReports();

  const handleEdit = (record: any) => {
    console.log(record);
  };
  const handleDelete = (record: any) => {
    console.log(record);
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  //@ts-ignore
  const dataSourceWithKeys = DataWithKeys(reportData?.data);
  const columns = REPORTS_COLUMNS({ handleEdit, handleDelete });

  return (
    <div className="my-8">
      <ReportsTable
        columns={columns || []}
        tableDataSource={
          // @ts-ignore
          dataSourceWithKeys?.length > 0 ? dataSourceWithKeys : []
        }
        isLoading={isLoading}
      />
    </div>
  );
};

export default ReportsTab;
