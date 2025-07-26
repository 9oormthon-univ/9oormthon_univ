import { MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Text } from '@goorm-dev/vapor-components';
import MemberInfoItem from '../common/team/MemberInfoItem';
import { useEffect, useRef, useState } from 'react';
import { GENERATION } from '../../../constants/common';
import { updateTeamInfo } from '../../../api/teams';
import { TeamInfo, TeamMember, TeamRole } from '../../../types/user/team';
import { POSITIONS } from '../../../constants/position';

interface TeamInformationProps {
  viewer: boolean; // 보기 전용인지
  teamInfo: TeamInfo | null;
}

export default function TeamInformation({ viewer, teamInfo }: TeamInformationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [teamName, setTeamName] = useState(teamInfo?.name ?? '팀 이름');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // name prop이 바뀔 때 teamName 상태 업데이트
  useEffect(() => {
    setTeamName(teamInfo?.name ?? '팀 이름');
  }, [teamInfo]);

  // 수정 모드 전환 및 input에 포커스
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0); // 비동기적으로 포커스 적용
  };

  // 수정 완료 (Enter 또는 블러)
  const handleSave = async () => {
    if (!teamName.trim()) {
      setTeamName('팀 이름'); // 빈 값이면 기본값 유지
      setIsEditing(false);
      return;
    }

    try {
      setTeamName(teamName.trim());
      await updateTeamInfo(GENERATION, teamName);
      setIsEditing(false);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error);
      }
      setTeamName(teamName);
    }
  };

  // Enter 키 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  // 역할 정렬
  const sortedRoles = Object.values(POSITIONS)
    .sort((a, b) => a.index - b.index)
    .map((position) => ({
      key: position.lowerKey,
      name: position.name,
      roleInfo: teamInfo?.role?.[position.lowerKey as keyof TeamRole] ?? { max_count: 0, current_count: 0 },
    }));

  return (
    <div className={styles.container}>
      <div className={styles.teamInformHeader}>
        <div className={styles.teamInformHeaderText}>
          <Text typography="subtitle1" color="text-hint">
            {teamInfo?.number}팀
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
      {sortedRoles.map(({ key, name, roleInfo }) => (
        <div key={key} className={styles.teamInformContent}>
          <div className={styles.teamInformContentText}>
            <Text typography="body2" color="text-normal">
              {name}
            </Text>
            <Badge color={roleInfo?.current_count === roleInfo?.max_count ? 'success' : 'primary'} size="sm">
              {roleInfo?.current_count}/{roleInfo?.max_count}
            </Badge>
          </div>
          <div className={styles.teamInformContentItem}>
            {roleInfo?.members && roleInfo.members.length > 0 ? (
              roleInfo.members.map((member: TeamMember) => (
                <MemberInfoItem
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  img_url={member.img_url}
                  is_leader={member.is_leader}
                />
              ))
            ) : (
              <MemberInfoItem name="팀원 없음" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
