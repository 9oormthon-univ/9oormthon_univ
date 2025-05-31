import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Text } from '@goorm-dev/vapor-components';
import { MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './teamManageRow.module.scss';
import { useState } from 'react';

export default function TeamManageRow() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <>
      <tr>
        <td className={styles.nameCell}>
          <Text typography="body2" color="text-normal" className={styles.name}>
            김구름
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
            기획자
          </Text>
        </td>
        <td>
          <Text typography="body2" color="text-normal">
            기획자
          </Text>
        </td>
        <td>
          <Text typography="body2" color="text-normal">
            기획자
          </Text>
        </td>
      </tr>
    </>
  );
}
