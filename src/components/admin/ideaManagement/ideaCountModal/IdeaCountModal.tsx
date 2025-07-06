import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';

export default function IdeaCountModal({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading5" color="text-normal">
          아이디어 개수 설정
        </Text>
      </ModalHeader>
      <ModalBody>
        <Input bsSize="lg" placeholder="아이디어 개수" type="number" />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" onClick={toggle}>
          저장
        </Button>
      </ModalFooter>
    </Modal>
  );
}
