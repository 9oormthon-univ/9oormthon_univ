import { DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Text, Button } from '@goorm-dev/vapor-components';
import styles from './teamRow.module.scss';
import { ChevronRightOutlineIcon, MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TeamRow = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const navigate = useNavigate();

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
              <Text typography="body2" as="p" color="text-normal">
                정보 보기
              </Text>
            </DropdownItem>
            <DropdownItem>
              <Text typography="body2" as="p" color="text-danger">
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
    </tr>
  );
};
