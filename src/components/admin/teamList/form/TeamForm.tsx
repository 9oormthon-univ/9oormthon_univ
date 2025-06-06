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
  const [teamNumber, setTeamNumber] = useState(initial?.number ?? 0);
  const [serviceName, setServiceName] = useState(initial?.service_name ?? '');
  const [teamRoles, setTeamRoles] = useState({
    pm_capacity: initial?.pm_capacity ?? 0,
    pd_capacity: initial?.pd_capacity ?? 0,
    fe_capacity: initial?.fe_capacity ?? 0,
    be_capacity: initial?.be_capacity ?? 0,
  });

  useEffect(() => {
    const isValid =
      teamName.trim() !== '' &&
      teamRoles.pm_capacity !== null &&
      teamRoles.pd_capacity !== null &&
      teamRoles.fe_capacity !== null &&
      teamRoles.be_capacity !== null;
    onValidationChange(isValid);

    if (mode === 'create') {
      onFormChange({
        name: teamName,
        pm_capacity: teamRoles.pm_capacity ?? 0,
        pd_capacity: teamRoles.pd_capacity ?? 0,
        fe_capacity: teamRoles.fe_capacity ?? 0,
        be_capacity: teamRoles.be_capacity ?? 0,
      });
    } else {
      onFormChange({
        id: initial?.id ?? 0,
        number: teamNumber,
        team_name: teamName,
        service_name: serviceName,
        idea_id: initial?.idea_id ?? 0,
        leader: initial?.leader,
        pm_capacity: initial?.pm_capacity ?? 0,
        pd_capacity: initial?.pd_capacity ?? 0,
        fe_capacity: initial?.fe_capacity ?? 0,
        be_capacity: initial?.be_capacity ?? 0,
      });
    }
  }, [teamName, teamRoles, mode, initial, onFormChange, teamNumber, serviceName]);

  return (
    <div className={styles.container}>
      {mode === 'update' && (
        <FormField label="팀 번호">
          <Input
            size="lg"
            placeholder="팀 번호를 입력해 주세요"
            value={teamNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamNumber(Number(e.target.value))}
          />
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
          value={teamRoles.pm_capacity}
          onChange={(value) => setTeamRoles({ ...teamRoles, pm_capacity: value })}
        />
      </FormField>

      <FormField label="디자인 필요 인원" required>
        <MemberNumberDropdown
          value={teamRoles.pd_capacity}
          onChange={(value) => setTeamRoles({ ...teamRoles, pd_capacity: value })}
        />
      </FormField>

      <FormField label="프론트엔드 필요 인원" required>
        <MemberNumberDropdown
          value={teamRoles.fe_capacity}
          onChange={(value) => setTeamRoles({ ...teamRoles, fe_capacity: value })}
          maxValue={4}
        />
      </FormField>
      <FormField label="백엔드 필요 인원" required>
        <MemberNumberDropdown
          value={teamRoles.be_capacity}
          onChange={(value) => setTeamRoles({ ...teamRoles, be_capacity: value })}
          maxValue={4}
        />
      </FormField>

      {mode === 'update' && (
        <FormField label="서비스 명">
          <Input
            size="lg"
            placeholder="서비스 명을 입력해 주세요"
            value={serviceName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceName(e.target.value)}
          />
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
