import { DropdownItem, Dropdown, DropdownMenu, Text, DropdownToggle, Button, toast } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { MoreCommonOutlineIcon, ChevronRightOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import InformationModal from '../../../common/modal/InformationModal';
import { MemberUpdateModal } from '../modal/MemberUpdateModal';
import { UserSummary } from '../../../../types/admin/user';
import { PasswordResetModal } from '../modal/PasswordResetModal';
import { useDeleteUser, useResetPassword } from '@/hooks/queries/admin/useParticipant';

interface MemberRowProps {
  member: UserSummary;
}

export const MemberRow = ({ member }: MemberRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isResetPasswordConfirmModalOpen, setIsResetPasswordConfirmModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  const deleteUserMutation = useDeleteUser();
  const resetPasswordMutation = useResetPassword();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleInformationModal = () => setIsInformationModalOpen((prev) => !prev);
  const toggleUpdateModal = () => setIsUpdateModalOpen((prev) => !prev);
  const toggleResetPasswordModal = () => setIsResetPasswordModalOpen((prev) => !prev);
  const toggleResetPasswordConfirmModal = () => setIsResetPasswordConfirmModalOpen((prev) => !prev);

  // 미르미 삭제
  const handleDeleteMember = async () => {
    try {
      await deleteUserMutation.mutateAsync(member.id);
      toast('미르미를 삭제했습니다.', {
        type: 'primary',
      });
      toggleInformationModal();
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '삭제에 실패했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
  };

  // 비밀번호 초기화
  const handleResetPassword = async () => {
    try {
      const response = await resetPasswordMutation.mutateAsync(member.id);
      setPassword(response.data.new_password);
      toggleResetPasswordModal(); // 기존 모달 닫고
      toggleResetPasswordConfirmModal(); // 새로운 모달 열기
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '비밀번호 초기화에 실패했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
  };

  return (
    <>
      <tr>
        <td className={styles.memberName}>
          <Text typography="subtitle1" color="text-normal" className={styles.memberNameText}>
            {member.name}
          </Text>
          <Dropdown direction="down" className={styles.memberDropdown} isOpen={isDropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle size="sm" color="secondary" className={styles.memberDropdownToggle}>
              <MoreCommonOutlineIcon className={styles.memberDropdownIcon} />
            </DropdownToggle>
            <DropdownMenu className={styles.memberDropdownMenu}>
              <DropdownItem onClick={toggleUpdateModal}>
                <Text typography="body2" as="p" color="text-normal">
                  정보 보기
                </Text>
              </DropdownItem>
              <DropdownItem onClick={toggleResetPasswordModal}>
                <Text typography="body2" as="p" color="text-normal">
                  비번 초기화
                </Text>
              </DropdownItem>
              <DropdownItem onClick={toggleInformationModal}>
                <Text typography="body2" as="p" color="text-danger">
                  퇴장
                </Text>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
        <td>
          <Text typography="subtitle1" color="text-normal" className={styles.text}>
            {member.email}
          </Text>
        </td>
        <td>
          <Text typography="subtitle1" color={member.team_building ? 'text-success' : 'text-danger'}>
            {member.team_building ? '완료' : '미완료'}
          </Text>
        </td>
        <td>
          <Button size="sm" color="secondary" onClick={toggleUpdateModal}>
            정보 보기
            <ChevronRightOutlineIcon className={styles.memberDropdownIcon} />
          </Button>
        </td>
      </tr>

      <InformationModal
        isOpen={isInformationModalOpen}
        toggle={toggleInformationModal}
        title="해당 미르미를 퇴장시키겠어요?"
        description={
          <>
            <Text typography="body2" color="text-normal" as="p">
              {member.name}을 미르미 리스트에서 삭제합니다.
            </Text>
            <Text typography="body2" color="text-normal" as="p">
              미르미 퇴장이 완료되면 데이터를 되돌릴 수 없습니다.
            </Text>
          </>
        }
        confirmLabel="퇴장"
        onConfirm={handleDeleteMember}
      />

      <InformationModal
        isOpen={isResetPasswordModalOpen}
        toggle={toggleResetPasswordModal}
        title="비밀번호를 초기화시키겠어요?"
        description={
          <>
            <Text typography="body2" color="text-normal" as="p">
              {member.name}의 비밀번호를 초기화합니다.
            </Text>
            <Text typography="body2" color="text-normal" as="p">
              초기화 작업이 완료되면 데이터를 되돌릴 수 없습니다.
            </Text>
          </>
        }
        confirmLabel="초기화"
        onConfirm={handleResetPassword}
      />

      <PasswordResetModal
        isOpen={isResetPasswordConfirmModalOpen}
        toggle={toggleResetPasswordConfirmModal}
        password={password}
      />

      <MemberUpdateModal user_id={member.id} isOpen={isUpdateModalOpen} toggle={toggleUpdateModal} />
    </>
  );
};
