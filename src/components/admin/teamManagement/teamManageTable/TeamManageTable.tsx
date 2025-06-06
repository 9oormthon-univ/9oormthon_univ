import { Text } from '@goorm-dev/vapor-components';
import styles from './teamManageTable.module.scss';
import TeamManageRow from '../teamManageRow/TeamManageRow';
import { TeamMemberSummary } from '../../../../types/admin/team';

interface TeamManageTableProps {
  teamMemberSummaryList: TeamMemberSummary[];
  onUpdate: () => void;
}

export default function TeamManageTable({ teamMemberSummaryList, onUpdate }: TeamManageTableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Text typography="body2" color="text-normal">
                이름
              </Text>
            </th>
            <th>
              <Text typography="body2" color="text-normal">
                파트
              </Text>
            </th>
            <th>
              <Text typography="body2" color="text-normal">
                대학
              </Text>
            </th>
            <th>
              <Text typography="body2" color="text-normal">
                이메일
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {teamMemberSummaryList.map((member) => (
            <TeamManageRow key={member.id} member={member} onUpdate={onUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
