'use client';

import { Button, Space, Table } from 'antd';
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
      errorAlert('DC deleting sucesfully');
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

  const handleDCDelete = (recordId: string) => {
    if (recordId) {
      deleteDCMutation.mutate(recordId);
    } else {
      errorAlert('Error Deleting DC');
    }
  };

  const columns = DIAGNOSED_CONDITIONS_COLUMNS.map((dc) => {
    if (dc.key === 'action') {
      return {
        ...dc,
        render: (_, record: DCDataInterface) => (
          <>
            <span className="hidden sm:block">
              <Space size="middle">
                <Button
                  icon={<MdEdit />}
                  onClick={() => handleEdit(record._id)}
                >
                  Edit
                </Button>
                <Button
                  icon={<MdDelete />}
                  onClick={() => handleDCDelete(record._id)}
                >
                  Delete
                </Button>
              </Space>
            </span>
            <span className="block flex gap-4 sm:hidden">
              <MdEdit
                className="text-indigo-800"
                onClick={() => handleEdit(record._id)}
              />
              <MdDelete
                className="text-red-500"
                onClick={() => handleDCDelete(record._id)}
              />
            </span>
          </>
        ),
      };
    }
    return dc;
  });

  const dataSourceWithKeys =
    dcRecoilValue?.length > 0 &&
    dcRecoilValue.map((record: any, index) => ({
      ...record,
      key: record.key || record.id || index,
    }));

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
    </div>
  );
};

export default DcTable;
