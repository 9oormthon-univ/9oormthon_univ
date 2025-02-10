import styles from './styles.module.scss';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { FormGroup, Label, Text } from '@goorm-dev/vapor-components';

interface FormEditorProps {
  label: string;
  nullable: boolean;
  editorRef: React.RefObject<Editor> | null;
  imageHandler: (blob: File, callback: typeof Function) => void;
}

export default function FormEditor({ label, nullable, editorRef, imageHandler }: FormEditorProps) {
  const toolbar = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
  ];

  return (
    <FormGroup>
      <Label className={styles.labelWrap}>
        <Text typography="subtitle2" color="text-alternative">
          {label}
        </Text>
        {!nullable && (
          <Text typography="body3" color="text-danger">
            *
          </Text>
        )}
      </Label>
      <Editor
        initialValue={''}
        placeholder="아이디어에 대해 자유롭게 설명해주세요"
        initialEditType="markdown"
        previewStyle="tab"
        ref={editorRef}
        toolbarItems={toolbar}
        hideModeSwitch
        height="500px"
        hooks={{ addImageBlobHook: imageHandler }}
      />
    </FormGroup>
  );
}
