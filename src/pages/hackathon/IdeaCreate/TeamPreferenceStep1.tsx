import { ChevronLeftOutlineIcon, ChevronRightOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Button, Form, Text } from '@goorm-dev/vapor-components';
import FormDropdown from '../../../components/hackathon/ideaCreate/FormDropdown';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../components/hackathon/ideaCreate/FormInput';
import FormTextarea from '../../../components/hackathon/ideaCreate/FormTextarea';
import FormEditor from '../../../components/hackathon/ideaCreate/FormEditor';
import FormRadio from '../../../components/hackathon/ideaCreate/FormRadio';
import type { Editor } from '@toast-ui/react-editor';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
export default function TeamPreferenceStep1() {
  const { idea_info, updateIdeaInfo } = useIdeaFormStore();
  // 추후 변동 필요
  const hackathonTopics = [
    { id: 1, name: '해커톤 주제1' },
    { id: 2, name: '해커톤 주제2' },
    { id: 3, name: '해커톤 주제3' },
  ];
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const getImageUrl = async (file: File): Promise<string> => {
    // 실제 파일을 Base64로 변환하여 임시 URL 생성
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 업로드 핸들러
  const handleImage = async (file: File, callback: typeof Function) => {
    const imageUrl = await getImageUrl(file);
    callback(imageUrl);
  };

  const isFormValid = () => {
    const formStatus = {
      subject: idea_info.idea_subject_id !== 0,
      title: idea_info.title.trim() !== '',
      summary: idea_info.summary.trim() !== '',
      content: idea_info.content.trim() !== '',
    };

    return Object.values(formStatus).every((value) => value === true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backLink}>
        <Button color="secondary" size="lg" icon={ChevronLeftOutlineIcon} onClick={() => navigate('/hackathon')}>
          뒤로가기
        </Button>
      </div>
      <Text typography="heading4" as="h4" color="text-normal" className={styles.headerText}>
        상상 속에만 있던 <br /> 여러분의 아이디어를 펼쳐주세요!
      </Text>
      <Form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-500)' }}>
        <div className={styles.formWrap}>
          <FormDropdown
            label="어떤 주제에 해당 되나요?"
            nullable={false}
            selectedValue={
              hackathonTopics.find((topic) => topic.id.toString() === idea_info.idea_subject_id.toString())?.name || ''
            }
            placeholder="주제를 선택해주세요"
            options={hackathonTopics}
            onChange={(e) => updateIdeaInfo('idea_subject_id', parseInt(e.target.value))}
          />
          <FormInput
            label="아이디어 제목"
            nullable={false}
            placeholder="제목을 입력해주세요"
            value={idea_info.title}
            onChange={(e) => updateIdeaInfo('title', e.target.value)}
          />
          <FormTextarea
            label="한 줄 소개"
            nullable={false}
            placeholder="아이디어를 잘 표현할 수 있는 소개 글을 입력해주세요"
            value={idea_info.summary}
            onChange={(e) => updateIdeaInfo('summary', e.target.value)}
          />
          <FormEditor
            label="설명"
            nullable={false}
            placeholder="아이디어에 대해 자유롭게 설명해주세요"
            editorRef={editorRef}
            imageHandler={handleImage}
            value={idea_info.content}
            onChange={() => {
              const markdownContent = editorRef.current?.getInstance().getMarkdown() || '';
              updateIdeaInfo('content', markdownContent);
            }}
          />
        </div>
        <div className={styles.radioContainer}>
          <FormRadio
            label="본인 파트를 선택해 주세요"
            nullable={false}
            value={idea_info.provider_role}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateIdeaInfo('provider_role', e.target.id)}
          />
        </div>
        <div className={styles.buttonAlign}>
          <Button
            size="xl"
            color="primary"
            icon={ChevronRightOutlineIcon}
            disabled={!isFormValid()}
            onClick={() => {
              navigate('/hackathon/create/step2', { state: { idea_info } });
            }}>
            다음 페이지
          </Button>
        </div>
      </Form>
    </div>
  );
}
