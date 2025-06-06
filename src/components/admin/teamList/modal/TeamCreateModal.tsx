import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import TeamForm from '../form/TeamForm';
import { useState } from 'react';
import { createTeamAPI } from '../../../../api/admin/teams';
import { GENERATION } from '../../../../constants/common';
import { Team } from '../../../../types/admin/team';

interface TeamCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function TeamCreateModal({ isOpen, toggle }: TeamCreateModalProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<Team>({
    name: '',
    pm_capacity: 0,
    pd_capacity: 0,
    fe_capacity: 0,
    be_capacity: 0,
  });

  const handleCreateTeam = async () => {
    try {
      const teamData = {
        generation: GENERATION,
        ...formData,
      };
      await createTeamAPI(teamData);
      toggle();
    } catch (error) {
      console.error('팀 생성 실패:', error);
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
