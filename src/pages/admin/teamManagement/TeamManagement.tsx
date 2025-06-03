import { Button, Text } from '@goorm-dev/vapor-components';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './teamManagement.module.scss';
import { ChevronLeftOutlineIcon } from '@goorm-dev/vapor-icons';
import TeamManageTable from '../../../components/admin/teamManagement/teamManageTable/TeamManageTable';
import TeamMemberCreateModal from '../../../components/admin/teamManagement/modal/teamMemberCreateModal';
import { useState } from 'react';

export default function TeamManagement() {
  const { team_id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
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
      <TeamManageTable />

      <TeamMemberCreateModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
}
