import SignUpCard from '../../components/signUp/SignUpCard';
import styles from './styles.module.scss';

export default function SignUp() {
  return (
    <div className={styles.SignUpContainer}>
      <SignUpCard />
    </div>
  );
}
