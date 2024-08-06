import { Button } from '@chakra-ui/react';
import { Table } from 'antd';
import { useState } from 'react';

const ReportsTable = ({ columns, tableDataSource, isLoading }) => {
  const [pageSize, setPageSize] = useState(7);
  return (
    <div className="my-6">
      <div className="custom-table overflow-x-auto">
        <Table
          //@ts-ignore
          dataSource={tableDataSource.length > 0 ? tableDataSource : []}
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
          scroll={{ x: 'max-content' }}
        />
      </div>
      {isLoading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
          <Button isLoading loadingText="Fetching Data" variant="outline">
            Loading...
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
