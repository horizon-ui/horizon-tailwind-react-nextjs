import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, useUser } from '@clerk/nextjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@src/utils/recoil/user';
import { useCreateUser, useGetUser } from '@src/utils/reactQuery';
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

  const createUser = useCreateUser({
    onSuccess: (res) => {
      if (res?.status == 200 && res?.data?._id) {
        setUserRecoil(res.data);
      }
    },
    onError: () => {
      console.log('Error Creating User');
    },
  });

  // Create User
  useEffect(() => {
    //@ts-ignore
    if (
      session?.status === 'active' &&
      !isLoading &&
      data &&
      //@ts-ignore
      data.status === 200 &&
      //@ts-ignore
      data.data === null
    ) {
      // Data received is null, indicating no user found, proceed to create a new user
      let userData = {
        phoneNumber: user?.phoneNumbers[0]?.phoneNumber,
        userName: user?.fullName,
        role: 'user',
      };

      createUser.mutate({ data: userData });
    }
  }, [isLoading, session, data, setUserRecoil]);

  useEffect(() => {
    //@ts-ignore
    if (session?.status === 'active' && !isLoading && data && data.data) {
      //@ts-ignore
      setUserRecoil(data.data);
    }
  }, [session, isLoading, data, setUserRecoil]);

  useEffect(() => {
    //@ts-ignore
    if (userValue && userValue.role == 'admin') {
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
