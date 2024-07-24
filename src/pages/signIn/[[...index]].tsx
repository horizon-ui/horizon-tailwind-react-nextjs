import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { SignIn } from '@clerk/nextjs';
import { PageWithPrimaryLayout } from 'src/types/page';

const UserSignIn: PageWithPrimaryLayout = () => {
  return (
    <div className="min-[h-screen/2] p-8">
      <div className={`flex w-full flex-col items-center justify-between`}>
        <section className="my-10">
          {/* <SignIn signUpUrl="/signUp" redirectUrl="/verifyUser" /> */}
        </section>
      </div>
    </div>
  );
};

UserSignIn.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default UserSignIn;
