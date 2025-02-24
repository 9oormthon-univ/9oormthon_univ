import { Text, Button } from '@goorm-dev/vapor-components';
import {
  MailIcon,
  SchoolIcon,
  BlogIcon,
  GithubIcon,
  LinkedinIcon,
  LinkOutlineIcon,
  NotionIcon,
} from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import notfound from '../../assets/images/notfound.png';

export const MyPageHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={notfound} alt="notfound" />
      </div>
      <div className={styles.headerRight}>
        <div className={styles.headerRightTop}>
          <div className={styles.headerInfo}>
            <Text as="h6" typography="heading6" color="text-normal">
              김구름
            </Text>
            <div className={styles.headerInfoEmailUniv}>
              <div className={styles.headerInfoEmailUnivItem}>
                <MailIcon />
                <Text as="p" typography="body2" color="text-alternative">
                  goormthonuniv.official@gmail.com
                </Text>
              </div>
              <div className={styles.headerInfoEmailUnivItem}>
                <SchoolIcon />
                <Text as="p" typography="body2" color="text-alternative">
                  구름대학교
                </Text>
              </div>
            </div>
          </div>
          <Button color="secondary" size="sm">
            내 정보 수정
          </Button>
        </div>
        <div className={styles.headerRightBottom}>
          <Button color="secondary" size="md" icon={NotionIcon} />
          <Button color="secondary" size="md" icon={GithubIcon} />
          <Button color="secondary" size="md" icon={LinkedinIcon} />
          <Button color="secondary" size="md" icon={BlogIcon} />
          <Button color="secondary" size="md" icon={LinkOutlineIcon} />
          <Button color="secondary" size="md" icon={LinkOutlineIcon} />
        </div>
      </div>
    </div>
  );
};
