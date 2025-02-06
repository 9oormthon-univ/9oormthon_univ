import { Button } from '@goorm-dev/vapor-components';
import NoAccess from '../../../components/hackathon/ideaList/noAccess/NoAccess';
import styles from './styles.module.scss';
import { EditIcon } from '@goorm-dev/gds-icons';
import IdeaListItem from '../../../components/hackathon/ideaList/ideaItem/IdeaListItem';

const isTeamBuilding = true;
// 목업 데이터
const mockIdeas = [
  {
    id: 1,
    topic: '해커톤 주제1',
    title: 'AI 기반 코드 리뷰 시스템',
    description: 'AI를 활용하여 코드 리뷰를 자동화하고, 개선점을 추천하는 시스템입니다.',
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
  return (
    <div className={styles.mainContainer}>
      {/* 추후 이미지 */}
      <div className={styles.imgBox}></div>
      <div className={styles.listContainer}>
        {/* 필터링, 아이디어 등록 버튼 */}
        <div className={styles.listHeader}>
          <Button icon={EditIcon} active={false} size="lg" href="/hackathon/create">
            아이디어 등록
          </Button>
        </div>
        {/* 팀 빌딩 기간인지에 따라 달라지는 모습 */}
        {isTeamBuilding ? (
          mockIdeas.map((idea) => (
            <div className={styles.listWrap}>
              <IdeaListItem
                key={idea.id}
                topic={idea.topic}
                title={idea.title}
                description={idea.description}
                status={idea.status}
              />
            </div>
          ))
        ) : (
          <NoAccess />
        )}
      </div>
    </div>
  );
}
