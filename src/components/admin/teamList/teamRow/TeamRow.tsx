import { DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Text, Button } from '@goorm-dev/vapor-components';
import styles from './teamRow.module.scss';
import { ChevronRightOutlineIcon, MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InformationModal from '../../../common/modal/InformationModal';
import TeamUpdateModal from '../modal/TeamUpdateModal';

export const TeamRow = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const navigate = useNavigate();

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
    <tr>
      <td className={styles.teamName}>
        <Text typography="body2" color="text-normal">
          1팀
        </Text>
        <Dropdown direction="down" className={styles.memberDropdown} isOpen={isDropdownOpen} toggle={toggleDropdown}>
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
                해체
              </Text>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
      <td>
        <Text typography="body2" color="text-normal">
          온정
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-normal">
          선행의 선순환이 시작되는 곳, 온정
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-normal">
          6명
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-normal">
          완료
        </Text>
      </td>
      <td>
        {/* TODO : 팀 id 제공 */}
        <Button
          size="sm"
          color="secondary"
          icon={ChevronRightOutlineIcon}
          iconSide="right"
          onClick={() => navigate(`/admin/teamList/1`)}>
          팀원 관리
        </Button>
      </td>

      <InformationModal
        isOpen={isDeleteModalOpen}
        toggle={toggleDeleteModal}
        title="해당 팀을 해체시키시겠어요?"
        description={
          <>
            <Text typography="body2" color="text-normal" as="p">
              온정을 팀 리스트에서 삭제합니다.
            </Text>
            <Text typography="body2" color="text-normal" as="p">
              팀 해체가 완료되면 데이터를 되돌릴 수 없습니다.
            </Text>
          </>
        }
        confirmLabel="팀 해체"
        cancelLabel="취소"
        onConfirm={() => {}}
      />
      <TeamUpdateModal isOpen={isUpdateModalOpen} toggle={toggleUpdateModal} />
    </tr>
  );
};
