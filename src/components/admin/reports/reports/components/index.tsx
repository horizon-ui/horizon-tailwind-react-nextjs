import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Switch, Upload, Button } from 'antd';

import dynamic from 'next/dynamic';
import { FaUpload } from 'react-icons/fa';
import { componentImages } from '@src/constants/api';

const CKEditorComponent = dynamic(() => import('./ckeditor'), {
  ssr: false,
});

const ComponentForm = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const [isDynamic, setIsDynamic] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setIsDynamic(initialValues.isDynamic || false);
    }
  }, [initialValues, form]);

  const onSwitchChange = (checked) => {
    setIsDynamic(checked);
  };

  const handleUploadChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Upload files to the server and get URLs
    const uploadedUrls = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && file.originFileObj) {
          const uploadedUrl = await uploadFileToServer(file.originFileObj);
          return uploadedUrl;
        }
        return file.url;
      }),
    );

    setImageUrls(uploadedUrls);
    form.setFieldsValue({ images: uploadedUrls });
  };

  const uploadFileToServer = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(componentImages, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      return data.url; // Assuming the server responds with { url: 'https://s3.amazonaws.com/your-bucket/your-file' }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? 'Edit Component' : 'Create a new component'}
      okText={initialValues ? 'Save Changes' : 'Create'}
      cancelText="Cancel"
      width={'70vw'}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({ ...values, isDynamic, images: imageUrls });
          })
          .catch((info) => {});
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="component_form"
        initialValues={initialValues || { modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of the component!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="content" label="Content">
          <CKEditorComponent
            readOnly={false}
            onChange={(data) => form.setFieldsValue({ content: data })}
            data={initialValues?.content || ''} // Initialize CKEditor with content
          />
        </Form.Item>

        <Form.Item
          label="Dynamic Component"
          name="isDynamic"
          valuePropName="checked"
        >
          <Switch checked={isDynamic} onChange={onSwitchChange} />
        </Form.Item>

        {isDynamic && (
          <Form.Item label="Upload Images">
            <Upload
              name="images"
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} // Prevent auto upload
              multiple
            >
              <Button icon={<FaUpload />}>Select Files</Button>
            </Upload>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ComponentForm;
