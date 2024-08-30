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

export default function SignUp() {
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
        <div className={styles.title}>
          <Text className={styles.titleText}>현재 비밀번호</Text>
          <Text className={styles.titleText} color="red-500">
            *
          </Text>
        </div>
        <Input bsSize="lg" placeholder="영문, 특수문자 조합 8자 이상"></Input>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          <Text className={styles.titleText}>현재 비밀번호</Text>
          <Text className={styles.titleText} color="red-500">
            *
          </Text>
        </div>
        <Input bsSize="lg" placeholder="영문, 특수문자 조합 8자 이상"></Input>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          <Text className={styles.titleText}>현재 비밀번호</Text>
          <Text className={styles.titleText} color="red-500">
            *
          </Text>
        </div>
        <Input bsSize="lg" placeholder="영문, 특수문자 조합 8자 이상"></Input>
      </div>
      <Button className={styles.confirmBtn} size="lg">
        완료
      </Button>
    </div>
  );
}
