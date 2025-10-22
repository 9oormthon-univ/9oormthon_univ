import NotFoundImg from '@/assets/images/img-404-danpung.png';
import { Text } from '@goorm-dev/vapor-components';
import styles from './notFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainWrapper}>
        <img className={styles.img} src={NotFoundImg} alt="단풍 이미지" />
        <Text as="h3" typography="heading3" fontWeight="bold">
          페이지를 찾을 수 없습니다.
        </Text>
        <Text as="p" className={styles.textAlign} typography="body1">
          페이지의 주소가 잘못되었거나 변경되어 요청한 페이지를 찾을 수 없습니다. <br />
          해결되지 않을 시 고객센터로 연락해 주시기 바랍니다.
        </Text>
        <Text as="p" className={styles.isMobileText} typography="body1">
          페이지의 주소가 잘못되었거나 변경되어 <br /> 요청한 페이지를 찾을 수 없습니다. <br />
          해결되지 않을 시 고객센터로 연락해 주시기 바랍니다.
        </Text>
      </div>
    </div>
  );
}
