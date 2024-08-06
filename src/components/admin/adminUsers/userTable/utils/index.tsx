import { UserData } from '@src/api/utils/interface';
import { Button, Space } from 'antd';
import { MdEdit } from 'react-icons/md';

export const ADMIN_USER_COLUMNS = ({ phone, handleEdit }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
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
      render: (role, record) => {
        return <p className="uppercase">{role}</p>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record: UserData) => (
        <>
          {!(record.phoneNumber === phone) && (
            <span className="hidden sm:block">
              <Space size="middle">
                <Button onClick={() => handleEdit(record._id)}>
                  <MdEdit /> Update
                </Button>
              </Space>
            </span>
          )}
        </>
      ),
    },
  ];
  return columns;
};

export const ADMIN_USER_ACTIVITES_COLUMNS = ({ userList }) => {
  return [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      filters: userList.map((user: UserData) => {
        return {
          text: user.userName,
          value: user.userName,
        };
      }),
      sorter: (a, b) => a.user.userName.localeCompare(b?.userName),
      onFilter: (value, record) => record.user.userName.includes(value),
      render: (user) => {
        return <p>{user?.userName}</p>;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      filters: [
        { text: 'Added', value: 'added' },
        { text: 'Updated', value: 'updated' },
        { text: 'Deleted', value: 'deleted' },
      ],
      onFilter: (value, record) => record.action.includes(value),
      render: (action) => {
        return <p className={`uppercase text-indigo-600`}>{action}</p>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'timeStamp',
      key: 'timeStamp',
      render: (timeStamp) => {
        return <p>{formatDate(timeStamp)}</p>;
      },
    },
  ];
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};
