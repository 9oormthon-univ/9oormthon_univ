import styles from './styles.module.scss';

interface StackItemProps {
  skill: string;
}

export default function StackItem({ skill }: StackItemProps) {
  return (
    <div className={styles.stackItem}>
      <img src={`https://skillicons.dev/icons?i=${skill}`} />
    </div>
  );
}
