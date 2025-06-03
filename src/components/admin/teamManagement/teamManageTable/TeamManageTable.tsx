import { Text } from '@goorm-dev/vapor-components';
import styles from './teamManageTable.module.scss';
import TeamManageRow from '../teamManageRow/TeamManageRow';

export default function TeamManageTable() {
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
          <TeamManageRow />
        </tbody>
      </table>
    </div>
  );
}
