import { useEffect, useState } from 'react';
import IdeaDetailHeader from '../../../components/hackathon/ideaDetail/IdeaDetailHeader';
import IdeaDetailNavigation from '../../../components/hackathon/ideaDetail/IdeaDetailNavigation';
import IdeaDetailTab from '../../../components/hackathon/ideaDetail/IdeaDetailTab';
import styles from './styles.module.scss';
import IdeaInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/IdeaInfo';
import TeamInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/TeamInfo';
import { fetchMyIdeaDetail } from '../../../api/idea';
// import { useParams } from 'react-router-dom';
export default function IdeaDetail() {
  // const { idea_id } = useParams();
  const [activeTab, setActiveTab] = useState<'basic' | 'team'>('basic');
  const [ideaDetail, setIdeaDetail] = useState<any>(null);
  const { idea_info, provider_info, requirements, is_provider } = ideaDetail || {};

  useEffect(() => {
    const fetchIdeaDetail = async () => {
      const response = await fetchMyIdeaDetail();
      setIdeaDetail(response.data);
    };
    fetchIdeaDetail();
  }, []);

  return (
    <div className={styles.container}>
      <IdeaDetailNavigation />
      <IdeaDetailHeader
        subject={idea_info?.subject}
        title={idea_info?.title}
        is_active={idea_info?.is_active}
        summary={idea_info?.summary}
        name={provider_info?.name}
        university={provider_info?.univ}
        is_provider={is_provider}
      />
      <div className={styles.contentContainer}>
        <IdeaDetailTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.tabContent}>
          {activeTab === 'basic' && <IdeaInfo ideaInfo={idea_info?.content} />}
          {activeTab === 'team' && <TeamInfo requirements={requirements} />}
        </div>
      </div>
      <IdeaDetailNavigation />
    </div>
  );
}
