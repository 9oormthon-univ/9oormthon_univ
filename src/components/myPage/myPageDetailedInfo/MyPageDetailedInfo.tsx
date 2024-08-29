import { ChangeEvent, useState } from 'react';
import styles from './myPageDetailedInfo.module.scss';
import {
  Text,
  Input,
  Button,
  Checkbox,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  ListGroupItem,
  ListGroup,
} from '@goorm-dev/vapor-components';
import { BackPageIcon, PlusIcon, WarningIcon, ErrorCircleIcon } from '@goorm-dev/gds-icons';
interface SeasonPartSelection {
  selectedSeason: string;
  selectedPart: string;
}

export default function MyPageDetailedInfo() {
  const [openSeasonIndex, setOpenSeasonIndex] = useState<number | null>(null);
  const [openPartIndex, setOpenPartIndex] = useState<number | null>(null);
  const [selections, setSelections] = useState<SeasonPartSelection[]>([
    { selectedSeason: '선택', selectedPart: '선택' },
  ]);

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
  };

  const handlePartSelect = (index: number, part: string) => {
    const updatedSelections = [...selections];
    updatedSelections[index].selectedPart = part === '선택 안함' ? '선택' : part;
    setSelections(updatedSelections);
  };

  const addSeasonPartSelection = () => {
    setSelections([...selections, { selectedSeason: '선택', selectedPart: '선택' }]);
  };

  const removeSeasonPartSelection = (index: number) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
  };
  return (
    <div className={styles.detailedInfoContainer}>
      <hr className={styles.divider} />
      <Text typography="heading6">세부 정보</Text>
      <div className={styles.infoContentContainer}>
        <div className={styles.infoTitle}>
          <Text className={styles.infoTitleText}>소속유니브</Text>
          <Text className={styles.infoTitleText} color="red-500">
            *
          </Text>
        </div>
        <Input bsSize="lg"></Input>
        <div className={styles.inputRow}>
          <div className={styles.infoContentContainer}>
            <div className={styles.infoTitle}>
              <Text className={styles.infoTitleText}>기수</Text>
              <Text className={styles.infoTitleText} color="red-500">
                *
              </Text>
            </div>
            <Dropdown isOpen={openSeasonIndex} toggle={toggleSeason} direction="down">
              <DropdownToggle className={styles.dropDownToggle} caret color="hint" size="lg">
                선택
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>아이템</DropdownItem>
                <DropdownItem>아이템2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className={styles.infoContentContainer}>
            <div className={styles.infoTitle}>
              <Text className={styles.infoTitleText}>파트</Text>
              <Text className={styles.infoTitleText} color="red-500">
                *
              </Text>
            </div>
            <Dropdown isOpen={openSeasonIndex} toggle={toggleSeason} direction="down">
              <DropdownToggle className={styles.dropDownToggle} caret color="hint" size="lg" disabled>
                선택
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>아이템</DropdownItem>
                <DropdownItem>아이템2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Button icon={PlusIcon} size="lg" color="hint" onClick={addSeasonPartSelection}>
          기수/파트 추가
        </Button>
      </div>
    </div>
  );
}
