'use client';

import {
  useDeleteDose,
  useGetDoses,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import ReportsTable from '../../reports/utils/table';
import { VACCINE_DOSE_COLUMNS } from '../utils/columns';
import { DataWithKeys } from '../../reports/utils/columns';
import { AxiosResponse } from 'axios';
import { errorAlert, warningAlert2 } from '@src/components/alert';

const DosesTab = () => {
  const { data: doseData, isLoading, refetch } = useGetDoses();
  const invalidateQuery = useInvalidateQuery();

  const deleteMutation = useDeleteDose({
    onSuccess: (resp: AxiosResponse) => {
      warningAlert2('Deleted Dose succesfully');
      invalidateQuery('doseData');
    },
    onError: (error: Error) => {
      errorAlert('Error deleting dose');
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
