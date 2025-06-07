import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import MemberInfoView from '../../participantList/form/MemberInfoView';
import { fetchUserDetailAPI } from '../../../../api/admin/users';
import { GENERATION } from '../../../../constants/common';
import { Member } from '../../../../types/admin/member';

interface TeamMemberUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  memberId: number;
}

export default function TeamMemberUpdateModal({ isOpen, toggle, memberId }: TeamMemberUpdateModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);
  const [memberDetail, setMemberDetail] = useState<Member | null>(null);

  // 팀원 상세 정보 조회
  useEffect(() => {
    const fetchMemberDetail = async () => {
      const res = await fetchUserDetailAPI(memberId, GENERATION);
      setMemberDetail(res.data);
    };
    fetchMemberDetail();
  }, [memberId]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          {isEditMode ? '팀원 파트 수정' : '팀원 정보'}
        </Text>
      </ModalHeader>
      <ModalBody>
        {isEditMode ? (
          <MemberInfoView isTeamInform={true} isPartEditMode={true} member={memberDetail} />
        ) : (
          <MemberInfoView isTeamInform={true} member={memberDetail} />
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
