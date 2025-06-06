import { BasicPagination, Text } from '@goorm-dev/vapor-components';
import styles from './teamTable.module.scss';
import { TeamRow } from '../teamRow/TeamRow';
import { SortType, TeamOverview } from '../../../../types/admin/team';
import { ControlCommonIcon } from '@goorm-dev/vapor-icons';

interface TeamTableProps {
  teamList: TeamOverview['teams'];
  pageInfo: TeamOverview['page_info'];
  onPageChange: (page: number) => void;
  onSortChange: (sortType: SortType) => void;
}

export const TeamTable = ({ teamList, pageInfo, onPageChange, onSortChange }: TeamTableProps) => {
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
                <ControlCommonIcon className={styles.tableHeaderIcon} onClick={() => onSortChange(SortType.ID)} />
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  팀 명
                </Text>
                <ControlCommonIcon
                  className={styles.tableHeaderIcon}
                  onClick={() => onSortChange(SortType.TEAM_NAME)}
                />
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  아이디어 명
                </Text>
                <ControlCommonIcon
                  className={styles.tableHeaderIcon}
                  onClick={() => onSortChange(SortType.SERVICE_NAME)}
                />
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  인원 수
                </Text>
                <ControlCommonIcon
                  className={styles.tableHeaderIcon}
                  onClick={() => onSortChange(SortType.MEMBER_COUNT)}
                />
              </th>
              <th>
                <Text typography="subtitle1" color="text-alternative">
                  팀 빌딩
                </Text>
                <ControlCommonIcon
                  className={styles.tableHeaderIcon}
                  onClick={() => onSortChange(SortType.TEAM_BUILDING)}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teamList.map((team) => (
              <TeamRow key={team.id} team={team} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <BasicPagination
          pageCount={pageInfo.total_pages}
          currentPage={pageInfo.current_page}
          onPageChangeHandler={(page: number) => onPageChange(page)}
        />
      </div>
    </div>
  );
};
