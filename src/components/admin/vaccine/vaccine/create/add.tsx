import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { useCreateVaccine, useInvalidateQuery } from '@src/utils/reactQuery';
import { Button } from 'antd';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

const AddVaccine = ({ handleShowDc }) => {
  const initialFormData = {
    name: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const invalidateQuery = useInvalidateQuery();
  const createVaccine = useCreateVaccine({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 201) {
        warningAlert2('vaccine created succesfully');
        invalidateQuery('vaccineData');
        handleCancel();
      }
    },
    onError: (err: Error) => {
      if (err && err.message) {
        errorAlert('Error creating Vaccine');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      createVaccine.mutate({ data: formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    handleShowDc(false);
  };
  return (
    <div className="my-10 max-w-full bg-white p-10">
      <section className="m-auto xl:w-[100%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add Vaccine
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <Stack spacing={4}>
            <FormControl id="name" className="my-2" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Add Vaccine Name"
                className="w-[20%] border-2 p-2"
                required
              />
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

export default AddVaccine;
