import { ChangeEvent, useState } from 'react';
import styles from './myPageBasicInfo.module.scss';
import {
  Text,
  Input,
  Button,
  Checkbox,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  ListGroupItem,
  ListGroup,
} from '@goorm-dev/vapor-components';
import { ImageIcon } from '@goorm-dev/gds-icons';
import defaultProfileImage from '../../../assets/svgs/defaultProfile.svg';

export default function MyPageBasicInfo() {
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);

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
          <Input bsSize="lg"></Input>
        </div>
        <div className={styles.infoContentContainer}>
          <div className={styles.infoTitle}>
            <Text className={styles.infoTitleText}>메일</Text>
            <Text className={styles.infoTitleText} color="red-500">
              *
            </Text>
          </div>
          <Input bsSize="lg"></Input>
        </div>
        <Button className={styles.buttonStyle} size="md" color="hint">
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}
