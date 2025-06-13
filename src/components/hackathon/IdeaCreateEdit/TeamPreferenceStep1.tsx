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
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import { PositionWithoutNull } from '../../../constants/position';
import { GENERATION } from '../../../constants/common';
interface TeamPreferenceStep1Props {
  formData: any;
  nextStep: () => void;
}

export default function TeamPreferenceStep1({ formData, nextStep }: TeamPreferenceStep1Props) {
  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const { updateIdeaInfo } = useIdeaFormStore();

  // 아이디어 주제 조회
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await fetchIdeaSubjects(GENERATION);
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

  // 파트 선택시 제한 인원 체크
  const handleRoleChange = (role: PositionWithoutNull) => {
    if (role === 'PM' || role === 'PD') {
      if (formData.requirements[role.toLowerCase()]?.capacity === 1) {
        // 기획, 디자인은 1명일 경우 선택 불가
        setIsAlertVisible(true);
        return;
      }
    } else if (role === 'FE' || role === 'BE') {
      if (formData.requirements[role.toLowerCase()]?.capacity === 3) {
        // 프, 백도 3명일 경우 선택 불가
        setIsAlertVisible(true);
        return;
      }
    }
    setIsAlertVisible(false);
    updateIdeaInfo('provider_role', role);
  };

  // 폼 유효한지 확인(유효하지 않으면 넘어가지 않음)
  const isFormValid = () => {
    const formStatus = {
      subject: formData.idea_info.idea_subject_id !== 0,
      title: formData.idea_info.title.trim() !== '',
      summary: formData.idea_info.summary.trim() !== '',
      content: formData.idea_info.content.trim() !== '',
      provider_role: formData.idea_info.provider_role !== '',
    };
    return Object.values(formStatus).every((value) => value === true);
  };

  // 이름으로 확인
  const selectedTopic = topics.find((topic) => topic.name === formData.idea_info.subject);

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
            selectedValue={selectedTopic?.name || ''}
            placeholder="주제를 선택해주세요"
            options={topics}
            onChange={(e) => updateIdeaInfo('idea_subject_id', parseInt(e.target.value))}
          />
          <FormInput
            label="아이디어 제목"
            nullable={false}
            placeholder="제목을 입력해주세요"
            value={formData.idea_info.title}
            onChange={(e) => updateIdeaInfo('title', e.target.value)}
          />
          <FormTextarea
            label="한 줄 소개"
            nullable={false}
            placeholder="아이디어를 잘 표현할 수 있는 소개 글을 입력해주세요"
            value={formData.idea_info.summary}
            onChange={(e) => updateIdeaInfo('summary', e.target.value)}
          />
          <FormEditor
            label="아이디어 설명"
            nullable={false}
            placeholder="아이디어에 대해 자유롭게 설명해주세요"
            value={formData.idea_info.content}
            onChange={(val) => updateIdeaInfo('content', val)}
          />
        </div>
        <div className={styles.radioContainer}>
          <FormRadio
            label="본인 파트를 선택해 주세요"
            nullable={false}
            value={formData.idea_info.provider_role}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoleChange(e.target.id as PositionWithoutNull)}
          />
          {isAlertVisible && (
            <Alert color="danger" leftIcon={InfoCircleIcon} fade>
              이미 해당 역할이 최대 인원으로 설정되어 있어 변경할 수 없습니다.
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
