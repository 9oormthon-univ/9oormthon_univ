import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './styles.module.scss';

interface SubjectFilterDropdownProps {
  options: { id: number; name: string }[];
  selectedValue: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function SubjectFilterDropdown({
  options,
  selectedValue,
  onChange,
  disabled = false,
}: SubjectFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => !disabled && setIsOpen(!isOpen);

  // 현재 선택된 주제의 이름 찾기 (id로 매칭)
  const selectedTopicName = options.find((topic) => topic.id === selectedValue)?.name || '전체';

  return (
    <Dropdown direction="down" size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
      <DropdownToggle caret color="select" className={styles.dropdown} disabled={disabled}>
        <Text typography="body2" fontWeight="medium" className={styles.textSelect}>
          {selectedTopicName}
        </Text>
      </DropdownToggle>
      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem key={option.id} onClick={() => onChange(option.id)}>
            {option.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
