import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Button, Input, Select } from 'antd';
import { useRecoilValue } from 'recoil';
import { UserData } from '@src/api/utils/interface';
import { userListState } from '@src/utils/recoil';
import { useInvalidateQuery, useUpdateUser } from '@src/utils/reactQuery';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { useActivityLogger } from '@src/components/logger';

const UpdateUser = ({ handleShowUser, recordId }) => {
  const initialFormData = {
    userName: '',
    description: '',
    aliases: [],
    status: true,
  };
  const { Option } = Select;
  const [formData, setFormData] = useState<any>(initialFormData);
  const userListRecoild = useRecoilValue<UserData[]>(userListState);
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger();

  const updateUser = useUpdateUser({
    onSuccess: (resp) => {
      if (resp && resp.status === 200) {
        warningAlert2('User updated succesfully');
        invalidateQuery('adminUserData');
        logActivity({
          title: 'Updated User Role',
          description: resp?.data
            ? //@ts-ignore
              `Updated ${resp.data.userName}'s role to ${resp.data.role}`
            : 'Updated User Role',
          action: 'updated',
        });
        handleCancel();
      }
    },
    onError: () => {
      errorAlert('Error updating user');
    },
  });

  useEffect(() => {
    if (userListRecoild) {
      const filteredUserList = userListRecoild.find(
        (user) => user._id === recordId,
      );

      if (filteredUserList) {
        const updatedObj = {
          userName: filteredUserList.userName,
          role: filteredUserList.role,
          phoneNumber: filteredUserList.phoneNumber,
          _id: filteredUserList._id,
        };

        setFormData(updatedObj);
      }
    }
  }, [recordId, userListRecoild]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateObject = {
      data: { role: formData.role },
      recordId: encodeURIComponent(formData.phoneNumber),
    };
    updateUser.mutate(updateObject);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    handleShowUser(false);
  };

  const handleChange = (roleValue) => {
    setFormData({ ...formData, role: roleValue });
  };

  return (
    <div className="my-10 max-w-full bg-white p-10">
      <section className="m-auto w-[50%]">
        <p className="my-4 text-xl font-bold">Edit User</p>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <Stack spacing={4}>
            <FormControl id="userName" className="my-2" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="userName"
                value={formData.userName}
                placeholder="UserName"
                className="border-2 p-2"
                required
                disabled
              />
            </FormControl>
            <FormControl id="phoneNumber" className="my-2" isRequired>
              <FormLabel>phoneNumber</FormLabel>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="User phoneNumber"
                className="border-2 p-2"
                required
                disabled
              />
            </FormControl>
            <FormControl id="role" className="my-2" isRequired>
              <FormLabel>Name</FormLabel>
              <Select
                value={formData.role}
                placeholder="User Role"
                className="w-[15vw] border-2"
                onChange={(event) => {
                  handleChange(event);
                }}
              >
                <Option value={'admin'}>Admin</Option>
                <Option value={'sme'}>SME</Option>
                <Option value={'legal'}>LEGAL</Option>
                <Option value={'manager'}>MANAGER</Option>
              </Select>
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

export default UpdateUser;
