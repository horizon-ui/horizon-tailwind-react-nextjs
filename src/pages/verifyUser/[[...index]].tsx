import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, useUser } from '@clerk/nextjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@src/utils/recoil/user';
import { useGetUser } from '@src/utils/reactQuery';
import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { PageWithPrimaryLayout } from 'src/types/page';

const inter = Inter({ subsets: ['latin'] });

const VerifyUser: PageWithPrimaryLayout = () => {
  const { session } = useSession();
  const { user } = useUser();
  const setUserRecoil = useSetRecoilState(userState);
  const userValue = useRecoilValue(userState);
  const router = useRouter();
  const { data, isLoading } = useGetUser(user?.phoneNumbers[0]?.phoneNumber);

  useEffect(() => {
    //@ts-ignore
    if (session?.status === 'active' && !isLoading && data && data.data) {
      //@ts-ignore
      setUserRecoil(data.data);
    }
  }, [session, isLoading, data, setUserRecoil]);

  useEffect(() => {
    //@ts-ignore
    if (userValue && userValue.role === 'admin') {
      router.push('/dashboard/default');
    } else if (!user && !isLoading) {
      router.push('/signIn');
    }
  }, [userValue, user, isLoading, router]);

  return (
    <div className="min-h-screen/2 p-8">
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
