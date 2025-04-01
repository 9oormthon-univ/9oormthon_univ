import { SearchOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  SideNav,
  Text,
} from '@goorm-dev/vapor-components';
import { MoreCommonOutlineIcon, PlusOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';

export const UnivListSidebar = () => {
  const [isUnivOptionOpened, setIsUnivOptionOpened] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <div className={styles.listHeaderText}>
          <Text typography="heading6" as="h6" color="text-normal">
            유니브 리스트
          </Text>
          <Text typography="heading6" as="h6" color="text-primary">
            30
          </Text>
        </div>
        <SearchOutlineIcon size={24} />
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
                  <DropdownItem>
                    <Text typography="body2" as="p" color="text-normal">
                      정보 수정
                    </Text>
                  </DropdownItem>
                  <DropdownItem>
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
        <Button icon={PlusOutlineIcon} color="secondary" block size="lg">
          유니브 추가하기
        </Button>
      </div>
    </div>
  );
};
