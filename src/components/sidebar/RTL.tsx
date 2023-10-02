/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import SidebarCard from 'components/sidebar/components/SidebarCard';
import {
  renderThumb,
  renderTrack,
  renderView,
} from 'components/scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';
import avatar4 from '/public/img/avatars/avatar4.png';
import routes from 'routes';
import Card from 'components/card';
import Image from 'next/image';

function SidebarHorizon(props: { variant?: string; [x: string]: any }) {
  const { open, onClose, variant, mini, hovered, setHovered } = props;
  return (
    <div
      className={`sm:none ${
        mini === false
          ? 'w-[285px]'
          : mini === true && hovered === true
          ? 'w-[285px]'
          : 'w-[285px] xl:!w-[120px]'
      } duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        variant === 'auth' ? 'xl:hidden' : 'xl:block'
      } ${open ? '' : '-translate-x-[105%] xl:translate-x-[unset]'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        extra={`mr-3 w-full h-[96.5vh] sm:ml-4 sm:my-4 m-7 !rounded-[20px]`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute left-4 top-4 block cursor-pointer xl:hidden"
                onClick={onClose}
              >
                <HiX />
              </span>
              <div className={`ml-[52px] mt-[44px] flex items-center `}>
                <div
                  className={`mr-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white ${
                    mini === false
                      ? 'block'
                      : mini === true && hovered === true
                      ? 'block'
                      : 'hidden'
                  }`}
                >
                  Horizon <span className="font-medium">PRO</span>
                </div>
                <div
                  className={`mr-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white ${
                    mini === false
                      ? 'hidden'
                      : mini === true && hovered === true
                      ? 'hidden'
                      : 'block'
                  }`}
                >
                  H
                </div>
              </div>
              <div className="mb-7 mt-[58px] h-px bg-gray-200 dark:bg-white/10" />
              {/* Nav item */}
              <ul>
                <Links routes={routes} />
              </ul>
            </div>
            {/* Free Horizon Card    */}
            <div className="mb-[30px] mt-[28px]">
              <div className="flex justify-center">
                <SidebarCard />
              </div>
              {/* Sidebar profile info */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="relative h-12 w-12 rounded-full bg-blue-200">
                  <Image
                    fill
                    style={{ objectFit: 'contain' }}
                    src={avatar4}
                    className="rounded-full"
                    alt="avatar"
                  />
                </div>
                <div
                  className={`mr-1 ${
                    mini === false
                      ? 'block'
                      : mini === true && hovered === true
                      ? 'block'
                      : 'block xl:hidden'
                  }`}
                >
                  <h4 className="text-base font-bold text-navy-700 dark:text-white">
                    Adela Parkson
                  </h4>
                  <p className="text-sm font-medium text-gray-600">
                    Product Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
}

export default SidebarHorizon;
