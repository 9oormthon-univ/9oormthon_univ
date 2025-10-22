import { Text } from '@goorm-dev/vapor-components';
import ApplicantRow from './ApplicantRow';
import styles from './styles.module.scss';
import { Sorting } from '@/types/user/idea';
import { ControlCommonIcon } from '@goorm-dev/vapor-icons';
import { Applies } from '@/types/user/team';

interface ApplyStatusTableProps {
  applicants: Applies[];
  onSortChange: (sorting: Sorting) => void;
}

export default function ApplyStatusTable({ applicants, onSortChange }: ApplyStatusTableProps) {
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
            </th>
            <th>
              <Text typography="subtitle1" color="text-alternative">
                파트
              </Text>
              <ControlCommonIcon className={styles.tableHeaderIcon} onClick={() => onSortChange('ROLE')} />
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
            <ApplicantRow key={applicant.id} applicant={applicant} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
