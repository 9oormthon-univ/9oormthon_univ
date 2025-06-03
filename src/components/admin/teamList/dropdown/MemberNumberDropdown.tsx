import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './memberNumberDropdown.module.scss';

interface MemberNumberDropdownProps {
  value: number | null;
  onChange: (value: number) => void;
  maxValue?: number;
}

export const MemberNumberDropdown = ({ value, onChange, maxValue = 2 }: MemberNumberDropdownProps) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const toggleRoleDropdown = () => setIsRoleDropdownOpen((prev) => !prev);

  const placeholder = '인원을 선택해 주세요';

  return (
    <Dropdown direction="down" size="lg" isOpen={isRoleDropdownOpen} toggle={toggleRoleDropdown}>
      <DropdownToggle caret color="select" className={styles.roleDropdownToggle}>
        <Text typography="body2" fontWeight="medium" color="text-hint">
          {value !== null ? `${value}명` : placeholder}
        </Text>
      </DropdownToggle>
      <DropdownMenu className={styles.roleDropdownMenu}>
        {Array.from({ length: maxValue }, (_, index) => (
          <DropdownItem key={index} onClick={() => onChange(index)}>
            <Text typography="body2" fontWeight="medium" color="text-normal">
              {index}명
            </Text>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
