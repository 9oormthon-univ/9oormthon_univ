import styles from './styles.module.scss';
import MDEditor from '@uiw/react-md-editor';
import StackItem from '../../components/hackathon/ideaDetail/ideaDetailInfo/teamInfo/StackItem';
import { MyPageHeader } from '../../components/myPage/MyPageHeader';
import { MyPageProject } from '../../components/myPage/MyPageProject';
import { Text } from '@goorm-dev/vapor-components';

const ideaInfo = `
# 프론트엔드 개발자, 김은혜입니다!
안녕하세요. 끊임없이 배우고 성장하는 프론트엔드 개발자 김은혜입니다.

## 프로젝트

## 활동
`;

const skills = ['react', 'ts', 'nextjs', 'tailwind', 'figma', 'git'];

export default function MyPage() {
  return (
    <div className={styles.container}>
      <MyPageHeader />
      <div className={styles.content} data-color-mode="light">
        <div className={styles.contentIntroduce}>
          <Text typography="subtitle1" color="text-hint">
            자기소개
          </Text>
          <MDEditor.Markdown source={ideaInfo} />
        </div>
        <div className={styles.contentStack}>
          <Text typography="subtitle1" color="text-hint">
            기술 스택
          </Text>
          <div className={styles.contentStackContainer}>
            {skills.map((skill, index) => (
              <StackItem key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.contentProject}>
        <Text as="h6" typography="heading6" color="text-normal">
          나의 프로젝트
        </Text>
        <MyPageProject />
      </div>
    </div>
  );
}
