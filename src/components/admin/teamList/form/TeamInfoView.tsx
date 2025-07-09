import { InOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './form.module.scss';

import { Button, Text } from '@goorm-dev/vapor-components';
import { TeamBuildingStatus, TeamDetail } from '../../../../types/admin/team';
import { useNavigate } from 'react-router-dom';

interface TeamInfoViewProps {
  teamDetail: TeamDetail | null;
}

export default function TeamInfoView({ teamDetail }: TeamInfoViewProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          팀 번호
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.number || '-'}팀
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          팀 명
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.team_name || '-'}
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          기획 필요 인원
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.pm_capacity || '-'}명
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          디자인 필요 인원
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.pd_capacity || '-'}명
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          프론트엔드 필요 인원
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.fe_capacity || '-'}명
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          백엔드 필요 인원
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.be_capacity || '-'}명
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          서비스 명
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.service_name || '-'}
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          아이디어 정보
        </Text>
        <Button
          size="md"
          color="secondary"
          iconSide="right"
          icon={InOutlineIcon}
          className={styles.ideaInfoButton}
          onClick={() => {
            navigate(`/hackathon/detail/${teamDetail?.idea_id}`);
          }}
          disabled={!teamDetail?.idea_id}>
          아이디어 정보 보기
        </Button>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          팀장
        </Text>
        <Text typography="heading6" color="text-normal">
          {teamDetail?.leader?.description || '-'}
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          팀빌딩 상태
        </Text>
        <Text
          typography="heading6"
          color={teamDetail?.team_building === TeamBuildingStatus.RECRUITING ? 'text-primary' : 'text-success'}>
          {teamDetail?.team_building === TeamBuildingStatus.RECRUITING ? '모집중' : '모집완료'}
        </Text>
      </div>
    </div>
  );
}
