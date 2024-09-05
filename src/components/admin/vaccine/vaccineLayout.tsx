'use client';

import { Radio } from 'antd';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import VaccineTab from './vaccine';
import DosesTab from './dose';
import DoseDurationTab from './duration';

type VaccineType = 'vaccine' | 'duration' | 'dose';

const VaccineLayout = () => {
  const [vaccineTab, setVaccineTab] = useState<VaccineType>('vaccine');

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
          <Radio.Button value="vaccine">Vaccine</Radio.Button>
          <Radio.Button value="duration">Dose Duration</Radio.Button>
          <Radio.Button value="dose">Dose</Radio.Button>
        </Radio.Group>
      </div>
      <div className="tab-container my-2">
        {vaccineTab === 'vaccine' && <VaccineTab />}
        {vaccineTab === 'dose' && <DosesTab />}
        {vaccineTab === 'duration' && <DoseDurationTab />}
      </div>
    </div>
  );
};

export default VaccineLayout;
