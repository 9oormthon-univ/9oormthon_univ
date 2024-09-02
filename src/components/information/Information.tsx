import styles from './information.module.scss';
import { BackPageIcon, PlusIcon, WarningIcon, ErrorCircleIcon } from '@goorm-dev/gds-icons';
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
import { useState } from 'react';
import Universities from '../../utilities/UnivData';
import errorCircleIcon from '../../assets/svgs/ErrorCircleIcon.svg';

interface SeasonPartSelection {
  selectedSeason: string;
  selectedPart: string;
}

export default function information() {
  const [openSeasonIndex, setOpenSeasonIndex] = useState<number | null>(null);
  const [openPartIndex, setOpenPartIndex] = useState<number | null>(null);
  const [selections, setSelections] = useState<SeasonPartSelection[]>([
    { selectedSeason: '선택', selectedPart: '선택' },
  ]);
  const [name, setName] = useState('');
  const [univ, setUniv] = useState('');
  const [formAlertMessage, setFormAlertMessage] = useState<string | null>(null);
  const [addSelectionAlertMessage, setAddSelectionAlertMessage] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const UnivArray = Universities.map((item) => ({ name: item.name, link: item.link }));

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
    const lastSelection = selections[selections.length - 1];
    if (lastSelection.selectedSeason === '선택' || lastSelection.selectedPart === '선택') {
      showAddSelectionAlert('기수와 파트를 모두 선택해야 합니다.');
      return;
    }
    setSelections([...selections, { selectedSeason: '선택', selectedPart: '선택' }]);
    setAddSelectionAlertMessage(null); // 기수/파트 추가 시 관련 alert 초기화
  };

  const showAddSelectionAlert = (message: string) => {
    setAddSelectionAlertMessage(message);
    setTimeout(() => setAddSelectionAlertMessage(null), 1500);
  };

  const removeSeasonPartSelection = (index: number) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
  };
  const handleUnivSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setUniv(e.target.value);
    if (e.target.value && UnivArray.some((univItem) => univItem.name === e.target.value)) {
      setFormAlertMessage(null);
    }
  };

  const handleUnivSelect = (name: string) => {
    setUniv(name);
    setSearchValue('');
    setFormAlertMessage(null);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value) {
      setFormAlertMessage(null);
    }
  };

  const validateForm = () => {
    if (!name) {
      setFormAlertMessage('이름을 입력해주세요');
      return false;
    }
    if (!univ || !UnivArray.some((univItem) => univItem.name === univ)) {
      setFormAlertMessage('소속 유니브가 올바른지 확인해주세요.');
      return false;
    }

    if (selections[0].selectedSeason === '선택') {
      setFormAlertMessage('기수를 선택해주세요');
      return false;
    }
    if (selections[0].selectedPart === '선택') {
      setFormAlertMessage('파트를 선택해주세요');
      return false;
    }

    // 모든 필드 채워짐
    setFormAlertMessage(null);
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted');
      // API 호출
    }
  };

  return (
    <div className={styles.informationContainer}>
      <div className={styles.informationHeader}>
        <Button icon={BackPageIcon} color="link"></Button>
        <Text typography="heading3" color="gray-900">
          정보 입력
        </Text>
      </div>
      <hr className={styles.divider} />
      <div className={styles.inputContainer}>
        <div className={styles.inputContent}>
          <div className={styles.inputTitle}>
            <Text color="text-alternative">이름</Text>
            <Text color="red-500">*</Text>
          </div>
          <Input value={name} onChange={handleNameChange} size="lg" />
        </div>
        <div className={styles.inputContent}>
          <div className={styles.inputTitle}>
            <Text color="text-alternative">소속 유니브</Text>
            <Text color="red-500">*</Text>
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
                      <Text color="text-alternative">기수</Text>
                      <Text color="red-500">*</Text>
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
                      <Text color="text-alternative">파트</Text>
                      <Text color="red-500">*</Text>
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
          {addSelectionAlertMessage && (
            <Alert size="lg" color="danger" leftIcon={WarningIcon}>
              {addSelectionAlertMessage}
            </Alert>
          )}
        </div>
        <div className={styles.checkBoxStyle}>
          <div className={styles.checkBoxTitle}>
            <Checkbox>
              <Text typography="body2" fontWeight="regular" color="gray-900">
                새 기능, 이벤트 홍보, 대회 안내 등의 알림 수신
              </Text>
            </Checkbox>
            <Text typography="subtitle2" color="text-hint" fontWeight="medium">
              (선택)
            </Text>
          </div>
          <Text typography="body3" fontWeight="regular" color="text-hint">
            이용약관의 변경이나 관계 법령에 따라 회원님께 안내되어야 할 중요<br></br> 고지 사항은 메일 수신 동의 여부에
            상관없이 안내될 수 있습니다.
          </Text>
        </div>
        {formAlertMessage && (
          <Alert size="xl" color="danger" leftIcon={WarningIcon}>
            {formAlertMessage}
          </Alert>
        )}
        <Button className={styles.confirmBtn} size="xl" onClick={handleSubmit}>
          회원 가입
        </Button>
      </div>
    </div>
  );
}
