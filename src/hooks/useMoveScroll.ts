import { useRef } from 'react';

export default function useMoveScroll() {
  const element = useRef<HTMLElement | null>(null);
  const onMoveToElement = () => {
    if (element.current) {
      element.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return { element, onMoveToElement };
}
