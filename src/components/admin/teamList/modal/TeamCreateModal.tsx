import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import TeamForm from '../form/TeamForm';
import { useState } from 'react';

interface TeamCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function TeamCreateModal({ isOpen, toggle }: TeamCreateModalProps) {
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          팀 추가하기
        </Text>
      </ModalHeader>
      <ModalBody>
        <TeamForm onValidationChange={setIsFormValid} />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" disabled={!isFormValid}>
          팀 추가하기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
