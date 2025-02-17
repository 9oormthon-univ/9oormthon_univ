// import '@uiw/react-md-editor/dist/markdown-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { FormGroup } from '@goorm-dev/vapor-components';
import FormLabel from './FormLabel';

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
  return (
    <FormGroup data-color-mode="light">
      <FormLabel label={label} nullable={nullable} />
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        textareaProps={{
          placeholder: placeholder,
        }}
        height={300}
        preview="edit"
      />
    </FormGroup>
  );
}
