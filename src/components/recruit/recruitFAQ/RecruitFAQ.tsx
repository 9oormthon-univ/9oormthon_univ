import { ChevronDownIcon, ChevronUpIcon } from '@goorm-dev/gds-icons';
import { Collapse } from '@goorm-dev/gds-components';
import styles from './RecruitFAQ.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import FAQData from '../../../utilities/FAQData';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RecuritFAQ: React.FC = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggle = (id: number) => {
    setIsOpen(isOpen === id ? null : id);
  };

  const renderAnswer = (answer: string) => {
    return answer.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      console.log(scrollY);
      const isMobile = window.innerWidth <= 768; // 768px 미만을 모바일로 간주

      // 모바일 및 데스크탑 환경에 따른 스크롤 위치 조정
      const mobileBreakpoints = 2400; // 모바일용 브레이크포인트
      const desktopBreakpoints = 1550; // 데스크탑용 브레이크포인트

      const breakpoint = isMobile ? mobileBreakpoints : desktopBreakpoints;

      if (scrollY >= breakpoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Text className={styles.titleText} as="h3" color="text-normal" typography="heading3" fontWeight="bold">
        자주 묻는 질문
      </Text>
      <motion.div
        className={styles.FAQWrapper}
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}>
        {FAQData.map(({ id, question, answer }) => (
          <div className={styles.listWrapper} key={id} onClick={() => toggle(id)}>
            <div className={styles.questionWrapper}>
              <Text as="h5" color="text-alternative" typography="heading5" fontWeight="bold">
                Q.
              </Text>
              <Text
                className={styles.showInSm}
                as="h5"
                color="text-alternative"
                typography="heading5"
                fontWeight="bold">
                {question}
              </Text>
              <Text
                className={styles.showInXs}
                as="h6"
                color="text-alternative"
                typography="heading6"
                fontWeight="medium">
                {question}
              </Text>

              {isOpen === id ? (
                <div className={styles.iconRight}>
                  <ChevronUpIcon className="ChevronUpIcon__icon" color="#525463" width="1.5rem" height="1.5rem" />
                </div>
              ) : (
                <div className={styles.iconRight}>
                  <ChevronDownIcon className="ChevronDownIcon__icon" color="#525463" width="1.5rem" height="1.5rem" />
                </div>
              )}
            </div>
            <Collapse isOpen={isOpen === id}>
              <Text
                className={styles.answerText}
                as="p"
                color="text-alternative"
                typography="body1"
                fontWeight="regular">
                {renderAnswer(answer)}
              </Text>
            </Collapse>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecuritFAQ;
