import { Input, Radio } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './form.module.scss';
import { MemberNumberDropdown } from '../dropdown/MemberNumberDropdown';
import { useState, useEffect, useRef } from 'react';
import SearchDropdown from '../../../common/searchDropdown/SearchDropdown';
import { Team, TeamBuildingStatus, TeamUpdateForm } from '../../../../types/admin/team';
import { User } from '../../../../types/admin/member';
import { fetchUserListAPI } from '../../../../api/admin/users';
import { GENERATION } from '../../../../constants/common';

interface TeamFormProps {
  mode: 'create' | 'update';
  onValidationChange: (isValid: boolean) => void;
  onFormChange: (data: Team | TeamUpdateForm) => void;
  initialData?: TeamUpdateForm;
  teamId?: number;
}

export default function TeamForm({ mode, onValidationChange, onFormChange, initialData, teamId }: TeamFormProps) {
  const isUpdateMode = mode === 'update';
  const initial = isUpdateMode ? initialData : undefined;
  const [teamName, setTeamName] = useState(initial?.team_name || '');
  const [teamNumber, setTeamNumber] = useState(initial?.number ?? 0);
  const [serviceName, setServiceName] = useState(initial?.service_name ?? '');
  const [teamLeaderId, setTeamLeaderId] = useState(initial?.leader_id ?? 0);
  const [teamBuildingStatus, setTeamBuildingStatus] = useState(initial?.status ?? TeamBuildingStatus.RECRUITING);

  const [teamRoles, setTeamRoles] = useState({
    pm_capacity: initial?.pm_capacity ?? 0,
    pd_capacity: initial?.pd_capacity ?? 0,
    fe_capacity: initial?.fe_capacity ?? 0,
    be_capacity: initial?.be_capacity ?? 0,
  });

  const prevFormDataRef = useRef<Team | TeamUpdateForm>(
    initial ?? {
      name: '',
      pm_capacity: 0,
      pd_capacity: 0,
      fe_capacity: 0,
      be_capacity: 0,
    },
  );

  useEffect(() => {
    const isValid =
      teamName.trim() !== '' &&
      teamRoles.pm_capacity !== null &&
      teamRoles.pd_capacity !== null &&
      teamRoles.fe_capacity !== null &&
      teamRoles.be_capacity !== null;
    onValidationChange(isValid);

    const formData =
      mode === 'create'
        ? {
            name: teamName,
            pm_capacity: teamRoles.pm_capacity ?? 0,
            pd_capacity: teamRoles.pd_capacity ?? 0,
            fe_capacity: teamRoles.fe_capacity ?? 0,
            be_capacity: teamRoles.be_capacity ?? 0,
          }
        : {
            number: teamNumber,
            team_name: teamName,
            service_name: serviceName,
            leader_id: teamLeaderId,
            pm_capacity: teamRoles.pm_capacity ?? 0,
            pd_capacity: teamRoles.pd_capacity ?? 0,
            fe_capacity: teamRoles.fe_capacity ?? 0,
            be_capacity: teamRoles.be_capacity ?? 0,
            status: teamBuildingStatus,
          };

    if (JSON.stringify(formData) !== JSON.stringify(prevFormDataRef.current)) {
      onFormChange(formData);
      prevFormDataRef.current = formData;
    }
  }, [
    teamName,
    teamRoles.pm_capacity,
    teamRoles.pd_capacity,
    teamRoles.fe_capacity,
    teamRoles.be_capacity,
    teamNumber,
    serviceName,
    teamLeaderId,
    mode,
    onValidationChange,
    onFormChange,
    teamBuildingStatus,
  ]);

  // 유저 리스트 전체 조회(팀장 선정을 위함)
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    const fetchUserList = async () => {
      const res = await fetchUserListAPI(GENERATION, undefined, undefined, teamId); // 팀장 선정을 위해 팀 아이디 추가
      setUserList(res.data.users);
    };
    fetchUserList();
  }, [teamId]);

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

      {mode === 'update' && (
        <FormField label="팀장 지정">
          <SearchDropdown
            inPlaceholder="미르미 선택"
            outPlaceholder="팀 대표를 선택해주세요"
            items={userList.map((user) => ({
              id: user.id,
              description: user.description,
            }))}
            onSelect={(item) => {
              setTeamLeaderId(item.id);
            }}
            selectedItem={userList.find((user) => user.id === teamLeaderId) ?? null}
            onSearch={async (term) => {
              if (term.length >= 2) {
                const res = await fetchUserListAPI(GENERATION, undefined, term, teamId);
                setUserList(res.data.users);
              }
            }}
          />
        </FormField>
      )}

      {mode === 'update' && (
        <FormField label="팀 빌딩 상태">
          <div className={styles.radioGroup}>
            <Radio
              label="모집 중"
              id="recruiting"
              name="status"
              checked={teamBuildingStatus === TeamBuildingStatus.RECRUITING}
              onChange={() => setTeamBuildingStatus(TeamBuildingStatus.RECRUITING)}
            />
            <Radio
              label="모집 완료"
              id="end"
              name="status"
              checked={teamBuildingStatus === TeamBuildingStatus.END}
              onChange={() => setTeamBuildingStatus(TeamBuildingStatus.END)}
            />
          </div>
        </FormField>
      )}
    </div>
  );
}
