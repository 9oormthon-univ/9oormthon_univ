import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text, toast } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import MemberInfoView from '../../participantList/form/MemberInfoView';
import { fetchUserDetailAPI } from '../../../../api/admin/users';
import { GENERATION } from '../../../../constants/common';
import { Member } from '../../../../types/admin/member';
import { updateTeamMemberPartAPI } from '../../../../api/admin/teams';
import { Position } from '../../../../constants/position';

interface TeamMemberUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  memberUserId: number;
  memberId: number;
}

export default function TeamMemberUpdateModal({ isOpen, toggle, memberUserId, memberId }: TeamMemberUpdateModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);
  const [memberDetail, setMemberDetail] = useState<Member | null>(null);
  const [handleRoleChange, setHandleRoleChange] = useState<Position | null>(memberDetail?.role || null);

  // 팀원 상세 정보 조회
  useEffect(() => {
    const fetchMemberDetail = async () => {
      const res = await fetchUserDetailAPI(memberUserId, GENERATION);
      setMemberDetail(res.data);
    };
    fetchMemberDetail();
  }, [memberUserId]);

  // 팀원 지원파트 수정
  const handleUpdateTeamMemberPart = async () => {
    const res = await updateTeamMemberPartAPI(memberId, handleRoleChange || memberDetail?.role || Position.PM);
    if (res.success) {
      toast('지원파트가 수정되었습니다', {
        type: 'primary',
      });
      handleToggleEdit();
      toggle();
    } else {
      toast(res.error.message || '지원파트 수정에 실패했습니다', {
        type: 'danger',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          {isEditMode ? '팀원 파트 수정' : '팀원 정보'}
        </Text>
      </ModalHeader>
      <ModalBody>
        {isEditMode ? (
          <MemberInfoView
            isTeamInform={true}
            isPartEditMode={true}
            member={memberDetail}
            onRoleChange={setHandleRoleChange}
          />
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
            <Button size="lg" color="primary" onClick={handleUpdateTeamMemberPart}>
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
