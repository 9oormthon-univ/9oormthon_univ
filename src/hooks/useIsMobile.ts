import { useEffect, useState } from 'react';

export default function useIsMobile(options?: { width?: number }) {
  const width = options?.width ?? 992;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= width);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= width);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return { isMobile };
}
