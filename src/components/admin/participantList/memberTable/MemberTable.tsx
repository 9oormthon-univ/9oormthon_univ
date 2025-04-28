import { BasicPagination } from '@goorm-dev/gds-components';
import { MemberRow } from '../memberRow/MemberRow';
import styles from './styles.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';

interface MemberTableProps {
  members: any[];
}

export const MemberTable = ({ members }: MemberTableProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderLeft}>
          <Text as="h6" typography="heading6" color="text-normal">
            구름대학교
          </Text>
          <Text as="h6" typography="heading6" color="text-primary">
            30
          </Text>
        </div>
        <div className={styles.tableHeaderRight}>
          <Input size="md" placeholder="검색" type="text" style={{ width: '11.875rem' }} />
          <Button size="md" color="primary">
            인원 추가하기
          </Button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>
                <Text typography="subtitle1" color="text-normal">
                  이름
                </Text>
              </td>
              <td>
                <Text typography="subtitle1" color="text-normal">
                  권한
                </Text>
              </td>
              <td>
                <Text typography="subtitle1" color="text-normal">
                  이메일
                </Text>
              </td>
              <td>
                <Text typography="subtitle1" color="text-normal">
                  팀빌딩
                </Text>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <BasicPagination pageCount={10} />
      </div>
    </div>
  );
};
