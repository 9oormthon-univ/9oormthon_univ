import { Text } from '@goorm-dev/vapor-components';
import ApplicantRow from './ApplicantRow';
import styles from './styles.module.scss';
import { PositionWithoutNull } from '../../../../constants/position';
import { Sorting } from '../../../../types/user/idea';
import { ControlCommonIcon } from '@goorm-dev/vapor-icons';

// 지원자 개별 정보
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

interface ApplyStatusTableProps {
  applicants: Applicant[];
  refetchApplyStatus: () => Promise<void>;
  refetchCurrentPhaseApplyStatus: () => Promise<void>;
  onSortChange: (sorting: Sorting) => void;
}

export default function ApplyStatusTable({
  applicants,
  refetchApplyStatus,
  refetchCurrentPhaseApplyStatus,
  onSortChange,
}: ApplyStatusTableProps) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Text typography="subtitle1" color="text-alternative">
                지망
              </Text>
              <ControlCommonIcon className={styles.tableHeaderIcon} onClick={() => onSortChange('PREFERENCE')} />
            </th>
            <th>
              <Text typography="subtitle1" color="text-alternative">
                지원 사유
              </Text>
            </th>
            <th>
              <Text typography="subtitle1" color="text-alternative">
                이름
              </Text>
              <ControlCommonIcon className={styles.tableHeaderIcon} onClick={() => onSortChange('ROLE')} />
            </th>
            <th>
              <Text typography="subtitle1" color="text-alternative">
                파트
              </Text>
            </th>
            <th>
              <Text typography="subtitle1" color="text-alternative">
                대학명
              </Text>
              <ControlCommonIcon className={styles.tableHeaderIcon} onClick={() => onSortChange('UNIV')} />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <ApplicantRow
              key={applicant.id}
              applicant={applicant}
              refetchApplyStatus={refetchApplyStatus}
              refetchCurrentPhaseApplyStatus={refetchCurrentPhaseApplyStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
