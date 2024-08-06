'use client';
import dynamic from 'next/dynamic';
import Admin from '../[[...index]]';
const AdminUser = dynamic(
  () =>
    import('@src/components/admin/adminUsers/index').then((mod) => mod.default),
  {
    ssr: false,
  },
);

const Dashboard = () => {
  return (
    <Admin>
      <AdminUser />
    </Admin>
  );
};

export default Dashboard;
