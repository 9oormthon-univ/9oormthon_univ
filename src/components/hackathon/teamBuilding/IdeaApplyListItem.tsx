import { Button, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { deleteApply } from '../../../api/users';
import usePeriodStore from '../../../store/usePeriodStore';
interface ApplyInfo {
  id: number;
  status: 'WAITING' | 'ACCEPTED' | 'REJECTED' | 'CONFIRMED' | 'ACCEPTED_NOT_JOINED';
  ratio: string;
  preference: number;
  motivation: string;
  role: 'PM' | 'PD' | 'BE' | 'FE';
}

interface IdeaInfo {
  id: number;
  title: string;
}

interface ApplySummary {
  apply_info: ApplyInfo;
  idea_info: IdeaInfo;
}

interface IdeaApplyListItemProps {
  applySummary: ApplySummary;
  phase: number;
}

const roleMap: Record<ApplyInfo['role'], string> = {
  PM: '기획',
  PD: '디자인',
  BE: '백엔드',
  FE: '프론트엔드',
};

const statusMap = {
  WAITING: { text: '대기중', color: 'text-primary' },
  ACCEPTED: { text: '수락됨', color: 'text-success' },
  REJECTED: { text: '거절됨', color: 'text-danger' },
  CONFIRMED: { text: '확정', color: 'text-success' },
  ACCEPTED_NOT_JOINED: { text: '-', color: 'text-hint' },
} as const;

export default function IdeaApplyListItem({ applySummary, phase }: IdeaApplyListItemProps) {
  const { apply_info, idea_info } = applySummary;
  const navigate = useNavigate();

  const { isTeamBuildingPeriod } = usePeriodStore();

  return (
    <div className={styles.ideaApplyListItemContainer}>
      <div className={styles.ideaApplyListItemLeft}>
        <Text as="h4" typography="heading4" color="text-normal">
          {phase}지망
        </Text>
        <div className={styles.ideaApplyListItemContent}>
          <Text as="h6" typography="heading6" color="text-normal" onClick={() => navigate(`/idea/${idea_info.id}`)}>
            {idea_info.title}
          </Text>
          <Text typography="body3" color="text-hint">
            {roleMap[apply_info.role]} 파트
          </Text>
        </div>
        <Text typography="body2" color="text-alternative">
          {apply_info.motivation}
        </Text>
      </div>
      <div className={styles.ideaApplyListItemRight}>
        <div className={styles.ideaApplyListItemRightContent}>
          <Text as="h4" typography="heading4" color={statusMap[apply_info.status]?.color || 'text-primary'}>
            {statusMap[apply_info.status].text}
          </Text>
          <Text typography="subtitle2" color="text-hint">
            지원 비율 {apply_info.ratio}
          </Text>
        </div>
        {/* 팀 빌딩 기간이라면 지원 취소 가능 */}
        {isTeamBuildingPeriod() ? (
          <Button size="sm" color="secondary" onClick={() => deleteApply(apply_info.id)}>
            지원 취소
          </Button>
        ) : apply_info.status === 'CONFIRMED' ? (
          // 이부분 id값 변경 필요
          <Button size="sm" color="secondary" onClick={() => navigate(`/team/${apply_info.id}`)}>
            팀 정보 보기
          </Button>
        ) : (
          <Button size="sm" color="secondary" disabled>
            지원 취소
          </Button>
        )}
      </div>
    </div>
  );
}
