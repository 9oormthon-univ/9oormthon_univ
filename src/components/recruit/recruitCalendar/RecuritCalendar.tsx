import classNames from 'classnames/bind';
import styles from './RecruitCalendar.module.scss';
import newCalendar from '../../../assets/images/newCalendar.png';

const cx = classNames.bind(styles);

function RecuritCalendar() {
  return (
    <div className={cx('container')}>
      <div className={cx('leftSection')}>
        <div>
          <h2 className={cx('titleText')}>3기 모집 일정</h2>
          <p className={cx('subTitleText')}>
            유니브 별로 모집일정이 상이하니
            <br /> 자세한 일정은 각 유니브 인스타를 참고하세요
          </p>
        </div>
        <div>
          <div className={cx('scheduleDiv')}>
            <h5 className={cx('bigText')}>대표 모집 : </h5>
            <h6 className={cx('smallText')}>1월 21일</h6>
          </div>
          <div className={cx('scheduleDiv')}>
            <h5 className={cx('bigText')}>대표 OT : </h5>
            <h6 className={cx('smallText')}>2월 17일</h6>
          </div>
          <div className={cx('scheduleDiv')}>
            <h5 className={cx('bigText')}>미르미 모집 : </h5>
            <h6 className={cx('smallText')}>1월 21일 - 2월 11일</h6>
          </div>
          <div className={cx('scheduleDiv')}>
            <h5 className={cx('bigText')}>전체 OT : </h5>
            <h6 className={cx('smallText')}>2월 17일</h6>
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
