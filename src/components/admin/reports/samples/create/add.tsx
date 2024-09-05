import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { useCreateVaccine, useInvalidateQuery } from '@src/utils/reactQuery';
import { Button, Select, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { MdPlusOne } from 'react-icons/md';

const AddSample = ({ handleShowSample }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    validity: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [validityEntry, setValidityEntry] = useState({
    value: 0,
    unit: 'day',
  });

  const handleValidityChange = (name, value) => {
    setFormData({
      ...formData,
      validity: {
        ...formData.validity,
        [name]: value,
      },
    });
  };

  const addValidityEntry = () => {
    setFormData({
      ...formData,
      validity: [...formData.validity, validityEntry],
    });
    // Reset the validity entry after adding
    setValidityEntry({ value: 0, unit: 'day' });
  };

  const removeValidityEntry = (index) => {
    const updatedValidity = formData.validity.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      validity: updatedValidity,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    handleShowSample(false);
  };

  const formatValidity = () =>
    formData.validity
      .map(
        (entry) => `${entry.value} ${entry.unit}${entry.value > 1 ? 's' : ''}`,
      )
      .join(', ');

  return (
    <div className="my-10 max-w-full bg-white p-10">
      <section className="m-auto xl:w-[100%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Create New Sample
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Stack spacing={4}>
            <FormControl id="name" className="my-2" isRequired>
              <FormLabel>Sample Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Sample Name"
                className="w-[20%] border-2 p-2"
                required
              />
            </FormControl>

            <FormControl id="description" className="my-2" isRequired>
              <FormLabel>Sample Description</FormLabel>
              <TextArea
                name="description"
                style={{ width: '15vw' }}
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="border-2 p-2"
              />
            </FormControl>

            <Stack direction="horizontal" spacing={4} alignItems="center">
              <FormControl id="validityValue" className="my-2" isRequired>
                <FormLabel>Value</FormLabel>
                <Input
                  name="value"
                  type="number"
                  value={validityEntry.value}
                  onChange={(e) =>
                    handleValidityChange('value', e.target.value)
                  }
                  placeholder="Enter value"
                  className="w-[20%] border-2 p-2"
                  required
                />
              </FormControl>

              <FormControl id="validityUnit" className="my-2" isRequired>
                <FormLabel>Unit</FormLabel>
                <Select
                  name="unit"
                  value={validityEntry.unit}
                  onChange={(value) => handleValidityChange('unit', value)}
                  placeholder="Select Unit"
                  style={{ width: '10vw' }}
                >
                  <Select.Option value="day">Day</Select.Option>
                  <Select.Option value="week">Week</Select.Option>
                  <Select.Option value="month">Month</Select.Option>
                  <Select.Option value="year">Year</Select.Option>
                </Select>
              </FormControl>

              <Button
                type="primary"
                icon={<MdPlusOne />}
                onClick={addValidityEntry}
              >
                Add
              </Button>
            </Stack>

            {/* Display the formatted validity entries */}
            <div className="mt-2">
              {formData.validity.length > 0 && (
                <>
                  <p className="font-semibold">Validity:</p>
                  <ul>
                    {formData.validity.map((entry, index) => (
                      <li key={index} className="flex items-center">
                        {`${entry.value} ${entry.unit}${
                          entry.value > 1 ? 's' : ''
                        }`}
                        {/* <MinusCircleOutlined
                          className="ml-2 cursor-pointer text-red-500"
                          onClick={() => removeValidityEntry(index)}
                        /> */}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <FormControl id="isActive" className="my-2">
              <FormLabel>Sample Active</FormLabel>
              <Switch
                checked={formData.isActive}
                onChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </FormControl>
          </Stack>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddSample;
