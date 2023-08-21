import React from 'react';
import Navigation from './Navigation';

type PageWrapperProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default MainLayout;
