import { ChangeEvent, useState } from 'react';
import styles from './myPageBasicInfo.module.scss';
import { Text, Input, Button } from '@goorm-dev/vapor-components';
import { ImageIcon } from '@goorm-dev/gds-icons';
import defaultProfileImage from '../../../assets/svgs/defaultProfile.svg';

interface MyPageBasicInfoProps {
  onInfoChange: (changed: boolean) => void;
  initialName: string;
  initialEmail: string;
}

export default function MyPageBasicInfo({ onInfoChange, initialName, initialEmail }: MyPageBasicInfoProps) {
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
  const [name, setName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(initialEmail);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onInfoChange(newName !== initialName || email !== initialEmail);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onInfoChange(name !== initialName || newEmail !== initialEmail);
  };

  return (
    <div className={styles.basicInfoContainer}>
      <div className={styles.profileContainer}>
        <img src={profileImage} alt="Profile" />
        <Button icon={ImageIcon} size="md" color="link">
          프로필 수정
        </Button>
      </div>
      <div className={styles.infoContainer}>
        <Text typography="heading6">기본 정보</Text>
        <div className={styles.infoContentContainer}>
          <div className={styles.infoTitle}>
            <Text className={styles.infoTitleText}>이름</Text>
            <Text className={styles.infoTitleText} color="red-500">
              *
            </Text>
          </div>
          <Input bsSize="lg" value={name} onChange={handleNameChange}></Input>
        </div>
        <div className={styles.infoContentContainer}>
          <div className={styles.infoTitle}>
            <Text className={styles.infoTitleText}>메일</Text>
            <Text className={styles.infoTitleText} color="red-500">
              *
            </Text>
          </div>
          <Input bsSize="lg" value={email} onChange={handleEmailChange}></Input>
        </div>
        <Button className={styles.buttonStyle} size="md" color="hint">
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}
