import { Text } from '@goorm-dev/vapor-components';
import styles from './Intro.module.scss';

const TEXT = `카카오와 구름, 그리고 벚꽃과 단풍이 함께하는 \n 전국 대학 IT 연합 동아리입니다.`;

export default function Intro() {
  // console.log(scrollTarget);
  return (
    <div className={styles.intro}>
      <div className={styles.title}>
        <Text typography="heading5" color="text-hint">
          9oormthonUNIV 는
        </Text>
        <Text typography="heading3">{TEXT}</Text>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.gridContainer}>
          <img src="/src/assets/svgs/introKaKaoCard.svg" alt="introGoormCard" />
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
        </div>
      </div>
    </div>
  );
}
