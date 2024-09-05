import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const { Option } = Select;

const AdvanceRangeInput = ({ form }) => {
  const [rangeOption, setRangeOption] = useState('age');

  const handleRangeOptionChange = (value) => {
    setRangeOption(value);
    form.setFieldsValue({ rangeOption: value }); // Update form field value
  };

  return (
    <>
      <Form.Item label="Select Range Option" name="rangeOption">
        <Select
          placeholder="Select Range Type"
          onChange={handleRangeOptionChange}
          value={rangeOption}
        >
          <Option value="age">Age Range</Option>
          <Option value="gender">Gender Range</Option>
          <Option value="custom">Custom Range</Option>
        </Select>
      </Form.Item>
      {rangeOption === 'age' ? (
        <AgeRangeForm form={form} />
      ) : rangeOption === 'gender' ? (
        <GenderRangeForm form={form} />
      ) : (
        <CustomRangeForm form={form} />
      )}
    </>
  );
};

export default AdvanceRangeInput;

const GenderRangeForm = ({ form }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (value, fieldName) => {
    setSelectedGender(value);
    // Optionally, you can clear previous values if needed
    form.setFieldsValue({ [fieldName]: { unit: '', min: '', max: '' } });
  };

  return (
    <Form.List name="genderRanges">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <section
              key={key}
              style={{ display: '', alignItems: 'center', marginBottom: '8px' }}
            >
              <Form.Item
                {...restField}
                name={[name, 'gender']}
                fieldKey={[fieldKey, 'gender']}
                rules={[{ required: true, message: 'Gender is required' }]}
                style={{ flex: 1, marginRight: '8px' }}
              >
                <Select
                  placeholder="Select Gender"
                  onChange={(value) => handleGenderChange(value, name)}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
              {/* Conditionally render additional fields based on selected gender */}
              <section className="flex">
                {selectedGender && (
                  <Form.Item
                    {...restField}
                    name={[name, 'unit']}
                    fieldKey={[fieldKey, 'unit']}
                    style={{ flex: 1, marginLeft: '8px' }}
                  >
                    <Input placeholder="Unit" style={{ width: '100%' }} />
                  </Form.Item>
                )}
                {selectedGender && (
                  <Form.Item
                    {...restField}
                    name={[name, 'min']}
                    fieldKey={[fieldKey, 'min']}
                    style={{ flex: 1, marginLeft: '8px' }}
                  >
                    <InputNumber
                      placeholder="Min Value"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                )}
                {selectedGender && (
                  <Form.Item
                    {...restField}
                    name={[name, 'max']}
                    fieldKey={[fieldKey, 'max']}
                    style={{ flex: 1, marginLeft: '8px' }}
                  >
                    <InputNumber
                      placeholder="Max Value"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                )}
                {selectedGender && (
                  <FaTrash
                    className="mt-2"
                    onClick={() => remove(name)}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                )}
              </section>
            </section>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              className="flex gap-5"
              onClick={() => add()}
              block
              icon={<FaPlus className="mt-1" />}
            >
              Add Gender Range
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

const AgeRangeForm = ({ form }) => {
  const [ageRangeType, setAgeRangeType] = useState(null);

  const handleAgeRangeTypeChange = (value) => {
    setAgeRangeType(value);
  };

  return (
    <>
      {/* Age Range Type Selection */}
      <Form.Item
        label="Select Age Range Type"
        name="ageRangeType"
        rules={[{ required: true, message: 'Age Range Type is required' }]}
      >
        <Select
          placeholder="Select Age Range Type"
          onChange={handleAgeRangeTypeChange}
          value={ageRangeType}
        >
          <Option value="senior">Senior</Option>
          <Option value="pediatric">Pediatric</Option>
          <Option value="adult">Adult</Option>
        </Select>
      </Form.Item>

      {/* Conditional rendering based on ageRangeType */}
      {ageRangeType && (
        <Form.List name="ageRanges">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <section
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'unit']}
                    fieldKey={[fieldKey, 'unit']}
                    rules={[{ required: true, message: 'Unit is required' }]}
                    style={{ flex: 1, marginRight: '8px' }}
                  >
                    <Input placeholder="Unit" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'min']}
                    fieldKey={[fieldKey, 'min']}
                    rules={[
                      { required: true, message: 'Min Value is required' },
                    ]}
                    style={{ flex: 1, marginRight: '8px' }}
                  >
                    <InputNumber
                      placeholder="Min Value"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'max']}
                    fieldKey={[fieldKey, 'max']}
                    rules={[
                      { required: true, message: 'Max Value is required' },
                    ]}
                    style={{ flex: 1, marginRight: '8px' }}
                  >
                    <InputNumber
                      placeholder="Max Value"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <FaTrash
                    onClick={() => remove(name)}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                </section>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  className="flex gap-5"
                  onClick={() => add()}
                  block
                  icon={<FaPlus className="mt-1" />}
                >
                  Add Age Range
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
    </>
  );
};

const CustomRangeForm = ({ form }) => {
  return (
    <Form.List name="customRanges">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <section
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <Form.Item
                {...restField}
                name={[name, 'categoryType']}
                fieldKey={[fieldKey, 'categoryType']}
                rules={[
                  { required: true, message: 'Category Type is required' },
                ]}
                style={{ flex: 1, marginRight: '8px' }}
              >
                <Input placeholder="Category Type" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'unit']}
                fieldKey={[fieldKey, 'unit']}
                rules={[{ required: true, message: 'Unit is required' }]}
                style={{ flex: 1, marginRight: '8px' }}
              >
                <Input placeholder="Unit" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'min']}
                fieldKey={[fieldKey, 'min']}
                rules={[{ required: true, message: 'Min Value is required' }]}
                style={{ flex: 1, marginRight: '8px' }}
              >
                <InputNumber
                  placeholder="Min Value"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'max']}
                fieldKey={[fieldKey, 'max']}
                rules={[{ required: true, message: 'Max Value is required' }]}
                style={{ flex: 1, marginRight: '8px' }}
              >
                <InputNumber
                  placeholder="Max Value"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <FaTrash
                onClick={() => remove(name)}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              />
            </section>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              className="flex gap-5"
              onClick={() => add()}
              block
              icon={<FaPlus className="mt-1" />}
            >
              Add Custom Range
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
