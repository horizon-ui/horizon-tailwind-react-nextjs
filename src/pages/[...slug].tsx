// pages/[...slug].tsx
import { FC } from 'react';
import { useRouter } from 'next/router';
import PrimaryLayout from '@src/layouts/PrimaryLayout';
import { PageWithPrimaryLayout } from '@src/types/page';

const CatchAllPage: PageWithPrimaryLayout = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mx-4">Sorry, Pag does not exist.</p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 rounded bg-indigo-600 px-4 py-2 text-white"
      >
        Go to Home
      </button>
    </div>
  );
};

CatchAllPage.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default CatchAllPage;
