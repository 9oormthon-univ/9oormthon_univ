import { Text } from '@goorm-dev/vapor-components';
import styles from './myPageProject.module.scss';

interface Project {
  title: string;
  season: string;
  hackathon: string;
  image: string;
}

interface MyPageProjectProps {
  projects: Project[];
}

export default function MyPageProject({ projects }: MyPageProjectProps) {
  return (
    <div className={styles.projectContainer}>
      <hr className={styles.divider} />
      <Text typography="heading6">나의 프로젝트</Text>
      <div className={styles.projectRow}>
        {projects.map((project, index) => (
          <div className={styles.projcetColumn} key={index}>
            <img className={styles.cardImg} src={project.image} alt={project.title} />
            <div className={styles.projectContent}>
              <Text typography="heading5">{project.title}</Text>
              <Text typography="subtitle2" color="text-hint">
                {project.season} / {project.hackathon}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
