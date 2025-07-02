import styles from './ideaManagement.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';
import IdeaManageTable from '../../../components/admin/ideaManagement/ideaManageTable/IdeaManageTable';
import { TopicModal } from '../../../components/admin/ideaManagement/topicModal/TopicModal';
import { useEffect, useState } from 'react';
import { GENERATION } from '../../../constants/common';
import { fetchIdeaSummaries } from '../../../api/admin/idea';
import { Idea, Sorting, SortOrder } from '../../../types/admin/idea';
import { PageInfo } from '../../../types/admin/idea';
import { useDebounce } from '../../../hooks/useDebounce';

export default function IdeaManagement() {
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [ideaList, setIdeaList] = useState<Idea[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_page: 1,
    page_size: 10,
    total_pages: 1,
    total_items: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined);
  const toggleTopicModal = () => {
    setIsTopicModalOpen(!isTopicModalOpen);
  };

  // 아이디어 목록 조회
  const getIdeaList = async (page: number, sorting?: Sorting, sortOrder?: SortOrder, search?: string) => {
    const res = await fetchIdeaSummaries(page, 10, GENERATION, sorting, sortOrder, search);
    setIdeaList(res.data.ideas);
    setPageInfo(res.data.page_info);
  };

  useEffect(() => {
    getIdeaList(pageInfo.current_page, sorting, sortOrder, debouncedSearchQuery);
  }, [pageInfo.current_page, debouncedSearchQuery, sorting, sortOrder]);

  // 정렬 콜백
  const handleSorting = (newSorting: Sorting) => {
    if (sorting !== newSorting) {
      setSorting(newSorting);
      setSortOrder('ASC');
    } else {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    }
    setPageInfo({ ...pageInfo, current_page: 1 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text typography="heading4" as="h4" color="text-normal">
          아이디어 관리
        </Text>
        <Text typography="heading5" as="h5" color="text-primary">
          {pageInfo.total_items}
        </Text>
      </div>
      <div className={styles.searchBox}>
        <Input
          placeholder="아이디어 명으로 검색"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <Button type="button" size="md" color="primary" onClick={() => setIsTopicModalOpen(true)}>
          주제 관리
        </Button>
      </div>
      <IdeaManageTable
        ideaList={ideaList}
        pageInfo={pageInfo}
        onSortChange={handleSorting}
        onPageChange={(page: number) => setPageInfo({ ...pageInfo, current_page: page })}
        onUpdate={() => getIdeaList(pageInfo.current_page, sorting, sortOrder, debouncedSearchQuery)}
      />
      <TopicModal isOpen={isTopicModalOpen} toggle={toggleTopicModal} />
    </div>
  );
}
