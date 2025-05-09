import styles from './RecruitCalendar.module.scss';
import fourthCalendar from '../../../assets/svgs/fourthCalender.svg';
import { Text } from '@goorm-dev/vapor-components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function RecruitCalendar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // 768px 이하를 모바일로 간주

    if (!isMobile) {
      // 데스크탑 환경에서는 스크롤 이벤트 없이 바로 표시
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const mobileBreakpoints = 500; // 모바일용 브레이크포인트

      if (scrollY >= mobileBreakpoints) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Text as="h3" color="gray-900" typography="heading3" fontWeight="bold" style={{ marginLeft: 'var(--space-150)' }}>
        4기 모집 일정
      </Text>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}>
        <div className={styles.rightSection}>
          <img className={styles.calendarImg} src={fourthCalendar} alt="4기 달력" />
        </div>
        <div className={styles.leftSection}>
          <div className={styles.leftBottomSection}>
            <div className={styles.smSchedule}>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  1. 대표 모집 :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  1월 20일 ~ 2월 12일
                </Text>
              </div>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  2. 대표 OT :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  2월 23일
                </Text>
              </div>
            </div>
            <div className={styles.smSchedule}>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  3. 미르미 모집 :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  2월 26일 ~ 3월 23일
                </Text>
              </div>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  4. 전체 OT :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  3월 29일
                </Text>
              </div>
            </div>
          </div>
          <div className={styles.leftTopSection}>
            <Text className={styles.showOnLg} color="text-hint" typography="subtitle1" fontWeight="medium">
              유니브별로 모집 일정이 상이하니 <br />
              자세한 일정은 각 유니브 인스타를 참고하세요.
            </Text>
            <Text className={styles.showOnMd} as="span" color="text-hint" typography="subtitle2" fontWeight="medium">
              유니브별로 모집 일정이 상이하니 자세한 일정은 각 유니브 인스타를 참고하세요.
            </Text>
            <Text className={styles.showOnXs} as="span" color="text-hint" typography="subtitle2" fontWeight="medium">
              유니브별로 모집 일정이 상이하니 <br />
              자세한 일정은 각 유니브 인스타를 참고하세요.
            </Text>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RecruitCalendar;
