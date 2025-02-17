import styles from './styles.module.scss';
import { Alert, Button, Text } from '@goorm-dev/vapor-components';
import FormDropdown from '../../../components/hackathon/ideaForm/FormDropdown';
import { useState, useEffect } from 'react';
import FormTextarea from '../../../components/hackathon/ideaForm/FormTextarea';
import FormRadio from '../../../components/hackathon/ideaForm/FormRadio';
import { InfoCircleIcon } from '@goorm-dev/vapor-icons';
import BackLinkNavigation from '../../../components/hackathon/common/BackLinkNavigation';
import { applyIdea, fetchMyRemainingRanks } from '../../../api/idea';
import { useParams } from 'react-router-dom';

export default function IdeaApply() {
  const { idea_id } = useParams();
  const [reason, setReason] = useState('');
  const [role, setRole] = useState('');

  const [preferences, setPreferences] = useState<{ number: number; is_active: boolean }[]>([]);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  // 임의로 기수와 차수 설정
  const generation = 4;
  const phase = 1;

  const [errorMessage, setErrorMessage] = useState('');
  const isFormValid = selectedRank !== null && reason.trim() !== '' && role !== '';

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.id);
  };

  // 내 잔여 지망 간단 리스트 조회
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const response = await fetchMyRemainingRanks(generation, phase);
        setPreferences(response.data.preferences);
      } catch (error: any) {
        if (error.response) {
          const serverMessage = error.response.data.message;
          setErrorMessage(serverMessage || '알 수 없는 오류가 발생했습니다.');
        } else {
          console.error('Error fetching preferences:', error);
        }
      }
    };

    loadPreferences();
  }, []);

  // 아이디어 지원
  const handleApply = async () => {
    try {
      if (selectedRank !== null) {
        await applyIdea(Number(idea_id), phase, selectedRank, reason, role.toUpperCase() as 'PM' | 'PD' | 'FE' | 'BE');
      }
    } catch (error: any) {
      if (error.response) {
        const serverMessage = error.response.error.message;
        setErrorMessage(serverMessage || '알 수 없는 오류가 발생했습니다.');
      } else {
        console.error('Error applying idea:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* id값으로 변경 필요 */}
      <BackLinkNavigation backLink={`/hackathon/detail/${idea_id}`} />
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
            options={preferences.map((pref) => ({
              id: pref.number,
              name: `${pref.number}지망`,
              disabled: !pref.is_active,
            }))}
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
          {errorMessage && (
            <Alert color="danger" leftIcon={InfoCircleIcon} fade>
              {errorMessage}
            </Alert>
          )}
        </div>
        <div className={styles.buttonAlign}>
          <Button size="xl" color="primary" disabled={!isFormValid} onClick={handleApply}>
            지원하기
          </Button>
        </div>
      </div>
    </div>
  );
}
