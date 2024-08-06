import { DCDataInterface } from '@src/api/utils/interface';
import { Button, Popover, Space, Tag } from 'antd';
import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

export const REPORTS_COLUMNS = ({ handleEdit, handleDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Sample Type',
      dataIndex: 'sample',
      key: 'sample',
      render: (sample) => {
        return (
          <>
            <Tag>{sample?.name}</Tag>
          </>
        );
      },
    },
    {
      title: 'Diagnosed Conditions',
      dataIndex: 'diagnosedCondition',
      key: 'diagnosedConditions',
      render: (diagnosedCondition) => {
        return (
          <>
            <Tag>{diagnosedCondition?.name}</Tag>
          </>
        );
      },
    },
    {
      title: 'Parameter',
      dataIndex: 'parameter',
      key: 'parameter',
      render: (parameter) => {
        return <Tag color="green">{parameter?.name}</Tag>;
      },
    },
    {
      title: 'Report Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => {
        return (
          <>
            {isActive ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )}
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
  return columns;
};

export const REPORTS_PARAM_COLUMNS = ({ handleEdit, handleDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 100,
      render: (text) => {
        // Split the text into words
        const words = text?.split(' ');
        // Take the first 4 words and join them back into a string for preview
        const preview =
          words?.slice(0, 4).join(' ') + (words?.length > 4 ? '...' : '');
        // Prepare the full content for the popover
        const fullContent = (
          <div
            style={{
              maxWidth: 300,
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {text}
          </div>
        );
        return (
          <Popover content={fullContent} title="Description" trigger="hover">
            <div style={{ cursor: 'pointer' }}>{preview}</div>
          </Popover>
        );
      },
    },
    {
      title: 'Remedy',
      dataIndex: 'remedy',
      key: 'remedy',
      render: (text) => (
        <div
          style={{ width: 100, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      render: (text, record) => <ParameterUnitsColumn data={record} />,
    },
    {
      title: 'Aliases',
      dataIndex: 'aliases',
      key: 'aliases',
      render: (aliases) => {
        let moreDots = false;
        if (aliases?.length > 3) {
          aliases = aliases.slice(0, 3);
          moreDots = true;
        }
        return (
          <Space
            className="w-[auto] uppercase lg:w-[10vw]"
            style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            onMouseEnter={() => {}}
            size={[0, 1]}
            wrap
          >
            {aliases?.map((alias) => (
              <Tag
                className="sm:text-md p-[1px] text-[8px] sm:px-4 sm:text-[10px]"
                color="orange"
                key={alias}
              >
                {alias}
              </Tag>
            ))}
            {moreDots && <Tag color="geekblue">...</Tag>}
          </Space>
        );
      },
    },
    {
      title: 'BioRefRange',
      dataIndex: 'bioRefRange',
      key: 'bioRefRange',
      render: (bioRefRange, record) => {
        let moreDots = false;
        if (bioRefRange?.length > 3) {
          bioRefRange = bioRefRange.slice(0, 3);
          moreDots = true;
        }
        return (
          <>
            <Popover
              content={getContent(bioRefRange)}
              title="Bio Ref Range Details"
              trigger="hover"
            >
              <Tag color="blue">Reference value</Tag>
            </Popover>
          </>
        );
      },
    },
    {
      title: 'Parameter Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => {
        return (
          <>
            {isActive ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )}
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
  return columns;
};

export const REPORTS_SAMPLES_COLUMNS = ({ handleEdit, handleDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'validity',
      dataIndex: 'validity',
      key: 'validity',
      render: (validity) => {
        return (
          <>
            <p>{formatValidity(validity)}</p>
          </>
        );
      },
    },
    {
      title: 'Sample Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => {
        return (
          <>
            {isActive ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )}
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DCDataInterface) => (
        <>
          <span className="hidden sm:block">
            <Space size="middle">
              <Button onClick={() => handleEdit(record._id)}>
                <MdEdit />
                Edit
              </Button>
              <Button onClick={() => handleDelete(record._id)}>
                <MdDelete />
                Delete
              </Button>
            </Space>
          </span>
          <span className="block flex gap-4 sm:hidden">
            <MdEdit
              className="text-indigo-800"
              onClick={() => handleDelete(record._id)}
            />
            <MdDelete
              className="text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </span>
        </>
      ),
    },
  ];
  return columns;
};

export function DataWithKeys(data) {
  if (data && data.length > 0) {
    const dataSourceWithKeys =
      //@ts-ignore
      data?.length > 0 &&
      //@ts-ignore
      data?.map((record: any, index) => ({
        ...record,
        key: record.key || record._id || index,
      }));
    return dataSourceWithKeys;
  }
  return [];
}

function formatValidity(validity) {
  const units = [
    { key: 'year', label: 'year' },
    { key: 'month', label: 'month' },
    { key: 'week', label: 'week' },
    { key: 'day', label: 'day' },
    { key: 'hour', label: 'hour' },
    { key: 'minute', label: 'minute' },
  ];

  const parts = units
    .filter((unit) => validity[unit.key] > 0)
    .map((unit) => {
      const value = validity[unit.key];
      return `${value} ${unit.label}${value > 1 ? 's' : ''}`;
    });

  return parts.join(' ');
}

const ParameterUnitsColumn = ({ data }) => {
  const [visibleUnits, setVisibleUnits] = useState([]);
  if (data) {
    const allUnits = extractUnitValues(data?.bioRefRange);

    const handlePopoverVisibleChange = (visible) => {
      if (visible) {
        setVisibleUnits(allUnits);
      } else {
        setVisibleUnits([]);
      }
    };

    const renderContent = () => (
      <Space wrap>
        {allUnits.map((unit, index) => (
          <Tag color="green" key={index}>
            {/* {unit ? unit:} */}
          </Tag>
        ))}
      </Space>
    );

    return (
      <Popover
        content={renderContent()}
        title="All Units"
        trigger="click"
        visible={visibleUnits.length > 0}
        onVisibleChange={handlePopoverVisibleChange}
      >
        <Tag color="green" style={{ cursor: 'pointer' }}>
          Show Units
        </Tag>
      </Popover>
    );
  } else {
    <p>null</p>;
  }
};

// Function to extract unique unit values
const extractUnitValues = (bioRefRange) => {
  const units = new Set();

  // Extract units from advanceRange
  const { advanceRange } = bioRefRange;
  // Object.values(advanceRange).forEach((ranges) => {
  //   // ranges.forEach((range) => {
  //   //   units.add(range.unit);
  //   // });
  // });

  // Extract units from basicRange
  const { basicRange } = bioRefRange;
  basicRange.forEach((range) => {
    units.add(range.unit);
  });

  return Array.from(units);
};

export const getContent = (bioRefRange) => {
  // Helper function to format range string based on available min and max values
  const formatRange = (min, max, unit) => {
    if (min && max) {
      return `${min} > and < ${max} ${unit || ''}`;
    } else if (min) {
      return `> ${min} ${unit || ''}`;
    } else if (max) {
      return `< ${max} ${unit || ''}`;
    }
  };

  // Determine if there's data for the advanced range to decide on displaying the section
  const hasAdvancedData =
    bioRefRange.advanceRange &&
    (bioRefRange.advanceRange.ageRange?.length > 0 ||
      bioRefRange.advanceRange.genderRange?.length > 0 ||
      bioRefRange.advanceRange.customCategory?.length > 0);

  return (
    <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '0 10px' }}>
      {/* Basic Range */}
      {bioRefRange.basicRange &&
        bioRefRange.basicRange.map((basic, basicIndex) => (
          <div key={basicIndex} className="mb-4">
            <p className="font-bold">Basic Range:</p>
            <p>{formatRange(basic.min, basic.max, basic.unit)}</p>
          </div>
        ))}

      {/* Advanced Range - Conditional rendering based on hasAdvancedData */}
      {hasAdvancedData && (
        <div>
          <p className="font-bold">Advanced Range:</p>
          <div className="ml-2">
            {/* Age Range */}
            {bioRefRange.advanceRange.ageRange &&
              bioRefRange.advanceRange.ageRange.map((age, ageIndex) => (
                <div key={ageIndex}>
                  <p>Age Range:</p>
                  <p className="ml-4">{`${age.ageRangeType}: ${formatRange(
                    age.min,
                    age.max,
                    age.unit,
                  )}`}</p>
                </div>
              ))}

            {/* Gender Range */}
            {bioRefRange.advanceRange.genderRange &&
              bioRefRange.advanceRange.genderRange.map(
                (gender, genderIndex) => (
                  <div key={genderIndex}>
                    <p>Gender Range:</p>
                    <p className="ml-4">{`${
                      gender.genderRangeType
                    } Range: ${formatRange(
                      gender.min,
                      gender.max,
                      gender.unit,
                    )}`}</p>
                    {gender.genderRangeType === 'female' && gender.details && (
                      <div className="ml-6">
                        <p>Details:</p>
                        <div className="ml-6">
                          {gender.details.menopause && <p>Menopause: Yes</p>}
                          {gender.details.prePuberty && <p>Pre-Puberty: Yes</p>}
                          {gender.details.pregnant && (
                            <>
                              <p>Pregnant: Yes</p>
                              {gender.details.trimester &&
                                gender.details.trimester?.type !== 'none' && (
                                  <p className="ml-6">
                                    Trimester: {gender.details.trimester?.type}
                                  </p>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              )}

            {/* Custom Category */}
            {bioRefRange.advanceRange.customCategory &&
              bioRefRange.advanceRange.customCategory.map(
                (category, catIndex) => (
                  <div key={catIndex}>
                    <p className="font-bold">Custom Range:</p>
                    <p>{category.categoryName}</p>
                    {category.categoryOptions &&
                      category.categoryOptions.map((option, optIndex) => (
                        <p key={optIndex} className="ml-4">{`${
                          option.categoryType
                        }: ${formatRange(
                          option.min,
                          option.max,
                          option.unit,
                        )}`}</p>
                      ))}
                    {category.subCategory && (
                      <div className="ml-4">
                        <p>{category.subCategory.categoryName}</p>
                        {category.subCategory.categoryOptions &&
                          category.subCategory.categoryOptions.map(
                            (subOpt, subOptIndex) => (
                              <p key={subOptIndex} className="ml-4">{`${
                                subOpt.categoryType
                              }: ${formatRange(
                                subOpt.min,
                                subOpt.max,
                                subOpt.unit,
                              )}`}</p>
                            ),
                          )}
                      </div>
                    )}
                  </div>
                ),
              )}
          </div>
        </div>
      )}
    </div>
  );
};
