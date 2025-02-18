import MDEditor, { bold, commands, hr, italic, strikethrough } from '@uiw/react-md-editor';
import { Button, FormGroup } from '@goorm-dev/vapor-components';
import FormLabel from './FormLabel';
import styles from './styles.module.scss';
import { useState } from 'react';
import { EditIcon, ViewOnIcon } from '@goorm-dev/vapor-icons';

interface FormEditorProps {
  label: string;
  nullable: boolean;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export default function FormEditor({
  label,
  nullable,
  value,
  onChange,
  placeholder = '아이디어에 대해 자유롭게 설명해주세요',
}: FormEditorProps) {
  const [isEditing, setIsEditing] = useState(true);

  // 수정 버튼 클릭 시 편집 모드와 미리보기 모드 전환
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const editPreviewCommand = {
    name: 'toggle-edit-preview',
    keyCommand: 'toggleEditPreview',
    buttonProps: { 'aria-label': 'Toggle Edit/Preview' },
    execute: () => toggleEditMode(),
    render: () => (
      <Button color="secondary" size="sm" onClick={toggleEditMode} className={styles.editPreviewButton}>
        {isEditing ? <ViewOnIcon /> : <EditIcon />}
        {isEditing ? '미리보기' : '수정하기'}
      </Button>
    ),
  };

  // 이미지 업로드
  // const handleImageUpload = async (image: File) => {
  //   const imageName = image?.name || '이미지.png';
  //   const loadingText = `<!-- Uploading "${imageName}"... -->`;

  //   const insertMarkdown = insertToTextArea(loadingText); // (1)
  //   if (!insertMarkdown) return;
  //   onChange(insertMarkdown);

  //   const { path } = await ExamAPI.uploadImage({ examId, image }); // (2)
  //   const finalMarkdown = insertMarkdown.replace(loadingText, `![](${encodeURI(path)})`);
  //   onChange(finalMarkdown);
  // };

  return (
    <FormGroup data-color-mode="light">
      <FormLabel label={label} nullable={nullable} />
      <MDEditor
        className={styles.editor}
        value={value}
        onChange={(val) => onChange(val || '')}
        textareaProps={{
          placeholder: placeholder,
        }}
        commands={[
          bold,
          italic,
          strikethrough,
          hr,
          commands.group(
            [commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6],
            {
              name: 'title',
              groupName: 'title',
              buttonProps: { 'aria-label': 'Insert title' },
            },
          ),
          commands.divider,
          commands.link,
          commands.quote,
          commands.code,
          commands.codeBlock,
          commands.image,
        ]}
        extraCommands={[editPreviewCommand]}
        height={isEditing ? '100%' : '800px'}
        minHeight={400}
        preview={isEditing ? 'edit' : 'preview'}
        visibleDragbar={false}
      />
    </FormGroup>
  );
}
