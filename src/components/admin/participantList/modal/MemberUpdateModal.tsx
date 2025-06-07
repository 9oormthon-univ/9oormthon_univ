import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter, toast } from '@goorm-dev/vapor-components';
import MemberForm from '../form/MemberForm';
import { useEffect, useState } from 'react';
import MemberInfoView from '../form/MemberInfoView';
import { GENERATION } from '../../../../constants/common';
import { fetchUserDetailAPI, updateUserAPI } from '../../../../api/admin/users';
import { Member, UserForm } from '../../../../types/admin/member';

interface MemberUpdateModalProps {
  user_id: number;
  isOpen: boolean;
  toggle: () => void;
  onUpdate: () => void;
}

export const MemberUpdateModal = ({ user_id, isOpen, toggle, onUpdate }: MemberUpdateModalProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);
  const handleClose = () => {
    setIsEditMode(false); // 모달 닫힐 때 편집모드 해제
    setMember(null);
    toggle();
  };

  const [member, setMember] = useState<Member | null>(null);

  const [formData, setFormData] = useState<UserForm>({
    name: member?.name ?? '',
    univ_id: member?.univ?.id ?? 0,
    email: member?.email ?? '',
    phone_number: member?.phone_number ?? '',
    generations: member?.generations ?? [],
    img_url: member?.img_url ?? '',
  });

  const handleChange = <K extends keyof UserForm>(field: K, value: UserForm[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 미르미 정보 상세 조회
  const fetchUserDetail = async (user_id: number) => {
    const res = await fetchUserDetailAPI(user_id, GENERATION);
    setMember(res.data);
    setFormData({
      name: res.data.name,
      univ_id: res.data.univ_id,
      email: res.data.email,
      phone_number: res.data.phone_number,
      generations: res.data.generations,
      img_url: res.data.img_url ?? '',
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserDetail(user_id);
    }
  }, [user_id, isOpen]);

  // 미르미 정보 수정
  const handleUpdateMember = async () => {
    try {
      await updateUserAPI(
        user_id,
        formData.univ_id,
        formData.name,
        formData.email,
        formData.phone_number,
        formData.generations,
        formData.img_url,
      );
      handleClose();
      toast('미르미 정보가 수정되었습니다.', {
        type: 'primary',
      });
      onUpdate();
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '알 수 없는 오류가 발생했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          미르미 정보
        </Text>
      </ModalHeader>
      <ModalBody>
        {isEditMode ? (
          <MemberForm showProfileEdit={true} member={formData} onChange={handleChange} />
        ) : (
          <MemberInfoView member={member ?? undefined} />
        )}
      </ModalBody>
      <ModalFooter>
        {isEditMode ? (
          <>
            <Button size="lg" color="secondary" onClick={handleToggleEdit}>
              취소
            </Button>
            <Button size="lg" color="primary" onClick={handleUpdateMember}>
              수정 완료
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" color="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button size="lg" color="primary" onClick={handleToggleEdit}>
              정보 수정
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};
