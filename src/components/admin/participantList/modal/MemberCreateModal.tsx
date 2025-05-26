import {
  Avatar,
  Modal,
  ModalHeader,
  ModalBody,
  Text,
  Input,
  Radio,
  Button,
  ModalFooter,
} from '@goorm-dev/vapor-components';
import styles from './memberCreateModal.module.scss';
import FormField from '../../../common/formField/FormField';
import UnivSearchDropdown from './dropdown/UnivSearchDropdown';
import GenerationSelectDropdown from './dropdown/GenerationSelectDropdown';
interface MemberCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const MemberCreateModal = ({ isOpen, toggle }: MemberCreateModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          인원 추가하기
        </Text>
      </ModalHeader>
      <ModalBody className={styles.modalBody}>
        <Avatar name="Goorm" />
        <div className={styles.memberContainer}>
          <FormField label="이름" required>
            <Input bsSize="lg" placeholder="이름을 입력해주세요" />
          </FormField>
          <FormField label="학교" required>
            <UnivSearchDropdown />
          </FormField>
          <FormField label="이메일" required>
            <Input bsSize="lg" placeholder="이메일을 입력해주세요" />
          </FormField>
          <FormField label="전화번호" required>
            <Input bsSize="lg" placeholder="000-0000-0000" />
          </FormField>
          <FormField label="참여 기수" required>
            <GenerationSelectDropdown />
          </FormField>
          <FormField label="권한" required>
            <div className={styles.radioContainer}>
              <Radio id="user" label="참가자" name="role" />
              <Radio id="admin" label="중앙운영단" name="role" />
            </div>
          </FormField>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary">
          추가
        </Button>
      </ModalFooter>
    </Modal>
  );
};
