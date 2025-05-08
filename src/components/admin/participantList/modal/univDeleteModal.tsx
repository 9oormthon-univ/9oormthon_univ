import { Modal, ModalHeader, ModalBody, Text, ModalFooter, Button } from '@goorm-dev/vapor-components';
import styles from './univDeleteModal.module.scss';
import { NoticeCircleIcon } from '@goorm-dev/vapor-icons';

interface UnivDeleteModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const UnivDeleteModal = ({ isOpen, toggle }: UnivDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader />
      <ModalBody className={styles.modalBody}>
        <NoticeCircleIcon className={styles.modalIcon} />
        <Text typography="heading5" as="h5">
          해당 유니브를 삭제할까요?
        </Text>
        <Text typography="subtitle1" as="p" color="text-normal" className={styles.modalText}>
          구름대학교를 유니브 리스트에서 삭제합니다. <br /> 유니브 삭제가 완료되면 데이터를 되돌릴 수 없습니다.
        </Text>
      </ModalBody>
      <ModalFooter className={styles.modalFooter}>
        <Button color="secondary" size="lg" onClick={toggle}>
          취소
        </Button>
        <Button color="danger" size="lg">
          삭제
        </Button>
      </ModalFooter>
    </Modal>
  );
};
