import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={`container mx-auto ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default Container;
