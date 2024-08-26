import styles from './signUpCard.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import Logo from '../../assets/images/goormthon_univ_BI-Bk.png';
import KakaoLogin from '../../assets/images/login/login-kakao.png';
import GoogleLogin from '../../assets/images/login/login-google.png';

export default function SearchCard() {
  return (
    <div className={styles.signUpCardContainer}>
      <img src={Logo} className={styles.logo} alt="구름톤 유니브 로고" />
      <div className={styles.loginBtnContainer}>
        <img src={KakaoLogin} className={styles.loginBtn} alt="카카오 로그인" />
        <img src={GoogleLogin} className={styles.loginBtn} alt="구글 로그인" />
        <hr className="w-100 border-bottom var(--gray-300)" />
        <Text className={styles.subText} typography="subtitle2" color="gray-600" fontWeight="regular">
          회원가입 시 구름톤 유니브의 서비스 약관 및<br></br> 개인정보 처리방침을 확인하였으며, 동의합니다.
        </Text>
      </div>
    </div>
  );
}
