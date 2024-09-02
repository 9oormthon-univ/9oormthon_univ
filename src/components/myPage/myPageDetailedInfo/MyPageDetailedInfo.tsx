import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import styles from './myPageDetailedInfo.module.scss';
import {
  Text,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
  ListGroup,
  Alert,
} from '@goorm-dev/vapor-components';
import { PlusIcon, WarningIcon } from '@goorm-dev/gds-icons';
import errorCircleIcon from '../../../assets/svgs/ErrorCircleIcon.svg';
import Universities from '../../../utilities/UnivData';

interface SeasonPartSelection {
  selectedSeason: string;
  selectedPart: string;
}

interface MyPageDetailedInfoProps {
  onInfoChange: (changed: boolean) => void;
  initialUniv: string;
  initialSelections: SeasonPartSelection[];
}
export default function MyPageDetailedInfo({ onInfoChange, initialUniv, initialSelections }: MyPageDetailedInfoProps) {
  const [openSeasonIndex, setOpenSeasonIndex] = useState<number | null>(null);
  const [openPartIndex, setOpenPartIndex] = useState<number | null>(null);
  const [selections, setSelections] = useState<SeasonPartSelection[]>(initialSelections);
  const [univ, setUniv] = useState<string>(initialUniv);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const UnivArray = Universities?.map((item) => ({ name: item.name, link: item.link })) || [];

  const checkForChanges = useCallback(
    (updatedSelections: SeasonPartSelection[], updatedUniv: string) => {
      const hasChanges =
        updatedUniv !== initialUniv || JSON.stringify(updatedSelections) !== JSON.stringify(initialSelections);
      onInfoChange(hasChanges);
    },
    [initialUniv, initialSelections, onInfoChange],
  );

  useEffect(() => {
    checkForChanges(selections, univ);
  }, [selections, univ]);

  const seasonOptions = ['선택 안함', '3기', '2기', '1기'];
  const partOptions = ['선택 안함', '기획', '디자인', '프론트엔드', '백엔드', 'AI'];

  const toggleSeason = (index: number) => {
    setOpenSeasonIndex(openSeasonIndex === index ? null : index);
  };

  const togglePart = (index: number) => {
    setOpenPartIndex(openPartIndex === index ? null : index);
  };

  const handleSeasonSelect = (index: number, season: string) => {
    const updatedSelections = [...selections];
    updatedSelections[index].selectedSeason = season === '선택 안함' ? '선택' : season;
    updatedSelections[index].selectedPart = '선택'; // 기수 변경 시 파트 초기화
    setSelections(updatedSelections);
    checkForChanges(updatedSelections, univ);
  };

  const handlePartSelect = (index: number, part: string) => {
    const updatedSelections = [...selections];
    updatedSelections[index].selectedPart = part === '선택 안함' ? '선택' : part;
    setSelections(updatedSelections);
    checkForChanges(updatedSelections, univ);
  };

  const addSeasonPartSelection = () => {
    const lastSelection = selections[selections.length - 1];
    if (lastSelection.selectedSeason === '선택' || lastSelection.selectedPart === '선택') {
      setErrorMessage('기수와 파트를 모두 선택해야 합니다.');
      setTimeout(() => setErrorMessage(null), 1500);
      return;
    }
    const updatedSelections = [...selections, { selectedSeason: '선택', selectedPart: '선택' }];
    setSelections(updatedSelections);
  };

  const removeSeasonPartSelection = (index: number) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
    checkForChanges(updatedSelections, univ);
  };

  const handleUnivSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setUniv(newValue);
    checkForChanges(selections, newValue);
  };

  const handleUnivSelect = (name: string) => {
    setUniv(name);
    setSearchValue('');
    checkForChanges(selections, name);
  };

  // const checkForChanges = (updatedSelections: SeasonPartSelection[], updatedUniv: string) => {
  //   const hasChanges =
  //     updatedUniv !== initialUniv || JSON.stringify(updatedSelections) !== JSON.stringify(initialSelections);
  //   onInfoChange(hasChanges);
  // };

  return (
    <div className={styles.detailedInfoContainer}>
      <hr className={styles.divider} />
      <Text typography="heading6">세부 정보</Text>
      <div className={styles.inputContainer}>
        <div className={styles.inputContent}>
          <div className={styles.inputTitle}>
            <Text className={styles.infoTitleText}>소속 유니브</Text>
            <Text className={styles.infoTitleText} color="red-500">
              *
            </Text>
          </div>
          <Input onChange={handleUnivSearch} value={searchValue || univ} size="lg" placeholder="대학교 명" />
          {searchValue !== '' && (
            <div style={{ marginTop: '0.3rem' }}>
              <ListGroup>
                {UnivArray.filter((item) => item.name.includes(searchValue)).map((item) => (
                  <ListGroupItem key={item.name} action onClick={() => handleUnivSelect(item.name)}>
                    {item.name}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          )}
        </div>
        <div className={styles.seasonPartContainer}>
          {selections.map((selection, index) => (
            <div className={styles.errorCircleContainer} key={index}>
              <div className={styles.inputRow}>
                <div className={styles.inputContent}>
                  {index === 0 && (
                    <div className={styles.inputTitle}>
                      <Text className={styles.infoTitleText}>기수</Text>
                      <Text className={styles.infoTitleText} color="red-500">
                        *
                      </Text>
                    </div>
                  )}
                  <Dropdown isOpen={openSeasonIndex === index} toggle={() => toggleSeason(index)} direction="down">
                    <DropdownToggle className={styles.toggleStyle} caret size="lg" color="hint">
                      {selection.selectedSeason}
                    </DropdownToggle>
                    <DropdownMenu>
                      {seasonOptions.map((season) => (
                        <DropdownItem key={season} onClick={() => handleSeasonSelect(index, season)}>
                          {season}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className={styles.inputContent}>
                  {index === 0 && (
                    <div className={styles.inputTitle}>
                      <Text className={styles.infoTitleText}>파트</Text>
                      <Text className={styles.infoTitleText} color="red-500">
                        *
                      </Text>
                    </div>
                  )}
                  <Dropdown isOpen={openPartIndex === index} toggle={() => togglePart(index)} direction="down">
                    <DropdownToggle
                      className={styles.toggleStyle}
                      caret
                      size="lg"
                      color="hint"
                      disabled={selection.selectedSeason === '선택'}>
                      {selection.selectedPart}
                    </DropdownToggle>
                    <DropdownMenu>
                      {partOptions.map((part) => (
                        <DropdownItem key={part} onClick={() => handlePartSelect(index, part)}>
                          {part}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              {index != 0 && (
                <img
                  src={errorCircleIcon}
                  alt="Error Circle Icon"
                  className={styles.errorCircleIcon}
                  onClick={() => removeSeasonPartSelection(index)}
                />
              )}
            </div>
          ))}
          <Button icon={PlusIcon} block color="link" size="lg" disabled={false} onClick={addSeasonPartSelection}>
            기수/파트 추가
          </Button>
          {errorMessage && (
            <Alert color="danger" leftIcon={WarningIcon}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
