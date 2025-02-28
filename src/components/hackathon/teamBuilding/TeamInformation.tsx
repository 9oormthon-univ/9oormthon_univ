import { MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Text } from '@goorm-dev/vapor-components';
import MemberInfoItem from '../common/team/MemberInfoItem';
import { useEffect, useRef, useState } from 'react';
import { GENERATION } from '../../../constants/common';
import { updateTeamInfo } from '../../../api/teams';

interface TeamMember {
  id: number;
  name: string;
  img_url: string;
}

interface RoleInfo {
  max_count: number;
  current_count: number;
  members?: TeamMember[]; // 팀 멤버가 없을 수도 있음.
}

interface TeamRole {
  pm?: RoleInfo;
  pd?: RoleInfo;
  be?: RoleInfo;
  fe?: RoleInfo;
}

interface TeamInformationProps {
  viewer?: boolean; // 보기 전용인지
  number?: number; // 팀 번호
  name?: string; // 팀 이름
  role: TeamRole; // 팀 역할
}

const roleMap = {
  pm: '기획',
  pd: '디자인',
  fe: '프론트엔드',
  be: '백엔드',
};

export default function TeamInformation({ viewer, number, name, role }: TeamInformationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [teamName, setTeamName] = useState('팀 이름');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // name prop이 바뀔 때 teamName 상태 업데이트
  useEffect(() => {
    setTeamName(name ?? '팀 이름');
  }, [name]);

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
      console.error('팀 이름 수정 실패:', error);
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
  const orderedRoles = ['pm', 'pd', 'fe', 'be']; // 기획 → 디자인 → 프론트엔드 → 백엔드
  const sortedRoles = orderedRoles.map((key) => ({
    key,
    roleInfo: role?.[key as keyof TeamRole] ?? { max_count: 0, current_count: 0 },
  }));

  return (
    <div className={styles.container}>
      <div className={styles.teamInformHeader}>
        <div className={styles.teamInformHeaderText}>
          <Text typography="subtitle1" color="text-hint">
            {number}팀
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
              {name}
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
      {sortedRoles.map(({ key, roleInfo }) => (
        <div key={key} className={styles.teamInformContent}>
          <div className={styles.teamInformContentText}>
            <Text typography="body2" color="text-normal">
              {roleMap[key as keyof typeof roleMap]}
            </Text>
            <Badge color={roleInfo?.current_count === roleInfo?.max_count ? 'success' : 'primary'} size="sm">
              {roleInfo?.current_count}/{roleInfo?.max_count}
            </Badge>
          </div>
          <div className={styles.teamInformContentItem}>
            {roleInfo?.members && roleInfo.members.length > 0 ? (
              roleInfo.members.map((member) => (
                <MemberInfoItem key={member.id} id={member.id} name={member.name} imgUrl={member.img_url} />
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
