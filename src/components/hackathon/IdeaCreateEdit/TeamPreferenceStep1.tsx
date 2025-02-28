import { ChevronRightOutlineIcon, InfoCircleIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Alert, Button, Form, Text } from '@goorm-dev/vapor-components';
import FormDropdown from '../ideaForm/FormDropdown';
import FormInput from '../ideaForm/FormInput';
import FormTextarea from '../ideaForm/FormTextarea';
import FormEditor from '../ideaForm/FormEditor';
import FormRadio from '../ideaForm/FormRadio';
import { useEffect, useState } from 'react';
import BackLinkNavigation from '../common/BackLinkNavigation';
import { fetchIdeaSubjects } from '../../../api/idea';

interface TeamPreferenceStep1Props {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  nextStep: () => void;
}

export default function TeamPreferenceStep1({
  formData,
  updateFormData,
  nextStep,
}: TeamPreferenceStep1Props) {
  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // 아이디어 주제 조회
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await fetchIdeaSubjects();
        const activeTopics = response.data.idea_subjects
          .filter((topic: { is_active: boolean }) => topic.is_active)
          .map((topic: { id: number; name: string }) => ({ id: topic.id, name: topic.name }));
        setTopics(activeTopics);
      } catch (error) {
        console.error('Error fetching idea subjects:', error);
      }
    };

    loadTopics();
  }, []);

  const handleRoleChange = (role: 'pm' | 'pd' | 'fe' | 'be') => {
    if (role === 'pm' || role === 'pd') {
      if (formData.requirements[role]?.capacity === 1) {
        setIsAlertVisible(true);
        return;
      }
    }
    setIsAlertVisible(false);
    updateFormData('provider_role', role);
  };

  const isFormValid = () => {
    const formStatus = {
      subject: formData.idea_info.idea_subject_id !== 0,
      title: formData.idea_info.title.trim() !== '',
      summary: formData.idea_info.summary.trim() !== '',
      content: formData.idea_info.content.trim() !== '',
    };

    return Object.values(formStatus).every((value) => value === true);
  };

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink="/hackathon" />
      <Text typography="heading4" as="h4" color="text-normal" className={styles.headerText}>
        상상 속에만 있던 <br /> 여러분의 아이디어를 펼쳐주세요!
      </Text>
      <Form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-500)' }}>
        <div className={styles.formWrap}>
          <FormDropdown
            label="어떤 주제에 해당 되나요?"
            nullable={false}
            selectedValue={topics.find((topic) => topic.id === formData.idea_info.idea_subject_id)?.name || ''}
            placeholder="주제를 선택해주세요"
            options={topics}
            onChange={(e) => updateFormData('idea_subject_id', parseInt(e.target.value))}
          />
          <FormInput
            label="아이디어 제목"
            nullable={false}
            placeholder="제목을 입력해주세요"
            value={formData.idea_info.title}
            onChange={(e) => updateFormData('title', e.target.value)}
          />
          <FormTextarea
            label="한 줄 소개"
            nullable={false}
            placeholder="아이디어를 잘 표현할 수 있는 소개 글을 입력해주세요"
            value={formData.idea_info.summary}
            onChange={(e) => updateFormData('summary', e.target.value)}
          />
          <FormEditor
            label="아이디어 설명"
            nullable={false}
            placeholder="아이디어에 대해 자유롭게 설명해주세요"
            value={formData.idea_info.content}
            onChange={(val) => updateFormData('content', val)}
          />
        </div>
        <div className={styles.radioContainer}>
          <FormRadio
            label="본인 파트를 선택해 주세요"
            nullable={false}
            value={formData.idea_info.provider_role}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleRoleChange(e.target.id as 'pm' | 'pd' | 'fe' | 'be')
            }
          />
          {isAlertVisible && (
            <Alert color="danger" leftIcon={InfoCircleIcon} fade>
              이미 해당 역할이 1명 설정되어 있어 변경할 수 없습니다.
            </Alert>
          )}
        </div>
        <div className={styles.buttonAlign}>
          <Button size="xl" color="primary" icon={ChevronRightOutlineIcon} disabled={!isFormValid()} onClick={nextStep}>
            다음 페이지
          </Button>
        </div>
      </Form>
    </div>
  );
}
