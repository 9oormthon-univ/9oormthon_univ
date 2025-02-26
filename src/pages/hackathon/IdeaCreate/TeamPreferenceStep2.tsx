import styles from './styles.module.scss';
import { Alert, Button, Text } from '@goorm-dev/vapor-components';
import { useNavigate } from 'react-router-dom';
import PositionForm from '../../../components/hackathon/ideaForm/PositionForm';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import { createIdeaAPI } from '../../../api/idea';
import BackLinkNavigation from '../../../components/hackathon/common/BackLinkNavigation';
import { InfoCircleIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import { getUserBriefAPI } from '../../../api/auth';
import useAuthStore from '../../../store/useAuthStore';

// 에러 메시지 매핑
const ERROR_MESSAGES: Record<number, string> = {
  40902: '이미 아이디어를 등록했으므로 등록이 불가합니다.',
  40903: '이미 팀이 존재하므로 아이디어 등록이 불가합니다.',
  40406: '해당 사용자를 찾을 수 없습니다.',
  40409: '해당 아이디어 주제를 찾을 수 없습니다.',
  40016: '팀원 수는 6명을 초과할 수 없습니다. 다시 확인해주세요.',
  40017: '기획자는 1명을 초과할 수 없습니다. 다시 확인해주세요.',
  40018: '디자이너는 1명을 초과할 수 없습니다. 다시 확인해주세요.',
  40019: '프론트엔드는 3명을 초과할 수 없습니다. 다시 확인해주세요.',
  40020: '백엔드는 3명을 초과할 수 없습니다. 다시 확인해주세요.',
  40025: '팀원 수는 최소 3명 이상이어야 합니다. 다시 확인해주세요.',
};

export default function TeamPreferenceStep2() {
  const { idea_info, requirements, resetIdeaForm } = useIdeaFormStore();
  const navigate = useNavigate();
  const positions = [
    { key: 'pm', name: '기획', index: 0 },
    { key: 'pd', name: '디자인', index: 1 },
    { key: 'fe', name: '프론트엔드', index: 2 },
    { key: 'be', name: '백엔드', index: 3 },
  ] as const;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitForm = async () => {
    const formData = {
      idea_info: {
        ...idea_info,
        provider_role: idea_info.provider_role.toUpperCase() as 'PM' | 'PD' | 'FE' | 'BE',
      },
      requirements: { ...requirements },
    };

    try {
      await createIdeaAPI(formData);
      // 제출이 되면, 전역에 있는 데이터 초기화
      resetIdeaForm();

      // 유저 정보 업데이트 후 홈으로 이동
      const userBrief = await getUserBriefAPI();
      if (userBrief.status === 200) {
        const { status } = userBrief.data;
        useAuthStore.getState().status = status;
        navigate('/hackathon');
      }
    } catch (error: any) {
      if (error.response) {
        const serverMessage = error.response.data.error?.code;
        setErrorMessage(ERROR_MESSAGES[serverMessage] || '알 수 없는 오류가 발생했습니다.');
      } else {
        console.error('Error fetching preferences:', error);
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink="/hackathon/create/step1" />
      <Text typography="heading4" as="h4" color="text-normal" className={styles.headerText}>
        어떤 팀원과 함께하고 싶나요?
      </Text>
      <div className={styles.formStep2Wrap}>
        {positions.map((position) => (
          <PositionForm
            key={position.key}
            position={position}
            isDisabled={['pm', 'pd'].includes(idea_info.provider_role) && position.key === idea_info.provider_role}
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
