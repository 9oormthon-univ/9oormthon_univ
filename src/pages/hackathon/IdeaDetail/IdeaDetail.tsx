import { useState } from 'react';
import IdeaDetailHeader from '../../../components/hackathon/ideaDetail/IdeaDetailHeader';
import IdeaDetailNavigation from '../../../components/hackathon/ideaDetail/IdeaDetailNavigation';
import IdeaDetailTab from '../../../components/hackathon/ideaDetail/IdeaDetailTab';
import styles from './styles.module.scss';
import IdeaInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/IdeaInfo';
import TeamInfo from '../../../components/hackathon/ideaDetail/ideaDetailInfo/TeamInfo';
export default function IdeaDetail() {
  const [activeTab, setActiveTab] = useState<'basic' | 'team'>('basic');

  return (
    <div className={styles.container}>
      <IdeaDetailNavigation />
      <IdeaDetailHeader />
      <div className={styles.contentContainer}>
        <IdeaDetailTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.tabContent}>
          {activeTab === 'basic' && <IdeaInfo />}
          {activeTab === 'team' && <TeamInfo />}
        </div>
      </div>
    </div>
  );
}
