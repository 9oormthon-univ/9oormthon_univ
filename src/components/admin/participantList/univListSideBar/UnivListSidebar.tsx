import { SearchOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  SideNav,
  Text,
} from '@goorm-dev/vapor-components';
import { MoreCommonOutlineIcon, PlusOutlineIcon } from '@goorm-dev/vapor-icons';
import { useEffect, useRef, useState } from 'react';
import { UnivUpdateModal } from '../modal/univUpdateModal';
import { UnivDeleteModal } from '../modal/univDeleteModal';
import { UnivCreateModal } from '../modal/univCreateModal';
export const UnivListSidebar = () => {
  const [isUnivOptionOpened, setIsUnivOptionOpened] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUnivUpdateModalOpen, setIsUnivUpdateModalOpen] = useState(false);
  const [isUnivDeleteModalOpen, setIsUnivDeleteModalOpen] = useState(false);
  const [isUnivCreateModalOpen, setIsUnivCreateModalOpen] = useState(false);
  // 검색 창 바깥 클릭 시 검색 창 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        {isSearching ? (
          <Input
            size="md"
            ref={inputRef}
            placeholder="유니브명 검색"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onBlur={() => setIsSearching(false)}
            autoFocus
          />
        ) : (
          <>
            <div className={styles.listHeaderText}>
              <Text typography="heading6" as="h6" color="text-normal">
                유니브 리스트
              </Text>
              <Text typography="heading6" as="h6" color="text-primary">
                30
              </Text>
            </div>
            <SearchOutlineIcon size={24} onClick={() => setIsSearching(true)} className={styles.searchIcon} />
          </>
        )}
      </div>
      <SideNav className={styles.sideBar}>
        <SideNav.List className={styles.sideBarList}>
          <SideNav.Item>
            <SideNav.Link>전체</SideNav.Link>
          </SideNav.Item>
          <SideNav.Item className={styles.univItem}>
            <SideNav.Link>구름대학교</SideNav.Link>
            <SideNav.Item.RightArea>
              <Dropdown
                direction="down"
                className={styles.univDropdown}
                isOpen={isUnivOptionOpened}
                toggle={() => setIsUnivOptionOpened((prev) => !prev)}>
                <DropdownToggle size="sm" color="secondary" className={styles.univDropdownToggle}>
                  <MoreCommonOutlineIcon className={styles.univDropdownIcon} />
                </DropdownToggle>
                <DropdownMenu right className={styles.univDropdownMenu}>
                  <DropdownItem onClick={() => setIsUnivUpdateModalOpen(true)}>
                    <Text typography="body2" as="p" color="text-normal">
                      정보 수정
                    </Text>
                  </DropdownItem>
                  <DropdownItem onClick={() => setIsUnivDeleteModalOpen(true)}>
                    <Text typography="body2" as="p" color="text-danger">
                      삭제하기
                    </Text>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SideNav.Item.RightArea>
          </SideNav.Item>
        </SideNav.List>
      </SideNav>
      <div className={styles.addUnivButton}>
        <Button icon={PlusOutlineIcon} color="secondary" block size="lg" onClick={() => setIsUnivCreateModalOpen(true)}>
          유니브 추가하기
        </Button>
      </div>
      <UnivUpdateModal isOpen={isUnivUpdateModalOpen} toggle={() => setIsUnivUpdateModalOpen((prev) => !prev)} />
      <UnivDeleteModal isOpen={isUnivDeleteModalOpen} toggle={() => setIsUnivDeleteModalOpen((prev) => !prev)} />
      <UnivCreateModal isOpen={isUnivCreateModalOpen} toggle={() => setIsUnivCreateModalOpen((prev) => !prev)} />
    </div>
  );
};
