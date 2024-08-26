import { useEffect, useRef } from 'react';

const useUpdateFrequency = (value: any) => {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current += 1;
    console.log(`Updated ${countRef.current} times`);
  }, [value]);

  return countRef.current;
};

export default useUpdateFrequency;