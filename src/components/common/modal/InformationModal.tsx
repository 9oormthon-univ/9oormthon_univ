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
  isPrimary?: boolean;
  confirmButtonColor?: 'primary' | 'secondary' | 'danger';
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
  isPrimary = false,
  confirmButtonColor = 'danger',
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
        <NoticeCircleIcon className={isPrimary ? styles.notDangerIcon : styles.modalIcon} />
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
        <Button size="lg" color={confirmButtonColor} onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
