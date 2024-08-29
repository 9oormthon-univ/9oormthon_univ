import MyPageBasicInfo from '../../components/myPage/myPageBasicInfo/MyPageBasicInfo';
import MyPageDetailedInfo from '../../components/myPage/myPageDetailedInfo/MyPageDetailedInfo';
import MyPageProject from '../../components/myPage/myPageProject/MyPageProject';
import styles from './styles.module.scss';
import { BackPageIcon, PlusIcon, WarningIcon, ErrorCircleIcon } from '@goorm-dev/gds-icons';
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
import { useState } from 'react';

export default function SignUp() {
  return (
    <div className={styles.MyPageContainer}>
      <div className={styles.myPageHeader}>
        <Text typography="heading3" color="gray-900">
          마이 페이지
        </Text>
        <Button color="link" size="sm">
          로그아웃
        </Button>
      </div>
      <hr className={styles.divider} />
      <MyPageBasicInfo />
      <MyPageDetailedInfo />
      <MyPageProject />
      <Button className={styles.confirmBtn} size="lg">
        변경사항 저장
      </Button>
    </div>
  );
}
