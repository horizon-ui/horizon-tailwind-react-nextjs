'use client';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useGetDiagnosedConditions } from '@src/utils/reactQuery';
import { diagConditionState } from '@src/utils/recoil/diagnosedConditions';
import { useState, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import { Space, Switch } from 'antd';
import debounce from 'lodash.debounce';

const DcHeader = ({ showDc, handleShowDc }) => {
  const { data: diagConditionsData } = useGetDiagnosedConditions();
  const [searchTerm, setSearchTerm] = useState('');
  const setDcRecoilValue = useSetRecoilState(diagConditionState);

  const debouncedSearch = useCallback(
    debounce((searchText: string) => {
      setDcRecoilValue(
        //@ts-ignore
        diagConditionsData?.data.filter((dc) => {
          return dc.name.toLowerCase().includes(searchText.toLowerCase());
        }) || [],
      );
    }, 300),
    [diagConditionsData],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  const handleSwitch = (checked: Boolean) => {
    handleShowDc(checked);
  };

  return (
    <div>
      <div className="flex w-full justify-between">
        <section>
          {/* Search */}
          <InputGroup size="md">
            <Input
              className="w-[15vw] border-2 p-2"
              placeholder="Search Diagnostic Center"
              value={searchTerm}
              onChange={handleSearch}
            />
            <InputRightElement className="p-2">
              <MdSearch className="text-2xl font-bold" />
            </InputRightElement>
          </InputGroup>
        </section>
        <section>
          <Space direction="vertical">
            <Switch
              value={showDc}
              onChange={(checked, event) => {
                handleSwitch(checked);
              }}
              checkedChildren="Add"
              unCheckedChildren="View"
            />
          </Space>
        </section>
      </div>
    </div>
  );
};

export default DcHeader;
