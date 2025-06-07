import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text, toast } from '@goorm-dev/vapor-components';
import TeamForm from '../form/TeamForm';
import { useState } from 'react';
import { createTeamAPI } from '../../../../api/admin/teams';
import { GENERATION } from '../../../../constants/common';
import { Team } from '../../../../types/admin/team';

interface TeamCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
  onUpdate: () => void;
}

export default function TeamCreateModal({ isOpen, toggle, onUpdate }: TeamCreateModalProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<Team>({
    name: '',
    pm_capacity: 0,
    pd_capacity: 0,
    fe_capacity: 0,
    be_capacity: 0,
  });

  const handleCreateTeam = async () => {
    const teamData = {
      generation: GENERATION,
      ...formData,
    };
    const res = await createTeamAPI(teamData);
    if (res.success) {
      toggle();
      toast('성공적으로 팀을 생성하였습니다.', {
        type: 'primary',
      });
      onUpdate();
    } else {
      toast(res.error.message || '팀 생성에 실패했습니다.', {
        type: 'danger',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          팀 추가하기
        </Text>
      </ModalHeader>
      <ModalBody>
        <TeamForm
          mode="create"
          onValidationChange={setIsFormValid}
          onFormChange={(data) => setFormData(data as Team)}
        />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" disabled={!isFormValid} onClick={handleCreateTeam}>
          팀 추가하기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
