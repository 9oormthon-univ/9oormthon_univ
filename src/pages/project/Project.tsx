import { useState } from 'react';

import { BasicPagination, Button, Text } from '@goorm-dev/vapor-components';
import CardProject from '../../components/project/CardProject';
import NoneProject from '../../components/project/NoneProject';
import { PROJECTS } from '../../constants/common';
import styles from './styles.module.scss';

export default function Project() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 15;

  const currentProjects =
    activeIndex !== 3
      ? PROJECTS[activeIndex].slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)
      : [];

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageLength = activeIndex !== 3 ? Math.ceil(PROJECTS[activeIndex].length / 15) : NaN;

  return (
    <>
      {/* <ModalProject /> */}
      <Text className={styles.titleText} color="gray-900" isInheritColor={false} typography="heading1">
        프로젝트 둘러보기
      </Text>
      <div className={styles.buttonGroup}>
        {[0, 1, 2, 3].map((index) => (
          <Button
            key={index}
            color="info"
            size="lg"
            onClick={() => handleButtonClick(index)}
            active={activeIndex === index}>
            {index === 0 ? '전체' : `${index}기`}
          </Button>
        ))}
      </div>
      <div className={styles.projectContainer}>
        {activeIndex !== 3 ? (
          <>
            {currentProjects.map((project, index) => (
              <CardProject key={index} project={project} activeIndex={activeIndex} currentPage={currentPage} />
            ))}
            <div className={styles.emptyContainer}>
              <BasicPagination
                pageCount={pageLength}
                page={currentPage}
                onPageChangeHandler={(currentPage: number) => handlePageChange(currentPage)}
              />
            </div>
          </>
        ) : (
          <NoneProject type="upload" />
        )}
      </div>
    </>
  );
}
