import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import TeamForm from '../form/TeamForm';
import TeamInfoView from '../form/TeamInfoView';
import { fetchTeamDetailAPI } from '../../../../api/admin/teams';
import { TeamDetail } from '../../../../types/admin/team';

interface TeamUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  teamId: number;
}

export default function TeamUpdateModal({ isOpen, toggle, teamId }: TeamUpdateModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);
  const handleClose = () => {
    setIsEditMode(false); // 모달 닫힐 때 편집모드 해제
    toggle();
  };
  const [teamDetail, setTeamDetail] = useState<TeamDetail | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchTeamDetail = async () => {
        try {
          const res = await fetchTeamDetailAPI(teamId);
          setTeamDetail(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTeamDetail();
    }
  }, [isOpen, teamId]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        {isEditMode ? (
          <Text typography="heading6" as="h6">
            팀 정보 수정
          </Text>
        ) : (
          <Text typography="heading6" as="h6">
            팀 정보
          </Text>
        )}
      </ModalHeader>
      <ModalBody>
        {isEditMode ? (
          <TeamForm mode="update" onValidationChange={() => {}} onFormChange={() => {}} />
        ) : (
          <TeamInfoView teamDetail={teamDetail} />
        )}
      </ModalBody>
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
            <Button size="lg" color="secondary" onClick={handleToggleEdit}>
              팀 정보 수정
            </Button>
            <Button size="lg" color="primary" onClick={handleClose}>
              닫기
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}
