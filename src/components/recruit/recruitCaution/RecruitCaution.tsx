import classNames from 'classnames/bind';
import styles from './RecruitCaution.module.scss';
import calendarGraphic from '../../../assets/svgs/img-calendar.svg';
import eventGraphic from '../../../assets/svgs/img-event.svg';
import studyGraphic from '../../../assets/svgs/img-study.svg';
import { Button } from '@goorm-dev/vapor-components';
import { ChevronRightIcon } from '@goorm-dev/vapor-icons';
import { Text } from '@goorm-dev/vapor-components';

const cx = classNames.bind(styles);

function RecruitCaution() {
  return (
    <div className={cx('container')}>
      <Text as="h3" color="text-normal" typography="heading3" fontWeight="bold">
        유의 사항
      </Text>
      <div>
        <div className={cx('rowLayout')}>
          {/* 카드 UI */}
          <div className={cx('cardLayout')}>
            <div className={cx('textLayout')}>
              {/* 반응형 적용 */}
              <Text className={cx('show-on-sm')} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                활동 기간
              </Text>
              <Text className={cx('show-on-xs')} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                활동 기간
              </Text>
              <Text className={cx('show-on-sm')} as="p" color="text-hint" typography="body1" fontWeight="regular">
                6월부터 12월까지 <br />
                활동 가능해야 합니다.
              </Text>
              <Text className={cx('show-on-xs')} as="p" color="text-hint" typography="body3" fontWeight="regular">
                6월부터 12월까지 <br />
                활동 가능해야 합니다.
              </Text>
            </div>
            <div>
              <img className={cx('img')} src={calendarGraphic} alt="달력그래픽" />
            </div>
          </div>
          {/* 카드 UI */}
          <div className={cx('cardLayout')}>
            <div className={cx('textLayout')}>
              <Text className={cx('show-on-sm')} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                행사 참여
              </Text>
              <Text className={cx('show-on-xs')} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                행사 참여
              </Text>

              <Text className={cx('show-on-sm')} as="p" color="text-hint" typography="body1" fontWeight="regular">
                OT와 단풍톤에 <br />
                필수적으로 참여해야 합니다.
              </Text>
              <Text className={cx('show-on-xs')} as="p" color="text-hint" typography="body3" fontWeight="regular">
                OT와 단풍톤에 <br />
                필수적으로 참여해야 합니다.
              </Text>
            </div>
            <div>
              <img className={cx('img')} src={eventGraphic} alt="해커톤그래픽" />
            </div>
          </div>
        </div>
        {/* 카드 UI */}
        <div className={cx('cardLayout', 'widthFull')}>
          <div className={cx('buttonLayout')}>
            <div className={cx('textLayout')}>
              <Text className={cx('show-on-sm')} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                스터디 참여
              </Text>
              <Text className={cx('show-on-xs')} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                스터디 참여
              </Text>
              <Text className={cx('show-on-sm')} as="p" color="text-hint" typography="body1" fontWeight="regular">
                KDC/KDT 1개 이상 수강 및 스터디 (3~4학년) <br />
                구름EDU 강의 1개 이상 수강 및 스터디(1~2학년)
              </Text>
              <Text className={cx('show-on-xs')} as="p" color="text-hint" typography="body3" fontWeight="regular">
                KDC/KDT 1개 이상 수강 및 스터디 (3~4학년) <br />
                구름EDU 강의 1개 이상 수강 및 스터디(1~2학년)
              </Text>
            </div>
            <div>
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
          </div>

          <div className={cx('show-on-lg')}>
            <img src={studyGraphic} alt="스터디그래픽" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitCaution;
