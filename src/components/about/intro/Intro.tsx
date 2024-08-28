import React from 'react';

import classNames from 'classnames/bind';
import { IntroGoormCard, IntroKakaoCard } from '../../../assets';
import styles from './Intro.module.scss';

const cx = classNames.bind(styles);

interface IntroProps {
  scrollTarget: React.RefObject<HTMLDivElement>;
}

const TEXT = `카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 \n 전국 대학 IT 연합 동아리입니다.`;

export default function Intro({ scrollTarget }: IntroProps) {
  return (
    <div className={styles.intro}>
      <h5 className={cx('title', 'd-none d-md-block text-align-center mt-4')}>9oormthonUNIV 는</h5>
      <h6 className={cx('title', 'd-block d-md-none text-align-center mt-4')}>9oormthonUNIV 는</h6>
      <div className="d-flex flex-column">
        <h3 className={cx('description', 'd-none d-md-block')}>{TEXT}</h3>
        <h4 className={cx('description', 'd-block d-md-none')}> {TEXT}</h4>
      </div>
      <div className="imageContainer">
        <div className={cx('horizontal')}>
          <div className={cx('mockTopBox', 'position-relative')}>
            <IntroKakaoCard />
          </div>
          <div className={cx('mockTopBox', 'position-relative')}>
            <IntroGoormCard />
          </div>
        </div>
        {/* TODO 제대로된 SVG 받으면 수정하기 */}
        <img className={cx('bbeotkkotImg')} src="/src/assets/svgs/introBbeotkkotCard.png" alt="introBeotkkotCard" />
      </div>
    </div>
  );
}
