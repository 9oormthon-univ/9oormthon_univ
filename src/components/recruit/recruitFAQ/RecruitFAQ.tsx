import { ChevronDownIcon, ChevronUpIcon } from '@goorm-dev/gds-icons';
import { Collapse } from '@goorm-dev/gds-components';
import classNames from 'classnames/bind';
import styles from './RecruitFAQ.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import FAQData from '../../../utilities/FAQData';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

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
    <div className={cx('container')}>
      <Text className={cx('titleText')} as="h3" color="text-normal" typography="heading3" fontWeight="bold">
        자주 묻는 질문
      </Text>
      <div className={cx('FAQWrapper')}>
        {FAQData.map(({ id, question, answer }) => (
          <div className={cx('listWrapper')} key={id} onClick={() => toggle(id)}>
            <div className={cx('questionWrapper')}>
              <Text as="h5" color="text-alternative" typography="heading5" fontWeight="bold">
                Q.
              </Text>
              <Text
                className={cx('show-in-sm')}
                as="h5"
                color="text-alternative"
                typography="heading5"
                fontWeight="bold">
                {question}
              </Text>
              <Text
                className={cx('show-in-xs')}
                as="h6"
                color="text-alternative"
                typography="heading6"
                fontWeight="medium">
                {question}
              </Text>

              {isOpen === id ? (
                <div className={cx('icon-right')}>
                  <ChevronUpIcon className="ChevronUpIcon__icon" color="#525463" width="1.5rem" height="1.5rem" />
                </div>
              ) : (
                <div className={cx('icon-right')}>
                  <ChevronDownIcon className="ChevronDownIcon__icon" color="#525463" width="1.5rem" height="1.5rem" />
                </div>
              )}
            </div>
            <Collapse isOpen={isOpen === id}>
              <Text
                className={cx('answerText')}
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
