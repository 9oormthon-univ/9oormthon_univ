import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter } from '@goorm-dev/vapor-components';
import MemberForm from '../form/MemberForm';
import { useEffect, useState } from 'react';
import MemberInfoView from '../form/MemberInfoView';
import { GENERATION } from '../../../../constants/common';
import { fetchUserDetailAPI, updateUserAPI } from '../../../../api/admin/users';
import { MemberUpdateForm } from '../../../../types/admin/member';

interface MemberUpdateModalProps {
  user_id: number;
  isOpen: boolean;
  toggle: () => void;
}

export const MemberUpdateModal = ({ user_id, isOpen, toggle }: MemberUpdateModalProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => setIsEditMode((prev) => !prev);
  const handleClose = () => {
    setIsEditMode(false); // 모달 닫힐 때 편집모드 해제
    toggle();
  };

  const [member, setMember] = useState<any | null>(null);

  const [formData, setFormData] = useState<MemberUpdateForm>({
    name: member?.name ?? '',
    univ_id: member?.univ?.id ?? 0,
    email: member?.email ?? '',
    phone_number: member?.phone_number ?? '',
    generations: member?.generations ?? [],
  });

  const handleChange = (field: keyof MemberUpdateForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 미르미 정보 상세 조회
  const fetchUserDetail = async (user_id: number) => {
    const res = await fetchUserDetailAPI(user_id, GENERATION);
    setMember(res.data);
  };

  useEffect(() => {
    fetchUserDetail(user_id);
  }, [user_id]);

  // 미르미 정보 수정
  const handleUpdateMember = async () => {
    try {
      const res = await updateUserAPI(
        user_id,
        formData.univ_id,
        formData.name,
        formData.email,
        formData.phone_number,
        formData.generations,
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
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
          <MemberForm showProfileEdit={true} member={member} onChange={handleChange} />
        ) : (
          <MemberInfoView member={member} />
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
