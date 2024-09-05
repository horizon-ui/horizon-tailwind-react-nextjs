import React from 'react';

type Props = {
  icon: null;
  title: string;
  children: React.ReactNode;
};

const BenefitBullet = ({ icon, title, children }: Props) => {
  return (
    <>
      <div className="mt-8 flex items-start space-x-3">
        <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border-none bg-indigo-500">
          {icon}
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {title}
          </h4>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{children}</p>
        </div>
      </div>
    </>
  );
};

export default BenefitBullet;
