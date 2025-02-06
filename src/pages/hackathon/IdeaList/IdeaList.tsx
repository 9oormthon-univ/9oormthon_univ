import { Button } from '@goorm-dev/vapor-components';
import NoAccess from '../../../components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import { EditIcon } from '@goorm-dev/gds-icons';
import IdeaListItem from '../../../components/hackathon/ideaList/ideaItem/IdeaListItem';
import { useState } from 'react';
import FilterDropdown from '../../../components/hackathon/ideaList/filter/FilterDropdown';

const isTeamBuilding = true;
// 목업 데이터
const mockIdeas = [
  {
    id: 1,
    topic: '해커톤 주제1',
    title: 'AI 기반 코드 리뷰 시스템',
    description:
      'AI를 활용하여 코드 리뷰를 자동화하고, 개선점을 추천하는 시스템입니다. AI를 활용하여 코드 리뷰를 자동화하고, 개선점을 추천하는 시스템입니다. AI를 활용하여 코드 리뷰를 자동화하고, 개선점을 추천하는 시스템입니다. AI를 활용하여 코드 리뷰를 자동화하고, 개선점을 추천하는 시스템입니다. AI를 활용하여 코드 리뷰를 자동화하고, 개선점을 추천하는 시스템입니다.',
    status: '모집 중',
  },
  {
    id: 2,
    topic: '해커톤 주제2',
    title: '메타버스 협업 툴',
    description: 'VR을 활용한 가상 회의 플랫폼으로, 현실감 있는 원격 협업을 제공합니다.',
    status: '모집 완료',
  },
  {
    id: 3,
    topic: '해커톤 주제3',
    title: '블록체인 기반 전자 계약 시스템',
    description: '스마트 컨트랙트를 활용하여 안전한 전자 계약을 제공하는 서비스입니다.',
    status: '모집 중',
  },
];

export default function IdeaList() {
  const hackathonTopics = ['전체', '해커톤 주제1', '해커톤 주제2', '해커톤 주제3'];
  const statusOptions = ['전체', '모집 중', '모집 완료'];

  const [selectedTopic, setSelectedTopic] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('모집 중');

  const filteredIdeas = mockIdeas.filter((idea) => {
    return (
      (selectedTopic === '전체' || idea.topic === selectedTopic) &&
      (selectedStatus === '전체' || idea.status === selectedStatus)
    );
  });

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
          <Button icon={EditIcon} active={false} size="lg" href="/hackathon/create">
            아이디어 등록
          </Button>
        </div>
        {/* 팀 빌딩 기간인지에 따라 달라지는 모습 */}
        {isTeamBuilding ? (
          filteredIdeas.length > 0 &&
          filteredIdeas.map((idea) => (
            <IdeaListItem
              key={idea.id}
              topic={idea.topic}
              title={idea.title}
              description={idea.description}
              status={idea.status}
            />
          ))
        ) : (
          <NoAccess />
        )}
      </div>
    </div>
  );
}
