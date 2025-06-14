import { useEffect, useState } from 'react';
import IdeaDetailHeader from '../../../components/hackathon/ideaDetail/IdeaDetailHeader';
import IdeaDetailTab from '../../../components/hackathon/ideaDetail/IdeaDetailTab';
import styles from './styles.module.scss';
import IdeaInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/IdeaInfo';
import TeamInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/TeamInfo';
import { addIdeaBookmark, fetchIdeaDetailById, fetchMyIdeaDetail } from '../../../api/idea';
import { useParams } from 'react-router-dom';
import BackLinkNavigation from '../../../components/hackathon/common/BackLinkNavigation';
import { toast } from '@goorm-dev/vapor-components';
import IdeaHeaderSkeleton from '../../../components/hackathon/ideaDetail/skeletonLoading/IdeaHeaderSkeleton';
import IdeaContentSkeleton from '../../../components/hackathon/ideaDetail/skeletonLoading/IdeaContentSkeleton';
import IdeaTeamContentSkeleton from '../../../components/hackathon/ideaDetail/skeletonLoading/IdeaTeamContentSkeleton';

export default function IdeaDetail() {
  const { idea_id } = useParams();
  const [activeTab, setActiveTab] = useState<'basic' | 'team'>('basic');
  const [ideaDetail, setIdeaDetail] = useState<any>(null);
  const { idea_info, provider_info, requirements } = ideaDetail || {};
  const [isLoading, setIsLoading] = useState(true);

  // 아이디어 조회
  useEffect(() => {
    setIsLoading(true);
    const fetchIdeaDetail = async () => {
      try {
        const response = idea_id ? await fetchIdeaDetailById(idea_id) : await fetchMyIdeaDetail();
        setIdeaDetail(response.data);
      } catch (error) {
        console.error('Error fetching idea details:', error);
      } finally {
        setIsLoading(false);
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
      toast('북마크 상태가 변경되었습니다.', {
        type: 'primary',
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);

      setIdeaDetail((prevState: any) => ({
        ...prevState,
        idea_info: {
          ...prevState.idea_info,
          is_bookmarked: !prevState.idea_info.is_bookmarked,
        },
      }));
      toast('북마크 상태 변경에 실패했습니다.', {
        type: 'danger',
      });
    }
  };

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink="/hackathon" />
      {isLoading ? (
        <IdeaHeaderSkeleton />
      ) : (
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
      )}

      <div className={styles.contentContainer}>
        <IdeaDetailTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={styles.tabContent}>
          {activeTab === 'basic' && (isLoading ? <IdeaContentSkeleton /> : <IdeaInfo ideaInfo={idea_info?.content} />)}
          {activeTab === 'team' && (isLoading ? <IdeaTeamContentSkeleton /> : <TeamInfo requirements={requirements} />)}
        </div>
      </div>
      <BackLinkNavigation backLink="/hackathon" />
    </div>
  );
}
