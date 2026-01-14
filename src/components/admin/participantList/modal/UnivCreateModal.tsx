import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text, toast } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import type { UnivFormPayload } from '../../../../types/admin/univ';
import UnivForm from '../form/UnivForm';
import { useCreateUnivMutation } from '@/hooks/mutations/admin/useUnivMutations';

interface UnivCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function UnivCreateModal({ isOpen, toggle }: UnivCreateModalProps) {
  const [form, setForm] = useState<UnivFormPayload>({
    name: '',
    instagram_url: '',
  });
  const { mutate: createUnivMutation } = useCreateUnivMutation();

  // 유니브 추가
  const handleCreateUniv = () => {
    createUnivMutation(
      { name: form.name, instagram_url: form.instagram_url },
      {
        onSuccess: () => {
          toast('유니브가 추가되었습니다.', {
            type: 'primary',
          });
          setForm({
            name: '',
            instagram_url: '',
          });
          toggle();
        },
        onError: (error: any) => {
          const message = error?.response?.data?.error?.message || '알 수 없는 오류가 발생했습니다.';
          toast(message, {
            type: 'danger',
          });
        },
      },
    );
  };

  const handleChange = (field: keyof UnivFormPayload, value: UnivFormPayload[keyof UnivFormPayload]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading5" as="h5">
          유니브 추가하기
        </Text>
      </ModalHeader>
      <ModalBody>
        <UnivForm mode="create" form={form} onChange={handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" onClick={handleCreateUniv}>
          추가
        </Button>
      </ModalFooter>
    </Modal>
  );
}
