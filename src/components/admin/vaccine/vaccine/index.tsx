'use client';

import {
  useDeleteVaccine,
  useGetVaccine,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import { VACCINE_COLUMNS } from '../utils/columns';
import ReportsTable from '../../reports/utils/table';
import { DataWithKeys } from '../../reports/utils/columns';
import { AxiosResponse } from 'axios';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import AddVaccine from './create/add';
import { useState } from 'react';
import { Switch } from 'antd';
import { useActivityLogger } from '@src/components/logger';

const VaccineTab = () => {
  const [showVaccine, setShowVaccine] = useState<boolean>(false);
  const { data: vaccineData, isLoading, refetch } = useGetVaccine();
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const deleteMutation = useDeleteVaccine({
    onSuccess: (resp: AxiosResponse) => {
      invalidateQuery('vaccineData');
      refetch();
      warningAlert2('Deleted Vaccine succesfully');
      logActivity({
        title: 'Deleted Vaccine',
        description: resp?.data
          ? `Deleted ${resp.data.name} from Vaccines`
          : 'Deleted Vaccine',
        action: 'deleted',
      });
    },
    onError: (error: Error) => {
      errorAlert('Error deleting vaccine');
    },
  });

  const handleEdit = (record: any) => {
    console.log(record);
  };

  const handleDelete = (record: string) => {
    if (record) {
      deleteMutation.mutate(record);
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  //@ts-ignore
  const dataSourceWithKeys = DataWithKeys(vaccineData?.data);
  const columns = VACCINE_COLUMNS({ handleEdit, handleDelete });

  const handleShowDc = (value: boolean) => {
    setShowVaccine(value);
  };

  return (
    <div className="my-8">
      <section className="flex justify-end">
        <Switch
          onChange={(checked) => {
            handleShowDc(checked);
          }}
          value={showVaccine}
          checkedChildren={'Add'}
          unCheckedChildren={'View'}
        />
      </section>
      {showVaccine ? (
        <section>
          <AddVaccine handleShowDc={handleShowDc} />
        </section>
      ) : (
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
      )}
    </div>
  );
};

export default VaccineTab;
