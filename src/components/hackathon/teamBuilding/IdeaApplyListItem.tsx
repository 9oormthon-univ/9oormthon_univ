import { Button, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { usePeriod } from '@/hooks/queries/system/usePeriod';
import { UserStatus } from '@/constants/role';
import { ApplySummary } from '@/types/user/users';
import { getPositionName } from '@/constants/position';
import { getApplyStatusColor, getApplyStatusName } from '@/types/user/team';
import { useApplyMutation } from '@/hooks/mutations/useApplyMutation';
import { useUser } from '@/hooks/queries/useUser';
interface IdeaApplyListItemProps {
  applySummary: ApplySummary;
  applyIndex: number;
}

export default function IdeaApplyListItem({ applySummary, applyIndex }: IdeaApplyListItemProps) {
  const { apply_info, idea_info } = applySummary;
  const navigate = useNavigate();

  const { isApplyAblePeriod } = usePeriod();
  const { data: user } = useUser();
  const status = user?.status ?? UserStatus.NONE;
  const { mutate: deleteApply } = useApplyMutation();

  const handleDeleteApply = async () => {
    deleteApply(apply_info.id);
  };

  return (
    <div className={styles.ideaApplyListItemContainer}>
      <div className={styles.ideaApplyListItemLeft}>
        <Text as="h4" typography="heading4" color="text-normal">
          {applyIndex}지망
        </Text>
        <div className={styles.ideaApplyListItemContent}>
          <Text
            as="h6"
            typography="heading6"
            color="text-normal"
            className={styles.ideaApplyListItemTitle}
            onClick={() => navigate(`/hackathon/detail/${idea_info.id}`)}>
            {idea_info.title}
          </Text>
          <Text typography="body3" color="text-hint">
            {getPositionName(apply_info.role)} 파트
          </Text>
        </div>
        <Text typography="body2" color="text-alternative">
          {apply_info.motivation}
        </Text>
      </div>
      <div className={styles.ideaApplyListItemRight}>
        <div className={styles.ideaApplyListItemRightContent}>
          <Text as="h4" typography="heading4" color={getApplyStatusColor(apply_info.status) || 'text-primary'}>
            {getApplyStatusName(apply_info.status)}
          </Text>
          <Text typography="subtitle2" color="text-hint">
            경쟁률 {apply_info.ratio}
          </Text>
        </div>
        {/* 팀 빌딩 기간이라면 지원 취소 가능 */}
        {apply_info.status === 'CONFIRMED' ? (
          <Button size="sm" color="secondary" onClick={() => navigate('/team/detail')}>
            팀 정보 보기
          </Button>
        ) : (
          <Button
            size="sm"
            color="secondary"
            onClick={handleDeleteApply}
            disabled={!isApplyAblePeriod || apply_info.status !== 'WAITING' || status === UserStatus.MEMBER}>
            지원 취소
          </Button>
        )}
      </div>
    </div>
  );
}
