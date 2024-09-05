import React, { useState } from 'react';
import { ViewParameters } from './parameters/view';
import { useSetRecoilState } from 'recoil';
import { ViewComponent } from './components/viewComponents';
import {
  useEditTestIdValues,
  useEditTestValues,
  useTestDetailValue,
} from '@src/utils/recoil';
import {
  useCreateReport,
  useInvalidateQuery,
  useUpdateReport,
} from '@src/utils/reactQuery';
import {
  editTestIdState,
  editTestState,
  testDetailsState,
} from '@src/utils/recoil/reports';
import { errorAlert, successAlert, warningAlert2 } from '@src/components/alert';
import { Button } from 'antd';

export default function TestSummary({ handlePrevious, handleShowTest }) {
  const testDetails = useTestDetailValue();
  const createTest = useCreateReport({});
  const updateTest = useUpdateReport({});
  const invalidateQuery = useInvalidateQuery();

  const editTest = useEditTestValues();
  const editTestId = useEditTestIdValues();
  const setEditTest = useSetRecoilState(editTestState);
  const setEditTestId = useSetRecoilState(editTestIdState);
  const testDetail = useSetRecoilState(testDetailsState);

  // State to manage the loading state of the submit button
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Start loading
    setLoading(true);

    if (!editTest) {
      createTest.mutate(
        { data: testDetails },
        {
          onSuccess: (res) => {
            successAlert('Report Created Successfully');
            invalidateQuery('reportData');
            handleShowTest(false);
            // Stop loading
            setLoading(false);
          },
          onError: (res) => {
            errorAlert('Adding test failed');
            // Stop loading even if error occurs
            setLoading(false);
          },
        },
      );
    }

    if (editTest) {
      updateTest?.mutate(
        { data: testDetails, recordId: editTestId },
        {
          onSuccess: (resp) => {
            if (resp.status == 200) {
              warningAlert2('Test updated successfully');
              invalidateQuery('reportData');
              handleShowTest(false);
              setEditTest(false);
              setEditTestId(null);
              testDetail({});
            }
            // Stop loading
            setLoading(false);
          },
          onError: (res) => {
            errorAlert('Updating test failed');
            // Stop loading
            setLoading(false);
          },
        },
      );
    }
  };

  return (
    <div className="bg-signBanner h-auto p-10">
      <b>Test Details Summary</b>
      <section className="my-5 text-gray-600">
        <p className="mb-10">
          Name: <span className="font-bold">{testDetails?.testName}</span>
        </p>
        <p className="mb-10">
          Sample: <span className="font-bold">{testDetails?.sampleName}</span>
        </p>
      </section>
      <ViewParameters />
      <ViewComponent component={testDetails?.components} />
      <Button
        className="mt-4"
        onClick={handleSubmit}
        type="primary"
        loading={isLoading} // Apply loading state to the button
      >
        Submit
      </Button>
      <Button className="mx-4 mt-4" onClick={handlePrevious} type="default">
        Previous
      </Button>
      {isLoading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
          <Button type="dashed">Loading..</Button>
        </div>
      )}
    </div>
  );
}
