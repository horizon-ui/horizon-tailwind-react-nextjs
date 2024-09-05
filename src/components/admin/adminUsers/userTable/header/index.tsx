'use client';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useAdminUsers } from '@src/utils/reactQuery';
import { useState, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import { userListState } from '@src/utils/recoil';
import debounce from 'lodash.debounce';

const AdminUserHeader = () => {
  const { data: adminUserData } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const setUserListRecoilValue = useSetRecoilState(userListState);

  const debouncedSearch = useCallback(
    debounce((searchText: string) => {
      setUserListRecoilValue(
        //@ts-ignore
        adminUserData?.data.filter((dc) => {
          return (
            dc.userName.toLowerCase().includes(searchText.toLowerCase()) ||
            dc.role.toLowerCase().includes(searchText.toLowerCase())
          );
        }) || [],
      );
    }, 300),
    [adminUserData, setUserListRecoilValue],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  return (
    <div>
      <div className="mb-3 flex w-full justify-between">
        <section>
          <InputGroup size="md">
            <Input
              className="w-[60vw] border-2 p-2 sm:w-[40vw] lg:w-[25vw] xl:w-[15vw]"
              placeholder="Search by user name or role"
              value={searchTerm}
              onChange={handleSearch}
            />
            <InputRightElement className="p-2">
              <MdSearch className="text-2xl font-bold" />
            </InputRightElement>
          </InputGroup>
        </section>
      </div>
    </div>
  );
};

export default AdminUserHeader;


