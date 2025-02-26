import { MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Text } from '@goorm-dev/vapor-components';
import MemberInfoItem from '../common/team/MemberInfoItem';
import { useRef, useState } from 'react';

interface TeamInformationProps {
  viewer?: boolean; // 보기 전용인지
}

export default function TeamInformation({ viewer }: TeamInformationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [teamName, setTeamName] = useState('팀 이름');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 수정 모드 전환 및 input에 포커스
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0); // 비동기적으로 포커스 적용
  };

  // 수정 완료 (Enter 또는 블러)
  const handleSave = () => {
    if (!teamName.trim()) {
      setTeamName('팀 이름'); // 빈 값이면 기본값 유지
    }
    setIsEditing(false);
  };

  // Enter 키 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.teamInformHeader}>
        <div className={styles.teamInformHeaderText}>
          <Text typography="subtitle1" color="text-hint">
            1팀
          </Text>
          {isEditing ? (
            <Input
              size="xl"
              ref={inputRef}
              value={teamName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              style={{ width: '31.25rem' }}
            />
          ) : (
            <Text as="h4" typography="heading4" color="text-normal">
              {teamName}
            </Text>
          )}
        </div>
        {!viewer && (
          <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle size="md" color="secondary" className={styles.teamInformHeaderDropdownToggle}>
              <MoreCommonOutlineIcon />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={enableEditing}>팀 이름 수정</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <div className={styles.teamInformContent}>
        <div className={styles.teamInformContentText}>
          <Text typography="body2" color="text-normal">
            기획
          </Text>
          <Badge color="success" size="sm">
            2/2
          </Badge>
        </div>
        <div className={styles.teamInformContentItem}>
          <MemberInfoItem id={2} name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
          <MemberInfoItem id={3} name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
        </div>
      </div>
      <div className={styles.teamInformContent}>
        <div className={styles.teamInformContentText}>
          <Text typography="body2" color="text-normal">
            디자인
          </Text>
          <Badge color="success" size="sm">
            2/2
          </Badge>
        </div>
        <div className={styles.teamInformContentItem}>
          <MemberInfoItem id={4} name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
          <MemberInfoItem id={5} name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
        </div>
      </div>
      <div className={styles.teamInformContent}>
        <div className={styles.teamInformContentText}>
          <Text typography="body2" color="text-normal">
            프론트엔드
          </Text>
          <Badge color="success" size="sm">
            2/2
          </Badge>
        </div>
        <div className={styles.teamInformContentItem}>
          <MemberInfoItem id={6} name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
          <MemberInfoItem id={7} name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
        </div>
      </div>
    </div>
  );
}
