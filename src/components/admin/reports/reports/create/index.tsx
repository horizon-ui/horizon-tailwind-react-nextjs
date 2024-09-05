import { Steps } from 'antd';
import { useState } from 'react';
import TestDetailTab from './testDetail';
import TestSummary from '../summary';
import { ParameterComp } from '../parameters';

export const AddTest = ({ handleShowTest }) => {
  const [currentStep, setStep] = useState(0);

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
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          edit={false}
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
