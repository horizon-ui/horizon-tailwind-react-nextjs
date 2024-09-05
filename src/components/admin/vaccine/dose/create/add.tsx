//@ts-nocheck
import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { errorAlert, warningAlert2 } from '@src/components/alert';
import {
  useCreateDose,
  useCreateDoseDuration,
  useGetDoseDuration,
  useGetVaccine,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import { Button, Select } from 'antd';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const doseType = [
  'Recommended Type',
  'Catch up age range',
  'Vaccine in special situations',
];

const AddDose = ({ handleShowDose }) => {
  const { data: doseDurationData, isLoading, refetch } = useGetDoseDuration();
  const {
    data: vaccineData,
    isLoading: vacLoadingg,
    refetch: vacRef,
  } = useGetVaccine();
  const [duration, setDuration] = useState(doseDurationData?.data);
  const [vaccine, setVaccine] = useState(doseDurationData?.data);

  const initialFormData = {
    name: '',
    doseDuration: doseDurationData?.data?.[0]?._id || '', // Set default to the first option's ID
    doseType: doseType?.[0],
    vaccine: vaccineData?.data?.[0]?._id || '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const invalidateQuery = useInvalidateQuery();

  useEffect(() => {
    if (!isLoading) {
      setDuration(doseDurationData?.data);
      // Update formData duration if doseDurationData is loaded and not empty
      if (doseDurationData?.data?.length > 0) {
        setFormData((prev) => ({
          ...prev,
          doseDuration: doseDurationData.data[0]._id, // Set default to the first option's ID
        }));
      }
    }
  }, [isLoading, doseDurationData]);

  useEffect(() => {
    if (!isLoading) {
      setVaccine(vaccineData?.data);
      // Update formData duration if doseDurationData is loaded and not empty
      if (vaccineData?.data?.length > 0) {
        setFormData((prev) => ({
          ...prev,
          vaccine: vaccineData.data[0]._id, // Set default to the first option's ID
        }));
      }
    }
  }, [vacLoadingg, vaccineData]);

  const createDose = useCreateDose({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status === 200) {
        warningAlert2('Dose created successfully');
        invalidateQuery('doseData');
        handleCancel();
      }
    },
    onError: (err: Error) => {
      if (err && err.message) {
        errorAlert('Error creating Dose');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      createDose.mutate({ data: formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelect = (event) => {
    const [name, value] = event?.target;
    setFormData({
      ...formData,
      [name]: value, // Map the selected ID to formData
    });
  };

  const handleCancel = () => {
    handleShowDose(false);
  };

  return (
    <div className="my-10 max-w-full bg-white p-10">
      <section className="m-auto xl:w-[100%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add Dose
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <Stack spacing={4}>
            <FormControl id="name" className="my-2" isRequired>
              <FormLabel>Dose Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Add Dose Name"
                className="w-[20%] border-2 p-2"
                required
              />
            </FormControl>
            <FormControl id="doseDuration" className="my-2" isRequired>
              <FormLabel>Select Duration</FormLabel>
              <Select
                name="doseDuration"
                value={formData.doseDuration} // Binds the selected ID to formData
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    doseDuration: value, // Updates formData.doseType with the selected value
                  });
                }} // Handles select change
                placeholder="Select a Duration"
                style={{ width: '15vw' }}
              >
                {duration?.map((dur) => (
                  <Select.Option key={dur._id} value={dur._id}>
                    {`${dur.duration} ${dur.type}`}
                  </Select.Option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="vaccine" className="my-2" isRequired>
              <FormLabel>Select Vaccine</FormLabel>
              <Select
                name="vaccine"
                value={formData.vaccine} // Binds the selected ID to formData
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    vaccine: value, // Updates formData.doseType with the selected value
                  });
                }} // Handles select change
                placeholder="Select Vaccine"
                style={{ width: '15vw' }}
              >
                {vaccine?.map((vac) => (
                  <Select.Option key={vac._id} value={vac._id}>
                    {vac?.name}
                  </Select.Option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="doseType" className="my-2" isRequired>
              <FormLabel>Select Dose Type</FormLabel>
              <Select
                name="doseType"
                value={formData.doseType} // Binds the selected ID to formData
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    doseType: value, // Updates formData.doseType with the selected value
                  });
                }}
                placeholder="Select doseType"
                style={{ width: '15vw' }}
              >
                {doseType?.map((doseType) => (
                  <Select.Option key={doseType} value={doseType}>
                    {doseType}
                  </Select.Option>
                ))}
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
      </section>
    </div>
  );
};

export default AddDose;
