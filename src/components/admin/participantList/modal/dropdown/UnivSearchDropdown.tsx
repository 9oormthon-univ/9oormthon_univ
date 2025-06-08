import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Text } from '@goorm-dev/vapor-components';
import { SearchOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import styles from './dropdown.module.scss';
import { Univ } from '../../../../../types/admin/univ';

interface UnivSearchDropdownProps {
  value?: string;
  onChange?: (univ: Univ) => void;
  univList: Univ[];
}

export default function UnivSearchDropdown({ value, onChange, univList }: UnivSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = univList.filter((univ) => univ.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelect = (univ: Univ) => {
    setSearchQuery('');
    setIsOpen(false);
    onChange?.(univ);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={toggle} className={styles.dropdown} size="lg">
      <DropdownToggle color="select" caret size="lg" className="w-full">
        <Text typography="body2" as="p" color="text-hint">
          {value || '대학교를 선택해주세요'}
        </Text>
      </DropdownToggle>
      <DropdownMenu className={styles.dropdownMenu}>
        <div style={{ padding: '0.5rem 1rem' }}>
          <Input
            size="md"
            placeholder="학교명을 입력해 주세요"
            icon={SearchOutlineIcon}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredList.map((univ) => (
          <DropdownItem key={univ.id} onClick={() => handleSelect(univ)}>
            {univ.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
