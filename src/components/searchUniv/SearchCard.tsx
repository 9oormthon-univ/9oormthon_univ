import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import { Button, ListGroup, ListGroupItem, SearchInput, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import { LINKS } from '../../constants/common';
import Universities from '../../utilities/UnivData';

import styles from './SearchCard.module.scss';

export default function SearchCard() {
  const [value, setValue] = useState('');

  const handleUnivSearch = (e: any) => {
    setValue(e.target.value);
  };

  const UnivArray = Universities.map((item) => ({ name: item.name, link: item.link }));
  return (
    <div className={styles.searchContainer}>
      <Text className={styles.titleGap} typography="heading2">
        나의 유니브 찾아보기
      </Text>
      <div className={styles.inputWrapper}>
        <SearchInput onChange={handleUnivSearch} value={value} size="lg" placeholder="우리 학교명으로 검색" />
        {value !== '' && (
          <div style={{ marginTop: '0.3rem' }}>
            <ListGroup>
              {UnivArray.filter((item) => item.name.includes(value)).map((item) => (
                <ListGroupItem key={item.name} action tag="a" href={item.link} target="_blank">
                  {item.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
        <Divider />
      </div>
      <Text className="mb-3" typography="heading6" fontWeight="regular">
        학교가 없으신가요? 직접 대표가 되어 함께 해요!
      </Text>
      <Button
        className="btn-block"
        size="xl"
        iconSide="right"
        icon={ChevronRightIcon}
        onClick={() => {
          window.open(LINKS.PRE_REGISTRATION_LINK_4TH, '_blank');
        }}>
        4기 사전 신청하기
      </Button>
    </div>
  );
}

function Divider() {
  return (
    <div className="d-flex align-items-center justify-content-center m-4">
      <hr className="w-50 border-top var(--gray-400)" />
      <span className="mx-4 text-var(--gray-600)" style={{ color: 'var(--gray-600)' }}>
        or
      </span>
      <hr className="w-50 border-top var(--gray-400)" />
    </div>
  );
}
