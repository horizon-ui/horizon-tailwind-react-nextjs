'use client';
import Banner from '@component/admin/profile/Banner';
import General from '@component/admin/profile/General';
import Notification from '@component/admin/profile/Notification';
import Project from '@component/admin/profile/Project';
import Storage from '@component/admin/profile/Storage';
import Upload from '@component/admin/profile/Upload';
import Admin from '../[[...index]]';

const ProfileOverview = () => {
  return (
    <Admin>
      <div className="flex w-full flex-col gap-5 lg:gap-5">
        <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-4 lg:!mb-0">
            <Banner />
          </div>

          <div className="col-span-3 lg:!mb-0">
            <Storage />
          </div>

          <div className="z-0 col-span-5 lg:!mb-0">
            <Upload />
          </div>
        </div>
        {/* all project & ... */}

        <div className="mb-4 grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
          <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
            <Project />
          </div>
          <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
            <General />
          </div>

          <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
            <Notification />
          </div>
        </div>
      </div>
    </Admin>
  );
};

export default ProfileOverview;
