import styles from './signUpCard.module.scss';
import { Text, Input, Button, Alert } from '@goorm-dev/vapor-components';
import { ChangeEvent, useState } from 'react';
import Logo from '../../assets/images/goormthon_univ_BI-Bk.png';

export default function SignUpCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email && !password) {
      setErrorMessage('이메일을 입력해주세요');
      return;
    } else if (!email) {
      setErrorMessage('이메일을 입력해주세요');
      return;
    } else if (!isValidEmail(email)) {
      setErrorMessage('올바르지 않은 이메일 형식입니다');
      return;
    } else if (!password) {
      setErrorMessage('비밀번호를 입력해주세요');
      return;
    }
    // 에러 메시지 초기화
    setErrorMessage(null);

    // 나중에 로그인 로직 추가
    console.log('로그인 시도:', { email, password });
  };

  return (
    <div className={styles.signUpCardContainer}>
      <img src={Logo} className={styles.logo} alt="구름톤 유니브 로고" />
      <div className={styles.loginContainer}>
        <Input value={email} bsSize="xl" placeholder="이메일" onChange={handleEmailChange} />
        <Input type="password" value={password} bsSize="xl" placeholder="비밀번호" onChange={handlePasswordChange} />
        <Button size="xl" onClick={handleLogin}>
          로그인
        </Button>
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        <hr className="w-100 border-bottom var(--gray-300)" />
        <Text typography="subtitle2" color="gray-600" fontWeight="regular">
          로그인 시 구름톤 유니브의 서비스 약관 및<br></br> 개인정보 처리방침을 확인하였으며, 동의합니다.
        </Text>
      </div>
    </div>
  );
}
