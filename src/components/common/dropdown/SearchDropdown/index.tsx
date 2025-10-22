// src/components/common/dropdown/SearchDropdown/index.tsx

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Text,
  UncontrolledBadge,
} from '@goorm-dev/vapor-components';
import { ErrorCircleIcon, SearchOutlineIcon } from '@goorm-dev/vapor-icons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './style.module.scss';

export interface SearchSelectItem {
  id: string | number;
  label: string;
}

interface BaseProps {
  disabled?: boolean;
  inPlaceholder?: string;
  outPlaceholder?: string;
  items: SearchSelectItem[];
  onSearch?: (searchTerm: string) => void;
  className?: string;
}

interface SingleSelectProps extends BaseProps {
  multiple?: false;
  selectedId?: string | number | null;
  onChange?: (selectedId: string | number | null) => void;
}

interface MultipleSelectProps extends BaseProps {
  multiple: true;
  selectedIds: Array<string | number>;
  onChange: (selectedIds: Array<string | number>) => void;
  maxSelected?: number;
  renderSelectedMultiple?: (
    selectedItems: SearchSelectItem[],
    remove: (id: string | number) => void,
  ) => React.ReactNode;
}

type SearchSelectProps = SingleSelectProps | MultipleSelectProps;

const SearchDropdown: React.FC<SearchSelectProps> = (props) => {
  const { disabled, inPlaceholder, outPlaceholder, items, onSearch, className } = props;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClearInput = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [items, searchTerm]);

  const availableItems = useMemo(() => {
    if (props.multiple) {
      return filteredItems.filter((item) => !props.selectedIds.includes(item.id));
    }
    return props.selectedId == null ? filteredItems : filteredItems.filter((item) => item.id !== props.selectedId);
  }, [filteredItems, props]);

  const selectedItems = useMemo(() => {
    if (props.multiple) {
      return items.filter((i) => props.selectedIds.includes(i.id));
    } else {
      return props.selectedId == null ? [] : items.filter((i) => i.id === props.selectedId);
    }
  }, [items, props]);

  const handleSelectSingle = (itemId: string | number) => {
    if (!('multiple' in props) || props.multiple === false) {
      props.onChange?.(itemId);
      setIsOpen(false);
      toggle();
      setSearchTerm('');
    }
  };

  const handleSelectMultiple = (itemId: string | number) => {
    if (props.multiple) {
      const already = props.selectedIds.includes(itemId);
      if (already) {
        const next = props.selectedIds.filter((id) => id !== itemId);
        props.onChange(next);
      } else {
        if (props.maxSelected !== undefined && props.selectedIds.length >= props.maxSelected) {
          return;
        }
        const next = [...props.selectedIds, itemId];
        props.onChange(next);
      }
      setSearchTerm('');
    }
  };

  const removeFromMultiple = (id: string | number) => {
    if (props.multiple) {
      props.onChange(props.selectedIds.filter((sid) => sid !== id));
    }
  };

  const renderSelectedContent = () => {
    if (props.multiple) {
      if (selectedItems.length === 0) {
        return outPlaceholder;
      }
      if (props.renderSelectedMultiple) {
        return props.renderSelectedMultiple(selectedItems, removeFromMultiple);
      }
      return (
        <div className={styles.selectedItems}>
          {selectedItems.map((item) => (
            <UncontrolledBadge
              key={item.id}
              size="md"
              onClick={() => removeFromMultiple(item.id)}
              className={styles.badge}>
              {item.label}
            </UncontrolledBadge>
          ))}
        </div>
      );
    }
    return selectedItems[0]?.label ?? outPlaceholder;
  };

  return (
    <Dropdown size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
      <DropdownToggle caret color="select" className={`${styles.dropdown} ${className ?? ''}`}>
        {renderSelectedContent()}
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
        <div className={styles.itemMenu}>
          {availableItems.length > 0 ? (
            availableItems.map((item) => (
              <DropdownItem
                key={item.id}
                onClick={() => (props.multiple ? handleSelectMultiple(item.id) : handleSelectSingle(item.id))}>
                <Text typography="body2" as="p">
                  {item.label}
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
};

export default SearchDropdown;
