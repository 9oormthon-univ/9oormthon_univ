import { FormGroup, Label, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

interface FormTextareaProps {
  label: string;
  nullable: boolean;
  placeholder: string;
}

export default function FormTextarea({ label, nullable, placeholder }: FormTextareaProps) {
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
      <textarea placeholder={placeholder} className={styles.textArea}></textarea>
    </FormGroup>
  );
}
