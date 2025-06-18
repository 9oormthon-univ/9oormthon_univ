import styles from './teamBuildingTableSkeleton.module.scss';
import { Skeleton } from '@goorm-dev/vapor-components';

export default function TeamBuildingTableSkeleton() {
  return (
    <table>
      <thead className={styles.tableHead}>
        <tr className={styles.tableHeadRow}>
          <th className={styles.tableHeadItem}>
            <Skeleton width="2rem" height="1.2rem" />
          </th>
          {Array.from({ length: 5 }).map((_, index) => (
            <th key={index} className={styles.tableHeadItem}>
              <Skeleton width="3.5rem" height="1.2rem" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {Array.from({ length: 15 }).map((_, index) => (
          <tr key={index} className={styles.tableBodyRow}>
            <td className={styles.tableBodyItem}>
              <Skeleton width="2rem" height="1.2rem" />
            </td>
            {Array.from({ length: 5 }).map((_, index) => (
              <td key={index} className={styles.tableBodyItem}>
                <Skeleton width="5rem" height="1.2rem" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
