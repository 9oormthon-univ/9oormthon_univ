import { ChevronRightIcon, WarningIcon } from '@goorm-dev/gds-icons';
import { Alert, Button, ListGroup, ListGroupItem, SearchInput, Text } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import { LINKS } from '../../constants/common';
import { UniversityList } from '../../utilities/UnivData';

import { TypographyValue } from '@goorm-dev/gds-components/dist/types/src/components/Text/Text.type';
import useBreakpoint from '../../hooks/useBreakPoint';
import styles from './searchCard.module.scss';

export default function SearchCard() {
  const [value, setValue] = useState('');
  const [fontTypo, setFontTypo] = useState<TypographyValue[]>(['heading4', 'subtitle2']);

  const handleUnivSearch = (e: any) => {
    setValue(e.target.value);
  };

  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (breakpoint === 'xs' || breakpoint === 'sm') {
      setFontTypo(['heading4', 'subtitle2']);
    } else if (breakpoint === 'md') {
      setFontTypo(['heading3', 'subtitle2']);
    } else if (breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === 'xxl') {
      setFontTypo(['heading2', 'heading6']);
    }
  }, [breakpoint]);

  const UnivArray = UniversityList.map((item) => ({ name: item.name, link: item.link }));
  const filteredUniv = UnivArray.filter((item) => item.name.includes(value));

  return (
    <div className={styles.searchContainer}>
      <Text className={styles.titleGap} typography={fontTypo[0]}>
        나의 유니브 찾아보기
      </Text>
      <div className={styles.inputWrapper}>
        <SearchInput onChange={handleUnivSearch} value={value} size="lg" placeholder="우리 학교명으로 검색" />
        {value !== '' && (
          <div style={{ marginTop: '0.3rem' }}>
            {filteredUniv.length > 0 ? (
              <ListGroup>
                {filteredUniv.map((item) =>
                  item.link ? (
                    <ListGroupItem key={item.name} action tag="a" href={item.link} target="_blank">
                      {item.name}
                    </ListGroupItem>
                  ) : (
                    <ListGroupItem key={item.name} action tag="a" disabled style={{ color: 'var(--gray-400)' }}>
                      {item.name}
                    </ListGroupItem>
                  ),
                )}
              </ListGroup>
            ) : (
              <Alert color="danger" leftIcon={WarningIcon}>
                구름톤 유니브에 소속되어 있지 않은 학교입니다.
              </Alert>
            )}
          </div>
        )}
        <Divider />
      </div>
      <Text className="mb-3" typography={fontTypo[1]} fontWeight="regular">
        학교가 없나요? 직접 대표가 되어 함께해요!
      </Text>
      {/* 추후 업데이트 필요 */}
      <Button
        className="btn-block"
        size="xl"
        iconSide="right"
        icon={ChevronRightIcon}
        onClick={() => {
          window.open(LINKS.PRE_REGISTRATION_LINK_4TH, '_blank');
        }}>
        4기 대표 및 미르미 사전 신청하기
      </Button>
    </div>
  );
}

function Divider() {
  return (
    <div className="d-flex align-items-center justify-content-center my-4">
      <hr className="w-50 border-top var(--gray-400)" />
      <span className="mx-4 text-var(--gray-600)" style={{ color: 'var(--gray-600)' }}>
        or
      </span>
      <hr className="w-50 border-top var(--gray-400)" />
    </div>
  );
}
