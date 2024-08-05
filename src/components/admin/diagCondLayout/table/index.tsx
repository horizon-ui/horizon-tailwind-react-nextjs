'use client';

import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useGetDiagnosedConditions } from '@src/utils/reactQuery';
import { DIAGNOSED_CONDITIONS_COLUMNS } from '../utils/column';
import { useRecoilState } from 'recoil';
import { diagConditionState } from '@src/utils/recoil/diagnosedConditions';
import './dc.module.css';

const DcTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [dcRecoilValue, setDcRecoilValue] = useRecoilState(diagConditionState);
  const {
    data: diagConditionsData,
    isLoading,
    refetch,
  } = useGetDiagnosedConditions();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!isLoading && diagConditionsData && diagConditionsData.data) {
      setDcRecoilValue(diagConditionsData.data);
    }
  }, [isLoading, diagConditionsData, setDcRecoilValue]);

  return (
    <div className="my-6">
      <div className="custom-table overflow-x-auto">
        <Table
          //@ts-ignore
          dataSource={dcRecoilValue.length > 0 ? dcRecoilValue : []}
          columns={DIAGNOSED_CONDITIONS_COLUMNS}
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
    </div>
  );
};

export default DcTable;
