import { Avatar, Radio, Text } from '@goorm-dev/vapor-components';
import styles from './form.module.scss';
import FormField from '../../../common/formField/FormField';
import { useState } from 'react';

interface MemberInfoViewProps {
  isTeamInform?: boolean;
  isPartEditMode?: boolean;
}

export default function MemberInfoView({ isTeamInform = false, isPartEditMode = false }: MemberInfoViewProps) {
  const [role, setRole] = useState('PM');

  return (
    <div className={styles.infoContainer}>
      <Avatar name="Goorm" />
      <div className={styles.memberContainer}>
        <FormField label="이름">
          <Text typography="heading6" as="p" color="text-normal">
            김구름
          </Text>
        </FormField>
        <FormField label="팀 정보">
          <Text typography="heading6" as="p" color="text-normal">
            1팀 / 팀 이름
          </Text>
        </FormField>
        <FormField label="희망 파트">
          <Text typography="heading6" as="p" color="text-normal">
            기획
          </Text>
        </FormField>
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
            구름대학교
          </Text>
        </FormField>
        <FormField label="이메일">
          <Text typography="heading6" as="p" color="text-normal">
            goorm@goorm.dev
          </Text>
        </FormField>
        <FormField label="전화번호">
          <Text typography="heading6" as="p" color="text-normal">
            010-1234-5678
          </Text>
        </FormField>
        <FormField label="참여 기수">
          <Text typography="heading6" as="p" color="text-normal">
            3기, 4기
          </Text>
        </FormField>
      </div>
    </div>
  );
}
