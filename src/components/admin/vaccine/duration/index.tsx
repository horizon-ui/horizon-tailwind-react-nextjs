'use client';

import {
  useDeleteDoseDuration,
  useGetDoseDuration,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import ReportsTable from '../../reports/utils/table';
import { VACCINE_DOSE_DURATION_COLUMNS } from '../utils/columns';
import { DataWithKeys } from '../../reports/utils/columns';
import { AxiosResponse } from 'axios';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { Switch } from 'antd';
import { useState } from 'react';
import AddDuration from './create/add';
import { useActivityLogger } from '@src/components/logger';

const DoseDurationTab = () => {
  const { data: doseDurationData, isLoading, refetch } = useGetDoseDuration();
  const invalidateQuery = useInvalidateQuery();
  const [showDuration, setShowDuration] = useState<boolean>(false);
  const logActivity = useActivityLogger();

  const deleteMutation = useDeleteDoseDuration({
    onSuccess: (resp: AxiosResponse) => {
      invalidateQuery('durationData');
      refetch();
      warningAlert2('Deleted Dose duration succesfully');
      logActivity({
        title: 'Deleted Dose Duration',
        description: resp?.data
          ? `Deleted ${resp.data.name} from Dose Durations`
          : 'Deleted Dose Duration',
        action: 'deleted',
      });
    },
    onError: (error: Error) => {
      errorAlert('Error deleting dose');
    },
  });

  const handleEdit = (record: any) => {
    console.log(record);
  };

  const handleDelete = (record: any) => {
    if (record) {
      deleteMutation.mutate(record);
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  //@ts-ignore
  const dataSourceWithKeys = DataWithKeys(doseDurationData?.data);
  const columns = VACCINE_DOSE_DURATION_COLUMNS({ handleEdit, handleDelete });

  const handleShowDuration = (value: boolean) => {
    setShowDuration(value);
  };

  return (
    <div className="my-8">
      <section className="flex justify-end">
        <Switch
          onChange={(checked) => {
            handleShowDuration(checked);
          }}
          value={showDuration}
          checkedChildren={'Add'}
          unCheckedChildren={'View'}
        />
      </section>
      {!showDuration ? (
        <section>
          <ReportsTable
            columns={columns || []}
            tableDataSource={
              // @ts-ignore
              dataSourceWithKeys?.length > 0 ? dataSourceWithKeys : []
            }
            isLoading={isLoading}
          />
        </section>
      ) : (
        <section>
          <AddDuration handleShowDc={handleShowDuration} />
        </section>
      )}
    </div>
  );
};

export default DoseDurationTab;
