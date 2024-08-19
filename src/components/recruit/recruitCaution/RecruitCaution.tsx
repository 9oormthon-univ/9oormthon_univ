import classNames from 'classnames/bind';
import styles from './RecruitCaution.module.scss';
import calendarGraphic from '../../../assets/svgs/img-calendar.svg';
import eventGraphic from '../../../assets/svgs/img-event.svg';
import studyGraphic from '../../../assets/svgs/img-study.svg';
import { Button } from '@goorm-dev/vapor-components';
import { ChevronRightIcon } from '@goorm-dev/vapor-icons';

const cx = classNames.bind(styles);

function RecruitCaution() {
  return (
    <div className={cx('container')}>
      <h2 className={cx('titleText')}>유의 사항</h2>
      <div>
        <div className={cx('rowLayout')}>
          {/* 카드 UI */}
          <div className={cx('cardLayout')}>
            <div>
              <h5 className={cx('cardTitleText')}>활동 기간</h5>
              <p className={cx('cardParagraph')}>
                6월부터 12월까지 <br />
                활동 가능해야 합니다.
              </p>
            </div>
            <div>
              <img className={cx('img')} src={calendarGraphic} alt="달력그래픽" />
            </div>
          </div>
          {/* 카드 UI */}
          <div className={cx('cardLayout')}>
            <div>
              <h5 className={cx('cardTitleText')}>행사 참여</h5>
              <p className={cx('cardParagraph')}>
                OT와 단풍톤에 <br />
                필수적으로 참여해야 합니다.
              </p>
            </div>
            <div>
              <img className={cx('img')} src={eventGraphic} alt="해커톤그래픽" />
            </div>
          </div>
        </div>
        {/* 카드 UI */}
        <div className={cx('cardLayout', 'widthFull')}>
          <div>
            <h5 className={cx('cardTitleText')}>스터디 참여</h5>
            <p className={cx('cardParagraph')}>
              KDC/KDT 1개 이상 수강 및 스터디 (3~4학년) <br />
              구름EDU 강의 1개 이상 수강 및 스터디(1~2학년)
            </p>
            <Button
              color="primary"
              size="lg"
              tag="button"
              iconSide="right"
              icon={ChevronRightIcon}
              className={cx('button')}>
              KDC/KDT 자세히 보기
            </Button>
          </div>
          <div>
            <img src={studyGraphic} alt="스터디그래픽" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitCaution;
