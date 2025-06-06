import { Button, Text } from '@goorm-dev/vapor-components';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './teamManagement.module.scss';
import { ChevronLeftOutlineIcon } from '@goorm-dev/vapor-icons';
import TeamManageTable from '../../../components/admin/teamManagement/teamManageTable/TeamManageTable';
import TeamMemberCreateModal from '../../../components/admin/teamManagement/modal/TeamMemberCreateModal';
import { useEffect, useState } from 'react';
import { fetchTeamMemberSummaryListAPI } from '../../../api/admin/teams';
import { TeamMemberSummary } from '../../../types/admin/team';

export default function TeamManagement() {
  const { team_id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const [teamMemberSummaryList, setTeamMemberSummaryList] = useState<TeamMemberSummary[]>([]);

  useEffect(() => {
    if (team_id) {
      const fetchTeamMemberSummaryList = async () => {
        try {
          const res = await fetchTeamMemberSummaryListAPI(Number(team_id));
          setTeamMemberSummaryList(res.data.members);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTeamMemberSummaryList();
    }
  });

  const handleUpdate = () => {
    const fetchTeamMemberSummaryList = async () => {
      const res = await fetchTeamMemberSummaryListAPI(Number(team_id));
      setTeamMemberSummaryList(res.data.members);
    };
    fetchTeamMemberSummaryList();
  };

  return (
    <div className={styles.container}>
      <Button
        size="md"
        color="secondary"
        icon={ChevronLeftOutlineIcon}
        iconSide="left"
        outline
        className={styles.backButton}
        onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
      <div className={styles.header}>
        <div className={styles.teamName}>
          <Text typography="subtitle1" color="text-hint">
            {team_id}팀
          </Text>
          <Text typography="heading4" color="text-normal">
            팀원 관리
          </Text>
        </div>
        <div className={styles.teamAction}>
          <Button size="md" color="primary" onClick={toggle}>
            팀원 추가하기
          </Button>
        </div>
      </div>
      <TeamManageTable teamMemberSummaryList={teamMemberSummaryList} onUpdate={handleUpdate} />

      <TeamMemberCreateModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
}
