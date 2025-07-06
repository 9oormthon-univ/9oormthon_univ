import styles from './ideaManagement.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';
import IdeaManageTable from '../../../components/admin/ideaManagement/ideaManageTable/IdeaManageTable';
import { TopicModal } from '../../../components/admin/ideaManagement/topicModal/TopicModal';
import { useEffect, useState } from 'react';
import { GENERATION } from '../../../constants/common';
import { fetchIdeaSummaries } from '../../../api/admin/idea';
import { Idea, Sorting, SortType } from '../../../types/admin/idea';
import { PageInfo } from '../../../types/admin/idea';
import { useDebounce } from '../../../hooks/useDebounce';
import IdeaCountModal from '../../../components/admin/ideaManagement/ideaCountModal/IdeaCountModal';

export default function IdeaManagement() {
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isIdeaCountModalOpen, setIsIdeaCountModalOpen] = useState(false);
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
  const [sortType, setSortType] = useState<SortType | undefined>(undefined);
  const toggleTopicModal = () => setIsTopicModalOpen(!isTopicModalOpen);
  const toggleIdeaCountModal = () => setIsIdeaCountModalOpen(!isIdeaCountModalOpen);

  // 아이디어 목록 조회
  const getIdeaList = async (page: number, sorting?: Sorting, sortType?: SortType, search?: string) => {
    const searchParam = search?.trim() === '' ? undefined : search;
    const res = await fetchIdeaSummaries(page, 10, GENERATION, sorting, sortType, searchParam);
    setIdeaList(res.data.ideas);
    setPageInfo(res.data.page_info);
  };

  useEffect(() => {
    getIdeaList(pageInfo.current_page, sorting, sortType, debouncedSearchQuery);
  }, [pageInfo.current_page, debouncedSearchQuery, sorting, sortType]);

  // 정렬 콜백
  const handleSorting = (newSorting: Sorting) => {
    if (sorting !== newSorting) {
      setSorting(newSorting);
      setSortType('ASC');
    } else {
      setSortType(sortType === 'ASC' ? 'DESC' : 'ASC');
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
        <div className={styles.buttonContainer}>
          <Button type="button" size="md" color="secondary" onClick={toggleIdeaCountModal}>
            아이디어 개수 설정
          </Button>
          <Button type="button" size="md" color="primary" onClick={() => setIsTopicModalOpen(true)}>
            주제 관리
          </Button>
        </div>
      </div>
      <IdeaManageTable
        ideaList={ideaList}
        pageInfo={pageInfo}
        onSortChange={handleSorting}
        onPageChange={(page: number) => setPageInfo({ ...pageInfo, current_page: page })}
        onUpdate={() => getIdeaList(pageInfo.current_page, sorting, sortType, debouncedSearchQuery)}
      />
      <TopicModal isOpen={isTopicModalOpen} toggle={toggleTopicModal} />
      <IdeaCountModal isOpen={isIdeaCountModalOpen} toggle={toggleIdeaCountModal} />
    </div>
  );
}
