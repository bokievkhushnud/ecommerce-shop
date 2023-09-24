import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

type PageWrapperProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
