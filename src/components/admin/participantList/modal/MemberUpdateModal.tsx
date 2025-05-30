import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter } from '@goorm-dev/vapor-components';
import MemberForm from '../form/MemberForm';
import { useState } from 'react';
import MemberInfoView from '../form/MemberInfoView';

interface MemberUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const MemberUpdateModal = ({ isOpen, toggle }: MemberUpdateModalProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);
  const handleClose = () => {
    setIsEditMode(false); // 모달 닫힐 때 편집모드 해제
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          미르미 정보
        </Text>
      </ModalHeader>
      <ModalBody>{isEditMode ? <MemberForm showProfileEdit={true} /> : <MemberInfoView />}</ModalBody>
      <ModalFooter>
        {isEditMode ? (
          <>
            <Button size="lg" color="secondary" onClick={handleToggleEdit}>
              취소
            </Button>
            <Button size="lg" color="primary" onClick={() => {}}>
              수정 완료
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" color="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button size="lg" color="primary" onClick={handleToggleEdit}>
              정보 수정
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};
