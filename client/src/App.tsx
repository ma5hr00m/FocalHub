import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { configAtom } from './jotai/jotai';
import AppRoutes from './routes/AppRoutes';
import HeadHelmet from './components/Helmet';

// import useUpdateFrequency from '@utils/useUpdateFrequency';

const App: React.FC = ({}) => {
  const [config] = useAtom(configAtom);
  console.log(config);

  // const [count, ] = useState(0);
  // useUpdateFrequency(count);

  if (!config) {
    return <div>Loading...</div>; // 或者其他加载状态
  }

  return (
    <>
      <HeadHelmet config={config.site} />
      <AppRoutes />
    </>
  );
}

export default App;
