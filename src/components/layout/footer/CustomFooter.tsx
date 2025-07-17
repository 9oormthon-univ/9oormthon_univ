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
import useBreakpoint from '../../../hooks/useBreakPoint';

function CustomFooter() {
  const breakpoint = useBreakpoint();

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
              {breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' ? (
                <>
                  <InstagramIcon width="1.5rem" height="1.5rem" className={styles.defaultIcon} />
                  <InstagramColorIcon width="1.5rem" height="1.5rem" className={styles.colorIcon} />
                </>
              ) : (
                <>
                  <InstagramIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
                  <InstagramColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
                </>
              )}
            </div>
            <div
              className={styles.iconWrapper}
              onClick={() => window.open('https://9oormthonuniv.tistory.com/', '_blank')}>
              {breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' ? (
                <>
                  <BlogIcon width="1.5rem" height="1.5rem" className={styles.defaultIcon} />
                  <BlogColorIcon width="1.5rem" height="1.5rem" className={styles.colorIcon} />
                </>
              ) : (
                <>
                  <BlogIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
                  <BlogColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
                </>
              )}
            </div>
            <div
              className={styles.iconWrapper}
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/company/%EA%B5%AC%EB%A6%84%ED%86%A4-%EC%9C%A0%EB%8B%88%EB%B8%8C/',
                  '_blank',
                )
              }>
              {breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' ? (
                <>
                  <LinkedinIcon width="1.5rem" height="1.5rem" className={styles.defaultIcon} />
                  <LinkedinColorIcon width="1.5rem" height="1.5rem" className={styles.colorIcon} />
                </>
              ) : (
                <>
                  <LinkedinIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
                  <LinkedinColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
                </>
              )}
            </div>
            <div
              className={styles.iconWrapper}
              onClick={() => window.open('https://github.com/9oormthon-univ', '_blank')}>
              {breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' ? (
                <>
                  <GithubIcon width="1.5rem" height="1.5rem" className={styles.defaultIcon} />
                  <GithubColorIcon width="1.5rem" height="1.5rem" className={styles.colorIcon} />
                </>
              ) : (
                <>
                  <GithubIcon width="2.25rem" height="2.25rem" className={styles.defaultIcon} />
                  <GithubColorIcon width="2.25rem" height="2.25rem" className={styles.colorIcon} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottomContainer}>
        <p className={styles.footerBottomText}>goormthonuniv.official@gmail.com</p>
        <p className={styles.footerBottomText}>ⓒ 9oormthonUNIV Inc. All Rights Reserved.</p>
      </div>
    </div>
  );
}
export default CustomFooter;
