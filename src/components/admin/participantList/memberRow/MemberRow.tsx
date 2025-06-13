import { DropdownItem, Dropdown, DropdownMenu, Text, DropdownToggle, Button, toast } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { MoreCommonOutlineIcon, ChevronRightOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import InformationModal from '../../../common/modal/InformationModal';
import { MemberUpdateModal } from '../modal/MemberUpdateModal';
import { deleteUserAPI } from '../../../../api/admin/users';
import { UserOverview } from '../../../../types/admin/user';

interface MemberRowProps {
  member: UserOverview;
  onUpdate: () => void;
}

export const MemberRow = ({ member, onUpdate }: MemberRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleInformationModal = () => setIsInformationModalOpen((prev) => !prev);
  const toggleUpdateModal = () => setIsUpdateModalOpen((prev) => !prev);

  const handleDeleteMember = async () => {
    await deleteUserAPI(member.id);
    onUpdate();
    toast('미르미를 삭제했습니다.', {
      type: 'primary',
    });
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

      <MemberUpdateModal
        user_id={member.id}
        isOpen={isUpdateModalOpen}
        toggle={toggleUpdateModal}
        onUpdate={onUpdate}
      />
    </>
  );
};
