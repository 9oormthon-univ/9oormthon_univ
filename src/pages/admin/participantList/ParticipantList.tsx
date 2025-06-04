import styles from './participantList.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import { UnivListSidebar } from '../../../components/admin/participantList/univListSideBar/UnivListSidebar';
import { MemberTable } from '../../../components/admin/participantList/memberTable/MemberTable';
import { useEffect, useState } from 'react';
import { fetchUserSummaryListAPI } from '../../../api/admin/users';
import { GENERATION } from '../../../constants/common';
import { fetchUnivListAPI } from '../../../api/admin/univs';
import { useDebounce } from '../../../hooks/useDebounce';

export interface Univ {
  id: number;
  name: string;
}

export default function ParticipantList() {
  const [selectedUnivId, setSelectedUnivId] = useState<number | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [univCount, setUnivCount] = useState(0);
  const [selectedUniv, setSelectedUniv] = useState<Univ | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // 유니브 리스트 간단 조회
  const fetchUnivList = async () => {
    const res = await fetchUnivListAPI(GENERATION);
    setUnivList(res.data.univs);
    setUnivCount(res.data.count);
  };

  useEffect(() => {
    fetchUnivList();
  }, []);

  // 유저 목록 조회
  const getUserList = async (page: number, univId: number | null, search?: string) => {
    const searchParam = search?.trim() === '' ? undefined : search;
    const res = await fetchUserSummaryListAPI(page, 10, GENERATION, univId || undefined, searchParam);
    setMembers(res.data.users);
    setPageInfo(res.data.page_info);
  };

  useEffect(() => {
    getUserList(currentPage, selectedUnivId, debouncedSearchQuery);
  }, [currentPage, selectedUnivId, debouncedSearchQuery]);

  // 유니브 선택 콜백 / 유니브를 아무것도 선택하지 않았을 때 미르미 전체 조회
  const handleSelectUniv = (univId: number | null) => {
    setSelectedUnivId(univId);
    setCurrentPage(1);
    setSelectedUniv(univList.find((univ) => univ.id === univId) || null);
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
          <UnivListSidebar
            onSelectUniv={handleSelectUniv}
            univList={univList}
            univCount={univCount}
            onRefreshUnivList={fetchUnivList}
          />
          <MemberTable
            selectedUniv={selectedUniv || null}
            members={members}
            pageInfo={pageInfo}
            onPageChange={(page) => getUserList(page, selectedUnivId, searchQuery)}
            onSearchChange={(query) => setSearchQuery(query)}
          />
        </div>
      </div>
    </div>
  );
}
