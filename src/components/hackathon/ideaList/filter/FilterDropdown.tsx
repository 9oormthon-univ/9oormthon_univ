import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './styles.module.scss';

interface FilterDropDownProps {
  options: string[]; // 필터 옵션
  selectedValue: string; // 현재 선택된 값
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function FilterDropdown({ options, selectedValue, onChange, disabled = false }: FilterDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => !disabled && setIsOpen(!isOpen);

  return (
    <Dropdown direction="down" size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
      <DropdownToggle caret color="select" className={styles.dropdown} disabled={disabled}>
        <Text typography="body2" fontWeight="medium" className={styles.textSelect}>
          {selectedValue || '전체'}
        </Text>
      </DropdownToggle>
      <DropdownMenu>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => onChange(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
