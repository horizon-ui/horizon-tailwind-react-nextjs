'use client';
import dynamic from 'next/dynamic';
const AdminUser = dynamic(
  () =>
    import('@src/components/admin/adminUsers/[[...index]]').then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);

const Dashboard = () => {
  return <AdminUser />;
};

export default Dashboard;
