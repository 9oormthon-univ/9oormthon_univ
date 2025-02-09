import styles from './styles.module.scss';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { FormGroup, Label, Text } from '@goorm-dev/vapor-components';

interface FormEditorProps {
  label: string;
  nullable: boolean;
  editorRef: React.RefObject<Editor> | null;
  imageHandler: (blob: File, callback: typeof Function) => void;
  content?: string;
}

export default function FormEditor({ label, nullable, content = '', editorRef, imageHandler }: FormEditorProps) {
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
        initialValue={content ?? ''}
        initialEditType="markdown"
        previewStyle="tab"
        useCommandShortcut={true}
        autofocus={false}
        ref={editorRef}
        toolbarItems={toolbar}
        hideModeSwitch
        height="500px"
        hooks={{ addImageBlobHook: imageHandler }}
      />
    </FormGroup>
  );
}
