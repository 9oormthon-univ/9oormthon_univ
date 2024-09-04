import { Status } from '@goorm-dev/gds-components';
import { Text } from '@goorm-dev/vapor-components';
import { motion } from 'framer-motion';
import DarkBadge from '../../components/common/ColoredBadge';

import { useEffect, useRef, useState } from 'react';
import styles from './projectStyles.module.scss';

interface CardProjectProps {
  project: Project;
  key: number;
  activeIndex: number;
  currentPage?: number;
}

interface Project {
  award?: string;
  title: string;
  content: string;
  backendLink: string;
  frontendLink: string;
  releaseLink?: string;
  image: any;
  pm: string;
  design: string;
  frontend: string[];
  backend: string[];
}

export default function CardProject({ project, key, activeIndex, currentPage }: CardProjectProps) {
  const { award, title, content, releaseLink, image } = project;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: key * 0.1,
      },
    },
  };

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeIndex, currentPage]);

  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      className={styles.cardContainer}
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}>
      <article className={styles.cardImg}>
        <img className={styles.cardImg} src={image} />
        {award && (
          <div className={styles.badge}>
            <DarkBadge>{award}</DarkBadge>
          </div>
        )}
      </article>
      <div className={styles.textWrapper}>
        {/* //NOTE ; 마진값 제대로 다시 확인하기 */}
        <Text className="mb-0" typography="heading3">
          {title}
        </Text>
        <Text className={styles.subText} typography="body1">
          {content}
        </Text>
        {releaseLink && <Status label="서비스 중" />}
      </div>
    </motion.div>
  );
}
