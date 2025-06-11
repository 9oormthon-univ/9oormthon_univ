import { DropdownItem, Dropdown, DropdownMenu, DropdownToggle, Text, Button } from '@goorm-dev/vapor-components';
import { OutOutlineIcon, MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './ideaManageRow.module.scss';
import { useState } from 'react';

export const IdeaManageRow = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <tr>
      <td className={styles.titleTextContainer}>
        <Text typography="body2" color="text-normal" className={styles.text}>
          아이디어 제목 아이디어 제목 아이디어 제목아이디어 제목
        </Text>
        <Dropdown direction="down" className={styles.memberDropdown} isOpen={isDropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle size="sm" color="secondary" className={styles.memberDropdownToggle}>
            <MoreCommonOutlineIcon className={styles.memberDropdownIcon} />
          </DropdownToggle>
          <DropdownMenu className={styles.memberDropdownMenu}>
            <DropdownItem>
              <Text typography="body2" as="p" color="text-normal">
                상세 보기
              </Text>
            </DropdownItem>
            <DropdownItem>
              <Text typography="body2" as="p" color="text-danger">
                삭제
              </Text>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
      <td className={styles.subjectContainer}>
        <Text typography="body2" color="text-normal" className={styles.text}>
          해커톤 주제 해커톤 주제해커톤 주제
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-normal" className={styles.text}>
          김구름
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-success" className={styles.text}>
          모집 중
        </Text>
      </td>
      <td>
        <Button type="button" size="sm" color="secondary" icon={OutOutlineIcon} iconSide="right">
          상세 보기
        </Button>
      </td>
    </tr>
  );
};
