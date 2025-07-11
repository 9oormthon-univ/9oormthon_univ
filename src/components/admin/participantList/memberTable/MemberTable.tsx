import { BasicPagination } from '@goorm-dev/gds-components';
import { MemberRow } from '../memberRow/MemberRow';
import styles from './styles.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import { MemberCreateModal } from '../modal/MemberCreateModal';
import { Univ } from '../../../../types/admin/univ';
import { PageInfo, Sorting, UserSummary } from '../../../../types/admin/user';
import { ControlCommonIcon } from '@goorm-dev/vapor-icons';

interface MemberTableProps {
  members: UserSummary[];
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
  selectedUniv: Univ | null;
  onSearchChange: (query: string) => void;
  onUpdate: () => void;
  onSortChange: (sorting: Sorting) => void;
}

export const MemberTable = ({
  members,
  pageInfo,
  onPageChange,
  selectedUniv,
  onSearchChange,
  onUpdate,
  onSortChange,
}: MemberTableProps) => {
  const [isMemberCreateModalOpen, setIsMemberCreateModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsMemberCreateModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderLeft}>
          <Text as="h6" typography="heading6" color="text-normal">
            {selectedUniv?.name || '전체 미르미'}
          </Text>
          <Text as="h6" typography="heading6" color="text-primary">
            {pageInfo.total_items}
          </Text>
        </div>
        <div className={styles.tableHeaderRight}>
          <Input
            size="md"
            placeholder="검색"
            type="text"
            style={{ width: '11.875rem' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          />
          <Button size="md" color="primary" onClick={handleOpenModal}>
            인원 추가하기
          </Button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td style={{ width: '9.375rem' }}>
                <Text typography="subtitle1" color="text-normal" className={styles.tableHeaderText}>
                  이름
                </Text>
                <ControlCommonIcon className={styles.tableHeaderIcon} onClick={() => onSortChange(Sorting.NAME)} />
              </td>
              <td>
                <Text typography="subtitle1" color="text-normal">
                  이메일
                </Text>
                <ControlCommonIcon className={styles.tableHeaderIcon} onClick={() => onSortChange(Sorting.EMAIL)} />
              </td>
              <td>
                <Text typography="subtitle1" color="text-normal">
                  팀빌딩
                </Text>
                <ControlCommonIcon
                  className={styles.tableHeaderIcon}
                  onClick={() => onSortChange(Sorting.TEAM_BUILDING)}
                />
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <MemberRow key={member.id} member={member} onUpdate={onUpdate} />
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
      <MemberCreateModal
        isOpen={isMemberCreateModalOpen}
        toggle={() => setIsMemberCreateModalOpen(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
};
