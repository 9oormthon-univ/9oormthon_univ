import { DropdownItem, Dropdown, DropdownMenu, Text, DropdownToggle, Button } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { MoreCommonOutlineIcon, ChevronRightOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';

export const MemberRow = ({ member }: { member: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleRoleDropdown = () => setIsRoleOpen((prev) => !prev);

  return (
    <tr>
      <td className={styles.memberName}>
        <Text typography="subtitle1" color="text-normal">
          {member.name}
        </Text>
        <Dropdown direction="down" className={styles.memberDropdown} isOpen={isOpen} toggle={toggleDropdown}>
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
                퇴장
              </Text>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
      <td style={{ width: '7.5rem' }}>
        <Dropdown isOpen={isRoleOpen} toggle={toggleRoleDropdown} direction="down" size="sm">
          <DropdownToggle color="secondary" outline caret>
            {member.role}
          </DropdownToggle>
          <DropdownMenu right className={styles.memberRoleDropdownMenu}>
            <DropdownItem>참가자</DropdownItem>
            <DropdownItem>중앙운영단</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
      <td>
        <Text typography="subtitle1" color="text-normal">
          {member.email}
        </Text>
      </td>
      <td>
        <Text typography="subtitle1" color={member.teamBuilding ? 'text-success' : 'text-danger'}>
          {member.teamBuilding ? '완료' : '미완료'}
        </Text>
      </td>
      <td>
        <Button size="sm" color="secondary">
          정보 보기
          <ChevronRightOutlineIcon className={styles.memberDropdownIcon} />
        </Button>
      </td>
    </tr>
  );
};
