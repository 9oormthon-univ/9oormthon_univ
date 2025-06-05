import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Text } from '@goorm-dev/vapor-components';
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './searchDropdown.module.scss';
import { SearchOutlineIcon, ErrorCircleIcon } from '@goorm-dev/vapor-icons';

interface SearchDropdownItem {
  id: number;
  description: string;
}

interface SearchDropdownProps {
  disabled?: boolean;
  inPlaceholder?: string;
  outPlaceholder?: string;
  items: SearchDropdownItem[];
  selectedItem?: SearchDropdownItem | null;
  onSelect?: (item: SearchDropdownItem) => void;
  onSearch?: (searchTerm: string) => void;
  generation?: number;
  univId?: number;
}

export default function SearchDropdown({
  disabled,
  inPlaceholder,
  outPlaceholder,
  items,
  selectedItem: controlledSelectedItem,
  onSelect,
  onSearch,
}: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // 내부적으로 선택된 아이템을 관리 (uncontrolled 지원)
  const [internalSelectedItem, setInternalSelectedItem] = useState<SearchDropdownItem | null>(null);

  // controlledSelectedItem이 바뀌면 내부 상태도 동기화
  useEffect(() => {
    if (controlledSelectedItem !== undefined) {
      setInternalSelectedItem(controlledSelectedItem);
    }
  }, [controlledSelectedItem]);

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

  // 디바운스된 검색 처리
  const debouncedSearch = useCallback(
    (value: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        onSearch?.(value);
      }, 500);
    },
    [onSearch],
  );

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // 검색어에 따른 필터링된 아이템 목록
  const filteredItems = items.filter((item) => item.description.toLowerCase().includes(searchTerm.toLowerCase()));

  // 아이템 선택 핸들러
  const handleItemSelect = (item: SearchDropdownItem) => {
    if (controlledSelectedItem === undefined) {
      setInternalSelectedItem(item);
    }
    onSelect?.(item);
    setIsOpen(false);
    setSearchTerm('');
  };

  // 실제로 표시할 선택된 아이템
  const selectedItemToShow = controlledSelectedItem !== undefined ? controlledSelectedItem : internalSelectedItem;

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Dropdown size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
      <DropdownToggle caret color="select" className={styles.dropdown}>
        {selectedItemToShow ? selectedItemToShow.description : outPlaceholder}
      </DropdownToggle>
      <DropdownMenu className={styles.dropdownMenu}>
        <div className={styles.searchInputContainer}>
          {searchTerm.length === 0 && <SearchOutlineIcon className={styles.searchIcon} />}
          <input
            ref={inputRef}
            type="text"
            placeholder={inPlaceholder}
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm.length > 0 && <ErrorCircleIcon className={styles.cancelIcon} onClick={handleClearInput} />}
        </div>

        <DropdownItem divider />
        <div className={styles.dropdownMenu}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <DropdownItem key={item.id} onClick={() => handleItemSelect(item)}>
                <Text typography="body2" as="p">
                  {item.description}
                </Text>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem disabled>
              <Text typography="body2" as="p">
                검색 결과가 없습니다
              </Text>
            </DropdownItem>
          )}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
