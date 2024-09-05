import { Text } from '@goorm-dev/vapor-components';
import { motion } from 'framer-motion';
import styles from './Intro.module.scss';
const TEXT = `카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 \n 전국 대학 IT 연합 동아리입니다.`;

export default function Intro() {
  const itemAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className={styles.intro}>
      <div className={styles.title}>
        <Text typography="heading5" color="text-hint">
          9oormthonUNIV 는
        </Text>
        <Text typography="heading3">{TEXT}</Text>
      </div>
      <div className={styles.imageContainer}>
        <motion.div
          className={styles.gridContainer}
          initial="hidden"
          animate={'visible'}
          transition={{ duration: 0.85 }}
          variants={itemAnimation}>
          <img src="/src/assets/svgs/introKaKaoCard.svg" alt="introKakaoCard" />
          <img src="/src/assets/svgs/introGoormCard.svg" alt="introGoormCard" />
          <img
            className={styles.fullImgBoxDesktop}
            src="/src/assets/svgs/introBbeotkkotCard.png"
            alt="introBeotkkotCard"
          />
          <img
            className={styles.fullImgBoxMobile}
            src="/src/assets/images/introUnivImageMobile.png"
            alt="introBeotkkotCard"
          />
        </motion.div>
      </div>
    </div>
  );
}
