'use client';

import {
  useDeleteDose,
  useGetDoseDuration,
  useGetDoses,
  useGetVaccine,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import ReportsTable from '../../reports/utils/table';
import { VACCINE_DOSE_COLUMNS } from '../utils/columns';
import { DataWithKeys } from '../../reports/utils/columns';
import { AxiosResponse } from 'axios';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { useEffect, useState } from 'react';
import { useActivityLogger } from '@src/components/logger';
import { Switch } from 'antd';
import AddDose from './create/add';
import UpdateDose from './create/update';
import { useSetRecoilState } from 'recoil';
import { doseState } from '@src/utils/recoil/vaccine';
import { VaccineDoseTable } from './table';

const DosesTab = () => {
  const { data: doseData, isLoading, refetch } = useGetDoses();
  const { data: doseDurationData } = useGetDoseDuration();
  const { data: vaccineData } = useGetVaccine();
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();
  const [showDose, setDose] = useState<boolean>(false);
  const [editDose, setEditDose] = useState<boolean>(false);
  const setDoseRecoil = useSetRecoilState(doseState);

  const deleteMutation = useDeleteDose({
    onSuccess: (resp: AxiosResponse) => {
      invalidateQuery('doseData');
      refetch();
      warningAlert2('Deleted Dose succesfully');
      logActivity({
        title: 'Deleted Dose',
        description: resp?.data
          ? `Deleted ${resp.data.name} from Doses`
          : 'Deleted Dose',
        action: 'deleted',
      });
    },
    onError: (error: Error) => {
      errorAlert('Error deleting dose');
    },
  });

  const handleEdit = (record: any) => {
    setDoseRecoil(record);
    setEditDose(true);
    setDose(true);
  };

  const handleDelete = (record: string) => {
    if (record) {
      deleteMutation.mutate(record);
    }
  };

  const handleShowDose = (value: boolean) => {
    setDose(value);
  };

  const handleEditDose = (value: boolean) => {
    setEditDose(value);
    setDose(value);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  //@ts-ignore
  const dataSourceWithKeys = DataWithKeys(doseData?.data);
  const columns = VACCINE_DOSE_COLUMNS({ handleEdit, handleDelete });

  return (
    <div className="my-8">
      <section className="flex justify-between">
        <VaccineDoseTable
          doseData={dataSourceWithKeys}
          durationList={doseDurationData?.data}
          vaccineList={vaccineData?.data}
        />
        <Switch
          onChange={(checked) => {
            handleShowDose(checked);
          }}
          value={showDose}
          checkedChildren={'Add'}
          unCheckedChildren={'View'}
        />
      </section>

      {!showDose ? (
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
          {!editDose ? (
            <AddDose handleShowDose={handleShowDose} />
          ) : (
            <UpdateDose handleEditDose={handleEditDose} />
          )}
        </section>
      )}
    </div>
  );
};

export default DosesTab;
