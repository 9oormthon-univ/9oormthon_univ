import { Button, CarouselItem, CarouselNew } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import { allProjects } from '../../../constants/common';
import useIsMobile from '../../../hooks/useIsMobile';
import CardProject from '../../project/CardProject';
import styles from './projectPreview.module.scss';

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);

  const { isMobile } = useIsMobile();
  const CardNumber = isMobile ? 1 : 3;

  function splitProjects() {
    const result = [];
    for (let i = 0; i < allProjects.length; i += CardNumber) {
      result.push(allProjects.slice(i, i + CardNumber));
    }
    return result;
  }

  const next = () => {
    const nextIndex = activeIndex === splitProjects().length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = activeIndex === 0 ? splitProjects().length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  return (
    <div className={styles.container}>
      <CarouselNew
        r
        ride
        interval={'3000'}
        activeIndex={activeIndex}
        next={next}
        previous={prev}
        items={splitProjects()}>
        <CarouselNew.Indicator
          outerClassName={styles.hidden}
          itemsLength={splitProjects().length}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {splitProjects().map((_, index) => (
          <CarouselItem key={index}>
            <div className={styles.projectCarousel}>
              {splitProjects()[activeIndex].map((project, index) => (
                <CardProject key={index} project={project} activeIndex={activeIndex} />
              ))}
            </div>
          </CarouselItem>
        ))}
        <CarouselNew.Controller prevHandler={next} nextHandler={prev} />
      </CarouselNew>
      <Button size="xl">더 많은 프로젝트 보기</Button>
    </div>
  );
}
