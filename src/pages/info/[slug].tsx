import PrimaryLayout from 'src/layouts/PrimaryLayout';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { PageWithPrimaryLayout } from 'src/types/page';
const inter = Inter({ subsets: ['latin'] });

const Home: PageWithPrimaryLayout = () => {
  const router = useRouter();
  const description = 'Coming Soon....';

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-[h-screen/2] p-8">
      <div
        className={`flex flex-col justify-between lg:mx-20 lg:min-h-[60vh] ${inter.className} w-full`}
      >
        <section>
          <p className="text-md font-bold text-gray-700">
            {router?.query?.slug}
          </p>
          <p className="my-10">{description}</p>
        </section>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;
