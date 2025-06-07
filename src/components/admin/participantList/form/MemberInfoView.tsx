import { Avatar, Radio, Text } from '@goorm-dev/vapor-components';
import styles from './form.module.scss';
import FormField from '../../../common/formField/FormField';
import { useState } from 'react';
import { Member } from '../../../../types/admin/member';
import { POSITION_NAME } from '../../../../constants/position';
import { Position, PositionWithoutNull } from '../../../../constants/position';

const formatGeneration = (generation: number) => `${generation}기`;

interface MemberInfoViewProps {
  isTeamInform?: boolean;
  isPartEditMode?: boolean;
  member?: Member | null;
  onRoleChange?: (role: Position) => void;
}

export default function MemberInfoView({
  isTeamInform = false,
  isPartEditMode = false,
  member,
  onRoleChange,
}: MemberInfoViewProps) {
  const [role, setRole] = useState(member?.role || Position.PM);

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
              {POSITION_NAME[member?.role as PositionWithoutNull] || '희망 파트 없음'}
            </Text>
          </FormField>
        )}

        {/* {isTeamInform && (
          <FormField label="희망 파트">
            <Text typography="heading6" as="p" color="text-normal">
              기획
            </Text>
          </FormField>
        )} */}
        {isPartEditMode && (
          <FormField label="지원 파트">
            <div className={styles.radioGroup}>
              <Radio
                label="기획"
                id="PM"
                name="role"
                checked={role === Position.PM}
                onChange={() => {
                  setRole(Position.PM);
                  onRoleChange?.(Position.PM);
                }}
              />
              <Radio
                label="디자인"
                id="PD"
                name="role"
                checked={role === Position.PD}
                onChange={() => {
                  setRole(Position.PD);
                  onRoleChange?.(Position.PD);
                }}
              />
              <Radio
                label="프론트엔드"
                id="FE"
                name="role"
                checked={role === Position.FE}
                onChange={() => {
                  setRole(Position.FE);
                  onRoleChange?.(Position.FE);
                }}
              />
              <Radio
                label="백엔드"
                id="BE"
                name="role"
                checked={role === Position.BE}
                onChange={() => {
                  setRole(Position.BE);
                  onRoleChange?.(Position.BE);
                }}
              />
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
