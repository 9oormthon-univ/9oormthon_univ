import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Text, toast } from '@goorm-dev/vapor-components';
import { CopyIcon, LockIcon } from '@goorm-dev/vapor-icons';
import styles from './passwordResetModal.module.scss';

interface PasswordResetModalProps {
  isOpen: boolean;
  toggle: () => void;
  password: string;
}

export const PasswordResetModal = ({ isOpen, toggle, password }: PasswordResetModalProps) => {
  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast('비밀번호가 클립보드에 복사되었습니다', {
        type: 'primary',
      });
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader />
      <ModalBody className={styles.modalBody}>
        <LockIcon className={styles.modalIcon} />
        <div className={styles.modalContent}>
          <Text typography="heading5" color="text-normal">
            {password}
          </Text>
          <Button size="sm" color="secondary" icon={CopyIcon} onClick={handleCopyPassword} />
        </div>
        <Text typography="body2" color="text-normal">
          랜덤 비밀번호를 생성했습니다. <br />
          복사하여 미르미에게 전달해주세요.
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};
