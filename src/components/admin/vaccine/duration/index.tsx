'use client';

import {
  useDeleteDoseDuration,
  useGetDoseDuration,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import ReportsTable from '../../reports/utils/table';
import { VACCINE_DOSE_DURATION_COLUMNS } from '../utils/columns';
import { DataWithKeys } from '../../reports/utils/columns';
import { AxiosResponse } from 'axios';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import AddDuration from './create/add';
import { useActivityLogger } from '@src/components/logger';
import SearchHeader from '../../adminUsers/userTable/header/search';

const DoseDurationTab = () => {
  const { data: doseDurationData, isLoading, refetch } = useGetDoseDuration();
  const invalidateQuery = useInvalidateQuery();
  const [showDuration, setShowDuration] = useState<boolean>(false);
  const logActivity = useActivityLogger();
  const [filterdDuration, setFilteredDuration] = useState(
    doseDurationData?.data || [],
  );

  const deleteMutation = useDeleteDoseDuration({
    onSuccess: (resp: AxiosResponse) => {
      invalidateQuery('durationData');
      refetch();
      warningAlert2('Deleted Dose duration succesfully');
      logActivity({
        title: 'Deleted Dose Duration',
        description: resp?.data
          ? `Deleted ${resp.data.name} from Dose Durations`
          : 'Deleted Dose Duration',
        action: 'deleted',
      });
    },
    onError: (error: Error) => {
      errorAlert('Error deleting dose');
    },
  });

  const handleEdit = (record: any) => {};

  const handleDelete = (record: any) => {
    if (record) {
      deleteMutation.mutate(record);
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  //@ts-ignore
  const dataSourceWithKeys = DataWithKeys(filterdDuration);
  const columns = VACCINE_DOSE_DURATION_COLUMNS({ handleEdit, handleDelete });

  const handleShowDuration = (value: boolean) => {
    setShowDuration(value);
  };

  const filteredDuration = (dose, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Convert the duration to string to match against the search term
    const durationMatch = dose.duration
      .toString()
      .includes(lowerCaseSearchTerm);

    // Check if the type (e.g., "day", "month") contains the search term
    const typeMatch = dose.type.toLowerCase().includes(lowerCaseSearchTerm);

    // Return true if either the duration or the type matches the search term
    return durationMatch || typeMatch;
  };

  useEffect(() => {
    //@ts-ignore
    if (doseDurationData?.data) {
      //@ts-ignore
      setFilteredDuration(doseDurationData.data);
    }
  }, [doseDurationData]);

  return (
    <div className="my-8">
      <section className="flex justify-between">
        <SearchHeader
          //@ts-ignore
          listData={doseDurationData?.data || []}
          filterCriteria={filteredDuration}
          setFilteredList={setFilteredDuration}
          placeholderText="Search by value or duration type"
        />
        <Switch
          onChange={(checked) => {
            handleShowDuration(checked);
          }}
          value={showDuration}
          checkedChildren={'Add'}
          unCheckedChildren={'View'}
        />
      </section>
      {!showDuration ? (
        <section>
          <ReportsTable
            columns={columns || []}
            tableDataSource={
              // @ts-ignore
              dataSourceWithKeys?.length > 0 ? dataSourceWithKeys : []
            }
            isLoading={isLoading}
          />
        </section>
      ) : (
        <section>
          <AddDuration handleShowDc={handleShowDuration} />
        </section>
      )}
    </div>
  );
};

export default DoseDurationTab;
