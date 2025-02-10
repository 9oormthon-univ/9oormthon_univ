import { BasicPagination, Button } from '@goorm-dev/vapor-components';
import NoAccess from '../../../components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import { EditIcon } from '@goorm-dev/gds-icons';
import IdeaListItem from '../../../components/hackathon/ideaList/ideaItem/IdeaListItem';
import { useState } from 'react';
import FilterDropdown from '../../../components/hackathon/ideaList/filter/FilterDropdown';
import mockIdeas from './mockIdea'; // 목업 데이터

const isTeamBuilding = true;
// 목업 데이터

export default function IdeaList() {
  const hackathonTopics = ['전체', '해커톤 주제1', '해커톤 주제2', '해커톤 주제3'];
  const statusOptions = ['전체', '모집 중', '모집 완료'];
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTopic, setSelectedTopic] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('모집 중');

  const filteredIdeas = mockIdeas.filter((idea) => {
    return (
      (selectedTopic === '전체' || idea.topic === selectedTopic) &&
      (selectedStatus === '전체' || idea.status === selectedStatus)
    );
  });

  // 한 페이지당 보여질 페이지 수
  const projectsPerPage = 8;
  // 전체 페이지 개수
  const pageLength = Math.ceil(filteredIdeas.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.mainContainer}>
      {/* 추후 이미지 */}
      <div className={styles.imgBox}></div>
      <div className={styles.listContainer}>
        {/* 필터링, 아이디어 등록 버튼 */}
        <div className={styles.listHeader}>
          <div className={styles.dropdownWrap}>
            <FilterDropdown
              options={hackathonTopics}
              selectedValue={selectedTopic}
              onChange={setSelectedTopic}
              disabled={!isTeamBuilding}
            />
            <FilterDropdown
              options={statusOptions}
              selectedValue={selectedStatus}
              onChange={setSelectedStatus}
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
            {filteredIdeas.map((idea) => (
              <IdeaListItem
                key={idea.id}
                topic={idea.topic}
                title={idea.title}
                description={idea.description}
                status={idea.status}
              />
            ))}

            <BasicPagination
              page={currentPage}
              limitCount={projectsPerPage}
              pageCount={pageLength}
              onPageChangeHandler={(currentPage: number) => handlePageChange(currentPage)}
              className={styles.basicPagination}
            />
          </div>
        ) : (
          <NoAccess />
        )}
      </div>
    </div>
  );
}
