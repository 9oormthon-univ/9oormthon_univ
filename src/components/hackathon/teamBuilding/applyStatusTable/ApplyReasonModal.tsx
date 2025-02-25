import { Modal, ModalBody, ModalHeader, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

interface ApplyReasonModalProps {
  id: number;
  preference: string;
  reason: string;
  name: string;
  part: string;
  university: string;
  toggle: () => void;
  isOpen: boolean;
}

export default function ApplyReasonModal({
  preference,
  reason,
  name,
  part,
  university,
  toggle,
  isOpen,
}: ApplyReasonModalProps) {
  return (
    <Modal type="center" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} />
      <ModalBody className={styles.modalBody}>
        <Text as="h5" typography="heading5">
          {preference}
        </Text>
        <Text as="p" typography="body2">
          {reason}
        </Text>
        <Text as="span" typography="body3" color="text-alternative">
          {name} / {part} / {university}
        </Text>
      </ModalBody>
    </Modal>
  );
}
