import { ModalBody, ModalHeader, Text, ModalFooter, Button, Modal, toast } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import { fetchUnivDetailAPI, updateUnivAPI } from '../../../../api/admin/univs';
import UnivForm from '../form/UnivForm';
import type { UnivFormPayload } from '../../../../types/admin/univ';

interface UnivUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  univId: number | null;
  onSuccess: () => void;
}

export default function UnivUpdateModal({ isOpen, toggle, univId, onSuccess }: UnivUpdateModalProps) {
  const [form, setForm] = useState<UnivFormPayload>({
    name: '',
    instagram_url: '',
    leader_id: undefined,
  });

  // 상세 조회
  const fetchUnivInfo = async () => {
    if (!univId) return;
    try {
      const res = await fetchUnivDetailAPI(univId);
      setForm({
        name: res.data.name,
        instagram_url: res.data.instagram_url,
        leader_id: res.data.leader.id || undefined,
      });
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '알 수 없는 오류가 발생했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    if (univId && isOpen) {
      fetchUnivInfo();
    }
  }, [isOpen, univId]);

  // 유니브 정보 수정
  const handleUpdateUniv = async () => {
    try {
      if (!univId) return;
      await updateUnivAPI(univId, form.name, form.instagram_url, form.leader_id || undefined);
      onSuccess();
      toggle();
      toast('유니브 정보가 수정되었습니다.', {
        type: 'primary',
      });
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '알 수 없는 오류가 발생했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
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
