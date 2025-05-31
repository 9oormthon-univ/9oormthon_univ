import { BasicPagination, Text } from '@goorm-dev/vapor-components';
import styles from './teamTable.module.scss';
import { TeamRow } from '../teamRow/TeamRow';

export const TeamTable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  팀 번호
                </Text>
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  팀 명
                </Text>
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  아이디어 명
                </Text>
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  인원 수
                </Text>
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  팀 빌딩
                </Text>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TeamRow />
            <TeamRow />
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <BasicPagination pageCount={10} />
      </div>
    </div>
  );
};
