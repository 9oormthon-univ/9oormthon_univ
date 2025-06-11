import { BasicPagination, Text } from '@goorm-dev/vapor-components';
import styles from './ideaManageTable.module.scss';
import { ControlCommonIcon } from '@goorm-dev/vapor-icons';
import { IdeaManageRow } from '../ideaManageRow/IdeaManageRow';

export default function IdeaManageTable() {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <Text typography="body2" color="text-alternative">
                  아이디어 제목
                </Text>
                <ControlCommonIcon />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  주제
                </Text>
                <ControlCommonIcon />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  게시자
                </Text>
                <ControlCommonIcon />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  팀 빌딩
                </Text>
                <ControlCommonIcon />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <IdeaManageRow />
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <BasicPagination pageCount={10} currentPage={1} />
      </div>
    </div>
  );
}
