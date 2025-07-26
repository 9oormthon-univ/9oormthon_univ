import { Button, Text, toast } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { deleteApply } from '../../../api/users';
import { deleteMockApply } from '../../../utilities/mockUtils';
import usePeriodStore from '../../../store/usePeriodStore';
import useAuthStore from '../../../store/useAuthStore';
import { UserStatus } from '../../../constants/role';

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
  onDeleteSuccess: () => void;
  applyIndex: number;
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

export default function IdeaApplyListItem({ applySummary, onDeleteSuccess, applyIndex }: IdeaApplyListItemProps) {
  const { apply_info, idea_info } = applySummary;
  const navigate = useNavigate();

  const { isTeamBuildingPeriod } = usePeriodStore();
  const { status } = useAuthStore();

  const handleDeleteApply = async () => {
    try {
      if (import.meta.env.DEV) {
        // 개발 환경에서는 목업 함수 사용
        await deleteMockApply(apply_info.id);
      } else {
        // 프로덕션 환경에서는 실제 API 호출
        await deleteApply(apply_info.id);
      }
      toast('지원 취소가 완료되었습니다.', {
        type: 'primary',
      });
      onDeleteSuccess();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.log(error);
      }
      toast('지원 취소에 실패했습니다.', {
        type: 'danger',
      });
    }
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
            disabled={!isTeamBuildingPeriod() || apply_info.status !== 'WAITING' || status === UserStatus.MEMBER}>
            지원 취소
          </Button>
        )}
      </div>
    </div>
  );
}
