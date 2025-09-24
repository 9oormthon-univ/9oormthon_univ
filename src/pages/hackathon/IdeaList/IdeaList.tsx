import { Alert, BasicPagination, Button, Input, Text, toast, Tooltip } from '@goorm-dev/vapor-components';
import NoAccess from '../../../components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import IdeaListItem from '../../../components/hackathon/ideaList/ideaItem/IdeaListItem';
import { useEffect, useState } from 'react';
import { fetchIdeas, addIdeaBookmark } from '../../../api/idea';
import ActiveFilterDropdown from '../../../components/hackathon/ideaList/filter/ActiveFilterDropdown';
import SubjectFilterDropdown from '../../../components/hackathon/ideaList/filter/SubjectFilterDropdown';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookmarkedFilterDropdown from '../../../components/hackathon/ideaList/filter/BookmarkedFilterDropdown';
import { EditIcon, InfoCircleIcon } from '@goorm-dev/vapor-icons';
import usePeriodStore from '../../../store/usePeriodStore';
import { UserStatus, Role } from '../../../constants/role';
import useAuthStore from '../../../store/useAuthStore';
import { GENERATION } from '../../../constants/common';
import { useDebounce } from '../../../hooks/useDebounce';
import IdeaListSkeleton from '../../../components/hackathon/ideaList/skeletonLoading/IdeaListSkeleton';
import { Ideas, PageInfo } from '../../../types/user/idea';
import { mockIdeas } from '../../../constants/mockData';
import { filterMockIdeas, updateMockIdeaBookmark } from '../../../utilities/mockUtils';
import { useIdeaSubjects } from '@/hooks/queries/useIdeaSubjects';

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
  { label: '전체 아이디어', value: undefined },
  { label: '찜한 아이디어', value: true },
];

export default function IdeaList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 주제 가져오기
  const [ideaList, setIdeaList] = useState<{ ideas: Ideas[]; page_info: PageInfo }>({
    ideas: [],
    page_info: { current_page: 1, page_size: 1, total_pages: 1, total_items: 1 },
  });
  const { ideas, page_info } = ideaList;
  const [max_idea_number, setMaxIdeaNumber] = useState<number>(0);
  const [current_idea_number, setCurrentIdeaNumber] = useState<number>(0);

  // 로딩 상태
  const [ideasLoading, setIdeasLoading] = useState(false); // 아이디어 리스트

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const {
    current_period,
    idea_submission_period,
    phase1_team_building_period,
    phase1_confirmation_period,
    phase2_team_building_period,
    phase2_confirmation_period,
    phase3_team_building_period,
    phase3_confirmation_period,
    hackathon_period,
    isLoading,
  } = usePeriodStore(); // 기간 정보
  const { status, role } = useAuthStore();

  // 기간 정보 문구
  const PHASE_INFO = {
    IDEA_SUBMISSION: `지금은 아이디어 제출 기간입니다. (${idea_submission_period})`,
    PHASE1_TEAM_BUILDING: `지금은 1차 팀빌딩 지원 기간입니다. (${phase1_team_building_period})`,
    PHASE1_CONFIRMATION: `지금은 1차 팀빌딩 합불 결정 기간입니다. (${phase1_confirmation_period})`,
    PHASE2_TEAM_BUILDING: `지금은 2차 팀빌딩 지원 기간입니다. (${phase2_team_building_period})`,
    PHASE2_CONFIRMATION: `지금은 2차 팀빌딩 합불 결정 기간입니다. (${phase2_confirmation_period})`,
    PHASE3_TEAM_BUILDING: `지금은 3차 팀빌딩 지원 기간입니다. (${phase3_team_building_period})`,
    PHASE3_CONFIRMATION: `지금은 3차 팀빌딩 합불 결정 기간입니다. (${phase3_confirmation_period})`,
    HACKATHON: `팀 빌딩 기간이 종료되었습니다. (${hackathon_period})`,
    NONE: '해커톤 또는 팀 빌딩 기간이 아닙니다.',
  };

  // 필터링
  const selectedTopic = Number(searchParams.get('topic')) || 0;
  const selectedStatus = searchParams.get('status') !== null ? searchParams.get('status') === 'true' : true;
  const selectedBookmark = searchParams.get('bookmark') !== null ? searchParams.get('bookmark') === 'true' : undefined;
  const currentPage = Number(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // 팀빌딩 기간인지
  // 개발 환경에서는 항상 팀빌딩 기간으로 설정
  const isTeamBuilding = import.meta.env.DEV
    ? true
    : current_period === 'PHASE1_TEAM_BUILDING' ||
      current_period === 'PHASE2_TEAM_BUILDING' ||
      current_period === 'PHASE3_TEAM_BUILDING' ||
      current_period === 'PHASE1_CONFIRMATION' ||
      current_period === 'PHASE2_CONFIRMATION' ||
      current_period === 'PHASE3_CONFIRMATION' ||
      current_period === 'HACKATHON';

  // 한 페이지당 보여질 페이지 수
  const projectsPerPage = 8;

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 주제 가져오는 api (팀빌딩 기간일 때만)
  const { data: topics, isLoading: isTopicsLoading } = useIdeaSubjects(true, isTeamBuilding);

  // 아이디어 가져오는 api
  useEffect(() => {
    const loadIdeas = async () => {
      setIdeasLoading(true);
      try {
        if (import.meta.env.DEV) {
          // 개발 환경에서는 mock 데이터 사용
          const mockResult = filterMockIdeas(
            mockIdeas,
            selectedTopic,
            selectedStatus,
            selectedBookmark,
            debouncedSearchQuery,
            currentPage,
            projectsPerPage,
          );
          setIdeaList(mockResult);
          setMaxIdeaNumber(50); // mock 최대 아이디어 수
          setCurrentIdeaNumber(8); // mock 현재 아이디어 수
        } else {
          const subjectId = selectedTopic === 0 ? undefined : selectedTopic;
          const isActive = selectedStatus === true ? true : selectedStatus === false ? false : undefined;
          const isBookmarked = selectedBookmark === true ? true : undefined;

          const response = await fetchIdeas(
            currentPage,
            projectsPerPage,
            GENERATION,
            subjectId,
            isActive,
            isBookmarked,
            debouncedSearchQuery,
          );
          setIdeaList(response.data);
          setMaxIdeaNumber(response.data.max_idea_number || 0);
          setCurrentIdeaNumber(response.data.current_idea_number || 0);
        }
      } catch (error: any) {
        if (import.meta.env.DEV) {
          console.log(error);
        }
      } finally {
        setIdeasLoading(false);
      }
    };
    loadIdeas();
  }, [selectedTopic, selectedStatus, currentPage, selectedBookmark, debouncedSearchQuery]);

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
  const handleTopicChange = (value: number) => {
    if (value === 0) {
      searchParams.delete('topic');
    } else {
      searchParams.set('topic', String(value));
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleStatusChange = (value: boolean | undefined) => {
    if (value === undefined) {
      searchParams.delete('status');
    } else {
      searchParams.set('status', String(value));
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleBookmarkChange = (value: boolean | undefined) => {
    if (value === undefined) {
      searchParams.delete('bookmark');
    } else {
      searchParams.set('bookmark', String(value));
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchParams.set('query', query);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  // 아이디어 클릭 이벤트
  const handleIdeaClick = (ideaId: number) => {
    navigate(`/hackathon/detail/${ideaId}`);
  };

  // 북마크 토글 이벤트
  const handleBookmarkToggle = async (ideaId: number) => {
    setIdeaList((prevState: { ideas: Ideas[]; page_info: PageInfo }) => ({
      ...prevState,
      ideas: prevState.ideas.map((idea: Ideas) =>
        idea.id === ideaId ? { ...idea, is_bookmarked: !idea.is_bookmarked } : idea,
      ),
    }));

    try {
      if (import.meta.env.DEV) {
        updateMockIdeaBookmark(mockIdeas, ideaId);

        toast('북마크 상태가 변경되었습니다.', {
          type: 'primary',
        });
      } else {
        await addIdeaBookmark(ideaId);
        toast('북마크 상태가 변경되었습니다.', {
          type: 'primary',
        });
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.log(error);
      }
      if (error.response) {
        const errorCode = error.response.data.error?.code;
        if (errorCode === 40013) {
          toast('본인 아이디어는 북마크 할 수 없습니다.', {
            type: 'danger',
          });
          return;
        }
      }

      setIdeaList((prevState: { ideas: Ideas[]; page_info: PageInfo }) => ({
        ...prevState,
        ideas: prevState.ideas.map((idea: Ideas) =>
          idea.id === ideaId ? { ...idea, is_bookmarked: !idea.is_bookmarked } : idea,
        ),
      }));
      toast('북마크 상태 변경에 실패했습니다.', {
        type: 'danger',
      });
    }
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
    if (max_idea_number - current_idea_number <= 0) {
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
            {PHASE_INFO[current_period as keyof typeof PHASE_INFO]}
          </Alert>
        )}
        {/* 필터링, 아이디어 등록 버튼 */}
        <div className={styles.listHeader}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <Text typography="heading4" as="h4" color="text-normal">
                아이디어 리스트
              </Text>
              {!ideasLoading && (
                <div className={styles.ideaNumberContainer}>
                  <Text typography="heading5" as="p" color="text-primary">
                    {current_idea_number}/{max_idea_number}
                  </Text>
                  <InfoCircleIcon
                    id="idea-info-icon"
                    className={styles.infoIcon}
                    onMouseEnter={() => setTooltipOpen(true)}
                    onMouseLeave={() => setTooltipOpen(false)}
                  />
                  <Tooltip id="idea-info-icon" placement="top" hideArrow={false} isOpen={tooltipOpen} toggle={toggle}>
                    {max_idea_number - current_idea_number}개 등록 가능 ({max_idea_number}개 중 현재{' '}
                    {current_idea_number}개 등록됨)
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
                disabled={import.meta.env.DEV ? false : current_period === 'HACKATHON' || current_period === 'NONE'}>
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
              disabled={import.meta.env.DEV ? false : current_period === 'HACKATHON' || current_period === 'NONE'}>
              아이디어 등록
            </Button>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.dropdownWrap}>
              <SubjectFilterDropdown
                options={topics || []}
                selectedValue={selectedTopic}
                onChange={handleTopicChange}
                disabled={!isTeamBuilding || isTopicsLoading}
              />
              <ActiveFilterDropdown
                options={statusOptions}
                selectedValue={selectedStatus}
                onChange={handleStatusChange}
                disabled={!isTeamBuilding}
              />
              <BookmarkedFilterDropdown
                options={bookmarkOptions}
                selectedValue={selectedBookmark}
                onChange={handleBookmarkChange}
                disabled={!isTeamBuilding}
              />
            </div>
            <Input
              size="lg"
              placeholder="아이디어 제목으로 검색"
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={!isTeamBuilding}
            />
          </div>
        </div>
        {/* 팀 빌딩 기간인지에 따라 달라지는 뷰 */}
        {ideasLoading ? (
          <IdeaListSkeleton />
        ) : (
          isTeamBuilding &&
          (ideaList.ideas.length === 0 ? (
            <NoAccess heading1="아이디어가 없어요 :(" />
          ) : (
            <div className={styles.ideaListWrap}>
              {ideas?.map((idea: Ideas) => (
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
                page={page_info?.current_page}
                limitCount={projectsPerPage}
                pageCount={page_info?.total_pages}
                onPageChangeHandler={(currentPage: number) => handlePageChange(currentPage)}
                className={styles.basicPagination}
              />
            </div>
          ))
        )}
        {!isTeamBuilding && <NoAccess heading1="아직 볼 수 없어요 :(" heading2="팀빌딩 기간 시작 후 오픈됩니다." />}
      </div>
    </div>
  );
}
