import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import { NoticeCircleIcon } from '@goorm-dev/vapor-icons';
import styles from './informationModal.module.scss';

interface InformationModalProps {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function InformationModal({
  isOpen,
  toggle,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: InformationModalProps) {
  const handleCancel = () => {
    onCancel?.();
    toggle();
  };

  const handleConfirm = () => {
    onConfirm?.();
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader />
      <ModalBody className={styles.modalBody}>
        <NoticeCircleIcon className={styles.modalIcon} />
        <Text typography="heading5" color="text-normal">
          {title}
        </Text>
        <Text typography="body2" color="text-normal">
          {description}
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={handleCancel}>
          {cancelLabel}
        </Button>
        <Button size="lg" color="danger" onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
