import { Button, CarouselItem, CarouselNew } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import { CarouselButtonLeft } from '../../../assets/svgs/carouselButtonLeft';
import { CarouselButtonRight } from '../../../assets/svgs/carouselButtonRight';
import { allProjects } from '../../../constants/common';
import CardProject from '../../project/CardProject';
import styles from './ProjectCarousel.module.scss';

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [currentCarousel, setCurrentCarousel] = useState(1);

  function splitProjects() {
    const result = [];
    for (let i = 0; i < allProjects.length; i += 3) {
      result.push(allProjects.slice(i, i + 3));
    }
    return result;
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === splitProjects().length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    if (animating) return;
    const prevIndex = activeIndex === 0 ? splitProjects().length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <div className={styles.container}>
      <CarouselNew activeIndex={activeIndex} next={next} previous={prev} items={splitProjects()}>
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
        <CarouselNew.Controller prevHandler={next} nextHandler={prev}>
          <CarouselButtonLeft />
          <CarouselButtonRight />
        </CarouselNew.Controller>
      </CarouselNew>
      <Button size="xl">더 많은 프로젝트 보기</Button>
    </div>
  );
}
