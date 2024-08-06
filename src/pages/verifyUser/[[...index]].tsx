import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, useUser } from '@clerk/nextjs';
import { useSetRecoilState } from 'recoil';
import { userState } from '@src/utils/recoil/user';
import { useCreateUser, useGetUser } from '@src/utils/reactQuery';
import { PageWithPrimaryLayout } from 'src/types/page';
import { errorAlert, errorAlert2, successAlert } from '@src/components/alert';
import { ALLOWED_USERS } from '@src/constants/appConstants';
import { UserData } from '@src/api/utils/interface';
import PrimaryLayout from 'src/layouts/PrimaryLayout';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

const VerifyUser: PageWithPrimaryLayout = () => {
  const { session } = useSession();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const phone = user?.phoneNumbers[0]?.phoneNumber;
  const { data: userData, refetch, isLoading, status } = useGetUser(phone);
  const setUserRecoil = useSetRecoilState(userState);

  const createUser = useCreateUser({
    onSuccess: (res: any) => {
      if (res?.status === 201 && res?.data?._id) {
        setUserRecoil(res.data);
        successAlert('Created user successfully');
        refetch();
        //@ts-ignore
        handleVerifyUser(res.data);
      }
    },
    onError: (error: Error) => {
      errorAlert('Error Creating user: ' + error.message);
      router.push('/signIn');
    },
  });

  const handleCreateUser = (userObj: UserData): void => {
    createUser.mutate({ data: userObj });
  };

  const handleVerifyUser = (userObj: UserData | null): void => {
    if (!userObj) {
      const newUser: UserData = {
        role: 'sme',
        userName: user?.fullName || '',
        phoneNumber: phone || '',
      };
      handleCreateUser(newUser);
      return;
    }

    if (ALLOWED_USERS.includes(userObj.role)) {
      setUserRecoil(userObj);
      router.push('/dashboard/default');
    } else {
      errorAlert2('You don’t have relevant access');
      router.push('/');
    }
  };

  useEffect(() => {
    if (
      session?.status === 'active' &&
      status === 'success' &&
      !isLoading &&
      userData &&
      userData?.data
    ) {
      handleVerifyUser(userData.data);
    }
  }, [session?.status, isLoading, userData, status]);

  useEffect(() => {
    if (isLoaded && user && phone) {
      refetch();
    }
  }, [isLoaded, user, phone, refetch]);

  return (
    <div className="p-8">
      <div className="m-auto flex justify-center text-center">
        <div className="bg-container">
          <section>
            <Image
              src="banner/verifyUser.gif"
              alt="Verifying User"
              width={1000}
              height={1000}
            />
          </section>

          {isLoading && (
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
              <Button
                isLoading
                loadingText="Fetching user"
                variant="outline"
                size="xxl"
              >
                Button
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

VerifyUser.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default VerifyUser;
