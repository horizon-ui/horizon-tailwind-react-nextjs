import { DCDataInterface } from '@src/api/utils/interface';
import { Button, Space } from 'antd';
import { MdDelete, MdEdit } from 'react-icons/md';

export const VACCINE_COLUMNS = ({ handleEdit, handleDelete }) => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
};

export const VACCINE_DOSE_COLUMNS = ({ handleEdit, handleDelete }) => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'doseDuration',
      key: 'doseDuration',
      sorter: (a, b) => a.duration.localeCompare(b.duration),
      render: (doseDuration) => {
        return <p>{doseDuration?.duration + '' + doseDuration?.type}</p>;
      },
    },
    {
      title: 'Vaccine',
      dataIndex: 'vaccine',
      key: 'vaccine',
      sorter: (a, b) => a.duration.localeCompare(b.duration),
      render: (vaccine) => {
        return <p>{vaccine?.name}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
};

export const VACCINE_DOSE_DURATION_COLUMNS = ({ handleEdit, handleDelete }) => {
  return [
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration, record) => {
        return <p>{record?.duration + ' ' + record?.type}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
};
