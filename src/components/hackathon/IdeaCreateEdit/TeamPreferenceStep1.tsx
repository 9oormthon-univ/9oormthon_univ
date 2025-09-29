import { ChevronRightOutlineIcon, InfoCircleIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Alert, Button, Form, Input, Spinner, Text } from '@goorm-dev/vapor-components';
import FormDropdown from '../ideaForm/FormDropdown';
import TextArea from '../../common/input/TextArea';
import Editor from '../../common/input/Editor';
import RadioGroup from '../../common/input/RadioGroup';
import { useEffect, useState } from 'react';
import BackLinkNavigation from '../common/BackLinkNavigation';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import { PositionKey } from '../../../constants/position';
import { useIdeaSubjects } from '@/hooks/queries/useIdeaSubjects';
import FormField from '@/components/common/formField/FormField';
interface TeamPreferenceStep1Props {
  formData: any;
  nextStep: () => void;
}

export default function TeamPreferenceStep1({ formData, nextStep }: TeamPreferenceStep1Props) {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const { updateIdeaInfo } = useIdeaFormStore();
  // 주제 조회
  const { data: topics, isLoading: isTopicsLoading } = useIdeaSubjects();

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 파트 선택시 제한 인원 체크
  const handleRoleChange = (role: PositionKey) => {
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

  const selectedTopic = topics?.find((topic: { id: number }) => topic.id === formData.idea_info.idea_subject_id);

  return (
    <div className={styles.container}>
      <BackLinkNavigation backLink="/hackathon" />
      <Text typography="heading4" as="h4" color="text-normal" className={styles.headerText}>
        상상 속에만 있던 <br /> 여러분의 아이디어를 펼쳐주세요!
      </Text>
      <Form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-500)' }}>
        <div className={styles.formWrap}>
          {isTopicsLoading ? (
            <Spinner />
          ) : (
            <FormField label="어떤 주제에 해당 되나요?" required>
              <FormDropdown
                selectedValue={selectedTopic?.name || ''}
                placeholder="주제를 선택해주세요"
                options={topics || []}
                onChange={(e) => updateIdeaInfo('idea_subject_id', parseInt(e.target.value))}
              />
            </FormField>
          )}

          <FormField label="아이디어 제목" required>
            <Input
              size="lg"
              placeholder="제목을 입력해주세요"
              value={formData.idea_info.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateIdeaInfo('title', e.target.value)}
            />
          </FormField>
          <FormField label="한 줄 소개" required>
            <TextArea
              placeholder="아이디어를 잘 표현할 수 있는 소개 글을 입력해주세요"
              value={formData.idea_info.summary}
              onChange={(e) => updateIdeaInfo('summary', e.target.value)}
            />
          </FormField>

          <FormField label="아이디어 설명" required>
            <Editor
              placeholder="아이디어에 대해 자유롭게 설명해주세요"
              value={formData.idea_info.content}
              onChange={(val) => updateIdeaInfo('content', val)}
            />
          </FormField>
        </div>
        <div className={styles.radioContainer}>
          <FormField label="본인 파트를 선택해 주세요" required>
            <RadioGroup
              value={formData.idea_info.provider_role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoleChange(e.target.id as PositionKey)}
            />
          </FormField>
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
