import { FormGroup, Label, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

interface FormTextareaProps {
  label: string;
  nullable: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export default function FormTextarea({ label, nullable, placeholder, value, onChange, disabled }: FormTextareaProps) {
  const maxLength = 250;
  const currentLength = value.length;
  const isNearMax = currentLength >= maxLength * 0.8; // 80% 이상일 때
  const isAtMax = currentLength >= maxLength; // 100%일 때

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
      <textarea
        placeholder={placeholder}
        className={styles.textArea}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
      />
      <div className={styles.characterCount}>
        <Text typography="body3" color={isAtMax ? 'text-danger' : isNearMax ? 'text-warning' : 'text-hint'}>
          {currentLength}/{maxLength}
        </Text>
      </div>
    </FormGroup>
  );
}
