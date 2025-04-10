import { MemberRow } from '../memberRow/MemberRow';
import styles from './styles.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';

export const MemberTable = ({ members }: { members: any[] }) => {
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
          <MemberRow />
        </tbody>
      </table>
    </div>
  );
};
