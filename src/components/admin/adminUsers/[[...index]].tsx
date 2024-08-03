'use client'; // This directive ensures this component is client-side only

import Admin from '../../../pages/dashboard/[[...index]]';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import ActivityTable from './activityTable/[[...index]]';

// Dynamically import Tabs and TabPane from antd
const Tabs = dynamic(() => import('antd').then((mod) => mod.Tabs), {
  ssr: false,
});

const UserTable = dynamic(
  () => import('./userTable/[[...index]]').then((mod) => mod.default),
  {
    ssr: false,
  },
);

const AdminUser = () => {
  const [TabPane, setTabPane] = useState<any>(null);

  useEffect(() => {
    // Dynamically import TabPane from Tabs after Tabs is loaded
    import('antd').then((mod) => {
      setTabPane(mod.Tabs.TabPane);
    });
  }, []);

  return (
    <Admin>
      <div>
        <div className="col-span-2 mt-5  h-full grid-cols-1 gap-5 md:grid-cols-2">
          <Tabs defaultActiveKey="1">
            <TabPane tab={'Admin Users'} key="1">
              <UserTable />
            </TabPane>
            <TabPane tab={'User Activities'} key="2">
              <ActivityTable />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Admin>
  );
};

export default AdminUser;