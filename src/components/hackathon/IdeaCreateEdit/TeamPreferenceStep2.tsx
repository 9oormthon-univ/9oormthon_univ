import styles from './styles.module.scss';
import { Alert, Button, Text } from '@goorm-dev/vapor-components';
import PositionForm from '@/components/hackathon/ideaForm/PositionForm';
import BackLinkNavigation from '@/components/hackathon/common/BackLinkNavigation';
import { InfoCircleIcon } from '@goorm-dev/vapor-icons';
import { POSITIONS } from '@/constants/position';
import { useEffect } from 'react';
import { IdeaCreateEdit } from '@/types/user/idea';

interface TeamPreferenceStep2Props {
  formData: IdeaCreateEdit;
  submitForm: () => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  goToPreviousStep: () => string;
}

export default function TeamPreferenceStep2({
  formData,
  submitForm,
  errorMessage,
  goToPreviousStep,
}: TeamPreferenceStep2Props) {
  const positions = Object.values(POSITIONS)
    .sort((a, b) => a.index - b.index)
    .map((value) => ({
      key: value.lowerKey,
      name: value.name,
      index: value.index,
    }));

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink={goToPreviousStep()} />
      <Text typography="heading4" as="h4" color="text-normal" className={styles.headerText}>
        어떤 팀원과 함께하고 싶나요?
      </Text>
      <div className={styles.formStep2Wrap}>
        {positions.map((position) => (
          <PositionForm
            key={position.key}
            position={position}
            isDisabled={
              ['pm', 'pd'].includes(formData.idea_info?.provider_role?.toLowerCase() || '') &&
              position.key === formData.idea_info?.provider_role?.toLowerCase()
            }
          />
        ))}

        {errorMessage && (
          <Alert color="danger" leftIcon={InfoCircleIcon} fade>
            {errorMessage}
          </Alert>
        )}

        <div className={styles.buttonAlign}>
          <Button
            size="xl"
            color="primary"
            onClick={() => {
              submitForm();
            }}>
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
