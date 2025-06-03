import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '@goorm-dev/vapor-components';
import { useEffect, useRef, useState } from 'react';
import styles from './searchDropdown.module.scss';
import { SearchOutlineIcon, ErrorCircleIcon } from '@goorm-dev/vapor-icons';

interface SearchDropdownProps {
  disabled?: boolean;
  inPlaceholder?: string;
  outPlaceholder?: string;
}

export default function SearchDropdown({ disabled, inPlaceholder, outPlaceholder }: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 드롭다운이 열리면 입력 필드로 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 입력 필드 초기화
  const handleClearInput = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Dropdown size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
      <DropdownToggle caret color="select" className={styles.dropdown}>
        {outPlaceholder}
      </DropdownToggle>
      <DropdownMenu className={styles.dropdownMenu}>
        {/* event오류로 직접 제작 */}
        <div className={styles.searchInputContainer}>
          {searchTerm.length === 0 && <SearchOutlineIcon className={styles.searchIcon} />}
          <input
            ref={inputRef}
            type="text"
            placeholder={inPlaceholder}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm.length > 0 && <ErrorCircleIcon className={styles.cancelIcon} onClick={handleClearInput} />}
        </div>

        <DropdownItem divider />
        <div className={styles.dropdownMenu}></div>
      </DropdownMenu>
    </Dropdown>
  );
}
