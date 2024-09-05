// hocs/withAuthAdmin.js
import { useUser } from '@clerk/nextjs';
import { useGetUser } from '@src/utils/reactQuery';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WithAuthAdmin = ({ children }) => {
  // const { user } = useUser();
  // const router = useRouter();
  // const { data, isLoading, isError } = useGetUser(
  //   user?.phoneNumbers[0]?.phoneNumber,
  // );

  // useEffect(() => {
  //   //@ts-ignore
  //   if (!user || user.role !== 'admin') {
  //     router.push('/verifyUser');
  //   }
  // }, [user, router]);

  //@ts-ignore
  return children;
  // return user && user.role === 'admin' ? children : null;
};

export default WithAuthAdmin;
