import { Input } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './form.module.scss';
import { MemberNumberDropdown } from '../dropdown/MemberNumberDropdown';
import { useState, useEffect } from 'react';
import SearchDropdown from '../../../common/searchDropdown/SearchDropdown';
import { Team, TeamDetail } from '../../../../types/admin/team';

interface TeamFormProps {
  mode: 'create' | 'update';
  onValidationChange: (isValid: boolean) => void;
  onFormChange: (data: Team | TeamDetail) => void;
  initialData?: TeamDetail;
}

export default function TeamForm({ mode, onValidationChange, onFormChange, initialData }: TeamFormProps) {
  const isUpdateMode = mode === 'update';
  const initial = isUpdateMode ? initialData : undefined;
  const [teamName, setTeamName] = useState(initial?.team_name || '');
  const [teamRoles, setTeamRoles] = useState({
    planning: null as number | null,
    design: null as number | null,
    frontend: null as number | null,
    backend: null as number | null,
  });

  useEffect(() => {
    const isValid =
      teamName.trim() !== '' &&
      teamRoles.planning !== null &&
      teamRoles.design !== null &&
      teamRoles.frontend !== null &&
      teamRoles.backend !== null;
    onValidationChange(isValid);

    if (mode === 'create') {
      onFormChange({
        name: teamName,
        pm_capacity: teamRoles.planning ?? 0,
        pd_capacity: teamRoles.design ?? 0,
        fe_capacity: teamRoles.frontend ?? 0,
        be_capacity: teamRoles.backend ?? 0,
      });
    } else {
      onFormChange({
        id: initial?.id ?? 0,
        number: initial?.number ?? 0,
        team_name: teamName,
        service_name: initial?.service_name ?? '',
        idea_id: initial?.idea_id ?? 0,
        leader: initial?.leader,
        pm_capacity: teamRoles.planning ?? 0,
        pd_capacity: teamRoles.design ?? 0,
        fe_capacity: teamRoles.frontend ?? 0,
        be_capacity: teamRoles.backend ?? 0,
      });
    }
  }, [teamName, teamRoles, mode, initial, onFormChange]);

  return (
    <div className={styles.container}>
      {mode === 'update' && (
        <FormField label="팀 번호">
          <Input size="lg" placeholder="팀 번호를 입력해 주세요" value={initial?.number ?? 0} />
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
          <Input size="lg" placeholder="서비스 명을 입력해 주세요" value={initial?.service_name ?? ''} />
        </FormField>
      )}

      {/* 팀 대표 추후 추가 필요 */}
      {mode === 'update' && (
        <FormField label="팀 대표 지정">
          <SearchDropdown
            inPlaceholder="미르미 선택"
            outPlaceholder="팀 대표를 선택해주세요"
            items={[]}
            onSelect={() => {}}
          />
        </FormField>
      )}
    </div>
  );
}
