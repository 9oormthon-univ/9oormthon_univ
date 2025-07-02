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
      <Input bsSize="lg" counter={true} placeholder={placeholder} value={value} onChange={onChange} maxLength={255} />
    </FormGroup>
  );
}
