'use client';

import { useGetDoses } from '@src/utils/reactQuery';
import ReportsTable from '../../reports/utils/table';
import { VACCINE_DOSE_COLUMNS } from '../utils/columns';
import { DataWithKeys } from '../../reports/utils/columns';

const DosesTab = () => {
  const { data: doseData, isLoading, refetch } = useGetDoses();

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
  const dataSourceWithKeys = DataWithKeys(doseData?.data);
  const columns = VACCINE_DOSE_COLUMNS({ handleEdit, handleDelete });

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

export default DosesTab;
