import { Text } from '@goorm-dev/vapor-components';
import styles from './RecruitTarget.module.scss';
import ProgrammingIcon from '../../../assets/svgs/ProgrammingIcon.svg';
import ExamIcon from '../../../assets/svgs/ExamIcon.svg';
import SunIcon from '../../../assets/svgs/SunIcon.svg';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function RecuritTarget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const isMobile = window.innerWidth <= 768; // 768px 미만을 모바일로 간주

      // 모바일 및 데스크탑 환경에 따른 스크롤 위치 조정
      const mobileBreakpoints = 950; // 모바일용 브레이크포인트
      const desktopBreakpoints = 500; // 데스크탑용 브레이크포인트

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
      <Text as="h3" color="text-normal" typography="heading3" fontWeight="bold">
        4기 지원 대상
      </Text>
      <motion.div
        className={styles.bottomSection}
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}>
        <div className={styles.targetBox}>
          <img src={ProgrammingIcon} alt="Programming Icon" />
          <Text
            className={styles['show-on-lg']}
            as="h4"
            color="text-alternative"
            typography="heading4"
            fontWeight="bold">
            IT 서비스의 구현에
            <br /> 관심이 많은 대학생
          </Text>
          <Text
            className={styles['show-on-md']}
            as="h5"
            color="text-alternative"
            typography="heading5"
            fontWeight="bold">
            IT 서비스의 구현에
            <br /> 관심이 많은 대학생
          </Text>
        </div>
        <div className={styles.targetBox}>
          <img src={ExamIcon} alt="Exam Icon" />
          <Text
            className={styles['show-on-lg']}
            as="h4"
            color="text-alternative"
            typography="heading4"
            fontWeight="bold">
            타 학교 친구들과 <br />
            협업 경험을 쌓고 싶은 대학생
          </Text>
          <Text
            className={styles['show-on-md']}
            as="h5"
            color="text-alternative"
            typography="heading5"
            fontWeight="bold">
            타 학교 친구들과 <br />
            협업 경험을 쌓고 싶은 대학생
          </Text>
        </div>
        <div className={styles.targetBox}>
          <img src={SunIcon} alt="Sun Icon" />
          <Text
            className={styles['show-on-lg']}
            as="h4"
            color="text-alternative"
            typography="heading4"
            fontWeight="bold">
            열정과 성실함이 <br />
            넘치는 대학생
          </Text>
          <Text
            className={styles['show-on-md']}
            as="h5"
            color="text-alternative"
            typography="heading5"
            fontWeight="bold">
            열정과 성실함이 <br />
            넘치는 대학생
          </Text>
        </div>
      </motion.div>
    </div>
  );
}

export default RecuritTarget;
