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
import { LinkType } from '../../constants/linkType';
import { useNavigate } from 'react-router-dom';
import notfound from '../../assets/images/notfound.png';

export interface Link {
  type: LinkType;
  url: string;
}

interface MyPageHeaderProps {
  name: string;
  email: string;
  univ: string;
  img_url: string;
  stack: string[];
  links: Link[];
  is_me: boolean;
}

const getLinkIcon = (type: LinkType) => {
  switch (type) {
    case LinkType.NOTION:
      return NotionIcon;
    case LinkType.GITHUB:
      return GithubIcon;
    case LinkType.LINKEDIN:
      return LinkedinIcon;
    case LinkType.BLOG:
      return BlogIcon;
    case LinkType.ETC:
      return LinkOutlineIcon;
  }
};

export const MyPageHeader = ({ name, email, univ, img_url, links, is_me }: MyPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={img_url || notfound} alt="profile" />
      </div>
      <div className={styles.headerRight}>
        <div className={styles.headerInfo}>
          <div className={styles.headerInfoName}>
            <Text as="h6" typography="heading6" color="text-normal">
              {name || '이름 없음'}
            </Text>
            {is_me && (
              <Button color="secondary" size="sm" onClick={() => navigate('/my-page/edit')}>
                내 정보 수정
              </Button>
            )}
          </div>
          <div className={styles.headerInfoEmailUniv}>
            <div className={styles.headerInfoEmailUnivItem}>
              <MailIcon width="0.875rem" height="0.875rem" />
              <Text
                as="p"
                typography="body2"
                color="text-alternative"
                className={styles.headerInfoEmailUnivItemText}
                title={email || '이메일 없음'}>
                {email || '이메일 없음'}
              </Text>
            </div>
            <div className={styles.headerInfoEmailUnivItem}>
              <SchoolIcon width="0.875rem" height="0.875rem" />
              <Text as="p" typography="body2" color="text-alternative">
                {univ || '학교 없음'}
              </Text>
            </div>
          </div>
        </div>
        <div className={styles.headerRightBottom}>
          {links.map((link) => (
            <Button
              color="secondary"
              size="md"
              icon={getLinkIcon(link.type)}
              onClick={() => window.open(link.url, '_blank')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
