import styles from './RecruitCalendar.module.scss';
import newCalendar from '../../../assets/images/newCalendar.png';
import { Text } from '@goorm-dev/vapor-components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function RecuritCalendar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const isMobile = window.innerWidth <= 768; // 768px 미만을 모바일로 간주

      // 모바일 및 데스크탑 환경에 따른 스크롤 위치 조정
      const mobileBreakpoints = 500; // 모바일용 브레이크포인트
      const desktopBreakpoints = 50; // 데스크탑용 브레이크포인트

      const breakpoint = isMobile ? mobileBreakpoints : desktopBreakpoints;

      if (scrollY >= breakpoint) {
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
      <Text as="h3" color="gray-900" typography="heading3" fontWeight="bold">
        3기 모집 일정
      </Text>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}>
        <div className={styles.rightSection}>
          <img className={styles.calendarImg} src={newCalendar} alt="4기 달력" />
        </div>
        <div className={styles.leftSection}>
          <div className={styles.leftBottomSection}>
            <div className={styles.smSchedule}>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  1. 대표 모집 :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  1월 21일 ~ 1월 30일
                </Text>
              </div>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  2. 대표 OT :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  2월 17일
                </Text>
              </div>
            </div>
            <div className={styles.smSchedule}>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  3. 미르미 모집 :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  1월 21일 - 2월 11일
                </Text>
              </div>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  4. 전체 OT :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  2월 17일
                </Text>
              </div>
            </div>
          </div>
          <div className={styles.leftTopSection}>
            <Text className={styles.showOnLg} color="text-hint" typography="subtitle1" fontWeight="medium">
              유니브 별로 모집일정이 상이하니
              <br /> 자세한 일정은 각 유니브 인스타를 참고하세요
            </Text>
            <Text className={styles.showOnMd} as="span" color="text-hint" typography="subtitle2" fontWeight="medium">
              유니브 별로 모집일정이 상이하니 자세한 일정은 각 유니브 인스타를 참고하세요
            </Text>
            <Text className={styles.showOnXs} as="span" color="text-hint" typography="subtitle2" fontWeight="medium">
              유니브 별로 모집일정이 상이하니 자세한 일정은 <br /> 각 유니브 인스타를 참고하세요
            </Text>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RecuritCalendar;
