import React, { useState } from 'react';
import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Button, Input, Select, SelectProps, Switch } from 'antd';
import { errorAlert, successAlert, warningAlert2 } from '@src/components/alert';
import { useCreateDC, useInvalidateQuery } from '@src/utils/reactQuery';
import { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import { diagConditionState } from '@src/utils/recoil/diagnosedConditions';
import { DCDataInterface, UserData } from '@src/api/utils/interface';
import TextArea from 'antd/es/input/TextArea';
import { useActivityLogger } from '@src/components/logger';
import { useUser } from '@clerk/nextjs';
import { userState } from '@src/utils/recoil/user';

const AddDC = ({ handleShowDc }) => {
  const initialFormData = {
    name: '',
    description: '',
    aliases: [],
    status: true,
  };
  const logActivity = useActivityLogger();
  const [formData, setFormData] = useState(initialFormData);
  const options: SelectProps['options'] = [];
  const invalidateQuery = useInvalidateQuery();
  const dcRecoilValue = useRecoilValue<DCDataInterface[]>(diagConditionState);

  const createMutation = useCreateDC({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 201) {
        warningAlert2('DC created succesfully');
        invalidateQuery('diagnosedConditions');
        invalidateQuery('adminDashboard');
        logActivity({
          title: 'Added Diagnosed Conditions',
          description: resp?.data
            ? `Added ${resp.data.name} to Diagnosed Condition`
            : 'Added Diagnosed Condition',
          action: 'added',
        });
        handleCancel();
      }
    },
    onError: (err: Error) => {
      if (err && err.message) {
        errorAlert('Error creating DC');
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      errorAlert('Invalid DC Name');
      return;
    }

    if (
      dcRecoilValue?.find(
        (recoil: DCDataInterface) => recoil.name === formData.name,
      )
    ) {
      errorAlert('Duplicate DC');
    }

    createMutation.mutate({ data: formData });

    handleCancel();
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    handleShowDc(false);
  };

  const handleStatusChange = (checked) => {
    setFormData({
      ...formData,
      status: checked,
    });
  };

  const handleTagChange = (value) => {
    setFormData({
      ...formData,
      aliases: value,
    });
  };

  return (
    <div className="my-10 max-w-full bg-white p-10">
      <section className="m-auto xl:w-[50%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add Diagnosed Condition
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <Stack spacing={4}>
            <FormControl id="name" className="my-2" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Add Diagnosed Condition Name"
                className="border-2 p-2"
                required
              />
            </FormControl>
            <FormControl id="description" className="my-2" isRequired>
              <FormLabel>Description</FormLabel>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add Diagnosed Condition Description"
                className="border-2 p-2"
              />
            </FormControl>
            <FormControl id="aliases" className="my-2">
              <FormLabel>Aliases</FormLabel>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Aliases"
                value={formData.aliases}
                onChange={handleTagChange}
                options={options}
              />
            </FormControl>
            <FormControl id="status" className="my-2" isRequired>
              <FormLabel>IsActive</FormLabel>
              <Switch
                value={formData.status}
                defaultChecked
                onChange={(checked) => {
                  handleStatusChange(checked);
                }}
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

export default AddDC;
