import { useState } from 'react';
import styles from './styles.module.scss';
import { ButtonToggleGroup, Text } from '@goorm-dev/vapor-components';
import IdeaApplyListItem from '../../../../components/hackathon/teamBuilding/IdeaApplyListItem';

export default function ApplicantPage() {
  const [buttonIndex, setButtonIndex] = useState(1); // 인덱스는 1번부터

  const onToggle = (index: number) => {
    setButtonIndex(index);
  };

  return (
    <div className={styles.container}>
      <Text as="h3" typography="heading3">
        팀 빌딩 현황
      </Text>
      <ButtonToggleGroup size="lg" activeIndex={buttonIndex} onToggle={onToggle} className={styles.buttonToggleGroup}>
        <ButtonToggleGroup.ButtonToggleItem>1차 (25.01.01 ~ 25.01.01)</ButtonToggleGroup.ButtonToggleItem>
        <ButtonToggleGroup.ButtonToggleItem>2차 (25.01.01 ~ 25.01.01)</ButtonToggleGroup.ButtonToggleItem>
        <ButtonToggleGroup.ButtonToggleItem>3차 (25.01.01 ~ 25.01.01)</ButtonToggleGroup.ButtonToggleItem>
      </ButtonToggleGroup>
      <IdeaApplyListItem />
    </div>
  );
}
