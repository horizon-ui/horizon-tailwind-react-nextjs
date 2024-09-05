import { List, Typography } from 'antd';
import { FaTrash } from 'react-icons/fa';

const { Title, Text } = Typography;

// Sample data based on provided schema
const sampleData = {
  basicRange: [
    {
      unit: 'mm',
      min: 2,
      max: 22,
    },
  ],
  advanceRange: {
    ageRange: [],
    genderRange: [],
    customRange: [],
  },
};

const RenderRanges = ({ data, onRemove }) => {
  if (!data || !data?.advanceRange) {
    return null;
  }
  return (
    <div>
      {/* Render Basic Range */}
      <Title level={5}>Basic Range</Title>
      <List
        dataSource={data.basicRange}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <FaTrash
                onClick={() => onRemove('basicRange', index)}
                style={{ cursor: 'pointer' }}
              />,
            ]}
          >
            <section className="flex ">
              <p className="mr-2">
                <strong>Unit:</strong> {item.unit}
              </p>
              <p className="mr-2">
                <strong>Min:</strong> {item.min}
              </p>
              <p className="mr-2">
                <strong>Max:</strong> {item.max}
              </p>
            </section>
          </List.Item>
        )}
      />

      {/* Render Advance Range (Age Range, Gender Range, Custom Category) */}
      <Title level={5}>Advance Range</Title>

      {/* Age Range */}
      {data?.advanceRange?.ageRange?.length > 0 && (
        <>
          <Title level={5}>Age Range</Title>
          <List
            dataSource={data?.advanceRange?.ageRange}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <FaTrash
                    onClick={() => onRemove('ageRange', index)}
                    style={{ cursor: 'pointer' }}
                  />,
                ]}
              >
                <section className="flex ">
                  <p className="mr-2">
                    <strong>Unit:</strong> {item.unit}
                  </p>
                  <p className="mr-2">
                    <strong>Min:</strong> {item.min}
                  </p>
                  <p className="mr-2">
                    <strong>Max:</strong> {item.max}
                  </p>
                </section>
              </List.Item>
            )}
          />
        </>
      )}

      {/* Gender Range */}
      {data.advanceRange.genderRange.length > 0 && (
        <>
          <Title level={5}>Gender Range</Title>
          <List
            dataSource={data.advanceRange.genderRange}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <FaTrash
                    onClick={() => onRemove('genderRange', index)}
                    style={{ cursor: 'pointer' }}
                  />,
                ]}
              >
                <section className="flex ">
                  <p className="mr-2">
                    <strong>Unit:</strong> {item.unit}
                  </p>
                  <p className="mr-2">
                    <strong>Min:</strong> {item.min}
                  </p>
                  <p className="mr-2">
                    <strong>Max:</strong> {item.max}
                  </p>
                </section>
              </List.Item>
            )}
          />
        </>
      )}

      {/* Custom Category */}
      {data.advanceRange.customRange.length > 0 && (
        <>
          <List
            dataSource={data.advanceRange.customRange}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <FaTrash
                    onClick={() => onRemove('customRange', index)}
                    style={{ cursor: 'pointer' }}
                  />,
                ]}
              >
                <Title level={5}>{item?.categoryType}</Title>
                <section className="flex ">
                  <p className="mr-2">
                    <strong>Unit:</strong> {item.unit}
                  </p>
                  <p className="mr-2">
                    <strong>Min:</strong> {item.min}
                  </p>
                  <p className="mr-2">
                    <strong>Max:</strong> {item.max}
                  </p>
                </section>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default RenderRanges;
