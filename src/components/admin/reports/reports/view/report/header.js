import { PhoneFilled } from '@ant-design/icons';
import { Image } from 'antd';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

const logo =
  'https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png';

const Header = () => {
  return (
    <div className="border-b pb-4 p-8 text-left">
      <div className="header flex text-left justify-between items-center">
        <div className="flex">
          <section className="mr-4">
            <Image src={logo} alt="logo" width={80} height={80} />
          </section>
          <section>
            <h1 className="text-3xl font-bold">OMERALD DIAGNOSTIC</h1>
            <p className="text-md">Accurate | Caring | Instant</p>
          </section>
        </div>
        <div className="text-right">
          <p>
            <PhoneFilled className="w-6 text-sm text-orange-500" /> Phone: +91
            91543 58410
          </p>
          <p className="flex">
            <EnvelopeIcon className="w-5 text-sm text-orange-500 mr-2" />
            Email: bod@omerald.com
          </p>
        </div>
      </div>
      <p className="text-lg ml-[9%]">
        #3-1-325/2, 3rd Floor, Near AK Bhavan Hall,
        <br /> Nimboliadda, Kachiguda, Hyderabad, Telangana - 500027
      </p>
    </div>
  );
};

export default Header;
