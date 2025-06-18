import { FormGroup, Input } from '@goorm-dev/vapor-components';
import FormLabel from './FormLabel';

interface FormInputProps {
  label: string;
  nullable: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ label, nullable, placeholder, value, onChange }: FormInputProps) {
  return (
    <FormGroup>
      <FormLabel label={label} nullable={nullable} />
      {/* 추후 글자수 제한 필요 */}
      <Input size="lg" counter={true} placeholder={placeholder} value={value} onChange={onChange} maxLength={255} />
    </FormGroup>
  );
}
