import styles from './customFooter.module.scss';
import { GoormBlackBI } from '../../../assets';
import {
  BlogIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  BlogColorIcon,
  GithubColorIcon,
  InstagramColorIcon,
  LinkedinColorIcon,
} from '../../../assets';

function CustomFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.footerTopContainer}>
        <div className={styles.logo}>
          <GoormBlackBI width="100%" height="100%" />
        </div>
        <div className={styles.sloganContainer}>
          <p className={styles.slogan}>Being All Seasons With</p>
          <div className={styles.socialContainer}>
            <div
              className={styles.iconWrapper}
              onClick={() => window.open('https://www.instagram.com/9oormthonuniv.official/', '_blank')}>
              <InstagramIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
              <InstagramColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
            </div>
            <div
              className={styles.iconWrapper}
              onClick={() => window.open('https://9oormthonuniv.tistory.com/', '_blank')}>
              <BlogIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
              <BlogColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
            </div>
            <div
              className={styles.iconWrapper}
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/company/%EA%B5%AC%EB%A6%84%ED%86%A4-%EC%9C%A0%EB%8B%88%EB%B8%8C/',
                  '_blank',
                )
              }>
              <LinkedinIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
              <LinkedinColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
            </div>
            <div
              className={styles.iconWrapper}
              onClick={() => window.open('https://github.com/9oormthon-univ', '_blank')}>
              <GithubIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
              <GithubColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottomContainer}>
        <p className={styles.footerBottomText}>goormthonuniv.official@gmail.com</p>
        <p className={styles.footerBottomText}>ⓒ goorm Inc. All Rights Reserved.</p>
      </div>
    </div>
  );
}
export default CustomFooter;
