import Activity from '../../components/about/activity/Activity.js';
import BenefitDesktop from '../../components/about/benefit/BenefitDesktop/BenefitDesktop.js';
import FindingUniv from '../../components/about/findingUniv/FindingUniv.js';
import Intro from '../../components/about/intro/Intro.js';

import MainBanner from '../../components/about/mainBanner/MainBanner.js';
import PlanDesktop from '../../components/about/plan/planDesktop/PlanDesktop.js';
import ProjectPreview from '../../components/about/projectPreiview/ProjectPreview.js';
import styles from './about.module.scss';

export default function About() {
  return (
    <div className={styles.container}>
      <MainBanner />
      <FindingUniv />
      <Intro />
      <PlanDesktop />
      <Activity />
      <ProjectPreview />
      <BenefitDesktop />
    </div>
  );
}
