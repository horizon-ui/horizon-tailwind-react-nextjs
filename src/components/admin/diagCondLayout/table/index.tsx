'use client';
import { Table } from 'antd';
import { useEffect } from 'react';
import { DIAGNOSED_CONDITIONS_COLUMNS } from '../utils/column';
import { useGetDiagnosedConditions } from '@src/utils/reactQuery';

const DcTable = () => {
  const {
    data: DiagnosedConditions,
    refetch,
    status,
  } = useGetDiagnosedConditions();
  const handleEdit = (record: Object) => {};
  const handleDelete = (record: Object) => {};

  let columns = DIAGNOSED_CONDITIONS_COLUMNS.map((column) =>
    column.key === 'action'
      ? {
          ...column,
          render: (text, record) => (
            <div>
              <button onClick={() => handleEdit(record)}>🖉 Edit</button>
              <button onClick={() => handleDelete(record)}>🗑 Delete</button>
            </div>
          ),
        }
      : column,
  );

  let dcDataSource = DiagnosedConditions?.data;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <Table
          dataSource={dcDataSource}
          //@ts-ignore
          columns={columns}
          style={{
            borderRadius: '8px',
            border: '2px solid @#00000', // Apply border color
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
            backgroundColor: 'white', // Ensure background color is set
          }}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            // onShowSizeChange: (current, size) => setPageSize(size),
          }}
          //   loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default DcTable;
