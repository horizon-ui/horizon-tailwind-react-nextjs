'use client';
import Banner from '@src/components/admin/backup/nft-marketplace/Banner';
import NFt2 from '/public/img/nfts/Nft2.png';
import NFt4 from '/public/img/nfts/Nft4.png';
import NFt3 from '/public/img/nfts/Nft3.png';
import NFt5 from '/public/img/nfts/Nft5.png';
import NFt6 from '/public/img/nfts/Nft6.png';
import avatar1 from '/public/img/avatars/avatar1.png';
import avatar2 from '/public/img/avatars/avatar2.png';
import avatar3 from '/public/img/avatars/avatar3.png';

import tableDataTopCreators from '@variables/nfts/marketplace/tableDataTopCreators';
import HistoryItem from '@src/components/admin/backup/nft-marketplace/HistoryItem';
import TopCreatorTable from '@src/components/admin/backup/nft-marketplace/TableTopCreators';
import NftCard from '@component/card/NftCard';
import Admin from '../../../pages/dashboard/[[...index]]';

const Marketplace = () => {
  return (
    <Admin>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          {/* NFt Banner */}
          <Banner />

          {/* NFt Header */}
          <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Trending NFTs
            </h4>
            <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  Art
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  Music
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  <a href=" ">Sports</a>
                </a>
              </li>
            </ul>
          </div>

          {/* NFTs trending card */}
          <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Abstract Colors"
              author="Esthera Jackson"
              price="0.91"
              image={NFt3}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="ETH AI Brain"
              author="Nick Wilson"
              price="0.7"
              image={NFt2}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Mesh Gradients"
              author="Will Smith"
              price="2.91"
              image={NFt4}
            />
          </div>

          {/* Recenlty Added setion */}
          <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
              Recently Added
            </h4>
          </div>

          {/* Recently Add NFTs */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Abstract Colors"
              author="Esthera Jackson"
              price="0.91"
              image={NFt4}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="ETH AI Brain"
              author="Nick Wilson"
              price="0.7"
              image={NFt5}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Mesh Gradients"
              author="Will Smith"
              price="2.91"
              image={NFt6}
            />
          </div>
        </div>

        {/* right side section */}

        <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
          <TopCreatorTable tableData={tableDataTopCreators} />
          <div className="mb-5" />
          <HistoryItem />
        </div>
      </div>
    </Admin>
  );
};

export default Marketplace;
