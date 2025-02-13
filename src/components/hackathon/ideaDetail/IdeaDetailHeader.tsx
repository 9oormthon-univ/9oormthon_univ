import { Text, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { BookmarkOutlineIcon, MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
// 아이디어 제공자 여부
const isIdeaProvider = false;

export default function IdeaDetailHeader() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrap}>
          <div className={styles.titleDetail}>
            <Text typography="subtitle1" color="text-hint">
              해커톤 주제1
            </Text>
            <div className={styles.titleStatus}>
              <Text as="h4" typography="heading4" color="text-normal">
                아이디어 제목
              </Text>

              {/* 모집 완료 시 color 변경 필요 */}
              <Badge pill color="primary">
                모집 중
              </Badge>
            </div>
          </div>
          {isIdeaProvider ? (
            <Dropdown isOpen={open} toggle={toggle}>
              <DropdownToggle color="secondary" size="lg" className={styles.dropdownToggle}>
                <MoreCommonOutlineIcon className={styles.dropdownIcon} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>기본 정보 수정</DropdownItem>
                <DropdownItem>팀원 정보 수정</DropdownItem>
                <DropdownItem className={styles.deleteItem}>삭제하기</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className={styles.notProvider}>
              <Button color="secondary" size="lg" icon={BookmarkOutlineIcon} />
              <Button color="primary" size="lg">
                지원하기
              </Button>
            </div>
          )}
        </div>
        <Text as="p" typography="body2" color="text-alternative">
          아이디어에 대한 간단한 소개가 들어가는 자리입니다. 아이디어에 대한 간단한 소개가 들어가는 자리입니다.
          아이디어에 대한 간단한 소개가 들어가는 자리입니다. 아이디어에 대한 간단한 소개가 들어가는 자리입니다.
          아이디어에 대한 간단한 소개가 들어가는 자리입
        </Text>
        <Text as="span" typography="body3" color="text-hint">
          작성자 : 김구름/구름대학교
        </Text>
      </div>
    </div>
  );
}
