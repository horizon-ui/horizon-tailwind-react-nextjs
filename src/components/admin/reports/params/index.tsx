'use client';

import { useGetParameters } from '@src/utils/reactQuery';
import ReportsTable from '../utils/table';
import { DataWithKeys, REPORTS_PARAM_COLUMNS } from '../utils/columns';

const ParamTab = () => {
  const { data: reportParamData, isLoading, refetch } = useGetParameters();

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
