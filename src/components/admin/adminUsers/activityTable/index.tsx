'use client';
import { useGetActivities } from '@src/utils/reactQuery';
import { Table } from 'antd';
import 'antd/dist/reset.css';
import { useState } from 'react';
import { ADMIN_USER_ACTIVITES_COLUMNS } from '../userTable/utils';
import { Button } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userListState } from '@src/utils/recoil';
import { UserData } from '@src/api/utils/interface';
import { AxiosResponse } from 'axios';

const ActivityTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data: adminUserData, isLoading, refetch } = useGetActivities();
  const [userListRecoil, setUserListRecoil] = useRecoilState<[]>(userListState);

  const dataSourceWithKeys =
    adminUserData?.data?.length > 0 &&
    adminUserData?.data.map((record: any, index) => ({
      ...record,
      key: record.key || record.id || index,
    }));

  const columns = ADMIN_USER_ACTIVITES_COLUMNS.map((column) => {
    if (column.key === 'user') {
      return {
        ...column,
        filters: userListRecoil?.map((user: UserData) => ({
          text: user?.userName,
          value: user?.userName,
        })),
        onFilter: (value, record) => record.user.userName.includes(value),
      };
    }
    return column;
  });

  return (
    <div>
      <div className="my-6">
        <div className="custom-table overflow-x-auto">
          <Table
            //@ts-ignore
            dataSource={
              dataSourceWithKeys?.length > 0 ? dataSourceWithKeys : []
            }
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
              Button
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTable;
