import { Text } from '@goorm-dev/vapor-components';
import ApplicantRow from './ApplicantRow';
import styles from './styles.module.scss';

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
  role: 'PM' | 'PD' | 'BE' | 'FE'; // 역할
  status: 'WAITING' | 'ACCEPTED' | 'REJECTED' | 'CONFIRMED' | 'ACCEPTED_NOT_JOINED'; // 현재 상태
  user: User; // 지원자의 유저 정보 포함
}

// 전체 지원자 데이터
interface ApplicantData {
  applies: Applicant[]; // 지원자 목록
}

export default function ApplyStatusTable({ applicants }: { applicants: ApplicantData }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Text typography="subtitle1" color="text-alternative">
                지망
              </Text>
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
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applicants?.applies?.map((applicant) => (
            <ApplicantRow key={applicant.id} applicant={applicant} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
