import { ChevronLeftOutlineIcon, ChevronRightOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Button, Form, Text } from '@goorm-dev/vapor-components';
import FormDropdown from '../../../components/hackathon/ideaCreate/FormDropdown';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../components/hackathon/ideaCreate/FormInput';
import FormTextarea from '../../../components/hackathon/ideaCreate/FormTextarea';
import FormEditor from '../../../components/hackathon/ideaCreate/FormEditor';
import type { Editor } from '@toast-ui/react-editor';

export default function TeamPreferenceStep1() {
  const hackathonTopics = ['해커톤 주제1', '해커톤 주제2', '해커톤 주제3'];
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      idea_subject_id: selectedTopic,
    };
    console.log(formData);
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.backLink}>
        <Button color="secondary" size="lg" icon={ChevronLeftOutlineIcon} onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </div>
      <Text typography="heading4" as="h4" color="text-normal" className={styles.headerText}>
        상상 속에만 있던 <br /> 여러분의 아이디어를 펼쳐주세요!
      </Text>
      <Form>
        <div className={styles.formWrap}>
          <FormDropdown
            label="어떤 주제에 해당 되나요?"
            nullable={false}
            selectedValue={selectedTopic}
            placeholder="주제를 선택해주세요"
            options={hackathonTopics}
            onChange={setSelectedTopic}
          />
          <FormInput label="아이디어 제목" nullable={false} placeholder="제목을 입력해주세요" />
          <FormTextarea
            label="한 줄 소개"
            nullable={false}
            placeholder="아이디어를 잘 표현할 수 있는 소개 글을 입력해주세요"
          />
          <FormEditor label="설명" nullable={false} editorRef={editorRef} imageHandler={handleImage} />
        </div>
        <div className={styles.buttonAlign}>
          <Button size="xl" color="primary" onClick={handleSubmit} icon={ChevronRightOutlineIcon}>
            다음 페이지
          </Button>
        </div>
      </Form>
    </div>
  );
}
