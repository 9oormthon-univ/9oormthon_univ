import { useEffect, useState } from 'react';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const useBreakpoint = (): Breakpoint => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= breakpoints.xxl) {
      setCurrentBreakpoint('xxl');
    } else if (width >= breakpoints.xl) {
      setCurrentBreakpoint('xl');
    } else if (width >= breakpoints.lg) {
      setCurrentBreakpoint('lg');
    } else if (width >= breakpoints.md) {
      setCurrentBreakpoint('md');
    } else if (width >= breakpoints.sm) {
      setCurrentBreakpoint('sm');
    } else {
      setCurrentBreakpoint('xs');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentBreakpoint;
};

export default useBreakpoint;
