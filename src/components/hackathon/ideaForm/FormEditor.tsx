import MDEditor, { bold, commands, hr, italic, strikethrough } from '@uiw/react-md-editor';
import { Button, FormGroup, Spinner, Text } from '@goorm-dev/vapor-components';
import FormLabel from './FormLabel';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import { EditIcon, ImageOutlineIcon, ViewOnIcon } from '@goorm-dev/vapor-icons';
import { useS3Upload } from '../../../hooks/useS3Upload';
import useUpload from '../../../hooks/useUpload';

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
  const isImage = (file: File) => file.type.startsWith('image/');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // 파일 업로드
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);

    const fileName = file.name;
    const loadingText = `<!-- Uploading "${fileName}"... -->`;

    setMarkdownContent((prev) => {
      const updatedContent = prev + `\n${loadingText}\n`;
      onChange(updatedContent);
      return updatedContent;
    });

    const path = await uploadToS3(file);
    if (!path) {
      setIsUploading(false);
      return;
    }

    const markdownText = isImage(file) ? `![](${encodeURI(path)})` : `[📄 ${fileName}](${encodeURI(path)})`;

    setMarkdownContent((prev) => {
      const finalContent = prev.replace(loadingText, markdownText);
      onChange(finalContent);
      return finalContent;
    });

    setIsUploading(false);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = markdownContent;

    const newValue = current.slice(0, start) + text + current.slice(end);

    setMarkdownContent(newValue);
    onChange(newValue);

    // 커서 위치 조정
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
    });
  };

  // 드래그 & 드랍, 클립보드 붙여넣기 처리
  const handlePasteOrDrop = async (data: DataTransfer | React.ClipboardEvent) => {
    if ('clipboardData' in data) {
      const items = Array.from(data.clipboardData?.items || []);
      const imageItem = items.find((item) => item.type.startsWith('image/'));

      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) {
          await handleFileUpload(file);
        }
      }

      // 이미지가 아닌 경우 텍스트 데이터 처리
      const textData = data.clipboardData?.getData('text');
      if (textData) {
        insertAtCursor(textData);
      }
    } else {
      // 드래그 & 드롭 처리
      if (data.files && data.files.length > 0) {
        const file = data.files.item(0);
        if (file) {
          await handleFileUpload(file);
          return;
        }
      }
    }
  };

  // 첨부파일 박스를 통해 업로드 처리
  const { upload } = useUpload();
  const handleUpload = () => {
    upload(async (file) => {
      if (!file) return;
      await handleFileUpload(file);
    });
  };

  useEffect(() => {
    setMarkdownContent(value);
  }, [value]);

  return (
    <FormGroup data-color-mode="light" onDragOver={(e) => e.preventDefault()}>
      <FormLabel label={label} nullable={nullable} />
      <div className={styles.editorContainer}>
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
            const hasImage = Array.from(e.clipboardData.items).some((item) => item.type.startsWith('image/'));
            if (hasImage) {
              e.preventDefault();
            }
            await handlePasteOrDrop(e);
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
          height={isEditing ? '100%' : '600px'}
          minHeight={400}
          preview={isEditing ? 'edit' : 'preview'}
          visibleDragbar={false}
        />
        {isEditing && (
          <div className={styles.uploadBox} onClick={handleUpload}>
            {isUploading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <ImageOutlineIcon />
              </>
            )}

            <Text typography="subtitle1" color="text-alternative">
              이미지를 드래그하거나 이곳을 클릭해서 추가해주세요.
            </Text>
          </div>
        )}
      </div>
    </FormGroup>
  );
}
