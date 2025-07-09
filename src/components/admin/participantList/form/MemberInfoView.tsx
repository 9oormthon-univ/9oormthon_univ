import { Avatar, Radio, Text } from '@goorm-dev/vapor-components';
import styles from './form.module.scss';
import FormField from '../../../common/formField/FormField';
import { useState } from 'react';
import { Member } from '../../../../types/admin/member';
import { getPositionName, PositionKey, POSITIONS } from '../../../../constants/position';

const formatGeneration = (generation: number) => `${generation}기`;

interface MemberInfoViewProps {
  isTeamInform?: boolean;
  isPartEditMode?: boolean;
  member?: Member | null;
  onRoleChange?: (role: PositionKey) => void;
}

export default function MemberInfoView({
  isTeamInform = false,
  isPartEditMode = false,
  member,
  onRoleChange,
}: MemberInfoViewProps) {
  const [role, setRole] = useState<PositionKey>(member?.role || 'PM');

  return (
    <div className={styles.infoContainer}>
      {member?.img_url ? (
        <div className={styles.profileImgContainer}>
          <img src={member?.img_url} alt="profile" />
        </div>
      ) : (
        <Avatar name={member?.name || 'Goorm'} />
      )}

      <div className={styles.memberContainer}>
        <FormField label="이름">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.name || '이름 정보 없음'}
          </Text>
        </FormField>
        <FormField label="팀 정보">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.team || '팀 정보 없음'}
          </Text>
        </FormField>
        {isTeamInform && !isPartEditMode && (
          <FormField label="지원 파트">
            <Text typography="heading6" as="p" color="text-normal">
              {member?.role ? getPositionName(member.role) : '희망 파트 없음'}
            </Text>
          </FormField>
        )}

        {isPartEditMode && (
          <FormField label="지원 파트">
            <div className={styles.radioGroup}>
              {Object.values(POSITIONS)
                .sort((a, b) => a.index - b.index)
                .map((position) => (
                  <Radio
                    key={position.key}
                    label={position.name}
                    id={position.key}
                    name="role"
                    checked={role === position.key}
                    onChange={() => {
                      setRole(position.key);
                      onRoleChange?.(position.key);
                    }}
                  />
                ))}
            </div>
          </FormField>
        )}
        <FormField label="학교">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.univ?.name || '학교 정보 없음'}
          </Text>
        </FormField>
        <FormField label="이메일">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.email || '이메일 정보 없음'}
          </Text>
        </FormField>
        <FormField label="전화번호">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.phone_number || '전화번호 정보 없음'}
          </Text>
        </FormField>
        <FormField label="참여 기수">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.generations.map((generation) => formatGeneration(generation)).join(', ') || '참여 기수 정보 없음'}
          </Text>
        </FormField>
      </div>
    </div>
  );
}
