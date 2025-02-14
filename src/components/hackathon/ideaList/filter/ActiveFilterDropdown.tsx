import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './styles.module.scss';

interface ActiveFilterDropdownProps {
  options: { label: string; value: boolean | undefined }[];
  selectedValue: boolean | undefined;
  onChange: (value: boolean | undefined) => void;
  disabled?: boolean;
}

export default function ActiveFilterDropdown({
  options,
  selectedValue,
  onChange,
  disabled = false,
}: ActiveFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => !disabled && setIsOpen(!isOpen);

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || '전체';

  return (
    <Dropdown direction="down" size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
      <DropdownToggle caret color="select" className={styles.dropdown} disabled={disabled}>
        <Text typography="body2" fontWeight="medium" className={styles.textSelect}>
          {selectedLabel}
        </Text>
      </DropdownToggle>
      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem key={option.label} onClick={() => onChange(option.value)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
