import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter } from '@goorm-dev/vapor-components';

import MemberForm from '../form/MemberForm';
interface MemberCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const MemberCreateModal = ({ isOpen, toggle }: MemberCreateModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          인원 추가하기
        </Text>
      </ModalHeader>
      <ModalBody>
        <MemberForm showProfileEdit={false} />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" >
          추가
        </Button>
      </ModalFooter>
    </Modal>
  );
};
