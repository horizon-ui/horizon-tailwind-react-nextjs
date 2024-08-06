'use client';

import { useState, useEffect } from 'react';
import { Button, Switch, Tabs } from 'antd';
import { UserEditor, UserViewer } from '../user/editor';
import {
  useGetDiagSetting,
  useInvalidateQuery,
  useUpdateDiagSetting,
} from '@src/utils/reactQuery';
import { AxiosResponse } from 'axios';
import { errorAlert, successAlert } from '@src/components/alert';

const initialSettingData = {
  FAQs: '',
  Privacy_Policy: '',
  Terms_Of_Service: '',
  Platform_Consent: '',
  Disclaimer: '',
  Customer_Support: '',
};

const DiagnosticTab = () => {
  const [edit, setEdit] = useState(false);
  const { data: diagSetting, isLoading } = useGetDiagSetting();
  const [selectedTab, setSelectedTab] = useState('FAQs');
  const [settingData, setSettingData] = useState(initialSettingData);
  const invalidateQuery = useInvalidateQuery();

  const updateMutation = useUpdateDiagSetting({
    onSuccess: (resp: AxiosResponse) => {
      if (resp && resp.status == 200) {
        successAlert('User Setting udpated succesfully');
        invalidateQuery('userSettings');
        setEdit(false);
      }
    },
    onError: (err: Error) => {
      errorAlert('Error updating user settings');
    },
  });

  useEffect(() => {
    setEditorData(settingData[selectedTab]);
  }, [selectedTab, settingData]);

  useEffect(() => {
    // @ts-ignore
    if (!isLoading && diagSetting?.data) {
      //@ts-ignore
      setSettingData(diagSetting?.data[0]);
    }
  }, [isLoading, diagSetting]);

  const [editorData, setEditorData] = useState(settingData[selectedTab]);

  const handleEditorData = (data) => {
    setSettingData((prevSettingData) => ({
      ...prevSettingData,
      [selectedTab]: data,
    }));
    setEditorData(data);
  };

  const handleSwitch = (checked) => {
    setEdit(checked);
  };

  const handleChange = (key) => {
    setSelectedTab(key);
    console.log(editorData);
  };

  const handleSave = () => {
    // delete settingData?._id;
    //@ts-ignore
    updateMutation.mutate({ data: settingData, recordId: settingData?._id });
  };

  const userSettings = [
    'FAQs',
    'Privacy_Policy',
    'Terms_Of_Service',
    'Platform_Consent',
    'Customer_Support',
  ];

  const tabData = userSettings.map((userTabs) => {
    return {
      label: userTabs,
      key: userTabs,
      children: (
        <section className="p-4">
          <section className="flex justify-between">
            <h2>{selectedTab}</h2>
            <Switch
              checked={edit}
              onChange={handleSwitch}
              checkedChildren="Edit"
              unCheckedChildren="View"
            />
          </section>
          {edit ? (
            <>
              <UserEditor
                editorData={editorData}
                editMode={edit}
                handleEditorData={handleEditorData}
              />
              <section className="flex justify-end">
                <Button onClick={handleSave} type="primary">
                  Save
                </Button>
              </section>
            </>
          ) : (
            <section className="my-4 bg-white py-2">
              <UserViewer editorData={editorData} />
            </section>
          )}
        </section>
      ),
    };
  });

  return (
    <div className="my-4 bg-[#f7f5f5] py-4">
      <section>
        <Tabs onChange={handleChange} tabPosition="left" items={tabData} />
      </section>
    </div>
  );
};

export default DiagnosticTab;
