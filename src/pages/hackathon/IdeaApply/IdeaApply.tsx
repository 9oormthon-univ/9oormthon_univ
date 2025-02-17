import styles from './styles.module.scss';
import { Alert, Button, Text } from '@goorm-dev/vapor-components';
import FormDropdown from '../../../components/hackathon/ideaForm/FormDropdown';
import { useState } from 'react';
import FormTextarea from '../../../components/hackathon/ideaForm/FormTextarea';
import FormRadio from '../../../components/hackathon/ideaForm/FormRadio';
import { InfoCircleIcon } from '@goorm-dev/vapor-icons';
import BackLinkNavigation from '../../../components/hackathon/common/BackLinkNavigation';
export default function IdeaApply() {
  const [selectedRank, setSelectedRank] = useState<number | null>(null);
  const [reason, setReason] = useState('');
  const [role, setRole] = useState('');

  const message = true;
  const isFormValid = selectedRank !== null && reason.trim() !== '' && role !== '';

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.id);
  };

  return (
    <div className={styles.container}>
      {/* id값으로 변경 필요 */}
      <BackLinkNavigation backLink="/hackathon/detail/3" />
      <Text as="h4" typography="heading4" color="text-normal">
        지원하기
      </Text>
      <div className={styles.formContainer}>
        <div>
          <FormDropdown
            label="해당 아이디어는 몇 지망인가요?"
            nullable={false}
            selectedValue={selectedRank ? selectedRank.toString() : ''}
            placeholder="지망을 선택해주세요"
            options={[1, 2, 3, 4, 5].map((value) => ({ id: value, name: value.toString() }))}
            onChange={(e) => setSelectedRank(parseInt(e.target.value))}
          />
          <FormTextarea
            label="함께 하고 싶은 이유를 작성해주세요"
            nullable={false}
            placeholder="n자 이내로 작성해주세요"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <FormRadio label="본인 파트를 선택해주세요" nullable={false} value={role} onChange={handleRoleChange} />
          {message && (
            <Alert color="danger" leftIcon={InfoCircleIcon} fade>
              지원이 마감된 파트입니다.
            </Alert>
          )}
        </div>
        <div className={styles.buttonAlign}>
          <Button size="xl" color="primary" disabled={!isFormValid}>
            지원하기
          </Button>
        </div>
      </div>
    </div>
  );
}
