import styles from './participantList.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import { UnivListSidebar } from '../../../components/admin/participantList/univListSideBar/UnivListSidebar';
import { MemberTable } from '../../../components/admin/participantList/memberTable/MemberTable';
import { useEffect, useState } from 'react';
import { fetchUserSummaryListAPI } from '../../../api/admin/users';
import { GENERATION } from '../../../constants/common';
import { fetchUnivListAPI } from '../../../api/admin/univs';
import { useDebounce } from '../../../hooks/useDebounce';
import { Univ } from '../../../types/admin/univ';
import { PageInfo, Sorting, SortType, UserOverview } from '../../../types/admin/user';

export default function ParticipantList() {
  const [selectedUnivId, setSelectedUnivId] = useState<number | null>(null);
  const [members, setMembers] = useState<UserOverview[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_page: 0,
    current_items: 0,
    page_size: 0,
    total_pages: 0,
    total_items: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [univCount, setUnivCount] = useState(0);
  const [selectedUniv, setSelectedUniv] = useState<Univ | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType | undefined>(undefined);

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
  const getUserList = async (
    page: number,
    univId: number | null,
    search?: string,
    sorting?: Sorting,
    sortType?: SortType,
  ) => {
    const searchParam = search?.trim() === '' ? undefined : search;
    const res = await fetchUserSummaryListAPI(
      page,
      10,
      GENERATION,
      univId || undefined,
      searchParam,
      sorting,
      sortType,
    );
    setMembers(res.data.users);
    setPageInfo(res.data.page_info);
  };

  useEffect(() => {
    getUserList(currentPage, selectedUnivId, debouncedSearchQuery, sorting, sortType);
  }, [currentPage, selectedUnivId, debouncedSearchQuery, sorting, sortType]);

  // 유니브 선택 콜백 / 유니브를 아무것도 선택하지 않았을 때 미르미 전체 조회
  const handleSelectUniv = (univId: number | null) => {
    setSelectedUnivId(univId);
    setCurrentPage(1);
    setSelectedUniv(univList.find((univ) => univ.id === univId) || null);
  };

  // 정렬 콜백
  const handleSorting = (newSorting: Sorting) => {
    if (sorting !== newSorting) {
      setSorting(newSorting);
      setSortType(SortType.ASC);
    } else {
      setSortType(sortType === SortType.ASC ? SortType.DESC : SortType.ASC);
    }
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <Text typography="heading4" as="h4">
          미르미 리스트
        </Text>
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
            onPageChange={(page) => setCurrentPage(page)}
            onSearchChange={(query) => setSearchQuery(query)}
            onUpdate={() => getUserList(currentPage, selectedUnivId, searchQuery, sorting, sortType)}
            onSortChange={handleSorting}
          />
        </div>
      </div>
    </div>
  );
}
