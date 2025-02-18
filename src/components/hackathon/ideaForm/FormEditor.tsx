import MDEditor, { bold, commands, hr, italic, strikethrough } from '@uiw/react-md-editor';
import { Button, FormGroup } from '@goorm-dev/vapor-components';
import FormLabel from './FormLabel';
import styles from './styles.module.scss';
import { useState } from 'react';
import { EditIcon, ViewOnIcon } from '@goorm-dev/vapor-icons';
import { useS3Upload } from '../../../hooks/useS3Upload';

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
  const [markdownContent, setMarkdownContent] = useState(value);
  const { uploadToS3 } = useS3Upload();
  const [isUploading, setIsUploading] = useState(false);

  // 수정 버튼 클릭 시 편집 모드와 미리보기 모드 전환
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const editPreviewCommand = {
    name: 'toggle-edit-preview',
    keyCommand: 'toggleEditPreview',
    buttonProps: { 'aria-label': 'Toggle Edit/Preview' },
    execute: toggleEditMode,
    render: () => (
      <Button color="secondary" size="sm" onClick={toggleEditMode} className={styles.editPreviewButton}>
        {isEditing ? <ViewOnIcon /> : <EditIcon />}
        {isEditing ? '미리보기' : '수정하기'}
      </Button>
    ),
  };

  // 이미지 업로드
  const handleImageUpload = async (image: File) => {
    setIsUploading(true);

    const imageName = image?.name || '이미지.png';
    const loadingText = `<!-- Uploading "${imageName}"... -->`;

    setMarkdownContent((prev) => {
      const updatedContent = prev + `\n${loadingText}\n`;
      onChange(updatedContent);
      return updatedContent;
    });

    const path = await uploadToS3(image);
    if (!path) {
      setIsUploading(false);
      return;
    }

    setMarkdownContent((prev) => {
      const finalContent = prev.replace(loadingText, `![](${encodeURI(path)})`);
      onChange(finalContent);
      return finalContent;
    });

    setIsUploading(false);
  };

  // 드래그 & 드랍, 클립보드 붙여넣기 처리
  const handlePasteOrDrop = async (data: DataTransfer) => {
    const files = data.files;
    if (!files || !files.length) return;

    const image = files.item(0) as File;
    await handleImageUpload(image);
  };

  return (
    <FormGroup data-color-mode="light" onDragOver={(e) => e.preventDefault()}>
      <FormLabel label={label} nullable={nullable} />
      <MDEditor
        className={styles.editor}
        value={markdownContent}
        onChange={(val) => {
          setMarkdownContent(val || '');
          onChange(val || '');
        }}
        textareaProps={{
          placeholder: placeholder,
        }}
        onPaste={async (e) => {
          e.preventDefault();
          await handlePasteOrDrop(e.clipboardData);
        }}
        onDrop={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handlePasteOrDrop(e.dataTransfer);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
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
        ]}
        extraCommands={[editPreviewCommand]}
        height={isEditing ? '100%' : '800px'}
        minHeight={400}
        preview={isEditing ? 'edit' : 'preview'}
        visibleDragbar={false}
      />
      {isUploading && <div className={styles.uploading}>이미지 업로드 중...</div>}
    </FormGroup>
  );
}
