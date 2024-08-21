import { useEffect, useState } from 'react';

export default function useScrollValue() {
  const totalHeight = document.body.scrollHeight;

  const [scrollValue, setScrollValue] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const onScroll = () => {
    setScrollValue({ y: window.scrollY, x: window.scrollX });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollValue, totalHeight };
}
