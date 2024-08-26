import classNames from 'classnames/bind';
import styles from './RecruitCalendar.module.scss';
import newCalendar from '../../../assets/images/newCalendar.png';
import { Text } from '@goorm-dev/vapor-components';

const cx = classNames.bind(styles);

function RecuritCalendar() {
  return (
    <div className={cx('container')}>
      <div className={cx('leftSection')}>
        <div className={cx('leftTopSection')}>
          <Text as="h2" color="gray-900" typography="heading2" fontWeight="bold">
            3기 모집 일정
          </Text>
          <Text color="text-hint" typography="subtitle1" fontWeight="medium">
            유니브 별로 모집일정이 상이하니
            <br /> 자세한 일정은 각 유니브 인스타를 참고하세요
          </Text>
        </div>
        <div className={cx('leftBottomSection')}>
          <div className={cx('scheduleDiv')}>
            <Text as="h5" color="text-alternative" typography="heading5" fontWeight="bold">
              대표 모집 :
            </Text>
            <Text as="h6" color="text-hint" typography="heading6" fontWeight="medium">
              1월 21일
            </Text>
          </div>
          <div className={cx('scheduleDiv')}>
            <Text as="h5" color="text-alternative" typography="heading5" fontWeight="bold">
              대표 OT :
            </Text>
            <Text as="h6" color="text-hint" typography="heading6" fontWeight="medium">
              2월 17일
            </Text>
          </div>
          <div className={cx('scheduleDiv')}>
            <Text as="h5" color="text-alternative" typography="heading5" fontWeight="bold">
              미르미 모집 :
            </Text>
            <Text as="h6" color="text-hint" typography="heading6" fontWeight="medium">
              1월 21일 - 2월 11일
            </Text>
          </div>
          <div className={cx('scheduleDiv')}>
            <Text as="h5" color="text-alternative" typography="heading5" fontWeight="bold">
              전체 OT :
            </Text>
            <Text as="h6" color="text-hint" typography="heading6" fontWeight="medium">
              2월 17일
            </Text>
          </div>
        </div>
      </div>
      <div className={cx('rightSection')}>
        <img className={cx('calendarImg')} src={newCalendar} alt="4기 달력" />
      </div>
    </div>
  );
}

export default RecuritCalendar;
