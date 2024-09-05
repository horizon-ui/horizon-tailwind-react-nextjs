'use client';

import {
  useDeleteSample,
  useGetSamples,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import { DataWithKeys, REPORTS_SAMPLES_COLUMNS } from '../utils/columns';
import { useEffect } from 'react';
import ReportsTable from '../utils/table';
import { useActivityLogger } from '@src/components/logger';
import { AxiosResponse } from 'axios';
import { errorAlert, warningAlert2 } from '@src/components/alert';

const SampleTab = () => {
  const { data: reportSampleData, isLoading, refetch } = useGetSamples();
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const deleteSample = useDeleteSample({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        invalidateQuery('reportSampleType');
        refetch();
        warningAlert2('Deleted Sample succesfully');
        logActivity({
          title: 'Deleted Sample',
          description: resp?.data
            ? `Deleted ${resp.data.name} from Sample`
            : 'Deleted Sample',
          action: 'deleted',
        });
      }
    },
    onError: (err: Error) => {
      errorAlert('Sample deleting failed');
    },
  });

  const handleEdit = (record: any) => {};

  const handleDelete = (record: any) => {
    if (record) {
      // @ts-ignore
      deleteSample?.mutate(record);
    } else {
      errorAlert('Error Deleting Sample');
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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
