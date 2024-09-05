import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import {
  useCreateDoseDuration,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import { Button, Select } from 'antd';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

const AddDuration = ({ handleShowDc }) => {
  const initialFormData = {
    duration: '',
    type: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const invalidateQuery = useInvalidateQuery();
  const createDuration = useCreateDoseDuration({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        warningAlert2('Dose duration created succesfully');
        invalidateQuery('durationData');
        handleCancel();
      }
    },
    onError: (err: Error) => {
      if (err && err.message) {
        errorAlert('Error creating Dose Duration');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      createDuration.mutate({ data: formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    setFormData({
      ...formData,
      type: e,
    });
  };

  const handleCancel = () => {
    handleShowDc(false);
  };
  return (
    <div className="my-10 max-w-full bg-white p-10">
      <section className="m-auto xl:w-[100%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add Dose Duration
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <Stack spacing={4}>
            <FormControl id="duration" className="my-2" isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Add duration"
                className="w-[20%] border-2 p-2"
                required
              />
            </FormControl>
            <FormControl id="type" className="my-2" isRequired>
              <FormLabel>Duration Type</FormLabel>
              <Select
                name="type"
                onChange={handleSelect}
                value={formData.type}
                className="w-[15vw]"
                aria-required
              >
                <option value="second">Second</option>
                <option value="minute">Minute</option>
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Years</option>
              </Select>
            </FormControl>
          </Stack>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddDuration;
