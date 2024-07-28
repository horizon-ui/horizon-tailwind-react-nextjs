'use client'; // This directive ensures this component is client-side only

import Admin from '../[[...index]]';
import AppWrappers from '@src/app/AppWrappers';
import dynamic from 'next/dynamic';
import UserTable from './userTable/[[...index]]';
import { useEffect, useState } from 'react';

// Dynamically import Tabs and TabPane from antd
const Tabs = dynamic(() => import('antd').then((mod) => mod.Tabs), {
  ssr: false,
});

const AdminUser = () => {
  const [TabPane, setTabPane] = useState<any>(null);

  useEffect(() => {
    // Dynamically import TabPane from Tabs after Tabs is loaded
    import('antd').then((mod) => {
      setTabPane(mod.Tabs.TabPane);
    });
  }, []);

  return (
    <AppWrappers>
      <Admin>
        <div>
          <div className="col-span-2 mt-5  h-full grid-cols-1 gap-5 md:grid-cols-2">
            <Tabs defaultActiveKey="1">
              <TabPane tab={'Admin Users'} key="1">
                <UserTable />
              </TabPane>
              <TabPane tab={'User Activities'} key="2">
                2
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Admin>
    </AppWrappers>
  );
};

export default AdminUser;
