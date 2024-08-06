'use client';

import { useGetVaccine } from '@src/utils/reactQuery';
import { VACCINE_COLUMNS } from '../utils/columns';
import ReportsTable from '../../reports/utils/table';
import { DataWithKeys } from '../../reports/utils/columns';

const VaccineTab = () => {
  const { data: vaccineData, isLoading, refetch } = useGetVaccine();

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
  const dataSourceWithKeys = DataWithKeys(vaccineData?.data);
  const columns = VACCINE_COLUMNS({ handleEdit, handleDelete });

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

export default VaccineTab;
