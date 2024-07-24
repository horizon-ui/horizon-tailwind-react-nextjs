import { useSession, useUser } from '@clerk/nextjs';
import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageWithPrimaryLayout } from 'src/types/page';

const inter = Inter({ subsets: ['latin'] });

const VerifyUser: PageWithPrimaryLayout = () => {
  const { session, isLoaded } = useSession();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (session?.status == 'active' && user) {
      // router.push('/admin/default');
    }
  }, [session, user]);

  return (
    <div className="min-[h-screen/2] p-8">
      <div
        className={`flex flex-col items-center justify-between ${inter.className} w-full`}
      >
        <section className="my-10"></section>
      </div>
    </div>
  );
};

VerifyUser.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default VerifyUser;
