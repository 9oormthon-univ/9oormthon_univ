import { useState } from 'react';
import styles from './teamList.module.scss';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Text } from '@goorm-dev/vapor-components';
import { TeamTable } from '../../../components/admin/teamList/teamTable/TeamTable';

export default function TeamList() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Text typography="heading4" as="h4" color="text-normal">
          팀 리스트
        </Text>
        <Text typography="heading5" as="h5" color="text-primary">
          999
        </Text>
      </div>
      <div className={styles.filterContainer}>
        {/* 기수 선택 - 우선 static으로 진행할 예정 */}
        <Dropdown isOpen={isOpen} toggle={toggle} className={styles.dropdown}>
          <DropdownToggle color="secondary" outline caret className={styles.dropdownToggle}>
            4기
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>1기</DropdownItem>
            <DropdownItem>2기</DropdownItem>
            <DropdownItem>3기</DropdownItem>
            <DropdownItem>4기</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className={styles.searchAddContainer}>
          <Input bgSize="md" placeholder="팀 번호, 팀 명, 서비스 명으로 검색" className={styles.searchInput} />
          <Button size="md" color="secondary">
            팀 번호 편집
          </Button>
          <Button size="md" color="primary">
            팀 추가하기
          </Button>
        </div>
      </div>
      <TeamTable />
    </div>
  );
}
