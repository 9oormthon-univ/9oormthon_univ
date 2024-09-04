import { BackPageIcon, WarningIcon } from '@goorm-dev/gds-icons';
import { Alert, Button, Input, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

export default function SignUp() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // TODO : 첫 로그인 여부 API로 받기
  const isFirstLogin = true;

  useEffect(() => {
    if (submitted) {
      validatePassword(); // 버튼을 눌렀을 경우에만 실시간 유효성 검사
    }
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = () => {
    setSubmitted(true); // 버튼이 눌린 상태로 변경
    if (validatePassword()) {
      // 비밀번호 변경 로직 추가
      console.log('Password changed successfully');
    }
  };
  const validatePassword = () => {
    if (isFirstLogin && !currentPassword) {
      setAlertMessage('현재 비밀번호를 입력해 주세요');
      return false;
    }

    // 비밀번호가 비어있는지 체크
    if (!newPassword) {
      setAlertMessage('새 비밀번호를 입력해 주세요');
      return false;
    }

    // 비밀번호가 조건에 맞지 않는지 체크 (영문, 특수문자 조합 8자 이상)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setAlertMessage('비밀번호는 영문, 특수문자 조합 8자 이상이어야 합니다.');
      return false;
    }

    // 비밀번호 확인 입력이 비어있는지 체크
    if (!confirmPassword) {
      setAlertMessage('비밀번호 확인을 입력해 주세요');
      return false;
    }

    // 비밀번호와 비밀번호 확인이 일치하지 않는지 체크
    if (newPassword !== confirmPassword) {
      setAlertMessage('비밀번호가 일치하지 않습니다.');
      return false;
    }

    // 모든 조건을 만족하면 알림을 없애고 true 반환
    setAlertMessage(null);
    return true;
  };

  return (
    <div className={styles.updatePWContainer}>
      <div className={styles.header}>
        <Button icon={BackPageIcon} color="link"></Button>
        <Text typography="heading3" color="gray-900">
          비밀번호 변경
        </Text>
      </div>
      <hr className={styles.divider} />
      <div className={styles.contentContainer}>
        {isFirstLogin && (
          <div className={styles.inputGroup}>
            <div className={styles.title}>
              <Text className={styles.titleText}>현재 비밀번호</Text>
              <Text className={styles.titleText} color="red-500">
                *
              </Text>
            </div>
            <Input
              bsSize="lg"
              placeholder="현재 비밀번호"
              type="password"
              value={currentPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
            />
          </div>
        )}
        <div className={styles.inputGroup}>
          <div className={styles.title}>
            <Text className={styles.titleText}>새 비밀번호</Text>
            <Text className={styles.titleText} color="red-500">
              *
            </Text>
          </div>
          <Input
            bsSize="lg"
            placeholder="영문, 특수문자 조합 8자 이상"
            type="password"
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.title}>
            <Text className={styles.titleText}>새 비밀번호 확인</Text>
            <Text className={styles.titleText} color="red-500">
              *
            </Text>
          </div>
          <Input
            bsSize="lg"
            placeholder="영문, 특수문자 조합 8자 이상"
            type="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      {alertMessage && (
        <Alert color="danger" leftIcon={WarningIcon}>
          {alertMessage}
        </Alert>
      )}
      <Button className={styles.confirmBtn} size="lg" onClick={handleSubmit}>
        완료
      </Button>
    </div>
  );
}
