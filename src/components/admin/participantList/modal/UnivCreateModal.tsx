import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './univCreateModal.module.scss';
import { useState } from 'react';
import { GENERATION } from '../../../../constants/common';
import { createUnivAPI } from '../../../../api/admin';
interface UnivCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSuccess: () => void;
}

export default function UnivCreateModal({ isOpen, toggle, onSuccess }: UnivCreateModalProps) {
  const [form, setForm] = useState({
    name: '',
    instagram_url: '',
    generation: GENERATION,
  });
  const hasChanged = form.name !== '' && form.instagram_url !== '';

  // API 연결 - 유니브 생성
  const handleCreateUniv = async () => {
    try {
      const res = await createUnivAPI(form.name, form.instagram_url, form.generation);
      console.log(res);
      onSuccess();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

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
            value={form.instagram_url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, instagram_url: e.target.value })}
            placeholder="소개 링크를 입력해주세요."
          />
        </FormField>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" disabled={!hasChanged} onClick={handleCreateUniv}>
          추가
        </Button>
      </ModalFooter>
    </Modal>
  );
}
