import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

// Helper function to convert duration to a common unit (e.g., hours)
const convertToHours = (durationObj) => {
  const { duration, type } = durationObj;
  switch (type) {
    case 'hour':
      return duration; // Already in hours
    case 'day':
      return duration * 24; // 1 day = 24 hours
    case 'month':
      return duration * 24 * 30; // 1 month = 30 days = 720 hours
    default:
      return duration;
  }
};

// The main component
export const VaccineDoseTable = ({ doseData, durationList, vaccineList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Modal handlers
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  // Sort the durationList based on the duration in hours
  const sortedDurationList =
    durationList?.length > 0 &&
    [...durationList].sort((a, b) => convertToHours(a) - convertToHours(b));

  // Create columns dynamically based on the vaccineList
  const columns = [
    {
      title: 'Duration (Time)',
      dataIndex: 'durationDisplay',
      key: 'durationDisplay',
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    ...vaccineList.map((vaccine) => ({
      title: vaccine.name,
      dataIndex: vaccine.name,
      key: vaccine._id,
      render: (doseInfo, dose) =>
        doseInfo ? (
          <span className="flex items-center gap-2 font-bold uppercase text-green-600">
            {doseInfo} <FaCheckCircle />
          </span>
        ) : (
          <span>—</span>
        ),
    })),
  ];

  // Create the data source based on the sorted duration and doseData
  const tableData = sortedDurationList?.map((duration) => {
    const row = {
      key: duration._id,
      durationDisplay: `${duration.duration} ${duration.type}`, // Display duration
    };

    vaccineList.forEach((vaccine) => {
      const dose = doseData.find(
        (doseItem) =>
          doseItem.vaccine._id === vaccine._id &&
          doseItem.doseDuration.duration === duration.duration &&
          doseItem.doseDuration.type === duration.type,
      );
      // Set the cell value as doseType if dose matches both vaccine and duration
      row[vaccine.name] = dose ? dose.name : null;
    });

    return row;
  });

  return (
    <>
      {/* Button to trigger modal */}
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Vaccine Schedule
      </Button>

      {/* Modal with table */}
      <Modal
        title="Vaccine Dose Schedule"
        className="min-w-content w-auto p-8"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
          className="w-full rounded-lg bg-white shadow-md"
        />
      </Modal>
    </>
  );
};
