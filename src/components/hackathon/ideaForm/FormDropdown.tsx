import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './styles.module.scss';
import FormLabel from './FormLabel';

interface FormDropdownProps {
  label: string; // 질문 네이밍
  nullable: boolean; // null 허용
  selectedValue: string;
  placeholder: string;
  options: { id: number; name: string; disabled?: boolean }[]; // 옵션
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export default function FormDropdown({
  label,
  nullable,
  selectedValue,
  placeholder,
  options,
  onChange,
  disabled,
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <FormGroup>
      <FormLabel label={label} nullable={nullable} />
      <Dropdown direction="down" size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
        <DropdownToggle caret color="select" className={styles.dropdown}>
          <Text typography="body2" fontWeight="medium" color="text-hint">
            {selectedValue || placeholder}
          </Text>
        </DropdownToggle>
        <DropdownMenu className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={() =>
                onChange({ target: { value: option.id } } as unknown as React.ChangeEvent<HTMLSelectElement>)
              }
              disabled={option.disabled}>
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </FormGroup>
  );
}
