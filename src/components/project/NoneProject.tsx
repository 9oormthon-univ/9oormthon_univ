import { Text } from '@goorm-dev/vapor-components';
import { motion } from 'framer-motion';
import imgProject from '../../assets/images/img-project.png';
import styles from './projectStyles.module.scss';

interface NoneProjectProps {
  type: 'upload' | 'project';
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function NoneProject({ type }: NoneProjectProps) {
  return (
    <motion.div
      className={styles.emptyContainer}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      variants={fadeInVariants}>
      <Text typography="heading3" color="text-normal">
        {type === 'project' ? '3번째 주인공 모집 완료!' : '3기는 프로젝트 개발중!'}
      </Text>
      <Text typography="subtitle1" color="text-alternative">
        새롭게 완성될 멋진 프로젝트들을 기대해주세요!
      </Text>
      <img className={styles.space500} src={imgProject} alt="project_Images" />
    </motion.div>
  );
}
