import { Button, CarouselItem, CarouselNew } from '@goorm-dev/vapor-components';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProjects } from '../../../constants/common';
// import useIsMobile from '../../../hooks/useIsMobile';
import CardProject from '../../project/CardProject';
import styles from './projectPreview.module.scss';

export default function ProjectCarousel() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardNumber, setCardNumber] = useState(3); // 기본값 3개

  useEffect(() => {
    const updateCardNumber = () => {
      if (window.innerWidth <= 992) {
        setCardNumber(1);
      } else if (window.innerWidth <= 1200) {
        setCardNumber(2);
      } else {
        setCardNumber(3);
      }
    };

    updateCardNumber(); // 초기 실행
    window.addEventListener('resize', updateCardNumber); // 리사이즈 감지

    return () => window.removeEventListener('resize', updateCardNumber);
  }, []);

  const splitProjects = useMemo(() => {
    const result = [];
    for (let i = 0; i < allProjects.length; i += cardNumber) {
      result.push(allProjects.slice(i, i + cardNumber));
    }
    return result;
  }, [cardNumber]);

  useEffect(() => {
    setActiveIndex(0);
  }, [cardNumber]);

  const next = () => {
    const nextIndex = activeIndex === splitProjects.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = activeIndex === 0 ? splitProjects.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  if (splitProjects.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <CarouselNew ride interval={'100000'} activeIndex={activeIndex} next={next} previous={prev} items={splitProjects}>
        <CarouselNew.Indicator
          outerClassName={styles.hidden}
          itemsLength={splitProjects.length}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {splitProjects.map((projectGroup, index) => (
          <CarouselItem key={index}>
            <div className={styles.projectCarousel}>
              {projectGroup.map((project, projectIndex) => (
                <CardProject key={projectIndex} project={project} activeIndex={activeIndex} />
              ))}
            </div>
          </CarouselItem>
        ))}
        <CarouselNew.Controller prevHandler={prev} nextHandler={next} />
      </CarouselNew>
      <Button size="xl" onClick={() => navigate('/project')}>
        더 많은 프로젝트 보기
      </Button>
    </div>
  );
}
