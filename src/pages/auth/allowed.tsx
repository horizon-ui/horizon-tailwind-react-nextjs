// hocs/withAuthAdmin.js
import { userState } from '@src/utils/recoil/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const WithAuthAdmin = ({ children }) => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  useEffect(() => {
    //@ts-ignore
    if (!user || user.role !== 'admin') {
      router.push('/verifyUser');
    }
  }, [user, router]);

  //@ts-ignore
  return user && user.role === 'admin' ? children : null;
};

export default WithAuthAdmin;
