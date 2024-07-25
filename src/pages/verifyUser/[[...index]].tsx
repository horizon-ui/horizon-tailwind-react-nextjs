import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, useUser } from '@clerk/nextjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@src/utils/recoil/user';
import { useCreateUser, useGetUser } from '@src/utils/reactQuery';
import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { PageWithPrimaryLayout } from 'src/types/page';
import { errorAlert } from '@src/components/alert';

const inter = Inter({ subsets: ['latin'] });

const VerifyUser: PageWithPrimaryLayout = () => {
  const { session } = useSession();
  const { user } = useUser();
  const setUserRecoil = useSetRecoilState(userState);
  const userValue = useRecoilValue(userState);
  const router = useRouter();
  const { data, isLoading, isError } = useGetUser(
    user?.phoneNumbers[0]?.phoneNumber,
  );

  const createUser = useCreateUser({
    onSuccess: (res) => {
      if (res?.status === 200 && res?.data?._id) {
        setUserRecoil(res.data);
      }
    },
    onError: () => {
      errorAlert('Error Creating user');
    },
  });

  useEffect(() => {
    if (
      session?.status === 'active' &&
      !isLoading &&
      data &&
      data.status === 200 &&
      data.data === null
    ) {
      let userData = {
        phoneNumber: user?.phoneNumbers[0]?.phoneNumber,
        userName: user?.fullName,
        role: 'user',
      };

      createUser.mutate({ data: userData });
    }
  }, [session, isLoading, data, createUser]);

  useEffect(() => {
    if (session?.status === 'active' && !isLoading && data && data.data) {
      setUserRecoil(data.data);
    }
  }, [session, isLoading, data, setUserRecoil]);

  useEffect(() => {
    if (userValue && userValue.role === 'admin') {
      router.push('/dashboard/default');
    } else if (!user && !isLoading && !isError) {
      router.push('/signIn');
    }
  }, [userValue, user, isLoading, isError, router]);

  return (
    <div className="min-h-screen p-8">
      {isLoading && (
        <div className="flex h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && (
        <div className={`flex flex-col items-center ${inter.className} w-full`}>
          <section className="my-10">Verify User</section>
        </div>
      )}
    </div>
  );
};

VerifyUser.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default VerifyUser;
