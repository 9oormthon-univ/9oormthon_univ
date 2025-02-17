import { BasicPagination, Button, Spinner } from '@goorm-dev/vapor-components';
import NoAccess from '../../../components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import { EditIcon } from '@goorm-dev/gds-icons';
import IdeaListItem from '../../../components/hackathon/ideaList/ideaItem/IdeaListItem';
import { useEffect, useState } from 'react';
import { fetchIdeas, fetchIdeaSubjects } from '../../../api/idea';
import ActiveFilterDropdown from '../../../components/hackathon/ideaList/filter/ActiveFilterDropdown';
import SubjectFilterDropdown from '../../../components/hackathon/ideaList/filter/SubjectFilterDropdown';

export default function IdeaList() {
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

  // 필터링
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = [
    { label: '전체', value: undefined },
    { label: '모집 중', value: true },
    { label: '모집 완료', value: false },
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

        console.log(subjectId, isActive);
        const response = await fetchIdeas(currentPage, projectsPerPage, 4, subjectId, isActive);
        setIdeaList(response.data);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadIdeas();
  }, [selectedTopic, selectedStatus, currentPage]);

  // 팀빌딩 기간인지
  const isTeamBuilding = true;
  // 한 페이지당 보여질 페이지 수
  const projectsPerPage = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
            </div>
            <Button icon={EditIcon} active={false} size="lg" href="/hackathon/create/step1" className={styles.noneBtn}>
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
    </div>
  );
}
