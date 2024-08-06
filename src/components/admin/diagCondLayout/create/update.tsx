import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Button, Input, Select, SelectProps, Switch } from 'antd';
import { errorAlert, successAlert, warningAlert2 } from '@src/components/alert';
import { useInvalidateQuery, useUpdateDC } from '@src/utils/reactQuery';
import { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import { diagConditionState } from '@src/utils/recoil/diagnosedConditions';
import TextArea from 'antd/es/input/TextArea';
import { DCDataInterface } from '@src/api/utils/interface';

const EditDC = ({ handleShowDc, recordId }) => {
  const initialFormData: DCDataInterface = {
    name: '',
    description: '',
    aliases: [],
    status: true,
  };
  const [formData, setFormData] = useState<DCDataInterface>(initialFormData);
  const options: SelectProps['options'] = [];
  const dcRecoilValue = useRecoilValue<DCDataInterface[]>(diagConditionState);
  const invalidateQuery = useInvalidateQuery();

  const updateMutation = useUpdateDC({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        warningAlert2('DC updated succesfully');
        invalidateQuery('diagnosedConditions');
        handleCancel();
      }
    },
    onError: (err: Error) => {
      errorAlert('Error updating DC');
    },
  });

  useEffect(() => {
    const filteredDC = dcRecoilValue.find(
      (dc: DCDataInterface) => dc._id === recordId,
    );
    console.log(filteredDC);
    if (filteredDC) {
      const updatedFormData = {
        name: filteredDC.name,
        description: filteredDC.description,
        aliases: filteredDC.aliases,
        status: filteredDC.status,
      };
      setFormData(updatedFormData);
    } else {
      errorAlert('Error updating record');
      // handleCancel();
    }
  }, [recordId]);

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
      dcRecoilValue?.filter(
        (recoil: DCDataInterface) => recoil.name === formData.name,
      ).length > 1
    ) {
      errorAlert('Duplicate DC');
    }

    updateMutation.mutate({ data: formData, recordId: recordId });

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
      <section className="m-auto w-[50%]">
        <p className="my-4 text-xl font-bold">Edit Diagnosed Condition</p>
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
            Update
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default EditDC;
