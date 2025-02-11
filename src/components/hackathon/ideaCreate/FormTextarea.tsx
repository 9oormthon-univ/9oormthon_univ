import { FormGroup, Label, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

interface FormTextareaProps {
  label: string;
  nullable: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextarea({ label, nullable, placeholder, value, onChange }: FormTextareaProps) {
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
      <textarea placeholder={placeholder} className={styles.textArea} value={value} onChange={onChange}></textarea>
    </FormGroup>
  );
}
