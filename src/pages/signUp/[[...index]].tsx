import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { ClerkLoading, SignUp } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { PageWithPrimaryLayout } from 'src/types/page';
const inter = Inter({ subsets: ['latin'] });

const UserSignIn: PageWithPrimaryLayout = () => {
  return (
    <div className="min-[h-screen/2] p-8">
      <div
        className={`flex flex-col items-center justify-between ${inter.className} w-full`}
      >
        <section className="my-10">
          <SignUp
            appearance={{
              elements: {
                footer: {
                  display: 'none',
                },
              },
            }}
            redirectUrl="/admin/default"
          />
          <ClerkLoading>
            <p>Loading...</p>
          </ClerkLoading>
        </section>
      </div>
    </div>
  );
};

UserSignIn.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default UserSignIn;
