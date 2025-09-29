import { useEffect, useState } from 'react';
import IdeaDetailHeader from '@/components/hackathon/ideaDetail/IdeaDetailHeader';
import IdeaDetailTab from '@/components/hackathon/ideaDetail/IdeaDetailTab';
import styles from './styles.module.scss';
import IdeaInfoTab from '@/components/hackathon/ideaDetail/ideaDetailInfo/IdeaInfoTab';
import TeamInfoTab from '@/components/hackathon/ideaDetail/ideaDetailInfo/TeamInfoTab';
import { useNavigate, useParams } from 'react-router-dom';
import BackLinkNavigation from '@/components/hackathon/common/BackLinkNavigation';
import { toast } from '@goorm-dev/vapor-components';
import IdeaHeaderSkeleton from '@/components/hackathon/ideaDetail/skeletonLoading/IdeaHeaderSkeleton';
import IdeaContentSkeleton from '@/components/hackathon/ideaDetail/skeletonLoading/IdeaContentSkeleton';
import IdeaTeamContentSkeleton from '@/components/hackathon/ideaDetail/skeletonLoading/IdeaTeamContentSkeleton';
import { IdeaInfoDetail, ProviderInfo, Requirements } from '@/types/user/idea';
import { useIdeaDetail } from '@/hooks/queries/useIdeaDetail';
import { useBookmarkToggle } from '@/hooks/mutations/useBookmarkToggle';

interface IdeaDetail {
  idea_info: IdeaInfoDetail;
  provider_info: ProviderInfo;
  requirements: Requirements;
}

export default function IdeaDetail() {
  const { idea_id } = useParams();
  const [activeTab, setActiveTab] = useState<'basic' | 'team'>('basic');

  const { data: ideaDetail, isLoading, isError, error } = useIdeaDetail(idea_id || '');
  const idea_info = ideaDetail?.idea_info;
  const provider_info = ideaDetail?.provider_info;
  const requirements = ideaDetail?.requirements;

  const navigate = useNavigate();
  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isError) {
      const err = error as any;
      const errorMessage = err?.response?.data?.error?.message;
      toast(errorMessage, {
        type: 'danger',
      });
      navigate('/hackathon');
    }
  }, [isError, error, navigate]);

  const { mutate: toggleBookmark } = useBookmarkToggle();

  // 북마크 토글
  const handleBookmarkToggle = async (ideaId: number) => {
    toggleBookmark(ideaId);
  };

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink="/hackathon" />
      {isLoading ? (
        <IdeaHeaderSkeleton />
      ) : (
        !isLoading &&
        ideaDetail?.idea_info &&
        provider_info && (
          <IdeaDetailHeader
            id={ideaDetail?.idea_info?.id || 0}
            subject={idea_info?.subject || '-'}
            title={idea_info?.title || '-'}
            is_active={idea_info?.is_active || false}
            summary={idea_info?.summary || '-'}
            is_bookmarked={idea_info?.is_bookmarked || false}
            name={provider_info?.name || '-'}
            university={provider_info?.univ || '-'}
            is_provider={provider_info?.is_provider || false}
            provider_id={provider_info?.id || 0}
            onBookmarkToggle={() => handleBookmarkToggle(idea_info?.id || 0)}
          />
        )
      )}

      <div className={styles.contentContainer}>
        <IdeaDetailTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={styles.tabContent}>
          {activeTab === 'basic' &&
            (isLoading ? <IdeaContentSkeleton /> : <IdeaInfoTab ideaInfo={idea_info?.content || ''} />)}
          {activeTab === 'team' &&
            (isLoading ? <IdeaTeamContentSkeleton /> : requirements && <TeamInfoTab requirements={requirements} />)}
        </div>
      </div>
      <BackLinkNavigation backLink="/hackathon" />
    </div>
  );
}
