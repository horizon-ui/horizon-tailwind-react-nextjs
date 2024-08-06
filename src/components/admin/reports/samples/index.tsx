'use client';

import { useGetSamples } from '@src/utils/reactQuery';
import { DataWithKeys, REPORTS_SAMPLES_COLUMNS } from '../utils/columns';
import { useEffect } from 'react';
import ReportsTable from '../utils/table';

const SampleTab = () => {
  const { data: reportSampleData, isLoading, refetch } = useGetSamples();

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
  const dataSourceWithKeys = DataWithKeys(reportSampleData?.data);
  const columns = REPORTS_SAMPLES_COLUMNS({ handleEdit, handleDelete });

  return (
    <div className="my-8">
      <ReportsTable
        columns={columns}
        tableDataSource={
          // @ts-ignore
          dataSourceWithKeys?.length > 0 ? dataSourceWithKeys : []
        }
        isLoading={isLoading}
      />
    </div>
  );
};

export default SampleTab;
