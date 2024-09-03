import { ChevronDownIcon, ChevronUpIcon } from '@goorm-dev/gds-icons';
import { Collapse } from '@goorm-dev/gds-components';
import styles from './RecruitFAQ.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import FAQData from '../../../utilities/FAQData';
import React, { useState } from 'react';

const RecuritFAQ: React.FC = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

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

  return (
    <div className={styles.container}>
      <Text className={styles.titleText} as="h3" color="text-normal" typography="heading3" fontWeight="bold">
        자주 묻는 질문
      </Text>
      <div className={styles.FAQWrapper}>
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
      </div>
    </div>
  );
};

export default RecuritFAQ;
