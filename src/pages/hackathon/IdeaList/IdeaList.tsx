import { Alert, BasicPagination, Button, Input, Text, toast, Tooltip } from '@goorm-dev/vapor-components';
import NoAccess from '@/components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import IdeaListItem from '@/components/hackathon/ideaList/ideaItem/IdeaListItem';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EditIcon, InfoCircleIcon } from '@goorm-dev/vapor-icons';
import { UserStatus, Role } from '@/constants/role';
import useAuthStore from '@/store/useAuthStore';
import { GENERATION } from '@/constants/common';
import { useDebounce } from '@/hooks/useDebounce';
import IdeaListSkeleton from '@/components/hackathon/ideaList/skeletonLoading/IdeaListSkeleton';
import { Ideas } from '@/types/user/idea';
import FilterDropdown from '@/components/common/dropdown/FilterDropdown';
import { useIdeas } from '@/hooks/queries/useIdea';
import { useBookmarkToggle } from '@/hooks/mutations/useBookmarkToggle';
import { useIdeaSubjects } from '@/hooks/queries/useIdeaSubjects';
import { usePeriod } from '@/hooks/queries/system/usePeriod';

// 상태별 메시지 매핑 객체 수정
const STATUS_MESSAGES: Record<Exclude<UserStatus, 'NONE' | 'APPLICANT_REJECTED'> | 'ADMIN', string> = {
  [UserStatus.PROVIDER]: '이미 제출된 아이디어가 있어 등록이 불가합니다.',
  [UserStatus.MEMBER]: '이미 팀이 있어 아이디어 등록이 불가합니다.',
  [UserStatus.APPLICANT]: '지원한 아이디어가 있어 등록이 불가합니다.',
  ADMIN: '관리자는 아이디어를 등록할 수 없습니다.',
} as const;

// 상태 옵션
const statusOptions = [
  { label: '모집 중', value: true },
  { label: '모집 완료', value: false },
];

// 북마크 옵션
const bookmarkOptions = [
  { label: '전체 아이디어', value: false },
  { label: '찜한 아이디어', value: true },
];

const PROJECT_PER_PAGE = 8;

export default function IdeaList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  // 필터링
  const selectedTopic = Number(searchParams.get('topic')) || 0;
  const normalizedTopic = selectedTopic === 0 ? undefined : selectedTopic;
  const selectedStatus = searchParams.get('status') !== null ? searchParams.get('status') === 'true' : true;
  const selectedBookmark = searchParams.get('bookmark') !== null ? searchParams.get('bookmark') === 'true' : false;
  const currentPage = Number(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || undefined);
  const debouncedSearchQuery = useDebounce(searchQuery || '', 500);

  // 기간 정보
  const { periodData, isAccessibility, PHASE_INFO, isLoading } = usePeriod();

  // 유저 정보
  const { status, role } = useAuthStore();

  // 주제 가져오는 api (팀빌딩 기간일 때만)
  const { data: topics, isLoading: isTopicsLoading } = useIdeaSubjects(true, isAccessibility);

  // 아이디어 가져오는 api
  const { data: ideas, isLoading: isIdeasLoading } = useIdeas(
    currentPage,
    PROJECT_PER_PAGE,
    GENERATION,
    normalizedTopic,
    selectedStatus,
    selectedBookmark,
    debouncedSearchQuery,
  );

  // 북마크 토글
  const { mutate: toggleBookmark } = useBookmarkToggle();

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // 페이지네이션 페이지 이동
  const handlePageChange = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  // 필터 변경 핸들러들
  const updateSearchParam = (key: string, value: string | undefined) => {
    if (value === undefined || value === '0') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  const handleTopicChange = (value: number | boolean | undefined) => {
    const topicValue = typeof value === 'number' ? value : undefined;
    updateSearchParam('topic', topicValue !== undefined ? String(topicValue) : undefined);
  };

  const handleStatusChange = (value: number | boolean | undefined) => {
    const boolValue = typeof value === 'boolean' ? value : undefined;
    updateSearchParam('status', boolValue !== undefined ? String(boolValue) : undefined);
  };

  const handleBookmarkChange = (value: number | boolean | undefined) => {
    const boolValue = typeof value === 'boolean' ? value : undefined;
    updateSearchParam('bookmark', boolValue !== undefined ? String(boolValue) : undefined);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchParams.set('query', query);
    setSearchParams(searchParams);
  };

  // 아이디어 클릭 이벤트
  const handleIdeaClick = (ideaId: number) => {
    navigate(`/hackathon/detail/${ideaId}`);
  };

  // 북마크 토글 이벤트
  const handleBookmarkToggle = async (ideaId: number) => {
    toggleBookmark(ideaId);
  };

  // 아이디어 등록 버튼 클릭 시 예외처리
  const handleCreateIdea = () => {
    if (role === Role.ADMIN) {
      toast(STATUS_MESSAGES.ADMIN, { type: 'danger' });
      return;
    }

    // NONE과 APPLICANT_REJECTED는 아이디어 등록 가능
    if (status && status !== UserStatus.NONE && status !== UserStatus.APPLICANT_REJECTED) {
      toast(STATUS_MESSAGES[status], { type: 'danger' });
      return;
    }

    // 최대 아이디어 개수 초과 시 등록 불가
    if (
      ideas?.max_idea_number &&
      ideas?.current_idea_number &&
      ideas?.max_idea_number - ideas?.current_idea_number <= 0
    ) {
      toast('더 이상 아이디어를 등록할 수 없습니다.', { type: 'danger' });
      return;
    }

    navigate('/hackathon/create/step1');
  };

  // 내 아이디어 버튼 클릭 시 예외처리
  const handleMyIdea = () => {
    if (status && status !== UserStatus.PROVIDER) {
      toast('등록된 아이디어가 없습니다', { type: 'danger' });
      return;
    }

    navigate('/hackathon/detail/myIdea');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.listContainer}>
        {/* 현재 기간이 어떤 기간인지 나타냄 */}
        {!isLoading && (
          <Alert leftIcon={InfoCircleIcon} style={{ margin: 0 }}>
            {PHASE_INFO[periodData?.current_period as keyof typeof PHASE_INFO]}
          </Alert>
        )}
        {/* 필터링, 아이디어 등록 버튼 */}
        <div className={styles.listHeader}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <Text typography="heading4" as="h4" color="text-normal">
                아이디어 리스트
              </Text>
              {!isIdeasLoading && ideas && (
                <div className={styles.ideaNumberContainer}>
                  <Text typography="heading5" as="p" color="text-primary">
                    {ideas?.current_idea_number}/{ideas?.max_idea_number}
                  </Text>
                  <InfoCircleIcon
                    id="idea-info-icon"
                    className={styles.infoIcon}
                    onMouseEnter={() => setTooltipOpen(true)}
                    onMouseLeave={() => setTooltipOpen(false)}
                  />
                  <Tooltip id="idea-info-icon" placement="top" hideArrow={false} isOpen={tooltipOpen} toggle={toggle}>
                    {ideas?.max_idea_number - ideas?.current_idea_number}개 등록 가능 ({ideas?.max_idea_number}개 중
                    현재 {ideas?.current_idea_number}개 등록됨)
                  </Tooltip>
                </div>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <Button size="lg" onClick={handleMyIdea} className={styles.noneBtn} color="secondary">
                내 아이디어
              </Button>
              <Button
                icon={EditIcon}
                size="lg"
                onClick={handleCreateIdea}
                className={styles.noneBtn}
                disabled={
                  import.meta.env.DEV
                    ? false
                    : periodData?.current_period === 'HACKATHON' || periodData?.current_period === 'NONE'
                }>
                아이디어 등록
              </Button>
            </div>
          </div>

          <div className={styles.mobileButtonContainer}>
            <Button size="lg" onClick={handleMyIdea} className={styles.mobileAddButton} color="secondary">
              내 아이디어
            </Button>
            <Button
              icon={EditIcon}
              size="lg"
              onClick={handleCreateIdea}
              className={styles.mobileAddButton}
              disabled={
                import.meta.env.DEV
                  ? false
                  : periodData?.current_period === 'HACKATHON' || periodData?.current_period === 'NONE'
              }>
              아이디어 등록
            </Button>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.dropdownWrap}>
              <FilterDropdown
                options={topics?.map((topic) => ({ label: topic.name, value: topic.id })) || []}
                selectedValue={selectedTopic}
                onChange={handleTopicChange}
                disabled={!isAccessibility || isTopicsLoading}
              />
              <FilterDropdown
                options={statusOptions}
                selectedValue={selectedStatus}
                onChange={handleStatusChange}
                disabled={!isAccessibility}
              />
              <FilterDropdown
                options={bookmarkOptions}
                selectedValue={selectedBookmark}
                onChange={handleBookmarkChange}
                disabled={!isAccessibility}
              />
            </div>
            <Input
              size="lg"
              placeholder="아이디어 제목으로 검색"
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={!isAccessibility}
            />
          </div>
        </div>

        {/* 팀 빌딩 기간인지에 따라 달라지는 뷰 */}
        {isIdeasLoading || isLoading ? (
          <IdeaListSkeleton />
        ) : (
          isAccessibility &&
          (ideas?.ideas.length === 0 ? (
            <NoAccess heading1="아이디어가 없어요 :(" />
          ) : (
            <div className={styles.ideaListWrap}>
              {ideas?.ideas.map((idea: Ideas) => (
                <IdeaListItem
                  key={idea.id}
                  topic={idea.subject}
                  title={idea.title}
                  description={idea.summary}
                  is_active={idea.is_active}
                  is_bookmarked={idea.is_bookmarked}
                  onClick={() => handleIdeaClick(idea.id)}
                  onBookmarkToggle={() => handleBookmarkToggle(idea.id)}
                />
              ))}

              <BasicPagination
                page={ideas?.page_info?.current_page}
                limitCount={PROJECT_PER_PAGE}
                pageCount={ideas?.page_info?.total_pages || 1}
                onPageChangeHandler={(currentPage: number) => handlePageChange(currentPage)}
                className={styles.basicPagination}
              />
            </div>
          ))
        )}
        {!isAccessibility && <NoAccess heading1="아직 볼 수 없어요 :(" heading2="팀빌딩 기간 시작 후 오픈됩니다." />}
      </div>
    </div>
  );
}
