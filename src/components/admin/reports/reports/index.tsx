'use client';

import {
  useDeleteDC,
  useDeleteReport,
  useGetReports,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import ReportsTable from '../utils/table';
import { DataWithKeys, REPORTS_COLUMNS } from '../utils/columns';
import { useEffect } from 'react';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { AxiosResponse } from 'axios';
import { useActivityLogger } from '@src/components/logger';

const ReportsTab = () => {
  const { data: reportData, isLoading, refetch } = useGetReports();
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const deleteReport = useDeleteReport({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        warningAlert2('Deleted Report succesfully');
        invalidateQuery('reportData');
        logActivity({
          title: 'Deleted Report',
          description: resp?.data
            ? `Deleted ${resp.data.name} from reports`
            : 'Deleted Report',
          action: 'deleted',
        });
      }
    },
    onError: (err: Error) => {
      errorAlert('Report deleting failed');
    },
  });

  const handleEdit = (record: any) => {
    console.log(record);
  };

  const handleDelete = (record: any) => {
    if (record) {
      // @ts-ignore
      deleteReport?.mutate(record);
    } else {
      errorAlert('Error Deleting Report');
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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
