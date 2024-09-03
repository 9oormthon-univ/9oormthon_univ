import Activity from '../../components/about/activity/Activity.js';
import BenefitDesktop from '../../components/about/benefit/BenefitDesktop/BenefitDesktop.js';
import FindingUniv from '../../components/about/findingUniv/FindingUniv.js';
import Intro from '../../components/about/intro/Intro.js';

import MainBanner from '../../components/about/mainBanner/MainBanner.js';
import PlanDesktop from '../../components/about/plan/planDesktop/PlanDesktop.js';
import ProjectPreview from '../../components/about/projectPreiview/ProjectPreview.js';
import useMoveScroll from '../../hooks/useMoveScroll.js';
import styles from './about.module.scss';

export default function About() {
  const { element } = useMoveScroll();

  return (
    <div className={styles.container}>
      <MainBanner />
      <FindingUniv />
      <Intro scrollTarget={element} />
      <PlanDesktop />
      <Activity />
      <ProjectPreview />
      <BenefitDesktop />
    </div>
  );
}
