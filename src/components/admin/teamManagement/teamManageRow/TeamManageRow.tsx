import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Text } from '@goorm-dev/vapor-components';
import { MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './teamManageRow.module.scss';
import { useState } from 'react';
import InformationModal from '../../../common/modal/InformationModal';

export default function TeamManageRow() {
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const toggleMemberDropdown = () => setIsMemberDropdownOpen((prev) => !prev);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <>
      <tr>
        <td className={styles.nameCell}>
          <Text typography="body2" color="text-normal" className={styles.name}>
            김구름
          </Text>
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
                <Text typography="body2" as="p" color="text-normal">
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
            프론트엔드
          </Badge>
        </td>
        <td>
          <Text typography="body2" color="text-normal" className={styles.univName}>
            구름대학교
          </Text>
        </td>
        <td>
          <Text typography="body2" color="text-normal" className={styles.email}>
            univ1234@gmail.com
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
              김구름을 팀원 리스트에서 삭제합니다.
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
    </>
  );
}
