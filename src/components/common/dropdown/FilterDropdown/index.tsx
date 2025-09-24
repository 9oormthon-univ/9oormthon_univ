// src/components/common/dropdown/FilterDropdown/index.tsx
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './style.module.scss';

interface FilterDropdownProps {
  options: { label: string; value: number | boolean | undefined }[];
  selectedValue: number | boolean | undefined;
  onChange: (value: number | boolean | undefined) => void;
  disabled?: boolean;
}

export default function FilterDropdown({ options, selectedValue, onChange, disabled = false }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => !disabled && setIsOpen(!isOpen);

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label;

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
