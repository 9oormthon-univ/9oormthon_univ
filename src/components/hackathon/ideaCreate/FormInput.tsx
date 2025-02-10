import { FormGroup, Input, Label, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

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
      {/* 추후 글자수 제한 필요 */}
      <Input bsSize="lg" counter={true} placeholder={placeholder} value={value} onChange={onChange} />
    </FormGroup>
  );
}
