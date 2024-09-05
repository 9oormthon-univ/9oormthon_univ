import { Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ComponentProps, ReactNode } from 'react';
import styles from './projectStyles.module.scss';

type Props = ComponentProps<typeof motion.button>;

interface TermFilterButtonProps extends Props {
  active: boolean;
  children: ReactNode;
}

export default function TermFilterButton({ children, active, ...restProps }: TermFilterButtonProps) {
  return (
    <motion.button
      className={classNames(styles.termFilterButton, { [styles.active]: active })}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.1 }}
      {...restProps}>
      <Text typography="subtitle1" color={active ? 'text-primary-alternative' : 'text-alternative'}>
        {children}
      </Text>
    </motion.button>
  );
}
