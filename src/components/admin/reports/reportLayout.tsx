'use client';

import { Radio } from 'antd';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import ReportsTab from './reports';
import ParamTab from './params';
import SampleTab from './samples';

type ReportsType = 'reports' | 'params' | 'samples';

const ReportsLayout = () => {
  const [reportsTab, setReportsTab] = useState<ReportsType>('reports');

  const handleTabChange = (e: RadioChangeEvent) => {
    setReportsTab(e.target.value);
  };

  return (
    <div className="my-8">
      <div>
        <Radio.Group
          onChange={handleTabChange}
          value={reportsTab}
          style={{ marginBottom: 8 }}
        >
          <Radio.Button value="reports">Reports</Radio.Button>
          <Radio.Button value="params">Parameters</Radio.Button>
          <Radio.Button value="samples">Samples</Radio.Button>
        </Radio.Group>
      </div>
      <div className="tab-container my-2">
        {reportsTab === 'reports' && <ReportsTab />}
        {reportsTab === 'params' && <ParamTab />}
        {reportsTab === 'samples' && <SampleTab />}
      </div>
    </div>
  );
};

export default ReportsLayout;
