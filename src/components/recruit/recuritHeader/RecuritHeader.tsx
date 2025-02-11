import { Button, Text } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecruitHeader.module.scss';

// 유니브 대표 모집 시작
const REP_START_DATE = new Date('2025-01-20T10:00:00');
// 유니브 대표 모집 마감
const REP_END_DATE = new Date('2025-02-12T23:59:59');
// 미르미 모집 시작
const TEAM_START_DATE = new Date('2025-02-24T10:00:00'); // 임의로 설정
// 미르미 모집 마감
const TEAM_END_DATE = new Date('2025-03-23T10:00:00'); // 임의로 설정
// 대표 모집 1주 전
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
      navigate('/about'); // 추후 수정 필요
    } else {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSeg4pfokyfK0YXfOYI8GGk_ACsSdu_tcztfH_t-ODJ2cY0Sow/viewform?usp=sharing',
        '_blank',
      );
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
        title: '곧 유니브 대표 모집 기간이에요!',
        subTitle: '이번 4기 유니브 대표로 함께해요! ',
        button: '유니브 대표 지원하기',
        rightTitle: '유니브 대표 모집 시작',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: formatDate(REP_START_DATE),
      },
      repRecruiting: {
        title: '유니브 대표 모집 기간이에요!',
        subTitle: '혹은 미르미로 참여하고 싶은가요? \n미르미 사전 신청을 통해 유니브 소식을 받아보세요!',
        button: '대표 지원 및 미르미 사전 신청하기',
        rightTitle: '유니브 대표 모집 마감',
        dDayText: timeRemaining.days === 0 ? 'D-day' : `D-${timeRemaining.days}`,
        rightSubtitle: formatDate(REP_END_DATE),
      },
      afterRepBeforeTeam: {
        title: '곧 미르미 모집 기간이에요!',
        subTitle: '미르미 사전 신청을 통해 유니브 소식을 받아보세요!',
        button: '미르미 사전 신청하기',
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
        title: '4기 모집이 완료되었어요!',
        subTitle: '우리 학교가 유니브에 소속되어있는지 궁금하신가요?',
        button: '5기 사전 알림 받기',
        rightTitle: '5기 모집 시작',
        dDayText: '26년 1월',
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
          <Text
            typography="heading4"
            color="text-alternative"
            style={{ lineHeight: '1.875rem', letterSpacing: '-0.0125rem' }}>
            {rightTitle}
          </Text>
          <Text
            className={styles.dDayText}
            color="text-alternative"
            style={{ lineHeight: '3.875rem', letterSpacing: '-0.025rem', fontWeight: 'bold' }}>
            {dDayText}
          </Text>
          <Text typography="heading6" color="text-hint" style={{ lineHeight: '1.5rem', letterSpacing: '-0.00625rem' }}>
            {rightSubtitle}
          </Text>
        </div>
      </div>
    );
  };

  return renderContent();
}

export default RecuritHeader;
