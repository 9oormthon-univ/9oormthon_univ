import React, { useEffect, useState } from 'react';
import styles from './teamList.module.scss';
import { Button, Input, Text, toast } from '@goorm-dev/vapor-components';
import { TeamTable } from '../../../components/admin/teamList/teamTable/TeamTable';
import TeamCreateModal from '../../../components/admin/teamList/modal/TeamCreateModal';
import { Sorting, SortType, TeamOverview } from '../../../types/admin/team';
import { assignTeamNumberAPI, fetchTeamSummaryListAPI } from '../../../api/admin/teams';
import { GENERATION } from '../../../constants/common';
import { useDebounce } from '../../../hooks/useDebounce';
import { ReloadOutlineIcon } from '@goorm-dev/vapor-icons';

export default function TeamList() {
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const toggleCreateTeam = () => setIsCreateTeamOpen((prev) => !prev);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<TeamOverview['page_info']>({
    current_page: 1,
    current_items: 0,
    page_size: 10,
    total_pages: 0,
    total_items: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [teamList, setTeamList] = useState<TeamOverview['teams']>([]);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType | undefined>(undefined);

  const handleSorting = (newSorting: Sorting) => {
    if (sorting !== newSorting) {
      setSorting(newSorting);
      setSortType(SortType.ASC);
    } else {
      setSortType(sortType === SortType.ASC ? SortType.DESC : SortType.ASC);
    }
    setCurrentPage(1);
  };

  // 팀 리스트 조회
  const fetchTeamList = async () => {
    const res = await fetchTeamSummaryListAPI(currentPage, 10, GENERATION, sorting, sortType, debouncedSearchQuery);
    setTeamList(res.data.teams);
    setPageInfo(res.data.page_info);
  };

  // 팀 리스트 조회
  useEffect(() => {
    fetchTeamList();
  }, [currentPage, debouncedSearchQuery, sorting, sortType]);

  const handleAssignTeamNumber = async () => {
    try {
      await assignTeamNumberAPI(GENERATION);
      toast('팀 번호 부여가 완료되었습니다.', {
        type: 'primary',
      });
    } catch (error: any) {
      console.error(error);
      toast('팀 번호 부여에 실패했습니다.', {
        type: 'danger',
      });
    }
    fetchTeamList();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Text typography="heading4" as="h4" color="text-normal">
          팀 리스트
        </Text>
        <Text typography="heading5" as="h5" color="text-primary">
          {pageInfo.total_items}
        </Text>
      </div>
      <div className={styles.filterContainer}>
        <Input
          size="md"
          placeholder="팀 번호, 팀 명, 서비스 명으로 검색"
          type="text"
          className={styles.searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <Button size="md" color="secondary" onClick={handleAssignTeamNumber} icon={ReloadOutlineIcon}>
            팀 번호 부여
          </Button>
          <Button size="md" color="primary" onClick={toggleCreateTeam}>
            팀 추가하기
          </Button>
        </div>
      </div>
      <TeamTable
        teamList={teamList}
        pageInfo={pageInfo}
        onPageChange={setCurrentPage}
        onSortChange={handleSorting}
        onUpdate={fetchTeamList}
      />
      <TeamCreateModal isOpen={isCreateTeamOpen} toggle={toggleCreateTeam} onUpdate={fetchTeamList} />
    </div>
  );
}
