'use client';
// import { Space, Table } from 'antd';
import { userData } from '@src/variables/data-tables/tableDataDevelopment';
import { Button, Input, Space, Table } from 'antd';
import { useCallback, useState } from 'react';
import { MdDelete, MdEdit, MdSearch } from 'react-icons/md';
import debounce from 'lodash.debounce';
import UpdateUser from './updateUser';
import { warningAlert } from '@src/components/alert';
import 'antd/dist/reset.css'; // Import Ant Design styles

// Filter Config
export const filterConfig = {
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: {
    setSelectedKeys: (keys: string[]) => void;
    selectedKeys: (string | number)[];
    confirm: () => void;
    clearFilters: () => void;
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder="Search Role"
        value={selectedKeys[0] as string}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<MdSearch />}
          size="large"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters()}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <MdSearch
      style={{ color: filtered ? '#1890ff' : undefined }}
      className="h-[20px] w-[20px]"
    />
  ),
  onFilter: (value: string | number, record: { role: string }) =>
    record.role.toLowerCase().includes((value as string).toLowerCase()), // Enable filtering by role
};

interface User {
  name: String;
  phoneNumber: String;
  role: String;
  _id: String;
}

const UserTable = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isUpdateUser, setUpdateUser] = useState<boolean>(false);
  const [userToBeUpdate, setUserToBeUpdated] = useState<{}>(false);
  const [filteredData, setFilteredData] = useState(userData);
  const [pageSize, setPageSize] = useState(10); // Number of items per page

  // Define the debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowercasedValue = value.toLowerCase();
      setFilteredData(
        userData.filter(
          (record) =>
            record?.userName.toLowerCase().includes(lowercasedValue) ||
            record?.phoneNumber.toLowerCase().includes(lowercasedValue) ||
            record?.role.toLowerCase().includes(lowercasedValue),
        ),
      );
    }, 300), // Adjust debounce delay as needed (300ms here)
    [],
  );

  // Reset search
  const handleReset = () => {
    setSearchText('');
    setFilteredData(userData);
  };

  const handleViewUser = () => {
    setUpdateUser(false);
  };

  const handleDeleteUser = (record: User) => {
    if (record?._id) {
      let updatedData = userData?.filter((user) => {
        return user?._id === record?._id;
      });
    }
    warningAlert('Deleted User');
  };

  // Column data
  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      sorter: (a, b) => a.role.localeCompare(b.role),
      ...filterConfig,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <span>
            <a href="#">
              <MdEdit
                onClick={() => {
                  setUpdateUser(true);
                  setUserToBeUpdated(record);
                }}
                className="h-5 w-5 text-green-800"
              />
            </a>
          </span>
          <span>
            <a href="#">
              <MdDelete
                onClick={() => {
                  handleDeleteUser(record);
                }}
                className="h-5 w-5 text-red-600"
              />
            </a>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {!isUpdateUser ? (
        <div>
          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search..."
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
              columns={columns}
              style={{
                borderRadius: '8px',
                border: '2px solid @#00000', // Apply border color
                boxShadow:
                  'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
                backgroundColor: 'white', // Ensure background color is set
              }}
              borderColor="red"
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
      ) : (
        <UpdateUser user={userToBeUpdate} handleViewUser={handleViewUser} />
      )}
    </div>
  );
};

export default UserTable;
