'use client'; // This directive ensures this component is client-side only

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import UserTable from './userTable';
import ActivityTable from './activityTable';

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
    <div>
      <div className="my-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab={'Admin Users'} key="1">
            <section className="my-4">
              <UserTable />
            </section>
          </TabPane>
          <TabPane tab={'User Activities'} key="2">
            <section className="my-8">
              <ActivityTable />
            </section>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUser;
