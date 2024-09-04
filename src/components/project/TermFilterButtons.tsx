import { Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames';
import styles from './projectStyles.module.scss';

interface TermFilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

export default function TermFilterButton({ children, active, ...restProps }: TermFilterButtonProps) {
  return (
    <button className={classNames(styles.termFilterButton, { [styles.active]: active })} {...restProps}>
      <Text typography="subtitle1" color={active ? 'text-primary-alternative' : 'text-alternative'}>
        {children}
      </Text>
    </button>
  );
}
