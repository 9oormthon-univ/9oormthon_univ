import styles from './styles.module.scss';
import { ChevronLeftOutlineIcon } from '@goorm-dev/vapor-icons';
import { Button, Form, Text } from '@goorm-dev/vapor-components';
import { useNavigate } from 'react-router-dom';
import PositionForm from '../../../components/hackathon/ideaCreate/PositionForm';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import { createIdeaAPI } from '../../../api/idea';
export default function TeamPreferenceStep2() {
  const { idea_info, requirements, resetIdeaForm } = useIdeaFormStore();
  const navigate = useNavigate();
  const positions = [
    { key: 'pm', name: '기획', index: 0 },
    { key: 'pd', name: '디자인', index: 1 },
    { key: 'fe', name: '프론트엔드', index: 2 },
    { key: 'be', name: '백엔드', index: 3 },
  ] as const;

  const submitForm = async () => {
    const formData = {
      idea_info: {
        ...idea_info,
        provider_role: idea_info.provider_role.toUpperCase() as 'PM' | 'PD' | 'FE' | 'BE',
      },
      requirements: { ...requirements },
    };

    try {
      const response = await createIdeaAPI(formData);
      // 제출이 되면, 전역에 있는 데이터 초기화
      resetIdeaForm();
      // 추후에 api 호출 추가
      console.log('Form data:', formData);
      console.log(response);
      navigate('/hackathon');
    } catch (error) {
      // 추후에 api 호출 추가
      console.log('Form data:', formData);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backLink}>
        <Button
          color="secondary"
          size="lg"
          icon={ChevronLeftOutlineIcon}
          onClick={() => navigate('/hackathon/create/step1')}>
          뒤로가기
        </Button>
      </div>
      <Text typography="heading4" as="h4" color="text-normal" className={styles.headerText}>
        어떤 팀원과 함께하고 싶나요?
      </Text>
      {positions.map((position) => (
        <PositionForm
          key={position.key}
          position={position}
          isDisabled={['pm', 'pd'].includes(idea_info.provider_role) && position.key === idea_info.provider_role}
        />
      ))}

      <Form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-500)' }}>
        <div className={styles.buttonAlign}>
          <Button
            size="xl"
            color="primary"
            onClick={() => {
              submitForm();
              navigate('/hackathon');
            }}>
            완료
          </Button>
        </div>
      </Form>
    </div>
  );
}
