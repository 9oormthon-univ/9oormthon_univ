import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { THIS_SEASON } from '../../../constants/common';
import RecruitModal from '../recruitModal/RecruitModal';
import styles from './RecruitHeader.module.scss';
import classNames from 'classnames/bind';
import { Button, Text } from '@goorm-dev/vapor-components';
import { TYPOGRAPHY } from '@goorm-dev/vapor-components/dist/types/src/components/Text/Text.constants';

const cx = classNames.bind(styles);

const REP_START_DATE = new Date('2024-08-10T10:00:00');
const REP_END_DATE = new Date('2024-08-22T19:00:00');
const TEAM_START_DATE = new Date('2024-08-01T10:00:00');
const TEAM_END_DATE = new Date('2024-08-15T10:00:00');
const REP_START_ONE_WEEK_BEFORE = new Date(REP_START_DATE.getTime() - 7 * 24 * 60 * 60 * 1000); // 대표 모집 시작 일주일 전

const TODAY = new Date();

function RecuritHeader() {
  const [currentStatus, setCurrentStatus] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return date
      .toLocaleDateString('ko-KR', options)
      .replace(/(\d{4})\s(\d{2})\s(\d{2})/, '$1.$2.$3')
      .replace(/\s/g, '') // 공백 제거
      .replace(/(\(\S+\))/, '$1 ');
  };

  const updateRemainingTime = (targetDate: Date) => {
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    const currentDate = new Date();

    if (currentDate >= REP_START_ONE_WEEK_BEFORE && currentDate < REP_START_DATE) {
      setCurrentStatus('oneWeekBeforeRepStart');
      updateRemainingTime(REP_START_DATE);
    } else if (currentDate >= REP_START_DATE && currentDate < REP_END_DATE) {
      setCurrentStatus('repRecruiting');
      updateRemainingTime(REP_END_DATE);
    } else if (currentDate >= REP_END_DATE && currentDate < TEAM_START_DATE) {
      setCurrentStatus('afterRepBeforeTeam');
      updateRemainingTime(TEAM_START_DATE);
    } else if (currentDate >= TEAM_START_DATE && currentDate < TEAM_END_DATE) {
      setCurrentStatus('teamRecruiting');
      updateRemainingTime(TEAM_END_DATE);
    } else if (currentDate >= TEAM_END_DATE) {
      setCurrentStatus('afterTeamRecruiting');
    }
  }, []);

  // 버튼 클릭시
  const handleButtonClick = () => {
    if (currentStatus === 'afterTeamRecruiting') {
      window.open('https://forms.gle/8qTowhqD5JptwGUx6', '_blank'); // 사전 알림 구글 폼 링크
    } else {
      navigate('/about'); // 모집 페이지로 이동
    }
  };

  const renderContent = () => {
    const textMapping: {
      [key: string]: {
        title: string;
        subTitle: string;
        button: string;
        rightTitle: string;
        dDayText: string;
        rightSubtitle: string;
      };
    } = {
      // 대표 모집 일주일 전
      oneWeekBeforeRepStart: {
        title: '곧 유니브 대표 모집 기간이예요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 대표 모집 시작',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: formatDate(REP_START_DATE),
      },

      // 대표 모집 기간
      repRecruiting: {
        title: '유니브 대표 모집 기간이예요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 대표 모집 마감',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: formatDate(REP_END_DATE),
      },

      // 대표 모집 마감 후, 미르미 모집 시작 전
      afterRepBeforeTeam: {
        title: '곧 미르미 모집 기간이에요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 팀원 모집 시작',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: '유니브 별로 일정 상이',
      },

      // 미르미 모집 중
      teamRecruiting: {
        title: '미르미 모집 기간이예요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 팀원 모집 마감',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: '유니브 별로 일정 상이',
      },

      // 대표 모집 마감 이후
      afterTeamRecruiting: {
        title: '3기 모집이 완료되었어요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '4기 사전 알림 받기',
        rightTitle: '4기 모집 시작',
        dDayText: '25년 1월',
        rightSubtitle: 'Coming soon!',
      },
    };

    const { title, subTitle, button, rightTitle, dDayText, rightSubtitle } = textMapping[currentStatus] || {};

    return (
      <div className={cx('container')}>
        <div className={cx('leftSection')}>
          <Text className={cx('titleText')} typography="heading1" color="text-normal">
            {title}
          </Text>
          <Text className={cx('titleTextSmall')} typography="heading6" color="text-hint">
            {subTitle}
          </Text>
          <Button className={cx('goormBtn')} onClick={handleButtonClick}>
            {button}
          </Button>
        </div>
        <div className={cx('rightSection')}>
          <Text typography="heading4" color="text-alternative">
            {rightTitle}
          </Text>
          <Text className={cx('dDayText')} color="text-alternative">
            {dDayText}
          </Text>
          <Text typography="heading6" color="text-hint">
            {rightSubtitle}
          </Text>
        </div>
      </div>
    );
  };

  return renderContent();
}

export default RecuritHeader;
