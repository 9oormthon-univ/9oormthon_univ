import { Alert, BasicPagination, Button, Input, Text, toast } from '@goorm-dev/vapor-components';
import NoAccess from '../../../components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import IdeaListItem from '../../../components/hackathon/ideaList/ideaItem/IdeaListItem';
import { useEffect, useState } from 'react';
import { fetchIdeas, fetchIdeaSubjects, addIdeaBookmark } from '../../../api/idea';
import ActiveFilterDropdown from '../../../components/hackathon/ideaList/filter/ActiveFilterDropdown';
import SubjectFilterDropdown from '../../../components/hackathon/ideaList/filter/SubjectFilterDropdown';
import { useNavigate } from 'react-router-dom';
import BookmarkedFilterDropdown from '../../../components/hackathon/ideaList/filter/BookmarkedFilterDropdown';
import { EditIcon, InfoCircleIcon } from '@goorm-dev/vapor-icons';
import usePeriodStore from '../../../store/usePeriodStore';
import { UserStatus, Role } from '../../../constants/role';
import useAuthStore from '../../../store/useAuthStore';
import { GENERATION } from '../../../constants/common';
import { useDebounce } from '../../../hooks/useDebounce';
import IdeaListSkeleton from '../../../components/hackathon/ideaList/skeletonLoading/IdeaListSkeleton';

// 상태별 메시지 매핑 객체 수정
const STATUS_MESSAGES: Record<Exclude<UserStatus, 'NONE'> | 'ADMIN', string> = {
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
  // 주제 가져오기
  const [hackathonTopics, setHackathonTopics] = useState<{ id: number; name: string }[]>([]);
  const [ideaList, setIdeaList] = useState<{ ideas: any[]; page_info: any }>({
    ideas: [],
    page_info: {
      current_page: 1,
      total_pages: 1,
    },
  });
  const { ideas, page_info } = ideaList;
  const [loading, setLoading] = useState(false);
  const {
    current_period,
    idea_submission_period,
    phase1_team_building_period,
    phase1_confirmation_period,
    phase2_team_building_period,
    phase2_confirmation_period,
    phase3_team_building_period,
    phase3_confirmation_period,
    fetchPeriodData,
  } = usePeriodStore(); // 기간 정보
  const { status, role, fetchUserStatus } = useAuthStore();

  // 기간 정보 문구
  const PHASE_INFO = {
    IDEA_SUBMISSION: `지금은 아이디어 제출 기간입니다. (${idea_submission_period})`,
    PHASE1_TEAM_BUILDING: `지금은 1차 팀빌딩 지원 기간입니다. (${phase1_team_building_period})`,
    PHASE1_CONFIRMATION: `지금은 1차 팀빌딩 합불 결정 기간입니다. (${phase1_confirmation_period})`,
    PHASE2_TEAM_BUILDING: `지금은 2차 팀빌딩 지원 기간입니다. (${phase2_team_building_period})`,
    PHASE2_CONFIRMATION: `지금은 2차 팀빌딩 합불 결정 기간입니다. (${phase2_confirmation_period})`,
    PHASE3_TEAM_BUILDING: `지금은 3차 팀빌딩 지원 기간입니다. (${phase3_team_building_period})`,
    PHASE3_CONFIRMATION: `지금은 3차 팀빌딩 합불 결정 기간입니다. (${phase3_confirmation_period})`,
    NONE: '해커톤 또는 팀 빌딩 기간이 아닙니다.',
  };

  // 필터링
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(true);
  const [selectedBookmark, setSelectedBookmark] = useState<boolean | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // 팀빌딩 기간인지
  const isTeamBuilding =
    current_period === 'PHASE1_TEAM_BUILDING' ||
    current_period === 'PHASE2_TEAM_BUILDING' ||
    current_period === 'PHASE3_TEAM_BUILDING' ||
    current_period === 'PHASE1_CONFIRMATION' ||
    current_period === 'PHASE2_CONFIRMATION' ||
    current_period === 'PHASE3_CONFIRMATION';

  // 한 페이지당 보여질 페이지 수
  const projectsPerPage = 8;

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 기간 정보 갱신 및 사용자 상태 조회
  useEffect(() => {
    fetchPeriodData();
    fetchUserStatus();
  }, []);

  // 주제 가져오는 api (팀빌딩 기간일 때만)
  useEffect(() => {
    if (isTeamBuilding) {
      const loadTopics = async () => {
        try {
          const response = await fetchIdeaSubjects(GENERATION);
          const activeTopics = response.data.idea_subjects.map((topic: { id: number; name: string }) => ({
            id: topic.id,
            name: topic.name,
          }));
          setHackathonTopics([{ id: 0, name: '전체 주제' }, ...activeTopics]); // "전체" 옵션 추가
        } catch (error) {
          console.error('Error fetching idea subjects:', error);
        }
      };
      loadTopics();
    }
  }, [isTeamBuilding]);

  // 아이디어 가져오는 api (팀빌딩 기간일 때만)
  useEffect(() => {
    if (isTeamBuilding) {
      const loadIdeas = async () => {
        setLoading(true);
        try {
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
        } catch (error) {
          console.error('Error fetching ideas:', error);
        } finally {
          setLoading(false);
        }
      };
      loadIdeas();
    }
  }, [selectedTopic, selectedStatus, currentPage, selectedBookmark, debouncedSearchQuery, isTeamBuilding]);

  // 페이지네이션 페이지 이동
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 아이디어 클릭 이벤트
  const handleIdeaClick = (ideaId: number) => {
    navigate(`/hackathon/detail/${ideaId}`);
  };

  // 북마크 토글 이벤트
  const handleBookmarkToggle = async (ideaId: number) => {
    setIdeaList((prevState: any) => ({
      ...prevState,
      ideas: prevState.ideas.map((idea: any) =>
        idea.id === ideaId ? { ...idea, is_bookmarked: !idea.is_bookmarked } : idea,
      ),
    }));

    try {
      await addIdeaBookmark(ideaId);
      toast('북마크 상태가 변경되었습니다.', {
        type: 'primary',
      });
    } catch (error: any) {
      console.error('Error toggling bookmark:', error);
      if (error.response) {
        const errorCode = error.response.data.error?.code;
        if (errorCode === 40013) {
          toast('본인 아이디어는 북마크 할 수 없습니다.', {
            type: 'danger',
          });
          return;
        }
      }

      setIdeaList((prevState: any) => ({
        ...prevState,
        ideas: prevState.ideas.map((idea: any) =>
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

    if (status && status !== UserStatus.NONE) {
      toast(STATUS_MESSAGES[status], { type: 'danger' });
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
        <Alert leftIcon={InfoCircleIcon} style={{ margin: 0 }}>
          {PHASE_INFO[current_period as keyof typeof PHASE_INFO]}
        </Alert>
        {/* 필터링, 아이디어 등록 버튼 */}
        <div className={styles.listHeader}>
          <div className={styles.titleContainer}>
            <Text typography="heading4" as="h4" color="text-normal">
              아이디어 리스트
            </Text>
            <div className={styles.buttonContainer}>
              <Button size="lg" onClick={handleMyIdea} className={styles.noneBtn} color="secondary">
                내 아이디어
              </Button>
              <Button icon={EditIcon} size="lg" onClick={handleCreateIdea} className={styles.noneBtn}>
                아이디어 등록
              </Button>
            </div>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.dropdownWrap}>
              <SubjectFilterDropdown
                options={hackathonTopics.map((topic) => ({ id: topic.id, name: topic.name }))}
                selectedValue={selectedTopic}
                onChange={setSelectedTopic}
                disabled={!isTeamBuilding}
              />
              <ActiveFilterDropdown
                options={statusOptions}
                selectedValue={selectedStatus}
                onChange={(value) => setSelectedStatus(value)}
                disabled={!isTeamBuilding}
              />
              <BookmarkedFilterDropdown
                options={bookmarkOptions}
                selectedValue={selectedBookmark}
                onChange={(value) => setSelectedBookmark(value)}
                disabled={!isTeamBuilding}
              />
            </div>
            <Input
              size="lg"
              placeholder="아이디어 제목, 미르미 명으로 검색"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              disabled={!isTeamBuilding}
            />
          </div>
        </div>
        {/* 팀 빌딩 기간인지에 따라 달라지는 뷰 */}
        {isTeamBuilding ? (
          ideaList.ideas.length === 0 ? (
            <NoAccess heading1="아이디어가 없어요 :(" />
          ) : (
            <div className={styles.ideaListWrap}>
              {loading ? (
                <IdeaListSkeleton />
              ) : (
                ideas?.map((idea: any) => (
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
                ))
              )}

              <BasicPagination
                page={page_info?.current_page}
                limitCount={projectsPerPage}
                pageCount={page_info?.total_pages}
                onPageChangeHandler={(currentPage: number) => handlePageChange(currentPage)}
                className={styles.basicPagination}
              />
            </div>
          )
        ) : (
          <NoAccess heading1="아직 볼 수 없어요 :(" heading2="팀빌딩 기간 시작 후 오픈됩니다." />
        )}
      </div>
    </div>
  );
}
