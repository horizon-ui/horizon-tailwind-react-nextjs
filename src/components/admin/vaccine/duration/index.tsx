'use client';

import { useGetDoseDuration, useGetSamples } from '@src/utils/reactQuery';
import ReportsTable from '../../reports/utils/table';
import { VACCINE_DOSE_DURATION_COLUMNS } from '../utils/columns';
import { DataWithKeys } from '../../reports/utils/columns';

const DoseDurationTab = () => {
  const { data: doseDurationData, isLoading, refetch } = useGetDoseDuration();

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
  const dataSourceWithKeys = DataWithKeys(doseDurationData?.data);
  const columns = VACCINE_DOSE_DURATION_COLUMNS({ handleEdit, handleDelete });

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

export default DoseDurationTab;
