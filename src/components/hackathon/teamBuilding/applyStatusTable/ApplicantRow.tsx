import { useState } from 'react';
import { Button, Text } from '@goorm-dev/vapor-components';
import { OutOutlineIcon } from '@goorm-dev/vapor-icons';
import ApplyReasonModal from './ApplyReasonModal';
import styles from './styles.module.scss';
import ApplyDecisionModal from './ApplyDecisionModal';
import { useNavigate } from 'react-router-dom';
import usePeriodStore from '../../../../store/usePeriodStore';
import { POSITION_NAME, PositionWithoutNull } from '../../../../constants/position';

interface User {
  id: number;
  name: string;
  univ: string;
}

// 지원 신청 정보
interface Applicant {
  id: number;
  preference: number; // 지망 순위
  motivation: string; // 지원 동기
  role: PositionWithoutNull; // 역할
  status: 'WAITING' | 'ACCEPTED' | 'REJECTED' | 'CONFIRMED' | 'ACCEPTED_NOT_JOINED'; // 현재 상태
  user: User; // 지원자의 유저 정보 포함
}

interface ApplicantRowProps {
  applicant: Applicant;
  refetchApplyStatus: () => Promise<void>;
}

const statusMap = {
  ACCEPTED: { text: '수락 완료', color: 'text-success' },
  REJECTED: { text: '거절 완료', color: 'text-danger' },
  CONFIRMED: { text: '확정', color: 'text-success' },
  ACCEPTED_NOT_JOINED: { text: '도난 당함', color: 'text-hint' },
} as const;

export default function ApplicantRow({ applicant, refetchApplyStatus }: ApplicantRowProps) {
  const [isMotivationOpen, setIsMotivationOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const navigate = useNavigate();
  const handleNameClick = () => {
    navigate(`/user/${applicant.user.id}`);
  };

  const { isTeamBuildingPeriod } = usePeriodStore();

  return (
    <>
      <tr className={styles.row}>
        <td>
          <Text typography="body3">{applicant.preference}지망</Text>
        </td>
        <td>
          <Button size="sm" color="secondary" onClick={() => setIsMotivationOpen(true)}>
            지원 사유 보기
          </Button>
        </td>
        <td className={styles.nameContainer} onClick={handleNameClick}>
          <Text typography="body3">{applicant.user.name}</Text>
          <OutOutlineIcon />
        </td>
        <td>
          <Text typography="body3">{POSITION_NAME[applicant.role as PositionWithoutNull]}</Text>
        </td>
        <td>
          <Text typography="body3">{applicant.user.univ}</Text>
        </td>
        <td className={styles.actionButtons}>
          {/* 대기 시 / 팀 빌딩 기간이면 수락 거절 불가 */}
          {applicant.status === 'WAITING' && (
            <>
              <Button size="sm" color="danger" onClick={() => setIsRejectOpen(true)} disabled={isTeamBuildingPeriod()}>
                거절
              </Button>
              <Button size="sm" color="success" onClick={() => setIsAcceptOpen(true)} disabled={isTeamBuildingPeriod()}>
                수락
              </Button>
            </>
          )}
          {/* 수락 시 */}
          {applicant.status === 'ACCEPTED' && (
            <Text typography="subtitle1" color={statusMap[applicant.status].color}>
              {statusMap[applicant.status].text}
            </Text>
          )}
          {/* 거절 시 */}
          {applicant.status === 'REJECTED' && (
            <Text typography="subtitle1" color={statusMap[applicant.status].color}>
              {statusMap[applicant.status].text}
            </Text>
          )}
          {/* 확정 시 */}
          {applicant.status === 'CONFIRMED' && (
            <Text typography="subtitle1" color={statusMap[applicant.status].color}>
              {statusMap[applicant.status].text}
            </Text>
          )}
          {/* 도난 당함 시 */}
          {applicant.status === 'ACCEPTED_NOT_JOINED' && (
            <Text typography="subtitle1" color={statusMap[applicant.status].color}>
              {statusMap[applicant.status].text}
            </Text>
          )}
        </td>
      </tr>

      {/* 모달들 */}
      {isMotivationOpen && (
        <ApplyReasonModal
          isOpen={isMotivationOpen}
          toggle={() => setIsMotivationOpen(false)}
          applyInfo={{
            id: applicant.id,
            motivation: applicant.motivation,
            name: applicant.user.name,
            role: applicant.role as PositionWithoutNull,
            univ: applicant.user.univ,
          }}
        />
      )}
      {isAcceptOpen && (
        <ApplyDecisionModal
          id={applicant.id}
          isOpen={isAcceptOpen}
          toggle={() => setIsAcceptOpen(false)}
          name={applicant.user.name}
          decision="accept"
          refetchApplyStatus={refetchApplyStatus}
        />
      )}
      {isRejectOpen && (
        <ApplyDecisionModal
          id={applicant.id}
          isOpen={isRejectOpen}
          toggle={() => setIsRejectOpen(false)}
          name={applicant.user.name}
          decision="reject"
          refetchApplyStatus={refetchApplyStatus}
        />
      )}
    </>
  );
}
