import styles from './styles.module.scss';
import { Alert, Button, Text } from '@goorm-dev/vapor-components';
import PositionForm from '../ideaForm/PositionForm';
import BackLinkNavigation from '../common/BackLinkNavigation';
import { InfoCircleIcon } from '@goorm-dev/vapor-icons';

interface TeamPreferenceStep2Props {
  formData: any;
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
  const positions = [
    { key: 'pm', name: '기획', index: 0 },
    { key: 'pd', name: '디자인', index: 1 },
    { key: 'fe', name: '프론트엔드', index: 2 },
    { key: 'be', name: '백엔드', index: 3 },
  ] as const;

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
              ['pm', 'pd'].includes(formData.idea_info?.provider_role) &&
              position.key === formData.idea_info?.provider_role
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
