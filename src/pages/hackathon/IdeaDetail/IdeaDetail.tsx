import { useEffect, useState } from 'react';
import IdeaDetailHeader from '../../../components/hackathon/ideaDetail/IdeaDetailHeader';
import IdeaDetailTab from '../../../components/hackathon/ideaDetail/IdeaDetailTab';
import styles from './styles.module.scss';
import IdeaInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/IdeaInfo';
import TeamInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/TeamInfo';
import { addIdeaBookmark, fetchIdeaDetailById, fetchMyIdeaDetail } from '../../../api/idea';
import { useParams } from 'react-router-dom';
import BackLinkNavigation from '../../../components/hackathon/common/BackLinkNavigation';
export default function IdeaDetail() {
  const { idea_id } = useParams();
  const [activeTab, setActiveTab] = useState<'basic' | 'team'>('basic');
  const [ideaDetail, setIdeaDetail] = useState<any>(null);
  const { idea_info, provider_info, requirements, is_provider } = ideaDetail || {};

  // 아이디어 fetch
  useEffect(() => {
    const fetchIdeaDetail = async () => {
      try {
        let response;
        if (!idea_id) {
          response = await fetchMyIdeaDetail();
        } else {
          response = await fetchIdeaDetailById(idea_id);
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
        is_provider={is_provider}
        is_bookmarked={idea_info?.is_bookmarked}
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
