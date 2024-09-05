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
      <ReportsTab />
    </div>
  );
};

export default ReportsLayout;
