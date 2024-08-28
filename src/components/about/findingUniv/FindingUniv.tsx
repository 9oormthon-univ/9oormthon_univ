import classNames from 'classnames';
import styled from 'styled-components';
import { THIS_SEASON } from '../../../constants/common';
import RecruitUnivScrolling from '../../recruit/recruitUnivScrolling/RecruitUnivScrolling';

import { Text } from '@goorm-dev/vapor-components';
import styles from './FindingUniv.module.scss';

const cx = classNames.bind(styles);

const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
`;

const ImageSlider = styled.div`
  display: flex;
  animation: slide 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    } // 목록의 절반만큼만 이동
  }
`;

const TEXT = `전국 ${THIS_SEASON.AMOUNT_OF_UNIV}개 대학이 \n 구름톤 유니브와 함께하고 있어요`;

function FindingUniv() {
  return (
    <div className={styles.intro}>
      <div className={styles.textContainer}>
        <Text typography="heading2" className={styles.titleText}>
          {TEXT}
        </Text>
        <Text typography="heading2" className={styles.titleSmallText}>
          {TEXT}
        </Text>
      </div>
      <RecruitUnivScrolling />
    </div>
  );
}

export default FindingUniv;
