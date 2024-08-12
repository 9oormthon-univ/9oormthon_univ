import React from 'react';
import Activity from '../../@components/about/activity/Activity.js';
import BenefitDesktop from '../../@components/about/benefit/BenefitDesktop/BenefitDesktop.js';
import BenefitMobile from '../../@components/about/benefit/BenefitMobile/BenefitMobile.js';
import FindingUniv from '../../@components/about/findingUniv/FindingUniv.js';
import Goal from '../../@components/about/goal/Goal.js';
import Intro from '../../@components/about/intro/Intro.js';

import MainBanner from '../../@components/about/mainBanner/MainBanner.js';
import PlanDesktop from '../../@components/about/plan/planDesktop/PlanDesktop.js';
import PlanMobile from '../../@components/about/plan/planMobile/PlanMobile.js';
import useMoveScroll from '../../hooks/useMoveScroll.js';

import * as S from './style.js';

export default function About() {
  const { element, onMoveToElement } = useMoveScroll();

  return (
    <S.AboutWrapper>
      <MainBanner scrollTrigger={onMoveToElement} />
      <Intro scrollTarget={element} />
      <Goal />
      <PlanDesktop />
      <PlanMobile />
      <BenefitDesktop />
      <BenefitMobile />
      <Activity />
      <FindingUniv />
    </S.AboutWrapper>
  );
}
