'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressProvider = () => {
  return (
    <ProgressBar
      height="2px"
      
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressProvider;
