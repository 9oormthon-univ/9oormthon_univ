import { Modal, ModalBody, ModalHeader, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

import { getPositionName, PositionKey } from '../../../../constants/position';

interface ApplyReason {
  id: number;
  motivation: string;
  name: string;
  role: PositionKey; // 지원자의 포지션
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
      <ModalHeader toggle={toggle}>
        <Text as="h5" typography="heading5">
          지원 사유
        </Text>
      </ModalHeader>
      <ModalBody className={styles.modalReasonBody}>
        <Text as="p" typography="body2">
          {applyInfo.motivation}
        </Text>
        <Text as="span" typography="body3" color="text-alternative">
          {applyInfo.name} / {getPositionName(applyInfo.role)} / {applyInfo.univ}
        </Text>
      </ModalBody>
    </Modal>
  );
}
