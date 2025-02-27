import { Modal, ModalBody, ModalHeader, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

interface ApplyReason {
  id: number;
  motivation: string;
  name: string;
  role: string;
  univ: string;
}

interface ApplyInfoProps {
  applyInfo: ApplyReason;
  toggle: () => void;
  isOpen: boolean;
}

export default function ApplyReasonModal({ applyInfo, toggle, isOpen }: ApplyInfoProps) {
  return (
    <Modal type="center" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} />
      <ModalBody className={styles.modalBody}>
        <Text as="h5" typography="heading5">
          지원 사유
        </Text>
        <Text as="p" typography="body2">
          {applyInfo.motivation}
        </Text>
        <Text as="span" typography="body3" color="text-alternative">
          {applyInfo.name} / {applyInfo.role} / {applyInfo.univ}
        </Text>
      </ModalBody>
    </Modal>
  );
}
