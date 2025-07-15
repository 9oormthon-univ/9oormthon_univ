import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Tooltip } from '@goorm-dev/vapor-components';
import { getStackName } from '../../../../constants/Stacks';

interface StackItemProps {
  skill: string;
}

export default function StackItem({ skill }: StackItemProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('ref:', ref.current);
  }, []);

  return (
    <div
      className={styles.stackItem}
      ref={ref}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}>
      <img src={`https://skillicons.dev/icons?i=${skill}`} alt={skill} />
      <Tooltip id={ref} placement="top" hideArrow={false} isOpen={tooltipOpen} toggle={toggle}>
        {getStackName(skill)}
      </Tooltip>
    </div>
  );
}
