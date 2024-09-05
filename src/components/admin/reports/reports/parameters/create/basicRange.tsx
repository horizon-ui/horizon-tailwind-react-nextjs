import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber } from 'antd';
import { FaTrash } from 'react-icons/fa';

const BasicRangeInput = ({ form }) => {
  return (
    <Form.List name="basicRange">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <section className="flex">
              <Form.Item
                {...restField}
                name={[name, 'unit']}
                fieldKey={[fieldKey, 'unit']}
                style={{ flex: 1, marginLeft: '8px' }}
              >
                <Input placeholder="Unit" style={{ width: '100%' }} />
              </Form.Item>
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
              <FaTrash
                className="mt-2"
                onClick={() => remove(name)}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              />
            </section>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Range
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default BasicRangeInput;
