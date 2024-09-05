//@ts-nocheck
import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Button, Input, Select, Switch } from 'antd';
import AddDC from '@src/components/admin/diagCondLayout/create/add';
import { errorAlert2 } from '@src/components/alert';
import { useEditTestValues, useTestDetailValue } from '@src/utils/recoil';

import { testDetailsState } from '@src/utils/recoil/reports';
import { useGetReports } from '@utils/reactQuery';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function TestDetailTab({ handleNext }) {
  const testDetail = useTestDetailValue();

  const handleSubmit = () => {
    if (!testDetail?.testName?.trim() || !testDetail?.sampleName?.trim()) {
      errorAlert2('Please add a valid test and sample name');
      return;
    }
    handleNext();
  };

  return (
    <div className="my-4 w-[40%] py-4">
      <CustomTestDetails handleNext={handleNext} />
    </div>
  );
}

const CustomTestDetails: React.FC<any> = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    testName: '',
    sampleName: '',
    isActive: true,
  });
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
  const editTestState = useEditTestValues();
  const isEditTest = useEditTestValues();
  const [errors, setErrors] = useState({ testName: '', sampleName: '' });

  useEffect(() => {
    if (editTestState) {
      setFormData({
        testName: testDetail?.testName,
        sampleName: testDetail?.sampleName,
        isActive: testDetail?.isActive,
        parameters: testDetail?.parameters,
      });
    } else {
      setTestDetail({});
    }
  }, [editTestState, setTestDetail, testDetail]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, type, checked, value } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: inputValue,
      };

      if (isEditTest) {
        setTestDetail({ ...testDetail, ...updatedFormData });
      }
      setTestDetail(updatedFormData);
      return updatedFormData;
    });
  };

  // Updated handleSwitchChange to only work with `checked`
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        isActive: checked,
      };

      if (isEditTest) {
        setTestDetail({ ...testDetail, ...updatedFormData });
      }
      setTestDetail(updatedFormData);
      return updatedFormData;
    });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = { testName: '', sampleName: '' };

    if (!formData?.testName?.trim()) {
      newErrors.testName = 'Test Name is required';
    }

    if (!formData?.sampleName?.trim()) {
      newErrors.sampleName = 'Sample Name is required';
    }

    setErrors(newErrors);

    // If both fields are valid, return true, else false
    return !newErrors.testName && !newErrors.sampleName;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  return (
    <section>
      <form className="w-[50%] space-y-4">
        <Stack spacing={4}>
          <FormControl className="my-1" id="testName" isRequired>
            <FormLabel>Test Name</FormLabel>
            <Input
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              placeholder="Add Test Name"
              isInvalid={!!errors.testName}
              required={true}
            />
            {errors.testName && (
              <p style={{ color: 'red' }}>{errors.testName}</p>
            )}
          </FormControl>
          <FormControl className="my-1" id="sampleName" isRequired>
            <FormLabel>Sample Name</FormLabel>
            <Input
              name="sampleName"
              value={formData.sampleName}
              onChange={handleChange}
              placeholder="Add Sample Name"
              isInvalid={!!errors.sampleName}
              required
            />
            {errors.sampleName && (
              <p style={{ color: 'red' }}>{errors.sampleName}</p>
            )}
          </FormControl>
          <FormControl className="my-1" id="isActive">
            <FormLabel>Is Active</FormLabel>
            <Switch
              checked={formData?.isActive} // Make sure to bind the correct state value
              onChange={handleSwitchChange} // Handle switch change directly
            />
          </FormControl>
        </Stack>
        <Button className="mt-4" onClick={handleSubmit} type="primary">
          Next
        </Button>
      </form>
    </section>
  );
};

export default TestDetailTab;
