import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Text } from '@goorm-dev/vapor-components';
import { MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './teamManageRow.module.scss';
import { useState } from 'react';
import InformationModal from '../../../common/modal/InformationModal';
import TeamMemberUpdateModal from '../modal/TeamMemberUpdateModal';
import { TeamMemberSummary } from '../../../../types/admin/team';
import { POSITION_NAME } from '../../../../constants/position';

interface TeamManageRowProps {
  member: TeamMemberSummary;
}

export default function TeamManageRow({ member }: TeamManageRowProps) {
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const toggleMemberDropdown = () => setIsMemberDropdownOpen((prev) => !prev);

  // 삭제 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  // 수정 모달
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const toggleUpdateModal = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };

  return (
    <>
      <tr>
        <td className={styles.nameCell}>
          <div className={styles.nameContainer}>
            <Text typography="body2" color="text-normal" className={styles.name}>
              {member.name}
            </Text>
            {member.is_leader && (
              <Badge pill size="sm" color="hint">
                팀장
              </Badge>
            )}
          </div>

          <Dropdown
            direction="down"
            className={styles.memberDropdown}
            isOpen={isMemberDropdownOpen}
            toggle={toggleMemberDropdown}>
            <DropdownToggle size="sm" color="secondary" className={styles.memberDropdownToggle}>
              <MoreCommonOutlineIcon className={styles.memberDropdownIcon} />
            </DropdownToggle>
            <DropdownMenu className={styles.memberDropdownMenu}>
              <DropdownItem>
                <Text typography="body2" as="p" color="text-normal" onClick={toggleUpdateModal}>
                  정보 보기
                </Text>
              </DropdownItem>
              <DropdownItem>
                <Text typography="body2" as="p" color="text-danger" onClick={toggleDeleteModal}>
                  팀에서 제외
                </Text>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
        <td className={styles.roleCell}>
          <Badge color="primary" size="md" pill>
            {POSITION_NAME[member.role]}
          </Badge>
        </td>
        <td>
          <Text typography="body2" color="text-normal" className={styles.univName}>
            {member.univ}
          </Text>
        </td>
        <td>
          <Text typography="body2" color="text-normal" className={styles.email}>
            {member.email}
          </Text>
        </td>
      </tr>

      <InformationModal
        isOpen={isDeleteModalOpen}
        toggle={toggleDeleteModal}
        title="해당 미르미를 팀에서 제외시키시겠어요?"
        description={
          <>
            <Text typography="body2" color="text-normal" as="p">
              {member.name}을 팀원 리스트에서 삭제합니다.
            </Text>
            <Text typography="body2" color="text-normal" as="p">
              미르미 제외가 완료되면 데이터를 되돌릴 수 없습니다.
            </Text>
          </>
        }
        confirmLabel="팀에서 제외"
        cancelLabel="취소"
        // TODO : 팀에서 제외 기능 추가
        onConfirm={() => {}}
      />
      <TeamMemberUpdateModal isOpen={isUpdateModalOpen} toggle={toggleUpdateModal} />
    </>
  );
}
