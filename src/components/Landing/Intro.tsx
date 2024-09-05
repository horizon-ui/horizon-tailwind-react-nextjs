import AmazonLogo from '@public/icons/logos/AmazonLogo';
import MicrosoftLogo from '@public/icons/logos/MicrosoftLogo';
import NetflixLogo from '@public/icons/logos/NetflixLogo';
import SonyLogo from '@public/icons/logos/SonyLogo';
import VerizonLogo from '@public/icons/logos/VerizonLogo';
import Container from '@component/container/Container';
import { PRODUCT_DESCRIPTION } from 'src/constants/meta';
import Image from 'next/image';

const Intro = () => {
  const socialProofs = [
    {
      name: 'Amazon',
      element: <AmazonLogo />,
    },
    {
      name: 'Miccrosft',
      element: <MicrosoftLogo />,
    },
    {
      name: 'Netflix',
      element: <NetflixLogo />,
    },
    {
      name: 'Sony',
      element: <SonyLogo />,
    },
    {
      name: 'Verizon',
      element: <VerizonLogo />,
    },
  ];

  return (
    <>
      <Container className="flex flex-row flex-wrap items-center md:my-10">
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div>
            <Image
              src={'banner/lightBanner.gif'}
              width={400}
              height={400}
              priority
              alt="banner"
            />
          </div>
        </div>
        <div className="flex w-full items-center lg:w-1/2">
          <div className="mb-8 max-w-2xl">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-3xl lg:leading-tight xl:text-5xl xl:leading-tight">
              Omerald Admin
            </h1>
            <p className="lg:text-md text-md py-5 italic leading-normal text-gray-700 dark:text-gray-300 xl:text-lg">
              {PRODUCT_DESCRIPTION}
            </p>

            <div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <a
                href="https://omerald.com/"
                target="_blank"
                rel="noopener"
                className="flex flex-row items-center justify-center space-x-4 rounded-md bg-orange-400 px-8 py-4 text-center text-lg font-medium text-white"
              >
                <span>Visit Omerald</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Intro;
