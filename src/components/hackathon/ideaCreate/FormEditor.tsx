import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { FormGroup } from '@goorm-dev/vapor-components';
import FormLabel from './FormLabel';

interface FormEditorProps {
  label: string;
  nullable: boolean;
  editorRef: React.RefObject<Editor> | null;
  imageHandler: (blob: File, callback: typeof Function) => void;
  value: string;
  onChange: () => void;
  placeholder: string;
}

export default function FormEditor({
  label,
  nullable,
  editorRef,
  imageHandler,
  value,
  onChange,
  placeholder = '아이디어에 대해 자유롭게 설명해주세요',
}: FormEditorProps) {
  const toolbar = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
  ];

  return (
    <FormGroup>
      <FormLabel label={label} nullable={nullable} />
      <Editor
        initialValue={value || ''}
        placeholder={placeholder}
        initialEditType="markdown"
        previewStyle="tab"
        ref={editorRef}
        toolbarItems={toolbar}
        hideModeSwitch
        height="500px"
        hooks={{ addImageBlobHook: imageHandler }}
        value={value}
        onChange={onChange}
      />
    </FormGroup>
  );
}
