import { Text, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { BookmarkIcon, BookmarkOutlineIcon, MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';

interface IdeaDetailHeaderProps {
  subject: string;
  title: string;
  is_active: boolean;
  summary: string;
  name: string;
  university: string;
  is_provider: boolean;
  is_bookmarked: boolean;
  onBookmarkToggle: () => void;
}

export default function IdeaDetailHeader({
  subject,
  title,
  is_active,
  summary,
  name,
  university,
  is_provider,
  is_bookmarked,
  onBookmarkToggle,
}: IdeaDetailHeaderProps) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrap}>
          <div className={styles.titleDetail}>
            <Text typography="subtitle1" color="text-hint">
              {subject}
            </Text>
            <div className={styles.titleStatus}>
              <Text as="h4" typography="heading4" color="text-normal">
                {title}
              </Text>

              {/* 모집 완료 시 color 변경 필요 */}
              <Badge pill color={is_active ? 'primary' : 'success'}>
                {is_active ? '모집 중' : '모집 완료'}
              </Badge>
            </div>
          </div>
          {is_provider ? (
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
              <Button
                color="secondary"
                size="lg"
                icon={is_bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
                onClick={onBookmarkToggle}
              />
              <Button color="primary" size="lg">
                지원하기
              </Button>
            </div>
          )}
        </div>
        <Text as="p" typography="body2" color="text-alternative">
          {summary}
        </Text>
        <Text as="span" typography="body3" color="text-hint">
          작성자 : {name}/{university}
        </Text>
      </div>
    </div>
  );
}
