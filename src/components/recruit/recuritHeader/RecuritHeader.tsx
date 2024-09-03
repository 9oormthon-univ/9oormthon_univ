import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@goorm-dev/vapor-components';
import styles from './RecruitHeader.module.scss';

const REP_START_DATE = new Date('2024-08-10T10:00:00');
const REP_END_DATE = new Date('2024-08-22T19:00:00');
const TEAM_START_DATE = new Date('2024-08-01T10:00:00');
const TEAM_END_DATE = new Date('2024-08-15T10:00:00');
const REP_START_ONE_WEEK_BEFORE = new Date(REP_START_DATE.getTime() - 7 * 24 * 60 * 60 * 1000);

function RecuritHeader() {
  const [currentStatus, setCurrentStatus] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate();

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

  const handleButtonClick = () => {
    if (currentStatus === 'afterTeamRecruiting') {
      window.open('https://forms.gle/8qTowhqD5JptwGUx6', '_blank');
    } else {
      navigate('/about');
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
      oneWeekBeforeRepStart: {
        title: '곧 유니브 대표 모집 기간이예요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 대표 모집 시작',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: formatDate(REP_START_DATE),
      },
      repRecruiting: {
        title: '유니브 대표 모집 기간이예요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 대표 모집 마감',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: formatDate(REP_END_DATE),
      },
      afterRepBeforeTeam: {
        title: '곧 미르미 모집 기간이에요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 팀원 모집 시작',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: '유니브 별로 일정 상이',
      },
      teamRecruiting: {
        title: '미르미 모집 기간이예요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '우리 학교 찾아보기',
        rightTitle: '유니브 팀원 모집 마감',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: '유니브 별로 일정 상이',
      },
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
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Text
            className={`${styles.titleText} ${styles['show-on-md']}`}
            as="h1"
            typography="heading1"
            color="text-normal">
            {title}
          </Text>
          <Text
            className={`${styles.titleText} ${styles['show-on-sm']}`}
            as="h2"
            color="text-normal"
            typography="heading2"
            fontWeight="bold">
            {title}
          </Text>
          <Text
            className={`${styles.titleText} ${styles['show-on-xs']}`}
            as="h3"
            color="text-normal"
            typography="heading3"
            fontWeight="bold">
            {title}
          </Text>
          <Text className={styles.titleTextSmall} typography="heading6" color="text-hint">
            {subTitle}
          </Text>
          <div className={styles.rightSection_OnlySm}>
            <Text typography="heading4" color="text-alternative">
              {rightTitle}
            </Text>
            <Text className={styles.dDayText} color="text-alternative">
              {dDayText}
            </Text>
            <Text typography="heading6" color="text-hint">
              {rightSubtitle}
            </Text>
          </div>
          <Button className={styles.goormBtn} onClick={handleButtonClick}>
            {button}
          </Button>
        </div>

        <div className={styles.rightSection}>
          <Text typography="heading4" color="text-alternative">
            {rightTitle}
          </Text>
          <Text className={styles.dDayText} color="text-alternative">
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
