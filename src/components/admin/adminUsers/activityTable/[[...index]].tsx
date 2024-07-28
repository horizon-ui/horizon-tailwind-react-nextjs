'use client';
import { userActivityData } from '@src/variables/data-tables/tableDataDevelopment';
import { Button, Input, Space, Table } from 'antd';
import { useCallback, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import debounce from 'lodash.debounce';
import 'antd/dist/reset.css'; // Import Ant Design styles

const ActivityTable = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState(userActivityData);
  const [pageSize, setPageSize] = useState(10);

  // Define the debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowercasedValue = value.toLowerCase();
      setFilteredData(
        userActivityData.filter(
          (record) =>
            record?.title.toLowerCase().includes(lowercasedValue) ||
            record?.description.toLowerCase().includes(lowercasedValue) ||
            record?.action.toLowerCase().includes(lowercasedValue) ||
            record?.user?.userName.toLowerCase().includes(lowercasedValue),
        ),
      );
    }, 300), // Adjust debounce delay as needed (300ms here)
    [],
  );

  // Reset search
  const handleReset = () => {
    setSearchText('');
    setFilteredData(userActivityData);
  };

  // Column data
  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (_id, record) => {
        console.log(record);
        return <p>{record?.user?.userName}</p>;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.name),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'ractionole',
      sorter: (a, b) => a.action.localeCompare(b.role),
    },
    {
      title: 'Details',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Time',
      dataIndex: 'timeStamp',
      key: 'timeStamp',
    },
  ];

  return (
    <div>
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search by title, details, action..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              debouncedSearch(e.target.value);
            }}
            prefix={<MdSearch />}
            style={{ width: 300 }}
          />
          <Button onClick={handleReset}>Reset</Button>
        </Space>
        <div className="overflow-x-auto">
          <Table
            dataSource={filteredData}
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
              pageSize: pageSize,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50', '100'],
              onShowSizeChange: (current, size) => setPageSize(size),
            }}
            loading={false}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;
