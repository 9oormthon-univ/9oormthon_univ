import { BasicPagination, Text } from '@goorm-dev/vapor-components';
import styles from './ideaManageTable.module.scss';
import { ControlCommonIcon } from '@goorm-dev/vapor-icons';
import { IdeaManageRow } from '../ideaManageRow/IdeaManageRow';
import { Idea, PageInfo, Sorting } from '../../../../types/admin/idea';

export default function IdeaManageTable({
  ideaList,
  pageInfo,
  onSortChange,
  onPageChange,
}: {
  ideaList: Idea[];
  pageInfo: PageInfo;
  onSortChange: (sorting: Sorting) => void;
  onPageChange: (page: number) => void;
}) {
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
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('TITLE')} />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  주제
                </Text>
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('SUBJECT')} />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  게시자
                </Text>
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('PROVIDER')} />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  팀 빌딩
                </Text>
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('TEAM_BUILDING')} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ideaList.map((idea) => (
              <IdeaManageRow key={idea.id} idea={idea} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <BasicPagination
          pageCount={pageInfo.total_pages}
          page={pageInfo.current_page}
          onPageChangeHandler={(page: number) => onPageChange(page)}
        />
      </div>
    </div>
  );
}
