import { Text } from '@goorm-dev/vapor-components';
import ProjectCarousel from './ProjectCarousel';
import styles from './ProjectPreview.module.scss';

export default function ProjectPreview() {
  return (
    <div className={styles.container}>
      <div>
        <Text typography="heading2" color="gray-900">
          작은 아이디어가 현실로!
        </Text>
        <Text className={styles.textContainer} typography="heading6">
          지난 수상작들을 소개할게요
        </Text>
      </div>
      <ProjectCarousel />
    </div>
  );
}