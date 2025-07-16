import { BackPageOutlineIcon, WarningIcon } from '@goorm-dev/vapor-icons';
import { Alert, Button, Input, Text, toast } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

import { useState } from 'react';
import { resetPasswordAPI } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // TODO : 첫 로그인 여부 API로 받기
  const isFirstLogin = true;

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setAlertMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await resetPasswordAPI(currentPassword, newPassword);
      navigate('/my-page');
      toast('비밀번호 변경이 완료되었습니다.', {
        type: 'primary',
      });
    } catch (error: any) {
      const errorMessage = error.response.data.error?.message;
      toast(errorMessage || '비밀번호 변경에 실패했습니다. 운영진에게 문의해주세요.', {
        type: 'danger',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.updatePWContainer}>
      <div className={styles.header}>
        <Button icon={BackPageOutlineIcon} color="secondary" onClick={() => navigate(-1)}></Button>
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
              onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
