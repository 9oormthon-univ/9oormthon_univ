import { useEffect, useState } from 'react';

import { BasicPagination, Text } from '@goorm-dev/vapor-components';
import CardProject from '../../components/project/CardProject';
import NoneProject from '../../components/project/NoneProject';
import TermFilterButton from '../../components/project/TermFilterButtons';
import { PROJECTS } from '../../constants/common';
import useBreakpoint from '../../hooks/useBreakPoint';
import styles from './styles.module.scss';

export default function Project() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(15);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md') {
      setProjectsPerPage(5);
    } else if (breakpoint === 'lg') {
      setProjectsPerPage(10);
    } else if (breakpoint === 'xl' || breakpoint === 'xxl') {
      setProjectsPerPage(15);
    }
  }, [breakpoint]);

  const currentProjects =
    activeIndex !== 4
      ? PROJECTS[activeIndex].slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)
      : [];

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageLength = activeIndex !== 4 ? Math.ceil(PROJECTS[activeIndex].length / projectsPerPage) : NaN;

  return (
    <div className={styles.container}>
      <Text className={styles.titleText} color="gray-900" isInheritColor={false} typography="heading1">
        프로젝트 둘러보기
      </Text>
      <div className={styles.buttonGroup}>
        {[0, 1, 2, 3].map((index) => (
          <TermFilterButton key={index} onClick={() => handleButtonClick(index)} active={activeIndex === index}>
            {index === 0 ? '전체' : `${index}기`}
          </TermFilterButton>
        ))}
      </div>
      {activeIndex !== 4 ? (
        <>
          <div className={styles.cardContainer}>
            {currentProjects.map((project, index) => (
              <CardProject key={index} project={project} activeIndex={activeIndex} currentPage={currentPage} />
            ))}
          </div>
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
  );
}
