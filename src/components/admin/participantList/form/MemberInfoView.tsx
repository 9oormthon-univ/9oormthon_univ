import { Avatar, Radio, Text } from '@goorm-dev/vapor-components';
import styles from './form.module.scss';
import FormField from '../../../common/formField/FormField';
import { useState } from 'react';
import { POSITIONS, RequirementKey } from '../../../../constants/position';
import { Member } from '../../../../types/admin/member';

const formatGeneration = (generation: number) => `${generation}기`;

interface MemberInfoViewProps {
  isTeamInform?: boolean;
  isPartEditMode?: boolean;
  member?: Member;
}

export default function MemberInfoView({ isTeamInform = false, isPartEditMode = false, member }: MemberInfoViewProps) {
  const [role, setRole] = useState(member?.role || 'PM');

  return (
    <div className={styles.infoContainer}>
      <Avatar name={member?.name || 'Goorm'} />
      <div className={styles.memberContainer}>
        <FormField label="이름">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.name}
          </Text>
        </FormField>
        <FormField label="팀 정보">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.team}
          </Text>
        </FormField>
        <FormField label="희망 파트">
          <Text typography="heading6" as="p" color="text-normal">
            {POSITIONS[member?.role?.toLowerCase() as RequirementKey]?.name}
          </Text>
        </FormField>
        {/* TODO : 지원파트와 희망파트 구분 필요 */}
        {isTeamInform && (
          <FormField label="지원 파트">
            <Text typography="heading6" as="p" color="text-normal">
              기획
            </Text>
          </FormField>
        )}
        {isPartEditMode && (
          <FormField label="지원 파트">
            <div className={styles.radioGroup}>
              <Radio label="기획" id="PM" name="role" checked={role === 'PM'} onChange={() => setRole('PM')} />
              <Radio label="디자인" id="PD" name="role" checked={role === 'PD'} onChange={() => setRole('PD')} />
              <Radio label="프론트엔드" id="FE" name="role" checked={role === 'FE'} onChange={() => setRole('FE')} />
              <Radio label="백엔드" id="BE" name="role" checked={role === 'BE'} onChange={() => setRole('BE')} />
            </div>
          </FormField>
        )}
        <FormField label="학교">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.univ?.name}
          </Text>
        </FormField>
        <FormField label="이메일">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.email}
          </Text>
        </FormField>
        <FormField label="전화번호">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.phone_number}
          </Text>
        </FormField>
        <FormField label="참여 기수">
          <Text typography="heading6" as="p" color="text-normal">
            {member?.generations.map((generation) => formatGeneration(generation)).join(', ')}
          </Text>
        </FormField>
      </div>
    </div>
  );
}
