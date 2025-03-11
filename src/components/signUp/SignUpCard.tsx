import styles from './signUpCard.module.scss';
import { WarningIcon } from '@goorm-dev/vapor-icons';
import { Text, Input, Button, Alert } from '@goorm-dev/vapor-components';
import { ChangeEvent, useCallback, useState } from 'react';
import Logo from '../../assets/images/goormthon_univ_BI-Bk.png';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import usePeriodStore from '../../store/usePeriodStore';

export default function SignUpCard() {
  const navigate = useNavigate();

  const { login } = useAuthStore();
  const { fetchPeriodData } = usePeriodStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 로그인
  const handleLogin = useCallback(async () => {
    if (!email) {
      setErrorMessage('이메일을 입력해주세요');
      return;
    }
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요');
      return;
    }

    try {
      await login(email, password);
      await fetchPeriodData();
      navigate('/');
    } catch (error: any) {
      setErrorMessage(error.response.data.error?.message || '알 수 없는 오류가 발생했습니다.');
      console.log(error.response.data.error?.message);
    }
  }, [email, password, login, navigate]);

  // 엔터 키 눌렀을 때 로그인
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={styles.signUpCardContainer}>
      <img src={Logo} className={styles.logo} alt="구름톤 유니브 로고" />
      <div className={styles.loginContainer}>
        <Input value={email} bsSize="xl" placeholder="이메일" onChange={handleEmailChange} onKeyDown={handleKeyDown} />
        <Input
          type="password"
          value={password}
          bsSize="xl"
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          onKeyDown={handleKeyDown}
        />
        <Button size="xl" onClick={handleLogin}>
          로그인
        </Button>
        {errorMessage && (
          <Alert color="danger" leftIcon={WarningIcon} className={styles.alignCenter}>
            {errorMessage}
          </Alert>
        )}
        <hr className="w-100 border-bottom var(--gray-300)" />
        <Text typography="subtitle2" color="gray-600" fontWeight="regular">
          로그인 시 구름톤 유니브의 서비스 약관 및<br></br> 개인정보 처리방침을 확인하였으며, 동의합니다.
        </Text>
      </div>
    </div>
  );
}
