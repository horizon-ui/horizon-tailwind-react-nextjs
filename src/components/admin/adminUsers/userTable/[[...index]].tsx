'use client';
// import { Space, Table } from 'antd';
import adminDataComplex from '@src/variables/data-tables/tableDataDevelopment';
import { Space, Table } from 'antd';
import { MdEdit } from 'react-icons/md';

const UserTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <MdEdit />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="">
        <Table
          dataSource={adminDataComplex}
          columns={columns}
          style={{
            border: '2px solid #d9d9d9',
            borderRadius: '8px',
          }}
        />
        ;
      </div>
    </div>
  );
};

export default UserTable;
