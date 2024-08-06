'use client';

import { Radio } from 'antd';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import DiagnosticTab from './diagnostic';
import UserTab from './user';

type SettingsType = 'user' | 'diagnostic';

const SettingsLayout = () => {
  const [vaccineTab, setVaccineTab] = useState<SettingsType>('user');

  const handleTabChange = (e: RadioChangeEvent) => {
    setVaccineTab(e.target.value);
  };

  return (
    <div className="my-8">
      <div>
        <Radio.Group
          onChange={handleTabChange}
          value={vaccineTab}
          style={{ marginBottom: 8 }}
        >
          <Radio.Button value="user">User Settings</Radio.Button>
          <Radio.Button value="diagnostic">Diagnostic Settings</Radio.Button>
        </Radio.Group>
      </div>
      <div className="tab-container my-2">
        {vaccineTab === 'user' && <UserTab />}
        {vaccineTab === 'diagnostic' && <DiagnosticTab />}
      </div>
    </div>
  );
};

export default SettingsLayout;
