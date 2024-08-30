import styles from './styles.module.scss';
import { BackPageIcon, PlusIcon, WarningIcon, ErrorCircleIcon } from '@goorm-dev/gds-icons';
import { Text, Input, Button, Alert } from '@goorm-dev/vapor-components';

import { useState } from 'react';

interface SignUpProps {
  isFirstLogin: boolean; // 첫 로그인여부
}

export default function SignUp({ isFirstLogin }: SignUpProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
        {true && (
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
              onChange={(e) => setCurrentPassword(e.target.value)}
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
            onChange={(e) => setNewPassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
