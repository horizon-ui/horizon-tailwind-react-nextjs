'use client';
import dynamic from 'next/dynamic';

const Admin = dynamic(
  () => import('../[[...index]]').then((mod) => mod.default),
  {
    ssr: false,
  },
);

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
