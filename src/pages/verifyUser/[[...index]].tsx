import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, useUser } from '@clerk/nextjs';
import { useRecoilState } from 'recoil';
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

//Fetch user and navigate to dashboard
//Create user if user not found
const VerifyUser: PageWithPrimaryLayout = () => {
  const { session } = useSession();
  const { user } = useUser();
  const router = useRouter();
  const phone = user?.phoneNumbers[0]?.phoneNumber;
  const { data: userData, refetch, isLoading } = useGetUser(phone);
  const [userValue, setUserRecoil] = useRecoilState(userState);

  const createUser = useCreateUser({
    onSuccess: (res) => {
      //@ts-ignore
      if (res?.status === 201 && res?.data?._id) {
        setUserRecoil(res.data);
        successAlert('Created user succesfully');
        refetch();
        //@ts-ignore
        handleVerifyUser(res.data);
      }
    },
    onError: (error: Error) => {
      errorAlert('Error Creating user ' + error.message);
      router.push('/signIn');
    },
  });

  const handleCreateUser = (userObj: UserData): void => {
    createUser.mutate({ data: userObj });
  };

  const handleVerifyUser = (userObj: UserData): void => {
    if (userObj === null) {
      const userObj: UserData = {
        role: 'user',
        userName: user?.fullName,
        phoneNumber: phone,
      };
      handleCreateUser(userObj);
    }
    if (userObj && ALLOWED_USERS.includes(userObj.role)) {
      setUserRecoil(userObj);
      router.push('/dashboard/default');
    } else {
      errorAlert2('You dont have relevant access');
      router.push('/');
    }
  };

  useEffect(() => {
    if (session?.status === 'active' && !isLoading && userData) {
      // @ts-ignore
      userData && handleVerifyUser(userData.data);
    }
  }, [session, isLoading, userData]);

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
