import { Text } from '@goorm-dev/vapor-components';
import ApplicantRow from './ApplicantRow';
import styles from './styles.module.scss';

interface Applicant {
  id: number;
  preference: string;
  name: string;
  part: string;
  university: string;
  reason: string;
}

const applicants: Applicant[] = [
  {
    id: 1,
    preference: '1지망',
    name: '김구름',
    part: '디자인',
    university: '구름대학교',
    reason: '사유는 이러이러해요.',
  },
  {
    id: 2,
    preference: '1지망',
    name: '김구름',
    part: '디자인',
    university: '구름대학교',
    reason: '사유는 이러이러해요.',
  },
  {
    id: 3,
    preference: '2지망',
    name: '김구름',
    part: '프론트엔드',
    university: '구름대학교',
    reason: '프론트엔드가 되고 싶어요!',
  },
  {
    id: 4,
    preference: '2지망',
    name: '김구름',
    part: '백엔드',
    university: '구름대학교',
    reason: '서버 개발에 관심이 많아요!',
  },
];

export default function ApplyStatusTable() {
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
          {applicants.map((applicant) => (
            <ApplicantRow key={applicant.id} applicant={applicant} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
