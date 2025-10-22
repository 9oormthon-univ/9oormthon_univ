import styles from './styles.module.scss';
import { Alert, Button, Text, toast } from '@goorm-dev/vapor-components';
import FormDropdown from '@/components/common/dropdown/FormDropdown';
import { useState } from 'react';
import Textarea from '@/components/common/input/TextArea';
import Radio from '@/components/common/input/RadioGroup';
import { InfoCircleIcon } from '@goorm-dev/vapor-icons';
import BackLinkNavigation from '@/components/hackathon/common/BackLinkNavigation';
import { useParams, useNavigate } from 'react-router-dom';
import { PositionKey } from '@/constants/position';
import FormField from '@/components/common/formField/FormField';
import { usePreferences } from '@/hooks/queries/usePreferences';
import { usePeriod } from '@/hooks/queries/system/usePeriod';
import { useApplyIdeaMutation } from '@/hooks/mutations/useApplyIdeaMutation';

export default function IdeaApply() {
  const { idea_id } = useParams();
  const [reason, setReason] = useState('');
  const [role, setRole] = useState('');
  const [selectedRank, setSelectedRank] = useState<number | null>(null);
  const navigate = useNavigate();
  const { data: preferences } = usePreferences();
  const { currentPhase } = usePeriod();
  const [errorMessage, setErrorMessage] = useState('');
  const isFormValid = selectedRank !== null && reason.trim() !== '' && role !== '';
  const { mutate: applyIdea } = useApplyIdeaMutation();

  // 본인 파트 선택
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.id);
  };

  // 아이디어 지원
  const handleApply = () => {
    if (selectedRank !== null) {
      applyIdea(
        {
          idea_id: idea_id ?? '',
          phase: currentPhase,
          preference: selectedRank,
          motivation: reason,
          role: role.toUpperCase() as PositionKey,
        },
        {
          onSuccess: () => {
            navigate(`/hackathon`);
            toast('아이디어 지원이 완료되었습니다.', { type: 'primary' });
          },
          onError: (error: any) => {
            const serverMessage = error?.response?.data?.error?.message;
            const message = serverMessage || '알 수 없는 오류가 발생하였습니다.';
            setErrorMessage(message);
          },
        },
      );
    }
  };

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink={`/hackathon/detail/${idea_id}`} />
      <Text as="h4" typography="heading4" color="text-normal">
        지원하기
      </Text>
      <div className={styles.formContainer}>
        <div className={styles.formFieldContainer}>
          <FormField label="해당 아이디어는 몇 지망인가요?" required>
            <FormDropdown
              selectedValue={selectedRank ? `${selectedRank}지망` : ''}
              placeholder="지망을 선택해주세요"
              options={(preferences ?? []).map((pref) => ({
                id: pref.number,
                name: `${pref.number}지망`,
                disabled: !pref.is_active,
              }))}
              onChange={(e) => setSelectedRank(parseInt(e.target.value))}
            />
          </FormField>

          <FormField label="함께 하고 싶은 이유를 작성해주세요" required>
            <Textarea
              placeholder="250자 이내로 작성해주세요"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FormField>
          <FormField label="본인 파트를 선택해주세요" required>
            <Radio value={role} onChange={handleRoleChange} />
          </FormField>
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
