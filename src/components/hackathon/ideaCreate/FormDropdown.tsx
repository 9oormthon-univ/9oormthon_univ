import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  Text,
} from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './styles.module.scss';

interface FormDropdownProps {
  label: string; // 질문 네이밍
  nullable: boolean; // null 허용
  selectedValue: string;
  placeholder: string;
  options: { id: number; name: string }[]; // 옵션
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormDropdown({
  label,
  nullable,
  selectedValue,
  placeholder,
  options,
  onChange,
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <FormGroup>
      <Label className={styles.labelWrap}>
        <Text typography="subtitle2" color="text-alternative">
          {label}
        </Text>
        {!nullable && (
          <Text typography="body3" color="text-danger">
            *
          </Text>
        )}
      </Label>

      <Dropdown direction="down" size="lg" isOpen={isOpen} toggle={toggle}>
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
              }>
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </FormGroup>
  );
}
