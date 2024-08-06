import { render } from '@headlessui/react/dist/utils/render';

export const ADMIN_USER_COLUMNS = [
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
  },
];

export const ADMIN_USER_ACTIVITES_COLUMNS = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    filters: [],
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

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return date.toLocaleDateString();
};
