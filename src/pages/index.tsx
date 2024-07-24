import Intro from '@component/Landing/Intro';
import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { Inter } from 'next/font/google';
import { PageWithPrimaryLayout } from 'src/types/page';
const inter = Inter({ subsets: ['latin'] });

const Home: PageWithPrimaryLayout = () => {
  return (
    <div className="min-[h-screen/2] p-8">
      <div
        className={`flex flex-col items-center justify-between ${inter.className} w-full`}
      >
        <Intro />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;
