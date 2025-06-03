import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import MemberInfoView from '../../participantList/form/MemberInfoView';

interface TeamMemberUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function TeamMemberUpdateModal({ isOpen, toggle }: TeamMemberUpdateModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          {isEditMode ? '팀원 파트 수정' : '팀원 정보'}
        </Text>
      </ModalHeader>
      <ModalBody>
        {isEditMode ? (
          <MemberInfoView isTeamInform={true} isPartEditMode={true} />
        ) : (
          <MemberInfoView isTeamInform={true} />
        )}
      </ModalBody>
      <ModalFooter>
        {isEditMode ? (
          <>
            <Button size="lg" color="secondary" onClick={toggle}>
              취소
            </Button>
            <Button size="lg" color="primary" onClick={handleToggleEdit}>
              수정 완료
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" color="secondary" onClick={handleToggleEdit}>
              파트 수정
            </Button>
            <Button size="lg" color="primary" onClick={toggle}>
              닫기
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}
