import { useSession, useUser } from '@clerk/nextjs';
import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageWithPrimaryLayout } from 'src/types/page';
import { useGetUser } from '@src/utils/reactQuery';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@src/utils/recoil/user';

const inter = Inter({ subsets: ['latin'] });

const VerifyUser: PageWithPrimaryLayout = () => {
  const { session } = useSession();
  const { user } = useUser();
  const setUserRecoil = useSetRecoilState(userState);
  const userValue = useRecoilValue(userState);
  const router = useRouter();
  const { data, isLoading, error } = useGetUser(
    user?.phoneNumbers[0]?.phoneNumber,
  );

  useEffect(() => {
    if (session?.status == 'active' && !isLoading) {
      if (data && data?.data) {
        setUserRecoil(data?.data);
      }
    }
  }, [isLoading, session, data]);

  useEffect(() => {
    if (userValue && userValue?.role === 'admin') {
      // router.push('/admin/default');
    }
  }, [userValue]);
  return (
    <div className="min-[h-screen/2] p-8">
      <div
        className={`flex flex-col items-center justify-between ${inter.className} w-full`}
      >
        <section className="my-10">Verify User</section>
      </div>
    </div>
  );
};

VerifyUser.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default VerifyUser;
