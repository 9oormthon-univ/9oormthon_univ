import { Modal, ModalBody, Text, Button, ModalFooter, toast } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { WarningIcon, CheckCircleIcon } from '@goorm-dev/vapor-icons';
import { acceptApply, rejectApply } from '../../../../api/users';

interface ApplyDecisionModalProps {
  id: number;
  isOpen: boolean;
  toggle: () => void;
  name: string;
  decision: 'accept' | 'reject';
  refetchApplyStatus: () => Promise<void>;
  refetchCurrentPhaseApplyStatus?: () => Promise<void>;
}

export default function ApplyDecisionModal({
  id,
  isOpen,
  toggle,
  name,
  decision,
  refetchApplyStatus,
  refetchCurrentPhaseApplyStatus = () => Promise.resolve(),
}: ApplyDecisionModalProps) {
  const handleDecision = async (decision: 'accept' | 'reject') => {
    if (decision === 'accept') {
      try {
        await acceptApply(id);
        await refetchApplyStatus();
        if (refetchCurrentPhaseApplyStatus) {
          await refetchCurrentPhaseApplyStatus();
        }
        toggle();
        toast('지원을 수락했습니다.', { type: 'primary' });
      } catch (error) {
        toggle();
        toast('지원 수락에 실패했습니다. 조건을 확인해주세요.', { type: 'danger' });
        console.error('Error accepting apply:', error);
      }
    } else {
      try {
        await rejectApply(id);
        await refetchApplyStatus();
        if (refetchCurrentPhaseApplyStatus) {
          await refetchCurrentPhaseApplyStatus();
        }
        toggle();
        toast('지원을 거절했습니다.', { type: 'primary' });
      } catch (error) {
        console.error('Error rejecting apply:', error);
      }
    }
  };

  return (
    <Modal type="center" isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <div className={styles.modalDecisionBody}>
          {decision === 'accept' ? (
            <CheckCircleIcon className={styles.checkIcon} />
          ) : (
            <WarningIcon className={styles.warningIcon} />
          )}
          <div className={styles.modalText}>
            <Text as="h5" typography="heading5" color="text-normal">
              {name}님의 지원을 {decision === 'accept' ? '수락' : '거절'}하시겠어요?
            </Text>
            <Text as="p" typography="body2" color="text-normal">
              한 번 결정하면 다시 되돌리지 못해요.
            </Text>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={styles.modalFooter}>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color={decision === 'accept' ? 'success' : 'danger'} onClick={() => handleDecision(decision)}>
          {decision === 'accept' ? '수락' : '거절'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
