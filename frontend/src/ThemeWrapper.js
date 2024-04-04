// ThemeWrapper.js

import React from 'react';
import { useSelector } from 'react-redux';

const ThemeWrapper = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
