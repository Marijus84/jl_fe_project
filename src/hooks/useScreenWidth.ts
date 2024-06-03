import { useEffect, useState } from 'react';

import { breakpoints } from '../const';

export const useScreenWidth = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= +breakpoints.md.slice(0, -2));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= +breakpoints.md.slice(0, -2));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};
