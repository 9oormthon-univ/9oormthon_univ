import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter, toast } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import TeamForm from '../form/TeamForm';
import TeamInfoView from '../form/TeamInfoView';
import { fetchTeamDetailAPI, updateTeamAPI } from '../../../../api/admin/teams';
import { TeamBuildingStatus, TeamDetail, TeamUpdateForm } from '../../../../types/admin/team';

interface TeamUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  teamId: number;
  onUpdate: () => void;
}

export default function TeamUpdateModal({ isOpen, toggle, teamId, onUpdate }: TeamUpdateModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);
  const handleClose = () => {
    setIsEditMode(false); // 모달 닫힐 때 편집모드 해제
    toggle();
  };

  const [teamDetail, setTeamDetail] = useState<TeamDetail | null>(null);
  const [formData, setFormData] = useState<TeamUpdateForm | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchTeamDetail = async () => {
        try {
          const res = await fetchTeamDetailAPI(teamId);
          const { leader, ...rest } = res.data;
          setTeamDetail(res.data);
          setFormData({
            ...rest,
            leader_id: leader?.id || undefined,
            status: res.data.team_building ?? TeamBuildingStatus.RECRUITING,
          }); // 수정
        } catch (error) {
          console.error(error);
        }
      };
      fetchTeamDetail();
    }
  }, [isOpen, teamId]);

  // 팀 정보 수정
  const handleUpdateTeam = async () => {
    try {
      const res = await updateTeamAPI(teamId, formData as TeamUpdateForm);
      if (res.success) {
        toast('성공적으로 팀 정보를 수정하였습니다.', {
          type: 'primary',
        });
        onUpdate();
        handleClose();
      } else {
        toast(res.error.message || '팀 정보 수정에 실패했습니다.', {
          type: 'danger',
        });
      }
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '알 수 없는 오류가 발생했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
  };

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
          <TeamForm
            mode="update"
            onValidationChange={() => {}}
            onFormChange={(data) => setFormData(data as TeamUpdateForm)}
            initialData={{
              number: teamDetail?.number ?? 0,
              team_name: teamDetail?.team_name ?? '',
              service_name: teamDetail?.service_name ?? '',
              leader_id: teamDetail?.leader?.id ?? undefined,
              pm_capacity: teamDetail?.pm_capacity ?? 0,
              pd_capacity: teamDetail?.pd_capacity ?? 0,
              fe_capacity: teamDetail?.fe_capacity ?? 0,
              be_capacity: teamDetail?.be_capacity ?? 0,
              status: teamDetail?.status ?? TeamBuildingStatus.RECRUITING,
            }}
            teamId={teamId}
          />
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
            <Button size="lg" color="primary" onClick={handleUpdateTeam}>
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
