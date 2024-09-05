'use client';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import debounce from 'lodash.debounce';

interface SearchHeaderProps<T> {
  listData: T[]; // The list to filter
  filterCriteria: (item: T, searchTerm: string) => boolean; // Custom filter function
  setFilteredList: (filteredList: T[]) => void; // Function to update the filtered state
  placeholderText?: string; // Optional: Placeholder text for the search input
}

const SearchHeader = <T extends any>({
  listData,
  filterCriteria,
  setFilteredList,
  placeholderText = 'Search...',
}: SearchHeaderProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced search function to avoid too many re-renders
  const debouncedSearch = useCallback(
    debounce((searchText: string) => {
      setFilteredList(
        listData.filter((item) => filterCriteria(item, searchText)) || [],
      );
    }, 300),
    [listData, filterCriteria, setFilteredList],
  );

  // Handle search input changes
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
              placeholder={placeholderText}
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

export default SearchHeader;
