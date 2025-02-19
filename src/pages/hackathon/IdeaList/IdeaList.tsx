import { BasicPagination, Button, Slide, Spinner, toast, ToastContainer } from '@goorm-dev/vapor-components';
import 'react-toastify/dist/ReactToastify.min.css';
import NoAccess from '../../../components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import { EditIcon } from '@goorm-dev/gds-icons';
import IdeaListItem from '../../../components/hackathon/ideaList/ideaItem/IdeaListItem';
import { useEffect, useState } from 'react';
import { fetchIdeas, fetchIdeaSubjects, addIdeaBookmark } from '../../../api/idea';
import ActiveFilterDropdown from '../../../components/hackathon/ideaList/filter/ActiveFilterDropdown';
import SubjectFilterDropdown from '../../../components/hackathon/ideaList/filter/SubjectFilterDropdown';
import { useNavigate } from 'react-router-dom';
import BookmarkedFilterDropdown from '../../../components/hackathon/ideaList/filter/BookmarkedFilterDropdown';
import useAuthStore from '../../../store/useAuthStore';

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
  const { is_provider } = useAuthStore();

  // 필터링
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(undefined);
  const [selectedBookmark, setSelectedBookmark] = useState<boolean | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  // 상태 옵션
  const statusOptions = [
    { label: '전체', value: undefined },
    { label: '모집 중', value: true },
    { label: '모집 완료', value: false },
  ];

  // 북마크 옵션
  const bookmarkOptions = [
    { label: '전체', value: false },
    { label: '찜한 아이디어', value: true },
  ];

  // 주제 가져오는 api
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await fetchIdeaSubjects();
        const activeTopics = response.data.idea_subjects
          .filter((topic: { is_active: boolean }) => topic.is_active)
          .map((topic: { id: number; name: string }) => ({ id: topic.id, name: topic.name }));

        setHackathonTopics([{ id: null, name: '전체' }, ...activeTopics]); // "전체" 옵션 추가
      } catch (error) {
        console.error('Error fetching idea subjects:', error);
      }
    };

    loadTopics();
  }, []);

  // 아이디어 가져오는 api
  useEffect(() => {
    const loadIdeas = async () => {
      setLoading(true);
      try {
        const subjectId = selectedTopic === 0 ? undefined : selectedTopic;
        const isActive = selectedStatus === true ? true : selectedStatus === false ? false : undefined;

        const isBookmarked = selectedBookmark === true ? true : selectedBookmark === false ? false : undefined;
        const response = await fetchIdeas(currentPage, projectsPerPage, 4, subjectId, isActive, isBookmarked);
        setIdeaList(response.data);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadIdeas();
  }, [selectedTopic, selectedStatus, currentPage, selectedBookmark]);

  // 팀빌딩 기간인지
  const isTeamBuilding = true;
  // 한 페이지당 보여질 페이지 수
  const projectsPerPage = 8;

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
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      setIdeaList((prevState: any) => ({
        ...prevState,
        ideas: prevState.ideas.map((idea: any) =>
          idea.id === ideaId ? { ...idea, is_bookmarked: !idea.is_bookmarked } : idea,
        ),
      }));
    }
  };

  // 예외처리
  const message = '이미 제출된 아이디어가 있어 등록이 불가합니다.';

  //아이디어 등록 버튼 누를 때 is_provider가 true이면 alert띄우기
  const handleCreateIdea = () => {
    if (is_provider) {
      toast(message, {
        type: 'danger',
      });
    } else {
      navigate('/hackathon/create/step1');
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* 추후 이미지 */}
      <div className={styles.imgBox}></div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.listContainer}>
          {/* 필터링, 아이디어 등록 버튼 */}
          <div className={styles.listHeader}>
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
            <Button icon={EditIcon} active={false} size="lg" onClick={handleCreateIdea} className={styles.noneBtn}>
              아이디어 등록
            </Button>
          </div>
          {/* 팀 빌딩 기간인지에 따라 달라지는 모습 */}
          {isTeamBuilding ? (
            <div className={styles.ideaListWrap}>
              {ideas?.map((idea: any) => (
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
          ) : (
            <NoAccess />
          )}
        </div>
      )}
      <ToastContainer autoClose={3000} transition={Slide} closeButton={false} newestOnTop hideProgressBar />
    </div>
  );
}
