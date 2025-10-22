import { useState } from 'react';
import { Button, Text } from '@goorm-dev/vapor-components';
import { OutOutlineIcon } from '@goorm-dev/vapor-icons';
import ApplyReasonModal from './ApplyReasonModal';
import styles from './styles.module.scss';
import ApplyDecisionModal from './ApplyDecisionModal';
import { useNavigate } from 'react-router-dom';
import { getPositionName } from '@/constants/position';
import { usePeriod } from '@/hooks/queries/system/usePeriod';
import { Applies, ApplyStatus } from '@/types/user/team';

export default function ApplicantRow({ applicant }: { applicant: Applies }) {
  const [isMotivationOpen, setIsMotivationOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const navigate = useNavigate();
  const handleNameClick = () => {
    navigate(`/user/${applicant.user.id}`);
  };

  const { isApplyAblePeriod } = usePeriod();

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
          <Text typography="body3">{getPositionName(applicant.role)}</Text>
        </td>
        <td>
          <Text typography="body3" className={styles.univ}>
            {applicant.user.univ}
          </Text>
        </td>
        <td className={styles.actionButtons}>
          {/* 대기 시 / 팀 빌딩 기간이면 수락 거절 불가 */}
          {applicant.status === 'WAITING' && (
            <>
              <Button size="sm" color="danger" onClick={() => setIsRejectOpen(true)} disabled={isApplyAblePeriod}>
                거절
              </Button>
              <Button size="sm" color="success" onClick={() => setIsAcceptOpen(true)} disabled={isApplyAblePeriod}>
                수락
              </Button>
            </>
          )}
          {/* 수락 시 */}
          {applicant.status === 'ACCEPTED' && (
            <Text typography="subtitle1" color={ApplyStatus[applicant.status].color}>
              {ApplyStatus[applicant.status].text}
            </Text>
          )}
          {/* 거절 시 */}
          {applicant.status === 'REJECTED' && (
            <Text typography="subtitle1" color={ApplyStatus[applicant.status].color}>
              {ApplyStatus[applicant.status].text}
            </Text>
          )}
          {/* 확정 시 */}
          {applicant.status === 'CONFIRMED' && (
            <Text typography="subtitle1" color={ApplyStatus[applicant.status].color}>
              {ApplyStatus[applicant.status].text}
            </Text>
          )}
          {/* 타 팀 합류 시 */}
          {applicant.status === 'ACCEPTED_NOT_JOINED' && (
            <Text typography="subtitle1" color={ApplyStatus[applicant.status].color}>
              {ApplyStatus[applicant.status].text}
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
            role: applicant.role,
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
        />
      )}
      {isRejectOpen && (
        <ApplyDecisionModal
          id={applicant.id}
          isOpen={isRejectOpen}
          toggle={() => setIsRejectOpen(false)}
          name={applicant.user.name}
          decision="reject"
        />
      )}
    </>
  );
}
