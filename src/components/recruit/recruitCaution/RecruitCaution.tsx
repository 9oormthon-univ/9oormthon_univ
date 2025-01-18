import { Button, Text } from '@goorm-dev/vapor-components';
import { ChevronRightIcon } from '@goorm-dev/vapor-icons';
import { Link } from 'react-router-dom';
import calendarGraphic from '../../../assets/svgs/img-calendar.svg';
import eventGraphic from '../../../assets/svgs/img-event.svg';
import studyGraphic from '../../../assets/svgs/img-study.svg';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './RecruitCaution.module.scss';

function RecruitCaution() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const isMobile = window.innerWidth <= 768; // 768px 미만을 모바일로 간주

      // 모바일 및 데스크탑 환경에 따른 스크롤 위치 조정
      const mobileBreakpoints = 1700; // 모바일용 브레이크포인트
      const desktopBreakpoints = 900; // 데스크탑용 브레이크포인트

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
        유의 사항
      </Text>
      <div>
        <motion.div
          className={styles.rowLayout}
          initial={{ opacity: 0, y: 100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}>
          {/* 카드 UI */}
          <div className={styles.cardLayout}>
            <div className={styles.textLayout}>
              {/* 반응형 적용 */}
              <Text className={styles.showOnSm} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                활동 기간
              </Text>
              <Text className={styles.showOnXs} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                활동 기간
              </Text>
              <Text className={styles.showOnSm} as="p" color="text-hint" typography="body1" fontWeight="regular">
                3월부터 11월까지 <br />
                활동 가능해야 합니다.
              </Text>
              <Text className={styles.showOnXs} as="p" color="text-hint" typography="body3" fontWeight="regular">
                3월부터 11월까지 <br />
                활동 가능해야 합니다.
              </Text>
            </div>
            <div>
              <img className={styles.img} src={calendarGraphic} alt="달력그래픽" />
            </div>
          </div>
          {/* 카드 UI */}
          <div className={styles.cardLayout}>
            <div className={styles.textLayout}>
              <Text className={styles.showOnSm} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                행사 참여
              </Text>
              <Text className={styles.showOnXs} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                행사 참여
              </Text>

              <Text className={styles.showOnSm} as="p" color="text-hint" typography="body1" fontWeight="regular">
                OT, 해커톤, 데모데이에 <br />
                필수적으로 참여해야 합니다.
              </Text>
              <Text className={styles.showOnXs} as="p" color="text-hint" typography="body3" fontWeight="regular">
                OT, 해커톤, 데모데이에 <br />
                필수적으로 참여해야 합니다.
              </Text>
            </div>
            <div>
              <img className={styles.img} src={eventGraphic} alt="해커톤그래픽" />
            </div>
          </div>
        </motion.div>
        {/* 카드 UI */}
        <motion.div
          className={`${styles.cardLayout} ${styles.widthFull}`}
          initial={{ opacity: 0, y: 100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}>
          <div className={styles.buttonLayout}>
            <div className={styles.textLayout}>
              <Text className={styles.showOnSm} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                스터디 참여
              </Text>
              <Text className={styles.showOnXs} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                스터디 참여
              </Text>
              <Text className={styles.showOnSm} as="p" color="text-hint" typography="body1" fontWeight="regular">
                구름의 다양한 서비스를 활용하여 <br />
                교내 및 연합 스터디에 참여해야 합니다.
              </Text>
              <Text className={styles.showOnXs} as="p" color="text-hint" typography="body3" fontWeight="regular">
                구름의 다양한 서비스를 활용하여 <br />
                교내 및 연합 스터디에 참여해야 합니다.
              </Text>
            </div>
            <div>
              <Link to={'https://deepdive.goorm.io/'} target="\_blank">
                <Button
                  color="primary"
                  size="lg"
                  tag="button"
                  iconSide="right"
                  icon={ChevronRightIcon}
                  className={styles.button}>
                  Deep Dive 자세히보기
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.showOnLg}>
            <img src={studyGraphic} alt="스터디그래픽" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RecruitCaution;
