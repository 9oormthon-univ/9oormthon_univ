import { ModalBody, ModalHeader, Text, ModalFooter, Button, Modal, toast } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import UnivForm from '../form/UnivForm';
import type { UnivFormPayload } from '@/types/admin/univ';
import { useUnivDetail } from '@/hooks/queries/admin/useUnivList';
import { useUpdateUnivMutation } from '@/hooks/mutations/admin/useUnivMutations';

interface UnivUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  univId: number | null;
}

export default function UnivUpdateModal({ isOpen, toggle, univId }: UnivUpdateModalProps) {
  const [form, setForm] = useState<UnivFormPayload>({
    name: '',
    instagram_url: '',
    leader_id: 0,
  });

  // 상세 조회
  const { data: univDetail } = useUnivDetail(univId as number);
  const { mutate: updateUnivMutation } = useUpdateUnivMutation();
  useEffect(() => {
    if (univDetail) {
      setForm({
        name: univDetail.name,
        instagram_url: univDetail.instagram_url,
        leader_id: univDetail.leader?.id || 0,
      });
    }
  }, [univDetail]);

  // 유니브 정보 수정
  const handleUpdateUniv = async () => {
    updateUnivMutation(
      {
        univ_id: univId as number,
        name: form.name,
        instagram_url: form.instagram_url,
        leader_id: form.leader_id as number,
      },
      {
        onSuccess: () => {
          toast('유니브 정보가 수정되었습니다.', {
            type: 'primary',
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

  // 유니브 정보 수정 시 폼 상태 업데이트
  const handleChange = (field: keyof UnivFormPayload, value: UnivFormPayload[keyof UnivFormPayload]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading5" as="p">
          유니브 정보 수정
        </Text>
      </ModalHeader>
      <ModalBody>
        <UnivForm mode="update" form={form} univId={univId} onChange={handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button
          size="lg"
          color="secondary"
          onClick={() => {
            toggle();
          }}>
          취소
        </Button>
        <Button size="lg" color="primary" onClick={handleUpdateUniv}>
          수정 완료
        </Button>
      </ModalFooter>
    </Modal>
  );
}
