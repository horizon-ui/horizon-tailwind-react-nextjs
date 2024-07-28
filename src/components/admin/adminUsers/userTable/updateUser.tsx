import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Button, Input, Select } from 'antd';
import { userData } from '@src/variables/data-tables/tableDataDevelopment';
import { errorAlert, successAlert } from '@src/components/alert';

const { Option } = Select;

const UpdateUser = ({ user, handleViewUser }) => {
  // Initialize state for form fields
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');

  // Populate state with user data if available
  useEffect(() => {
    if (user) {
      setFirstName(user.userName || '');
      setPhoneNumber(user.phoneNumber || '');
      setRole(user.role?.toLowerCase() || '');
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create formData object
    const formData = {
      firstName,
      phoneNumber,
      role,
    };

    if (!formData.role || !formData?.firstName || !formData?.role) {
      errorAlert('Invalid User Object');
    }

    const updatedData = userData.map((userItem) => {
      if (userItem._id === user._id) {
        return { ...userItem, ...formData }; // Merge the existing userItem with the new formData
      }
      return userItem; // Return the userItem unchanged if it doesn't match
    });

    // Handle updating data here
    successAlert('User updated.');
    handleCancel();
  };

  const handleCancel = () => {
    handleViewUser();
  };

  return (
    <div className="max-w-lg">
      <p className="font-semi-bold my-4 text-lg">Update User</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Stack spacing={4}>
          <FormControl id="first-name" className="my-2" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              value={firstName}
              disabled
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Update name"
            />
          </FormControl>
          <FormControl id="phone-number" className="my-2" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              value={phoneNumber}
              disabled
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Update phone number"
            />
          </FormControl>
          <FormControl id="role" className="my-2">
            <FormLabel>Role</FormLabel>
            <Select
              value={role}
              onChange={(value) => setRole(value)}
              placeholder="Select Role"
            >
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
              <Option value="sme">Sme</Option>
              <Option value="user">User</Option>
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
    </div>
  );
};

export default UpdateUser;
