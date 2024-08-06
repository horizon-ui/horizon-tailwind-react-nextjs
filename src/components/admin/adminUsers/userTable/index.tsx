'use client';

import { Button, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAdminUsers } from '@src/utils/reactQuery';
import { ADMIN_USER_COLUMNS } from './utils';
import { useRecoilState } from 'recoil';
import { userListState } from '@src/utils/recoil';
import { UserData } from '@src/api/utils/interface';
import { MdEdit } from 'react-icons/md';
import { useUser } from '@clerk/nextjs';
import AdminUserHeader from './header';
import UpdateUser from './updateUser';

const UserTable = () => {
  const { user } = useUser();
  const [pageSize, setPageSize] = useState(10);
  const phone = user?.phoneNumbers[0]?.phoneNumber;
  const { data: adminUserData, isLoading, refetch } = useAdminUsers();
  const [userListRecoil, setUserListRecoil] = useRecoilState<[]>(userListState);
  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [recordId, setRecordId] = useState('');

  useEffect(() => {
    if (!isLoading && adminUserData) {
      //@ts-ignore
      setUserListRecoil(adminUserData?.data);
    }
  }, [isLoading, adminUserData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEdit = (userId: string) => {
    setRecordId(userId);
    setShowEdit(true);
  };

  const handleShowUser = (showUser: Boolean) => {
    setShowEdit(showUser);
  };

  const columns = ADMIN_USER_COLUMNS.map((dc) => {
    if (dc.key === 'action') {
      return {
        ...dc,
        render: (_, record: UserData) => (
          <>
            {!(record.phoneNumber === phone) && (
              <span className="hidden sm:block">
                <Space size="middle">
                  <Button
                    icon={<MdEdit />}
                    onClick={() => handleEdit(record._id)}
                  >
                    Update
                  </Button>
                </Space>
              </span>
            )}
          </>
        ),
      };
    }
    return dc;
  });

  const dataSourceWithKeys =
    userListRecoil?.length > 0 &&
    userListRecoil.map((record: any, index) => ({
      ...record,
      key: record.key || record.id || index,
    }));

  return (
    <div className="my-6">
      <section>{!showEdit && <AdminUserHeader />}</section>
      <div className="custom-table overflow-x-auto">
        {showEdit ? (
          <UpdateUser handleShowUser={handleShowUser} recordId={recordId} />
        ) : (
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
        )}
      </div>
      {isLoading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
          <Button isLoading loadingText="Fetching Data" variant="outline">
            Button
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
