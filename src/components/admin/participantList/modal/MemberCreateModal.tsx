import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter, toast } from '@goorm-dev/vapor-components';

import MemberForm from '../form/MemberForm';
import { createUserAPI } from '../../../../api/admin/users';
import { UserForm } from '../../../../types/admin/member';
import { useState } from 'react';
interface MemberCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
  onUpdate: () => void;
}

export const MemberCreateModal = ({ isOpen, toggle, onUpdate }: MemberCreateModalProps) => {
  const [formData, setFormData] = useState<UserForm>({
    name: '',
    univ_id: 0,
    email: '',
    phone_number: '',
    generations: [],
  });

  // 인원 추가
  const handleCreateMember = async () => {
    try {
      await createUserAPI(formData);
      onUpdate();
      toggle();
      toast('인원이 추가되었습니다.', {
        type: 'primary',
      });
      // 인원 추가 후 폼 초기화
      setFormData({
        name: '',
        univ_id: 0,
        email: '',
        phone_number: '',
        generations: [],
      });
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '알 수 없는 오류가 발생했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
  };

  const handleChange = (field: keyof UserForm, value: UserForm[keyof UserForm]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          인원 추가하기
        </Text>
      </ModalHeader>
      <ModalBody>
        <MemberForm showProfileEdit={false} member={formData} onChange={handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" onClick={handleCreateMember}>
          추가
        </Button>
      </ModalFooter>
    </Modal>
  );
};
