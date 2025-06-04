import styles from './participantList.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import { UnivListSidebar } from '../../../components/admin/participantList/univListSideBar/UnivListSidebar';
import { MemberTable } from '../../../components/admin/participantList/memberTable/MemberTable';
import { useEffect, useState } from 'react';
import { fetchUserSummaryListAPI } from '../../../api/admin/users';
import { GENERATION } from '../../../constants/common';

export default function ParticipantList() {
  const [selectedUnivId, setSelectedUnivId] = useState<number | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);

  // 유저 목록 조회
  const getUserList = async (page: number, univId: number | null) => {
    const res = await fetchUserSummaryListAPI(page, 10, GENERATION, univId || undefined, '');
    setMembers(res.data.users);
    setPageInfo(res.data.page_info);
  };

  useEffect(() => {
    getUserList(currentPage, selectedUnivId);
  }, [currentPage, selectedUnivId]);

  // 유니브 선택 콜백 / 유니브를 아무것도 선택하지 않았을 때 미르미 전체 조회
  const handleSelectUniv = (univId: number | null) => {
    setSelectedUnivId(univId);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <div className={styles.listTitle}>
          <Text typography="heading4" as="h4">
            미르미 리스트
          </Text>
          <Text typography="heading5" as="h5" color="text-primary">
            9,999
          </Text>
        </div>
        <div className={styles.listContent}>
          <UnivListSidebar onSelectUniv={handleSelectUniv} />
          <MemberTable
            members={members}
            pageInfo={pageInfo}
            onPageChange={(page) => getUserList(page, selectedUnivId)}
          />
        </div>
      </div>
    </div>
  );
}
