import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './univCreateModal.module.scss';
import { useState } from 'react';
interface UnivCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const UnivCreateModal = ({ isOpen, toggle }: UnivCreateModalProps) => {
  const [form, setForm] = useState({
    name: '',
    link: '',
  });
  const hasChanged = form.name !== '' && form.link !== '';
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading5" as="h5">
          유니브 추가하기
        </Text>
      </ModalHeader>
      <ModalBody className={styles.modalBody}>
        <FormField label="유니브 명" required>
          <Input
            bsSize="lg"
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
            placeholder="유니브 명을 입력해주세요."
          />
        </FormField>
        <FormField label="소개 링크" required>
          <Input
            bsSize="lg"
            value={form.link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, link: e.target.value })}
            placeholder="소개 링크를 입력해주세요."
          />
        </FormField>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" disabled={!hasChanged}>
          추가
        </Button>
      </ModalFooter>
    </Modal>
  );
};
