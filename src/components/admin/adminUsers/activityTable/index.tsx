'use client';
import { useGetActivities } from '@src/utils/reactQuery';
import { Table } from 'antd';
// import 'antd/dist/reset.css';
import { useState } from 'react';
import { ADMIN_USER_ACTIVITES_COLUMNS } from '../userTable/utils';
import { Button } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { userListState } from '@src/utils/recoil';
import { UserData } from '@src/api/utils/interface';
import { DataWithKeys } from '../../reports/utils/columns';

const ActivityTable = () => {
  const [pageSize, setPageSize] = useState(8);
  const { data: adminUserData, isLoading } = useGetActivities();
  const [userListRecoil] = useRecoilState<any>(userListState);

  const dataSourceWithKeys = DataWithKeys(adminUserData?.data);
  const columns = ADMIN_USER_ACTIVITES_COLUMNS({ userList: userListRecoil });

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
