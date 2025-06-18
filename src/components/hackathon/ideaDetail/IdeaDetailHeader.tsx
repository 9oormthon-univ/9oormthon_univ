import {
  Text,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  toast,
} from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { BookmarkIcon, BookmarkOutlineIcon, MoreCommonOutlineIcon, OutOutlineIcon } from '@goorm-dev/vapor-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBreakPoint from '../../../hooks/useBreakPoint';
import usePeriodStore from '../../../store/usePeriodStore';
import useAuthStore from '../../../store/useAuthStore';
import { UserStatus } from '../../../constants/role';
import { deleteIdea } from '../../../api/idea';
interface IdeaDetailHeaderProps {
  id: number;
  provider_id: number;
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
  id,
  provider_id,
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
  const navigate = useNavigate();
  const breakpoint = useBreakPoint();
  const { current_period } = usePeriodStore();
  const { status, fetchUserStatus } = useAuthStore();

  // 사용자 상태 조회
  useEffect(() => {
    fetchUserStatus();
  }, []);

  const handleApplyIdea = () => {
    if (status === UserStatus.APPLICANT || status === UserStatus.NONE) {
      navigate(`/hackathon/apply/${id}`);
    } else if (status === UserStatus.PROVIDER) {
      toast('이미 등록한 아이디어가 있어 지원할 수 없습니다.', {
        type: 'danger',
      });
    } else if (status === UserStatus.MEMBER) {
      toast('이미 다른 팀에 소속되어 있어 지원할 수 없습니다.', {
        type: 'danger',
      });
    } else {
      toast('지원 가능한 상태가 아닙니다.', {
        type: 'danger',
      });
    }
  };

  // 아이디어 삭제
  const handleDeleteIdea = async () => {
    if (current_period === 'IDEA_SUBMISSION') {
      await deleteIdea(id);
      await fetchUserStatus(); // 사용자 상태 갱신
      navigate('/hackathon');
    } else {
      toast('아이디어 삭제 기간이 아닙니다.', {
        type: 'danger',
      });
    }
  };

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
              <DropdownMenu>
                <DropdownItem onClick={() => navigate(`/hackathon/edit/${id}/step1`)}>수정하기</DropdownItem>
                <DropdownItem
                  color="danger"
                  className={styles.deleteItem}
                  onClick={handleDeleteIdea}
                  disabled={current_period !== 'IDEA_SUBMISSION'}>
                  삭제하기
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            ['xxl', 'xl', 'lg', 'md'].includes(breakpoint) && (
              <div className={styles.notProvider}>
                <Button
                  color="secondary"
                  size="lg"
                  icon={is_bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
                  onClick={onBookmarkToggle}
                />
                <Button color="primary" size="lg" onClick={handleApplyIdea}>
                  지원하기
                </Button>
              </div>
            )
          )}
        </div>
        <Text as="p" typography="body2" color="text-alternative">
          {summary}
        </Text>
        <div className={styles.authorInfo}>
          <Text
            as="span"
            typography="body3"
            color="text-hint"
            onClick={() => {
              navigate(`/user/${provider_id}`);
            }}>
            작성자 : {name}/{university}
          </Text>
          <OutOutlineIcon className={styles.authorInfoIcon} />
        </div>
        {!is_provider && ['sm', 'xs'].includes(breakpoint) && (
          <div className={styles.applyButtonMobile}>
            <Button color="primary" size="lg" block onClick={handleApplyIdea}>
              지원하기
            </Button>
            <Button
              color="secondary"
              size="lg"
              icon={is_bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
              onClick={onBookmarkToggle}
            />
          </div>
        )}
      </div>
    </div>
  );
}
