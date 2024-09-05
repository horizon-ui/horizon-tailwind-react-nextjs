import { Steps } from 'antd';
import { useState } from 'react';
import { ParameterComp } from '../parameters';
import TestSummary from '../summary';

import { useRecoilState } from 'recoil';
import { testDetailsState } from '@src/utils/recoil/reports';
import TestDetailTab from '../create/testDetail';

export const UpdateTest = ({ handleShowTest }) => {
  const [currentStep, setStep] = useState(0);
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);

  const handleNext = () => setStep(currentStep + 1);
  const handlePrevious = () => setStep(currentStep - 1);

  const steps = [
    {
      title: 'Choose Test Type',
      content: <TestDetailTab handleNext={handleNext} />,
    },
    {
      title: 'Add Parameters',
      content: (
        <ParameterComp
          edit={true}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      ),
    },
    {
      title: 'Test Summary',
      content: (
        <TestSummary
          handlePrevious={handlePrevious}
          handleShowTest={handleShowTest}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <div className="w-full">
        <Steps current={currentStep}>
          {steps.map((item, index) => (
            <Steps.Step key={index} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content mt-4">{steps[currentStep].content}</div>
      </div>
    </div>
  );
};
