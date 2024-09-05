//@ts-ignore
import { AutoComplete, Button, Form, Input, Modal, Select, Switch } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import InputForm from './bioRef';
import axios from 'axios';
import {
  bioRefState,
  paramState,
  testDetailsState,
} from '@src/utils/recoil/reports';
import { errorAlert2 } from '@src/components/alert';
import { searchParamApi } from '@src/constants/api';

const AddParameters = ({ edit }) => {
  const [isModalVisible, setIsModalVisible] = useState(edit || false);
  const [form] = Form.useForm(); // Create the form instance here
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
  const [bioRefValue, setBioRefValue] = useRecoilState(bioRefState);
  const [parmValue, setParmValue] = useRecoilState(paramState);
  const [isRangeTypeSectionVisible, setIsRangeTypeSectionVisible] =
    useState(true); // Control visibility of the Range Type section

  const resetFormAndVisibility = () => {
    form.resetFields();
    setIsRangeTypeSectionVisible(true);
  };

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        const parameters = {
          ...parmValue,
          bioRefRange: { ...bioRefValue },
          subText: form.getFieldValue('subText'), // Include subText in the parameters object
        };

        if (!parameters?.name) {
          errorAlert2('Please add a valid parameter name');
          return;
        }

        const updatedTest = {
          ...testDetail,
          parameters: [
            ...(testDetail?.parameters || []),
            ...(Array.isArray(parameters) ? parameters : [parameters]),
          ],
        };

        setTestDetail(updatedTest);
        setIsModalVisible(false);
        setBioRefValue({});
        setParmValue({});
        resetFormAndVisibility(); // Reset visibility and form on OK
      })
      .catch((info) => {
        console.error('Validation failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setBioRefValue({});
    resetFormAndVisibility(); // Reset visibility and form on Cancel
  };

  const handleParamSelect = () => {
    setIsRangeTypeSectionVisible(false); // Hide the Select Range Type section
  };

  return (
    <div>
      {!edit && (
        <Button type="primary" onClick={showModal}>
          Add Parameters
        </Button>
      )}
      <Modal
        title="Add Parameters"
        visible={isModalVisible}
        onOk={handleOk}
        width="50vw"
        onCancel={handleCancel}
      >
        <section className="grid grid-cols-2">
          <ParamForm
            form={form}
            isRangeTypeSectionVisible={isRangeTypeSectionVisible}
            onParamSelect={handleParamSelect}
          />
          <InputForm
            edit={false}
            isRangeTypeSectionVisible={isRangeTypeSectionVisible}
          />
        </section>
      </Modal>
    </div>
  );
};

export default AddParameters;

const { TextArea } = Input;

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ParamForm = ({ form, onParamSelect, isRangeTypeSectionVisible }) => {
  const [formData, setFormData] = useState({});
  const [param, setParam] = useRecoilState(paramState);
  const [bioRefValue, setBioRefValue] = useRecoilState(bioRefState);
  const [options, setOptions] = useState([]);
  const [selectedParam, setSelectedParam] = useState(null);

  const fetchSearchResults = async (value) => {
    try {
      const response = await axios.get(searchParamApi, {
        params: { q: value },
      });
      const searchResults = response.data.map((result) => ({
        value: result.parameters[0].name,
        label: result.parameters[0].name,
        data: result.parameters[0],
      }));
      setOptions(searchResults);
    } catch (error) {
      console.error('Error searching parameters:', error);
      errorAlert2('Failed to fetch search results. Please try again.');
      setOptions([]);
    }
  };

  const handleSearch = useCallback(debounce(fetchSearchResults, 300), []);

  const onSelect = (value, option) => {
    const selectedData = option.data;
    setSelectedParam(selectedData);

    // Pre-populate form fields with selected data
    form.setFieldsValue({
      name: selectedData?.name,
      description: selectedData?.description || '',
      remedy: selectedData?.remedy?.join('\n') || '',
      aliases: selectedData?.aliases || [],
      isActive: selectedData?.isActive || true,
      subText: selectedData?.subText || '', // Pre-populate the "Sub Text under Param" field
    });

    // Update formData with the selected parameter data
    setFormData({
      name: selectedData?.name,
      description: selectedData?.description || '',
      remedy: selectedData?.remedy?.join('\n') || '',
      aliases: selectedData?.aliases || [],
      isActive: selectedData?.isActive || true,
      subText: selectedData?.subText || '', // Store the subText
    });

    // Handle bioRefValue separately if you have a custom form component for it
    setBioRefValue(selectedData?.bioRefRange || {});

    // Notify the parent component to hide the Select Range Type section
    if (onParamSelect) {
      onParamSelect(selectedData);
    }
  };

  useEffect(() => {
    setParam(formData);
  }, [formData]);

  const handleFormChange = (changedValues, allValues) => {
    // Update formData to ensure the latest values are captured
    setFormData((prevData) => ({
      ...prevData,
      ...allValues,
    }));
  };

  const handleAliasesChange = (value) => {
    const formattedValues = value
      .join(',')
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v); // Removes any empty strings

    setFormData((prevData) => ({
      ...prevData,
      aliases: formattedValues,
    }));
    form.setFieldsValue({ aliases: formattedValues }); // Ensure form reflects the changes
  };

  return (
    <Form
      layout="vertical"
      onValuesChange={handleFormChange}
      initialValues={{ isActive: true }}
      className="w-[70%] space-y-4"
      form={form}
    >
      <Form.Item
        label="Parameter Name"
        name="name"
        rules={[{ required: true, message: 'Please enter a parameter name' }]}
      >
        <AutoComplete
          options={options}
          onSearch={handleSearch}
          onSelect={onSelect}
          placeholder="Add Parameter Name"
          filterOption={false}
        />
      </Form.Item>

      <Form.Item label="Sub Text Param" name="subText">
        <Input
          placeholder="Add Sub Text"
          disabled={!isRangeTypeSectionVisible}
        />
      </Form.Item>

      <Form.Item label="Parameter Description" name="description">
        <TextArea
          placeholder="Add Parameter Description"
          rows={4}
          disabled={!isRangeTypeSectionVisible}
        />
      </Form.Item>

      <Form.Item label="Parameter Remedy" name="remedy">
        <TextArea
          placeholder="Add Remedy"
          rows={4}
          disabled={!isRangeTypeSectionVisible}
        />
      </Form.Item>

      <Form.Item label="Parameter Aliases" name="aliases">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Add or Select Aliases"
          onChange={handleAliasesChange}
          tokenSeparators={[',']}
          disabled={!isRangeTypeSectionVisible}
        />
      </Form.Item>

      <Form.Item label="Is Active" name="isActive" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
};
