import { Space, Tag } from 'antd';

export const DIAGNOSED_CONDITIONS_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    sorter: (a, b) => a.title.localeCompare(b.title),
    render: (text) => (
      <div
        className="w-[10vw] capitalize"
        style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
      >
        {text}
      </div>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    sorter: (a, b) => a.title.localeCompare(b.title),
    render: (text) => (
      <div
        className="w-[10vw] capitalize"
        style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
      >
        {text}
      </div>
    ),
  },
  {
    title: 'Alias',
    dataIndex: 'aliases',
    key: 'aliases',
    render: (aliases) => {
      console.log(aliases);
      let moreDots = false;
      if (aliases?.length > 3) {
        aliases = aliases.slice(0, 3);
        moreDots = true;
      }
      return (
        <Space
          className="w-[10vw] uppercase"
          style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          onMouseEnter={() => {}}
          size={[0, 1]}
          wrap
        >
          {aliases?.map((alias) => (
            <Tag color="geekblue" key={alias}>
              {alias}
            </Tag>
          ))}
          {moreDots && <Tag color="geekblue">...</Tag>}
        </Space>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status ? 'green' : 'red'}>
        {status ? 'Active' : 'Inactive'}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
  },
];
