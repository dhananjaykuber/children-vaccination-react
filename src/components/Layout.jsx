import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="fixed bottom-0 top-0 left-[280px] right-0 flex px-8 overflow-auto">
      <div className="z-10 py-14">{children}</div>
    </div>
  );
};

export default Layout;
