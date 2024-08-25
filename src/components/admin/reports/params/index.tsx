'use client';

import {
  useDeleteParam,
  useGetParameters,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import ReportsTable from '../utils/table';
import { DataWithKeys, REPORTS_PARAM_COLUMNS } from '../utils/columns';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { AxiosResponse } from 'axios';
import { useActivityLogger } from '@src/components/logger';
import { useEffect } from 'react';

const ParamTab = () => {
  const { data: reportParamData, isLoading, refetch } = useGetParameters();
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const deleteParam = useDeleteParam({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        invalidateQuery('paramData');
        refetch();
        warningAlert2('Deleted Param succesfully');
        logActivity({
          title: 'Deleted Param',
          description: resp?.data
            ? `Deleted ${resp.data.name} from Params`
            : 'Deleted Param',
          action: 'deleted',
        });
      }
    },
    onError: (err: Error) => {
      errorAlert('Param deleting failed');
    },
  });

  const handleEdit = (record: any) => {
    console.log(record);
  };

  const handleDelete = (record: any) => {
    if (record) {
      // @ts-ignore
      deleteParam?.mutate(record);
    } else {
      errorAlert('Error Deleting Param');
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  //@ts-ignore
  const dataSourceWithKeys = DataWithKeys(reportParamData?.data);
  const columns = REPORTS_PARAM_COLUMNS({ handleEdit, handleDelete });

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

export default ParamTab;
