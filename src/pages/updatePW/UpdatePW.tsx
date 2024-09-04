import { BackPageIcon, WarningIcon } from '@goorm-dev/gds-icons';
import { Alert, Button, Input, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

import { useState } from 'react';

export default function SignUp() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // TODO : 첫 로그인 여부 API로 받기
  const isFirstLogin = true;

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setAlertMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setAlertMessage(null);
      // 비밀번호 변경 로직 추가
      console.log('Password changed successfully');
    }
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
