import { useEffect, useState } from 'react';
import IdeaDetailHeader from '../../../components/hackathon/ideaDetail/IdeaDetailHeader';
import IdeaDetailTab from '../../../components/hackathon/ideaDetail/IdeaDetailTab';
import styles from './styles.module.scss';
import IdeaInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/IdeaInfo';
import TeamInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/TeamInfo';
import { addIdeaBookmark, fetchIdeaDetailById, fetchMyIdeaDetail } from '../../../api/idea';
import { useParams } from 'react-router-dom';
import BackLinkNavigation from '../../../components/hackathon/common/BackLinkNavigation';

const MOCK_IDEA_DETAIL = {
  idea_info: {
    id: 1,
    subject: 'AI 기반 추천 시스템',
    title: '인공지능을 활용한 맞춤 추천 서비스',
    is_active: true,
    summary: '사용자의 행동을 분석해 최적의 추천을 제공하는 AI 서비스',
    content: '이 프로젝트는 머신러닝을 활용하여 사용자 선호도를 분석하고, 맞춤형 추천을 제공하는 것을 목표로 합니다.',
    is_bookmarked: false,
  },
  provider_info: {
    id: 1,
    name: '홍길동',
    univ: '서울대학교',
    is_provider: false,
  },
  requirements: {
    pm: {
      requirement:
        '이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요!',
      current_count: 1,
      max_count: 2,
      required_tech_stacks: ['figma', 'bootstrap', 'cpp', 'cs', 'clion'],
      current_members: [
        {
          id: 1,
          img_url: 'https://via.placeholder.com/50',
          name: '김기획',
          univ: '서울대학교',
        },
        {
          id: 3,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
        {
          id: 4,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
        {
          id: 5,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
      ],
    },
    fe: {
      requirement: 'React 숙련자',
      current_count: 1,
      max_count: 2,
      required_tech_stacks: ['react', 'typescript', 'nextjs', 'nodejs', 'mongodb'],
      current_members: [
        {
          id: 2,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
      ],
    },
    be: {
      requirement: 'Node.js 경험자',
      current_count: 0,
      max_count: 2,
      required_tech_stacks: ['nodejs', 'mongodb'],
      current_members: [],
    },
    pd: {
      requirement: 'UI/UX 디자인 경험자',
      current_count: 1,
      max_count: 1,
      required_tech_stacks: ['figma', 'aws'],
      current_members: [
        {
          id: 3,
          img_url: 'https://via.placeholder.com/50',
          name: '박디자인',
          univ: '연세대학교',
        },
      ],
    },
  },
};

export default function IdeaDetail() {
  const { idea_id } = useParams();
  const [activeTab, setActiveTab] = useState<'basic' | 'team'>('basic');
  const [ideaDetail, setIdeaDetail] = useState<any>(null);
  const { idea_info, provider_info, requirements } = ideaDetail || {};

  // 아이디어 조회
  useEffect(() => {
    const fetchIdeaDetail = async () => {
      try {
        let response;

        if (import.meta.env.MODE === 'development') {
          // 개발 환경에서는 목업 데이터 반환
          response = { data: MOCK_IDEA_DETAIL };
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          // 실제 환경에서는 API 호출
          response = idea_id ? await fetchIdeaDetailById(idea_id) : await fetchMyIdeaDetail();
        }

        setIdeaDetail(response.data);
      } catch (error) {
        console.error('Error fetching idea details:', error);
      }
    };

    fetchIdeaDetail();
  }, [idea_id]);

  // 북마크 토글
  const handleBookmarkToggle = async () => {
    if (!idea_info) return;

    setIdeaDetail((prevState: any) => ({
      ...prevState,
      idea_info: {
        ...prevState.idea_info,
        is_bookmarked: !prevState.idea_info.is_bookmarked,
      },
    }));

    try {
      await addIdeaBookmark(idea_info.id);
    } catch (error) {
      console.error('Error toggling bookmark:', error);

      setIdeaDetail((prevState: any) => ({
        ...prevState,
        idea_info: {
          ...prevState.idea_info,
          is_bookmarked: !prevState.idea_info.is_bookmarked,
        },
      }));
    }
  };

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink="/hackathon" />
      <IdeaDetailHeader
        id={idea_info?.id}
        subject={idea_info?.subject}
        title={idea_info?.title}
        is_active={idea_info?.is_active}
        summary={idea_info?.summary}
        name={provider_info?.name}
        university={provider_info?.univ}
        is_provider={provider_info?.is_provider}
        is_bookmarked={idea_info?.is_bookmarked}
        provider_id={provider_info?.id}
        onBookmarkToggle={handleBookmarkToggle}
      />
      <div className={styles.contentContainer}>
        <IdeaDetailTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.tabContent}>
          {activeTab === 'basic' && <IdeaInfo ideaInfo={idea_info?.content} />}
          {activeTab === 'team' && <TeamInfo requirements={requirements} />}
        </div>
      </div>
      <BackLinkNavigation backLink="/hackathon" />
    </div>
  );
}
