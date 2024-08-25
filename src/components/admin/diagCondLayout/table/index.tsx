'use client';

import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import {
  useDeleteDC,
  useGetDiagnosedConditions,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import { DIAGNOSED_CONDITIONS_COLUMNS } from '../utils/column';
import { useRecoilState } from 'recoil';
import { diagConditionState } from '@src/utils/recoil/diagnosedConditions';
import { DCDataInterface } from '@src/api/utils/interface';
import { MdDelete, MdEdit } from 'react-icons/md';
import { AxiosResponse } from 'axios';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { useActivityLogger } from '@src/components/logger';
import { Button } from '@chakra-ui/react';
import { DataWithKeys } from '../../reports/utils/columns';

const DcTable = ({ handleEditDc }) => {
  const [pageSize, setPageSize] = useState(10);
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const [dcRecoilValue, setDcRecoilValue] =
    useRecoilState<[]>(diagConditionState);
  const deleteDCMutation = useDeleteDC({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        warningAlert2('Deleted DC succesfully');
        invalidateQuery('diagnosedConditions');
        invalidateQuery('adminDashboard');
        logActivity({
          title: 'Deleted Diagnosed Conditions',
          description: resp?.data
            ? `Deleted ${resp.data.name} to Diagnosed Condition`
            : 'Deleted Diagnosed Condition',
          action: 'deleted',
        });
      }
    },
    onError: (err: Error) => {
      errorAlert('DC deleting failed');
    },
  });

  const {
    data: diagConditionsData,
    isLoading,
    refetch,
  } = useGetDiagnosedConditions();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    //@ts-ignore
    if (!isLoading && diagConditionsData && diagConditionsData.data) {
      //@ts-ignore
      setDcRecoilValue(diagConditionsData.data);
    }
  }, [isLoading, diagConditionsData, setDcRecoilValue]);

  const handleEdit = (recordId: string) => {
    handleEditDc(true, recordId);
  };

  const handleDelete = (recordId: string) => {
    if (recordId) {
      deleteDCMutation.mutate(recordId);
    } else {
      errorAlert('Error Deleting DC');
    }
  };

  const dataSourceWithKeys = DataWithKeys(dcRecoilValue);
  const columns = DIAGNOSED_CONDITIONS_COLUMNS({ handleEdit, handleDelete });

  return (
    <div className="my-6">
      <div className="custom-table overflow-x-auto">
        <Table
          //@ts-ignore
          dataSource={dataSourceWithKeys.length > 0 ? dataSourceWithKeys : []}
          columns={columns}
          pagination={{
            pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            onShowSizeChange: (_, size) => setPageSize(size),
            style: {
              marginRight: '2vw',
              textAlign: 'center',
            },
          }}
          loading={isLoading}
          // style={{ backgroundColor: 'white' }}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {isLoading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
          <Button isLoading loadingText="Fetching Data" variant="outline">
            Button
          </Button>
        </div>
      )}
    </div>
  );
};

export default DcTable;
