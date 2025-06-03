import { Input } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './form.module.scss';
import { MemberNumberDropdown } from '../dropdown/MemberNumberDropdown';
import { useState, useEffect } from 'react';
import SearchDropdown from '../../../common/searchDropdown/SearchDropdown';

interface TeamFormProps {
  mode: 'create' | 'update';
  onValidationChange: (isValid: boolean) => void;
}

export default function TeamForm({ mode, onValidationChange }: TeamFormProps) {
  const [teamName, setTeamName] = useState('');
  const [teamRoles, setTeamRoles] = useState({
    planning: null as number | null,
    design: null as number | null,
    frontend: null as number | null,
    backend: null as number | null,
  });

  useEffect(() => {
    const isFormValid =
      teamName.trim() !== '' &&
      teamRoles.planning !== null &&
      teamRoles.design !== null &&
      teamRoles.frontend !== null &&
      teamRoles.backend !== null;

    onValidationChange(isFormValid);
  }, [teamName, teamRoles, onValidationChange]);

  return (
    <div className={styles.container}>
      {mode === 'update' && (
        <FormField label="팀 번호">
          <Input size="lg" placeholder="팀 번호를 입력해 주세요" />
        </FormField>
      )}
      <FormField label="팀 이름">
        <Input
          size="lg"
          placeholder="팀 이름을 입력해 주세요"
          value={teamName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)}
        />
      </FormField>
      <FormField label="기획 필요 인원" required>
        <MemberNumberDropdown
          value={teamRoles.planning}
          onChange={(value) => setTeamRoles({ ...teamRoles, planning: value })}
        />
      </FormField>

      <FormField label="디자인 필요 인원" required>
        <MemberNumberDropdown
          value={teamRoles.design}
          onChange={(value) => setTeamRoles({ ...teamRoles, design: value })}
        />
      </FormField>

      <FormField label="프론트엔드 필요 인원" required>
        <MemberNumberDropdown
          value={teamRoles.frontend}
          onChange={(value) => setTeamRoles({ ...teamRoles, frontend: value })}
          maxValue={4}
        />
      </FormField>
      <FormField label="백엔드 필요 인원" required>
        <MemberNumberDropdown
          value={teamRoles.backend}
          onChange={(value) => setTeamRoles({ ...teamRoles, backend: value })}
          maxValue={4}
        />
      </FormField>

      {mode === 'update' && (
        <FormField label="서비스 명">
          <Input size="lg" placeholder="서비스 명을 입력해 주세요" />
        </FormField>
      )}

      {mode === 'update' && (
        <FormField label="팀 대표 지정">
          <SearchDropdown inPlaceholder="미르미 선택" outPlaceholder="팀 대표를 선택해주세요" />
        </FormField>
      )}
    </div>
  );
}
